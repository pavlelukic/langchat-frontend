import ReactMarkdown from "react-markdown";

function ChatWindow({ messages, isLoading }) {
  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.sender}`}>
          <ReactMarkdown>{msg.text}</ReactMarkdown>
        </div>
      ))}
      {isLoading && (
        <div className="message ai">
          <p className="typing-indicator">...</p>
        </div>
      )}
    </div>
  );
}

export default ChatWindow;
