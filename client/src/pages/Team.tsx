import { useEffect, useMemo, useState } from 'react'
import type { UserWithRole, Role } from '../types'

import Search from '../components/UI/Search'
import DropDown from '../components/UI/DropDown'
import { Icon } from '@iconify/react/dist/offline'
import Delete from '@iconify-icons/mdi/delete-outline'
import { getUserICon } from '../utils/helper'
import PageHeader from '../components/UI/PageHeader'
import { trpc } from '../utils/trpc'
import useAdmin from '../hooks/useAdmin'
import ConfirmationDialog from '../components/Dialogs/ConfirmationDialog'
import Popup from '../components/UI/Popup'
import userStore from '../stores/userStore'
import { AnimatePresence } from 'framer-motion'

const Team = () => {
  const [deletePopup, setDeletePopup] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [members, setMembers] = useState<UserWithRole[]>([])
  const [selectedUserId, setSelectedUserId] = useState<string | null>()
  const [roles, setRoles] = useState<Role[]>([])
  const isAdmin = useAdmin()
  const { user } = userStore()

  const getRoles = async () => {
    const m: any = await trpc.users.getAll.query()
    const r: any = await trpc.roles.getAll.query()
    setMembers(
      m.sort((x: UserWithRole) => {
        if (x.id != user?.id) return 1
        else return -1
      })
    )
    setRoles(r)
  }

  useEffect(() => {
    getRoles()
  }, [])

  const getFilteredMembers = () => {
    if (searchValue == '') return members

    return members.filter(({ userName, fullName, email }) => {
      return (
        userName.toLowerCase().includes(searchValue.toLowerCase()) ||
        fullName.toLowerCase().includes(searchValue.toLowerCase()) ||
        email.toLowerCase().includes(searchValue.toLowerCase())
      )
    })
  }

  const anyAdminsLeft = useMemo(
    () => members.filter(({ roleId }) => roleId == 1).length > 1,
    [members]
  )

  const changeRole = async ({
    userId,
    newRole
  }: {
    userId: string
    newRole: Role
  }) => {
    await trpc.roles.changeRole.mutate({
      userId,
      roleId: newRole.id
    })

    await getRoles()
  }

  const removeUser = async () => {
    if (!selectedUserId) return
    await trpc.users.remove.mutate({ userId: selectedUserId })
    await getRoles()
    setDeletePopup(false)
  }

  return (
    <>
      <PageHeader title="Team" sub="Manage your teammates" />

      <div className="mb-3 flex items-center justify-between ">
        <Search
          placeholder="Search members"
          update={(val) => setSearchValue(val)}
        />
      </div>

      <div className="rounded-md bg-gray-900">
        <table className="w-full">
          <thead className="text-xs text-gray-400">
            <tr className="[&>*]:px-2 [&>*]:py-3 sm:[&>*]:px-3">
              <td>Name</td>
              <td>Email</td>
              <td>Role</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {getFilteredMembers().map(({ id, fullName, email, role }) => {
              return (
                <tr
                  key={id}
                  className="odd:bg-gray-800/50 [&>*]:px-2 [&>*]:py-1 sm:[&>*]:px-3"
                >
                  <td>
                    <div className="flex items-center gap-2 py-1.5">
                      <span className="hidden h-8 w-8 shrink-0 place-content-center rounded-full bg-red-700 text-xs uppercase sm:grid">
                        {getUserICon(fullName)}
                      </span>
                      <h3 className="text-sm sm:text-base">{fullName}</h3>
                    </div>
                  </td>
                  <td className="text-sm sm:text-base">{email}</td>
                  <td>
                    <DropDown
                      buttonStyle="text-xs sm:text-base"
                      listStyle="text-xs sm:text-base"
                      selected={role?.role}
                      options={roles}
                      keyValue="role"
                      fn={(val) => changeRole({ userId: id, newRole: val })}
                      disabled={!isAdmin || (!anyAdminsLeft && role?.id == 1)}
                    />
                  </td>
                  <td>
                    <div className="-mx-1.5 flex items-center gap-2">
                      <button
                        className="rounded-full p-1.5 text-red-600 transition-colors hover:bg-gray-800 disabled:text-gray-600"
                        disabled={!isAdmin}
                        onClick={() => {
                          setDeletePopup(true)
                          setSelectedUserId(id)
                        }}
                      >
                        <Icon icon={Delete} width="22px" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {deletePopup && (
          <Popup
            open={deletePopup}
            title="Delete User"
            closePopup={() => setDeletePopup(false)}
          >
            <ConfirmationDialog
              message="Are you sure you want to delete this user?"
              accept={removeUser}
              cancel={() => setDeletePopup(false)}
            />
          </Popup>
        )}
      </AnimatePresence>
    </>
  )
}

export default Team
