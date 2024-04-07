import os
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma

os.environ["OPENAI_API_KEY"] = "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"

embeddings_model = OpenAIEmbeddings()


class Chunk:
    def __init__(self, page_content, metadata):
        self.page_content = page_content
        self.metadata = metadata


data = [
    Chunk("""Choose the stock from the list of the available stocks.
Set the parameters based on which user want to buy the stock.
Click on the “Buy” button.""", {"type": "buystock"}),
    Chunk(
        """Choose the stock from the list of the available stocks. Choose the “Price” option. Set the price for the stock based on which it should be bought automatically. Set the sum represents how many stocks user want to buy. Click on the “Go” button""",
        {"type": "buystockdelay"}),
    Chunk(
        """Choose the stock from the list of the available stocks. Choose the “Time” option. Set the date when the stock should be bought automatically. Set the sum represents how many stocks user want to buy. Click on the “Go” button.""",
        {"type": "buystockdate"}),
    Chunk(
        """Choose the stock from the list of the bought stocks. Set the parameters based on which user want to sell the stock. Click on the “Go” button.""",
        {"type": "sellstock"}),
    Chunk(
        """Choose the stock from the list of the bought stocks. Set the sum based on which the stock should be sold. Click on the “Go” button.""",
        {"type": "sellstockdelay"})
]

db = Chroma.from_documents(data, embeddings_model)


def generate_question(query: str):
    embedded_query = db.similarity_search_with_score(query)
    document_with_scores = []
    for i in range(len(embedded_query)):
        document_with_scores.append({"type": embedded_query[i][0].metadata["type"], "score": embedded_query[i]})

    # filter results that have higher score than 0.5
    # sort result
    # map and return only type
    # Filter and transform the results
    filtered_sorted_results = sorted(
        (item for item in embedded_query if item[1] > 0.5),
        key=lambda x: x[1], reverse=True
    )

    # Extract and return the "type" from the metadata of each result
    return [result[0].metadata["type"] for result in filtered_sorted_results]


print(generate_question("how to buy stock?"))
# print(db.similarity_search_with_score("how to buy stock?"))
