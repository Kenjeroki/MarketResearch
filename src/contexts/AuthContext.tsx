
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { authFetch } from '@/utils/authFetch';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  profilePicture?: string;
  memberSince: Date;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  favorites: string[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  addFavorite: (id: string) => Promise<void>;
  removeFavorite: (id: string) => Promise<void>;
  fetchFavorites: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { translate } = useLanguage();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        parsedUser.memberSince = new Date(parsedUser.memberSince);
        setUser(parsedUser);
        setIsAuthenticated(true);
        fetchFavorites();
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    console.log("LOGIN RESPONSE:", response.status, data);

    if (response.status !== 200) {
      toast.error(data.error || translate("loginError"));
      return false;
    }

    localStorage.setItem("token", data.token);

    const profileRes = await fetch("http://localhost:3000/profile", {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    });

    const profile = await profileRes.json();

    if (profileRes.status !== 200) {
      toast.error(profile.error || translate("loginError"));
      return false;
    }

    const loggedUser: User = {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      role: profile.role,
      profilePicture: profile.profilePicture || "",
      memberSince: new Date(profile.memberSince),
    };

    localStorage.setItem("user", JSON.stringify(loggedUser));
    setUser(loggedUser);
    setIsAuthenticated(true);
    fetchFavorites();

    toast.success(translate("loginSuccess"));
    return true;
  } catch (error) {
    console.error("Login error:", error);
    toast.error(translate("loginError"));
    return false;
  }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
  try {
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Registration failed');
    }

    const newUser: User = {
      id: data.id,
      name,
      email,
      role: 'user',
      memberSince: new Date(),
    };

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(newUser));

    setUser(newUser);
    setIsAuthenticated(true);
    fetchFavorites();

    toast.success(translate('registrationSuccess'));
    return true;
  } catch (error) {
    console.error('Registration error:', error);
    toast.error(translate('registrationError'));
    return false;
  }
  };

  const fetchFavorites = async (): Promise<void> => {
    try {
      const res = await authFetch('http://localhost:3000/favorites');
      const data = await res.json();
      if (res.ok) {
        const ids = (data.favorites || []).map((item: any) => item._id.toString());
        setFavorites(ids);
      }
    } catch (e) {
      console.error('fetchFavorites error', e);
    }
  };

  const addFavorite = async (id: string): Promise<void> => {
    try {
      await authFetch(`http://localhost:3000/favorites/${id}`, {
        method: 'POST'
      });
      setFavorites(prev => (prev.includes(id) ? prev : [...prev, id]));
    } catch (e) {
      console.error('addFavorite error', e);
    }
  };

  const removeFavorite = async (id: string): Promise<void> => {
    try {
      await authFetch(`http://localhost:3000/favorites/${id}`, {
        method: 'DELETE'
      });
    } finally {
      setFavorites(prev => prev.filter(f => f !== id));
    }
  };

  const updateUser = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem('user', JSON.stringify(updated));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setFavorites([]);
    localStorage.removeItem('user');
    toast.success(translate('logoutSuccess'));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        favorites,
        login,
        register,
        updateUser,
        logout,
        addFavorite,
        removeFavorite,
        fetchFavorites
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
