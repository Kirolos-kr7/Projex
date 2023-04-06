import { toast } from 'react-toastify'

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

export const handleError = (err: { name: string; message: string }) => {
  const { name, message } = err
  let errMessage = ''

  if (name == 'TRPCClientError') errMessage = JSON.parse(message)[0].message
  else errMessage = message

  toast.error(errMessage)
  return errMessage
}
