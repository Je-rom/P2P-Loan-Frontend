'use client';
import React from 'react';
import Filter from '@/components/ui/filter';
import { LendersOffer } from '@/components/borrower-components/lenders-offers';

const BorrowerLenderOffers = () => {
  return (
    <>
      <div className="flex flex-row sm:flex-row justify-between items-center">
        <h1 className="font-bold text-base">Lenders Offers</h1>
        {/* <Filter /> */}
      </div>
      <div className="border border-gray-200 rounded-2xl p-2 mt-4">
        <LendersOffer />
      </div>
    </>
  );
};

export default BorrowerLenderOffers;
