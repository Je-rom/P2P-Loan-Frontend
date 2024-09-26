'use client';
import axiosResponseMessage from '@/lib/axiosResponseMessage';
import loanOfferService, {
  CreateLoanOfferRequest,
  CreateLoanOfferResponse,
  LoanOffersResponse,
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
        toast.error(error.response?.data.message);
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

  const GetMyLoanOffer = (
    totalItems: number,
    pageNumber: number,
    pageSize: number,
  ): UseQueryResult<MyLoanOfferResponse, AxiosError<{ message: string }>> => {
    return useQuery<MyLoanOfferResponse, AxiosError<{ message: string }>>({
      queryKey: ['loanOffer', totalItems, pageNumber, pageSize],
      queryFn: async (): Promise<MyLoanOfferResponse> => {
        const response = await loanOfferService.getMyLoanOffer(
          totalItems,
          pageNumber,
          pageSize,
        );
        return response.data;
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(error.response?.data.message || error.message);
        console.log('Failed to fetch loan offers:', error.message);
      },
      onSuccess: (data: MyLoanOfferResponse) => {
        const { message, result } = data;
        console.log('Loan offers fetched successfully:', result);
        toast.success(message);
      },
    } as UseQueryOptions<MyLoanOfferResponse, AxiosError<{ message: string }>>);
  };

  const GetLoanOffers = (
    pageNumber: number,
    pageSize: number,
    filters: { [key: string]: any },
  ): UseQueryResult<LoanOffersResponse, AxiosError<{ message: string }>> => {
    return useQuery<LoanOffersResponse, AxiosError<{ message: string }>>({
      queryKey: ['loanOffers', pageNumber, pageSize, filters],
      queryFn: async (): Promise<LoanOffersResponse> => {
        const response = await loanOfferService.getLoanOffers(
          pageNumber,
          pageSize,
          filters,
        );
        return response.data;
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(`Error: ${error.response?.data.message || error.message}`);
        console.error('Failed to fetch loan offers:', error.message);
      },
      onSuccess: (data: LoanOffersResponse) => {
        const { message, result } = data;
        console.log('Loan offers fetched successfully:', result);
        toast.success(message);
      },
    } as UseQueryOptions<LoanOffersResponse, AxiosError<{ message: string }>>);
  };

  return {
    CreateLoanOfferMutation,
    GetMyLoanOffer,
    GetLoanOffers,
  };
};

export default useLoanOffer;
