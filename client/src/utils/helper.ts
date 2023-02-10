export const getUserICon = (name: string) => {
  name = name.trim()
  const arr = name.split(' ')
  if (arr.length > 1) return arr[0][0] + arr[1][0]
  else if (name.length > 1) return name[0] + name[1]

  return name[0]
}
