
const Loader = ({isVisible}:{isVisible:boolean}) => {
  return (
    isVisible && <div className="absolute w-full h-full flex justify-center items-center text-3xl font-light font-sans text-brown-800 animate-pulse backdrop-blur-sm">Loading ...</div>
  )
}

export default Loader