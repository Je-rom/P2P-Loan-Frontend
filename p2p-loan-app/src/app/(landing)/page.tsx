'use client';
import React, { useState } from 'react';
import Image from 'next/image';

const HomePage = () => {
  return (
    <div>
      <section className="background bg-transparent bg-gradient-to-r from-white to-blue-300">
        <div className="pt-40 pb-0">
          <div className="flex justify-between">
            <div className='w-[718px] pt-40 pl-20'>
              <h1 className="font-bold text-7xl">
                Empower Your Financial Future
              </h1>
              <p className="text-gray-600">
                Need a loan? Skip the banks and connect directly with lenders through our innovative peer-to-peerlending platform. Whether you're consolidating debt, funding a project, or covering unexpected expenses PeerLend makes borrowing easier and more personalized than ever.
              </p>

              <div className="pt-10">
                <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full">
                  Get Started
                </button>
              </div>
            </div>

            <Image
              src={'/hand-image.svg'}
              alt="image of a hand holding a phone"
              width={500}
              height={10}
            />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="pt-5 pl-12 pr-5 pb-8">
          <div className="flex justify-between">
            <Image
              src={'/couple-image.svg'}
              alt="indoor-candid-shot-young-african-american-couple-doing-paperwork-together"
              width={600}
              height={100}
            />

            <div className="inline-block h-[250px] min-h-[1em] w-1 self-stretch bg-black"></div>
            
            <div className="w-1/2 justify-around p-6">
              <h1 className="flex items-center justify-center font-bold text-2xl p-4">Why Choose Us</h1>
              <section className="pt-30 p-6 bg-gray-100">
                <ul className="list-disc list-inside pl-6">
                  <li>
                    Simplified Access to Credit: Borrowers can quickly and
                    easily obtain loans with competitive interest rates,
                    tailored to their needs.
                  </li>
                  <li>
                    Profitable Investment Opportunities: Lenders gain access to
                    a wide range of vetted lending options, allowing them to
                    diversify their investments.
                  </li>
                  <li>
                    Enhanced User Engagement: The app's intuitive interface and
                    personalized recommendations empower users to take control
                    of their finances.
                  </li>
                </ul>
              </section>
              <div className="flex items-center justify-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                  Our Services
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-300">
        <div className='pt-5 flex items-center justify-center'>
          <h1 className="font-bold text-2xl mb-4">Our Services</h1>
        </div>
        <div className="pt-5 pl-12 pb-8">
            <div className="flex justify-between relative">
                <div className="w-1/3">
                    <section className="p-6 bg-gray-100">
                        <ul className="list-decimal pl-4">
                          <li>Service 1</li>
                          <li>Service 3</li>
                          <li>Service 5</li>
                          <li>Service 7</li>
                          <li>Service 9</li>
                        </ul>
                    </section>
                </div>
                <div className="w-1/3 border-r-2 border-dashed border-blue-500 h-full absolute justify-center transform -translate-x-1/2"></div>
                <div className="w-1/3 pl-6">
                    <section className="p-6 bg-gray-100">
                        <ul className="list-decimal pl-4">
                          <li>Service 2</li>
                          <li>Service 4</li>
                          <li>Service 6</li>
                          <li>Service 8</li>
                          <li>Service 10</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    </section>
    </div>
  );
};

export default HomePage;

// test the height on different devices to see if it breaks
