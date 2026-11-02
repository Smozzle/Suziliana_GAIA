import os, base64
from fastapi import FastAPI, File, UploadFile, HTTPException
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv
from typing import Dict

load_dotenv()
llm = ChatGoogleGenerativeAI(
    model="gemini-3.5-flash",
    api_key=os.getenv("GEMINI_API_KEY")
)

app = FastAPI()

def encode_image(image_content: bytes) -> str:
    return base64.b64encode(image_content).decode()

@app.post("/analyze-image")
async def analyze_image(file: UploadFile = File(...)) -> Dict[str, str]:

    if not file.content_type or file.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(status_code=400, detail="Invalid or missing file type. Only JPEG and PNG are allowed.")

    contents = await file.read()

    if len(contents) > 10_000_000:
        raise HTTPException(status_code=400, detail="File too large. Maximum size is 10MB.")

    image = encode_image(contents)

    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a helpful assistant that analyzes images and describes them accurately."),
        ("human", [
            {
                "type": "text",
                "text": """Analyze the image and provide a clear, structured description. Follow these steps:

1. Overview: describe what the image shows in 1-2 sentences.
2. Main objects: list the key objects, people, or items visible.
3. Details: describe colours, text, setting, and any notable features.

Rules:
- Use Markdown with a heading for each step.
- Keep it concise, with no more than 2 sentences per bullet point.
- Only describe what is visible; do not guess details you cannot see.
- If the image is unclear, say so instead of guessing.
"""
            },
            {
                "type": "image_url",
                "image_url": {
                    "url": f"data:{file.content_type};base64,{image}",
                },
            },
        ]),
    ])

    try:
        chain = prompt | llm | StrOutputParser()
        res = await chain.ainvoke({})
    except Exception as e:
        print(str(e))
        raise HTTPException(status_code=500, detail="An error occurred while analyzing the image.")

    return {"analysis": res}