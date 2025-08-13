import { Shield, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-slate-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-navy-primary mr-3" />
            <span className="text-xl font-bold text-navy-deep">CertGuardian</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-navy-primary transition-colors">
              Home
            </Link>
            <Link to="/features" className="text-foreground hover:text-navy-primary transition-colors">
              Features
            </Link>
            <Link to="/pricing" className="text-foreground hover:text-navy-primary transition-colors">
              Pricing
            </Link>
            <Link to="/auth">
              <Button variant="enterprise">Sign In</Button>
            </Link>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;