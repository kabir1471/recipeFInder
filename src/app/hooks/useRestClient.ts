import { Endpoints } from '@app/assets/Endpoint';
import { ResponseStatus } from '../../types/ApiStatus.enum';
import axios, { AxiosError } from 'axios';
import { useMemo } from 'react';

const API_BASE_URL = Endpoints.BASE_URL;

const __DEV__ = process.env.NODE_ENV === 'development';
function netLog(...args: any) {
  if (__DEV__) {
    console.log('[REST CLIENT]', ...args);
  }
}

export function useRestClient() {
  const client = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
  });

  client.interceptors.request.use(
    async (config) => {
      netLog('➡️ Request:', config.method?.toUpperCase(), config.url);
      netLog('Params:', config.params);
      netLog('Data:', config.data);
      return config;
    },
    (error) => {
      netLog('❌ Request Error:', error);
      return Promise.reject(error);
    },
  );

  client.interceptors.response.use(
    (response) => {
      netLog('✅ Response:', response.status, response.config.url);
      return response;
    },
    async (error: AxiosError) => {
      netLog('⚠️ Response Error:', error.message);
      return Promise.reject(error);
    },
  );

  return useMemo(() => ({ restClient: client }), [client]);
}

export function handleRequestError(error: unknown): any {
  try {
    if (error instanceof AxiosError) {
      const status = error.response?.status;

      if (error.message === 'Network Error') {
        return { message: 'common_connectivity_error' };
      }

      switch (status) {
        case ResponseStatus.UNAUTHORIZED:
          return { message: error.response?.data?.message ?? 'unauthorized' };
        case ResponseStatus.BAD_REQUEST:
          return { message: error.response?.data?.message ?? 'bad_request' };
        default:
          return error.response?.data as any ?? { message: 'unknown_error' };
      }
    }

    if ((error as any)?.code === 'ECONNABORTED') {
      return { message: 'service_timeout_error' };
    }

    return { message: 'common_service_error' };
  } catch {
    return { message: 'common_service_error' };
  }
}
