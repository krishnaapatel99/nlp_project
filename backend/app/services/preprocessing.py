import nltk
from nltk.corpus import stopwords
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.stem import PorterStemmer, WordNetLemmatizer

lemmatizer = WordNetLemmatizer()
stemmer = PorterStemmer()

def clean_text(text: str) -> str:
    # Basic cleaning
    return " ".join(text.split())

def sentence_tokenization(text: str):
    sentences = sent_tokenize(text)
    return {"sentences": sentences, "count": len(sentences)}

def word_tokenization(text: str):
    tokens = word_tokenize(text)
    return {"tokens": tokens, "count": len(tokens), "unique_count": len(set(tokens))}

def remove_stopwords(text: str):
    stop_words = set(stopwords.words('english'))
    tokens = word_tokenize(text)
    filtered = [w for w in tokens if not w.lower() in stop_words]
    return {"original": text, "filtered": " ".join(filtered)}

def perform_stemming(text: str):
    tokens = word_tokenize(text)
    stemmed = [stemmer.stem(w) for w in tokens]
    return [{"original": w, "stemmed": s} for w, s in zip(tokens, stemmed)]

def perform_lemmatization(text: str):
    tokens = word_tokenize(text)
    lemmatized = [lemmatizer.lemmatize(w) for w in tokens]
    return [{"original": w, "lemmatized": l} for w, l in zip(tokens, lemmatized)]
