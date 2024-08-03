'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { EllipsisVertical, Plus, Search } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import DatePickerWithRange from '@/components/ui/date-range';
import LenderTable from '@/components/lender-components/lender-table';
import { useRouter } from 'next/navigation';

const LenderPage = () => {
  const router = useRouter();

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
        <Button
          onClick={() => router.push('/create-offer')}
          className="bg-blue-500 hover:bg-blue-500 w-[200px] h-[50px] rounded-xl"
        >
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
      <div className="bg-gray-100 bg-opacity-100 rounded-2xl mt-10 p-6 sm:p-8 md:p-10 flex flex-col md:flex-row justify-between items-start">
        <h1 className="font-bold text-xl sm:text-2xl">Transactions</h1>
        <div className="flex flex-col md:flex-row mt-4 md:mt-0 gap-4 md:gap-6 w-full md:w-auto">
          <div className="relative flex-grow">
            <Input
              className="w-[250px] rounded-xl"
              placeholder="Search history"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="relative flex-grow">
            <DatePickerWithRange />
          </div>
        </div>
      </div>
      <div className="w-full mt-4 md:mt-0">
        <LenderTable />
      </div>
    </>
  );
};

export default LenderPage;
