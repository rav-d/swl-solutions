import React, { useState } from 'react';

const ContactSection: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const formAction = 'https://formsubmit.co/hello@swlsolutions.dev';

  return (
    <section id="contact" className="py-20 bg-brand-secondary">
      <div className="container mx-auto px-6">
        <div className="bg-brand-primary rounded-2xl p-8 md:p-12 shadow-2xl border border-brand-accent/20 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Have a project in mind?</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8 text-center">Let's build something amazing together. Share a few details and we'll get back to you within 24 hours.</p>

          {submitted ? (
            <div className="text-center text-green-400 font-semibold">Thanks! Your message has been sent.</div>
          ) : (
            <form
              action={formAction}
              method="POST"
              onSubmit={() => setSubmitting(true)}
              className="space-y-4"
            >
              <input type="hidden" name="_subject" value="New inquiry from SWL Solutions site" />
              <input type="hidden" name="_template" value="table" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2" htmlFor="name">Name</label>
                  <input id="name" name="name" required className="w-full rounded-lg bg-brand-secondary text-white px-4 py-3 outline-none border border-transparent focus:border-brand-accent" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2" htmlFor="email">Email</label>
                  <input id="email" type="email" name="email" required className="w-full rounded-lg bg-brand-secondary text-white px-4 py-3 outline-none border border-transparent focus:border-brand-accent" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2" htmlFor="budget">Budget</label>
                  <select id="budget" name="budget" className="w-full rounded-lg bg-brand-secondary text-white px-4 py-3 outline-none border border-transparent focus:border-brand-accent">
                    <option value="Undisclosed">Prefer not to say</option>
                    <option value="<10k">Below $10k</option>
                    <option value="10k-25k">$10k–$25k</option>
                    <option value=">25k">$25k+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2" htmlFor="timeline">Timeline</label>
                  <select id="timeline" name="timeline" className="w-full rounded-lg bg-brand-secondary text-white px-4 py-3 outline-none border border-transparent focus:border-brand-accent">
                    <option value="flexible">Flexible</option>
                    <option value="asap">ASAP</option>
                    <option value="1-3 months">1–3 months</option>
                    <option value=">3 months">3+ months</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2" htmlFor="services">Interested Services</label>
                <select id="services" name="services" multiple className="w-full rounded-lg bg-brand-secondary text-white px-4 py-3 outline-none border border-transparent focus:border-brand-accent">
                  <option>Web Development</option>
                  <option>Mobile Development</option>
                  <option>Backend & APIs</option>
                  <option>Cloud & AWS</option>
                  <option>QA & Testing</option>
                  <option>Project Management</option>
                  <option>AI & Automation</option>
                  <option>AI & Machine Learning</option>
                  <option>UI/UX & Figma Design</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2" htmlFor="message">Project Details</label>
                <textarea id="message" name="message" rows={5} required className="w-full rounded-lg bg-brand-secondary text-white px-4 py-3 outline-none border border-transparent focus:border-brand-accent" placeholder="Tell us about your goals, users, constraints, and success metrics."></textarea>
              </div>

              <div className="flex items-center justify-between gap-4">
                <p className="text-xs text-gray-500">By submitting, you agree to be contacted about your inquiry.</p>
                <button disabled={submitting} className="bg-brand-accent disabled:opacity-60 text-white px-6 py-3 rounded-full hover:bg-blue-500 transition-colors duration-300 font-semibold">
                  {submitting ? 'Sending…' : 'Send message'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
