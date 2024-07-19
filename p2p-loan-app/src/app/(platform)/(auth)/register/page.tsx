"use client";
import React from "react";
import { useFormStore } from "@/context/FormContext";
import BasicInfo from "@/components/register-components/basic-info";
import VerifyEmail from "@/components/register-components/verify-email";
import VerifyBVN from "@/components/register-components/verify-bvn";
import LinkWallet from "@/components/register-components/link-wallet";
import CreatePin from "@/components/register-components/create-pin";

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
      className="container mx-auto px-4 py-8 w-full h-full"
      style={{
        backgroundImage: "url('/reg-background.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-2xl font-bold mb-4">Multi-Step Form</h1>
      {renderStep()}
    </div>
  );
};

export default Register;
