import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [currentModel, setCurrentModel] = useState("gpt-4o");
  const [systemPrompt, setSystemPrompt] = useState(
    "You are a Senior developer, skilled in advanced programming techniques, proficient across multiple languages, and you have a deep understanding of software architecture."
  );

  const handleSendMessage = async (userMessage) => {
    if (!userMessage) return; //ne saljemo prazne poruke

    //1. Dodajemo odmah poruku korisnika u chat prozor
    const newMessages = [...messages, { sender: "user", text: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      //2. Saljemo zahtev nasem Spring Boot backendu
      const response = await axios.post("http://localhost:8080/api/chat", {
        message: userMessage,
        model: currentModel,
        systemPrompt: systemPrompt,
      });

      //3. Dodajemo AI odgovor u chat prozor
      const aiReply = response.data.reply.match(/text='(.*?)'/)[1];
      setMessages([...newMessages, { sender: "ai", text: aiReply }]);
    } catch (error) {
      console.error("Error fetching response: ", error);
      setMessages([
        ...newMessages,
        { sender: "ai", text: "Sorry, something went wrong." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>LangChat</h1>
    </div>
  );
}

export default App;
