'use client';
import axiosResponseMessage from '@/lib/axiosResponseMessage';
import { useMutation, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import BankService, {
  AccountDetailsResponse,
  BanksResponse,
} from '@/services/bankService';
import { error } from 'console';

const useBanks = () => {
  const GetBanks = (): UseQueryResult<
    BanksResponse,
    AxiosError<{ message: string }>
  > => {
    return useQuery<BanksResponse, AxiosError<{ message: string }>>({
      queryKey: ['banks'],
      queryFn: async (): Promise<BanksResponse> => {
        const response = await BankService.getBanks();
        return response.data;
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(`Error: ${error.response?.data.message || error.message}`);
        console.error('Failed to fetch banks:', error.message);
      },
      onSuccess: (data: BanksResponse) => {
        const { message, result } = data;
        console.log('Banks fetched successfully:', result);
        toast.success(message);
      },
    } as UseQueryOptions<BanksResponse, AxiosError<{ message: string }>>);
  };

  const GetAccountDetails = (
    AccountNumber: number,
    BankCode: number,
  ): UseQueryResult<
    AccountDetailsResponse,
    AxiosError<{ message: string }>
  > => {
    return useQuery<AccountDetailsResponse, AxiosError<{ message: string }>>({
      queryKey: ['accountDetails', AccountNumber, BankCode],
      queryFn: async (): Promise<AccountDetailsResponse> => {
        const response = await BankService.getAccountDetails(
          AccountNumber,
          BankCode,
        );
        return response.data;
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast.error(`Error: ${error.response?.data?.message || error.message}`);
        console.error('failed to verify account details', error.message);
      },
      onSuccess: (data: AccountDetailsResponse) => {
        const { message, result } = data;
        console.log('Account details verified successfully:', result);
        toast.success(message);
      },
    } as UseQueryOptions<
      AccountDetailsResponse,
      AxiosError<{ message: string }>
    >);
  };

  return { GetBanks, GetAccountDetails };
};

export default useBanks;
