from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class TextInput(BaseModel):
    text: str

class SummarizeInput(BaseModel):
    text: str
    length: str = "medium"  # short, medium, long

class RougeInput(BaseModel):
    reference: str
    generated: str

class SimilarityInput(BaseModel):
    sentence1: str
    sentence2: str
