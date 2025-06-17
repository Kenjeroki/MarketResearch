import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { authFetch } from '@/utils/authFetch';

const formSchema = z.object({
  title: z.string().min(1, { message: 'Required' }),
  category: z.string().min(1, { message: 'Required' }),
  region: z.string().min(1, { message: 'Required' }),
  date: z.string().min(1, { message: 'Required' }),
  description: z.string().min(1, { message: 'Required' }),
  image: z.string().min(1, { message: 'Required' }),
});

type FormValues = z.infer<typeof formSchema>;

type ChartPoint = { name: string; value: string };

const AddResearch = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [categories, setCategories] = useState<string[]>([]);
  const regions = ['Світ', 'Україна', 'Європа', 'Північна Америка'];
  const [pieData, setPieData] = useState<ChartPoint[]>([{ name: '', value: '' }]);
  const [barData, setBarData] = useState<ChartPoint[]>([{ name: '', value: '' }]);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      category: '',
      region: '',
      date: '',
      description: '',
      image: '',
    },
  });

  useEffect(() => {
    fetch('http://localhost:3000/categories')
      .then(res => res.json())
      .then(data => setCategories(data.categories?.map((c: { name: string }) => c.name) || []))
      .catch(err => console.error('fetch categories error', err));
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  const handleAddPie = () => setPieData([...pieData, { name: '', value: '' }]);
  const handleAddBar = () => setBarData([...barData, { name: '', value: '' }]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        form.setValue('image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values: FormValues) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast({ title: 'Недійсний токен', variant: 'destructive' });
      return;
    }

    const pieValid = pieData.every(p => !p.value || !isNaN(Number(p.value)));
    const barValid = barData.every(b => !b.value || !isNaN(Number(b.value)));
    if (!pieValid || !barValid) {
      toast({ title: 'Тільки числа', variant: 'destructive' });
      return;
    }

    const body = {
      ...values,
      charts: {
        pie: pieData
          .filter(p => p.name && p.value)
          .map(p => ({ name: p.name, value: Number(p.value) })),
        bar: barData
          .filter(b => b.name && b.value)
          .map(b => ({ name: b.name, value: Number(b.value) })),
      },
    };

    try {
      const res = await authFetch('http://localhost:3000/research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (res.ok) {
        toast({ title: '✅ Дослідження створено' });
        navigate('/research');
      } else {
        toast({ title: data.error || 'Помилка', variant: 'destructive' });
      }
    } catch (err) {
      console.error('create research error', err);
      toast({ title: 'Помилка', variant: 'destructive' });
    }
  };

  const handleChange = (
    setter: React.Dispatch<React.SetStateAction<ChartPoint[]>>,
    index: number,
    key: keyof ChartPoint,
    value: string
  ) => {
    setter(arr => arr.map((item, i) => (i === index ? { ...item, [key]: value } : item)));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container-custom py-8 mt-20">
        <h1 className="text-2xl font-bold mb-6 text-market-blue">Додати дослідження</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Назва</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Категорія</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="bg-white border rounded px-3 py-2 w-full"
                    >
                      <option value="">Оберіть категорію</option>
                      {categories.map(c => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Регіон</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="bg-white border rounded px-3 py-2 w-full"
                    >
                      <option value="">Оберіть регіон</option>
                      {regions.map(r => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Дата</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} className="bg-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Зображення (URL)</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white mb-2" />
                  </FormControl>
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    className="block w-full"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Опис</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="bg-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <h2 className="font-semibold mb-2">Дані pie</h2>
              {pieData.map((p, i) => (
                <div key={i} className="grid grid-cols-2 gap-2 mb-2">
                  <Input
                    placeholder="Назва"
                    value={p.name}
                    onChange={e => handleChange(setPieData, i, 'name', e.target.value)}
                    className="bg-white"
                  />
                  <Input
                    placeholder="Значення"
                    value={p.value}
                    onChange={e => handleChange(setPieData, i, 'value', e.target.value)}
                    className="bg-white"
                  />
                </div>
              ))}
              <Button type="button" onClick={handleAddPie} size="sm">
                Додати рядок
              </Button>
            </div>
            <div>
              <h2 className="font-semibold mb-2">Дані bar</h2>
              {barData.map((b, i) => (
                <div key={i} className="grid grid-cols-2 gap-2 mb-2">
                  <Input
                    placeholder="Назва"
                    value={b.name}
                    onChange={e => handleChange(setBarData, i, 'name', e.target.value)}
                    className="bg-white"
                  />
                  <Input
                    placeholder="Значення"
                    value={b.value}
                    onChange={e => handleChange(setBarData, i, 'value', e.target.value)}
                    className="bg-white"
                  />
                </div>
              ))}
              <Button type="button" onClick={handleAddBar} size="sm">
                Додати рядок
              </Button>
            </div>
            <Button type="submit">Створити дослідження</Button>
          </form>
        </Form>
      </main>
      <Footer />
    </div>
  );
};

export default AddResearch;
