export const getUserICon = (fullName: string) => {
  fullName = fullName.trim()
  const arr = fullName.split(' ')
  if (arr.length > 1) return arr[0][0] + arr[1][0]
  else if (fullName.length > 1) return fullName[0] + fullName[1]

  return fullName[0]
}

export const pulseAnim = (el: HTMLElement) => {
  el.animate(
    [{ outline: '0px solid #E02424' }, { outline: '10px solid #e0242400' }],
    {
      easing: 'ease-out',
      duration: 750
    }
  )
}
