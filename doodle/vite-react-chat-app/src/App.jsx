import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const URL = "https://chatty.doodle-test.com/api/chatty/v1.0";
  const TOKEN = "vmg7caZZVF24";
  const TIMESTAMP = "1703156847953";

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser("");
  };

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`${URL}/?since=${TIMESTAMP}&limit=10&token=${TOKEN}`, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  const handleChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = newMessage;

    const handleData = (data) => {
      const entries = Object.entries(data);
      setMessages((messages) => messages.concat(entries));
      console.log("messages", messages);
      setNewMessage("");
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", token: TOKEN },
      body: JSON.stringify({ message: formData, author: user }),
    };
    fetch(URL, requestOptions)
      .then((response) => response.json())
      .then((data) => handleData(data));
  };

  return (
    <>
      <h1>Chat App for Doodle</h1>
      {isLoggedIn ? (
        <>
          <p className="user"> Logged in as: {user}</p>
          <button onClick={handleLogout}>Logout</button>
          <div>
            <div className="chat-messages">
              {messages.map((message, index) => {
                return (
                  <div key={index}>
                    <div>{message}</div>
                    {/* <div>{message[1]}</div>
                    <div>{message[2]}</div> */}
                  </div>
                );
              })}
            </div>
            <form className="chat-form" onSubmit={handleSubmit}>
              <div>
                {/* <label htmlFor="chat" className="chat__label">
  Username
</label> */}
                <input
                  type="text"
                  id="chat"
                  className="chat__input"
                  value={newMessage}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="chat__button">
                Send
              </button>
            </form>
          </div>
        </>
      ) : (
        <form className="mock-login-form">
          <label htmlFor="user">User:</label>
          <input
            className="mock-login-form__input"
            type="text"
            id="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <button
            className="mock-login-form__button"
            onClick={() => setIsLoggedIn(true)}
          >
            Login
          </button>
        </form>
      )}
    </>
  );
}

export default App;
