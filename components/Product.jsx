import React, { useState } from 'react';
import Image from 'next/image';
import { AiFillStar } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';

export default function Product({
  category,
  image,
  title,
  rating,
  description,
  price,
  id,
}) {
  const [star] = useState(Math.round(rating.rate));
  const dispatch = useDispatch();
  const item = {
    category,
    image,
    title,
    rating,
    description,
    price,
    quantity: 1,
    id,
  };
  const handleAddToCart = () => {
    dispatch(addToCart(item));
  };
  return (
    <div className=" relative bg-white m-5 p-10 z-30 flex flex-col">
      <p className="absolute top-2 right-4 text-gray-400 italic">{category}</p>
      <div className="mb-4 flex justify-center">
        <Image src={image} objectFit="contain" width={200} height={200} />
      </div>
      <h4 className="text-black text-md mb-2">{title}</h4>
      <div className="flex items-center mb-2">
        {Array(star)
          .fill('')
          .map((_, i) => (
            <AiFillStar className="text-yellow-500" />
          ))}
        <p className="text-sm ml-2">({rating.count})</p>
      </div>

      <p className=" line-clamp-2 text-xs mb-3">{description}</p>

      <p>{price}</p>
      <div className="flex items-center ">
        <Image
          src="/images/Prime-tag-.png"
          objectFit="contain"
          width={80}
          height={50}
        />
        <p className="text-xs text-gray-500 -ml-2">FREE Next-day Delivery</p>
      </div>
      {/* eslint-disable  */}
      <button
        type="button"
        className="button mt-auto"
        onClick={() => handleAddToCart()}
      >
        Add to Cart
      </button>
    </div>
  );
}
