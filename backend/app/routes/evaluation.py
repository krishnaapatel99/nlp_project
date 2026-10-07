from fastapi import APIRouter
from app.schemas.models import RougeInput
from app.services import rouge

router = APIRouter()

@router.post("/rouge")
def evaluate_summary(data: RougeInput):
    result = rouge.evaluate_rouge(data.reference, data.generated)
    return result
