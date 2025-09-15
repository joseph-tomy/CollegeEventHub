import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, User, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleStudentLogin = () => {
    navigate("/student-dashboard");
  };

  const handleAdminLogin = () => {
    navigate("/admin-dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Title */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
            <Calendar className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">CollegeEventHub</h1>
          <p className="text-white/80">Your Gateway to Campus Events</p>
        </div>

        {/* Login Card */}
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-glow">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold text-foreground">Welcome Back</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Student Login */}
            <Button
              onClick={handleStudentLogin}
              className="w-full h-16 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl justify-start px-6 text-left"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">Student Login</div>
                  <div className="text-sm opacity-90">Discover and register for events</div>
                </div>
              </div>
            </Button>

            {/* Coordinator Login */}
            <Button
              onClick={() => navigate("/coordinator-dashboard")}
              className="w-full h-16 bg-orange-500 hover:bg-orange-600 text-white rounded-xl justify-start px-6 text-left"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">Coordinator Login</div>
                  <div className="text-sm opacity-90">Manage assigned events</div>
                </div>
              </div>
            </Button>

            {/* Admin Login */}
            <Button
              onClick={handleAdminLogin}
              className="w-full h-16 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl justify-start px-6 text-left"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">Admin Login</div>
                  <div className="text-sm opacity-90">Manage events and coordinators</div>
                </div>
              </div>
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Demo credentials are pre-configured for easy access
            </p>
          </CardContent>
        </Card>

        {/* Platform Features */}
        <div className="text-center">
          <h3 className="text-white font-semibold mb-4">Platform Features</h3>
          <div className="flex justify-center space-x-8 text-white/80 text-sm">
            <span>Event Management</span>
            <span>•</span>
            <span>Registration System</span>
            <span>•</span>
            <span>Real-time Updates</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;