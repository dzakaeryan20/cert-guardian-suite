import { Certificate, CertificateStats, ApiResponse } from '@/types/certificate';

const API_BASE_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:3001/api' 
  : '/api';

class ApiService {
  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Certificate endpoints
  async getCertificates(): Promise<ApiResponse<Certificate[]>> {
    return this.request<Certificate[]>('/certificates');
  }

  async getCertificate(id: number): Promise<ApiResponse<Certificate>> {
    return this.request<Certificate>(`/certificates/${id}`);
  }

  async createCertificate(certificate: Omit<Certificate, 'id'>): Promise<ApiResponse<Certificate>> {
    return this.request<Certificate>('/certificates', {
      method: 'POST',
      body: JSON.stringify(certificate),
    });
  }

  async updateCertificate(id: number, certificate: Partial<Certificate>): Promise<ApiResponse<Certificate>> {
    return this.request<Certificate>(`/certificates/${id}`, {
      method: 'PUT',
      body: JSON.stringify(certificate),
    });
  }

  async deleteCertificate(id: number): Promise<ApiResponse<void>> {
    return this.request<void>(`/certificates/${id}`, {
      method: 'DELETE',
    });
  }

  async getCertificateStats(): Promise<ApiResponse<CertificateStats>> {
    return this.request<CertificateStats>('/certificates/stats');
  }

  // Check certificate status
  async checkCertificate(domain: string): Promise<ApiResponse<Certificate>> {
    return this.request<Certificate>('/certificates/check', {
      method: 'POST',
      body: JSON.stringify({ domain }),
    });
  }
}

export const apiService = new ApiService();