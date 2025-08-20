export interface Certificate {
  id: number;
  domain: string;
  status: 'valid' | 'warning' | 'expired';
  expiryDays: number;
  issuer: string;
  lastChecked: string;
  serialNumber: string;
}

export interface CertificateStats {
  total: number;
  valid: number;
  expiring: number;
  uptime: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}