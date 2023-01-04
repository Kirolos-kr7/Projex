import Settings from '@iconify-icons/ic/sharp-code-off'
import { Icon } from '@iconify/react/dist/offline'
import { Repo as RepoType } from '../../types'
import moment from 'moment'

const Repo = ({ repo }: { repo: RepoType }) => {
  return (
    <div className="flex flex-col gap-2 rounded-md bg-gray-800 p-2 ">
      <div className="flex justify-between gap-3">
        <div className="grid h-10 w-10 place-content-center overflow-hidden rounded-md bg-black p-2">
          <Icon icon={Settings} className="rounded-md " width="1.5rem" />
        </div>
        <span className="text-xs text-gray-400">{repo.origin}</span>
      </div>
      <h2>{repo.name}</h2>
      <span className="-mt-0.5 text-sm text-gray-400">
        Last updated {moment(repo.updatedAt).fromNow()}
      </span>
    </div>
  )
}

export default Repo
