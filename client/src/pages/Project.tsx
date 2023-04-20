import DailyWork from '../components/Project/DailyWork'
import Progress from '../components/Project/Progress'
import BoardStatus from '../components/Project/BoardStatus'
import WelcomeBack from '../components/Project/WelcomeBack'
import PageHeader from '../components/UI/PageHeader'
import LatestNote from '../components/Project/LatestNote'

const Project = () => {
  return (
    <>
      <PageHeader title="Project" sub="Dashboard" />

      <div className="[&>div]:bg-brand-800 [&>div]:border-brand-700 grid grid-cols-3 gap-4 [&>div]:min-h-[200px] [&>div]:rounded-md [&>div]:border [&>div]:p-5">
        <Progress />
        <div className="!p-0">
          <WelcomeBack />
        </div>
        <div className="row-span-2 h-[320px]">
          <BoardStatus />
        </div>
        <div className="col-span-2 row-span-2">
          <LatestNote />
        </div>
        <DailyWork />
      </div>
    </>
  )
}

export default Project
