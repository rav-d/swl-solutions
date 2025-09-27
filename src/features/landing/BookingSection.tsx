import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { BOOKING_SLOTS } from '../../lib/constants';
import { BookingSlot } from '../../types';

const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(10, 'Please provide more details about your project'),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const BookingSection: React.FC = () => {
  const [selectedSlot, setSelectedSlot] = useState<BookingSlot | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingFormData) => {
    if (!selectedSlot) {
      alert('Please select a time slot');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Booking data:', { ...data, slot: selectedSlot });
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    reset();
    setSelectedSlot(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const availableSlots = BOOKING_SLOTS.filter(slot => slot.available);
  const unavailableSlots = BOOKING_SLOTS.filter(slot => !slot.available);

  if (isSubmitted) {
    return (
      <section id="booking" className="py-20 bg-brand-secondary">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-brand-primary rounded-2xl p-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-4">Booking Confirmed!</h2>
              <p className="text-gray-400 mb-6">
                Thank you for scheduling a consultation with us. We'll send you a calendar invite and meeting details shortly.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSubmitted(false)}
                className="bg-brand-accent text-white px-8 py-3 rounded-full hover:bg-blue-500 transition-colors duration-300 font-semibold"
              >
                Book Another Session
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-20 bg-brand-secondary">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">Schedule a Consultation</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Book a free consultation to discuss your project requirements and get expert advice from our team.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Available Time Slots */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Available Time Slots</h3>
              <div className="space-y-4">
                {availableSlots.map((slot) => (
                  <motion.div
                    key={slot.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                      selectedSlot?.id === slot.id
                        ? 'border-brand-accent bg-brand-accent/10'
                        : 'border-brand-primary hover:border-brand-accent/50 bg-brand-primary/50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-white font-semibold capitalize">{slot.type} Session</h4>
                        <p className="text-gray-400 text-sm">
                          {formatDate(slot.date)} at {formatTime(slot.time)}
                        </p>
                        <p className="text-gray-400 text-sm">{slot.duration} minutes</p>
                      </div>
                      <div className="text-right">
                        <p className="text-brand-accent font-bold">
                          ${slot.price}
                        </p>
                        <span className="text-xs text-gray-500">one-time</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {unavailableSlots.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-white font-semibold mb-4">Unavailable Slots</h4>
                  <div className="space-y-2">
                    {unavailableSlots.map((slot) => (
                      <div
                        key={slot.id}
                        className="p-3 rounded-lg bg-gray-800/50 border border-gray-700 opacity-60"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-gray-400 text-sm capitalize">{slot.type} Session</p>
                            <p className="text-gray-500 text-xs">
                              {formatDate(slot.date)} at {formatTime(slot.time)}
                            </p>
                          </div>
                          <span className="text-xs text-gray-500">Booked</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Booking Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Your Information</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2" htmlFor="name">
                      Full Name *
                    </label>
                    <input
                      {...register('name')}
                      className="w-full rounded-lg bg-brand-primary text-white px-4 py-3 outline-none border border-transparent focus:border-brand-accent"
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2" htmlFor="email">
                      Email Address *
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      className="w-full rounded-lg bg-brand-primary text-white px-4 py-3 outline-none border border-transparent focus:border-brand-accent"
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2" htmlFor="company">
                      Company (Optional)
                    </label>
                    <input
                      {...register('company')}
                      className="w-full rounded-lg bg-brand-primary text-white px-4 py-3 outline-none border border-transparent focus:border-brand-accent"
                      placeholder="Your Company"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2" htmlFor="phone">
                      Phone (Optional)
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      className="w-full rounded-lg bg-brand-primary text-white px-4 py-3 outline-none border border-transparent focus:border-brand-accent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2" htmlFor="message">
                    Project Details *
                  </label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    className="w-full rounded-lg bg-brand-primary text-white px-4 py-3 outline-none border border-transparent focus:border-brand-accent"
                    placeholder="Tell us about your project goals, timeline, and any specific requirements..."
                  />
                  {errors.message && (
                    <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                {selectedSlot && (
                  <div className="bg-brand-primary/50 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Selected Session:</h4>
                    <p className="text-gray-400 text-sm">
                      {formatDate(selectedSlot.date)} at {formatTime(selectedSlot.time)} - ${selectedSlot.price}
                    </p>
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={!selectedSlot || isSubmitting}
                  whileHover={{ scale: selectedSlot && !isSubmitting ? 1.02 : 1 }}
                  whileTap={{ scale: selectedSlot && !isSubmitting ? 0.98 : 1 }}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    selectedSlot && !isSubmitting
                      ? 'bg-brand-accent text-white hover:bg-blue-500'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? 'Booking...' : 'Confirm Booking'}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
