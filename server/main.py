from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from assistant.qa import generate_response_qa
from assistant.question_generator import generate_response_questions

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
    message = data["message"]
    answer = generate_response_qa(message)
    similar_questions = generate_response_questions(message)
    recommended_action = embedding.similarity_search()
    return {"answer": answer, "similar_questions": similar_questions}