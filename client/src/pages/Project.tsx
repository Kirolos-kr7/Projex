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

      <div className="[&>div]:bg-brand-800 [&>div]:border-brand-700 flex w-full flex-col gap-3 md:grid md:grid-cols-2 lg:grid-cols-3 [&>div]:min-h-[200px] [&>div]:rounded-md [&>div]:border [&>div]:p-5">
        <Progress />
        <div className="-order-1 !p-0 md:order-none">
          <WelcomeBack />
        </div>
        <div className="md:row-span-2 md:h-[320px]">
          <BoardStatus />
        </div>
        <div className="order-last col-span-2 md:order-none md:row-span-2">
          <LatestNote />
        </div>
        <div className="!bg-zinc-500 md:col-start-2 md:row-start-2 lg:col-start-auto lg:row-start-auto">
          <DailyWork />
        </div>
      </div>
    </>
  )
}

export default Project
