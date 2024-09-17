import React from 'react';
import Image from 'next/image';

const NavbarLogo = () => {
  return (
    <>
      <div className="flex items-center">
        {/* <Image
          className="align-middle"
          src="/logo.png"
          alt="logo"
          width={90}
          height={40}
        /> */}
        <h1 className="font-bold text-base text-white hidden md:block ml-2">
          BorrowHub
        </h1>
      </div>
    </>
  );
};

export default NavbarLogo;
