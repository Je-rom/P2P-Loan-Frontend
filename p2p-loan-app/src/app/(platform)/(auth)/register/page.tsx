'use client';
import React, { useEffect } from 'react';
import { useFormStore } from '@/context/FormContext';
import BasicInfo from '@/components/register-components/basic-info';
import VerifyEmail from '@/components/register-components/verify-email';
import VerifyBVN from '@/components/register-components/verify-bvn';
import LinkWallet from '@/components/register-components/link-wallet';

const Register: React.FC = () => {
  const { step, setStep } = useFormStore();

  useEffect(() => {
    const savedStep = Number(localStorage.getItem('step'));
    if (savedStep) {
      setStep(savedStep);
    }
  }, [setStep]);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <BasicInfo />;
      case 2:
        return <VerifyBVN />;
      case 3:
        return <LinkWallet />;
      case 4:
        return <VerifyEmail />;
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
