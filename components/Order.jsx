import React from 'react';

export default function Order({ id, amount, images, timestamp, items }) {
  return (
    <div className="border border-gray-200 mb-4 rounded overflow-hidden relative">
      <div className="bg-gray-100 p-5 flex items-center space-x-6 text-sm text-gray-600">
        <div>
          <h3 className="font-bold txt-xl">ORDER PLACED</h3>
          <p>05 April 2022</p>
        </div>
        <div className="flex-1">
          <h3 className="text-xs font-bold">TOTAL</h3>
          <p>${amount} </p>
        </div>
        <div>
          <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap text-right">
            ORDER: {id}
          </p>
          <p className="text-right text-blue-500 sm:text-xl">
            {items.length} Items
          </p>
        </div>
      </div>
      <div className="p-5 sm:p-10">
        <div className="flex space-x-6 overflow-x-auto">
          {images.map((url, index) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={url}
              key={index}
              className="h-20 sm:h-32 object-contain"
              alt=""
            />
          ))}
        </div>
      </div>
    </div>
  );
}
