'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const NotFound = () => {
  const router = useRouter();
  return (
    <div className='h-screen w-screen bg-gray-100 flex items-center'>
      <div className='container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700'>
        <div className='max-w-md'>
          <div className='text-5xl font-dark font-bold'>404</div>
          <p className='text-2xl md:text-3xl font-light leading-normal'>
            Sorry we couldn&apos;t find this page.
          </p>
          <p className='mb-8'>
            But dont worry, you can find plenty of other things on our homepage.
          </p>
          <Button onClick={() => router.back()}>Go back</Button>
        </div>
        <div className='max-w-lg'>
          <Image src='/error-404.svg' alt='404' width={500} height={500} />
        </div>
      </div>
    </div>
  );
};

export default NotFound;