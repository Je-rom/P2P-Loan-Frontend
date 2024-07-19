"use client";
import { create } from "zustand";
import { ReactNode } from "react";

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
    walletType?: "paystack" | "momo" | null;
    walletId?: string;
  };
  pinCreation: {
    pin: string;
  };
}

interface FormState {
  step: number;
  formData: FormData;
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: Partial<FormData>) => void;
  sendVerificationEmail: () => Promise<void>;
}

const initialFormData: FormData = {
  basicInfo: {
    firstName:"",
    lastName: "",
    middleName:"",
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
};

export const useFormStore = create<FormState>((set) => ({
  step: 1,
  formData: initialFormData,
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: state.step - 1 })),
  updateFormData: (data: Partial<FormData>) =>
    set((state) => ({
      formData: {
        ...state.formData,
        ...data,
      },
    })),
  sendVerificationEmail: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  },
}));

interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider = ({ children }: FormProviderProps) => {
  return <>{children}</>;
};
