import React from "react";
import { Lightbulb, BarChart3, ThumbsUp } from "lucide-react";

const features = [
  {
    icon: <Lightbulb className="h-8 w-8 text-market-blue" />,
    title: "Інноваційна аналітика",
    description: "Миттєвий доступ до трендів і глибокої аналітики ринку."
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-market-blue" />,
    title: "Детальні звіти",
    description: "Кожне дослідження включає графіки, діаграми та аналітичні висновки."
  },
  {
    icon: <ThumbsUp className="h-8 w-8 text-market-blue" />,
    title: "Перевірені джерела",
    description: "Вся інформація базується на надійних даних і джерелах."
  }
];

const FeatureHighlights = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-market-blue mb-8 text-center">
          Переваги використання платформи
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
