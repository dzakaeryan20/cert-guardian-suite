import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Loader2
} from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AddCertificateDialog } from "@/components/AddCertificateDialog";
import { useCertificates } from "@/hooks/useCertificates";
import { useState } from "react";

const Certificates = () => {
  const { data: certificates, isLoading, error, refetch } = useCertificates();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Filter certificates based on search and status
  const filteredCertificates = certificates?.filter(cert => {
    const matchesSearch = cert.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.issuer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || cert.status === filterStatus;
    return matchesSearch && matchesFilter;
  }) || [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "valid": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning": return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "expired": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "valid": return "bg-green-100 text-green-800";
      case "warning": return "bg-yellow-100 text-yellow-800";
      case "expired": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-gradient-primary text-white shadow-medium">
            <div className="px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Shield className="h-8 w-8 mr-3" />
                  <div>
                    <h1 className="text-2xl font-bold">SSL Certificates</h1>
                    <p className="text-white/80">Manage and monitor your SSL certificates</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <AddCertificateDialog />
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
            {/* Search and Filter */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search certificates..."
                    className="pl-10 w-80"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            {/* Certificates Table */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>
                      SSL Certificates ({isLoading ? '...' : filteredCertificates.length})
                    </CardTitle>
                    <CardDescription>
                      All your SSL certificates in one place
                    </CardDescription>
                  </div>
                  {!isLoading && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => refetch()}
                      disabled={isLoading}
                    >
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Refresh"}
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(4)].map((_, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Skeleton className="h-4 w-4 rounded-full" />
                          <div>
                            <Skeleton className="h-4 w-32 mb-2" />
                            <Skeleton className="h-3 w-24 mb-1" />
                            <Skeleton className="h-3 w-48" />
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-6 w-16" />
                          <Skeleton className="h-8 w-8" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : error ? (
                  <div className="text-center py-8">
                    <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Failed to load certificates</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {error.message}
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-4" 
                      onClick={() => refetch()}
                    >
                      Try Again
                    </Button>
                  </div>
                ) : filteredCertificates.length > 0 ? (
                  <div className="space-y-4">
                    {filteredCertificates.map((cert) => (
                      <div key={cert.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center space-x-4">
                          {getStatusIcon(cert.status)}
                          <div>
                            <div className="font-medium">{cert.domain}</div>
                            <div className="text-sm text-muted-foreground">
                              Serial: {cert.serialNumber}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Issued by {cert.issuer} • Last checked {cert.lastChecked}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-sm font-medium">
                              {cert.expiryDays > 0 ? `${cert.expiryDays} days left` : `Expired ${Math.abs(cert.expiryDays)} days ago`}
                            </div>
                          </div>
                          <Badge className={getStatusColor(cert.status)}>
                            {cert.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {searchTerm ? 'No certificates match your search' : 'No certificates found'}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {searchTerm ? 'Try adjusting your search terms' : 'Add your first certificate to start monitoring'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Certificates;