import networkx as nx
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from nltk.tokenize import sent_tokenize

def extract_textrank_summary(text: str, length: str):
    sentences = sent_tokenize(text)
    if not sentences or len(sentences) < 2:
        return {"summary": text, "word_count": len(text.split()), "sentence_count": len(sentences), "compression_ratio": 1.0}
    
    if length == "short":
        num_sentences = max(1, int(len(sentences) * 0.2))
    elif length == "long":
        num_sentences = max(1, int(len(sentences) * 0.6))
    else:
        num_sentences = max(1, int(len(sentences) * 0.4))
        
    if len(sentences) <= num_sentences:
        return {"summary": text, "word_count": len(text.split()), "sentence_count": len(sentences), "compression_ratio": 1.0}

    # TF-IDF sentence vectors
    vectorizer = TfidfVectorizer(stop_words='english')
    X = vectorizer.fit_transform(sentences)
    
    # Cosine similarity matrix
    sim_matrix = cosine_similarity(X, X)
    
    # Build graph and run PageRank
    nx_graph = nx.from_numpy_array(sim_matrix)
    scores = nx.pagerank(nx_graph)
    
    # Rank sentences
    ranked_sentences = sorted(((scores[i], s, i) for i, s in enumerate(sentences)), reverse=True)
    
    # Select top sentences
    selected = ranked_sentences[:num_sentences]
    
    # Restore original order
    selected.sort(key=lambda x: x[2])
    
    summary = " ".join([s[1] for s in selected])
    
    return {
        "summary": summary,
        "word_count": len(summary.split()),
        "sentence_count": len(selected),
        "compression_ratio": round(len(summary.split()) / max(1, len(text.split())), 2)
    }
