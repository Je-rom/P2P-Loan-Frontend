'use client';
import React, { useState, useEffect } from 'react';
import BorrowerTable from '@/components/borrower-components/borrower-table';
import DatePickerWithRange from '@/components/ui/date-range';


const OverdueLoan = () => {
  const [fullName, setFullName] = useState('');
  useEffect(() => {
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    if (firstName && lastName) {
      setFullName(`${firstName} ${lastName}`);
    }
  }, []);
  return (
    <>
      <div>
        <h1 className="text-2xl">{fullName} Disbured Loans</h1>
        <div className="relative flex-grow w-full max-w-[250px] mt-10">
          <DatePickerWithRange />
        </div>
        <BorrowerTable />
      </div>
    </>
  );
};

export default OverdueLoan;
