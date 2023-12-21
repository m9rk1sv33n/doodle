import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ChatApp = (props) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const URL = "https://chatty.doodle-test.com/api/chatty/v1.0";
  const TOKEN = "vmg7caZZVF24";
  const TIMESTAMP = "1703156686050";

  const author = props.author;

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
      //console.log("entries", entries[0]);
      setMessages((messages) =>
        messages.concat(entries[0], entries[1], entries[2])
      );
      setNewMessage("");
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", token: TOKEN },
      body: JSON.stringify({ message: formData, author }),
    };
    fetch(URL, requestOptions)
      .then((response) => response.json())
      .then((data) => handleData(data));
  };

  return (
    <div>
      <div className="chat-messages">
        <div className="search-results">
          {searchData.map((data, index) => {
            return (
              <a
                style={{ display: "block" }}
                href={data.show.url}
                key={index}
                target="_blank"
                rel="noreferrer"
                className={
                  selectedItem === index
                    ? "selected-item active"
                    : "selected-item"
                }
              >
                {data.show.name}
              </a>
            );
          })}
        </div>

        <div>setMessages: {setMessages}</div>
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
  );
};

ChatApp.propTypes = {
  author: PropTypes.string.isRequired,
};

export default ChatApp;
