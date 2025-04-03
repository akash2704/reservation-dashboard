// components/ReservationCard.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { 
  CalendarIcon, 
  MailIcon, 
  PhoneIcon, 
  UserIcon, 
  CheckCircleIcon, 
  ClockIcon
} from "lucide-react";

type StatusType = "Pending" | "Confirmed" | "Canceled";

type ReservationCardProps = {
  id: string;
  guest: {
    name: string;
    initial: string;
    avatar?: string;
  };
  status: StatusType;
  checkIn: string;
  checkOut: string;
  email: string;
  phone: string;
  bookingDate: string;
  guests: {
    adults: number;
    children: number;
  };
  total: number;
  due: number;
  docStatus: "Received" | "Pending" | "Partial 1/2";
};

export function ReservationCard({ 
  id, 
  guest, 
  status, 
  checkIn, 
  checkOut, 
  email, 
  phone, 
  bookingDate, 
  guests, 
  total, 
  due, 
  docStatus 
}: ReservationCardProps) {
  const getStatusColor = (status: StatusType) => {
    switch (status) {
      case "Confirmed": return "bg-green-500 hover:bg-green-600";
      case "Pending": return "bg-yellow-500 hover:bg-yellow-600";
      case "Canceled": return "bg-red-500 hover:bg-red-600";
      default: return "bg-gray-500 hover:bg-gray-600";
    }
  };

  const getDocStatusColor = (status: string) => {
    switch (status) {
      case "Received": return "bg-green-500 text-white";
      case "Pending": return "bg-red-500 text-white";
      case "Partial 1/2": return "bg-orange-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getDueColor = (due: number) => {
    return due > 0 ? "bg-red-500 text-white" : "bg-green-500 text-white";
  };

  return (
    <Card className="w-full mb-4 border-gray-200 bg-black text-white relative">
      <div className="absolute top-2 right-2 flex space-x-2">
        <button className="text-gray-400 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
        </button>
      </div>
      
      <CardHeader className="flex flex-row items-center space-x-2 pb-2">
        <div className="flex items-center space-x-2">
          <Avatar className={`h-8 w-8 ${status === "Confirmed" ? "bg-green-500" : status === "Pending" ? "bg-yellow-500" : "bg-red-500"}`}>
            <span className="text-white font-bold">{guest.initial}</span>
          </Avatar>
          <div>
            <div className="flex items-center">
              <h3 className="font-semibold text-md">{guest.name}</h3>
              <Badge className={`ml-2 ${getStatusColor(status)}`}>
                {status}
              </Badge>
            </div>
            <p className="text-xs text-gray-400">Res. No: {id}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="text-sm space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-gray-400">
              <CalendarIcon size={14} />
              <span>Check-in / Check-out</span>
            </div>
            <p className="ml-6">{checkIn} - {checkOut}</p>
          </div>
          <div>
            <div className="flex items-center space-x-2 text-gray-400">
              <MailIcon size={14} />
              <span>Email</span>
            </div>
            <p className="ml-6 truncate">{email}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-gray-400">
              <ClockIcon size={14} />
              <span>Booking Date</span>
            </div>
            <p className="ml-6">{bookingDate}</p>
          </div>
          <div>
            <div className="flex items-center space-x-2 text-gray-400">
              <PhoneIcon size={14} />
              <span>Phone</span>
            </div>
            <p className="ml-6">{phone}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-gray-400">
              <UserIcon size={14} />
              <span>Guests</span>
            </div>
            <p className="ml-6">
              {Array(guests.adults).fill(0).map((_, i) => (
                <span key={`adult-${i}`} className="inline-block mr-1">👤</span>
              ))}
              {Array(guests.children).fill(0).map((_, i) => (
                <span key={`child-${i}`} className="inline-block mr-1">👶</span>
              ))}
            </p>
          </div>
          <div>
            <div className="flex items-center space-x-2 text-gray-400">
              <CheckCircleIcon size={14} />
              <span>Doc(s)</span>
            </div>
            <p className="ml-6">
              <Badge className={`${getDocStatusColor(docStatus)}`}>
                {docStatus}
              </Badge>
            </p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-gray-700 pt-3 flex justify-between">
        <div>
          <span className="text-gray-400 text-xs">Total:</span>
          <span className="font-bold ml-1">${total}</span>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="text-xs h-8">
            View Room
          </Button>
          <Button size="sm" className={`text-xs h-8 ${getDueColor(due)}`}>
            Due: ${due}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}