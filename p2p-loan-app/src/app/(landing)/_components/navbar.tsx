import { Button } from '@/components/ui/button';
import LandingLogo from './logo';
import Link from 'next/link';

const Navbar = () => {
  return (
    <>
      <div className="justify-center items-center flex">
        <nav className="py-2 px-10 md:px-12 shadow-md flex justify-between w-[1300px] rounded-full fixed top-10 bg-white border-b">
          <LandingLogo />

          <div className="justify-between w-1/2 items-center flex">
            <Link href="#home" className="text-gray-700 hover:text-black">
              Home
            </Link>
            <Link href="#about" className="text-gray-700 hover:text-black">
              About
            </Link>
            <Link href="#services" className="text-gray-700 hover:text-black">
              Services
            </Link>
            <Link href="#contact" className="text-gray-700 hover:text-black">
              Contact
            </Link>
            <Link href={''}></Link>
          </div>

          <div className=" space-x-4">
            <Button
              asChild
              className="py-3 text-white bg-blue-600 hover:bg-blue-600 w-[130px] rounded-full"
              variant={'outline'}
            >
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
