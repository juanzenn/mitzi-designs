import { useState } from 'react'

const CollectionNavbar = ({ collections, handleCollectionSelection }) => {
  const [selectedItem, setSelectedItem] = useState('item-0')
  const activeClass =
    'cursor-pointer px-6 h-full grid items-center text-gray-800 bg-gray-200 border-b-2 border-primary-500 transition-all duration-300'
  const normalClass =
    'cursor-pointer px-6 h-full grid items-center text-gray-800 hover:bg-gray-200 border-b-2 border-opacity-0 hover:border-opacity-100 hover:border-primary-500 transition-all duration-300'

  return (
    <nav className='w-full h-16 bg-white-accent shadow-sm mb-16'>
      <ul className='h-full px-4 flex items-center overflow-x-scroll lg:overflow-x-auto'>
        {collections.map((collection, index) => (
          <li
            data-index={index}
            onClick={event => {
              handleCollectionSelection(event)
              setSelectedItem(`item-${event.target.dataset.index}`)
            }}
            className={
              selectedItem == `item-${index}` ? activeClass : normalClass
            }>
            {collection.title}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default CollectionNavbar
