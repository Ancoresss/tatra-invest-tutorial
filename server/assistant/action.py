import os

from langchain.chains import RetrievalQA
from langchain.llms import OpenAI
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.document_loaders import TextLoader
from langchain_community.vectorstores.chroma import Chroma
from langchain_core.prompts import PromptTemplate
from langchain.memory import ChatMessageHistory
from langchain_core.runnables import RunnablePassthrough, RunnableLambda
from langchain_core.output_parsers import StrOutputParser
from typing import List
from langchain_core.callbacks import BaseCallbackHandler
from langchain_core.messages import HumanMessage
from langchain_openai import OpenAIEmbeddings, ChatOpenAI

API = ""
os.environ["OPENAI_API_KEY"] = API

embeddings = OpenAIEmbeddings(openai_api_key=API)
chat = ChatOpenAI(model_name="gpt-3.5-turbo-1106", openai_api_key=API)
# path = "../assistant/data/codebase.txt"
# emb_id = "../assistant/data/emb"

path = "C:\\Users\\vladk\\Desktop\\ISI\\tatraasistant\\tatra-invest-tutorial\\assistant\\data\\codebase.txt"
emb_id = "C:\\Users\\vladk\\Desktop\\ISI\\tatraasistant\\tatra-invest-tutorial\\assistant\\data\\emb"

def init_emb():
    prepare_vector_db()
    return prepare_chain()


def prepare_vector_db():
    text_splitter = CharacterTextSplitter(separator="\n", chunk_size=4000, chunk_overlap=0)
    loader = TextLoader(path)
    project = loader.load_and_split(text_splitter=text_splitter)
    Chroma.from_documents(project, persist_directory=emb_id, embedding=embeddings)


def prepare_chain():
    db = Chroma(
        persist_directory=emb_id,
        embedding_function=embeddings
    )
    retriever = db.as_retriever()
    chain = RetrievalQA.from_chain_type(llm=chat, retriever=retriever, chain_type="stuff")
    return chain


def generate_response_questions(query: str):
  result = init_emb().run(f"""
  Provide the name of the corresponding scenario and the instructions associated with it. Provide scenarioKey additionally
  {query}
  """)
  return result

print(generate_response_questions("how to buy stock"))



# import os
#
# from langchain.chains import RetrievalQA
# from langchain.llms import OpenAI
# from langchain.text_splitter import CharacterTextSplitter
# from langchain_community.document_loaders import TextLoader
# from langchain_community.vectorstores.chroma import Chroma
# from langchain_core.prompts import PromptTemplate
# from langchain.memory import ChatMessageHistory
# from langchain_core.runnables import RunnablePassthrough, RunnableLambda
# from langchain_core.output_parsers import StrOutputParser
# from typing import List
# from langchain_core.callbacks import BaseCallbackHandler
# from langchain_core.messages import HumanMessage
# from langchain_openai import OpenAIEmbeddings, ChatOpenAI
#
# API = "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"
# os.environ["OPENAI_API_KEY"] = API
#
# embeddings = OpenAIEmbeddings(openai_api_key=API)
# # path = "../assistant/data/codebase.txt"
# # emb_id = "../assistant/data/emb"
#
# path = "C:\\Users\\vladk\\Desktop\\ISI\\tatraasistant\\tatra-invest-tutorial\\assistant\\data\\codebase.txt"
# emb_id = "C:\\Users\\vladk\\Desktop\\ISI\\tatraasistant\\tatra-invest-tutorial\\assistant\\data\\emb"
#
#
#
#
# text_splitter = CharacterTextSplitter(
#     separator="\n",
#     chunk_size=200,
#     chunk_overlap=0
# )
#
# loader = TextLoader(path)
# docs = loader.load_and_split(
#     text_splitter=text_splitter
# )
#
# db = Chroma.from_documents(
#     docs,
#     embedding=embeddings,
#     persist_directory=emb_id
# )
#
#
#
#
# def generate_response_questions(query: str):
#   result= db.similarity_search(f"""
#   Provide the name of the corresponding scenario and the instructions associated with it. Provide scenarioKey additionally
#   {query}
#   """)
#   return result
#
# results = generate_response_questions("how to buy stock")
#
# for result in results:
#     print("\n")
#     print(result.page_content)