import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Upload, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddCertificateDialogProps {
  children?: React.ReactNode;
}

export function AddCertificateDialog({ children }: AddCertificateDialogProps) {
  const [open, setOpen] = useState(false);
  const [domain, setDomain] = useState("");
  const [issuer, setIssuer] = useState("");
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [privateKey, setPrivateKey] = useState("");
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!domain || !issuer) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically handle the certificate addition
    toast({
      title: "Certificate Added",
      description: `SSL certificate for ${domain} has been added successfully.`,
    });

    // Reset form and close dialog
    setDomain("");
    setIssuer("");
    setCertificateFile(null);
    setPrivateKey("");
    setNotes("");
    setOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCertificateFile(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="hero">
            <Plus className="h-4 w-4 mr-2" />
            Add Certificate
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              Add SSL Certificate
            </DialogTitle>
            <DialogDescription>
              Add a new SSL certificate to monitor its status and expiration.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="domain">Domain Name *</Label>
              <Input
                id="domain"
                placeholder="example.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="issuer">Certificate Issuer *</Label>
              <Select value={issuer} onValueChange={setIssuer}>
                <SelectTrigger>
                  <SelectValue placeholder="Select certificate issuer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lets-encrypt">Let's Encrypt</SelectItem>
                  <SelectItem value="digicert">DigiCert</SelectItem>
                  <SelectItem value="godaddy">GoDaddy</SelectItem>
                  <SelectItem value="comodo">Comodo</SelectItem>
                  <SelectItem value="symantec">Symantec</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="certificate">Certificate File</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="certificate"
                  type="file"
                  accept=".pem,.crt,.cer,.p7b"
                  onChange={handleFileChange}
                  className="flex-1"
                />
                <Upload className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                Upload .pem, .crt, .cer, or .p7b file
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="private-key">Private Key (Optional)</Label>
              <Textarea
                id="private-key"
                placeholder="-----BEGIN PRIVATE KEY-----"
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Additional notes about this certificate..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              <Plus className="h-4 w-4 mr-2" />
              Add Certificate
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}