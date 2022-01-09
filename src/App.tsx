import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { FirstPerson, SecondPerson, PersonSwitcher } from "./components";
import { chatStore } from "./store/chat";
import "./index.css";

const App: React.FC = () => {
  useEffect(() => {
    chatStore.sendMessage({
      person: "first-person",
      text:
        "Reference: https://blog.logrocket.com/rxjs-with-react-hooks-for-state-management/"
    });
  }, []);

  return (
    <BrowserRouter>
      <>
        <PersonSwitcher />
        <Switch>
          <Route exact path="/" component={FirstPerson} />
          <Route exact path="/first-person" component={FirstPerson} />
          <Route exact path="/second-person" component={SecondPerson} />
        </Switch>
      </>
    </BrowserRouter>
  );
};

export default App;
