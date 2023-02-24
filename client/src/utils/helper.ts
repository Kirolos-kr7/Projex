export const getUserICon = (fullName: string) => {
  fullName = fullName.trim()
  const arr = fullName.split(' ')
  if (arr.length > 1) return arr[0][0] + arr[1][0]
  else if (fullName.length > 1) return fullName[0] + fullName[1]

  return fullName[0]
}
