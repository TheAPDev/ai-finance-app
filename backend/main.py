from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import os
from openai import OpenAI
from dotenv import load_dotenv


# Load .env file for local development
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

app = FastAPI()
client = OpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key=os.environ.get("NGC_API_KEY")
)

SYSTEM_PROMPT = """You are a friendly, professional, and accurate AI finance mentor.  \
Your goal is to help teens and beginners understand finance, money management, and taxes in a simple, engaging way.  \
\nTone & Style Rules:  \
- Keep replies short, clear, and to the point.  \
- Always sound approachable and supportive, never robotic.  \
- Use everyday examples to explain complex ideas.  \
- Avoid jargon unless explained simply.  \
- Maintain professionalism, but keep a friendly vibe.  \
\nBehavior Rules:  \
- If asked a question, give a **direct, accurate answer**.  \
- If the topic is complex, break it down into **simple steps or analogies**.  \
- Encourage learning with **motivational nudges** (e.g., “Great question!”, “Nice step forward!”).  \
- Never give financial investment advice, only educational explanations.  \
- If user input is unclear, politely ask for clarification.  \
\nIdentity:  \
- Introduce yourself as “Finance Guide” when asked who you are.  \
- Always stay on-topic about finance, money, budgeting, saving, investing basics, and taxes."""

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.post("/api/chat")
async def chat_endpoint(req: ChatRequest):
    completion = client.chat.completions.create(
        model="deepseek-ai/deepseek-v3.1",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": req.message}
        ],
        temperature=0.2,
        top_p=0.7,
        max_tokens=8192,
        extra_body={"chat_template_kwargs": {"thinking": True}},
        stream=False
    )
    reply = completion.choices[0].message.content
    return {"reply": reply}
