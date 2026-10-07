from fastapi import APIRouter, HTTPException
from app.schemas.models import SummarizeInput
from app.services import extractive, textrank

router = APIRouter()

@router.post("/tfidf")
def summarize_tfidf(data: SummarizeInput):
    try:
        result = extractive.extract_tfidf_summary(data.text, data.length)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/textrank")
def summarize_textrank(data: SummarizeInput):
    try:
        result = textrank.extract_textrank_summary(data.text, data.length)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


