
import React, { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Building, Users, Globe, Award, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const About = () => {
  const { translate } = useLanguage();
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow pt-20">
        <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-market-blue mb-6">
              {translate('aboutUsTitle') || 'About Market Research Hub'}
            </h1>
            <p className="text-xl text-market-blue/80 max-w-3xl mx-auto mb-12">
              {translate('aboutUsSubtitle') || 'We provide comprehensive market research and insights to help businesses make informed decisions and stay ahead of the competition.'}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <Building className="h-7 w-7 text-market-blue" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-market-blue">
                  {translate('established') || 'Established'}
                </h3>
                <p className="text-market-blue/70">2010</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-7 w-7 text-market-blue" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-market-blue">
                  {translate('team') || 'Team Members'}
                </h3>
                <p className="text-market-blue/70">120+</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-7 w-7 text-market-blue" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-market-blue">
                  {translate('countries') || 'Countries'}
                </h3>
                <p className="text-market-blue/70">30+</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-7 w-7 text-market-blue" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-market-blue">
                  {translate('reports') || 'Reports Published'}
                </h3>
                <p className="text-market-blue/70">5,000+</p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2 order-2 md:order-1">
                <div className="inline-block px-3 py-1 mb-6 text-xs font-semibold bg-market-blue/10 text-market-blue rounded-full">
                  {translate('ourMission') || 'Our Mission'}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-market-blue mb-6">
                  {translate('missionTitle') || 'Empowering Businesses Through Market Intelligence'}
                </h2>
                <p className="text-market-blue/80 mb-6">
                  {translate('missionDescription') || 'At Market Research Hub, our mission is to provide accurate, timely, and actionable market intelligence that helps businesses navigate complex market landscapes and make data-driven decisions.'}
                </p>
                <p className="text-market-blue/80 mb-6">
                  {translate('missionDescription2') || 'We believe that access to high-quality market insights should be available to businesses of all sizes, from startups to large corporations.'}
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-green-100 rounded-full text-green-600 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <p className="text-market-blue/80">
                      {translate('missionPoint1') || 'Provide accurate and unbiased market research'}
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-green-100 rounded-full text-green-600 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <p className="text-market-blue/80">
                      {translate('missionPoint2') || 'Empower businesses to make informed decisions'}
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-green-100 rounded-full text-green-600 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <p className="text-market-blue/80">
                      {translate('missionPoint3') || 'Foster innovation through market insights'}
                    </p>
                  </div>
                </div>
                
                <Button className="bg-market-blue hover:bg-market-blue/90">
                  {translate('learnMore') || 'Learn More'} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <div className="w-full md:w-1/2 order-1 md:order-2">
                <img 
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                  alt="Team working on market research" 
                  className="rounded-xl shadow-lg w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="bg-blue-50 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-block px-3 py-1 mb-6 text-xs font-semibold bg-market-blue/10 text-market-blue rounded-full">
              {translate('ourTeam') || 'Our Team'}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-market-blue mb-6">
              {translate('teamTitle') || 'Meet Our Expert Research Team'}
            </h2>
            <p className="text-market-blue/80 mb-12 max-w-3xl mx-auto">
              {translate('teamDescription') || 'Our team consists of experienced market analysts, industry experts, and data scientists who work together to provide you with the most accurate and actionable market insights.'}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                  alt="Sarah Johnson" 
                  className="w-full h-48 object-cover object-center"
                />
                <div className="p-6">
                  <h3 className="font-bold text-lg text-market-blue">Sarah Johnson</h3>
                  <p className="text-market-blue/70 mb-4">Chief Research Officer</p>
                  <p className="text-market-blue/80 text-sm">
                    15+ years experience in technology market research and strategy consulting.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                  alt="David Chen" 
                  className="w-full h-48 object-cover object-center"
                />
                <div className="p-6">
                  <h3 className="font-bold text-lg text-market-blue">David Chen</h3>
                  <p className="text-market-blue/70 mb-4">Head of Data Analytics</p>
                  <p className="text-market-blue/80 text-sm">
                    Expert in data science and statistical analysis with focus on consumer behavior.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80" 
                  alt="Emily Rodriguez" 
                  className="w-full h-48 object-cover object-center"
                />
                <div className="p-6">
                  <h3 className="font-bold text-lg text-market-blue">Emily Rodriguez</h3>
                  <p className="text-market-blue/70 mb-4">Healthcare Research Lead</p>
                  <p className="text-market-blue/80 text-sm">
                    Specialized in healthcare and pharmaceutical market analysis.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all">
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                  alt="Marcus Thompson" 
                  className="w-full h-48 object-cover object-center"
                />
                <div className="p-6">
                  <h3 className="font-bold text-lg text-market-blue">Marcus Thompson</h3>
                  <p className="text-market-blue/70 mb-4">Consumer Goods Analyst</p>
                  <p className="text-market-blue/80 text-sm">
                    Expert in retail and consumer goods markets with 10+ years experience.
                  </p>
                </div>
              </div>
            </div>
            
            <Button variant="outline" className="mt-12 border-market-blue text-market-blue hover:bg-market-blue hover:text-white">
              {translate('viewFullTeam') || 'View Full Team'}
            </Button>
          </div>
        </section>
        
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 mb-6 text-xs font-semibold bg-market-blue/10 text-market-blue rounded-full">
                {translate('ourValues') || 'Our Values'}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-market-blue mb-6">
                {translate('valuesTitle') || 'The Principles That Guide Our Work'}
              </h2>
              <p className="text-market-blue/80 max-w-3xl mx-auto">
                {translate('valuesDescription') || 'These core values represent the foundation of our company culture and guide every aspect of our work.'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-market-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-4 text-market-blue">
                  {translate('integrity') || 'Integrity'}
                </h3>
                <p className="text-market-blue/80">
                  {translate('integrityDescription') || 'We conduct our research with the highest level of integrity, ensuring that our findings are accurate, unbiased, and ethically sourced.'}
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-market-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-4 text-market-blue">
                  {translate('innovation') || 'Innovation'}
                </h3>
                <p className="text-market-blue/80">
                  {translate('innovationDescription') || 'We continuously improve our research methodologies and technologies to provide our clients with the most innovative and effective market insights.'}
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-market-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-4 text-market-blue">
                  {translate('collaboration') || 'Collaboration'}
                </h3>
                <p className="text-market-blue/80">
                  {translate('collaborationDescription') || 'We believe in the power of collaboration with our clients, partners, and within our team to deliver comprehensive and valuable market insights.'}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
