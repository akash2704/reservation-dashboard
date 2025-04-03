import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import {
  CalendarIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
  CheckCircleIcon,
  ClockIcon,
  MoreVertical,
} from "lucide-react";

type StatusType = "Pending" | "Confirmed" | "Canceled";

interface Guest {
  name: string;
  initial: string;
  avatar?: string; // Kept optional for flexibility
}

interface Guests {
  adults: number;
  children: number;
}

interface ReservationCardProps {
  id: string;
  guest: Guest;
  status: StatusType;
  checkIn: string;
  checkOut: string;
  email: string;
  phone: string;
  bookingDate: string;
  guests: Guests;
  total: number; // Kept as number for calculation flexibility
  due: number; // Kept as number for calculation flexibility
  docStatus: "Received" | "Pending" | "Partial 1/2";
}

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
  docStatus,
}: ReservationCardProps) {
  const getStatusColor = (status: StatusType) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-500 hover:bg-green-600";
      case "Pending":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "Canceled":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  const getDocStatusColor = (docStatus: ReservationCardProps["docStatus"]) => {
    switch (docStatus) {
      case "Received":
        return "bg-green-500 text-white";
      case "Pending":
        return "bg-red-500 text-white";
      case "Partial 1/2":
        return "bg-orange-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getDueColor = (due: number) => {
    return due > 0 ? "bg-red-500 text-white" : "bg-green-500 text-white";
  };

  return (
    <Card className="w-full mb-4 border-gray-700 bg-gray-900 text-white relative">
      <div className="absolute top-2 right-2 flex space-x-2">
        <button className="text-gray-400 hover:text-white">
          <MoreVertical size={20} />
        </button>
      </div>

      <CardHeader className="flex flex-row items-center space-x-2 pb-2">
        <div className="flex items-center space-x-2">
          <Avatar
            className={`h-8 w-8 ${
              status === "Confirmed"
                ? "bg-green-500"
                : status === "Pending"
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          >
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
              {Array.from({ length: guests.adults }, (_, i) => (
                <UserIcon key={`adult-${i}`} size={14} className="inline mr-1 text-gray-400" />
              ))}
              {Array.from({ length: guests.children }, (_, i) => (
                <UserIcon key={`child-${i}`} size={14} className="inline mr-1 text-gray-300" />
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

      <div className="border-t border-gray-700 pt-3 px-4 flex justify-between items-center">
        <div>
          <span className="text-gray-400 text-xs">Total:</span>
          <span className="font-bold ml-1">${total.toFixed(2)}</span>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="text-xs h-8 border-gray-600 text-white">
            View Room
          </Button>
          <Button size="sm" className={`text-xs h-8 ${getDueColor(due)}`}>
            Due: ${due.toFixed(2)}
          </Button>
        </div>
      </div>
    </Card>
  );
}