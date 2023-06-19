import { Choice } from "./Choice";

type DialogEvent = {
  type: 'dialog',
  text: string,
  actorName?: string
};

type SetBackgroundEvent = {
  type: 'setBackground',
  x: number,
  y: number,
  key: string
};

type AddForegroundEvent = {
  type: 'addForeground',
  x: number,
  y: number,
  key: string
};

type ClearForegroundEvent = {
  type: 'clearForeground'
};

type TimelineTransitionEvent = {
  type: 'timelineTransition',
  timelineID: string
};

// シーン遷移イベント
type SceneTransitionEvent = {
  type: 'sceneTransition',
  key: string,
  data?: object
};

// 選択肢イベント
type ChoiceEvent = {
  type: 'choice',
  choices: Choice[]
};

export type Timeline = (DialogEvent|SetBackgroundEvent|AddForegroundEvent|ClearForegroundEvent|TimelineTransitionEvent|SceneTransitionEvent|ChoiceEvent)[];