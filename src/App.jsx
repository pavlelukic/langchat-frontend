import { useState } from "react";
import axios from "axios";
import "./App.css";
import SettingsPanel from "./components/SettingsPanel.jsx";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentModel, setCurrentModel] = useState("gpt-5");
  const [systemPrompt, setSystemPrompt] = useState();

  const handleSendMessage = async (userMessage) => {
    if (!userMessage) return; //ne saljemo prazne poruke

    //1. Dodajemo odmah poruku korisnika u chat prozor
    const newMessages = [...messages, { sender: "user", text: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    const markdownInstruction =
      "\n\nFormat your answers using Markdown, including headings, lists, and bold text when appropriate.";

    const fullPrompt = `${systemPrompt}${markdownInstruction}`;

    try {
      //2. Saljemo zahtev nasem Spring Boot backendu
      const response = await axios.post("http://localhost:8080/api/chat", {
        message: userMessage,
        model: currentModel,
        systemPrompt: fullPrompt,
      });

      //3. Dodajemo AI odgovor u chat prozor
      const aiReply = response.data.reply;
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
    <div className="app-container">
      <SettingsPanel
        currentModel={currentModel}
        setCurrentModel={setCurrentModel}
        systemPrompt={systemPrompt}
        setSystemPrompt={setSystemPrompt}
      />
      <div className="chat-container">
        <ChatWindow messages={messages} isLoading={isLoading} />
        <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default App;
