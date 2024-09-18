import { useMutation, UseMutationResult } from '@tanstack/react-query';
import AccountSettingsService, { changePin, changePinResponse, editContactInformation, editContactResponse } from '@/services/accountSettingsService';
import { toast } from 'sonner';
import { AxiosError, AxiosResponse } from 'axios';

const useAccountSettings = () => {
   // Mutation for changing PIN
   const changePinMutation = useMutation({
    mutationFn: (data: changePin) => AccountSettingsService.changePin(data),
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

// Mutation for editing contact information
const editContactInfoMutation = useMutation({
    mutationFn: (data: editContactInformation) => AccountSettingsService.editContactInfo(data),
    onSuccess: (response) => {
        const { status, message } = response.data;
        if (status === 'Success') {
            toast.success('Contact information updated successfully!');
        } else {
            toast.error(message || 'Failed to update contact information.');
        }
    },
    onError: (error: AxiosError) => {
        toast.error('Failed to update contact information. Please try again.');
        console.error('Error updating contact information:', error);
    },
});

const isLoading = changePinMutation.isPending;

return {
    changePin: changePinMutation.mutate,
    editContactInfo: editContactInfoMutation.mutate,
    isLoading,
    changePinStatus: changePinMutation.status,
    editContactInfoStatus: editContactInfoMutation.status,
    changePinError: changePinMutation.error,
    editContactInfoError: editContactInfoMutation.error,
};
};

export default useAccountSettings;
