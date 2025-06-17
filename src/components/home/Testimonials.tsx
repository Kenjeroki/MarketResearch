import React from "react";

const testimonials = [
  {
    name: "Ірина Коваль",
    role: "Маркетолог",
    quote:
      "Ця платформа дала мені глибоке розуміння ринку. Звіти інформативні та зручні."
  },
  {
    name: "Олег Сидоренко",
    role: "Аналітик",
    quote:
      "Дані завжди актуальні. Дуже подобається візуалізація у вигляді графіків."
  },
  {
    name: "Марина Чорна",
    role: "Підприємець",
    quote:
      "Заощадила купу часу завдяки зручному пошуку та готовим дослідженням."
  }
];

const Testimonials = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-market-blue mb-8 text-center">
          Відгуки користувачів
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition duration-300"
            >
              <p className="text-gray-700 italic mb-4">“{item.quote}”</p>
              <h3 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500">{item.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
