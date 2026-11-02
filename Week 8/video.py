
import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

load_dotenv()

llm = ChatGoogleGenerativeAI(
    model="gemini-3.5-flash-lite",
    api_key=os.getenv("GEMINI_API_KEY")
)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are an expert video analyst. Analyze videos carefully and provide detailed descriptions."),
    ("human", [
        {"type": "text", "text": "{analysis_request}"},
        {"type": "video", "url": "{youtube_url}"}
    ])
])

chain = prompt | llm | StrOutputParser()

youtube_url = "https://youtube.com/shorts/zc0PtXfaYlE?si=BfiNj112VTrq9qYb"

print("Analyzing video...")

response = chain.invoke({
    "analysis_request": "Describe what's happening in this video.",
    "youtube_url": youtube_url
})

print("Analysis completed")
print("\nResults:\n" + "-" * 40)
print(response)
