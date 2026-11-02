import os
import streamlit as st
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import SystemMessage, HumanMessage
from langchain_core.output_parsers import StrOutputParser

load_dotenv()
llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    api_key=os.getenv("GEMINI_API_KEY")
)
chain = llm | StrOutputParser()

st.title("YouTube Video Analysis")
youtube_url = st.text_input("YouTube URL", placeholder="https://www.youtube.com/watch?v=...")
analysis_request = st.text_area("What should I analyze?", "Describe what's happening in this video.")

if st.button("Analyze") and youtube_url:
    st.video(youtube_url)
    messages = [
        SystemMessage(content="You are an expert video analyst. Analyze videos carefully and provide detailed descriptions."),
        HumanMessage(content=[
            {"type": "text", "text": analysis_request},
            {"type": "media", "file_uri": youtube_url, "mime_type": "video/mp4"},
        ]),
    ]
    with st.spinner("Analyzing video..."):
        try:
            st.write(chain.invoke(messages))
        except Exception as e:
            st.error(str(e))
