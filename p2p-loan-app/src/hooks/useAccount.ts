import { useMutation, UseMutationResult } from '@tanstack/react-query';
import ChangePinService, { changePin, changePinResponse } from '@/services/accountSettingsService';
import { toast } from 'sonner';
import { AxiosError, AxiosResponse } from 'axios';

const useAccountSettings = () => {
    const mutation = useMutation({
        mutationFn: (data: changePin) => ChangePinService.changepin(data),
        onSuccess: (response) => {
            const { status, message } = response.data;
            if (status === 'Success') {
                toast.success('PIN changed successfully!');
            } else {
                toast.error(message || 'Failed to change PIN.');
            }
        },
        onError: (error: AxiosError) => {
            toast.error('Failed to change PIN. Please try again.');
            console.error('Error changing PIN:', error);
        },
    });

    const isLoading = mutation.status === 'pending';

    return {
        ...mutation,
        isLoading,
    };
};

export default useAccountSettings;
