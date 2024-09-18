import Image from 'next/image';
import Link from 'next/link';

const LandingLogo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 flex">
        <Image src="/Group1.svg" alt="Logo" height={10} width={40} />
        <p className="hidden md:flex md:text-lg pb-1 font-semibold">
          BorrowHub
        </p>
      </div>
    </Link>
  );
};

export default LandingLogo;
