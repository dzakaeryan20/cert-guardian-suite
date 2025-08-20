import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { Certificate, CertificateStats } from '@/types/certificate';
import { useToast } from '@/hooks/use-toast';

export const useCertificates = () => {
  return useQuery({
    queryKey: ['certificates'],
    queryFn: async () => {
      const response = await apiService.getCertificates();
      return response.data;
    },
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // 1 minute
  });
};

export const useCertificate = (id: number) => {
  return useQuery({
    queryKey: ['certificate', id],
    queryFn: async () => {
      const response = await apiService.getCertificate(id);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useCertificateStats = () => {
  return useQuery({
    queryKey: ['certificateStats'],
    queryFn: async () => {
      const response = await apiService.getCertificateStats();
      return response.data;
    },
    staleTime: 30 * 1000, // 30 seconds
  });
};

export const useCreateCertificate = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (certificate: Omit<Certificate, 'id'>) => 
      apiService.createCertificate(certificate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certificates'] });
      queryClient.invalidateQueries({ queryKey: ['certificateStats'] });
      toast({
        title: "Success",
        description: "Certificate added successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to add certificate: ${error.message}`,
        variant: "destructive",
      });
    },
  });
};

export const useUpdateCertificate = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, ...certificate }: Partial<Certificate> & { id: number }) => 
      apiService.updateCertificate(id, certificate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certificates'] });
      queryClient.invalidateQueries({ queryKey: ['certificateStats'] });
      toast({
        title: "Success",
        description: "Certificate updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update certificate: ${error.message}`,
        variant: "destructive",
      });
    },
  });
};

export const useDeleteCertificate = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: number) => apiService.deleteCertificate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certificates'] });
      queryClient.invalidateQueries({ queryKey: ['certificateStats'] });
      toast({
        title: "Success",
        description: "Certificate deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete certificate: ${error.message}`,
        variant: "destructive",
      });
    },
  });
};

export const useCheckCertificate = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (domain: string) => apiService.checkCertificate(domain),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Certificate check completed",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to check certificate: ${error.message}`,
        variant: "destructive",
      });
    },
  });
};