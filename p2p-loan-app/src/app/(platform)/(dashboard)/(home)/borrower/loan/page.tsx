'use client';
import React, { useState, useEffect } from 'react';
import BorrowerLoanDetailsTable from '@/components/borrower-components/borrower-loan-details-table';

const ActiveLoan = () => {
  // const [fullName, setFullName] = useState('');
  // useEffect(() => {
  //   const firstName = localStorage.getItem('firstName');
  //   const lastName = localStorage.getItem('lastName');
  //   if (firstName && lastName) {
  //     setFullName(`${firstName} ${lastName}`);
  //   }
  // }, []);
  return (
    <div>
      <h1 className="font-bold text-base">Your Loans</h1>
      <div className="mt-4 text-xs">
        <p>
          The table below shows the details of your active loans, including the
          loan amount, interest rates, repayment frequency, and more. To view
          more detailed information about your loans, repayment schedules, and
          history, click on the "View details" option in the action menu. Stay
          on top of your repayments and manage your loans effectively through
          the provided loan management options.
        </p>
      </div>
      <BorrowerLoanDetailsTable />
    </div>
  );
};

export default ActiveLoan;
