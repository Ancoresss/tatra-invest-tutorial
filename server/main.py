from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from assistant.chatbot import chain

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat")
async def root(req: Request):
    data = await req.json()
    print(data)
    return {"answer": chain.invoke(data["message"])}