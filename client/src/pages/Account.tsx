import { useRef, useState, FormEvent, ChangeEvent, useEffect } from 'react'
import PageHeader from '../components/UI/PageHeader'
import DropDown from '../components/UI/DropDown'
import Button from '../components/UI/Button'
import useAxios from '../hooks/useAxios'
import { toast } from 'react-toastify'
import { Navigate } from 'react-router-dom'
import userStore from '../stores/userStore'

const Account = () => {
  const { user, setUser } = userStore()

  const imgRef = useRef<HTMLImageElement | null>(null)
  const fileRef = useRef<HTMLInputElement | null>(null)
  const [pending, setPending] = useState(false)

  if (!user) {
    Navigate({ to: '/auth' })
    return <></>
  }

  const [userName, setUserName] = useState(user.userName)
  const [fullName, setFullName] = useState(user.fullName)
  const [profileImg, setProfileImg] = useState<File | undefined>()

  const updateUserInfo = async (e: FormEvent) => {
    e.preventDefault()

    if (!profileImg && userName == user.userName && fullName == user.fullName)
      return

    setPending(true)
    const { data, ok } = await useAxios('/user/profile', {
      method: 'patch',
      body: {
        userName,
        fullName,
        'profile-img': profileImg
      },
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    setPending(false)
    if (ok) {
      toast.success(data.message)
      setUser(data.user)
    } else toast.error(data)
  }

  const handleImgChange = (e: ChangeEvent) => {
    const files = (e.target as HTMLInputElement).files
    if (!files || !files[0]) return
    const newImg = files[0]
    setProfileImg(newImg)

    const imgUrl = URL.createObjectURL(newImg)
    imgRef.current && (imgRef.current.src = imgUrl)
  }

  useEffect(() => {
    if (!imgRef.current) return
    const el: HTMLImageElement = imgRef.current
    el.src = user.hasProfileImage
      ? `/storage/users/${user.id}.webp`
      : '/profile-picture.jpg'
  }, [user])

  return (
    <>
      <PageHeader title="Account" sub="Manage your profile" />

      <form className="mt-4 flex flex-col gap-4" onSubmit={updateUserInfo}>
        <div>
          <label htmlFor="picture">Profile Picture</label>
          <button
            className="h-40 w-40 rounded-full "
            type="button"
            onClick={() => fileRef.current?.click()}
          >
            <img
              id="user_img"
              ref={imgRef}
              className="h-[inherit] w-[inherit] rounded-[inherit] object-cover"
              alt="user image"
            />
          </button>
          <input
            type="file"
            className="hidden"
            name="picture"
            id="picture"
            ref={fileRef}
            onChange={handleImgChange}
            multiple={false}
            accept="image/*"
          />
        </div>
        <div>
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            name="username"
            id="username"
            defaultValue={user.userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            name="fullname"
            id="fullname"
            defaultValue={user.fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            disabled
            name="email"
            id="email"
            defaultValue={user.email}
          />
        </div>
        <div>
          <label>Role</label>
          <DropDown
            buttonStyle="!w-full"
            selected={user.role?.role}
            options={[]}
            disabled
          />
        </div>

        <div>
          <Button pending={pending}>Update</Button>
        </div>
      </form>
    </>
  )
}

export default Account
