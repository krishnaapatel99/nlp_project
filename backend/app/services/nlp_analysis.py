from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from collections import Counter
import nltk

def get_ngrams(text: str, n=2, top_k=10):
    vectorizer = CountVectorizer(ngram_range=(n, n), stop_words='english')
    try:
        X = vectorizer.fit_transform([text])
        vocab = vectorizer.vocabulary_
        counts = X.toarray().sum(axis=0)
        
        ngrams = [(word, int(counts[idx])) for word, idx in vocab.items()]
        ngrams = sorted(ngrams, key=lambda x: x[1], reverse=True)[:top_k]
        return ngrams
    except:
        return []

def get_bow(text: str, top_k=10):
    vectorizer = CountVectorizer(stop_words='english')
    try:
        X = vectorizer.fit_transform([text])
        vocab = vectorizer.vocabulary_
        counts = X.toarray().sum(axis=0)
        
        terms = [(word, int(counts[idx])) for word, idx in vocab.items()]
        terms = sorted(terms, key=lambda x: x[1], reverse=True)[:top_k]
        return {"vocab_size": len(vocab), "top_terms": terms}
    except:
        return {"vocab_size": 0, "top_terms": []}

def get_tfidf(text: str, top_k=10):
    vectorizer = TfidfVectorizer(stop_words='english')
    try:
        X = vectorizer.fit_transform([text])
        vocab = vectorizer.vocabulary_
        scores = X.toarray().sum(axis=0)
        
        terms = [(word, float(scores[idx])) for word, idx in vocab.items()]
        terms = sorted(terms, key=lambda x: x[1], reverse=True)[:top_k]
        return terms
    except:
        return []

def get_pos_tags(text: str):
    tokens = nltk.word_tokenize(text)
    pos_tags = nltk.pos_tag(tokens)
    
    tags = [{"token": token, "pos": tag} for token, tag in pos_tags][:100]
    dist = Counter([tag for token, tag in pos_tags])
    return {"tags": tags, "distribution": dict(dist)}

def get_ner(text: str):
    tokens = nltk.word_tokenize(text)
    pos_tags = nltk.pos_tag(tokens)
    tree = nltk.ne_chunk(pos_tags)
    
    entities = []
    for chunk in tree:
        if hasattr(chunk, 'label'):
            entity_text = " ".join(c[0] for c in chunk)
            entities.append({"entity": entity_text, "type": chunk.label()})
    
    return entities

def calc_similarity(sent1: str, sent2: str):
    vectorizer = TfidfVectorizer()
    try:
        X = vectorizer.fit_transform([sent1, sent2])
        sim = cosine_similarity(X[0:1], X[1:2])[0][0]
        return float(sim)
    except:
        return 0.0
