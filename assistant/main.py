from dotenv import load_dotenv
from langchain.chains import RetrievalQA
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.document_loaders import TextLoader
from langchain_community.vectorstores.chroma import Chroma
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from openai import OpenAI

from assistant.prompts.prompts import prompts

agents = [
    "decide_agent",
    "clarify_agent",
    "general_agent",
    "action_agent",
    "clarify_agent_pointer"
]

API = ""
class Assistan:

    def __init__(self):
        self.client = OpenAI(api_key=API)
        self.embeddings = OpenAIEmbeddings(openai_api_key=API)
        self.chat = ChatOpenAI(model_name="gpt-3.5-turbo-1106", openai_api_key=API)
        self.path = "C:\\Users\\vladk\\Desktop\\ISI\\tatraasistant\\tatra-invest-tutorial\\assistant\\data\\codebase.txt"
        self.emb_id = "C:\\Users\\vladk\\Desktop\\ISI\\tatraasistant\\tatra-invest-tutorial\\assistant\\data\\emb"
        self.chain = None
        self.conversation = {
            "decide": [
                {"role": "system", "content": prompts["decide"]["role_behaviour"]}
            ],
            "clarification": [
                {"role": "system", "content": prompts["decide"]["clarification"]}
            ],
            "clarification_pointer": [
                {"role": "system", "content": prompts["decide"]["clarification"]},
                {"role": "system",
                 "content": "Are you asking about general investment strategies or looking for specific functionality within the app?"}
            ],
            "general": [
                {"role": "system", "content": prompts["general"]["role_behaviour"]}
            ],
            "action": [
                {"role": "system", "content": prompts["action"]["role_behaviour"]}
            ]
        }

    def init_module(self):
        self.prepare_vector_db()
        self.prepare_chain()


    def prepare_vector_db(self):
        text_splitter = CharacterTextSplitter(separator="\n", chunk_size=4000, chunk_overlap=0)
        loader = TextLoader(self.path)
        project = loader.load_and_split(text_splitter=text_splitter)
        Chroma.from_documents(project, persist_directory=self.emb_id, embedding=self.embeddings)

    def prepare_chain(self):
        db = Chroma(
            persist_directory=self.emb_id,
            embedding_function=self.embeddings
        )
        retriever = db.as_retriever()
        self.chain = RetrievalQA.from_chain_type(llm=self.chat, retriever=retriever, chain_type="stuff")

    def clear_conversation_decide(self):
        self.conversation["decide"] = [
            {"role": "system", "content": prompts["decide"]["role_behaviour"]}
        ]

    def clear_conversation_clarification(self):
        self.conversation["decide"] = [
            {"role": "system", "content": prompts["decide"]["clarification"]}
        ]

    def clear_conversation_clarification_pointer(self):
        self.conversation["clarification_pointer"] = [
            {"role": "system", "content": prompts["decide"]["role_behaviour"]}
        ]

    def clear_conversation_general(self):
        self.conversation["general"] = [
            {"role": "system", "content": prompts["general"]["role_behaviour"]}
        ]

    def ai_conversation(self, conversation):
        completion = self.client.chat.completions.create(
            model="gpt-3.5-turbo-1106",
            messages=conversation,
            temperature=0.9
        )
        ai_response = completion.choices[0].message.content
        return ai_response

    def conversation_input(self, key, inputting=True, content=""):

        if inputting == True:
            content = input(">> ")

        self.conversation[key].append({"role": "user", "content": content})
        response = self.ai_conversation(self.conversation[key])
        self.conversation[key].append({"role": "system", "content": response})
        return response

    def summarize(self, text):
        return self.ai_conversation([{"role": "user", "content": f"{prompts['decide']['summarization']}: {text}"}])

    def get_context_question(self, key):
        user_question = ""
        for i in range(len(self.conversation[key])):
            if i != 0:
                item = self.conversation[key][i]
                user_question = user_question + item["content"] + "\n"
        return self.summarize(user_question)

    def get_next_chain(self, type):
        if type == "restart":
            return "decide", agents[0]

        elif type == "request for clarification":
            return "clarification", agents[1]



        elif "general" == type or '"general"' in type:
            return "general", agents[2]

        elif "embedding" in type :
            return "embedding", agents[3]

        elif ("general investment approaches or specific actions within the app" in type
              or "general investment strategies or looking for specific functionality within an app?"):
            return "clarification_pointer", agents[4]


        return None, None

    def on_start(self):

        chains = [
            {
                "agent": agents[0],
                "conversation_key": "decide",
                "output": "",
                "is_input_access": True
            }
        ]

        while True:

            for chain in chains:
                # decide agent
                if chain["agent"] == agents[0]:
                    response = self.conversation_input(chain["conversation_key"], inputting=chain["is_input_access"],
                                                       content=chain["output"])
                    print(response)

                    type, agent_type = self.get_next_chain(response)

                    if type=="clarification" or type=="clarification_pointer":
                        chains.append(
                            {
                                "agent": agent_type,
                                "conversation_key": type,
                                "output": self.conversation[chain["conversation_key"]][-2]["content"],
                                "is_input_access": False
                            }
                        )
                    elif type=="embedding" or type=="general":

                        summary_d = self.get_context_question("decide")
                        chains.append(
                            {
                                "agent": agent_type,
                                "conversation_key": type,
                                "output": summary_d,
                                "is_input_access": False
                            }
                        )
                        self.clear_conversation_decide()
                        self.clear_conversation_clarification()
                        self.clear_conversation_clarification_pointer()

                    chains.remove(chain)

                # clarification agent
                if chain["agent"] == agents[1]:
                    response = self.conversation_input(chain["conversation_key"], inputting=chain["is_input_access"],
                                                       content=chain["output"])

                    print(response)

                    answer = input('>> ')

                    chains.append(
                        {
                            "agent": agents[0],
                            "conversation_key": "decide",
                            "output": chain["output"] + "\n" + response + "\n" + answer,
                            "is_input_access": False
                        }
                    )
                    chains.remove(chain)

                # clarification_pointer agent
                if chain["agent"] == agents[4]:
                    self.conversation["clarification_pointer"].append({"role": "system",
                                                                       "content": "Are you asking about general investment strategies or looking for specific functionality within the app?"})
                    response = self.conversation_input(chain["conversation_key"],
                                                       inputting=True,
                                                       content="")

                    chains.append(
                        {
                            "agent": agents[0],
                            "conversation_key": "decide",
                            "output": self.conversation["clarification_pointer"][1]["content"] + "\n" +
                                      self.conversation["clarification_pointer"][2]["content"],
                            "is_input_access": False
                        }
                    )
                    chains.remove(chain)

                # general agent
                if chain["agent"] == agents[2]:
                    response = self.conversation_input(chain["conversation_key"], inputting=chain["is_input_access"],
                                                       content=chain["output"])

                    print(response)

                    chains.append(
                        {
                            "agent": agents[2],
                            "conversation_key": "general",
                            "output": "",
                            "is_input_access": True
                        }
                    )
                    chains.remove(chain)

                # embedding agent
                if chain["agent"] == agents[3]:

                    self.init_module()
                    response = self.chain.run(f"""
                        Response with instruction name ( scenarioType ), and important add more detailed instruction
                        here request {chain['output']}
                    
                    """)

                    print(response)

                    chains.append(
                        {
                            "agent": agents[3],
                            "conversation_key": "action",
                            "output": input(">> "),
                            "is_input_access": True
                        }
                    )
                    chains.remove(chain)


    def on_action(self, text, prompt):
        self.init_module()
        response = self.chain.run(f"""
                                 {prompt} {text}
                            """)
        return response


if __name__ == "__main__":
    ai = Assistan()
    ai.on_start()

