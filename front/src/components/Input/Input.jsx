export default function Input({ type, setArquivoCsv }) {
  function handleFile(e) {
    const file = e.target.files[0]
    setArquivoCsv(file)
  }
  return (
    <input
      className='pr-2 text-lg text-gray-900 border border-gray-900 rounded-lg cursor-pointer bg-gray-50 focus:outline-none'
      onChange={handleFile}
      type={type}
      required
    />
  )
}
