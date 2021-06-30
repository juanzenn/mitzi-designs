const Button = props => {
  const { outlined = false, children, ...rest } = props

  const outlinedVersion = () => {
    switch (outlined) {
      case true:
        return `text-black border-2 border-black hover:bg-black hover:text-white`
      case false:
        return `bg-black text-white border-2 border-black hover:border-gray-900 hover:bg-gray-900`
      case 'default':
        return `bg-black text-white border-2 border-black hover:border-gray-900 hover:bg-gray-900`
    }
  }

  const outline = outlinedVersion()

  return (
    <button
      className={`px-4 py-2 tracking-tight transition-all duration-300 shadow-lg rounded-md ${outline}`}
      {...rest}>
      {children}
    </button>
  )
}

export default Button
