const Event = ({ evt }: { evt: { title: string; status: number } }) => {
  return (
    <div
      className="opa cursor-grab rounded-sm bg-gray-800 p-2"
      draggable="true"
      onDragStart={(e) => {
        const el = e.target as HTMLElement
        el.classList.add('opacity-40')
        e.dataTransfer.setData('applicaion/json', JSON.stringify(evt))
      }}
      onDragEnd={(e) =>
        (e.target as HTMLElement).classList.remove('opacity-40')
      }
    >
      <h3 className="text-sm">{evt.title}</h3>
      <div className="flex items-baseline justify-between">
        <span className=" text-xs">PMS-2</span>
        <div className="h-5 w-5 rounded-full">
          <img
            id="user_img"
            className="w-inherit h-inherit rounded-[inherit]"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsIlzGp1laQheiAAjrbJJ3pasHLjMBnIUEZg&usqp=CAU"
            alt="user image"
          />
        </div>
      </div>
    </div>
  )
}

export default Event
