import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

# 1. Load the .env file
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")


# 2. Connect to Gemini
llm = ChatGoogleGenerativeAI(
    model="gemini-3.5-flash",
    api_key=GEMINI_API_KEY,
    timeout=30,
    max_retries=1
) if GEMINI_API_KEY else None


# 3. Create the prompt template
prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        "You are a helpful assistant that translates "
        "{input_language} to {output_language}. "
        "Translate the provided text only."
    ),
    ("human", "{input}")
])


# 4. Create the LangChain pipeline
chain = prompt | llm | StrOutputParser() if llm else None


# 5. Translation function used by main.py
def translate(input_language: str, output_language: str, text: str) -> str:
    if chain is None:
        raise RuntimeError("Gemini API key is not configured.")

    return chain.invoke({
        "input_language": input_language,
        "output_language": output_language,
        "input": text
    })
