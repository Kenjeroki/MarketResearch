
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';

const Settings = () => {
  const { translate } = useLanguage();
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: translate('settingsSaved'),
      description: 'Ваші налаштування були успішно збережені.',
    });
  };

  const handleResetSettings = () => {
    toast({
      title: translate('settingsReset'),
      description: 'Ваші налаштування були скинуті до типових значень.',
    });
  };

  return (
    <Layout>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">{translate('settings')}</h1>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="general">{translate('generalSettings')}</TabsTrigger>
            <TabsTrigger value="notifications">{translate('notificationSettings')}</TabsTrigger>
            <TabsTrigger value="data">{translate('dataSettings')}</TabsTrigger>
            <TabsTrigger value="appearance">{translate('appearanceSettings')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>{translate('generalSettings')}</CardTitle>
                <CardDescription>Керуйте загальними налаштуваннями вашого облікового запису.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>{translate('notificationSettings')}</CardTitle>
                <CardDescription>Керуйте тим, як ви отримуєте сповіщення.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">{translate('emailNotifications')}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="research-recommendations">{translate('researchRecommendations')}</Label>
                      <Switch id="research-recommendations" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="research-alerts">{translate('researchAlerts')}</Label>
                      <Switch id="research-alerts" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="newsletter-updates">{translate('newsletterUpdates')}</Label>
                      <Switch id="newsletter-updates" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="marketing-communications">{translate('marketingCommunications')}</Label>
                      <Switch id="marketing-communications" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">{translate('pushNotifications')}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="account-activity">{translate('accountActivity')}</Label>
                      <Switch id="account-activity" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="new-features">{translate('newFeatures')}</Label>
                      <Switch id="new-features" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="data">
            <Card>
              <CardHeader>
                <CardTitle>{translate('dataSettings')}</CardTitle>
                <CardDescription>Керуйте використанням ваших даних.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="data-sharing">{translate('dataSharingConsent')}</Label>
                    <Switch id="data-sharing" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="analytics">{translate('analyticsConsent')}</Label>
                    <Switch id="analytics" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="marketing">{translate('marketingConsent')}</Label>
                    <Switch id="marketing" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>{translate('appearanceSettings')}</CardTitle>
                <CardDescription>Налаштуйте зовнішній вигляд веб-сайту.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 flex justify-end space-x-4">
          <Button variant="outline" onClick={handleResetSettings}>
            {translate('resetDefaults')}
          </Button>
          <Button onClick={handleSaveSettings}>
            {translate('saveSettings')}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
