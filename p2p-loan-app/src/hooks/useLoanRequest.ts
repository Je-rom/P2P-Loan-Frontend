'use client';
import axiosResponseMessage from '@/lib/axiosResponseMessage';
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
  UseQueryOptions,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import LoanRequestService, {
  AcceptLoanRequestMutationVariables,
  AcceptLoanRequestRequest,
  AcceptLoanRequestResponse,
  CreateLoanRequest,
  CreateLoanResponse,
  DeclineLoanRequestResponse,
  LoanRequestResponse,
} from '@/services/loanRequestService';

const useLoanRequest = () => {
  const queryClient = useQueryClient();

  const CreateLoanRequestMutation = () => {
    return useMutation({
      mutationFn: async (loanRequest: CreateLoanRequest) => {
        const response =
          await LoanRequestService.createLoanRequest(loanRequest);
        return response.data;
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(error.response?.data.message || error.message);
        console.log(axiosResponseMessage(error));
        console.log('failed to create loan request', error.message);
      },
      onSuccess: (data: CreateLoanResponse) => {
        const { status, message } = data;
        console.log('loan offer created', message, status);
        console.log(data.result);
        toast.success('Loan request created successfully');
      },
    });
  };

  const GetLoanRequest = (
    trafficType: 'sent' | 'received',
    pageNumber: number,
    pageSize: number = 1,
    totalItems: number,
    orderBy?: string,
  ): UseQueryResult<LoanRequestResponse, AxiosError<{ message: string }>> => {
    return useQuery<LoanRequestResponse, AxiosError<{ message: string }>>({
      queryKey: [
        'loanRequest',
        trafficType,
        pageNumber,
        pageSize,
        totalItems,
        orderBy,
      ],
      queryFn: async (): Promise<LoanRequestResponse> => {
        const response = await LoanRequestService.getLoanRequest(
          trafficType,
          pageNumber,
          pageSize,
          totalItems,
          orderBy,
        );
        return response.data;
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(`Error: ${error.response?.data.message || error.message}`);
        console.error('Failed to fetch loan requests:', error.message);
      },
      onSuccess: (data: LoanRequestResponse) => {
        const { message, result } = data;
        console.log('Loan requests fetched successfully:', result);
        toast.success(message);
      },
    } as UseQueryOptions<LoanRequestResponse, AxiosError<{ message: string }>>);
  };

  const AcceptLoanRequestMutation = () => {
    return useMutation<
      AcceptLoanRequestResponse,
      AxiosError<{ message: string }>,
      AcceptLoanRequestMutationVariables
    >({
      mutationFn: async ({
        loanRequestId,
        pin,
      }: AcceptLoanRequestMutationVariables) => {
        const response = await LoanRequestService.acceptLoanRequest(
          loanRequestId,
          pin,
        );
        return response;
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(error.response?.data?.message || 'An error occurred');
        console.log('Failed to accept loan request', error.message);
      },
      onSuccess: (data: AcceptLoanRequestResponse) => {
        const { status, message, result } = data;
        console.log('Loan offer created', message, status);
        console.log(result);
        toast.success('Loan offer accepted successfully');
        queryClient.invalidateQueries({ queryKey: ['loanRequest'] });
      },
    });
  };

  const DeclineLoanRequestMutation = () => {
    return useMutation({
      mutationFn: async (loanRequestId: string) => {
        const response =
          await LoanRequestService.declineLoanRequest(loanRequestId);
        return response;
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(error.response?.data.message);
        console.log('failed to decline', error.message);
      },
      onSuccess: (data: DeclineLoanRequestResponse) => {
        const { status, message, result } = data;
        console.log('loan offer declined', message, status);
        console.log(result);
        toast.success('Loan offer declined successfully');
        queryClient.invalidateQueries({ queryKey: ['loanRequest'] });
      },
    });
  };

  return {
    CreateLoanRequestMutation,
    GetLoanRequest,
    AcceptLoanRequestMutation,
    DeclineLoanRequestMutation,
  };
};

export default useLoanRequest;
