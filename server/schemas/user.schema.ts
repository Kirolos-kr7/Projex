import Z from 'zod'

export const RegisterSchema = Z.object({
  fullName: Z.string().min(3).max(255),
  userName: Z.string().min(2).max(128),
  email: Z.string().email({ message: 'Invalid email address.' }),
  password: Z.string().min(8, {
    message: "Password can't be less than 8 characters long."
  }),
  confirmPassword: Z.string().min(8)
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: 'custom',
      message: 'Passwords does not match.'
    })
  }
})

export const LoginSchema = Z.object({
  email: Z.string().email({ message: 'Invalid email address.' })
})
