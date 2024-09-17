import Image from 'next/image';
import Link from 'next/link';

const LandingLogo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 flex">
        <Image src="/empty-wallet.svg" alt="Logo" height={10} width={20} />
        <p className="hidden md:flex md:text-lg pb-1 font-semibold">
          BorrowHub
        </p>
      </div>
    </Link>
  );
};

export default LandingLogo;
