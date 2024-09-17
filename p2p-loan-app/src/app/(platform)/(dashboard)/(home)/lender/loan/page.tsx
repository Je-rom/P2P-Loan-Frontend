'use client';
import React, { useState, useEffect } from 'react';
import LenderLoanDetailsTable from '@/components/lender-components/lender-loan-details-table';

const Loan = () => {
  return (
    <div>
      <h1 className="text-base font-bold">Your Loans</h1>
      <div className="mt-4 text-xs">
        <p>
          The table below displays the details of the loans you've issued,
          including the loan amount, interest rates, repayment frequency, and
          more. For comprehensive information on each loan, including repayment
          schedules and borrower history, click on 'View details' in the action
          menu.
        </p>
      </div>
      <LenderLoanDetailsTable />
    </div>
  );
};

export default Loan;
