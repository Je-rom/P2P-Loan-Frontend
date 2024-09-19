'use client';
import axiosResponseMessage from '@/lib/axiosResponseMessage';
import WalletService, {
  WalletBalance,
  WalletProvidersResponse,
  WalletResponse,
  WalletTransactionResponse,
  WithdrawalFeeResponse,
  WithdrawRequest,
  WithdrawResponse,
} from '@/services/walletService';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
} from '@tanstack/react-query';

const useWallet = () => {
  const GetWalletProvider = (): UseQueryResult<
    WalletProvidersResponse,
    AxiosError<{ message: string }>
  > => {
    return useQuery<WalletProvidersResponse, AxiosError<{ message: string }>>({
      queryKey: ['walletProvider'],
      queryFn: async (): Promise<WalletProvidersResponse> => {
        const response = await WalletService.getWalletProvider();
        return response.data;
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(`Error: ${error.response?.data.message || error.message}`);
        console.error('Failed to fetch wallet provider:', error.message);
      },
      onSuccess: (data: WalletProvidersResponse) => {
        const { message, result } = data;
        console.log('Wallet provider fetched successfully:', result);
        toast.success(message);
      },
    } as UseQueryOptions<
      WalletProvidersResponse,
      AxiosError<{ message: string }>
    >);
  };

  const getWalletQuery = useQuery<
    WalletResponse,
    AxiosError<{ message: string }>
  >({
    queryKey: ['wallet'],
    queryFn: async (): Promise<WalletResponse> => {
      const response = await WalletService.getWallet();
      return response.data;
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.error('Failed to fetch wallet:', error.message);
    },
    onSuccess: (data: WalletResponse) => {
      const { message, result } = data;
      console.log('Wallet fetched successfully:', result);
      toast.success(message);
    },
  } as UseQueryOptions<WalletResponse, AxiosError<{ message: string }>>);

  const useWalletBalanceQuery = (walletId: string) => {
    return useQuery<WalletBalance, AxiosError<{ message: string }>>({
      queryKey: ['walletBalance', walletId],
      queryFn: async (): Promise<WalletBalance> => {
        const response = await WalletService.getWalletBalance(walletId);
        return response.data;
      },
      onError: (error: AxiosError<{ message: string }>) => {
        console.error('Failed to fetch wallet balance:', error.message);
        toast.error(`Error: ${error.response?.data.message || error.message}`);
      },
      onSuccess: (data: WalletBalance) => {
        const { message, result } = data;
        console.log('Wallet balance fetched successfully:', result);
        toast.success(message);
      },
    } as UseQueryOptions<WalletBalance, AxiosError<{ message: string }>>);
  };

  const Withdraw = () => {
    return useMutation({
      mutationFn: async (withdraw: WithdrawRequest) => {
        const response = await WalletService.withdraw(withdraw);
        return response.data;
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(error.response?.data.message);
        console.log(axiosResponseMessage(error));
        console.log('failed to create', error.message);
      },
      onSuccess: (data: WithdrawResponse) => {
        const { message, status } = data;
        toast.success(data.message);
        console.log('withdrawal', message, status);
        console.log(data.message);
      },
    });
  };

  const useWithdrawFeeQuery = (amount: number) => {
    return useQuery<WithdrawalFeeResponse, AxiosError<{ message: string }>>({
      queryKey: ['withdrawFee', amount],
      queryFn: async (): Promise<WithdrawalFeeResponse> => {
        const response = await WalletService.withdrawalFee(amount);
        return response.data;
      },
      onError: (error: AxiosError<{ message: string }>) => {
        console.error('Failed to get withdrawal fee:', error.message);
        toast.error(`Error: ${error.response?.data.message || error.message}`);
      },
      onSuccess: (data: WithdrawalFeeResponse) => {
        const { message, result } = data;
        console.log('Wtihdraw fee fetched successfully:', result, message);
        toast.success(message);
      },
    } as UseQueryOptions<
      WithdrawalFeeResponse,
      AxiosError<{ message: string }>
    >);
  };

  const useWalletTransaction = (
    walletId: string,
    totalPages: number,
    pageSize: number,
    pageNo: number,
    totalElements: number,
  ) => {
    return useQuery<WalletTransactionResponse, AxiosError<{ message: string }>>(
      {
        queryKey: [
          'walletTransaction',
          walletId,
          totalPages,
          pageSize,
          pageNo,
          totalElements,
        ],
        queryFn: async (): Promise<WalletTransactionResponse> => {
          const response = await WalletService.walletTransaction(
            walletId,
            totalPages,
            pageSize,
            pageNo,
            totalElements,
          );
          return response.data;
        },
        onError: (error: AxiosError<{ message: string }>) => {
          console.error('Failed to fetch wallet transaction:', error.message);
          toast.error(error.response?.data.message || error.message);
        },
        onSuccess: (data: WalletTransactionResponse) => {
          const { message, result } = data;
          console.log('Wallet transactions fetched successfully:', result);
          toast.success(message);
        },
      } as UseQueryOptions<
        WalletTransactionResponse,
        AxiosError<{ message: string }>
      >,
    );
  };

  return {
    GetWalletProvider,
    getWalletQuery,
    useWalletBalanceQuery,
    Withdraw,
    useWithdrawFeeQuery,
    useWalletTransaction,
  };
};

export default useWallet;
