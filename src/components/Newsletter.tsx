import  { useState } from 'react';
import { Send } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real app, you would submit this to your backend
      setSubmitted(true);
    }
  };
  
  return (
    <section className="bg-primary-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-secondary-900">
            Join Our Newsletter
          </h2>
          <p className="mt-3 text-secondary-600">
            Subscribe to get special offers, early access to new collections, and style tips.
          </p>
          
          {submitted ? (
            <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-md">
              Thank you for subscribing! We've sent a confirmation to your email.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="input flex-grow"
              />
              <button type="submit" className="ml-2 btn btn-primary flex items-center">
                Subscribe
                <Send className="h-4 w-4 ml-2" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
 