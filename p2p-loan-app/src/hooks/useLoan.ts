'use client';
import axiosResponseMessage from '@/lib/axiosResponseMessage';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
} from '@tanstack/react-query';
import LoanService, {
  MyActiveLoan,
  MyLoanResponse,
} from '@/services/loanService';

const useLoan = () => {
  const getMyLoans = (
    pageNumber: number,
    pageSize: number = 1,
    totalItems: number,
  ) =>
    useQuery<MyLoanResponse, AxiosError<{ message: string }>>({
      queryKey: ['loan', pageNumber, pageSize, totalItems],
      queryFn: async (): Promise<MyLoanResponse> => {
        const response = await LoanService.myLoan(
          pageNumber,
          pageSize,
          totalItems,
        );
        return response.data;
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(error.response?.data.message);
        console.error('Failed to fetch wallet:', error.message);
      },
      onSuccess: (data: MyLoanResponse) => {
        const { message } = data;
        toast.success(data.message);
        console.log('withdrawal', message);
        console.log(data.message);
      },
    } as UseQueryOptions<MyLoanResponse, AxiosError<{ message: string }>>);

  const getMyActiveLoan = () =>
    useQuery<MyActiveLoan, AxiosError<{ message: string }>>({
      queryKey: ['activeLoan'],
      queryFn: async (): Promise<MyActiveLoan> => {
        const response = await LoanService.myActiveLoan();
        return response.data;
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(error.response?.data.message);
        console.error('Failed to fetch wallet:', error.message);
      },
      onSuccess: (data: MyActiveLoan) => {
        const { message } = data;
        toast.success(data.message);
        console.log('withdrawal', message);
        console.log(data.message);
      },
    } as UseQueryOptions<MyActiveLoan, AxiosError<{ message: string }>>);

  return {
    getMyLoans,
    getMyActiveLoan,
  };
};

export default useLoan;
