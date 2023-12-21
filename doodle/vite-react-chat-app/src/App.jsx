import { useState } from "react";
import "./App.css";
import ChatApp from "./components/ChatApp";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");

  return (
    <>
      <h1>Chat App for Doodle</h1>
      {isLoggedIn ? (
        <>
          <p className="user"> Logged in as: {user}</p>
          <button onClick={() => setIsLoggedIn(false)}>Logout</button>
          <ChatApp author={user} />
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
