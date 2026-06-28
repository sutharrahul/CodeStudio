import { Languages } from "./typings";

export function getTemplate(lang: Languages): string {
  switch (lang) {
    case Languages.JavaScript:
      return `// the hello world program\nconsole.log('Hello World');`;
    case Languages.Cpp:
      return `// Your First C++ Program\n\n#include <iostream>\n\nint main() {\n\tstd::cout << "Hello World!";\n\treturn 0;\n}`;
    case Languages.Python:
      return `# This program prints Hello, world!\n\nprint('Hello, world!')`;
    case Languages.Java:
      return `// Your First Program\n\nclass HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello, World!");\n\t\t}\n}`;
    default:
      return "";
  }
}
