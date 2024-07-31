'use client';
import React from 'react';
import Filter from '@/components/ui/filter';
import { ExpandableCardDemo } from '@/components/ui/expandable-cards';

const LenderOffers = () => {
  return (
    <>
      <div className="flex justify-between items-center">
          <h1 className='text-3xl'>Lenders Offers</h1>
        <Filter />
      </div>
      <div className="border border-gray-200 rounded-2xl p-4 mt-4">
        <ExpandableCardDemo />
      </div>
    </>
  );
};

export default LenderOffers;
