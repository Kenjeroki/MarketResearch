import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ResearchCard from '@/components/research/ResearchCard';
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { authFetch } from '@/utils/authFetch';
import { User, Settings, Star, LogOut, Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';

type Research = {
  _id: string;
  title: string;
  category: string;
  region: string;
  date: string;
  image: string;
  description?: string;
  createdBy?: string;
};

const Profile = () => {
  const { toast } = useToast();
  const {
    user,
    logout,
    updateUser,
    favorites,
    addFavorite,
    removeFavorite,
    fetchFavorites
  } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [favoriteResearch, setFavoriteResearch] = useState<Research[]>([]);
  const [myResearches, setMyResearches] = useState<Research[]>([]);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    role: user?.role || 'user'
  });

  useEffect(() => {
    if (activeTab === 'favorites') {
      authFetch('http://localhost:3000/favorites')
        .then(res => res.json())
        .then(data => setFavoriteResearch(data.favorites || []))
        .catch(err => console.error('fetch favorites error', err));
    } else if (activeTab === 'my') {
      authFetch('http://localhost:3000/my-researches')
        .then(res => res.json())
        .then(data => setMyResearches(data.researches || []))
        .catch(err => console.error('fetch my researches error', err));
    }
  }, [activeTab, favorites]);

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center text-center px-4">
          <div className="max-w-md">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Ви не увійшли в акаунт
            </h2>
            <p className="text-gray-500 mb-6">
              Будь ласка, увійдіть, щоб переглянути сторінку профілю.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      toast({
        title: 'Помилка',
        description: 'Ви не авторизовані',
        variant: 'destructive'
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/profile/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password || undefined,
          role: formData.role
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Не вдалося оновити профіль');
      }

      toast({
        title: 'Профіль оновлено',
        description: 'Інформацію вашого профілю успішно оновлено'
      });
      updateUser({
        name: data.name,
        email: data.email,
        role: data.role
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Помилка при оновленні профілю:', error);
      toast({
        title: 'Помилка',
        description: 'Не вдалося оновити профіль',
        variant: 'destructive'
      });
    }
  };


  const handleLogout = () => {
    logout();
    toast({
      title: 'Вихід здійснено',
      description: 'Ви успішно вийшли з системи.'
    });
  };

  const handleDeleteResearch = async (researchId: string) => {
    if (!window.confirm('Видалити дослідження?')) return;
    try {
      const res = await authFetch(`http://localhost:3000/research/${researchId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        toast({ title: 'Дослідження видалено' });
        setMyResearches(prev => prev.filter(r => r._id !== researchId));
      } else {
        const data = await res.json();
        toast({ title: data.error || 'Не вдалося видалити дослідження', variant: 'destructive' });
      }
    } catch (e) {
      console.error('delete research error', e);
      toast({ title: 'Не вдалося видалити дослідження', variant: 'destructive' });
    }
  };

  const handleRemoveFavorite = async (id: string) => {
    await removeFavorite(id);
    setFavoriteResearch(prev => prev.filter(r => r._id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={user.profilePicture || ''} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-center text-gray-500">
                  Учасник з: {new Date(user.memberSince).toLocaleDateString('uk-UA', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => setActiveTab('profile')}>
                  <User className="mr-2 h-4 w-4" />Профіль
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setActiveTab('favorites')}>
                  <Star className="mr-2 h-4 w-4" />Обрані
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setActiveTab('my')}>
                  <Pencil className="mr-2 h-4 w-4" />Мої дослідження
                </Button>
                <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />Вийти
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div className="md:col-span-3">
            {activeTab === 'profile' && (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Інформація профілю</CardTitle>
                      <CardDescription>Оновіть свою особисту інформацію</CardDescription>
                    </div>
                    <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                      <Settings className="mr-2 h-4 w-4" />
                      {isEditing ? 'Скасувати' : 'Редагувати'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Ім'я</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleInputChange} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Електронна пошта</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="password">Новий пароль</Label>
                        <Input id="password" name="password" type="password" value={formData.password} onChange={handleInputChange} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="role">Роль</Label>
                        <select
                          id="role"
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          disabled={user.role === 'admin'}
                          className="border rounded px-3 py-2"
                        >
                          <option value="user">Простий користувач</option>
                          <option value="student">Студент</option>
                          <option value="analyst">Аналітик</option>
                          <option value="entrepreneur">Підприємець</option>
                        </select>
                        {user.role === 'admin' && (
                          <p className="text-sm text-gray-500">роль змінити не можна</p>
                        )}
                      </div>
                      <Button type="submit">Зберегти зміни</Button>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 py-2">
                        <div className="font-medium text-gray-500">Ім'я</div>
                        <div className="col-span-2">{user.name}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 py-2">
                        <div className="font-medium text-gray-500">Електронна пошта</div>
                        <div className="col-span-2">{user.email}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 py-2">
                        <div className="font-medium text-gray-500">Роль</div>
                        <div className="col-span-2">{user.role}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 py-2">
                        <div className="font-medium text-gray-500">Учасник з</div>
                        <div className="col-span-2">
                          {new Date(user.memberSince).toLocaleDateString('uk-UA', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}


            {activeTab === 'favorites' && (
              <Card>
                <CardHeader>
                  <CardTitle>Обрані дослідження</CardTitle>
                  <CardDescription>Список досліджень, які ви додали в обране</CardDescription>
                </CardHeader>
                <CardContent>
                  {favoriteResearch.length === 0 ? (
                    <p className="text-sm text-gray-600">У вас поки немає обраних досліджень.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {favoriteResearch.map(item => (
                        <ResearchCard
                          key={item._id}
                          research={item}
                          isAuthenticated
                          isFavorite
                          onToggleFavorite={() => handleRemoveFavorite(item._id)}
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {activeTab === 'my' && (
              <Card>
                <CardHeader>
                  <CardTitle>Власні дослідження</CardTitle>
                  <CardDescription>Список досліджень, створених вами</CardDescription>
                </CardHeader>
                <CardContent>
                  {myResearches.length === 0 ? (
                    <p className="text-sm text-gray-600">У вас поки немає створених досліджень.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {myResearches.map(item => (
                        <div key={item._id} className="space-y-2">
                          <ResearchCard
                            research={item}
                            isAuthenticated
                            isFavorite={favorites.includes(item._id)}
                            onToggleFavorite={() =>
                              favorites.includes(item._id)
                                ? removeFavorite(item._id)
                                : addFavorite(item._id)
                            }
                          />
                          <Link to={`/research/${item._id}/edit`} className="block">
                            <Button variant="outline" className="w-full">Редагувати</Button>
                          </Link>
                          {(user.id === item.createdBy || user.role === 'admin') && (
                            <Button
                              variant="destructive"
                              className="w-full"
                              onClick={() => handleDeleteResearch(item._id)}
                            >
                              Видалити дослідження
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
