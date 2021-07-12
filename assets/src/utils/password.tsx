export enum PasswordStrengthLevel {
  TOO_SHORT,
  WEAK,
  STRONG
}

export function passwordStrength(password: string) {
  const numbers = /[0-9]/.test(password) && 1
  const upper = /[A-Z]/.test(password) && 1
  const lower = /[a-z]/.test(password) && 1
  const special = /[^a-zA-Z0-9]/.test(password) && 1
  const long = password.length >= 12 && 1

  const score = numbers + upper + lower + special + long

  if (password.length < 6) {
    return PasswordStrengthLevel.TOO_SHORT
  } else if (score < 3) {
    return PasswordStrengthLevel.WEAK
  } else {
    return PasswordStrengthLevel.STRONG
  }
}
