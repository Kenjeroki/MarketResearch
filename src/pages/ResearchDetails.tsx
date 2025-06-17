import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Share2, Star, Download, Pencil, Trash } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, BarChart as ReBarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import jsPDF from "jspdf";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from 'sonner';
import { authFetch } from '@/utils/authFetch';


interface ChartData {
  name: string;
  value: number;
}

interface ChartItem {
  type: "pie" | "bar";
  title: string;
  data: ChartData[];
}

interface Research {
  _id: string;
  title: string;
  category: string;
  region: string;
  date: string;
  description: string;
  image: string;
  createdBy: string;
  charts?: ChartItem[];
}

interface Comment {
  _id: string;
  text: string;
  date: string;
  user: {
    _id: string;
    name: string;
  };
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#845EC2", "#D65DB1"];

const ChartRenderer = ({
  charts,
}: {
  charts?: ChartItem[] | { pie?: ChartData[]; bar?: ChartData[] };
}) => {
  if (!charts) return null;

  let arr: ChartItem[] = [];
  if (Array.isArray(charts)) {
    arr = charts;
  } else {
    if (charts.pie?.length) {
      arr.push({ type: "pie", title: "Графік pie", data: charts.pie });
    }
    if (charts.bar?.length) {
      arr.push({ type: "bar", title: "Графік bar", data: charts.bar });
    }
  }

  if (arr.length === 0) return null;

  return (
    <div className="space-y-8 mt-8">
      {arr.map((chart, idx) => (
        <div key={idx} className="w-full bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">{chart.title}</h2>
          <ResponsiveContainer width="100%" height={300}>
            {chart.type === "pie" ? (
              <PieChart>
                <Pie
                  data={chart.data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {chart.data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            ) : (
              <ReBarChart data={chart.data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </ReBarChart>
            )}
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
};

const ResearchDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [research, setResearch] = useState<Research | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { favorites, addFavorite, removeFavorite, isAuthenticated, user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    const fetchResearch = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3000/research/${id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setResearch(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchResearch();
    const fetchComments = async () => {
      try {
        const res = await fetch(`http://localhost:3000/comments/${id}`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
        }
      } catch (e) {
        console.error('fetch comments error', e);
      }
    };
    fetchComments();
  }, [id]);

  const isFavorite = id ? favorites.includes(id) : false;

  const handleDownload = () => {
  if (!research) return;
  const doc = new jsPDF();

  doc.addFont("/fonts/Roboto-Regular.ttf", "Roboto", "normal");
  doc.setFont("Roboto");

  doc.setFontSize(22);
  doc.text(research.title, 10, 20);

  doc.setFontSize(12);
  doc.text(`Категорія: ${research.category}`, 10, 40);
  doc.text(`Регіон: ${research.region}`, 10, 50);
  doc.text(`Дата: ${research.date}`, 10, 60);

  doc.line(10, 70, 200, 70);

  doc.setFontSize(18);
  doc.setFont("Roboto");
  doc.text("Огляд", 10, 80);

  doc.setFontSize(12);
  doc.setFont("Roboto", "normal");
  const descriptionLines = doc.splitTextToSize(research.description, 180);
  doc.text(descriptionLines, 10, 90);

  if (research.charts?.length) {
    let posY = 100 + descriptionLines.length * 6 + 10;

    research.charts.forEach((chart) => {
      if (posY > 260) {
        doc.addPage();
        posY = 20;
      }

      doc.setFontSize(18);
      doc.setFont("Roboto");
      doc.text(`Діаграма: ${chart.title}`, 10, posY);
      posY += 10;

      doc.setFontSize(12);
      doc.setFont("Roboto", "normal");
      chart.data.forEach((item) => {
        if (posY > 280) {
          doc.addPage();
          posY = 20;
        }
        doc.text(`- ${item.name}: ${item.value}`, 15, posY);
        posY += 7;
      });

      posY += 10;
    });
  }

  doc.save(`${research.title}.pdf`);
};

  const submitComment = async () => {
    if (!commentText.trim() || !id || !user) return;
    try {
      const res = await authFetch(`http://localhost:3000/comments/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: commentText })
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Коментар додано');
        setComments(prev => [{ ...data, user: { _id: user.id, name: user.name } }, ...prev]);
        setCommentText('');
      } else {
        toast.error('Не вдалося зберегти коментар');
      }
    } catch (e) {
      console.error('add comment error', e);
      toast.error('Не вдалося зберегти коментар');
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const res = await authFetch(`http://localhost:3000/comments/${commentId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setComments(prev => prev.filter(c => c._id !== commentId));
      }
    } catch (e) {
      console.error('delete comment error', e);
    }
  };

  const startEditComment = (comment: Comment) => {
    setEditingId(comment._id);
    setEditingText(comment.text);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  const saveComment = async () => {
    if (!editingId) return;
    try {
      const res = await authFetch(`http://localhost:3000/comments/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: editingText })
      });
      if (res.ok) {
        setComments(prev => prev.map(c => c._id === editingId ? { ...c, text: editingText } : c));
        cancelEdit();
      } else {
        toast.error('Не вдалося оновити коментар');
      }
    } catch (e) {
      console.error('update comment error', e);
      toast.error('Не вдалося оновити коментар');
    }
  };

  const handleDeleteResearch = async () => {
    if (!id) return;
    if (!window.confirm('Видалити дослідження?')) return;
    try {
      const res = await authFetch(`http://localhost:3000/research/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        toast.success('Дослідження видалено');
        navigate('/research');
      } else {
        const data = await res.json();
        toast.error(data.error || 'Не вдалося видалити дослідження');
      }
    } catch (e) {
      console.error('delete research error', e);
      toast.error('Не вдалося видалити дослідження');
    }
  };


  if (loading) return <Loader />;
  if (error || !research) return <NotFound />;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 mt-20">
        <div className="mb-6">
          <Link to="/research">
            <Button variant="ghost" className="flex items-center text-market-blue hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" /> Назад до досліджень
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-market-blue mb-4">
          {research.title}
        </h1>
        <div className="flex flex-wrap gap-3 mb-4">
          <Badge text={research.category} color="blue" />
          <Badge text={research.region} color="gray" />
          <Badge text={research.date} color="purple" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <img src={research.image} alt={research.title} className="w-full h-auto object-cover mb-8 rounded" />
            <h2 className="text-xl font-semibold mb-4">Огляд</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">{research.description}</p>
            {Array.isArray(research.charts) && research.charts.length > 0 && (
              <ChartRenderer charts={research.charts} />
            )}
          </div>

          <div className="lg:col-span-1 flex flex-col space-y-3 mt-[-90px]">
            <CustomButton icon={<Share2 />} text="Поділитися" />
            {isAuthenticated && (
              <CustomButton
                icon={<Star />}
                text={isFavorite ? "Видалити з обраного" : "Додати в обране"}
                onClick={() =>
                  isFavorite ? removeFavorite(id!) : addFavorite(id!)
                }
                isFavorite={isFavorite}
              />
            )}
            {(user?.role === 'admin' || user?.id === research.createdBy) && (
              <>
                <Link to={`/research/${id}/edit`}>
                  <CustomButton icon={<Pencil />} text="Редагувати" />
                </Link>
                <CustomButton icon={<Trash />} text="Видалити" onClick={handleDeleteResearch} />
              </>
            )}
            <CustomButton
              icon={<Download />}
              text="Завантажити звіт (PDF)"
              onClick={handleDownload}
            />
          </div>
        </div>

          <section className="max-w-2xl mx-auto w-full space-y-6">
          <h2 className="text-xl font-semibold">Коментарі</h2>
          {isAuthenticated ? (
            <div className="flex flex-col gap-3">
              <Textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Ваш коментар"
              />
              <Button onClick={submitComment}>Залишити коментар</Button>
            </div>
          ) : (
            <p className="text-gray-500">Увійдіть, щоб залишити коментар.</p>
          )}
          <div className="space-y-4">
            {comments.map((c) => (
              <div key={c._id} className="border rounded p-3 bg-white text-left">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold">{c.user.name}</span>
                  {(user?.id === c.user._id || user?.id === research.createdBy || user?.role === 'admin') && (
                    editingId === c._id ? (
                      <div className="space-x-2">
                        <button className="text-sm text-blue-500" onClick={saveComment}>Зберегти</button>
                        <button className="text-sm" onClick={cancelEdit}>Скасувати</button>
                      </div>
                    ) : (
                      <div className="space-x-2">
                        <button className="text-sm text-blue-500" onClick={() => startEditComment(c)}>Редагувати</button>
                        <button className="text-sm text-red-500" onClick={() => handleDeleteComment(c._id)}>Видалити</button>
                      </div>
                    )
                  )}
                </div>
                {editingId === c._id ? (
                  <Textarea value={editingText} onChange={(e) => setEditingText(e.target.value)} />
                ) : (
                  <p className="text-gray-700 whitespace-pre-wrap">{c.text}</p>
                )}
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(c.date).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const Loader = () => (
  <div className="min-h-screen flex flex-col bg-gray-50">
    <Header />
    <main className="flex-grow container mx-auto px-4 py-8 mt-20">
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

const NotFound = () => (
  <div className="min-h-screen flex flex-col bg-gray-50">
    <Header />
    <main className="flex-grow container mx-auto px-4 py-8 mt-20 text-center">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Дослідження не знайдено</h1>
      <Link to="/research">
        <Button className="hover:text-white">Назад до досліджень</Button>
      </Link>
    </main>
    <Footer />
  </div>
);

const CustomButton = ({ icon, text, onClick, isFavorite = false }: { icon: React.ReactNode; text: string; onClick?: () => void; isFavorite?: boolean; }) => (
  <Button 
    variant={isFavorite ? "default" : "outline"} 
    onClick={onClick} 
    className={`w-full justify-start hover:text-white ${isFavorite ? "bg-yellow-500 hover:bg-yellow-600 text-white" : ""}`}
  >
    {icon} <span className="ml-2">{text}</span>
  </Button>
);

const Badge = ({ text, color }: { text: string; color: string }) => (
  <span className={`text-sm font-semibold inline-block px-2 py-1 rounded bg-${color}-100 text-${color}-800`}>
    {text}
  </span>
);

export default ResearchDetails;
