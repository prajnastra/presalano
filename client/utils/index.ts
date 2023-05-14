export const API = process.env.API || 'http://localhost:8000'

export const sliceString = (inputString: string, len: number = 30) => {
  if (inputString.length > len) {
    return inputString.slice(0, len) + '...'
  } else {
    return inputString
  }
}

export * from './blockforest'
