import { Task } from '../types'
import DropDown from './UI/DropDown'

const NewTask = ({ task, tasks }: { task: string; tasks: Task[] }) => {
  return (
    <div>
      <DropDown options={tasks} selected={task}></DropDown>
    </div>
  )
}

export default NewTask
