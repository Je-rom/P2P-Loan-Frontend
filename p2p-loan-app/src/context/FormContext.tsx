"use client";
import React, { createContext, useState, ReactNode, FC } from "react";

interface FormData {
  basicInfo: {
    firstName?: string;
    middleName?: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  emailVerification: {
    isEmailSent: boolean;
  };
  bvnVerification: {
    bvn: string;
  };
  walletLinking: {
    walletType?: "paystack" | "momo" | "other";
    walletId?: string;
  };
  pinCreation: {
    pin: string;
  };
}

interface FormContextType {
  step: number;
  formData: FormData;
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: Partial<FormData>) => void;
  sendVerificationEmail: () => Promise<void>;
}

export const FormContext = createContext<FormContextType>({
  step: 1,
  formData: {
    basicInfo: {
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    emailVerification: {
      isEmailSent: false,
    },
    bvnVerification: {
      bvn: "",
    },
    walletLinking: {
      walletType: undefined,
      walletId: "",
    },
    pinCreation: {
      pin: "",
    },
  },
  nextStep: () => {},
  prevStep: () => {},
  updateFormData: () => {},
  sendVerificationEmail: async () => {},
});

interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider: FC<FormProviderProps> = ({ children }) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    basicInfo: {
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    emailVerification: {
      isEmailSent: false,
    },
    bvnVerification: {
      bvn: "",
    },
    walletLinking: {
      walletType: undefined,
      walletId: "",
    },
    pinCreation: {
      pin: "",
    },
  });

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...data,
    }));
  };

  const sendVerificationEmail = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const contextValue = {
    step,
    formData,
    nextStep,
    prevStep,
    updateFormData,
    sendVerificationEmail,
  } as const;

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
};
