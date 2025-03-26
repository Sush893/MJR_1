import { Startup, UserProfile, SearchHistory } from '../../types/recommendation';

// TF-IDF implementation using standard math
class TfidfVectorizer {
  private vocabulary: Map<string, number>;
  private idf: Map<string, number>;

  constructor() {
    this.vocabulary = new Map();
    this.idf = new Map();
  }

  private tokenize(text: string): string[] {
    return text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 2);
  }

  fit(documents: string[]): void {
    // Build vocabulary
    const docFreq = new Map<string, number>();
    
    documents.forEach(doc => {
      const tokens = new Set(this.tokenize(doc));
      tokens.forEach(token => {
        docFreq.set(token, (docFreq.get(token) || 0) + 1);
        if (!this.vocabulary.has(token)) {
          this.vocabulary.set(token, this.vocabulary.size);
        }
      });
    });

    // Calculate IDF
    const N = documents.length;
    docFreq.forEach((freq, term) => {
      this.idf.set(term, Math.log(N / freq));
    });
  }

  transform(document: string): number[] {
    const vector = new Array(this.vocabulary.size).fill(0);
    const tokens = this.tokenize(document);
    const termFreq = new Map<string, number>();
    
    // Calculate term frequency
    tokens.forEach(token => {
      termFreq.set(token, (termFreq.get(token) || 0) + 1);
    });

    // Calculate TF-IDF
    termFreq.forEach((freq, term) => {
      const idx = this.vocabulary.get(term);
      if (idx !== undefined && this.idf.has(term)) {
        vector[idx] = freq * (this.idf.get(term) || 0);
      }
    });

    return vector;
  }
}

// Cosine similarity implementation
function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (normA * normB) || 0;
}

export class RecommendationEngine {
  private vectorizer: TfidfVectorizer;
  private startups: Startup[];
  private vectors: number[][];

  constructor() {
    this.vectorizer = new TfidfVectorizer();
    this.startups = [];
    this.vectors = [];
  }

  initialize(startups: Startup[]): void {
    this.startups = startups;
    const documents = startups.map(startup => 
      `${startup.description} ${startup.tags.join(' ')} ${startup.industry}`
    );
    
    this.vectorizer.fit(documents);
    this.vectors = documents.map(doc => this.vectorizer.transform(doc));
  }

  buildUserProfile(searchHistory: SearchHistory): number[] {
    const queries = searchHistory.queries.map(q => q.query);
    const queryVectors = queries.map(q => this.vectorizer.transform(q));
    
    // Average the query vectors
    const profile = new Array(this.vectorizer.vocabulary.size).fill(0);
    queryVectors.forEach(vec => {
      vec.forEach((val, i) => {
        profile[i] += val;
      });
    });
    
    return profile.map(val => val / queries.length);
  }

  recommendStartups(userProfile: UserProfile, topN: number = 5): Startup[] {
    const profile = this.buildUserProfile(userProfile.searchHistory);
    
    // Calculate similarities
    const similarities = this.vectors.map(vec => cosineSimilarity(profile, vec));
    
    // Get top N indices
    const indices = similarities
      .map((val, idx) => ({ val, idx }))
      .sort((a, b) => b.val - a.val)
      .slice(0, topN)
      .map(item => item.idx);
    
    return indices.map(idx => this.startups[idx]);
  }

  searchStartups(query: string, industry?: string, topN: number = 5): Startup[] {
    const queryVector = this.vectorizer.transform(query);
    
    // Calculate similarities
    const similarities = this.vectors.map(vec => cosineSimilarity(queryVector, vec));
    
    // Filter by industry if specified
    const results = similarities
      .map((val, idx) => ({ val, startup: this.startups[idx] }))
      .filter(item => !industry || item.startup.industry === industry)
      .sort((a, b) => b.val - a.val)
      .slice(0, topN)
      .map(item => item.startup);
    
    return results;
  }
}