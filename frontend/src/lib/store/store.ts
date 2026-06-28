import { create } from "zustand";
import { NotificationType, StoreType } from "./typings";
import { Languages, Themes } from "../editor/typings";
import { getTemplate } from "../editor/constant";

export const useEditorStore = create<StoreType>((set) => ({
  showIo: false,
  toggleShowIo: () => set((state) => ({ showIo: !state.showIo })),
  theme: Themes.Nord,
  setTheme: (theme) => set(() => ({ theme })),
  setShowIo: (value) => set(() => ({ showIo: value })),
  language: Languages.Cpp,
  setLanguage: (value) => set(() => ({ language: value })),
  code: getTemplate(Languages.Cpp),
  setCode: (value) => set(() => ({ code: value })),
  view: undefined,
  setView: (value) => set(() => ({ view: value })),
  input: "",
  setInput: (value) => set(() => ({ input: value })),
  output: "",
  setOutput: (value) => set(() => ({ output: value })),
  executing: false,
  setExecuting: (value) => set(() => ({ executing: value })),
  notification: undefined,
  setNotification: (value) => set(() => ({ notification: value })),
  clearNotification: () =>
    set(() => ({
      notification: undefined,
    })),
  setErrorNotification: (value: string) =>
    set(() => ({
      notification: {
        type: NotificationType.Error,
        message: value,
      },
    })),
  setSuccessNotification: (value: string) =>
    set(() => ({
      notification: {
        type: NotificationType.Success,
        message: value,
      },
    })),
  setWarnNotification: (value: string) =>
    set(() => ({
      notification: {
        type: NotificationType.Warning,
        message: value,
      },
    })),
}));
