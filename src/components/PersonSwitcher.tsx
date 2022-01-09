import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { chatStore } from "../store/chat";

export const PersonSwitcher: React.FC = () => {
  const [chatState, setChatState] = useState(chatStore.initialState);
  const { pathname } = useLocation();

  useEffect(() => {
    const subscription = chatStore.subscribe(setChatState);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const messageNotification = chatState.newDataCount > 0 && (
    <span className="notify">{chatState.newDataCount}</span>
  );

  return (
    <div className="switcher-div">
      <Link to="/first-person">
        <button className="switcher">
          Mycroft
          {!["/first-person", "/"].includes(pathname) && messageNotification}
        </button>
      </Link>
      <Link to="/second-person">
        <button className="switcher">
          Cortana
          {pathname !== "/second-person" && messageNotification}
        </button>
      </Link>
    </div>
  );
};
