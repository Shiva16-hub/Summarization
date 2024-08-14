from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional
from io import BytesIO
from PyPDF2 import PdfReader
import docx
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React app's origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SummaryResponse(BaseModel):
    summary: str

def extract_text_from_pdf(file: BytesIO) -> str:
    reader = PdfReader(file)
    text = ''
    for page in reader.pages:
        text += page.extract_text()
    return text

def extract_text_from_docx(file: BytesIO) -> str:
    doc = docx.Document(file)
    text = ''
    for para in doc.paragraphs:
        text += para.text + '\n'
    return text

async def upload_file(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Invalid file type. Only PDFs are allowed.")

    try:
        pdf_file = BytesIO(await file.read())
        text = extract_text(pdf_file)
        summary = summarize_text(text)
        return {"summary": summary}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")

def summarize_text(text: str) -> str:
    # Dummy summarization function - replace with actual summarization logic
    return text[:500] + '...' if len(text) > 500 else text
    

    if not file_content:
        return JSONResponse(content={"summary": "Empty file"}, status_code=400)

    return {"summary": summary}
def summarize_text(text: str) -> str:
    # Placeholder summarization logic
    # Replace with your actual summarization model or logic
    return text[:min(len(text), 500)]  # Example: return the first 500 characters as a summary

