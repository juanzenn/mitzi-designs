import Image from 'next/image';
import { useState, useContext } from 'react';
import { ShopifyContext } from '../../context/ShopifyContext';
import Button from '../Atomic/Button';

const CartItem = ({ item, variantId }) => {
  const { updateQuantity, removeItem } = useContext(ShopifyContext);

  const [quantity, setQuantity] = useState(item.quantity);

  const handleUpdate = () => {
    updateQuantity(variantId, parseInt(quantity));
  };

  const handleRemove = () => {
    removeItem(variantId);
  };

  return (
    <article key={item.variant.id} className='px-4 flex gap-4 my-10'>
      <section>
        <div
          className='w-32 h-32 bg-cover bg-center bg-no-repeat rounded-sm'
          style={{ backgroundImage: `url(${item.variant.image.src})` }}></div>
      </section>
      <section>
        <p className='text-gray-800 pb-1'>
          {item.title} - {item.variant.title}
        </p>
        <p className='text-gray-800 tracking-wide font-semibold pb-2'>
          Total - ${item.variant.price * quantity}
        </p>
        <div className='flex gap-2 items-end'>
          <section className='w-full'>
            <label className='text-gray-800 text-sm tracking-wide font-semibold pb-1'>
              Cantidad
            </label>
            <input
              className='w-full p-2 border border-primary-600 cursor-pointer shadow-sm rounded-md hover:border-red-700 transition-all'
              type='number'
              min='1'
              value={quantity}
              onChange={event => setQuantity(event.target.value)}
            />
          </section>
          <section className='w-full flex gap-2'>
            <Button onClick={handleUpdate}>Actualizar</Button>
            <Button outlined={true} onClick={handleRemove}>
              Eliminar
            </Button>
          </section>
        </div>
      </section>
    </article>
  );
};

export default CartItem;
