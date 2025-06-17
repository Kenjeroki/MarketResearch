import React, { useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import HeroSection from "@/components/home/HeroSection";
import AboutUs from "@/components/home/AboutUs";
import FeatureHighlights from "@/components/home/FeatureHighlights";

const Index = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <HeroSection />
      </div>
      <div className="container mx-auto px-4 py-12 space-y-6">
        <AboutUs />
        <FeatureHighlights />
      </div>
    </Layout>
  );
};

export default Index;
