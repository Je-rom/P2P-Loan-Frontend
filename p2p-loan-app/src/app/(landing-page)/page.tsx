import React from 'react';
import WordRotate from '@/components/magicui/word-rotate';
import { HoverEffect } from '@/components/ui/card-hover-effect';
import Image from 'next/image';
import { CardStack } from '@/helper/stack';

const LandingPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
        <div className="text-center mt-14">
          <h1 className="text-4xl font-semibold md:text-5xl sm:text-2xl">
            Welcome to BorrowPointe
          </h1>
          <WordRotate
            className="text-2xl text-gray-600 dark:text-white md:text-xl sm:text-lg"
            words={[
              'Connecting lenders and borrowers directly',
              'Flexible terms tailored to your needs',
              'Your trust, our priority',
            ]}
          />
        </div>
        <div className="w-full px-8">
          <HoverEffect items={loanInfo} />
        </div>
      </div>
      <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 p-4 sm:p-6 md:p-10">
        <Image
          className="rounded-lg w-full sm:w-1/2 md:w-auto"
          src={'/about-us1.jpg'}
          alt="about us"
          width={500}
          height={400}
        />
        <div className="text-center sm:text-left mt-6 sm:mt-0 max-w-md">
          <h1 className="font-bold text-xl sm:text-2xl">About Us</h1>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base">
            At Borrow Pointe, we empower individuals with quick and accessible
            micro-loans to meet their immediate financial needs. Our platform
            connects borrowers and lenders directly, making the loan process
            simple, transparent, and secure. Join us to experience a new way of
            borrowing and lending that puts people first.
          </p>
        </div>
      </div>
      <div className="bg-gray-100 p-8 mt-5">
        <h1 className="font-bold text-3xl justify-center items-center flex">
          What our users say
        </h1>
        <CardStack />
      </div>

      <footer className="bg-white text-black text-center py-4">
        <p className="text-base">
          Copyright &copy; {new Date().getFullYear()} BorrowPointe. All rights
          reserved.
        </p>
      </footer>
    </>
  );
};

const loanInfo = [
  {
    title: 'Personal Loans',
    description:
      'Flexible loans designed to help you achieve your personal goals, from home improvements to unexpected expenses.',
    image: '/personal-loan.png',
    backgroundColor: '#e3e6e8',
  },
  {
    title: 'Student Loans',
    description:
      'Support for your educational journey with tailored loan options that help manage tuition fees and other expenses.',
    image: '/school-loan.png',
    backgroundColor: '#f0f0f0',
  },
  {
    title: 'Business Loans',
    description:
      'Funding solutions to help you start or grow your business, with flexible terms and competitive rates, to get your business running',
    image: '/business-loan.png',
    backgroundColor: '#e1e8f5',
  },
  {
    title: 'Peer-to-Peer Lending',
    description:
      'Direct lending between individuals, offering competitive rates and personalized terms without traditional bank intermediaries.',
    image: '/p2p-loan.png',
    backgroundColor: '#f5e1e4',
  },
];

export default LandingPage;
