import Image from 'next/image';
import { AiFillStar } from 'react-icons/ai';

import React from 'react';
import { useDispatch } from 'react-redux';
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from '../slices/cartSlice';

export default function CartItems({
  image,
  title,
  rating,
  description,
  price,
  id,
  quantity,
}) {
  const star = Math.round(rating.rate);
  const dispatch = useDispatch();
  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(id));
  };
  const handleIncrease = () => {
    dispatch(increaseQuantity(id));
  };
  const handleDecrease = () => {
    dispatch(decreaseQuantity(id));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 my-6 items-center">
      {/* left  */}
      <div>
        <Image src={image} width="175" height="175" objectFit="contain" />
      </div>

      {/* middle  */}
      <div className="md:col-span-3">
        <h3 className="text-lg">{title}</h3>
        <div className="flex items-center mb-2">
          {Array(star)
            .fill('')
            .map((_, i) => (
              <AiFillStar className="text-yellow-500" />
            ))}
          <p className="text-sm ml-2">({rating.count})</p>
        </div>
        <p className="text-sm my-3 line-clamp-3">{description}</p>
        <p>
          ${price} * {quantity} = ${price * quantity}
        </p>
      </div>

      {/* right  */}
      <div className="flex flex-col space-y-3">
        <div className="flex justify-between items-center">
          <button
            type="button"
            className="button px-4 text-2xl disabled:from-gray-200 disabled:to-gray-400 disabled:cursor-not-allowed disabled:border-gray-200"
            onClick={() => handleDecrease(id)}
            disabled={quantity < 2}
          >
            -
          </button>
          <p className="text-lg">{quantity}</p>
          <button
            type="button"
            className="button px-4 text-2xl"
            onClick={() => handleIncrease(id)}
          >
            +
          </button>
        </div>
        <button
          type="button"
          className="button px-6"
          onClick={() => handleRemoveFromCart(id)}
        >
          Remove From Basket
        </button>
      </div>
    </div>
  );
}
