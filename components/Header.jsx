import React from 'react';
import Image from 'next/image';
import { BiSearchAlt2 } from 'react-icons/bi';
import { BsCart3 } from 'react-icons/bs';
import { RiBarChartHorizontalLine } from 'react-icons/ri';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function Header() {
  const { data: session } = useSession();
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log(cartItems);

  const router = useRouter();
  return (
    <header>
      {/* navbar top */}
      <div className=" bg-amazon_blue text-white flex items-center p-1 py-2 pr-4 flex-grow space-x-4">
        {/* logo */}
        <div className="flex items-center flex-grow sm:flex-grow-0">
          <Image
            src="/images/amazon_logo.png"
            objectFit="contain"
            width={150}
            height={50}
            className="cursor-pointer"
          />
        </div>

        {/* search bar  */}
        <div className="hidden sm:flex flex-grow  items-center bg-yellow-400 hover:bg-yellow-500 rounded-md overflow-hidden">
          <input
            type="text"
            className="flex-grow p-2 text-black focus:outline-0"
          />
          <BiSearchAlt2 className="px-2 h-10 w-10 cursor-pointer" />
        </div>

        {/* userInfo */}
        <div className=" flex items-center space-x-4 sm:space-x-6 md:space-x-8 whitespace-nowrap">
          <div className="link" onClick={signIn} role="button">
            {session ? <p>Hello, {session.user.name}</p> : <p>Sign in</p>}
            <p className="font-bold">Account & lists</p>
          </div>
          <div
            className="link"
            onClick={() => router.push('/orders')}
            role="button"
          >
            <p>Returns</p>
            <p className="font-bold">& Orders</p>
          </div>
          <div
            className="relative flex items-center link"
            onClick={() => router.push('/checkout')}
            role="button"
          >
            <span className="bg-yellow-400 w-5 h-5 flex items-center justify-center rounded-full absolute top-0 right-0 md:right-5">
              {cartItems.length}
            </span>
            <BsCart3 className="text-4xl" />
            <p className="font-bold mt-4 hidden md:inline-flex">Cart</p>
          </div>
          {session && (
            <div className="link" onClick={signOut} role="button">
              <p>Signout</p>
            </div>
          )}
        </div>
      </div>

      {/* navbar bottom  */}
      <div className=" bg-amazon_blue-light p-2 pl-4 text-white flex space-x-4">
        <p className="flex items-center link">
          <RiBarChartHorizontalLine className="mr-2" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today's Deal</p>
        <p className="link hidden sm:inline-flex">Electronics</p>
        <p className="link hidden sm:inline-flex">Food & Grocery</p>
        <p className="link hidden sm:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shopper Tooklit</p>
        <p className="link hidden lg:inline-flex">Health & Personal Care</p>
      </div>
    </header>
  );
}
