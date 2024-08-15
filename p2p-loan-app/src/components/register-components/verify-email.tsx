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
    { number: 3, label: 'Wallet' },
    { number: 4, label: 'Verify Email ' },
  ];
  const { formData, updateFormData, sendVerificationEmail } = useFormStore();
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
    userType: formData.basicInfo.user_type,
    dateOfBirth: formData.basicInfo.dateOfBirth,
  };

  const isLoading = signUpMutation.isPending;

  const handleDone = async () => {
    setIsLoading(true);
    try {
      const mutationResult = await signUpMutation.mutateAsync(registrationData);
      if (mutationResult.status === 'success') {
        router.push('/login');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="bg-white p-6 rounded-xl w-[800px] h-[600px]">
        <div className="flex items-center justify-center mt-8">
          <div className="w-full max-w-2xl text-center">
            <StepIndicator />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mt-8">
          <Image src={'/email-icon.svg'} alt="email" width={70} height={100} />
          <h1 className="font-bold text-lg">Check Your Email</h1>
          <p>Please open mail app to verify</p>
          <Button
            type="submit"
            disabled={loading}
            className="w-[300px] rounded-xl bg-blue-400 hover:bg-4lue-500 mt-6"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              'Click here to send email'
            )}
          </Button>
          <h1 className="mt-4 flex gap-2">
            Didn't receive any mail?
            <button>
              <span className="text-blue-400">Click to resend</span>
            </button>
          </h1>
          <div className="flex items-center mt-4 gap-2">
            <Button
              onClick={handleDone}
              disabled={isLoading}
              className="bg-blue-400 hover:bg-blue-400"
            >
              Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
