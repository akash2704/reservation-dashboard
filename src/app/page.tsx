// app/page.tsx
"use client";

import { useState } from "react";
import { ReservationCard } from "@/components/ReservationCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { CalendarIcon, FilterIcon, PlusIcon, SearchIcon } from "lucide-react";

// Sample data to match your image
const reservations = [
  {
    id: "112345",
    guest: { name: "John Doe", initial: "B" },
    status: "Pending",
    checkIn: "01/01/2024",
    checkOut: "01/05/2024",
    email: "john.doe@example.com",
    phone: "+1 234-567-890",
    bookingDate: "12/25/2023",
    guests: { adults: 2, children: 1 },
    total: 500,
    due: 200,
    docStatus: "Received"
  },
  {
    id: "112346",
    guest: { name: "Jane Smith", initial: "H" },
    status: "Canceled",
    checkIn: "02/01/2024",
    checkOut: "02/03/2024",
    email: "jane.smith@example.com",
    phone: "+1 987-654-321",
    bookingDate: "01/15/2024",
    guests: { adults: 2, children: 1 },
    total: 300,
    due: 100,
    docStatus: "Pending"
  },
  {
    id: "TestRsvID",
    guest: { name: "Manoj", initial: "M" },
    status: "Confirmed",
    checkIn: "03/01/2024",
    checkOut: "03/03/2024",
    email: "mkss@live.in",
    phone: "+1 989-654-321",
    bookingDate: "02/15/2024",
    guests: { adults: 2, children: 1 },
    total: 1300,
    due: 100,
    docStatus: "Partial 1/2"
  },
  {
    id: "121347",
    guest: { name: "Robert Chen", initial: "Y" },
    status: "Confirmed",
    checkIn: "01/10/2024",
    checkOut: "01/15/2024",
    email: "robert.chen@example.com",
    phone: "+1 555-123-4567",
    bookingDate: "12/30/2023",
    guests: { adults: 2, children: 1 },
    total: 750,
    due: 50,
    docStatus: "Received"
  },
  {
    id: "121348",
    guest: { name: "Sarah Johnson", initial: "G" },
    status: "Pending",
    checkIn: "02/05/2024",
    checkOut: "02/07/2024",
    email: "sarah.j@example.com",
    phone: "+1 555-987-6543",
    bookingDate: "01/20/2024",
    guests: { adults: 2, children: 0 },
    total: 400,
    due: 400,
    docStatus: "Pending"
  },
  {
    id: "121349",
    guest: { name: "Michael Brown", initial: "A" },
    status: "Confirmed",
    checkIn: "01/20/2024",
    checkOut: "01/22/2024",
    email: "m.brown@example.com",
    phone: "+1 555-789-0123",
    bookingDate: "01/05/2024",
    guests: { adults: 1, children: 0 },
    total: 300,
    due: 150,
    docStatus: "Received"
  }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Reservations</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              Actions
              <svg className="ml-2 h-4 w-4" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m6 9 6 6 6-6"/></svg>
            </Button>
            <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
              <PlusIcon className="mr-2 h-4 w-4" />
              Create
            </Button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="relative flex-grow max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input 
              placeholder="Search" 
              className="pl-10 bg-gray-800 border-gray-700" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="text-gray-400">
                Communication
                <svg className="ml-2 h-4 w-4" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m6 9 6 6 6-6"/></svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Email</DropdownMenuItem>
              <DropdownMenuItem>SMS</DropdownMenuItem>
              <DropdownMenuItem>WhatsApp</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="text-gray-400">
                Status
                <svg className="ml-2 h-4 w-4" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m6 9 6 6 6-6"/></svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Confirmed</DropdownMenuItem>
              <DropdownMenuItem>Pending</DropdownMenuItem>
              <DropdownMenuItem>Canceled</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="text-gray-400">
                Source
                <svg className="ml-2 h-4 w-4" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m6 9 6 6 6-6"/></svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Online</DropdownMenuItem>
              <DropdownMenuItem>Direct</DropdownMenuItem>
              <DropdownMenuItem>Agent</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="text-gray-400">
                Payment
                <svg className="ml-2 h-4 w-4" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m6 9 6 6 6-6"/></svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Full</DropdownMenuItem>
              <DropdownMenuItem>Partial</DropdownMenuItem>
              <DropdownMenuItem>Pending</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" size="sm" className="text-gray-400">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Pick date range
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reservations.map((reservation) => (
            <ReservationCard 
              key={reservation.id}
              id={reservation.id}
              guest={reservation.guest}
              status={reservation.status as any}
              checkIn={reservation.checkIn}
              checkOut={reservation.checkOut}
              email={reservation.email}
              phone={reservation.phone}
              bookingDate={reservation.bookingDate}
              guests={reservation.guests}
              total={reservation.total}
              due={reservation.due}
              docStatus={reservation.docStatus as any}
            />
          ))}
        </div>
      </div>
    </main>
  );
}