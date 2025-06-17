import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

const createLoginSchema = (translate: (key: string) => string) =>
  z.object({
    email: z.string().email({ message: translate('invalidEmail') }),
    password: z.string().min(1, { message: translate('requiredField') })
  });

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegister: () => void;
};

const LoginModal = ({ isOpen, onClose, onOpenRegister }: LoginModalProps) => {
  const { translate } = useLanguage();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loginSchema = createLoginSchema(translate);
  type LoginFormValues = z.infer<typeof loginSchema>;

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      const success = await login(values.email, values.password);

      if (success) {
        toast.success(translate('loginSuccess'));
        onClose();
      } else {
        toast.error(translate('loginError'));
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(translate('loginError'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterClick = () => {
    onClose();
    onOpenRegister();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-market-blue">
            {translate('login')}
          </DialogTitle>
          <DialogDescription className="text-center text-market-blue/80">
            {translate('loginDescription')}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                        type={showPassword ? 'text' : 'password'}
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
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
                className="w-full bg-market-blue hover:bg-market-blue/80 text-white"
                disabled={isLoading}
              >
                {isLoading ? translate('loggingIn') : translate('login')}
              </Button>
            </DialogFooter>
          </form>
        </Form>

        <div className="mt-4 text-center text-sm text-market-blue/80">
          {translate('dontHaveAccount')}{' '}
          <button
            onClick={handleRegisterClick}
            className="text-market-lightBlue hover:underline font-medium"
            disabled={isLoading}
          >
            {translate('register')}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;