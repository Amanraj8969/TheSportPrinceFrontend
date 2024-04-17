import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState([]);
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState([]);
  const [themeMode, setThemeMode] = useState("light");

  const history = useNavigate();

  useEffect(() => {
    const userInfoString = localStorage.getItem("userData");
    console.log("User Info from localStorage:", userInfoString);
    if (userInfoString) {
      try {
        const userInfo = JSON.parse(userInfoString);
        console.log("Parsed User Info:", userInfo);

        if (userInfo) {
          setUser(userInfo);
        }
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, []);

  const toggleTheme = () => {
    console.log("toggle");
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
        themeMode,
        toggleTheme,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
