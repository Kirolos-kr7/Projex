import type { Dispatch, SetStateAction } from 'react'
import { SelectUserBoard } from '../../types'

const SelectUsers = ({
  users,
  setSelected
}: {
  users: SelectUserBoard[]
  setSelected: Dispatch<SetStateAction<string[]>>
}) => {
  return (
    <div className="flex flex-row-reverse items-center">
      {users.map(({ userName, hasProfileImage, id, selected }) => (
        <button
          className={`-mx-1.5 rounded-full bg-black p-0.5 transition-shadow ${
            selected ? 'ring' : ''
          }`}
          key={userName}
          data-tooltip={userName}
          onClick={() =>
            setSelected((p) => {
              if (p.includes(id)) return p.filter((x) => x != id)
              return [...p, id]
            })
          }
        >
          {id == 'unassigned' ? (
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full p-0.5
          "
            >
              U
            </span>
          ) : (
            <img
              className="h-8 w-8 rounded-full"
              src={
                hasProfileImage
                  ? `/storage/users/${id}.webp`
                  : '/profile-picture.jpg'
              }
            />
          )}
        </button>
      ))}
    </div>
  )
}

export default SelectUsers
