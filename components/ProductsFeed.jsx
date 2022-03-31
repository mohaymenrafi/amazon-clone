import React from 'react';
import Product from './Product';

export default function ProductsFeed({ products }) {
  return (
    <div className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto md:-mt-52">
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </div>
  );
}
