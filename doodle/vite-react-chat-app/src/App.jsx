import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const URL = "https://chatty.doodle-test.com/api/chatty/v1.0";
  const TOKEN = "vmg7caZZVF24";
  const TIMESTAMP = "1703166391395";

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
      const { message, author, timestamp } = data;
      setMessages((messages) => messages.concat(message, author, timestamp));
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
          <span className="user"> Logged in as: {user}</span>
          <button onClick={handleLogout} className="mock-login-form__button">
            Logout
          </button>

          <div className="chat">
            {/* Sadly was not able to complete the JS in time */}
            {/* <div className="chat-messages"> */}
            {/* {messages.map((message, index) => {
                return (
                  <div key={index}>
                    <div>
                      {index}
                      {message}
                    </div>
                  </div>
                );
              })} */}
            <div className="chat-messages">
              <div className="chat-messages__old">
                <p className="author">Joffrey</p>
                <p className="message">Brilliant</p>
                <p className="date">10 Mar 2018</p>
              </div>
            </div>
            <div className="chat-messages">
              <div className="chat-messages__old">
                <p className="author">NINJA</p>
                <p className="message">Great resource, thanks</p>
                <p className="date">10 Mar 2018 9:55</p>
              </div>
            </div>
            <div className="chat-messages">
              <div className="chat-messages__old">
                <p className="author">I am mister brilliant</p>
                <p className="message">THANKSSSS!!!!!</p>
                <p className="date">10 Mar 2018 10:10</p>
              </div>
            </div>
            <div className="chat-messages">
              <div className="chat-messages__old">
                <p className="author">martin57</p>
                <p className="message">Thanks Peter</p>
                <p className="date">10 Mar 2018 10:19</p>
              </div>
            </div>
            <div className="chat-messages">
              <div className="chat-messages__old">
                <p className="author">Patricia</p>
                <p className="message">Sounds good to me!</p>
                <p className="date">10 Mar 2018 10:22</p>
              </div>
            </div>
            <div className="chat-messages">
              <div className="chat-messages__user">
                <p className="message">
                  Hev folks! I wanted to get in touch with you regarding the
                  project. Please, let me know how you plan to contribute.
                </p>
                <p className="date">12 Mar 2018 14:38</p>
              </div>
            </div>
          </div>
          <div className="chat-form__background">
            <form className="chat-form" onSubmit={handleSubmit}>
              <input
                type="text"
                id="chat"
                className="chat__input"
                placeholder="Message"
                value={newMessage}
                onChange={handleChange}
              />
              <button type="submit" className="chat__button">
                Send
              </button>
            </form>
          </div>
          {/* </div> */}
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
