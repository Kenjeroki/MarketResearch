
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Phone, Mail, Clock, Loader2 } from 'lucide-react';

const Contact = () => {
  const { translate } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const formSchema = z.object({
    name: z.string().min(2, {
      message: translate('requiredField'),
    }),
    email: z.string().email({
      message: translate('invalidEmail'),
    }),
    subject: z.string().min(2, {
      message: translate('requiredField'),
    }),
    message: z.string().min(10, {
      message: translate('messageTooShort'),
    }),
  });
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Form values:', values);
      
      toast({
        title: translate('messageReceived'),
        description: translate('thankYouForContacting'),
      });
      
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: translate('error'),
        description: translate('errorSubmittingForm'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-20">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-market-blue mb-4">
            {translate('contactUs')}
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            {translate('contactDescription')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-market-blue mb-6">
              {translate('getInTouch')}
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <MapPin className="h-5 w-5 text-market-lightBlue" />
                </div>
                <div>
                  <h3 className="text-market-blue font-semibold">{translate('address')}</h3>
                  <p className="text-gray-600">123 Market Research St.</p>
                  <p className="text-gray-600">Kyiv, Ukraine 01001</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Phone className="h-5 w-5 text-market-lightBlue" />
                </div>
                <div>
                  <h3 className="text-market-blue font-semibold">{translate('phone')}</h3>
                  <p className="text-gray-600">+380 44 123 4567</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Mail className="h-5 w-5 text-market-lightBlue" />
                </div>
                <div>
                  <h3 className="text-market-blue font-semibold">{translate('email')}</h3>
                  <p className="text-gray-600">info@marketresearch.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Clock className="h-5 w-5 text-market-lightBlue" />
                </div>
                <div>
                  <h3 className="text-market-blue font-semibold">{translate('workingHours')}</h3>
                  <p className="text-gray-600">{translate('mondayToFriday')}: 9:00 - 18:00</p>
                  <p className="text-gray-600">{translate('saturdaySunday')}: {translate('closed')}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-market-blue mb-6">
              {translate('sendMessage')}
            </h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{translate('yourName')}</FormLabel>
                      <FormControl>
                        <Input placeholder={translate('enterYourName')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{translate('yourEmail')}</FormLabel>
                      <FormControl>
                        <Input placeholder={translate('enterYourEmail')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{translate('subject')}</FormLabel>
                      <FormControl>
                        <Input placeholder={translate('enterSubject')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{translate('message')}</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder={translate('enterYourMessage')} 
                          className="h-32" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {translate('sending')}
                    </>
                  ) : (
                    translate('sendMessage')
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 mb-12">
          <h2 className="text-xl font-bold text-market-blue mb-4 text-center">
            {translate('ourLocation')}
          </h2>
          <div className="h-96 overflow-hidden rounded-lg bg-gray-200">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d80748.56537656735!2d30.472351895979224!3d50.43558002870186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cf4ee15a4505%3A0x764931d2170146fe!2sKyiv%2C%20Ukraine!5e0!3m2!1sen!2sus!4v1690232158399!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
            ></iframe>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
