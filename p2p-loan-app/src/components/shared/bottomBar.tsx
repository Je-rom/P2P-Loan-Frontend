import { bottombarLinks } from '@/constants/index';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Bottombar = () => {
  const pathname = usePathname();
  return (
    <section className="bottom-bar bg-red-200">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <Link
            href={link.route}
            key={link.label}
            className={`flex flex-col items-center ${
              isActive ? 'rounded-[10px] bg-primary-500' : ''
            } text-xs transition-all duration-200`}
          >
            <img
              src={link.imgURL}
              alt={link.label}
              width={23}
              height={20}
              className={`${isActive ? 'text-purple-900' : ''}`}
            />
            <p className="mt-1 font-semibold">{link.label}</p>
          </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;
