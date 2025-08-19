import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Search,
  Filter,
  Plus,
  MoreHorizontal
} from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AddCertificateDialog } from "@/components/AddCertificateDialog";

const Certificates = () => {
  const certificates = [
    {
      id: 1,
      domain: "example.com",
      status: "valid",
      expiryDays: 45,
      issuer: "Let's Encrypt",
      lastChecked: "2 minutes ago",
      serialNumber: "03:E7:07:B2:A3:A2:6B:F3"
    },
    {
      id: 2,
      domain: "api.example.com", 
      status: "warning",
      expiryDays: 7,
      issuer: "DigiCert",
      lastChecked: "5 minutes ago",
      serialNumber: "04:A1:B2:C3:D4:E5:F6:G7"
    },
    {
      id: 3,
      domain: "old.example.com",
      status: "expired",
      expiryDays: -2,
      issuer: "GoDaddy",
      lastChecked: "1 hour ago",
      serialNumber: "05:B2:C3:D4:E5:F6:G7:H8"
    },
    {
      id: 4,
      domain: "secure.example.com",
      status: "valid",
      expiryDays: 89,
      issuer: "DigiCert",
      lastChecked: "3 minutes ago",
      serialNumber: "06:C3:D4:E5:F6:G7:H8:I9"
    }
  ];

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
                <CardTitle>SSL Certificates ({certificates.length})</CardTitle>
                <CardDescription>
                  All your SSL certificates in one place
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {certificates.map((cert) => (
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
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Certificates;