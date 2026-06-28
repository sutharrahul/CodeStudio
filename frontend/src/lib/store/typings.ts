import { EditorView } from "codemirror";
import { Languages, Themes } from "../editor/typings";

export interface StoreType {
  showIo: boolean;
  toggleShowIo: () => void;
  theme: Themes;
  setTheme: (value: Themes) => void;
  setShowIo: (value: boolean) => void;
  language: Languages;
  setLanguage: (value: Languages) => void;
  code: string;
  setCode: (value: string) => void;
  view: EditorView | undefined;
  setView: (value: EditorView) => void;
  input: string;
  setInput: (value: string) => void;
  output: string;
  setOutput: (value: string) => void;
  executing: boolean;
  setExecuting: (value: boolean) => void;
  notification: Notification | undefined;
  clearNotification: () => void;
  setNotification: (value: Notification) => void;
  setErrorNotification: (value: string) => void;
  setSuccessNotification: (value: string) => void;
  setWarnNotification: (value: string) => void;
}

export enum NotificationType {
  None,
  Success,
  Error,
  Warning,
}

export type Notification = {
  type: NotificationType;
  message: string;
};
