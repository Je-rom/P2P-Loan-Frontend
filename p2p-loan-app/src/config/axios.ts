import axios from 'axios';
import { useAuthState } from '@/store/authStore';

const axiosConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// axiosConfig.interceptors.request.use(
//   function (config) {
//     const authState = useAuthState.getState();
//     const authToken = authState?.token;

//     if (authToken) {
//       config.headers.Authorization = 'Bearer ' + authToken;
//     } else {
//       // If there's no token in the state, get it from environment variables
//       const envToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
//       if (envToken) {
//         config.headers.Authorization = 'Bearer ' + envToken;
//         // Save the token to the state
//         useAuthState.getState().setToken(envToken);
//       }
//     }

//     config.headers['Content-Type'] = 'application/json';

//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   },
// );

axiosConfig.interceptors.request.use(
  function (config) {
    const authState = useAuthState.getState();
    const authToken = authState?.token;

    if (authToken) {
      config.headers.Authorization = 'Bearer ' + authToken;
    } else {
      const envToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
      if (envToken) {
        config.headers.Authorization = 'Bearer ' + envToken;
        useAuthState.getState().setToken(envToken);
      }
    }

    // Set 'Content-Type' based on the request data type
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axiosConfig.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

export default axiosConfig;

// // axiosConfig.ts
// import axios from 'axios';
//
// const axiosConfig = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
//     withCredentials: false,
// });
//
// axiosConfig.interceptors.request.use(
//     function (config) {
//         // Use useAuthState to get the authentication token
//         // const { token } = useAuthState.getState();
//         let authToken;
//         const authStateString = localStorage.getItem('auth');
//         if (authStateString) {
//             const authObj = JSON.parse(authStateString);
//
//             authToken = authObj?.state?.token;
//         }
//
//         // Only add authToken to headers if it exists
//         if (authToken) {
//             config.headers.Authorization = 'Bearer ' + authToken;
//         }
//
//         return config;
//     },
//     function (error) {
//         // Do something with request error
//         return Promise.reject(error);
//     }
// );
//
// axiosConfig.interceptors.response.use(
//     function (response) {
//         // Any status code that lie within the range of 2xx cause this function to trigger
//         // Do something with response data
//         return response;
//     },
//     function (error) {
//         return Promise.reject(error);
//     }
// );
//
// export default axiosConfig;
