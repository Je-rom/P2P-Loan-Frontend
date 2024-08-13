'use client';
import React, { useState, useEffect } from 'react';
import { DataTable } from '@/components/shared/overdue-loan';

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
    <div>
      <h1 className="text-2xl">{fullName} Overdue Loans</h1>
      <DataTable />
    </div>
  );
};

export default OverdueLoan;
