'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { EllipsisVertical, Plus, Search } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import DatePickerWithRange from '@/components/ui/date-range';
import LenderTable from '@/components/shared/lender-table';

const LenderPage = () => {
  const cards = [
    {
      img: (
        <Image
          src="Add-task.svg"
          alt=""
          width={40}
          height={10}
          className="bg-pink-200 rounded-full"
        />
      ),
      amount: 632.0,
      text: 'Total Balance',
    },
    {
      img: (
        <Image
          src="empty-wallet.svg"
          alt=""
          width={40}
          height={10}
          className="bg-pink-200 rounded-full"
        />
      ),
      amount: 529.0,
      text: 'Active Loan',
    },
    
  ];

  return (
    <>
      <div className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="font-bold text-xl">Hi Micheal Jackson</h1>
          <p>Welcome to BorrowPointe</p>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-500 w-[200px] h-[50px] rounded-xl">
          <Plus color="#ffffff" />
          Create New Offer
        </Button>
      </div>
      <div className="flex flex-wrap gap-4 p-4">
        {cards.map((card, index) => (
          <Card key={index} className="w-full md:w-[350px] shadow-xl">
            <CardHeader>
              <div className="flex justify-between items-center">
                {card.img}
                <EllipsisVertical color="#000000" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mt-5">
                <div>
                  <h1>{card.text}</h1>
                  <p className="font-bold text-xl">₦{card.amount.toFixed(3)}</p>
                </div>
                <Button className="bg-green-100 hover:bg-green-100 text-green-700 rounded-full w-[100px] mt-3">
                  See More
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex flex-col md:flex-row rounded-lg mt-10 p-4 md:p-10 justify-between space-y-4 md:space-y-0 items-start md:items-center">
        <h1 className="font-bold text-2xl tracking-wider">Transactions</h1>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative w-full md:w-auto">
            <Input
              className="w-full md:w-auto rounded-xl bg-gray-100 pr-10"
              placeholder="Search history"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="w-full md:w-auto">
            <DatePickerWithRange />
          </div>
        </div>
      </div>
      <LenderTable />
    </>
  );
};

export default LenderPage;
