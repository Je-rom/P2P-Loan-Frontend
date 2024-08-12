'use client';
import { CardStacks } from '@/components/ui/card-stack';
import { cn } from '@/lib/utils';

export function CardStack() {
  return (
    <div className="h-[20rem] flex items-center justify-center w-full">
      <CardStacks items={CARDS} />
    </div>
  );
}

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        'font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5',
        className,
      )}
    >
      {children}
    </span>
  );
};

const CARDS = [
  {
    id: 0,
    name: 'Racheal',
    designation: 'Senior Designer',
    content: (
      <p>
        Using BorrowPointe has been a <Highlight>game-changer</Highlight>. It’s
        incredibly easy to navigate and has made managing my loans and
        investments much more efficient.
      </p>
    ),
  },
  {
    id: 1,
    name: 'Eka',
    designation: 'Senior Shitposter',
    content: (
      <p>
        BorrowPointe has made it incredibly simple for
        <Highlight>lenders and borrowers to connect</Highlight>. The platform’s
        design facilitates <Highlight>smooth interactions</Highlight>
      </p>
    ),
  },
  {
    id: 2,
    name: 'Simi',
    designation: 'Manager Project Mayhem',
    content: (
      <p>
        The application is intuitive and makes tracking my loan activities so
        much simpler. It’s <Highlight>a huge improvement</Highlight> over other
        platforms I’ve used.
      </p>
    ),
  },
];
