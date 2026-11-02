from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel

from exercise_1 import translate

# 1. Create the FastAPI application
app = FastAPI(title="Text Translation API")


# 2. Define the request data
class TranslationRequest(BaseModel):
    input_language: str
    output_language: str
    text_input: str


# 3. Serve the frontend page
@app.get("/")
def home():
    return FileResponse("static/index.html")


# 4. Create the translation endpoint
@app.post("/translate")
def translate_text(request: TranslationRequest):

    if not request.text_input.strip():
        raise HTTPException(
            status_code=400,
            detail="Please enter text to translate."
        )

    try:
        result = translate(
            request.input_language,
            request.output_language,
            request.text_input
        )

        return {"translated_text": result}

    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e)) from e

    except Exception as e:
        raise HTTPException(
            status_code=502,
            detail=f"Translation failed: {e}"
        ) from e
