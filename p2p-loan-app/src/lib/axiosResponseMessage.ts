const axiosResponseMessage = (error: any) => {
  return error.response?.data?.message ?? 'Something went wrong';
};

export default axiosResponseMessage;
