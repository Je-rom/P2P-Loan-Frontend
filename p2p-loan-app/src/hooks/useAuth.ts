'use client';
import AuthService, {
  changePasswordResponse,
  changePasswordRequest,
  ChangePinRequest,
  ChangePinResponse,
  CreatePinRequest,
  CreatePinResponse,
  EmailVerificationRequest,
  EmailVerificationResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from '@/services/authService';
import { useAuthState } from '@/store/authStore';
import axiosResponseMessage from '@/lib/axiosResponseMessage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

const useAuth = () => {
  const router = useRouter();
  const { setUser, setToken, user, token, clearAuth } = useAuthState();
  const queryClient = useQueryClient();

  const SignUpMutation = () => {
    return useMutation({
      mutationFn: async (user: RegisterRequest) => {
        console.log('Sending register request', user);
        const reponse = await AuthService.register(user);
        console.log('Received login response', reponse);
        return reponse?.data;
      },
      onError: (error: AxiosError<{ message?: string }>) => {
        if (error.response?.data?.message === 'User already exists') {
          toast.error('User already exists');
        } else {
          toast.error('Invalid Registration credentials');
        }
        console.log('register error:', error);
        console.log(error.response?.data);
      },
      onSuccess: (data) => {
        const { status, message } = data;
        toast.success('Registration successful');
        console.log(message);
        return { status, message };
      },
    });
  };

  const loginMutation = useMutation({
    mutationFn: async (user: LoginRequest) => {
      console.log('Sending login request', user);
      const response = await AuthService.login(user);
      console.log('Received login response', response);
      return response?.data;
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      const errorMessage = error.message;
      const responseMessage = error.response?.data?.message;

      if (errorMessage === 'Network Error') {
        toast.error('Network Error');
      } else if (
        responseMessage === 'Email yet to be verified, Please verify your email'
      ) {
        toast.error('Email yet to be verified, Please verify your email');
      } else if (responseMessage) {
        toast.error(responseMessage);
      } else {
        toast.error('Invalid Login details, check your email and password');
      }
      console.log('login error:', error);
      console.log(error.response?.data);
    },
    onSuccess: (data: LoginResponse) => {
      const { status, result: responseData } = data;
      toast.success('Login successful');
      console.log(responseData);
      console.log('Login successful, response data:', responseData);
      clearAuth();

      setUser(responseData.user);
      setToken(responseData.token);
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: async (userEmail: ForgotPasswordRequest) => {
      const reponse = await AuthService.forgotPassword(userEmail);
      return reponse.data;
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.message);
      console.log(axiosResponseMessage(error));
    },
    onSuccess: (data: ForgotPasswordResponse) => {
      const { status, message } = data;
      console.log('Forgot password successful:', message);
      toast.success('Token sent, please check your email');
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async (user: ResetPasswordRequest) => {
      const response = await AuthService.resetPassword(user);
      return response.data;
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message);
      console.log(axiosResponseMessage(error));
    },
    onSuccess: (data: ResetPasswordResponse) => {
      const { message } = data;
      toast.success('Password reset successful, please login');
    },
  });

  const verifyEmailPasswordMutation = useMutation({
    mutationFn: async (user: EmailVerificationRequest) => {
      const response = await AuthService.verifyEmail(user);
      return response.data;
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      if (error.response?.data?.message === 'Invalid verification token.') {
        toast.error('Invalid verification token.');
      }
      console.log('email error:', error);
      console.log(error.response?.data);
    },
    onSuccess: (data: EmailVerificationResponse) => {
      const { message } = data;
      console.log('email', message);
      toast.success('Email verification successful. You can now log in');
    },
  });

  const createPinMutation = useMutation({
    mutationFn: async (pin: CreatePinRequest) => {
      const response = await AuthService.createPin(pin);
      return response.data;
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      if (error.response?.data?.message === 'Failed to create pin.') {
        toast.error('Failed to create pin.');
      } else if (error.response?.data?.message === 'You already have a pin') {
        toast.error('You already have a pin.');
      }
      console.log('create pin:', error);
      console.log(error.response?.data);
    },
    onSuccess: (data: CreatePinResponse) => {
      const { message } = data;
      console.log('PIN', message);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const changePinMutation = useMutation({
    mutationFn: async (pin: ChangePinRequest) => {
      const response = await AuthService.changePin(pin);
      return response.data;
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      //toast.error(error.response?.data.message);
      console.log('change pin error:', error);
      console.log(error.response?.data);
    },
    onSuccess: (data: ChangePinResponse) => {
      const { message } = data;
      console.log('PIN', message);
    },
  });
  const changePasswordMutation = useMutation({
    mutationFn: async (password: changePasswordRequest) => {
      const response = await AuthService.changePassword(password);
      return response.data;
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      //toast.error(error.response?.data.message);
      console.log('change password error:', error);
      console.log(error.response?.data);
    },
    onSuccess: (data: changePasswordResponse) => {
      const { message } = data;
      console.log('Password', message);
    },
  });

  const logOut = () => {
    clearAuth();
    localStorage.clear();
    //to prevent the browser from keeping the protected route in history.
    router.replace('/login');
  };

  return {
    SignUpMutation,
    loginMutation,
    forgotPasswordMutation,
    resetPasswordMutation,
    verifyEmailPasswordMutation,
    createPinMutation,
    changePinMutation,
    changePasswordMutation,
    logOut,
    user,
    token,
  };
};

export default useAuth;
