export const isValidLanguage = (lang: string): boolean => {
  switch (lang) {
    case 'cpp':
    case 'java':
    case 'node':
    case 'python':
    case 'python3':
      return true
    default:
      return false
  }
}
