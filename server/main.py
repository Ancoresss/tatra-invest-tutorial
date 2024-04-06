from fastapi import FastAPI, Request
from assistant.chatbot import chain

app = FastAPI()

@app.post("/chat")
async def root(req: Request):
    data = await req.json()
    print(data)
    return {"answer": chain.invoke(data["message"])}