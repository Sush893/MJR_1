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
try:
    nltk.download("punkt", quiet=True)
    nltk.download("wordnet", quiet=True)
except Exception as e:
    print(f"Warning: Error downloading NLTK resources: {e}")

app = Flask(__name__)
# Configure CORS to allow requests from any origin
CORS(app, resources={r"/*": {"origins": "*"}})

# Add response headers to all requests
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

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
    industry_keywords = set()
    tags_keywords = set()
    
    # Handle industry column
    if "industry" in df.columns:
        industry_keywords = set(df["industry"].dropna().astype(str))
    
    # Handle tags column (convert arrays to individual tags)
    if "tags" in df.columns:
        for tags_list in df["tags"].dropna():
            if isinstance(tags_list, list):
                tags_keywords.update(tags_list)
            elif isinstance(tags_list, str):
                tags_keywords.add(tags_list)

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

def array_to_string(arr):
    """Convert PostgreSQL array to string."""
    if arr is None:
        return ""
    if isinstance(arr, list):
        return " ".join(str(item) for item in arr if item)
    return str(arr)

def fetch_startups():
    global df, bm25, corpus

    try:
        # JOIN query to get data from both pitches and profiles tables
        query = """
        SELECT 
            p.id,
            p.title,
            p.description,
            p.tags,
            pr.industry
        FROM pitches p
        LEFT JOIN profiles pr ON p.user_id = pr.user_id
        """
        
        df = pd.read_sql(query, engine)

        if df.empty:
            print("No data found in joined tables.")
            df = pd.DataFrame()
            return

        # Convert tags array to string and handle NaN values
        df["tags_str"] = df["tags"].apply(array_to_string)
        
        # Fill NaN values with empty strings
        df["title"] = df["title"].fillna('')
        df["description"] = df["description"].fillna('')
        df["tags_str"] = df["tags_str"].fillna('')
        df["industry"] = df["industry"].fillna('')

        # Create combined text field for search
        df["text"] = (
            df["title"] + " " +
            df["industry"] + " " +
            df["description"] + " " +
            df["tags_str"]
        )

        # Create BM25 index
        corpus = [regexp_tokenize(doc.lower(), TOKEN_PATTERN) for doc in df["text"].tolist()]
        bm25 = BM25Okapi(corpus)

        print(f"Successfully loaded {len(df)} records for search indexing.")

    except Exception as e:
        print(f"Error fetching startups: {e}")
        df = pd.DataFrame()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/search", methods=["POST", "OPTIONS"])
def search():
    if request.method == "OPTIONS":
        # Handle preflight CORS request
        return "", 200
        
    global df, bm25

    print("Received search request")
    try:
        data = request.get_json()
        print(f"Request data: {data}")
        
        query = data.get("query", "").strip()
        industry = data.get("industry", "").strip()

        if not query:
            return jsonify({"error": "Query cannot be empty"}), 400

        if df is None or bm25 is None:
            fetch_startups()

        if df.empty:
            return jsonify({"error": "No data available"}), 500

        processed_query = preprocess_query(query)
        print(f"Processed query: {processed_query}")
        query_tokens = regexp_tokenize(processed_query.lower(), TOKEN_PATTERN)

        similarity_scores = bm25.get_scores(query_tokens)
        
        # Create a DataFrame with scores
        results_df = df.copy()
        results_df['score'] = similarity_scores
        
        # Filter by industry if provided
        if industry:
            results_df = results_df[results_df['industry'].str.lower() == industry.lower()]
        
        # Sort by score and get top 5
        results_df = results_df.sort_values('score', ascending=False).head(5)

        # Return results with all required fields
        recommendations = []
        for _, row in results_df.iterrows():
            recommendations.append({
                "id": int(row["id"]),
                "title": row["title"],
                "industry": row["industry"],
                "description": row["description"],
                "tags": row["tags"] if isinstance(row["tags"], list) else []
            })

        print(f"Returning {len(recommendations)} recommendations")
        return jsonify(recommendations)
    except Exception as e:
        print(f"Error in search endpoint: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/debug", methods=["GET"])
def debug():
    """Debug endpoint to check data structure."""
    global df
    
    if df is None:
        fetch_startups()
    
    if df.empty:
        return jsonify({"error": "No data available"})
    
    # Return sample data for debugging
    sample_data = df.head(3).to_dict(orient="records")
    return jsonify({
        "total_records": len(df),
        "columns": list(df.columns),
        "sample_data": sample_data
    })

if __name__ == "__main__":
    fetch_startups()
    app.run(debug=True)
