import React, { useEffect, useState } from 'react';

type ResearchItem = {
  _id: string;
  title: string;
  summary: string;
  source: string;
  date: string;
};

const ResearchList: React.FC = () => {
  const [data, setData] = useState<ResearchItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/research')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Research Articles</h1>
      {data.map((item) => (
        <div key={item._id} className="border p-3 rounded shadow">
          <h2 className="text-xl font-semibold">{item.title}</h2>
          <p className="text-sm text-gray-600">{item.date} | {item.source}</p>
          <p className="mt-2">{item.summary}</p>
        </div>
      ))}
    </div>
  );
};

export default ResearchList;
