import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BookingCalendar from './components/BookingCalendar';
import BookingForm from './components/BookingForm';

interface Booking {
  id: string;
  title: string;
  client: string;
  service: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  clientEmail: string;
  clientPhone: string;
  duration: number;
  createdAt: string;
  updatedAt: string;
}

const BookingsManagement: React.FC = () => {
  const [activeView, setActiveView] = useState<'calendar' | 'list' | 'form'>('calendar');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: '1',
      title: 'Project Kickoff Meeting',
      client: 'Sarah Johnson',
      service: 'Initial Consultation',
      startTime: '2024-01-25T10:00:00Z',
      endTime: '2024-01-25T11:00:00Z',
      status: 'confirmed',
      notes: 'Discuss new e-commerce platform requirements',
      clientEmail: 'sarah@techstartup.com',
      clientPhone: '+1 (555) 123-4567',
      duration: 60,
      createdAt: '2024-01-20T10:00:00Z',
      updatedAt: '2024-01-20T10:00:00Z'
    },
    {
      id: '2',
      title: 'Design Review Session',
      client: 'Michael Chen',
      service: 'Design Review',
      startTime: '2024-01-25T14:00:00Z',
      endTime: '2024-01-25T14:45:00Z',
      status: 'scheduled',
      notes: 'Review UI mockups for mobile app',
      clientEmail: 'michael@enterprise.com',
      clientPhone: '+1 (555) 987-6543',
      duration: 45,
      createdAt: '2024-01-22T14:30:00Z',
      updatedAt: '2024-01-22T14:30:00Z'
    },
    {
      id: '3',
      title: 'Technical Architecture Discussion',
      client: 'Emily Rodriguez',
      service: 'Technical Review',
      startTime: '2024-01-26T09:30:00Z',
      endTime: '2024-01-26T10:30:00Z',
      status: 'confirmed',
      notes: 'Review backend architecture and database design',
      clientEmail: 'emily@smallbiz.com',
      clientPhone: '+1 (555) 456-7890',
      duration: 60,
      createdAt: '2024-01-23T09:15:00Z',
      updatedAt: '2024-01-23T09:15:00Z'
    },
    {
      id: '4',
      title: 'Project Demo',
      client: 'Alex Thompson',
      service: 'Project Demo',
      startTime: '2024-01-26T15:00:00Z',
      endTime: '2024-01-26T15:30:00Z',
      status: 'completed',
      notes: 'Demo of completed features for Q1',
      clientEmail: 'alex@innovate.com',
      clientPhone: '+1 (555) 321-0987',
      duration: 30,
      createdAt: '2024-01-15T11:00:00Z',
      updatedAt: '2024-01-26T15:30:00Z'
    },
    {
      id: '5',
      title: 'Training Session',
      client: 'Lisa Wang',
      service: 'Training Session',
      startTime: '2024-01-27T10:00:00Z',
      endTime: '2024-01-27T12:00:00Z',
      status: 'scheduled',
      notes: 'Train client team on new system features',
      clientEmail: 'lisa@techcorp.com',
      clientPhone: '+1 (555) 654-3210',
      duration: 120,
      createdAt: '2024-01-24T16:45:00Z',
      updatedAt: '2024-01-24T16:45:00Z'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    const matchesSearch = booking.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.service.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statusColors = {
    'scheduled': 'bg-blue-100 text-blue-800',
    'confirmed': 'bg-green-100 text-green-800',
    'completed': 'bg-gray-100 text-gray-800',
    'cancelled': 'bg-red-100 text-red-800',
    'no-show': 'bg-yellow-100 text-yellow-800'
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsEditing(true);
    setIsFormModalOpen(true);
  };

  const handleTimeSlotClick = (date: Date, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setSelectedBooking(null);
    setIsEditing(false);
    setIsFormModalOpen(true);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(undefined);
    setSelectedBooking(null);
    setIsEditing(false);
    setIsFormModalOpen(true);
  };

  const handleBookingSubmit = (data: any) => {
    if (isEditing && selectedBooking) {
      // Update existing booking
      const updatedBooking: Booking = {
        ...selectedBooking,
        ...data,
        client: data.clientName,
        endTime: new Date(new Date(data.startTime).getTime() + data.duration * 60000).toISOString(),
        updatedAt: new Date().toISOString()
      };
      setBookings(bookings.map(booking => 
        booking.id === selectedBooking.id ? updatedBooking : booking
      ));
    } else {
      // Create new booking
      const newBooking: Booking = {
        id: Date.now().toString(),
        ...data,
        client: data.clientName,
        endTime: new Date(new Date(data.startTime).getTime() + data.duration * 60000).toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setBookings([newBooking, ...bookings]);
    }
    setIsFormModalOpen(false);
    setSelectedBooking(null);
  };

  const handleBookingDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      setBookings(bookings.filter(booking => booking.id !== id));
    }
  };

  const getStatusLabel = (status: string) => {
    return status.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getUpcomingBookings = () => {
    const now = new Date();
    return bookings
      .filter(booking => new Date(booking.startTime) > now && booking.status !== 'cancelled')
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
      .slice(0, 5);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Bookings Management</h1>
          <p className="text-gray-300">Manage your appointments, schedule meetings, and track bookings.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex bg-brand-primary/30 rounded-lg p-1">
            {[
              { id: 'calendar', label: 'Calendar' },
              { id: 'list', label: 'List' },
              { id: 'form', label: 'New Booking' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === 'form') {
                    setSelectedBooking(null);
                    setIsEditing(false);
                    setIsFormModalOpen(true);
                  } else {
                    setActiveView(tab.id as any);
                  }
                }}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  activeView === tab.id 
                    ? 'bg-brand-accent text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-brand-secondary rounded-lg shadow-sm border border-brand-accent/20 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-300">Total Bookings</p>
              <p className="text-2xl font-bold text-white">{bookings.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-brand-secondary rounded-lg shadow-sm border border-brand-accent/20 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-300">Confirmed Today</p>
              <p className="text-2xl font-bold text-white">
                {bookings.filter(b => b.status === 'confirmed' && new Date(b.startTime).toDateString() === new Date().toDateString()).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-brand-secondary rounded-lg shadow-sm border border-brand-accent/20 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-500/20 rounded-lg">
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-300">Upcoming</p>
              <p className="text-2xl font-bold text-white">
                {bookings.filter(b => new Date(b.startTime) > new Date() && b.status !== 'cancelled').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-brand-secondary rounded-lg shadow-sm border border-brand-accent/20 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-300">Completion Rate</p>
              <p className="text-2xl font-bold text-white">
                {Math.round((bookings.filter(b => b.status === 'completed').length / bookings.length) * 100)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      {activeView === 'calendar' && (
        <BookingCalendar
          bookings={bookings}
          onBookingClick={handleBookingClick}
          onTimeSlotClick={handleTimeSlotClick}
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
        />
      )}

      {/* List View */}
      {activeView === 'list' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-brand-secondary rounded-lg shadow-sm border border-brand-accent/20 p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 bg-brand-primary border border-brand-accent/30 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent text-white placeholder-gray-400"
                />
              </div>
              <div className="flex gap-2">
                {['all', 'scheduled', 'confirmed', 'completed', 'cancelled', 'no-show'].map(status => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                      filterStatus === status
                        ? 'bg-brand-accent text-white'
                        : 'bg-brand-primary/50 text-gray-300 hover:text-white hover:bg-brand-primary/70'
                    }`}
                  >
                    {status === 'all' ? 'All' : getStatusLabel(status)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="bg-brand-secondary rounded-lg shadow-sm border border-brand-accent/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-brand-accent/20">
                <thead className="bg-brand-primary/30">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Booking</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Client</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-brand-secondary divide-y divide-brand-accent/20">
                  {filteredBookings.map((booking, index) => (
                    <motion.tr
                      key={booking.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-brand-primary/20"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-white">{booking.title}</div>
                          <div className="text-sm text-gray-400">{booking.duration} minutes</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-white">{booking.client}</div>
                          <div className="text-sm text-gray-400">{booking.clientEmail}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">{booking.service}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-white">{formatDate(booking.startTime)}</div>
                          <div className="text-sm text-gray-400">{formatTime(booking.startTime)} - {formatTime(booking.endTime)}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[booking.status as keyof typeof statusColors]}`}>
                          {getStatusLabel(booking.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleBookingClick(booking)}
                            className="text-brand-accent hover:text-blue-400"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleBookingDelete(booking.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Upcoming Bookings */}
      {activeView === 'calendar' && (
        <div className="bg-brand-secondary rounded-lg shadow-sm border border-brand-accent/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Upcoming Bookings</h3>
          <div className="space-y-3">
            {getUpcomingBookings().map((booking) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => handleBookingClick(booking)}
                className="flex items-center justify-between p-3 bg-brand-primary/30 rounded-lg hover:bg-brand-primary/50 cursor-pointer transition-colors"
              >
                <div>
                  <div className="font-medium text-white">{booking.title}</div>
                  <div className="text-sm text-gray-400">{booking.client} • {booking.service}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-white">{formatDate(booking.startTime)}</div>
                  <div className="text-sm text-gray-400">{formatTime(booking.startTime)}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Booking Form Modal */}
      <AnimatePresence>
        {isFormModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={() => setIsFormModalOpen(false)} />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="inline-block align-bottom bg-brand-secondary rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full border border-brand-accent/20"
              >
                <div className="p-6">
                  <BookingForm
                    onSubmit={handleBookingSubmit}
                    onCancel={() => setIsFormModalOpen(false)}
                    initialData={selectedBooking ? {
                      title: selectedBooking.title,
                      clientName: selectedBooking.client,
                      clientEmail: selectedBooking.clientEmail,
                      clientPhone: selectedBooking.clientPhone,
                      service: selectedBooking.service,
                      date: selectedBooking.startTime.split('T')[0],
                      startTime: selectedBooking.startTime.split('T')[1].substring(0, 5),
                      duration: selectedBooking.duration,
                      notes: selectedBooking.notes,
                      status: selectedBooking.status
                    } : undefined}
                    isEditing={isEditing}
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingsManagement;
