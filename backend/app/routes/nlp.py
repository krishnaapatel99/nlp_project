from fastapi import APIRouter
from app.schemas.models import TextInput, SimilarityInput
from app.services import preprocessing, nlp_analysis

router = APIRouter()

@router.post("/analyze")
def analyze_text(data: TextInput):
    text = data.text
    
    # Preprocessing
    sentences = preprocessing.sentence_tokenization(text)
    words = preprocessing.word_tokenization(text)
    stopwords_rm = preprocessing.remove_stopwords(text)
    stemming = preprocessing.perform_stemming(text)
    lemmatization = preprocessing.perform_lemmatization(text)
    
    # NLP
    ngrams = {
        "unigrams": nlp_analysis.get_ngrams(text, 1),
        "bigrams": nlp_analysis.get_ngrams(text, 2),
        "trigrams": nlp_analysis.get_ngrams(text, 3)
    }
    bow = nlp_analysis.get_bow(text)
    tfidf = nlp_analysis.get_tfidf(text)
    pos = nlp_analysis.get_pos_tags(text)
    ner = nlp_analysis.get_ner(text)
    
    return {
        "sentences": sentences,
        "words": words,
        "stopwords": stopwords_rm,
        "stemming": stemming[:10], # limit to 10 for display
        "lemmatization": lemmatization[:10],
        "ngrams": ngrams,
        "bow": bow,
        "tfidf": tfidf,
        "pos": pos,
        "ner": ner
    }

@router.post("/similarity")
def check_similarity(data: SimilarityInput):
    sim = nlp_analysis.calc_similarity(data.sentence1, data.sentence2)
    return {"similarity": sim}
