const WelcomeBack = () => {
  return (
    <div className="relative h-full overflow-hidden p-7">
      <p className="text-3xl font-black">
        Welcome <br /> Back
      </p>
      <img
        className="absolute right-0 top-5 w-48 translate-y-4 opacity-0 transition-all duration-500"
        onLoad={(e) => {
          const img = e.target as HTMLElement
          img.classList.remove('opacity-0')
          img.classList.remove('translate-y-4')
        }}
        src="/user.png"
        alt=""
      />
    </div>
  )
}

export default WelcomeBack
