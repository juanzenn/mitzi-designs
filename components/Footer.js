const Footer = () => {
  return (
    <footer className='w-full bg-gray-800 text-center py-12'>
      <p className='text-sm text-gray-600'>
        Todos los derechos reservados - Mitzi Designs 2021
      </p>
      <p className='text-sm text-gray-600'>
        Creado con :love: por
        <a
          href='https://www.juanzenn.github.io/bloblsfolio-es'
          className='text-blue-800 hover:text-blue-900'>
          {' '}
          Juan Alvarez
        </a>
      </p>
    </footer>
  )
}

export default Footer
