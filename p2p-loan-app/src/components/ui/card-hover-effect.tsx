'use client';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from './button';
import Image from 'next/image';

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    image: string;
    backgroundColor: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-10 gap-4',
        className,
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={''}
          key={idx}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card image={item.image} backgroundColor={item.backgroundColor}>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
  image,
  backgroundColor,
}: {
  className?: string;
  children: React.ReactNode;
  image: string;
  backgroundColor: string;
}) => {
  return (
    <div
      className={cn(
        'rounded-2xl h-full w-full p-4 overflow-hidden bg-gray-200 border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20',
        className,
      )}
      style={{ backgroundColor }}
    >
      <div className="relative z-50">
        <div className="relative w-full h-[190px] mb-4 rounded-t-xl overflow-hidden">
          <Image
            src={image}
            alt=""
            width={400}
            height={190}
            className="w-full h-full object-cover fill"
          />
        </div>
        <div className="p-2">{children}</div>
      </div>
      <div className="flex justify-start items-center mt-4">
        <Link href="/login">
          <Button className="bg-blue-500 text-white w-[90px] h-[35px] rounded-md hover:bg-blue-600">
            Apply Here
          </Button>
        </Link>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn('text-black font-bold tracking-wide', className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <>
      <p
        className={cn(
          'mt-2 text-black tracking-wide leading-relaxed text-sm',
          className,
        )}
      >
        {children}
      </p>
    </>
  );
};
