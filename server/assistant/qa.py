import os

from operator import itemgetter
from langchain.llms import OpenAI
from langchain_core.prompts import PromptTemplate
from langchain.memory import ChatMessageHistory
from langchain_core.runnables import RunnablePassthrough, RunnableLambda
from langchain_core.output_parsers import StrOutputParser
from typing import List
from langchain_core.callbacks import BaseCallbackHandler
from langchain_core.messages import HumanMessage

class MyCustomHandler(BaseCallbackHandler):
    def on_llm_start(self,
        _,
        prompts: List[str], **kwargs) -> None:
        print("Prompt:")
        print(prompts)

os.environ["OPENAI_API_KEY"] = ""

# model = Ollama(model="mistral")
model = OpenAI(model="gpt-4-1106-preview")

qa_template = """You are a financial manager and consultant chatbot designed to provide introductory level advice to newcomers in the world of investing. Your goal is to provide a brief, understandable explanation of the basics of investing, including investment types such as stocks, bonds, mutual funds, cryptocurrencies, and real estate, as well as to outline common risk management strategies. Your responses should be accessible and easy to understand to help beginners take their first steps in the market with confidence. You actively engage users in dialogue, encouraging them to ask questions on topics that interest them and providing specific examples for better understanding. Additionally, you have a frequently asked questions (FAQ) section where you clarify common concepts and address typical beginner issues. Your task is to make the process of learning about investments as simple and effective as possible, giving users the tools to make informed financial decisions.
### Chat history: {chat_history}
### Question: {question}
"""

summarization_template = """Analyze the dialogue between the user and the chatbot to identify the main user requests and bot recommendations. Determine the user's goal and the suggested steps to achieve it, disregarding general questions and focusing on specific actions and suggestions. As a result, create a summary description that highlights the use of specific functionality within the investment app to invest the specified amount of money, ensuring that important details and communication goals are not lost.
### Chat history: {chat_history}
### Question {question}
"""

chat_history = ChatMessageHistory()

summarization_chain = (
  {"question": itemgetter("question"), "chat_history": itemgetter("chat_history")} 
  | PromptTemplate.from_template(summarization_template) 
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

def prompt_router(input):
    print("Question:" + input["question"])
    summarized_chat_history = (
      summarization_chain.invoke({
        "question": input["question"], 
        "chat_history": get_summarized_human_messages(chat_history)
      })
    )
    prompt = PromptTemplate.from_template(qa_template).partial(chat_history=summarized_chat_history)

    chat_history.add_user_message(input["question"])
    
    return prompt

qa_chain = (
    {"question": RunnablePassthrough()}
    | RunnableLambda(prompt_router)
    | model
    | StrOutputParser()
)

def generate_response_qa(query: str):
  result = qa_chain.invoke(query)
  chat_history.add_ai_message(result)
  return result