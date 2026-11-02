
import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import FewShotPromptTemplate, PromptTemplate
from langchain_core.output_parsers import StrOutputParser

# Load environment variables
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Initialize Gemini
llm = ChatGoogleGenerativeAI(
    model="gemini-3.5-flash-lite",
    api_key=GEMINI_API_KEY
)

# Few-shot examples for PalmVision AI feedback
examples = [
    {
        "feedback": "The PalmVision AI interface is easy to navigate.",
        "category": "Usability"
    },
    {
        "feedback": "The image analysis takes too long to complete.",
        "category": "Performance"
    },
    {
        "feedback": "The analysis results seem inconsistent.",
        "category": "Accuracy"
    },
    {
        "feedback": "Please add a history page to view previous analyses.",
        "category": "Feature Request"
    },
    {
        "feedback": "The buttons and menus are confusing to use.",
        "category": "Usability"
    },
    {
        "feedback": "The system sometimes freezes during image processing.",
        "category": "Performance"
    }
]

# Define the format of each example
example_prompt = PromptTemplate(
    input_variables=["feedback", "category"],
    template="User Feedback: {feedback}\nCategory: {category}"
)

# Create the few-shot prompt
prompt = FewShotPromptTemplate(
    examples=examples,
    example_prompt=example_prompt,
    prefix=(
        "You are a feedback classifier for PalmVision AI.\n"
        "Classify the user's feedback into exactly ONE category: "
        "Usability, Performance, Accuracy, or Feature Request.\n"
        "Return ONLY the category name."
    ),
    suffix="User Feedback: {input}\nCategory:",
    input_variables=["input"]
)

# Build the processing chain
chain = prompt | llm | StrOutputParser()

print("PalmVision AI Feedback Sentiment Analyzer")
print("Type 'quit' to exit.\n")

while True:
    feedback = input("Enter user feedback: ").strip()

    if not feedback:
        continue

    if feedback.lower() == "quit":
        break

    try:
        response = chain.invoke({"input": feedback})
        print("Sentiment:", response.strip())
        print()

    except Exception as e:
        print(f"Error: {e}\n")

print("Program ended.")
