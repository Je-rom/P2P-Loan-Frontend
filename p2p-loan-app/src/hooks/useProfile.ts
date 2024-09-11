'use client';
import axiosResponseMessage from '@/lib/axiosResponseMessage';
import { toast } from 'sonner';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import ProfileService, { MyProfile } from '@/services/profileService';

const useProfile = () => {
  const GetCurrentUser = () =>
    useQuery({
      queryKey: ['user'],
      queryFn: async () => {
        try {
          const response = await ProfileService.getMyProfile();
          return response?.data?.result;
        } catch (error) {
          console.log(error);
        }
      },
    });
  return { GetCurrentUser };
};

export default useProfile;