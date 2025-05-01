import  { Link } from 'react-router-dom';
import { Users, Award, Heart, Clock } from 'lucide-react';
import Newsletter from '../components/Newsletter';

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-secondary-900 py-24">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmYXNoaW9uJTIwY2xvdGhpbmclMjBzdG9yZXxlbnwwfHx8fDE3NDYwMzA0MDd8MA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800"
            alt="Store interior"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Story</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Kylo_Shop was founded with a simple mission: to provide high-quality, 
            stylish clothing that empowers people to express themselves.
          </p>
        </div>
      </section>
      
      {/* Our Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:space-x-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img 
                src="https://images.unsplash.com/photo-1643873822854-ed6c6f3763ee?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw0fHxtb2Rlcm4lMjBmYXNoaW9uJTIwY2xvdGhpbmclMjBzdG9yZXxlbnwwfHx8fDE3NDYwMzA0MDd8MA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800"
                alt="Our mission" 
                className="rounded-lg shadow-md w-full h-96 object-cover"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-semibold text-secondary-900 mb-4">Our Mission</h2>
              <p className="text-secondary-700 mb-4">
                At Kylo_Shop, we believe that clothing is more than just fabric—it's a form of self-expression and confidence. 
                Our mission is to create timeless, high-quality pieces that help you look and feel your best.
              </p>
              <p className="text-secondary-700 mb-6">
                We're committed to ethical manufacturing practices, sustainable materials, and creating a positive impact 
                in the communities we serve. Our designs blend classic elements with modern trends, resulting in versatile 
                pieces that stand the test of time.
              </p>
              <Link to="/products" className="btn btn-primary">
                Explore Our Collection
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Core Values */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-secondary-900">Our Core Values</h2>
            <p className="mt-4 text-secondary-600 max-w-3xl mx-auto">
              These principles guide everything we do, from design to customer service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Community</h3>
              <p className="text-secondary-600">
                We believe in creating a community where everyone feels welcome, valued, and inspired.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Quality</h3>
              <p className="text-secondary-600">
                We never compromise on quality, ensuring every piece meets our high standards.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Sustainability</h3>
              <p className="text-secondary-600">
                We're committed to environmentally responsible practices throughout our supply chain.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Innovation</h3>
              <p className="text-secondary-600">
                We constantly evolve, embracing new technologies and design approaches.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-secondary-900">Meet Our Team</h2>
            <p className="mt-4 text-secondary-600 max-w-3xl mx-auto">
              The passionate individuals behind Kylo_Shop
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-secondary-50 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                alt="CEO" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-secondary-900">Alexander Chen</h3>
                <p className="text-primary-600 mb-2">Founder & CEO</p>
                <p className="text-secondary-600">
                  With over 15 years in fashion retail, Alex brings creative vision and industry expertise.
                </p>
              </div>
            </div>
            
            <div className="bg-secondary-50 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                alt="Design Director" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-secondary-900">Sophia Williams</h3>
                <p className="text-primary-600 mb-2">Design Director</p>
                <p className="text-secondary-600">
                  Former luxury fashion designer with a passion for sustainable and timeless designs.
                </p>
              </div>
            </div>
            
            <div className="bg-secondary-50 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                alt="Operations Manager" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-secondary-900">Marcus Johnson</h3>
                <p className="text-primary-600 mb-2">Operations Manager</p>
                <p className="text-secondary-600">
                  Logistics expert ensuring our supply chain runs smoothly and sustainably.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16 bg-secondary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:space-x-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-semibold mb-4">Our Journey</h2>
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center">
                      <span className="text-white font-semibold">1</span>
                    </div>
                    <div className="h-full w-0.5 bg-primary-600"></div>
                  </div>
                  <div className="ml-4 pb-6">
                    <h3 className="text-xl font-medium text-white">2018: The Beginning</h3>
                    <p className="mt-1 text-white/80">
                      Kylo_Shop started as a small online boutique with just 10 products, 
                      operated out of a tiny apartment in Brooklyn.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center">
                      <span className="text-white font-semibold">2</span>
                    </div>
                    <div className="h-full w-0.5 bg-primary-600"></div>
                  </div>
                  <div className="ml-4 pb-6">
                    <h3 className="text-xl font-medium text-white">2020: Growth & Expansion</h3>
                    <p className="mt-1 text-white/80">
                      We expanded our product line and opened our first physical store, 
                      bringing our vision to life in a tangible space.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center">
                      <span className="text-white font-semibold">3</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-medium text-white">Today: A Global Community</h3>
                    <p className="mt-1 text-white/80">
                      Now with customers in over 30 countries, we're proud to be a leader 
                      in sustainable, stylish fashion for conscious consumers worldwide.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1634316164679-dabb68a88a3c?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw1fHxtb2Rlcm4lMjBmYXNoaW9uJTIwY2xvdGhpbmclMjBzdG9yZXxlbnwwfHx8fDE3NDYwMzA0MDd8MA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800"
                alt="Our journey" 
                className="rounded-lg shadow-md w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Kylo_Shop Family</h2>
          <p className="text-lg text-white/90 mb-8 max-w-3xl mx-auto">
            Experience fashion that combines quality, style, and conscious values. 
            Discover our collection and be part of our journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/products" className="btn bg-white text-primary-600 hover:bg-white/90">
              Shop Now
            </Link>
            <Link to="/contact" className="btn bg-primary-700 text-white hover:bg-primary-800">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
      
      <Newsletter />
    </div>
  );
};

export default About;
 