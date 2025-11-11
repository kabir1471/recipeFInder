import { AxiosError, AxiosResponse } from 'axios';
import { handleRequestError } from '../useRestClient';

const buildAxiosResponse = (overrides: Partial<AxiosResponse>): AxiosResponse => ({
  data: {},
  status: 500,
  statusText: 'Server Error',
  headers: {},
  config: { headers: {} } as AxiosResponse['config'],
  ...overrides,
});

describe('handleRequestError', () => {
  it('maps connectivity issues to a friendly message', () => {
    const error = new AxiosError('Network Error');
    const result = handleRequestError(error);
    expect(result).toEqual({ message: 'common_connectivity_error' });
  });

  it('returns server provided message for known status codes', () => {
    const response = buildAxiosResponse({
      status: 401,
      data: { message: 'unauthorized' },
    });
    const error = new AxiosError('Unauthorized', undefined, undefined, undefined, response);

    const result = handleRequestError(error);

    expect(result).toEqual({ message: 'unauthorized' });
  });

  it('handles request timeouts gracefully', () => {
    const result = handleRequestError({ code: 'ECONNABORTED' } as any);
    expect(result).toEqual({ message: 'service_timeout_error' });
  });

  it('falls back to common service error on unexpected shapes', () => {
    const result = handleRequestError('boom');
    expect(result).toEqual({ message: 'common_service_error' });
  });
});
