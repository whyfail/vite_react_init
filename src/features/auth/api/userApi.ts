import type { CurrentUser, LoginRequest, LoginResponse } from '@/shared/api/generated/model';
import { getSpringBootEnterpriseTemplateAPI } from '@/shared/api/generated';

const { login, logout, getCurrentUser } = getSpringBootEnterpriseTemplateAPI();

export type { CurrentUser, LoginRequest, LoginResponse };
export {
  getCurrentUser as getCurrentUserApi,
  login as userLoginApi,
  logout as userLogoutApi,
};
