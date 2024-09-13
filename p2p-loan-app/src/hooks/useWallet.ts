'use client';
import axiosResponseMessage from '@/lib/axiosResponseMessage';
import WalletService, {
  WalletBalance,
  WalletProvidersResponse,
  WalletResponse,
} from '@/services/walletService';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
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

  const useWalletBalanceQuery = (walletId: string) =>{
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
  }
   

  return {
    GetWalletProvider,
    getWalletQuery,
    useWalletBalanceQuery,
  };
};

export default useWallet;
