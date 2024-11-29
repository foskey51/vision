import React, { createContext, useContext, useState } from "react";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [msgData, setMsgData] = useState([]);

  const addMessage = (userMsg, assistantMsg) => {
    setMsgData((prevMessages) => [
      ...prevMessages,
      userMsg,
      assistantMsg
    ]);
  };


  const updateLastAssistantMessage = (content) => {
    setMsgData((prevMessages) => {
      const lastBotIndex = prevMessages
        .map((msg) => msg.type)
        .lastIndexOf("assistant");

      if (lastBotIndex !== -1) {
        return prevMessages.map((msg, index) =>
          index === lastBotIndex
            ? { ...msg, text: msg.text + content }
            : msg
        );
      }
      return prevMessages;
    });
  };


  const clearMessages = () => {
    setMsgData([]);
  };


  return (
    <MessageContext.Provider
      value={{ msgData, addMessage, updateLastAssistantMessage, clearMessages }}
    >
      {children}
    </MessageContext.Provider>
  );
};


export const useMessageContext = () => useContext(MessageContext);
