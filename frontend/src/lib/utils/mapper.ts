import { Languages } from "../editor/typings";

export function textToLanguage(lang: string): Languages {
  switch (lang) {
    case "cpp":
    case "c++":
    case "c":
    case "cc":
      return Languages.Cpp;
    case "java":
      return Languages.Java;
    case "python":
    case "python3":
    case "py":
      return Languages.Python;
    case "node":
    case "nodejs":
    case "js":
    case "javascirpt":
      return Languages.JavaScript;
    default:
      return Languages.JavaScript;
  }
}
export function languagetoText(lang: Languages): string {
  switch (lang) {
    case Languages.Cpp:
      return "cpp";
    case Languages.Java:
      return "java";
    case Languages.Python:
      return "python";
    case Languages.JavaScript:
    default:
      return "node";
  }
}
