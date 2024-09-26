'use client';
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

  const GetUserProfile = (id: string) =>
    useQuery({
      queryKey: ['user', id],
      queryFn: async () => {
        try {
          const response = await ProfileService.getUserProfile(id);
          return response?.data?.result;
        } catch (error) {
          console.log(error);
        }
      },
    });

  return { GetCurrentUser, GetUserProfile };
};

export default useProfile;
