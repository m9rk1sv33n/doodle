import { useState } from "react";
import PropTypes from "prop-types";

const ChatApp = (props) => {
  const [newMesssage, setNewMessage] = useState("");

  const URL = "https://chatty.doodle-test.com/api/chatty/v1.0";
  const TOKEN = "vmg7caZZVF24";

  const author = props.author;

  const handleChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = newMesssage;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", token: TOKEN },
      body: JSON.stringify({ message: formData, author }),
    };
    fetch(URL, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log("data", data));
  };

  return (
    <div>
      <form className="chat-form" onSubmit={handleSubmit}>
        <div>
          {/* <label htmlFor="chat" className="chat__label">
  Username
</label> */}
          <input
            type="text"
            id="chat"
            className="chat__input"
            value={newMesssage}
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
