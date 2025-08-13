import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Shield, ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const agentSchema = z.object({
  agentName: z.string().min(1, "Agent name is required"),
  proxyType: z.string().min(1, "Proxy type is required"),
  vaultHost: z.string().min(1, "Vault host is required"),
  vaultSecretPath: z.string().min(1, "Vault secret path is required"),
  certPath: z.string().min(1, "Certificate path is required"),
  keyPath: z.string().min(1, "Key path is required"),
});

type AgentFormData = z.infer<typeof agentSchema>;

const CreateAgent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AgentFormData>({
    resolver: zodResolver(agentSchema),
    defaultValues: {
      agentName: "",
      proxyType: "",
      vaultHost: "",
      vaultSecretPath: "",
      certPath: "",
      keyPath: "",
    },
  });

  const onSubmit = async (data: AgentFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      console.log("Agent created:", data);
      
      toast({
        title: "Agent created successfully",
        description: `Agent "${data.agentName}" has been created and configured.`,
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error creating agent",
        description: "There was an error creating the agent. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-white shadow-medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 mr-4"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center">
              <Shield className="h-8 w-8 mr-3" />
              <div>
                <h1 className="text-2xl font-bold">Create Agent</h1>
                <p className="text-white/80">Configure a new SSL monitoring agent</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Agent Configuration</CardTitle>
            <CardDescription>
              Fill in the details below to create a new SSL monitoring agent
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="agentName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Agent Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter agent name"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="proxyType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Proxy Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select proxy type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="http">HTTP</SelectItem>
                            <SelectItem value="https">HTTPS</SelectItem>
                            <SelectItem value="socks5">SOCKS5</SelectItem>
                            <SelectItem value="direct">Direct</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="vaultHost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vault Host</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="vault.example.com"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="vaultSecretPath"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vault Secret Path</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="/secret/ssl-certs"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="certPath"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Certificate Path</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="/path/to/certificate.crt"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="keyPath"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Key Path</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="/path/to/private.key"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/dashboard")}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-primary"
                  >
                    {isSubmitting ? (
                      "Creating..."
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Create Agent
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CreateAgent;