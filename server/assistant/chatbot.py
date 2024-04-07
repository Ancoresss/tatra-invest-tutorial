import os

from langchain_community.llms import Ollama, OpenAI
from langchain_core.prompts import PromptTemplate
from langchain.memory import ChatMessageHistory
from langchain_core.runnables import RunnablePassthrough, Runnable, RunnableLambda
from langchain_core.output_parsers import StrOutputParser
from prompts.prompts import prompts

os.environ["OPENAI_API_KEY"] = "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"

# model = Ollama(model="mistral")
model = OpenAI()
chat_histories = {
  "request for clarification": [],
  "general": []
}

decide_chain = (
      PromptTemplate.from_template(prompts["general"]["role_behaviour"]) 
      | model 
      | StrOutputParser()
    )

summarization_chain = (
  {"question": RunnablePassthrough(), "chat_history": RunnablePassthrough()} 
  | PromptTemplate.from_template(prompts["general"]["summarization"]) 
  | model 
  | StrOutputParser()
)

def get_summarized_human_messages(chat_history):
    return "\n".join(
        map(
            lambda m: m.content, 
            filter(lambda m: isinstance(m, HumanMessage), chat_history.messages)
        )
    )

def get_type(response):
  if "general" in response:
    return "general"
  elif "embedding" in response:
    return "embedding"
  return "request for clarification"

def prompt_router(input):
    response = decide_chain.invoke({"question": input["question"]})
    type = get_type(response)
    
    chat_prompt = None
    chat_history = chat_histories[type]
    match type:
      case "request for clarification":
        chat_prompt = prompts["general"]["clarification"]
      case "general":
        chat_prompt = prompts["chatAI"]["role_behaviour"]
      case "embedding":
        chat_prompt = None
      case _:
        chat_prompt = prompts["chatAI"]["role_behaviour"]

    prompt = PromptTemplate.from_template(chat_prompt).partial(chat_history=summarization_chain.invoke({"question": input["question"], "chat_history": chat_history}))

    chat_history.append(input["question"])
    
    return prompt


chain = (
    {"question": RunnablePassthrough()}
    | RunnableLambda(prompt_router)
    | model
    | StrOutputParser()
)

