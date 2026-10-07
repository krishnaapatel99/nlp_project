from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np
from nltk.tokenize import sent_tokenize

def extract_tfidf_summary(text: str, length: str):
    sentences = sent_tokenize(text)
    if not sentences:
        return ""
    
    # Calculate length
    if length == "short":
        num_sentences = max(1, int(len(sentences) * 0.2))
    elif length == "long":
        num_sentences = max(1, int(len(sentences) * 0.6))
    else:
        num_sentences = max(1, int(len(sentences) * 0.4))
        
    if len(sentences) <= num_sentences:
        return text
        
    vectorizer = TfidfVectorizer(stop_words='english')
    X = vectorizer.fit_transform(sentences)
    
    # Calculate sentence scores (sum of TF-IDF scores for words in the sentence)
    scores = np.array(X.sum(axis=1)).flatten()
    
    # Rank sentences
    ranked_indices = scores.argsort()[::-1]
    
    # Select top sentences and sort them by original order
    selected_indices = sorted(ranked_indices[:num_sentences])
    
    summary = " ".join([sentences[i] for i in selected_indices])
    
    return {
        "summary": summary,
        "word_count": len(summary.split()),
        "sentence_count": len(selected_indices),
        "compression_ratio": round(len(summary.split()) / max(1, len(text.split())), 2)
    }
