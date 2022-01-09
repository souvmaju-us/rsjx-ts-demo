import React from "react";
import { Subject } from "rxjs";
import produce from "immer";

const subject = new Subject();

export interface IChatMessage {
  person: string;
  text: string;
}

interface IState {
  status: string;
  data: IChatMessage[];
  newDataCount: number;
  error: string;
}

const initialState: IState = {
  status: "",
  data: [],
  newDataCount: 0,
  error: ""
};

let state = initialState;

export const chatStore = {
  flush: () => {
    state = produce(state, (draft) => {
      draft.newDataCount = 0;
    });
    subject.next(state);
  },
  subscribe: (setState: React.Dispatch<React.SetStateAction<IState>>) =>
    subject.subscribe(setState),
  sendMessage: (message: IChatMessage) => {
    state = produce(state, (draft) => {
      draft.data.push(message);
      draft.newDataCount++;
    });
    subject.next(state);
  },
  clearChat: () => {
    state = initialState;
    subject.next(state);
  },
  initialState
};
