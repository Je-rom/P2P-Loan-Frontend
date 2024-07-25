import { create } from "zustand";
import { ReactNode, useEffect } from "react";

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
}

interface FormState {
  step: number;
  formData: FormData;
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: Partial<FormData>) => void;
  sendVerificationEmail: () => Promise<void>;
  setStep: (step: number) => void;
}

const initialFormData: FormData = {
  basicInfo: {
    firstName: "",
    lastName: "",
    middleName: "",
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
};

export const useFormStore = create<FormState>((set) => ({
  step: typeof window !== 'undefined' ? Number(localStorage.getItem('step')) || 1 : 1,
  formData: initialFormData,
  nextStep: () => set((state) => {
    const nextStep = state.step + 1;
    localStorage.setItem('step', String(nextStep));
    return { step: nextStep };
  }),
  prevStep: () => set((state) => {
    const prevStep = state.step - 1;
    localStorage.setItem('step', String(prevStep));
    return { step: prevStep };
  }),
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
  setStep: (step: number) => {
    localStorage.setItem('step', String(step));
    set({ step });
  }
}));

interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider = ({ children }: FormProviderProps) => {
  return <>{children}</>;
};
