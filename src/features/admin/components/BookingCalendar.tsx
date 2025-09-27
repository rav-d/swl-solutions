import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
  duration: number; // in minutes
}

interface BookingCalendarProps {
  bookings: Booking[];
  onBookingClick: (booking: Booking) => void;
  onTimeSlotClick: (date: Date, time: string) => void;
  selectedDate?: Date;
  onDateSelect: (date: Date) => void;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({
  bookings,
  onBookingClick,
  onTimeSlotClick,
  selectedDate,
  onDateSelect
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  const getBookingsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return bookings.filter(booking => 
      booking.startTime.startsWith(dateStr)
    );
  };

  const getBookingsForTime = (date: Date, time: string) => {
    const dateStr = date.toISOString().split('T')[0];
    return bookings.filter(booking => 
      booking.startTime.startsWith(dateStr) && 
      booking.startTime.includes(time)
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-500';
      case 'confirmed': return 'bg-green-500';
      case 'completed': return 'bg-gray-500';
      case 'cancelled': return 'bg-red-500';
      case 'no-show': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      const days = direction === 'prev' ? -7 : 7;
      newDate.setDate(newDate.getDate() + days);
      return newDate;
    });
  };

  const navigateDay = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      const days = direction === 'prev' ? -1 : 1;
      newDate.setDate(newDate.getDate() + days);
      return newDate;
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    if (!selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const renderMonthView = () => {
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-24 border border-brand-accent/20"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayBookings = getBookingsForDate(date);
      
      days.push(
        <motion.div
          key={day}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: day * 0.01 }}
          onClick={() => onDateSelect(date)}
          className={`h-24 border border-brand-accent/20 p-1 cursor-pointer hover:bg-brand-primary/30 transition-colors ${
            isToday(date) ? 'bg-brand-accent/20' : ''
          } ${isSelected(date) ? 'ring-2 ring-brand-accent' : ''}`}
        >
          <div className="flex justify-between items-start">
            <span className={`text-sm font-medium ${
              isToday(date) ? 'text-brand-accent' : 'text-white'
            }`}>
              {day}
            </span>
            {dayBookings.length > 0 && (
              <span className="text-xs bg-brand-accent text-white rounded-full w-5 h-5 flex items-center justify-center">
                {dayBookings.length}
              </span>
            )}
          </div>
          <div className="mt-1 space-y-1">
            {dayBookings.slice(0, 2).map(booking => (
              <div
                key={booking.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onBookingClick(booking);
                }}
                className={`text-xs p-1 rounded ${getStatusColor(booking.status)} text-white truncate cursor-pointer hover:opacity-80`}
                title={booking.title}
              >
                {booking.title}
              </div>
            ))}
            {dayBookings.length > 2 && (
              <div className="text-xs text-gray-400">
                +{dayBookings.length - 2} more
              </div>
            )}
          </div>
        </motion.div>
      );
    }

    return (
      <div className="grid grid-cols-7 gap-0 border border-brand-accent/20 rounded-lg overflow-hidden">
        {daysOfWeek.map(day => (
          <div key={day} className="bg-brand-primary/30 p-2 text-center text-sm font-medium text-gray-300 border-b border-brand-accent/20">
            {day}
          </div>
        ))}
        {days}
      </div>
    );
  };

  const renderWeekView = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDays.push(date);
    }

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-8 gap-2">
          <div className="text-sm font-medium text-gray-300">Time</div>
          {weekDays.map((date, index) => (
            <div key={index} className="text-center">
              <div className={`text-sm font-medium ${
                isToday(date) ? 'text-brand-accent' : 'text-white'
              }`}>
                {days[date.getDay()]}
              </div>
              <div className={`text-lg font-bold ${
                isToday(date) ? 'text-brand-accent' : 'text-white'
              }`}>
                {date.getDate()}
              </div>
            </div>
          ))}
        </div>
        
        <div className="space-y-1">
          {timeSlots.map(time => (
            <div key={time} className="grid grid-cols-8 gap-2">
              <div className="text-sm text-gray-400 py-2">{time}</div>
              {weekDays.map((date, index) => {
                const bookings = getBookingsForTime(date, time);
                return (
                  <div
                    key={index}
                    onClick={() => onTimeSlotClick(date, time)}
                    className="h-12 border border-brand-accent/20 rounded hover:bg-brand-primary/30 cursor-pointer p-1"
                  >
                    {bookings.map(booking => (
                      <div
                        key={booking.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          onBookingClick(booking);
                        }}
                        className={`text-xs p-1 rounded ${getStatusColor(booking.status)} text-white truncate cursor-pointer hover:opacity-80`}
                        title={booking.title}
                      >
                        {booking.title}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const dayBookings = getBookingsForDate(currentDate);
    
    return (
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-lg font-semibold text-white">{formatDate(currentDate)}</div>
          <div className="text-sm text-gray-400">{dayBookings.length} bookings</div>
        </div>
        
        <div className="space-y-2">
          {timeSlots.map(time => {
            const bookings = getBookingsForTime(currentDate, time);
            return (
              <div
                key={time}
                className="flex items-center space-x-4 p-3 border border-brand-accent/20 rounded-lg hover:bg-brand-primary/20 cursor-pointer"
                onClick={() => onTimeSlotClick(currentDate, time)}
              >
                <div className="w-16 text-sm text-gray-400">{time}</div>
                <div className="flex-1 flex space-x-2">
                  {bookings.map(booking => (
                    <div
                      key={booking.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onBookingClick(booking);
                      }}
                      className={`px-3 py-2 rounded ${getStatusColor(booking.status)} text-white cursor-pointer hover:opacity-80`}
                    >
                      <div className="font-medium">{booking.title}</div>
                      <div className="text-xs opacity-90">{booking.client}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-brand-secondary rounded-lg shadow-sm border border-brand-accent/20 p-6">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-white">Calendar</h3>
          <div className="flex bg-brand-primary/30 rounded-lg p-1">
            {['month', 'week', 'day'].map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as any)}
                className={`px-3 py-1 text-sm rounded-md transition-colors capitalize ${
                  viewMode === mode 
                    ? 'bg-brand-accent text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              if (viewMode === 'month') navigateMonth('prev');
              else if (viewMode === 'week') navigateWeek('prev');
              else navigateDay('prev');
            }}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-3 py-1 text-sm bg-brand-accent text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Today
          </button>
          
          <button
            onClick={() => {
              if (viewMode === 'month') navigateMonth('next');
              else if (viewMode === 'week') navigateWeek('next');
              else navigateDay('next');
            }}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Calendar Content */}
      <div className="overflow-x-auto">
        {viewMode === 'month' && renderMonthView()}
        {viewMode === 'week' && renderWeekView()}
        {viewMode === 'day' && renderDayView()}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span className="text-sm text-gray-300">Scheduled</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span className="text-sm text-gray-300">Confirmed</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gray-500 rounded"></div>
          <span className="text-sm text-gray-300">Completed</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span className="text-sm text-gray-300">Cancelled</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-500 rounded"></div>
          <span className="text-sm text-gray-300">No Show</span>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;
