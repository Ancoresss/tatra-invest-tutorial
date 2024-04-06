from openai import OpenAI

from assistant.prompts.prompts import prompts


class Assistan:

    def __init__(self):
        self.client = OpenAI(api_key="")
        self.conversation = {
            "general": [
                {"role": "system", "content": prompts["general"]["role_behaviour"]}
            ],
            "clarification": [
                {"role": "system", "content": prompts["general"]["clarification"]}
            ],
            "chatAI": [
                {"role": "system", "content": prompts["chatAI"]["role_behaviour"]}
            ],
        }

    def clear_conversation_general(self):
        self.conversation["general"] = [
            {"role": "system", "content": prompts["general"]["role_behaviour"]}
        ]

    def clear_conversation_clarification(self):
        self.conversation["general"] = [
            {"role": "system", "content": prompts["general"]["clarification"]}
        ]

    def clear_conversation_chatAI(self):
        self.conversation["general"] = [
            {"role": "system", "content": prompts["chatAI"]["role_behaviour"]}
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
        return self.ai_conversation([{"role": "user", "content": f"{prompts['general']['summarization']}: {text}"}])

    def get_context_question(self, key):
        user_question = ""
        for i in range(len(self.conversation[key])):
            if i != 0:
                item = self.conversation[key][i]
                user_question = user_question + item["content"] + "\n"
        return self.summarize(user_question)

    def on_start(self):

        counter = 0
        case = "start"
        type = ""
        inputting = True
        content = ""
        while True:

            if counter == 20:
                self.clear_conversation_general()
                self.clear_conversation_clarification()
                counter = 0
                case = "start"
                inputting = True
                content = ""

            if case == "start":
                type = self.conversation_input("general", inputting=inputting, content=content)
                print(type)

            if case == "clarification":
                on_request = self.conversation["general"][1]["content"]
                result = self.conversation_input("clarification", inputting=False, content=on_request)
                self.clear_conversation_general()

                print(result)
                result = on_request + "\n" + result + "\n" + input(">> ")

                type = "restart"
                inputting = False
                content = result

            if type == "request for clarification":
                case = "clarification"
            if type == "restart":
                case = "start"
            if type == "general":
                return "general", self.get_context_question("general")

            if type == "embedding":
                break

            counter = counter + 1


    def on_chatAI(self, text):

        while True:
            self.conversation["chatAI"].append({"role": "user", "content": text})
            response = self.ai_conversation(self.conversation["chatAI"])
            print(response)

            print("To exit write (E), or continue write your questions")
            text = input(">> ")
            if text=="E":
                break


        user_summary = self.get_context_question("chatAI")
        self.clear_conversation_chatAI()

        return user_summary



if __name__ == "__main__":
    ai = Assistan()
    type, user_summarization = ai.on_start()

    if type=='general':
        ai.on_chatAI(user_summarization)
