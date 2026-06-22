import { Dictionary } from './types'

export const extension: Dictionary<string> = {
  cpp: 'cpp',
  node: 'js',
  java: 'java',
  python: 'py',
  python3: 'py',
}

export const executionCmd: Dictionary<string> = {
  cpp: 'g++ code.cpp && ./a.out < input',
  java: 'java code.java < input',
  node: 'node code.js < input',
  python: 'python3 code.py < input',
  python3: 'python3 code.py < input',
}
