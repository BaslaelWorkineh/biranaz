
const Loader = ({isVisible}:{isVisible:boolean}) => {
  return (
    isVisible && <div className="absolute w-full h-full flex justify-center items-center text-3xl font-light font-sans text-brown-800  backdrop-blur-sm z-40 bg-[#ffcf9f44]">
      <div className="animate-pulse">
            Loading ...
      </div>
    </div>
  )
}

export default Loader


