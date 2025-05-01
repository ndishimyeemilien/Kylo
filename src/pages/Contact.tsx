import  { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    setSubmitted(true);
  };
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-secondary-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            We'd love to hear from you. Reach out with any questions, feedback, or inquiries.
          </p>
        </div>
      </section>
      
      {/* Contact Information */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-secondary-50 p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">Email Us</h3>
              <p className="text-secondary-600">
                <a href="mailto:support@kylo-shop.com" className="text-primary-600 hover:text-primary-800">
                  support@kylo-shop.com
                </a>
              </p>
              <p className="text-secondary-600 mt-1">
                We'll respond within 24 hours
              </p>
            </div>
            
            <div className="bg-secondary-50 p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">Call Us</h3>
              <p className="text-secondary-600">
                <a href="tel:+1-800-555-0123" className="text-primary-600 hover:text-primary-800">
                  +1 (800) 555-0123
                </a>
              </p>
              <p className="text-secondary-600 mt-1">
                Mon-Fri, 9:00 AM - 6:00 PM EST
              </p>
            </div>
            
            <div className="bg-secondary-50 p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">Visit Us</h3>
              <p className="text-secondary-600">
                123 Fashion Avenue<br />
                New York, NY 10001
              </p>
              <p className="text-secondary-600 mt-1">
                Open Daily: 10:00 AM - 8:00 PM
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Form & Map */}
      <section className="py-12 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold text-secondary-900 mb-6">Send Us a Message</h2>
              
              {submitted ? (
                <div className="bg-green-100 text-green-800 p-4 rounded-md">
                  <h3 className="text-lg font-medium">Thank you for your message!</h3>
                  <p className="mt-2">We've received your inquiry and will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-secondary-700">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-secondary-700">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-secondary-700">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="mt-1 input"
                      required
                    >
                      <option value="">Select a topic</option>
                      <option value="order">Order Inquiry</option>
                      <option value="product">Product Information</option>
                      <option value="return">Returns & Exchanges</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-secondary-700">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="mt-1 input"
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="btn btn-primary flex items-center"
                  >
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-secondary-900 mb-6">Find Us</h2>
              {/* This would normally be a Google Map component */}
              <div className="aspect-w-16 aspect-h-9 bg-secondary-200 rounded-lg overflow-hidden h-96">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095989785!2d-73.9815076!3d40.7399267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1623181390957!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  loading="lazy"
                  title="Kylo Shop Location"
                ></iframe>
              </div>
              
              <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-secondary-900 mb-2">Store Hours</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Monday - Friday</div>
                  <div>10:00 AM - 8:00 PM</div>
                  <div>Saturday</div>
                  <div>10:00 AM - 6:00 PM</div>
                  <div>Sunday</div>
                  <div>11:00 AM - 5:00 PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-secondary-900">Frequently Asked Questions</h2>
            <p className="mt-4 text-secondary-600 max-w-3xl mx-auto">
              Find quick answers to common questions
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-secondary-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-secondary-900 mb-2">What are your shipping options?</h3>
              <p className="text-secondary-600">
                We offer standard shipping (3-5 business days), express shipping (1-2 business days), 
                and free shipping on all orders over $50.
              </p>
            </div>
            
            <div className="bg-secondary-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-secondary-900 mb-2">What is your return policy?</h3>
              <p className="text-secondary-600">
                We accept returns within 30 days of purchase. Items must be unworn, unwashed, and with 
                original tags attached. Please visit our Returns page for more details.
              </p>
            </div>
            
            <div className="bg-secondary-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-secondary-900 mb-2">Do you ship internationally?</h3>
              <p className="text-secondary-600">
                Yes, we ship to most countries worldwide. International shipping typically takes 7-14 business days, 
                depending on the destination.
              </p>
            </div>
            
            <div className="bg-secondary-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-secondary-900 mb-2">How can I track my order?</h3>
              <p className="text-secondary-600">
                Once your order ships, you will receive a tracking number via email. You can use this number 
                to track your package on our website or directly with the shipping carrier.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-secondary-600">
              Didn't find what you're looking for?{' '}
              <a href="#contact-form" className="text-primary-600 hover:text-primary-800 font-medium">
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
 