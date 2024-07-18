import React, { useContext } from "react";
import { FormProvider, FormContext } from "@/context/FormContext";
import BasicInfo from "@/components/register-components/basic-info";
import VerifyEmail from "@/components/register-components/verify-email";
import VerifyBVN from "@/components/register-components/verify-bvn";
import LinkWallet from "@/components/register-components/link-wallet";
import CreatePin from "@/components/register-components/create-pin";

const Register: React.FC = () => {
  const { step } = useContext(FormContext);

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
    <FormProvider>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Multi-Step Form</h1>
        {renderStep()}
      </div>
    </FormProvider>
  );
};

export default Register;
