import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const bookingSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  clientName: z.string().min(2, 'Client name is required'),
  clientEmail: z.string().email('Please enter a valid email'),
  clientPhone: z.string().min(10, 'Phone number is required'),
  service: z.string().min(1, 'Please select a service'),
  date: z.string().min(1, 'Date is required'),
  startTime: z.string().min(1, 'Start time is required'),
  duration: z.number().min(15, 'Duration must be at least 15 minutes'),
  notes: z.string().optional(),
  status: z.enum(['scheduled', 'confirmed', 'completed', 'cancelled', 'no-show']).default('scheduled')
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface Service {
  id: string;
  name: string;
  duration: number; // in minutes
  price: number;
  description: string;
  category: string;
}

interface BookingFormProps {
  onSubmit: (data: BookingFormData) => void;
  onCancel: () => void;
  initialData?: Partial<BookingFormData>;
  isEditing?: boolean;
  selectedDate?: Date;
  selectedTime?: string;
}

const BookingForm: React.FC<BookingFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isEditing = false,
  selectedDate,
  selectedTime
}) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const services: Service[] = [
    {
      id: '1',
      name: 'Initial Consultation',
      duration: 60,
      price: 150,
      description: 'First meeting to discuss project requirements and scope',
      category: 'Consultation'
    },
    {
      id: '2',
      name: 'Project Planning',
      duration: 90,
      price: 200,
      description: 'Detailed project planning and architecture discussion',
      category: 'Planning'
    },
    {
      id: '3',
      name: 'Design Review',
      duration: 45,
      price: 100,
      description: 'Review and feedback on design mockups and prototypes',
      category: 'Design'
    },
    {
      id: '4',
      name: 'Technical Review',
      duration: 60,
      price: 150,
      description: 'Technical architecture and implementation review',
      category: 'Development'
    },
    {
      id: '5',
      name: 'Project Demo',
      duration: 30,
      price: 75,
      description: 'Demonstration of completed features or milestones',
      category: 'Demo'
    },
    {
      id: '6',
      name: 'Training Session',
      duration: 120,
      price: 300,
      description: 'Training on system usage and best practices',
      category: 'Training'
    }
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      ...initialData,
      date: selectedDate ? selectedDate.toISOString().split('T')[0] : initialData?.date,
      startTime: selectedTime || initialData?.startTime,
      duration: initialData?.duration || 60
    }
  });

  const watchedService = watch('service');
  const watchedDate = watch('date');
  const watchedStartTime = watch('startTime');
  const watchedDuration = watch('duration');

  React.useEffect(() => {
    if (watchedService) {
      const service = services.find(s => s.id === watchedService);
      if (service) {
        setSelectedService(service);
        setValue('duration', service.duration);
      }
    }
  }, [watchedService, setValue]);

  React.useEffect(() => {
    if (selectedDate) {
      setValue('date', selectedDate.toISOString().split('T')[0]);
    }
    if (selectedTime) {
      setValue('startTime', selectedTime);
    }
  }, [selectedDate, selectedTime, setValue]);

  const calculateEndTime = (startTime: string, duration: number) => {
    if (!startTime) return '';
    
    const [hours, minutes] = startTime.split(':').map(Number);
    const startMinutes = hours * 60 + minutes;
    const endMinutes = startMinutes + duration;
    
    const endHours = Math.floor(endMinutes / 60);
    const endMins = endMinutes % 60;
    
    return `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;
  };

  const handleFormSubmit = (data: BookingFormData) => {
    onSubmit(data);
    reset();
  };

  const getAvailableTimes = (date: string) => {
    if (!date) return [];
    
    const timeSlots = [];
    for (let hour = 9; hour < 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        timeSlots.push(time);
      }
    }
    return timeSlots;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-brand-secondary rounded-lg shadow-sm border border-brand-accent/20 p-6"
    >
      <h3 className="text-lg font-semibold text-white mb-6">
        {isEditing ? 'Edit Booking' : 'Create New Booking'}
      </h3>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Booking Title */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Booking Title *</label>
            <input
              {...register('title')}
              className="w-full px-4 py-2 bg-brand-primary border border-brand-accent/30 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent text-white placeholder-gray-400"
              placeholder="e.g., Project Kickoff Meeting"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          {/* Client Information */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Client Name *</label>
            <input
              {...register('clientName')}
              className="w-full px-4 py-2 bg-brand-primary border border-brand-accent/30 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent text-white placeholder-gray-400"
              placeholder="John Doe"
            />
            {errors.clientName && <p className="text-red-500 text-sm mt-1">{errors.clientName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Client Email *</label>
            <input
              {...register('clientEmail')}
              type="email"
              className="w-full px-4 py-2 bg-brand-primary border border-brand-accent/30 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent text-white placeholder-gray-400"
              placeholder="john@example.com"
            />
            {errors.clientEmail && <p className="text-red-500 text-sm mt-1">{errors.clientEmail.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Client Phone *</label>
            <input
              {...register('clientPhone')}
              className="w-full px-4 py-2 bg-brand-primary border border-brand-accent/30 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent text-white placeholder-gray-400"
              placeholder="+1 (555) 123-4567"
            />
            {errors.clientPhone && <p className="text-red-500 text-sm mt-1">{errors.clientPhone.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Service *</label>
            <select
              {...register('service')}
              className="w-full px-4 py-2 bg-brand-primary border border-brand-accent/30 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent text-white"
            >
              <option value="">Select a service</option>
              {services.map(service => (
                <option key={service.id} value={service.id}>
                  {service.name} ({service.duration}min) - ${service.price}
                </option>
              ))}
            </select>
            {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service.message}</p>}
          </div>

          {/* Service Details */}
          {selectedService && (
            <div className="md:col-span-2 p-4 bg-brand-primary/30 rounded-lg">
              <h4 className="text-sm font-medium text-white mb-2">Service Details</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Category:</span>
                  <span className="text-white ml-2">{selectedService.category}</span>
                </div>
                <div>
                  <span className="text-gray-400">Duration:</span>
                  <span className="text-white ml-2">{selectedService.duration} minutes</span>
                </div>
                <div>
                  <span className="text-gray-400">Price:</span>
                  <span className="text-white ml-2">${selectedService.price}</span>
                </div>
                <div className="md:col-span-2">
                  <span className="text-gray-400">Description:</span>
                  <span className="text-white ml-2">{selectedService.description}</span>
                </div>
              </div>
            </div>
          )}

          {/* Date and Time */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Date *</label>
            <input
              {...register('date')}
              type="date"
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-2 bg-brand-primary border border-brand-accent/30 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent text-white"
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Start Time *</label>
            <select
              {...register('startTime')}
              className="w-full px-4 py-2 bg-brand-primary border border-brand-accent/30 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent text-white"
            >
              <option value="">Select time</option>
              {getAvailableTimes(watchedDate).map(time => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            {errors.startTime && <p className="text-red-500 text-sm mt-1">{errors.startTime.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Duration (minutes) *</label>
            <input
              {...register('duration', { valueAsNumber: true })}
              type="number"
              min="15"
              max="480"
              step="15"
              className="w-full px-4 py-2 bg-brand-primary border border-brand-accent/30 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent text-white placeholder-gray-400"
            />
            {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">End Time</label>
            <input
              type="text"
              value={watchedStartTime && watchedDuration ? calculateEndTime(watchedStartTime, watchedDuration) : ''}
              readOnly
              className="w-full px-4 py-2 bg-brand-primary/50 border border-brand-accent/30 rounded-lg text-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
            <select
              {...register('status')}
              className="w-full px-4 py-2 bg-brand-primary border border-brand-accent/30 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent text-white"
            >
              <option value="scheduled">Scheduled</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="no-show">No Show</option>
            </select>
          </div>

          {/* Notes */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Notes</label>
            <textarea
              {...register('notes')}
              rows={3}
              className="w-full px-4 py-2 bg-brand-primary border border-brand-accent/30 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent text-white placeholder-gray-400"
              placeholder="Additional notes or special requirements..."
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-brand-accent/20">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 text-sm font-medium text-gray-300 bg-brand-primary border border-brand-accent/30 rounded-lg hover:bg-brand-primary/70 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 text-sm font-medium text-white bg-brand-accent rounded-lg hover:bg-blue-600 transition-colors"
          >
            {isEditing ? 'Update Booking' : 'Create Booking'}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default BookingForm;
