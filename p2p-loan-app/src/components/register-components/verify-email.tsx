'use client';
import React, { useState } from 'react';
import { useFormStore } from '@/context/FormContext';
import { Button } from '@/components/ui/button';
import StepIndicator from '@/components/register-components/step-indicator';
import Image from 'next/image';
import { Loader2, MoveRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ConfettiSideCannons } from '@/components/ui/confetti';

const VerifyEmail: React.FC = () => {
  const {
    formData,
    nextStep,
    prevStep,
    updateFormData,
    sendVerificationEmail,
  } = useFormStore();
  const [isEmailSent, setIsEmailSent] = useState(
    formData.emailVerification.isEmailSent,
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const email = localStorage.getItem('email');
  const user_type = localStorage.getItem('user_type');

  const handleSendEmail = async () => {
    setLoading(true);
    try {
      await sendVerificationEmail();
      setIsEmailSent(true);
      updateFormData({
        emailVerification: { ...formData.emailVerification, isEmailSent: true },
      });
    } catch (error) {
      console.error('Failed to send verification email:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextStep = () => {
    if (user_type) {
      router.push(`/${user_type}`);
    } else {
      console.error('User type is not set.');
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
            onClick={handleSendEmail}
            disabled={loading}
            className="w-[300px] rounded-xl bg-blue-400 hover:bg-4lue-500 mt-6"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Click here to send email'}
          </Button>
          <h1 className="mt-4 flex gap-2">
            Didn't receive any mail?
            <button>
              <span onClick={handleSendEmail} className="text-blue-400">
                Click to resend
              </span>
            </button>
          </h1>
          <div className="flex items-center mt-4 gap-2">
            <button onClick={handleNextStep}>
              <ConfettiSideCannons />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
