import { useEffect } from "react";
import PropTypes from "prop-types";

const ChatApp = (props) => {
  const URL = "https://chatty.doodle-test.com/api/chatty/v1.0";
  const TOKEN = "vmg7caZZVF24";

  const author = props.author;

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", token: TOKEN },
      body: JSON.stringify({ message: "this is a message", author }),
    };
    fetch(URL, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log("data", data));
  }, [author]);

  return (
    <div>
      <form className="chat-form">
        <div>
          {/* <label htmlFor="chat" className="chat__label">
  Username
</label> */}
          <input
            type="text"
            id="chat"
            className="chat__input"
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
