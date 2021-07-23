import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Button from './Atomic/Button';
import { ChevronLeft } from 'akar-icons';

import { ShopifyContext } from '../context/ShopifyContext';

import { useState, useContext, useEffect } from 'react';

const BuyingSection = ({ variants, selectedVariant, itemId, quantity }) => {
  const { addItem } = useContext(ShopifyContext);

  const handleClick = () => {
    addItem(itemId, parseInt(quantity));
  };

  if (variants[selectedVariant].available) {
    return (
      <section className='w-full'>
        <Button onClick={handleClick} className='w-full'>
          Añadir al carrito
        </Button>
      </section>
    );
  } else {
    return (
      <section className='flex gap-2 items-center'>
        <p className='text-sm text-red-500'>Este producto no está disponible</p>
        <Button
          className='bg-gray-100 text-gray-400 border-2 border-gray-100 rounded-md shadow-sm cursor-not-allowed'
          disabled>
          Añadir
        </Button>
      </section>
    );
  }
};

const SelectVariant = ({ variants, handleChange }) => {
  if (variants.lenght == 1) {
    return null;
  } else {
    return (
      <select
        className='w-full p-2 mt-2 border-2 border-primary-600 cursor-pointer shadow-md rounded-md text-gray-700 bg-white-accent hover:border-red-700 transition-all duration-300'
        name='variants'
        id='variants'
        onChange={handleChange}>
        {variants.map((variant, index) => (
          <option key={variant.id} value={index}>
            {variant.title}
          </option>
        ))}
      </select>
    );
  }
};

export default function SingleProduct({ productId }) {
  const { fetchProduct, product } = useContext(ShopifyContext);

  useEffect(() => {
    fetchProduct(productId);

    return () => {};
  }, [fetchProduct]);

  const [productVariant, setProductVariant] = useState(0);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleVariantChange = event => {
    setProductVariant(event.target.value);
  };

  const handleQuantityChange = event => {
    setQuantity(event.target.value);
  };

  const handleImageChange = (event, url) => {
    setSelectedImage(url);
  };

  if (!product.title) return <div></div>;

  const backgroundUrl =
    selectedImage == '' ? product.images[0].src : selectedImage;

  return (
    <>
      <Head>
        <title>Store Name - {product.title}</title>
      </Head>

      <main className='min-h-screen'>
        <section className='pt-4 px-4'>
          <Link href='/'>
            <a className='font-bold text-gray-900 hover:text-primary-500 transition-all duration-300'>
              <ChevronLeft size={30} />
            </a>
          </Link>
        </section>

        <article className='container mx-auto px-4 flex flex-col lg:flex-row justify-center items-center gap-6 '>
          <section className='w-full grid justify-items-center'>
            <div className='my-6'>
              <figure
                className='w-96 h-96 bg-center bg-cover bg-no-repeat shadow-lg rounded-sm'
                style={{
                  backgroundImage: 'url(' + backgroundUrl + ')',
                }}></figure>
            </div>
            <div className='grid grid-cols-4 gap-2 justify-items-start '>
              {product.images.map((image, index) => (
                <figure
                  key={`image-${index}`}
                  onClick={event =>
                    handleImageChange(event, product.images[index].src)
                  }
                  className='w-20 h-20 bg-center bg-cover bg-no-repeat cursor-pointer hover:shadow-sm hover:opacity-60 transition-all duration-300 rounded-lg'
                  style={{ backgroundImage: `url(${image.src})` }}></figure>
              ))}
            </div>
          </section>

          <section
            className='w-screen bg-white space-y-4 p-4 rounded-t-3xl lg:rounded-b-xl lg:rounded-t-xl flex flex-col justify-around'
            style={{
              boxShadow: '0 -5px 59px rgba(0,0,0,.10)',
              minHeight: '47vh',
            }}>
            {/* Product title and product price */}
            <div className='space-y-4'>
              <section>
                <h2 className='font-semibold text-4xl lg:text-5xl text-red-700 tracking-tight mb-2'>
                  {product.title}
                </h2>
                <p className='text-gray-800 font-semibold text-lg'>
                  ${product.variants[productVariant].price}
                </p>
              </section>
              {/* Product information */}
              <section>
                <p className='text-gray-500'>{product.description}</p>
              </section>
              {/* Variant selector */}
              <div>
                <label
                  htmlFor='quantity'
                  className='text-sm text-gray-400 py-2'>
                  Cantidad:
                </label>
                <section className='flex gap-4'>
                  {/* Quantity selector */}
                  <article className=''>
                    <input
                      type='number'
                      name='quantity'
                      id='quantity'
                      className='w-full mt-2 p-2 border-2 border-primary-600 cursor-pointer shadow-md rounded-md text-gray-700 bg-white-accent hover:border-red-700 transition-all duration-300'
                      placeholder='1'
                      min='1'
                      value={quantity}
                      onChange={handleQuantityChange}
                    />
                  </article>
                  <SelectVariant
                    variants={product.variants}
                    handleChange={handleVariantChange}
                  />
                </section>
              </div>
            </div>

            {/* Add to cart button */}
            <BuyingSection
              itemId={product.variants[productVariant].id}
              quantity={quantity}
              selectedVariant={productVariant}
              variants={product.variants}
            />
          </section>
        </article>
      </main>
    </>
  );
}
