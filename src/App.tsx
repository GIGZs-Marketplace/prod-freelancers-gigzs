import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase, isSupabaseConfigured, testSupabaseConnection } from './lib/supabase';

interface FormData {
  name: string;
  email: string;
  phone: string;
  expertise: string;
  experience: string;
  availability: string;
  country: string;
  state: string;
  city: string;
  portfolio: string;
}

const questions = [
  {
    id: 'name',
    question: 'What is your name?',
    type: 'text',
    placeholder: 'Enter your full name',
  },
  {
    id: 'email',
    question: 'What is your email address?',
    type: 'email',
    placeholder: 'Enter your email',
  },
  {
    id: 'phone',
    question: 'What is your contact number?',
    type: 'tel',
    placeholder: 'Enter your phone number',
  },
  {
    id: 'country',
    question: 'Which country are you based in?',
    type: 'text',
    placeholder: 'Enter your country',
  },
  {
    id: 'state',
    question: 'Which state/province are you in?',
    type: 'text',
    placeholder: 'Enter your state/province',
  },
  {
    id: 'city',
    question: 'Which city are you in?',
    type: 'text',
    placeholder: 'Enter your city',
  },
  {
    id: 'expertise',
    question: 'What is your area of expertise?',
    type: 'text',
    placeholder: 'e.g., Full Stack Development, UI/UX Design',
  },
  {
    id: 'experience',
    question: 'How many years of experience do you have?',
    type: 'text',
    placeholder: 'e.g., 5 years',
  },
  {
    id: 'portfolio',
    question: 'Share your portfolio link',
    type: 'url',
    placeholder: 'https://your-portfolio.com',
  },
  {
    id: 'availability',
    question: 'What is your weekly availability?',
    type: 'text',
    placeholder: 'e.g., Full-time, 20 hours/week',
  },
];

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    expertise: '',
    experience: '',
    availability: '',
    country: '',
    state: '',
    city: '',
    portfolio: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const checkSupabase = async () => {
      if (!isSupabaseConfigured()) {
        toast.error('Please connect to Supabase using the "Connect to Supabase" button in the top right corner.');
        return;
      }

      const isConnected = await testSupabaseConnection();
      if (!isConnected) {
        toast.error('Unable to connect to Supabase. Please check your connection.');
      }
    };

    checkSupabase();
  }, []);

  const handleSubmit = async () => {
    if (!isSupabaseConfigured()) {
      toast.error('Please connect to Supabase using the "Connect to Supabase" button in the top right corner.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ 
          name: formData.name, 
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          state: formData.state,
          city: formData.city,
          expertise: formData.expertise,
          experience: formData.experience,
          portfolio: formData.portfolio,
          availability: formData.availability,
        }]);
      
      if (error) {
        if (error.code === '23505') {
          toast.error('This email is already registered.');
        } else {
          throw error;
        }
      } else {
        setShowSuccess(true);
        toast.success('Successfully registered! We\'ll be in touch soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          expertise: '',
          experience: '',
          availability: '',
          country: '',
          state: '',
          city: '',
          portfolio: '',
        });
        setCurrentStep(0);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong. Please try again.');
    }
    setIsSubmitting(false);
  };

  const currentQuestion = questions[currentStep];
  const isLastQuestion = currentStep === questions.length - 1;

  const handleNext = () => {
    if (isLastQuestion) {
      handleSubmit();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <nav className="fixed w-full top-0 z-50 bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-2">
              <img 
                src="https://raw.githubusercontent.com/GIGZs-Marketplace/brand-images/d648f1a74e8616a481bb82f6c235e0a3b761017b/gigzs-logo.svg"
                alt="GIGZs Logo"
                className="h-6 w-auto"
              />
              <span className="text-lg font-medium tracking-wider text-black">GIGZs</span>
            </div>
          </div>
        </nav>

        <main className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Application Submitted!</h2>
            <p className="text-gray-600 mb-8">
              Thank you for your interest in joining GIGZs. We'll review your application and get back to you soon.
            </p>
          </div>
        </main>

        <footer className="py-4 sm:py-6 border-t border-black/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex justify-center">
              <a href="https://gigzs.com" className="text-sm text-black hover:text-primary transition-colors">© 2025 GIGZs</a>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Toaster position="top-center" />
      
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2">
            <img 
              src="https://raw.githubusercontent.com/GIGZs-Marketplace/brand-images/d648f1a74e8616a481bb82f6c235e0a3b761017b/gigzs-logo.svg"
              alt="GIGZs Logo"
              className="h-6 w-auto"
            />
            <span className="text-lg font-medium tracking-wider text-black">GIGZs</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-xl mx-auto">
          <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg border border-black/10">
            {/* Progress Bar */}
            <div className="w-full h-1 bg-black/10 rounded-full mb-6 sm:mb-8">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 sm:space-y-6"
              >
                <h2 className="text-lg sm:text-xl font-bold text-black leading-tight">
                  {currentQuestion.question}
                </h2>
                <input
                  type={currentQuestion.type}
                  value={formData[currentQuestion.id as keyof FormData]}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    [currentQuestion.id]: e.target.value
                  }))}
                  placeholder={currentQuestion.placeholder}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base sm:text-lg border border-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
                <div className="flex justify-between items-center pt-4">
                  <button
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    className={`text-black hover:text-primary transition-colors ${currentStep === 0 ? 'invisible' : ''}`}
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!formData[currentQuestion.id as keyof FormData] || isSubmitting}
                    className="bg-primary text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-md hover:bg-primary-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : isLastQuestion ? 'Submit' : 'Next'}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 sm:py-6 border-t border-black/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex justify-center">
            <a href="https://gigzs.com" className="text-sm text-black hover:text-primary transition-colors">© 2025 GIGZs</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;