# NLP Text Summarizer

A complete full-stack college project demonstrating practical NLP concepts and text summarization techniques, built with FastAPI and React.

## Features

- **Text Extraction:** Supports pasting text, TXT, PDF, and DOCX files.
- **NLP Analysis:**
  - Tokenization (sentences, words)
  - Stopword Removal
  - Stemming (Porter) & Lemmatization (spaCy)
  - N-Grams & Bag of Words
  - TF-IDF 
  - POS Tagging & NER
- **Summarization:**
  - TF-IDF (Extractive)
  - TextRank (Extractive)
  - BART (Abstractive - Transformers)
- **Evaluation:** ROUGE scores (ROUGE-1, ROUGE-2, ROUGE-L)

## Architecture
- **Frontend:** React, Vite, Tailwind CSS, Axios, React Router.
- **Backend:** FastAPI, Python 3.12, NLTK, spaCy, scikit-learn, Hugging Face Transformers, PyTorch, PyMuPDF, python-docx.

## Installation and Setup

### 1. Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

Configure backend environment variables (create `.env` from `.env.example`):
```bash
cp .env.example .env   # Or copy in Windows: copy .env.example .env
```
*(Variables include `PORT`, `HOST`, `ALLOWED_ORIGINS`, `APP_TITLE`)*

Download spaCy model:
```bash
python -m spacy download en_core_web_sm
```

Run Backend:
```bash
python -m uvicorn app.main:app --reload
```
*Backend runs on http://localhost:8000*
*Swagger UI is at http://localhost:8000/docs*

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Configure frontend environment variables (create `.env` from `.env.example`):
```bash
cp .env.example .env   # Or copy in Windows: copy .env.example .env
```
*(Variables include `VITE_API_URL`)*

Run Frontend:
```bash
npm run dev
```
*Frontend runs on http://localhost:5173*

## Educational Concepts Explored

### TF-IDF (Extractive Summarization)
Calculates term frequency and inverse document frequency for terms in sentences. Sentences are scored based on the sum of their word TF-IDF scores, and the highest-scoring sentences are chosen.

### TextRank (Extractive Summarization)
Treats sentences as nodes in a graph. Edges represent cosine similarity between sentence TF-IDF vectors. The PageRank algorithm is applied to find the most "important" sentences.

### BART (Abstractive Summarization)
Uses an encoder-decoder Transformer architecture to comprehend text and generate entirely new sentences.

### ROUGE Evaluation
Recall-Oriented Understudy for Gisting Evaluation compares generated summaries against reference summaries using n-gram overlap.

## Testing
- Ensure backend and frontend run simultaneously.
- Navigate to http://localhost:5173
- Upload a file or paste text and experiment with Analysis, Summarization, and Evaluation tabs.
