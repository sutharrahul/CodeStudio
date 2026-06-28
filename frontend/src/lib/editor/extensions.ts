import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { LanguageSupport } from "@codemirror/language";

import { nord } from "cm6-theme-nord";
import { basicDark } from "cm6-theme-basic-dark";
import { basicLight } from "cm6-theme-basic-light";
import { materialDark } from "cm6-theme-material-dark";
import { Extenstion, Languages, Themes } from "./typings";

import { defaultKeymap, indentLess, indentMore } from "@codemirror/commands";
import { EditorView, keymap } from "@codemirror/view";
import { basicSetup } from "codemirror";

export const extensions = [
  basicSetup,
  EditorView.editable.of(true),
  keymap.of([
    ...defaultKeymap,
    {
      key: "Tab",
      preventDefault: true,
      run: indentMore,
    },
    {
      key: "Shift-Tab",
      preventDefault: true,
      run: indentLess,
    },
  ]),
];

export function getLanguageExtention(lang: Languages): LanguageSupport {
  switch (lang) {
    case Languages.Cpp:
      return cpp();
    case Languages.Java:
      return java();
    case Languages.Python:
      return python();
    case Languages.JavaScript:
    default:
      return javascript();
  }
}

export function getThemeExtention(theme: Themes): Extenstion {
  switch (theme) {
    case Themes.Nord:
      return nord;
    case Themes.BasicDark:
      return basicDark;
    case Themes.BasicLight:
      return basicLight;
    case Themes.MaterialDark:
      return materialDark;
    default:
      return nord;
  }
}

export const textToTheme = {
  nord: Themes.Nord,
  basicDark: Themes.BasicDark,
  basicLight: Themes.BasicLight,
  materialDark: Themes.MaterialDark,
};
export function themeToText(theme: Themes): string {
  switch (theme) {
    case Themes.Nord:
      return "nord";
    case Themes.BasicDark:
      return "basicDark";
    case Themes.BasicLight:
      return "basicLight";
    case Themes.MaterialDark:
      return "materialDark";
    default:
      return "nord";
  }
}
export const langList = ["cpp", "java", "node", "python"];

export function getDisplayLanguage(lang: string) {
  switch (lang) {
    case "cpp":
      return "C++";
    case "java":
      return "Java";
    case "node":
      return "Javascript";
    case "python":
      return "Python";
  }
}
