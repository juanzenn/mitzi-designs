import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import { ShopifyContext } from '../context/ShopifyContext';

const Product = ({ product }) => {
  return (
    <article className='w-full flex flex-col items-center pb-2 border border-gray-200 shadow-sm rounded-lg overflow-hidden gap-2'>
      <Link href={`/product/${product.id}`}>
        {product.variants[0].image == null ? (
          <span></span>
        ) : (
          <div
            className='cursor-pointer w-full h-72 bg-cover bg-no-repeat bg-center'
            style={{
              backgroundImage: `url(${product.variants[0].image.src})`,
            }}></div>
        )}
      </Link>

      <section className='w-full text-left space-y-1 px-2'>
        <h3 className='text-2xl font-semibold text-red-700 tracking-tight'>
          {product.title}
        </h3>
        <p className='font-semibold text-base text-black tracking-wide'>
          ${product.variants[0].price}
        </p>
      </section>
    </article>
  );
};

export default function AllProducts(props) {
  return (
    <>
      {props.products.length > 0 ? (
        <section
          className='container mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center px-4'
          style={{ minHeight: '50vh' }}>
          {props.products.map(product => (
            <Product key={product.id} product={product} />
          ))}
        </section>
      ) : (
        <section
          className='container mx-auto flex items-start justify-items-center px-4'
          style={{ minHeight: '50vh' }}>
          <p className='text-gray-400 text-2xl'>
            No hay productos de esta categoría...
          </p>
        </section>
      )}
    </>
  );
}
