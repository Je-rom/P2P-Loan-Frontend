'use client';
import React, { useState } from 'react';
import { useFormStore } from '@/context/FormContext';
import { Button } from '@/components/ui/button';
import StepIndicator from '@/components/register-components/step-indicator';
import Image from 'next/image';
import { Loader2, MoveRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { RegisterRequest } from '@/services/authService';
import useAuth from '@/hooks/useAuth';

const VerifyEmail: React.FC = () => {
  const steps = [
    { number: 1, label: 'Basic Info' },
    { number: 2, label: 'Verify BVN' },
    { number: 3, label: 'Choose Wallet' },
    { number: 4, label: 'Verify Email ' },
  ];
  const { formData, updateFormData, prevStep } = useFormStore();
  const [isEmailSent, setIsEmailSent] = useState(
    formData.emailVerification.isEmailSent,
  );
  const [loading, setLoading] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const { SignUpMutation } = useAuth();
  const signUpMutation = SignUpMutation();
  const router = useRouter();

  const registrationData: RegisterRequest = {
    ...formData.basicInfo,
    BVN: formData.bvnVerification.bvn,
    walletProviderId: formData.linkWallet.walletProvider,
    email: formData.basicInfo.email,
    password: formData.basicInfo.password,
    userType: formData.basicInfo.userType,
    BvnDateOfBirth: formData.basicInfo.BvnDateOfBirth,
  };

  const isLoading = signUpMutation.isPending;

  const handleDone = async () => {
    setIsLoading(true);
    try {
      const mutationResult = await signUpMutation.mutateAsync(registrationData);
      if (mutationResult.status === 'Success') {
        localStorage.removeItem('step');
        router.push('/login');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    prevStep();
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="bg-white p-6 rounded-xl w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl h-[450px]">
        <div className="flex items-center justify-center mt-8">
          <div className="w-full max-w-2xl text-center">
            <StepIndicator />
          </div>
        </div>
        <button className="flex items-center" onClick={handleBack}>
          <Image src="/chevron_back.svg" alt="Back" width={20} height={20} />
          <span className="text-sm">Back</span>
        </button>
        <div className="flex flex-col items-center justify-center mt-8">
          <Image src={'/email-icon.svg'} alt="email" width={60} height={100} />
          <h1 className="font-bold text-base">Check Your Email</h1>
          <p className="text-center mt-2 text-sm">
            Please open your mail app to verify your account
          </p>
          {/* <h1 className="mt-4 flex">
            Didn't receive any mail?
            <button>
              <span className="text-blue-400">Click to resend</span>
            </button>
          </h1> */}
          <div className="flex items-center mt-4 gap-2">
            <Button
              onClick={handleDone}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-800 px-4 h-8 text-sm"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : 'DONE'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
