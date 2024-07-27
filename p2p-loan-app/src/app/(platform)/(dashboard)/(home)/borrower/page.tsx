'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { EllipsisVertical, Plus, Search } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import DatePickerWithRange from '@/components/ui/date-range';
import BorrowerTable from '@/components/shared/borrower-table';

const BorrowerPage = () => {
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
      amount: 35,
      text: 'Loan Request',
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
      amount: 320.0,
      text: 'Loan Offers',
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
      <div className="flex flex-wrap items-start justify-center gap-4 p-4">
        {cards.map((card, index) => (
          <Card key={index} className="w-full md:w-[315px] shadow-xl">
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
      <div className="p-6 mt-14 rounded-2xl border border-gray-200 flex justify-between">
        <div>
          <h1 className="font-bold text-xl">Repayments</h1>
        </div>
        <Image src={'/info-circle.svg'} alt="info" width={25} height={10} />
      </div>
      {/* <div className="border border-gray-200  md:flex-row rounded-2xl mt-10 p-4 md:p-10 justify-between space-y-4 md:space-y-0 items-start md:items-center">
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
      <BorrowerTable /> */}
      <div className="mt-10 p-4 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <h1 className="font-bold text-2xl tracking-wider">Transactions</h1>
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative w-full md:w-auto max-w-xs">
            <Input
              className="w-full rounded-xl bg-gray-100 pr-10"
              placeholder="Search history"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="w-full md:w-auto max-w-xs">
            <DatePickerWithRange />
          </div>
        </div>
      </div>
      <div className="w-full md:w-auto mt-4 md:mt-0 p-4">
        <BorrowerTable />
      </div>
    </>
  );
};

export default BorrowerPage;
