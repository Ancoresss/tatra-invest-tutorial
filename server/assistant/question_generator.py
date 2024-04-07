import os

from langchain.llms import OpenAI
from langchain_core.prompts import PromptTemplate
from langchain.memory import ChatMessageHistory
from langchain_core.runnables import RunnablePassthrough, RunnableLambda
from langchain_core.output_parsers import StrOutputParser
from typing import List
from langchain_core.callbacks import BaseCallbackHandler
from langchain_core.messages import HumanMessage

os.environ["OPENAI_API_KEY"] = ""

model = OpenAI()

generate_questions_template = """Based on the provided question, generate a list of follow-up questions to clarify ambiguous or missing details. The goal is to gather more specific information that will help in giving a precise and relevant response to the original query.
Instructions for the model:
1. Identify key aspects of the initial question that are vague or where more information is needed.
2. Create a list of specific follow-up questions targeting these aspects. The questions should be open-ended where possible, to encourage detailed responses.
3. Ensure that the follow-up questions are relevant and directly related to the original question, to facilitate a more accurate understanding and subsequent answer.
4. GENERATE MAXIMUM 3 questions.
### Question: {question}"""

chain = (
    {"question": RunnablePassthrough()}
    | PromptTemplate.from_template(generate_questions_template)
    | model
    | StrOutputParser()
)

def generate_response_questions(query: str):
  result = chain.invoke(query)
  return result
