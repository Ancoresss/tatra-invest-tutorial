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
    Chunk("""Simple stock buying""", {"type": "buystock"}),
    Chunk(
        """Delayed buying of stock based on it's price. Until the price reaches some defined threshold""",
        {"type": "buystockdelay"}),
    Chunk(
        """Delayed buying of stock based on date. Until the date reaches defined value.""",
        {"type": "buystockdate"}),
    Chunk(
        """Somple selling of stock""",
        {"type": "sellstock"}),
    Chunk(
        """Selling of stock, based on it's price. Until the price reaches some defined threshold""",
        {"type": "sellstockdelay"})
]

db = Chroma.from_documents(data, embeddings_model)


def generate_actions(query: str):
    embedded_query = db.similarity_search_with_score(query)
    filtered_sorted_results = sorted(
        (item for item in embedded_query if item[1] > 0.4),
        key=lambda x: x[1], reverse=True
    )
    # Extract and return the "type" from the metadata of each result
    return [result[0].metadata["type"] for result in filtered_sorted_results]

