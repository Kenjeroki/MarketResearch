import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
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

const EditResearch = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [pieData, setPieData] = useState<ChartPoint[]>([{ name: '', value: '' }]);
  const [barData, setBarData] = useState<ChartPoint[]>([{ name: '', value: '' }]);

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
    const fetchData = async () => {
      if (!id) return;
      try {
        const res = await fetch(`http://localhost:3000/research/${id}`);
        const data = await res.json();
        if (res.ok) {
          form.reset({
            title: data.title,
            category: data.category,
            region: data.region,
            date: data.date,
            description: data.description,
            image: data.image,
          });

          const pie = Array.isArray(data.charts)
            ? data.charts.find((c: any) => c.type === 'pie')?.data
            : data.charts?.pie;
          const bar = Array.isArray(data.charts)
            ? data.charts.find((c: any) => c.type === 'bar')?.data
            : data.charts?.bar;
          setPieData(pie || []);
          setBarData(bar || []);
        }
      } catch (e) {
        console.error('fetch research error', e);
      }
    };
    fetchData();
  }, [id]);

  if (!isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  const handleAddPie = () => setPieData([...pieData, { name: '', value: '' }]);
  const handleAddBar = () => setBarData([...barData, { name: '', value: '' }]);

  const handleSubmit = async (values: FormValues) => {
    if (!id) return;
    const body = {
      ...values,
      charts: {
        pie: pieData.filter(p => p.name && p.value),
        bar: barData.filter(b => b.name && b.value),
      },
    };

    try {
      const res = await authFetch(`http://localhost:3000/research/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (res.ok) {
        toast({ title: '✅ Дослідження оновлено' });
        navigate(`/research/${id}`);
      } else {
        toast({ title: data.error || 'Помилка', variant: 'destructive' });
      }
    } catch (err) {
      console.error('update research error', err);
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
      <main className="flex-grow container mx-auto px-4 py-8 mt-20">
        <h1 className="text-2xl font-bold mb-6 text-market-blue">Редагувати дослідження</h1>
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
                    <Input {...field} className="bg-white" />
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
                    <Input {...field} className="bg-white" />
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
                    <Input {...field} className="bg-white" />
                  </FormControl>
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
            <Button type="submit">Зберегти зміни</Button>
          </form>
        </Form>
      </main>
      <Footer />
    </div>
  );
};

export default EditResearch;
