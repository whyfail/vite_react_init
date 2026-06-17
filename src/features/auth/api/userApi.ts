import { request } from '@/shared/api/http';
import { API_BASE_NAME } from '@/shared/config/appConfig';

interface UserLoginParams {
  name: string
  password: string
  checked?: boolean
}

function userLoginApi(value: UserLoginParams): Promise<unknown> {
  return request<unknown>({
    method: 'POST',
    url: `${API_BASE_NAME}/login`,
    data: value,
  });
}

export type { UserLoginParams };
export { userLoginApi };
