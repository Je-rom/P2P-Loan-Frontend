'use client';
import axiosResponseMessage from '@/lib/axiosResponseMessage';
import loanOfferService, {
  CreateLoanOfferRequest,
  CreateLoanOfferResponse,
  MyLoanOfferResponse,
} from '@/services/loanOfferService';
import { useMutation, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

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
        console.log(data.result);
        toast.success('Loan offer created successfully');
      },
    });
  };

 const GetMyLoanOffer = (): UseQueryResult<
   MyLoanOfferResponse,
   AxiosError<{ message: string }>
 > => {
   return useQuery<MyLoanOfferResponse, AxiosError<{ message: string }>>({
     queryKey: ['loanOffer'],
     queryFn: async (): Promise<MyLoanOfferResponse> => {
       const response = await loanOfferService.getMyLoanOffer();
       return response.data;
     },
     onError: (error: AxiosError<{ message: string }>) => {
       toast.error(`Error: ${error.response?.data.message || error.message}`);
       console.log('Failed to fetch loan offers:', error.message);
     },
     onSuccess: (data: MyLoanOfferResponse) => {
       const { message, result } = data;
       console.log('Loan offers fetched successfully:', result);
       toast.success(message);
     },
   } as UseQueryOptions<MyLoanOfferResponse, AxiosError<{ message: string }>>);
 };

  return {
    CreateLoanOfferMutation,
    GetMyLoanOffer,
  };
};

export default useLoanOffer;
