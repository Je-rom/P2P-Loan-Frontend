'use client';
import axiosResponseMessage from '@/lib/axiosResponseMessage';
import { useMutation, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import LoanRequestService, {
  AcceptLoanRequestResponse,
  CreateLoanRequest,
  CreateLoanResponse,
  DeclineLoanRequestResponse,
  LoanRequestResponse,
} from '@/services/loanRequestService';

const useLoanRequest = () => {
  const CreateLoanRequestMutation = () => {
    return useMutation({
      mutationFn: async (loanRequest: CreateLoanRequest) => {
        const response =
          await LoanRequestService.createLoanRequest(loanRequest);
        return response.data;
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error('You already have a loan request for this loan offer');
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
    pageSize: number = 5,
    totalItems: number,
  ): UseQueryResult<LoanRequestResponse, AxiosError<{ message: string }>> => {
    return useQuery<LoanRequestResponse, AxiosError<{ message: string }>>({
      queryKey: ['loanRequest', trafficType],
      queryFn: async (): Promise<LoanRequestResponse> => {
        const response = await LoanRequestService.getLoanRequest(
          trafficType,
          pageNumber,
          pageSize,
          totalItems,
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

  // const AcceptLoanRequest = (
  //   loanReqeustId: string,
  // ): UseQueryResult<
  //   AcceptLoanRequestResponse,
  //   AxiosError<{ message: string }>
  // > => {
  //   return useQuery<AcceptLoanRequestResponse, AxiosError<{ message: string }>>(
  //     {
  //       queryKey: ['acceptRequest', loanReqeustId],
  //       queryFn: async (): Promise<AcceptLoanRequestResponse> => {
  //         const response =
  //           await LoanRequestService.acceptLoanRequest(loanReqeustId);
  //         return response.data;
  //       },
  //       onError: (error: AxiosError<{ message: string }>) => {
  //         toast.error(
  //           `Error: ${error.response?.data.message || error.message}`,
  //         );
  //         console.error('Failed to accept loan request:', error.message);
  //       },
  // onSuccess: (data: AcceptLoanRequestResponse) => {
  //   const { message, result } = data;
  //   console.log('Accepted loan request successfully:', result);
  //   toast.success(message);
  // },
  //     } as UseQueryOptions<
  //       AcceptLoanRequestResponse,
  //       AxiosError<{ message: string }>
  //     >,
  //   );
  // };

  const useAcceptLoanRequest = (loanReqeustId: string) => {
    return useQuery<AcceptLoanRequestResponse, AxiosError<{ message: string }>>(
      {
        queryKey: ['acceptRequest', loanReqeustId],
        queryFn: async (): Promise<AcceptLoanRequestResponse> => {
          const response =
            await LoanRequestService.acceptLoanRequest(loanReqeustId);
          return response.data;
        },
        onError: (error: AxiosError<{ message: string }>) => {
          toast.error(
            `Error: ${error.response?.data.message || error.message}`,
          );
          console.error('Failed to accept loan request:', error.message);
        },
        onSuccess: (data: AcceptLoanRequestResponse) => {
          const { message, result } = data;
          console.log('Accepted loan request successfully:', result);
          toast.success(message);
        },
      } as UseQueryOptions<
        AcceptLoanRequestResponse,
        AxiosError<{ message: string }>
      >,
    );
  };

  const DeclineLoanRequest = (
    loanReqeustId: number,
  ): UseQueryResult<
    DeclineLoanRequestResponse,
    AxiosError<{ message: string }>
  > => {
    return useQuery<
      DeclineLoanRequestResponse,
      AxiosError<{ message: string }>
    >({
      queryKey: ['declineRequest', loanReqeustId],
      queryFn: async (): Promise<DeclineLoanRequestResponse> => {
        const response =
          await LoanRequestService.declineLoanRequest(loanReqeustId);
        return response.data;
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(`Error: ${error.response?.data.message || error.message}`);
        console.error('Failed to decline loan request:', error.message);
      },
      onSuccess: (data: DeclineLoanRequestResponse) => {
        const { message, result } = data;
        console.log('Declined loan request successfully:', result);
        toast.success(message);
      },
    } as UseQueryOptions<
      DeclineLoanRequestResponse,
      AxiosError<{ message: string }>
    >);
  };

  return {
    CreateLoanRequestMutation,
    GetLoanRequest,
    useAcceptLoanRequest,
    DeclineLoanRequest,
  };
};

export default useLoanRequest;
