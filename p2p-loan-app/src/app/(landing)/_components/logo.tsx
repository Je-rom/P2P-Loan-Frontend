import Image from 'next/image';
import Link from 'next/link';

const LandingLogo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 flex">
        <Image src="/peerLogo.svg" alt="Logo" height={60} width={60} />
        <p className="hidden md:flex md:text-2xl pb-1 font-semibold">
          BorrowPointe
        </p>
      </div>
    </Link>
  );
};

export default LandingLogo;
