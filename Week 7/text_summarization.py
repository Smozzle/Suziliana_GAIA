import os
from io import BytesIO
from pypdf import PdfReader
from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File, HTTPException
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

# Load environment variables
load_dotenv()

# Create FastAPI application
app = FastAPI()

# Initialize Gemini model
llm = ChatGoogleGenerativeAI(
    model="gemini-3.5-flash-lite",
    google_api_key=os.getenv("GEMINI_API_KEY")
)

# Create the summarization prompt
prompt_template = ChatPromptTemplate.from_messages([
    (
        "system",
        "You are a helpful assistant that summarizes documents."
    ),
    (
        "human",
        "Write a concise summary of the following:\n\n"
        "{text}\n\nCONCISE SUMMARY:"
    )
])

# Create the summarization chain
chain = prompt_template | llm | StrOutputParser()


# Function to extract text from PDF
def read_pdf_file(file_contents: BytesIO) -> str:
    try:
        pdf_reader = PdfReader(file_contents)

        text = "\n".join(
            page.extract_text() or ""
            for page in pdf_reader.pages
        )

        return text

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Error reading PDF: {e}"
        )


# API endpoint for PDF summarization
@app.post("/summarize")
async def summarize_pdf(file: UploadFile = File(...)):

    # Check the uploaded file type
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed"
        )

    # Read the uploaded PDF
    contents = await file.read()

    # Extract text from PDF
    text = read_pdf_file(BytesIO(contents))

    if not text.strip():
        raise HTTPException(
            status_code=400,
            detail="No readable text found."
        )

    # Generate the summary using Gemini
    try:
        summary = await chain.ainvoke({"text": text})

    except Exception as e:
        print(f"Summarization error: {e}")

        raise HTTPException(
            status_code=500,
            detail="An error occurred while summarizing the document."
        )

    # Return the summary
    return {"summary": summary}
