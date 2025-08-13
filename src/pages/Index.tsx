import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { 
  Shield, 
  Lock, 
  Eye, 
  Globe, 
  CheckCircle, 
  AlertTriangle,
  ArrowRight,
  Zap,
  Users,
  BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/ssl-hero.jpg";

const Index = () => {
  const features = [
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Real-time Monitoring",
      description: "Continuous monitoring of SSL certificates across all your domains with instant alerts."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Security Compliance", 
      description: "Ensure compliance with industry standards and maintain security best practices."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Detailed Analytics",
      description: "Comprehensive reporting and analytics to track certificate health and performance."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Automated Alerts",
      description: "Get notified before certificates expire with customizable alert thresholds."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="SSL monitoring dashboard"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
                Enterprise SSL Management
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Secure Your Digital
                <span className="block text-cyan-bright">Infrastructure</span>
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Monitor, manage, and maintain SSL certificates across your entire infrastructure. 
                Never let a certificate expire again with our enterprise-grade monitoring platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth">
                  <Button variant="hero" size="lg" className="group">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                  Watch Demo
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <Card className="shadow-strong backdrop-blur-sm bg-white/95">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-navy-deep">Certificate Status</h3>
                      <Badge className="bg-green-100 text-green-800">Live Data</Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                          <span className="text-sm font-medium">example.com</span>
                        </div>
                        <span className="text-xs text-green-600">45 days</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                        <div className="flex items-center">
                          <AlertTriangle className="h-4 w-4 text-yellow-500 mr-3" />
                          <span className="text-sm font-medium">api.example.com</span>
                        </div>
                        <span className="text-xs text-yellow-600">7 days</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center">
                          <Lock className="h-4 w-4 text-blue-500 mr-3" />
                          <span className="text-sm font-medium">secure.example.com</span>
                        </div>
                        <span className="text-xs text-blue-600">92 days</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-navy-deep mb-4">
              Complete SSL Management Platform
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to monitor, manage, and maintain SSL certificates 
              across your entire digital infrastructure.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-medium transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-navy-deep mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Secure Your Infrastructure?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of organizations that trust CertGuardian for their SSL monitoring needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button variant="hero" size="lg">
                Start Free Trial
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
