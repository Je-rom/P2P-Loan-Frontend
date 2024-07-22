'use client';
import React from 'react';
import { useFormStore } from '@/context/FormContext';
import BasicInfo from '@/components/register-components/basic-info';
import VerifyEmail from '@/components/register-components/verify-email';
import VerifyBVN from '@/components/register-components/verify-bvn';
import LinkWallet from '@/components/register-components/link-wallet';
import CreatePin from '@/components/register-components/create-pin';

const Register: React.FC = () => {
  const { step } = useFormStore();

  const renderStep = () => {
    switch (step) {
      case 1:
        return <BasicInfo />;
      case 2:
        return <VerifyEmail />;
      case 3:
        return <VerifyBVN />;
      case 4:
        return <LinkWallet />;
      case 5:
        return <CreatePin />;
      default:
        return <BasicInfo />;
    }
  };

  return (
    <div
      className="w-full h-full bg-cover bg-center"
      style={{
        backgroundImage: "url('/reg-background.svg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {renderStep()}
    </div>
  );
};

export default Register;
