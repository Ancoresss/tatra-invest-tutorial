from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn

from assistant.main import Assistan

app = FastAPI()
ai = Assistan()

class UserInput(BaseModel):
    text: str
    prompt: str
    key: str

@app.post("/chat/")
async def chat(input: UserInput):
    try:
        ai.init_module() # Make sure your assistant is ready
        response = ai.conversation_input(input.key, inputting=False, content=input.text)
        response_emb=ai.on_action(input.text, input.prompt)
        return {"response": response+"\n\n\n"+response_emb}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
