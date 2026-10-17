from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import extraction, nlp, summarization, evaluation
from app.config import APP_TITLE, ALLOWED_ORIGINS, HOST, PORT
import nltk

def download_nltk_resources():
    resources = [
        'punkt', 'punkt_tab', 'stopwords', 'wordnet', 'omw-1.4',
        'averaged_perceptron_tagger_eng', 'maxent_ne_chunker_tab', 'words'
    ]
    for res in resources:
        try:
            nltk.data.find(f'tokenizers/{res}') if 'punkt' in res else nltk.data.find(f'corpora/{res}')
        except LookupError:
            nltk.download(res, quiet=True)
            
download_nltk_resources()

app = FastAPI(title=APP_TITLE)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(extraction.router, prefix="/api/extract", tags=["Extraction"])
app.include_router(nlp.router, prefix="/api/nlp", tags=["NLP Analysis"])
app.include_router(summarization.router, prefix="/api/summarize", tags=["Summarization"])
app.include_router(evaluation.router, prefix="/api/evaluate", tags=["Evaluation"])

@app.get("/")
def read_root():
    return {"message": "Welcome to NLP Text Summarizer API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host=HOST, port=PORT, reload=True)
