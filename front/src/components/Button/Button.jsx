export default function Button({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className='
      bg-blue-700
      rounded-md
      px-8
      py-3
      text-white 
      hover:bg-blue-600 
      duration-150
      '
    >
      {children}
    </button>
  )
}
