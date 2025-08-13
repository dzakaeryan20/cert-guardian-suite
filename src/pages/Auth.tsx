import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Eye, EyeOff, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate auth process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Authentication successful",
      description: "Welcome to CertGuardian SSL Monitor",
    });
    
    navigate("/dashboard");
    setIsLoading(false);
  };

  const handleEntraIdLogin = async () => {
    setIsLoading(true);
    
    // Simulate Entra ID auth
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Entra ID Authentication",
      description: "Successfully authenticated with Microsoft Entra ID",
    });
    
    navigate("/dashboard");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">CertGuardian</h1>
          <p className="text-white/80">SSL Certificate Monitoring Platform</p>
        </div>

        <Card className="shadow-strong">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Access your SSL monitoring dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="enterprise" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="enterprise">Enterprise SSO</TabsTrigger>
                <TabsTrigger value="email">Email</TabsTrigger>
              </TabsList>
              
              <TabsContent value="enterprise" className="space-y-4">
                <div className="text-center py-4">
                  <Building2 className="h-16 w-16 mx-auto text-navy-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Microsoft Entra ID</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Sign in with your organization account
                  </p>
                  <Button 
                    onClick={handleEntraIdLogin}
                    disabled={isLoading}
                    variant="enterprise"
                    size="lg"
                    className="w-full"
                  >
                    {isLoading ? "Authenticating..." : "Sign in with Entra ID"}
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="email" className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    variant="enterprise"
                    size="lg"
                    className="w-full"
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;