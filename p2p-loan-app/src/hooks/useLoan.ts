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
  GetALoan,
  GetLoanRepayments,
  MyActiveLoan,
  MyLoanResponse,
  RepayLoan,
  RepayLoanResponse,
} from '@/services/loanService';

const useLoan = () => {
  const useMyLoans = (
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
        console.error('Failed to fetch my loan:', error.message);
      },
      onSuccess: (data: MyLoanResponse) => {
        const { message } = data;
        toast.success(data.message);
        console.log('my loan', message);
        console.log(data.message);
      },
    } as UseQueryOptions<MyLoanResponse, AxiosError<{ message: string }>>);

  const useMyActiveLoan = () =>
    useQuery<MyActiveLoan, AxiosError<{ message: string }>>({
      queryKey: ['activeLoan'],
      queryFn: async (): Promise<MyActiveLoan> => {
        const response = await LoanService.myActiveLoan();
        return response.data;
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(error.response?.data.message);
        console.error('Failed to fetch active loan:', error.message);
      },
      onSuccess: (data: MyActiveLoan) => {
        const { message } = data;
        toast.success(data.message);
        console.log('active loan', message);
        console.log(data.message);
      },
    } as UseQueryOptions<MyActiveLoan, AxiosError<{ message: string }>>);

  const useGetALoanQuery = (loanId: string) => {
    return useQuery<GetALoan, AxiosError<{ message: string }>>({
      queryKey: ['aLoan', loanId],
      queryFn: async (): Promise<GetALoan> => {
        const response = await LoanService.getALoan(loanId);
        return response.data;
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(error.response?.data.message);
        console.error('Failed to fetch a loan:', error.message);
      },
      onSuccess: (data: GetALoan) => {
        const { message } = data;
        toast.success(data.message);
        console.log(' loan', message);
        console.log(data.message);
      },
    } as UseQueryOptions<GetALoan, AxiosError<{ message: string }>>);
  };

  const RepayLoanMutation = () => {
    return useMutation({
      mutationFn: async (repay: RepayLoan) => {
        const response = await LoanService.repayLoan(repay);
        return response.data;
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(error.response?.data.message || error.message);
        console.log(axiosResponseMessage(error));
        console.log('failed to repay', error.message);
      },
      onSuccess: (data: RepayLoanResponse) => {
        const { status, message } = data;
        console.log('loan repayment', message, status);
        console.log(data.result);
        toast.success(data.message);
      },
    });
  };

  const useGetLoanRepaymentsQuery = (
    LoanId: string,
    totalItems: number,
    pageNumber: number,
    pageSize: number,
  ) => {
    return useQuery<GetLoanRepayments, AxiosError<{ message: string }>>({
      queryKey: ['loanRepayments', LoanId, totalItems, pageNumber, pageSize],
      queryFn: async (): Promise<GetLoanRepayments> => {
        const response = await LoanService.getLoanRepayments(
          LoanId,
          totalItems,
          pageNumber,
          pageSize,
        );
        return response.data;
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(error.response?.data.message);
        console.error('Failed to fetch a loan repayment:', error.message);
      },
      onSuccess: (data: GetLoanRepayments) => {
        const { status, message } = data;
        console.log('loan repayments', message, status);
        console.log(data.result);
        toast.success(data.message);
      },
    } as UseQueryOptions<GetLoanRepayments, AxiosError<{ message: string }>>);
  };

  return {
    useMyLoans,
    useMyActiveLoan,
    useGetALoanQuery,
    RepayLoanMutation,
    useGetLoanRepaymentsQuery,
  };
};

export default useLoan;
