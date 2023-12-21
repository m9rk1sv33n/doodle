import { useEffect, useState } from "react";

const ChatThread = () => {
  const [messages, setMessages] = useState([]);

  const URL = "https://chatty.doodle-test.com/api/chatty/v1.0";
  const TOKEN = "vmg7caZZVF24";
  const TIMESTAMP = "1703139713816";

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`${URL}/?since=${TIMESTAMP}&limit=10&token=${TOKEN}`, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <div className="chat-messages">
      {console.log("messages", messages)}
      {console.log("setMessages", setMessages)}
    </div>
  );
};

export default ChatThread;
