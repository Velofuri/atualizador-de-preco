export default function Button({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className='
      bg-green-700
      rounded-md
      px-8
      py-3
      text-white 
      hover:bg-green-500
      duration-150
      '
    >
      {children}
    </button>
  )
}
