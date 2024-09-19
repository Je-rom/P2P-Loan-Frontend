import { Button } from '@/components/ui/button';
import LandingLogo from './landingLogo';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="py-4 px-7 md:px-12 flex justify-between w-full fixed top-0 z-50 bg-white border-b">
      <LandingLogo />
      <div className=" space-x-4">
        <Button
          asChild
          className="border border-blue-500"
          variant={'outline'}
        >
          <Link className="text-xs" href="/login">
            Login
          </Link>
        </Button>
        <Button asChild className="bg-blue-500 hover:bg-blue-500 text-white">
          <Link className="text-xs" href="/register">
            Get Started
          </Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
