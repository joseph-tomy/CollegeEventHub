import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Clock, MapPin, ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CoordinatorDashboard = () => {
  const navigate = useNavigate();
  const [assignedEvents, setAssignedEvents] = useState<any[]>([]);
  const [registrationRequests, setRegistrationRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const coordinatorId = "64f2a9..."; // TODO: Replace with logged-in coordinator ID from auth

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsRes = await axios.get(`http://localhost:5000/api/coordinator/events/${coordinatorId}`);
        const requestsRes = await axios.get(`http://localhost:5000/api/coordinator/requests/${coordinatorId}`);
        setAssignedEvents(eventsRes.data);
        setRegistrationRequests(requestsRes.data);
      } catch (err) {
        console.error("Error fetching coordinator data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [coordinatorId]);

  const handleApproveRequest = async (requestId: string) => {
    await axios.put(`http://localhost:5000/api/coordinator/requests/${requestId}`, { status: "approved" });
    setRegistrationRequests(registrationRequests.filter(r => r._id !== requestId));
  };

  const handleRejectRequest = async (requestId: string) => {
    await axios.put(`http://localhost:5000/api/coordinator/requests/${requestId}`, { status: "rejected" });
    setRegistrationRequests(registrationRequests.filter(r => r._id !== requestId));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "bg-blue-500";
      case "completed": return "bg-green-500";
      case "cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="p-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Coordinator Dashboard</h1>
              <p className="text-muted-foreground">Manage your assigned events</p>
            </div>
          </div>
          <Badge className="bg-orange-100 text-orange-800 border-orange-200">Coordinator</Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 grid gap-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card><CardHeader><CardTitle>Assigned Events</CardTitle></CardHeader><CardContent>{assignedEvents.length}</CardContent></Card>
          <Card><CardHeader><CardTitle>Pending Requests</CardTitle></CardHeader><CardContent>{registrationRequests.length}</CardContent></Card>
          <Card><CardHeader><CardTitle>Total Registrations</CardTitle></CardHeader>
            <CardContent>
              {assignedEvents.reduce((sum, e) => sum + (e.registrations || 0), 0)}
            </CardContent>
          </Card>
        </div>

        {/* Requests */}
        <Card>
          <CardHeader><CardTitle>Registration Requests</CardTitle></CardHeader>
          <CardContent>
            {registrationRequests.map((req) => (
              <div key={req._id} className="flex justify-between border p-3 rounded-lg mb-2">
                <div>
                  <h4>{req.studentName}</h4>
                  <p>ID: {req.studentId}</p>
                  <p>Event: {req.eventId?.title}</p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" onClick={() => handleApproveRequest(req._id)} className="bg-green-600 text-white">
                    <CheckCircle className="h-4 w-4 mr-1" /> Approve
                  </Button>
                  <Button size="sm" onClick={() => handleRejectRequest(req._id)} variant="outline" className="text-red-600">
                    <XCircle className="h-4 w-4 mr-1" /> Reject
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Events */}
        <Card>
          <CardHeader><CardTitle>Assigned Events</CardTitle></CardHeader>
          <CardContent>
            {assignedEvents.map((event) => (
              <div key={event._id} className="border rounded-lg p-4 mb-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold">{event.title}</h3>
                    <p>{event.description}</p>
                  </div>
                  <Badge className={`${getStatusColor(event.status)} text-white`}>{event.status}</Badge>
                </div>
                <p>{event.date} | {event.time} | {event.location}</p>
                <p>{event.registrations}/{event.capacity} registered</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CoordinatorDashboard;
