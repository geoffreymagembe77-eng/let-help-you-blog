import { Language } from '../lib/languages';

export type UserRole = 'patient' | 'provider' | 'platform_admin';
export type ProviderRole = 'super_admin' | 'admin' | 'clinician' | 'provider';

export interface UserSession {
  id: string;
  role: UserRole;
  providerRole?: ProviderRole;
  name: string;
  email: string;
  isTwoFactorEnabled: boolean;
  blockchainAddress?: string;
}