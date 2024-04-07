from langchain_openai import OpenAIEmbeddings

os.environ["OPENAI_API_KEY"] = "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"

embeddings_model = OpenAIEmbeddings(openai_api_key="...")


data = [
  {
    "text": """Choose the stock from the list of the available stocks.
Set the parameters based on which user want to buy the stock.
Click on the “Buy” button.""",
    "type": "buystock" 
  },
]

embeddings = embeddings_model.embed_documents(map(data, lambda item: item["text"]))


def generate_question(query: str):
  embedded_query = embeddings_model.embed_query(query)
  document_with_scores = []
  for i in range(len(embedded_query)):
    document_with_scores[i] = {"type": data[i]["type"], score: embedded_query[i]}
  # filter results that have higher score than 0.5
  # sort result
  # map and return only type