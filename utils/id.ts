import { customAlphabet } from 'nanoid/non-secure'
export const newSessionId = customAlphabet('abcdefghijklmnopqrstuvwxyz123456789', 8)
