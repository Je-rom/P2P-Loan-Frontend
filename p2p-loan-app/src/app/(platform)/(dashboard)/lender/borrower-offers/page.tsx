'use client';
import React from 'react';
import Filter from '@/components/ui/filter';
import { BorrowerOffer } from '@/components/lender-components/borrowers-offers';

const LenderBorrowerOffers = () => {
  return (
    <>
      <div className="flex flex-row sm:flex-row justify-between items-center">
        <h1 className="text-base font-bold">Borrowers Offers</h1>
        {/* <Filter /> */}
      </div>
      <div className="border border-gray-200 rounded-2xl p-4 mt-4">
        <BorrowerOffer />
      </div>
    </>
  );
};

export default LenderBorrowerOffers;
