import React, { useState, useLayoutEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { chatStore } from "../store/chat";

interface IFormInput {
  messageInput: string;
}

export const SecondPerson: React.FC = () => {
  const [chatState, setChatState] = useState(chatStore.initialState);
  const { register, handleSubmit, reset } = useForm<IFormInput>();

  useLayoutEffect(() => {
    const subscription = chatStore.subscribe(setChatState);
    chatStore.flush();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const onFormSubmit: SubmitHandler<IFormInput> = (data) => {
    const messageObject = {
      person: "second-person",
      text: data.messageInput.trim()
    };
    chatStore.sendMessage(messageObject);
    reset();
  };

  return (
    <div className="container">
      <h2 style={{ float: "right" }}>Cortana</h2>
      <div className="chat-box">
        {chatState.data.map((message, index) => (
          <div key={index}>
            <p className={message.person}>{message.text}</p>
            <div className="clear"></div>
          </div>
        ))}
      </div>
      <form id="messageForm" onSubmit={handleSubmit(onFormSubmit)}>
        <input
          {...register("messageInput", { required: true })}
          placeholder="type here..."
        />
        <button type="submit">Send</button> <br />
      </form>
      <button className="clear-button" onClick={() => chatStore.clearChat()}>
        Clear Chat
      </button>
    </div>
  );
};
