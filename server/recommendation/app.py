from flask import Flask, request, jsonify, render_template
import pandas as pd
import numpy as np
from flask_cors import CORS
from sqlalchemy import create_engine
from rapidfuzz import process, fuzz
from rank_bm25 import BM25Okapi
import nltk
from nltk.corpus import wordnet
from nltk.tokenize import regexp_tokenize

# Download required NLTK resources
nltk.download("punkt")
nltk.download("wordnet")

app = Flask(__name__)
CORS(app)

# PostgreSQL Configuration
DB_URL = "postgresql://postgres:root@localhost:5432/Cofounder_Connect"
engine = create_engine(DB_URL)

# Global variables
df = None
bm25 = None
corpus = None

TOKEN_PATTERN = r"\b\w+\b"

def fuzzy_correct(word):
    """Fuzzy corrects a given word based on dataset keywords."""
    if not isinstance(word, str) or not word.strip():
        return word

    if df is None or df.empty:
        return word

    # Extract unique keywords from "industry" and "tags" columns
    industry_keywords = set(df.get("industry", "").dropna().astype(str))
    tags_keywords = set(df.get("tags", "").dropna().astype(str))

    keywords = industry_keywords | tags_keywords

    if not keywords:
        return word

    result = process.extractOne(word, keywords, scorer=fuzz.ratio, score_cutoff=80)
    return result[0] if result else word

def get_synonyms(word):
    synonyms = set()
    for syn in wordnet.synsets(word):
        for lemma in syn.lemmas():
            synonyms.add(lemma.name().replace("_", " "))
            if len(synonyms) >= 3:
                break
    return list(synonyms)

def preprocess_query(query):
    words = regexp_tokenize(query.lower(), TOKEN_PATTERN)
    processed_words = set()

    for word in words:
        corrected_word = fuzzy_correct(word)
        synonyms = get_synonyms(corrected_word)
        processed_words.update(synonyms + [corrected_word])

    return " ".join(processed_words)

def fetch_startups():
    global df, bm25, corpus

    try:
        query = "SELECT id, title, description, industry, tags FROM profiles"
        df = pd.read_sql(query, engine)

        if df.empty:
            print("No data found in startups table.")
            df = pd.DataFrame()
            return

        df["text"] = (
            df.get("title", "").fillna('') + " " +
            df.get("industry", "").fillna('') + " " +
            df.get("description", "").fillna('') + " " +
            df.get("tags", "").fillna('')
        )

        corpus = [regexp_tokenize(doc.lower(), TOKEN_PATTERN) for doc in df["text"].tolist()]
        bm25 = BM25Okapi(corpus)

    except Exception as e:
        print(f"Error fetching startups: {e}")
        df = pd.DataFrame()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/search", methods=["POST"])
def search():
    global df, bm25

    data = request.get_json()
    query = data.get("query", "").strip()

    if not query:
        return jsonify({"error": "Query cannot be empty"}), 400

    if df is None or bm25 is None:
        fetch_startups()

    if df.empty:
        return jsonify({"error": "No data available"}), 500

    processed_query = preprocess_query(query)
    query_tokens = regexp_tokenize(processed_query.lower(), TOKEN_PATTERN)

    similarity_scores = bm25.get_scores(query_tokens)
    top_indices = np.argsort(similarity_scores)[-5:][::-1]

    recommendations = df.iloc[top_indices][["id", "title", "industry", "description"]].to_dict(orient="records")
    return jsonify(recommendations)

if __name__ == "__main__":
    fetch_startups()
    app.run(debug=True)
