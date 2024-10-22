import React from 'react';
import WordRotate from '@/components/magicui/word-rotate';
import { HoverEffect } from '@/components/ui/card-hover-effect';
import Image from 'next/image';
import { CardStack } from '@/helper/stack';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <>
      <section className="bg-transparent">
        <div className="bg-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
            <div className="w-full md:w-[718px] pr-4 md:pt-20 pl-3 md:pl-20 text-center md:text-left mt-20 md:mt-40">
              <h1 className="font-bold text-4xl md:text-5xl">
                Welcome to BorrowHub
              </h1>
              <p className="flex tracking-wide justify-between items-center text-gray-600 mt-4 md:mt-6 mb-8 text-xs md:text-sm">
                Need a loan? Skip the banks and connect directly with lenders
                through our innovative peer-to-peer lending platform. Whether
                you're consolidating debt, funding a project, or covering
                unexpected expenses, PeerLend makes borrowing easier and more
                personalized than ever.
              </p>

              {/* <div className="hidden md:block md:pt-4">
                <Link href="/register">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full mb-2 text-sm">
                    Get Started
                  </button>
                </Link>
              </div> */}
            </div>

            <div className="hidden md:block w-full md:w-auto">
              <Image
                src={'/borrowpointphone.svg'}
                alt="image of a hand holding a phone"
                width={400}
                height={50}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-col items-center justify-center bg-white p-4">
        <div className="text-center mt-14">
          <h1 className="text-4xl font-semibold md:text-3xl sm:text-2xl">
            Empower Your Financial Future
          </h1>
          <WordRotate
            className="text-xl text-gray-600 dark:text-white md:text-lg sm:text-base"
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

      <div className="bg-gray-100 mt-8 flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 p-4 sm:p-6 md:p-10">
        <Image
          className="rounded-lg w-full sm:w-1/2 md:w-auto"
          src={'/about-us1.jpg'}
          alt="about us"
          width={300}
          height={400}
        />
        <div className="text-center sm:text-left mt-6 sm:mt-0 max-w-md">
          <h1 className="font-bold text-xl sm:text-2xl">About Us</h1>
          <p className="mt-4 sm:mt-6 text-sm sm:text-sm">
            At Borrow Pointe, we empower individuals with quick and accessible
            micro-loans to meet their immediate financial needs. Our platform
            connects borrowers and lenders directly, making the loan process
            simple, transparent, and secure. Join us to experience a new way of
            borrowing and lending that puts people first.
          </p>
        </div>
      </div>

      <div className="bg-white p-8 mt-5">
        <h1 className="font-bold text-2xl justify-center items-center flex">
          What our users say
        </h1>
        <CardStack />
      </div>

      <footer className="bg-white text-black text-center p-3">
        <p className="text-xs">
          Copyright &copy; {new Date().getFullYear()} BorrowHub. All rights
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
