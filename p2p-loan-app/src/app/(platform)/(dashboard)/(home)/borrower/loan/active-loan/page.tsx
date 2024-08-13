'use client';
import React, { useState, useEffect } from 'react';
import { DataTable } from '@/components/shared/active-loan-table';

const ActiveLoan = () => {
  const [fullName, setFullName] = useState('');
  useEffect(() => {
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    if (firstName && lastName) {
      setFullName(`${firstName} ${lastName}`);
    }
  }, []);
  return (
    <div>
      <h1 className="text-2xl">{fullName} Active Loans</h1>
      <DataTable />
    </div>
  );
};

export default ActiveLoan;
