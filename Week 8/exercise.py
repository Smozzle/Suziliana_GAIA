import os, base64
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

load_dotenv()
llm = ChatGoogleGenerativeAI(
    model="",  # fill in a video-capable Gemini model name
    api_key=os.getenv("GEMINI_API_KEY")
)

video_file_path = ""  # fill in your video path, e.g. "sample.mp4"
with open(video_file_path, "rb") as video_file:
    encoded_video = base64.b64encode(video_file.read()).decode()

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are an expert video analyst. Analyze videos carefully and provide detailed descriptions."),
    ("human", [
        {
            "type": "text",
            "text": "{analysis_request}"
        },
        {
            "type": "media",
            "data": "{video_data}",
            "mime_type": "{mime_type}"
        }
    ])
])

chain = prompt | llm | StrOutputParser()

# Exercise 1: try different analysis requests on the same video
analysis_requests = [
    "Give a detailed summary of this video.",
    "Summarize this video in a few short bullets.",
    "Generate a paragraph that summarizes this video, with corresponding timecodes.",
    "Summarize this video. Then create a quiz with an answer key based on the information in this video.",
]

results = []
for i, request in enumerate(analysis_requests, start=1):
    print(f"\n[{i}/{len(analysis_requests)}] Analyzing video...")
    print(f"Prompt: {request}")

    response = chain.invoke({
        "analysis_request": request,
        "video_data": encoded_video,
        "mime_type": "video/mp4"
    })

    print("Results:\n" + "-" * 40)
    print(response)
    results.append(f"PROMPT {i}: {request}\n{'-' * 40}\n{response}\n")

# Save all outputs to one file so you can compare them
with open("exercise1_results.txt", "w", encoding="utf-8") as f:
    f.write("\n\n".join(results))

print("\nAll analyses completed. Saved to exercise1_results.txt")