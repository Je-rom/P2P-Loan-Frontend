'use client';
import axiosResponseMessage from '@/lib/axiosResponseMessage';
import loanOfferService, {
  CreateLoanOfferRequest,
  CreateLoanOfferResponse,
} from '@/services/loanOfferService';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const useLoanOffer = () => {
  const router = useRouter();

  const CreateLoanOfferMutation = () => {
    return useMutation({
      mutationFn: async (loanOffer: CreateLoanOfferRequest) => {
        const response = await loanOfferService.createLoanOffer(loanOffer);
        return response.data;
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(error.message);
        console.log(axiosResponseMessage(error));
        console.log('failed to create', error.message);
      },
      onSuccess: (data: CreateLoanOfferResponse) => {
        const { status, message } = data;
        console.log('loan offer created', message, status);
        toast.success('Loan offer created successfully');
      },
    });
  };

  return {
    CreateLoanOfferMutation,
  };
};

export default useLoanOffer;
