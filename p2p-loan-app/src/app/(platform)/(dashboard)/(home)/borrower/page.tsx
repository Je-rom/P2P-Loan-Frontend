'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { EllipsisVertical, Plus, Search } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import DatePickerWithRange from '@/components/ui/date-range';
import BorrowerTable from '@/components/borrower-components/borrower-table';
import { useRouter } from 'next/navigation';
import Filter from '@/components/ui/filter';
import BorrowerRepaymentTable from '@/components/borrower-components/borrower-repayment-table';

interface ImageComponentProps {
  src: string;
  alt: string;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ src, alt }) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={50}
      height={50}
      className="bg-pink-200 rounded-full"
    />
  );
};

const BorrowerPage = () => {
  const [fullName, setFullName] = useState('');
  const router = useRouter();
  useEffect(() => {
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    if (firstName && lastName) {
      setFullName(`${firstName} ${lastName}`);
    }
  }, []);

  const cards = [
    {
      img: <ImageComponent src="balance.svg" alt="Total balance" />,
      amount: 632.0,
      text: 'Total Balance',
    },
    {
      img: <ImageComponent src="active-loans.svg" alt="Active Loan" />,
      amount: 529.0,
      text: 'Active Loan',
    },
    {
      img: (
        <Image src="loan-req.svg" alt="Loan request" width={50} height={10} />
      ),
      number: 35,
      text: 'Loan Request',
    },
    // {
    //   img: (
    //     <Image src="loan-offer.svg" alt="Loan offers" width={50} height={10} />
    //   ),
    //   number: 32,
    //   text: 'Lenders Offers',
    // },
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="font-bold text-xl">Hi {fullName}</h1>
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
      <div className="flex flex-wrap items-center justify-start gap-4 mt-6">
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
                  <p className="font-bold text-xl">
                    {card.amount !== undefined
                      ? `₦${card.amount.toFixed(3)}`
                      : card.number}
                  </p>
                </div>
                <Button className="bg-green-100 hover:bg-green-100 text-green-700 rounded-full w-[100px] mt-3">
                  See More
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="p-6 mt-14 rounded-2xl border border-gray-200">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-xl">Repayments</h1>
          <Filter />
        </div>
        <BorrowerRepaymentTable />
      </div>
      <div className="bg-gray-100 bg-opacity-100 rounded-2xl mt-10 p-4 flex flex-col md:flex-row justify-between items-start">
        <h1 className="font-bold text-xl sm:text-2xl">Transactions</h1>
        <div className="flex flex-col md:flex-row items-center md:items-start mt-4 md:mt-0 gap-4 md:gap-6 w-full md:w-auto">
          <div className="relative flex-grow w-full max-w-[250px]">
            <Input className="w-full rounded-xl" placeholder="Search history" />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="relative flex-grow w-full max-w-[250px]">
            <DatePickerWithRange />
          </div>
        </div>
      </div>
      <div className="w-full mt-4 md:mt-0">
        <BorrowerTable />
      </div>
    </>
  );
};

export default BorrowerPage;
