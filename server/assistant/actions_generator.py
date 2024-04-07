import os
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma

os.environ["OPENAI_API_KEY"] = ""

embeddings_model = OpenAIEmbeddings()

class Chunk:
    def __init__(self, page_content, metadata):
        self.page_content = page_content
        self.metadata = metadata

data = [
  Chunk("""Choose the stock from the list of the available stocks.
Set the parameters based on which user want to buy the stock.
Click on the “Buy” button.""", {"type": "buystock"})
]

db = Chroma.from_documents(data, embeddings_model)


def generate_question(query: str):
  embedded_query = embeddings_model.embed_query(query)
  document_with_scores = []
  for i in range(len(embedded_query)):
    document_with_scores[i] = {"type": data[i]["type"], "score": embedded_query[i]}
  # filter results that have higher score than 0.5
  # sort result
  # map and return only type
  
# print(generate_question("how to buy stock?"))
print(db.similarity_search_with_score("how to buy stock?"))