from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from assistant.qa import generate_response_qa
from assistant.question_generator import generate_response_questions
from assistant.actions_generator import generate_actions

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
    actions = generate_actions(message)
    return {"answer": answer, "similar_questions": similar_questions, "actions": actions}
