import On from '@iconify-icons/mdi/eye-outline'
import Off from '@iconify-icons/mdi/eye-off-outline'
import { Icon } from '@iconify/react/dist/offline'
import { FormEvent, FormEventHandler, useContext, useState } from 'react'
import useAxios from '../hooks/useAxios'
import { UserContext } from '../UserContext'

const Auth = () => {
  const [inputShown, setInputShown] = useState('password')
  const { setUser } = useContext(UserContext)

  const login: FormEventHandler<HTMLFormElement> = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    const data = new FormData(e.target as HTMLFormElement)
    const [email, password] = [...data.values()]

    const { ok, data: user } = await useAxios({
      method: 'post',
      path: '/auth/login',
      body: {
        email,
        password
      }
    })

    if (ok) setUser(user)
  }

  return (
    <div className="grid min-h-screen place-content-center">
      <div className="bg-brand-900 border-brand-700 -mt-20 min-w-[480px] rounded-md border px-5 py-4 shadow-md">
        <h1 className="text-brand-100 text-3xl font-black uppercase">Login</h1>
        <form className="mt-5 flex flex-col items-end gap-2" onSubmit={login}>
          <div className="w-full">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              className="mb-3 px-3 text-sm "
              type="email"
              name="email"
              id="email"
              required
              autoFocus
            />
          </div>
          <div className="relative w-full">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              className="mb-3 px-3 text-sm"
              type={inputShown}
              name="password"
              id="password"
              required
            />
            <button
              type="button"
              className="absolute right-0 mr-0.5 rounded-r px-3 py-2"
              onClick={() =>
                setInputShown((val) =>
                  val == 'password' ? 'text' : 'password'
                )
              }
            >
              {inputShown == 'password' ? (
                <Icon icon={On} width="20px"></Icon>
              ) : (
                <Icon icon={Off} width="20px"></Icon>
              )}
            </button>
          </div>
          <button className="btn danger">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Auth
