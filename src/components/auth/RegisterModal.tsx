
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/contexts/AuthContext';

const createRegistrationSchema = (translate: (key: string) => string) => z.object({
  name: z.string().min(2, { message: translate('requiredField') }),
  email: z.string().email({ message: translate('invalidEmail') }),
  password: z
    .string()
    .min(8, { message: translate('passwordTooShort') })
    .regex(/[A-Z]/, { message: translate('passwordRequiresUppercase') })
    .regex(/[0-9]/, { message: translate('passwordRequiresNumber') }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: translate('passwordsDoNotMatch'),
  path: ['confirmPassword'],
});

type RegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
};

const RegisterModal = ({ isOpen, onClose, onOpenLogin }: RegisterModalProps) => {
  const { translate } = useLanguage();
  const { register: authRegister } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const registrationSchema = createRegistrationSchema(translate);
  type RegistrationFormValues = z.infer<typeof registrationSchema>;

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: RegistrationFormValues) => {
    setIsLoading(true);
    
    try {
      const success = await authRegister(values.name, values.email, values.password);
      
      if (success) {
        toast.success(translate('registrationSuccess'));
        onClose();
      } else {
        toast.error(translate('registrationError'));
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(translate('registrationError'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginClick = () => {
    onClose();
    onOpenLogin();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-market-blue">
            {translate('register')}
          </DialogTitle>
          <DialogDescription className="text-center text-market-blue/80">
            {translate('registerDescription')}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translate('yourName')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading}
                      placeholder={translate('enterYourName')}
                      className="bg-white"
                    />
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
                  <FormLabel>{translate('email')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      disabled={isLoading}
                      placeholder={translate('enterYourEmail')}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translate('password')}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        disabled={isLoading}
                        placeholder={translate('enterPassword')}
                        className="bg-white pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translate('confirmPassword')}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showConfirmPassword ? "text" : "password"}
                        disabled={isLoading}
                        placeholder={translate('enterConfirmPassword')}
                        className="bg-white pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex flex-col gap-2 sm:flex-row">
              <Button
                type="submit"
                className="w-full bg-market-lightBlue hover:bg-market-lightBlue/80 text-white"
                disabled={isLoading}
              >
                {isLoading ? translate('registering') : translate('register')}
              </Button>
            </DialogFooter>
          </form>
        </Form>

        <div className="mt-4 text-center text-sm text-market-blue/80">
          {translate('alreadyHaveAccount')}{' '}
          <button
            onClick={handleLoginClick}
            className="text-market-lightBlue hover:underline font-medium"
            disabled={isLoading}
          >
            {translate('login')}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
