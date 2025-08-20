import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Globe,
  TrendingUp,
  Settings,
  Plus,
  Loader2
} from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useCertificates, useCertificateStats } from "@/hooks/useCertificates";

const Dashboard = () => {
  const { data: certificates, isLoading: certificatesLoading, error: certificatesError } = useCertificates();
  const { data: stats, isLoading: statsLoading, error: statsError } = useCertificateStats();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "valid": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning": return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "expired": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
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
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-gradient-primary text-white shadow-medium">
            <div className="px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {/* <Shield className="h-8 w-8 mr-3" /> */}
                  <span></span>
                  <div>
                    <h1 className="text-2xl font-bold pl-2">Whissper</h1>
                    <p className="text-white/80 pl-2">Real-time certificate monitoring and alerts</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Button variant="hero">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Certificate
                  </Button>
                  <Button variant="hero" onClick={() => window.location.href = '/create-agent'}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Agent
                  </Button>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                    <Settings className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Certificates</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {statsLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold">{stats?.total || 0}</div>
              )}
              <p className="text-xs text-muted-foreground">Monitored domains</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valid Certificates</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              {statsLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold text-green-600">{stats?.valid || 0}</div>
              )}
              <p className="text-xs text-muted-foreground">
                {stats?.total ? Math.round((stats.valid / stats.total) * 100) : 0}% of total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              {statsLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold text-yellow-600">{stats?.expiring || 0}</div>
              )}
              <p className="text-xs text-muted-foreground">Within 30 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Uptime</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              {statsLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold text-blue-600">{stats?.uptime || '0%'}</div>
              )}
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Certificates Table */}
        <Card>
          <CardHeader>
            <CardTitle>Hydra Shield</CardTitle>
            <CardDescription>
              Monitor and manage your SSL certificates across all domains
            </CardDescription>
          </CardHeader>
          <CardContent>
            {certificatesLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Skeleton className="h-4 w-4 rounded-full" />
                      <div>
                        <Skeleton className="h-4 w-32 mb-2" />
                        <Skeleton className="h-3 w-48" />
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-8 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            ) : certificatesError ? (
              <div className="text-center py-8">
                <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Failed to load certificates</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {certificatesError.message}
                </p>
              </div>
            ) : certificates && certificates.length > 0 ? (
              <div className="space-y-4">
                {certificates.slice(0, 5).map((cert) => (
                  <div key={cert.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(cert.status)}
                      <div>
                        <div className="font-medium">{cert.domain}</div>
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
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No certificates found</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Add your first certificate to start monitoring
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

export default Dashboard;