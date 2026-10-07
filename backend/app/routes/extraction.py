from fastapi import APIRouter, File, UploadFile, HTTPException
import fitz  # PyMuPDF
from docx import Document
import io

router = APIRouter()

@router.post("/file")
async def extract_file(file: UploadFile = File(...)):
    filename = file.filename
    content = await file.read()
    
    text = ""
    if filename.endswith(".txt"):
        text = content.decode("utf-8")
    elif filename.endswith(".pdf"):
        doc = fitz.open(stream=content, filetype="pdf")
        for page in doc:
            text += page.get_text()
    elif filename.endswith(".docx"):
        doc = Document(io.BytesIO(content))
        for para in doc.paragraphs:
            text += para.text + "\n"
    else:
        raise HTTPException(status_code=400, detail="Unsupported file format")
        
    return {"text": text, "filename": filename}
