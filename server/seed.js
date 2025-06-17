
import { MongoClient } from 'mongodb';

const seedData = [
  {
    "title": "Глобальний розвиток E-commerce до 2025 року",
    "summary": "Огляд ключових трендів глобального ринку електронної комерції.",
    "source": "Statista, McKinsey Global Institute",
    "category": "E-commerce",
    "region": "Світ",
    "date": "2025-04-15",
    "description": "Очікується, що глобальний ринок e-commerce досягне $7 трлн у 2025 році. M-commerce домінуватиме з часткою понад 65%, а штучний інтелект трансформує персоналізацію. Ринок Азії, зокрема Китай, зберігає лідерство з понад 50% від глобальних продажів.",
    "image": "https://via.placeholder.com/400x200.png?text=E-commerce",
    "views": 5800,
    "charts": [
      {
        "type": "pie",
        "title": "Розподіл ринку E-commerce за регіонами (2025, %)",
        "data": [
          {"name": "Китай", "value": 52},
          {"name": "США", "value": 19},
          {"name": "Європа", "value": 17},
          {"name": "Інші", "value": 12}
        ]
      },
      {
        "type": "bar",
        "title": "Зростання світового ринку E-commerce (трлн $)",
        "data": [
          {"name": "2020", "value": 4.2},
          {"name": "2021", "value": 4.9},
          {"name": "2022", "value": 5.5},
          {"name": "2023", "value": 6.1},
          {"name": "2024", "value": 6.6},
          {"name": "2025", "value": 7.0}
        ]
      }
    ]
  },
  {
    "title": "Інновації в охороні здоров’я: телемедицина та AI",
    "summary": "Огляд впливу технологій на глобальну медичну систему.",
    "source": "WHO, Deloitte Insights",
    "category": "Healthcare",
    "region": "Світ",
    "date": "2025-03-12",
    "description": "Телемедицина та штучний інтелект трансформують медицину. У 2025 році очікується, що понад 70% лікарень впровадять AI-рішення. Основні переваги — автоматизація діагностики, дистанційний моніторинг та зниження вартості послуг.",
    "image": "https://via.placeholder.com/400x200.png?text=Healthcare",
    "views": 4700,
    "charts": [
      {
        "type": "pie",
        "title": "Популярність технологій у лікарнях світу (2025)",
        "data": [
          {"name": "Штучний інтелект", "value": 40},
          {"name": "Телемедицина", "value": 35},
          {"name": "Інші", "value": 25}
        ]
      },
      {
        "type": "bar",
        "title": "Інвестиції у медичні технології (млрд $)",
        "data": [
          {"name": "2021", "value": 60},
          {"name": "2022", "value": 75},
          {"name": "2023", "value": 90},
          {"name": "2024", "value": 105},
          {"name": "2025", "value": 120}
        ]
      }
    ]
  },
  {
    "title": "EdTech революція: дистанційна освіта у 2025 році",
    "summary": "Роль технологій в освіті та зростання ринку EdTech.",
    "source": "HolonIQ, EdTech Digest",
    "category": "Education",
    "region": "Світ",
    "date": "2025-02-18",
    "description": "Світовий ринок EdTech оцінюється у $404 млрд до 2025 року. Понад 50% шкіл та ВНЗ використовують онлайн-платформи. ШІ, гейміфікація та адаптивне навчання домінують серед технологій, що змінюють освітній процес.",
    "image": "https://via.placeholder.com/400x200.png?text=Education",
    "views": 3900,
    "charts": [
      {
        "type": "pie",
        "title": "Використання EdTech-рішень у закладах освіти",
        "data": [
          {"name": "Онлайн-курси", "value": 40},
          {"name": "Гейміфікація", "value": 30},
          {"name": "AI-навігація", "value": 30}
        ]
      },
      {
        "type": "bar",
        "title": "Глобальний ринок EdTech (млрд $)",
        "data": [
          {"name": "2021", "value": 227},
          {"name": "2022", "value": 285},
          {"name": "2023", "value": 335},
          {"name": "2024", "value": 376},
          {"name": "2025", "value": 404}
        ]
      }
    ]
  },
  {
    "title": "Розвиток FinTech: майбутнє фінансових послуг",
    "summary": "Аналітика глобального ринку фінансових технологій.",
    "source": "Finextra, Statista",
    "category": "Finance",
    "region": "США",
    "date": "2025-03-28",
    "description": "Світовий ринок FinTech перевищив $550 млрд у 2025 році. Основні напрямки — мобільні гаманці, блокчейн, децентралізовані фінанси (DeFi) та вбудовані фінансові сервіси. Банки втрачають монополію через технологічні стартапи з високою швидкістю впровадження інновацій.",
    "image": "https://via.placeholder.com/400x200.png?text=Finance",
    "views": 5100,
    "charts": [
      {
        "type": "pie",
        "title": "Сегменти FinTech у 2025 (% ринку)",
        "data": [
          {"name": "Мобільні платежі", "value": 45},
          {"name": "DeFi", "value": 30},
          {"name": "Інше", "value": 25}
        ]
      },
      {
        "type": "bar",
        "title": "Інвестиції у FinTech (млрд $)",
        "data": [
          {"name": "2021", "value": 200},
          {"name": "2022", "value": 260},
          {"name": "2023", "value": 310},
          {"name": "2024", "value": 420},
          {"name": "2025", "value": 550}
        ]
      }
    ]
  },
  {
    "title": "Технологічні гіганти та ринок AI",
    "summary": "Вплив корпорацій на розвиток штучного інтелекту.",
    "source": "MIT Technology Review",
    "category": "Technology",
    "region": "Північна Америка",
    "date": "2025-03-08",
    "description": "ШІ став ключовою технологією в продуктах Google, Microsoft і Amazon. До 2025 року очікується, що AI-інтегровані рішення будуть застосовані в 80% компаній зі списку Fortune 500. Найбільше інвестують у машинне навчання, обробку природної мови та генеративні моделі.",
    "image": "https://via.placeholder.com/400x200.png?text=Technology",
    "views": 6200,
    "charts": [
      {
        "type": "pie",
        "title": "Використання AI у бізнес-практиках",
        "data": [
          {"name": "Аналіз даних", "value": 40},
          {"name": "Обслуговування клієнтів", "value": 35},
          {"name": "Інше", "value": 25}
        ]
      },
      {
        "type": "bar",
        "title": "Інвестиції в AI (млрд $)",
        "data": [
          {"name": "2021", "value": 150},
          {"name": "2022", "value": 220},
          {"name": "2023", "value": 300},
          {"name": "2024", "value": 380},
          {"name": "2025", "value": 470}
        ]
      }
    ]
  },
  {
    "title": "FoodTech: революція у харчовій промисловості",
    "summary": "Аналіз технологій у виробництві продуктів харчування.",
    "source": "Global Food Innovation Index",
    "category": "Food",
    "region": "Європа",
    "date": "2025-04-02",
    "description": "Зростає попит на рослинне м’ясо, автоматизоване фермерство та харчові стартапи. До 2025 року FoodTech оцінюється у $300 млрд. Інвестиції в альтернативне білкове виробництво (Beyond Meat, Impossible Foods) зросли втричі за останні 4 роки.",
    "image": "https://via.placeholder.com/400x200.png?text=Food",
    "views": 3500,
    "charts": [
      {
        "type": "pie",
        "title": "Технології у харчовому секторі",
        "data": [
          {"name": "Рослинне м’ясо", "value": 50},
          {"name": "Автоматизація", "value": 30},
          {"name": "Інше", "value": 20}
        ]
      },
      {
        "type": "bar",
        "title": "Інвестиції у FoodTech (млрд $)",
        "data": [
          {"name": "2021", "value": 90},
          {"name": "2022", "value": 140},
          {"name": "2023", "value": 200},
          {"name": "2024", "value": 250},
          {"name": "2025", "value": 300}
        ]
      }
    ]
  },
  {
    "title": "Цифрова мода: новий тренд у Fashion",
    "summary": "Віртуальний одяг і мода в метавсесвітах.",
    "source": "Vogue Business, DRESSX",
    "category": "Fashion",
    "region": "Світ",
    "date": "2025-04-20",
    "description": "Цифровий одяг набирає популярності серед Gen Z. До 2025 року ринок цифрової моди оцінюється у $1.5 млрд. Бренди створюють 3D-колекції виключно для використання в соцмережах і метавсесвітах. Це дозволяє знизити екологічне навантаження.",
    "image": "https://via.placeholder.com/400x200.png?text=Fashion",
    "views": 4600,
    "charts": [
      {
        "type": "pie",
        "title": "Формати цифрової моди (2025)",
        "data": [
          {"name": "AR-приклади", "value": 45},
          {"name": "Метавсесвіт", "value": 35},
          {"name": "Інше", "value": 20}
        ]
      },
      {
        "type": "bar",
        "title": "Зростання ринку цифрової моди (млн $)",
        "data": [
          {"name": "2021", "value": 200},
          {"name": "2022", "value": 400},
          {"name": "2023", "value": 700},
          {"name": "2024", "value": 1100},
          {"name": "2025", "value": 1500}
        ]
      }
    ]
  },
  {
    "title": "Електромобілі: трансформація автомобільної індустрії",
    "summary": "Світові тренди у виробництві та використанні EV.",
    "source": "IEA, BloombergNEF",
    "category": "Automotive",
    "region": "Світ",
    "date": "2025-03-30",
    "description": "У 2025 році електромобілі становитимуть понад 25% світових продажів. Tesla, BYD та Volkswagen лідирують за кількістю проданих авто. Зростає попит на зарядні станції та акумулятори нового покоління.",
    "image": "https://via.placeholder.com/400x200.png?text=Automotive",
    "views": 5800,
    "charts": [
      {
        "type": "pie",
        "title": "Частка EV у продажах авто (%)",
        "data": [
          {"name": "Tesla", "value": 35},
          {"name": "BYD", "value": 25},
          {"name": "VW", "value": 20},
          {"name": "Інші", "value": 20}
        ]
      },
      {
        "type": "bar",
        "title": "Продажі EV по роках (млн авто)",
        "data": [
          {"name": "2021", "value": 6.5},
          {"name": "2022", "value": 9.0},
          {"name": "2023", "value": 11.2},
          {"name": "2024", "value": 13.7},
          {"name": "2025", "value": 16.4}
        ]
      }
    ]
  },
  {
    "title": "Автоматизація освіти: від LMS до AI-тренерів",
    "summary": "Огляд інновацій у навчальних технологіях.",
    "source": "HolonIQ, EdSurge",
    "category": "Education",
    "region": "Європа",
    "date": "2025-03-18",
    "description": "Більшість освітніх платформ переходять до автоматизованих форматів: адаптивне навчання, AI-помічники, інтерактивні тести в реальному часі. Це підвищує ефективність навчання та знижує навантаження на викладачів.",
    "image": "https://via.placeholder.com/400x200.png?text=Education",
    "views": 3400,
    "charts": [
      {
        "type": "pie",
        "title": "Типи інновацій в освіті",
        "data": [
          {"name": "AI-помічники", "value": 35},
          {"name": "Інтерактивні LMS", "value": 40},
          {"name": "Інше", "value": 25}
        ]
      },
      {
        "type": "bar",
        "title": "Впровадження EdTech-платформ (% шкіл)",
        "data": [
          {"name": "2021", "value": 28},
          {"name": "2022", "value": 40},
          {"name": "2023", "value": 52},
          {"name": "2024", "value": 63},
          {"name": "2025", "value": 72}
        ]
      }
    ]
  },
  {
    "title": "Мобільна комерція: лідер зростання в E-commerce",
    "summary": "Роль мобільних пристроїв у розвитку онлайн-продажів.",
    "source": "Insider Intelligence, Statista",
    "category": "E-commerce",
    "region": "Світ",
    "date": "2025-04-22",
    "description": "У 2025 році мобільні пристрої генеруватимуть понад 72% усіх покупок онлайн. M-commerce зростає через розвиток UX-дизайну, мобільних платіжних систем (Apple Pay, Google Pay) та індивідуалізованих мобільних додатків.",
    "image": "https://via.placeholder.com/400x200.png?text=M-commerce",
    "views": 5300,
    "charts": [
      {
        "type": "pie",
        "title": "Частка пристроїв у глобальному e-commerce (2025)",
        "data": [
          {"name": "Смартфони", "value": 72},
          {"name": "Десктопи", "value": 22},
          {"name": "Планшети", "value": 6}
        ]
      },
      {
        "type": "bar",
        "title": "M-commerce глобально (трлн $)",
        "data": [
          {"name": "2021", "value": 2.5},
          {"name": "2022", "value": 3.1},
          {"name": "2023", "value": 3.9},
          {"name": "2024", "value": 4.6},
          {"name": "2025", "value": 5.3}
        ]
      }
    ]
  },
  {
    "title": "Ринок кібербезпеки в FinTech",
    "summary": "Фінансові сервіси та захист користувацьких даних.",
    "source": "Cybersecurity Ventures, Finextra",
    "category": "Finance",
    "region": "США",
    "date": "2025-03-12",
    "description": "Із зростанням кількості FinTech-платформ потреба в захисті даних зросла до рекордного рівня. Очікується, що глобальні витрати на кібербезпеку у фінансах перевищать $300 млрд у 2025 році.",
    "image": "https://via.placeholder.com/400x200.png?text=CyberFinTech",
    "views": 4450,
    "charts": [
      {
        "type": "pie",
        "title": "Розподіл інвестицій у кібербезпеку FinTech",
        "data": [
          {"name": "Інфраструктурна безпека", "value": 50},
          {"name": "Захист API", "value": 30},
          {"name": "Шахрайство", "value": 20}
        ]
      },
      {
        "type": "bar",
        "title": "Витрати на кібербезпеку у FinTech (млрд $)",
        "data": [
          {"name": "2021", "value": 120},
          {"name": "2022", "value": 170},
          {"name": "2023", "value": 220},
          {"name": "2024", "value": 260},
          {"name": "2025", "value": 310}
        ]
      }
    ]
  },
  {
    "title": "Fashion і сталий розвиток: тренд 2025",
    "summary": "Екологічна мода стає стандартом для брендів.",
    "source": "Sustainable Apparel Coalition, Vogue Business",
    "category": "Fashion",
    "region": "Європа",
    "date": "2025-04-05",
    "description": "70% великих fashion-брендів у 2025 році мають стратегії ESG. Переробка матеріалів, екологічні фарби та прозорість ланцюгів постачання — ключові напрямки сталого розвитку.",
    "image": "https://via.placeholder.com/400x200.png?text=Sustainable+Fashion",
    "views": 4950,
    "charts": [
      {
        "type": "pie",
        "title": "Фокус ESG стратегій брендів",
        "data": [
          {"name": "Екологічні матеріали", "value": 40},
          {"name": "Етичне виробництво", "value": 35},
          {"name": "Вуглецевий слід", "value": 25}
        ]
      },
      {
        "type": "bar",
        "title": "Інвестиції в сталу моду (млрд $)",
        "data": [
          {"name": "2021", "value": 45},
          {"name": "2022", "value": 60},
          {"name": "2023", "value": 78},
          {"name": "2024", "value": 90},
          {"name": "2025", "value": 110}
        ]
      }
    ]
  },
  {
    "title": "Smart Mobility: транспорт нового покоління",
    "summary": "Міська мобільність як сервіс — ринок і прогнози.",
    "source": "McKinsey Mobility Lab",
    "category": "Automotive",
    "region": "Світ",
    "date": "2025-04-18",
    "description": "У 2025 році глобальний ринок smart mobility оцінюється у $950 млрд. Сервіси спільного транспорту, автономні шатли та інтеграція з міською інфраструктурою — ключові напрямки. Головний виклик — регулювання та безпека.",
    "image": "https://via.placeholder.com/400x200.png?text=Smart+Mobility",
    "views": 5700,
    "charts": [
      {
        "type": "pie",
        "title": "Компоненти ринку Smart Mobility",
        "data": [
          {"name": "Car sharing", "value": 30},
          {"name": "Autonomous", "value": 45},
          {"name": "Інше", "value": 25}
        ]
      },
      {
        "type": "bar",
        "title": "Розмір ринку Smart Mobility (млрд $)",
        "data": [
          {"name": "2021", "value": 320},
          {"name": "2022", "value": 440},
          {"name": "2023", "value": 620},
          {"name": "2024", "value": 800},
          {"name": "2025", "value": 950}
        ]
      }
    ]
  },
  {
    "title": "EdTech у країнах, що розвиваються",
    "summary": "Доступ до онлайн-освіти на глобальному півдні.",
    "source": "UNESCO, World Bank",
    "category": "Education",
    "region": "Азія / Африка",
    "date": "2025-03-25",
    "description": "У 2025 році понад 400 млн учнів у країнах, що розвиваються, мають доступ до дистанційного навчання завдяки урядовим і приватним ініціативам. Основний фокус — мобільні освітні платформи та переклад контенту місцевими мовами.",
    "image": "https://via.placeholder.com/400x200.png?text=Global+EdTech",
    "views": 4200,
    "charts": [
      {
        "type": "pie",
        "title": "Формати EdTech у країнах, що розвиваються",
        "data": [
          {"name": "Мобільні платформи", "value": 50},
          {"name": "SMS-сервіси", "value": 20},
          {"name": "Інше", "value": 30}
        ]
      },
      {
        "type": "bar",
        "title": "Кількість учнів з доступом до EdTech (млн)",
        "data": [
          {"name": "2021", "value": 150},
          {"name": "2022", "value": 220},
          {"name": "2023", "value": 300},
          {"name": "2024", "value": 360},
          {"name": "2025", "value": 420}
        ]
      }
    ]
  },
  {
    "title": "AI у медицині: від діагностики до прогнозування",
    "summary": "Штучний інтелект змінює підхід до охорони здоров’я.",
    "source": "Nature Digital Medicine, WHO",
    "category": "Healthcare",
    "region": "Європа",
    "date": "2025-04-10",
    "description": "AI використовується для ранньої діагностики, розпізнавання зображень (рентген, МРТ) і прогнозування ризиків захворювань. У 2025 році понад 60% лікарень у Європі мають AI-рішення, в основному для онкології та кардіології.",
    "image": "https://via.placeholder.com/400x200.png?text=AI+Healthcare",
    "views": 6100,
    "charts": [
      {
        "type": "pie",
        "title": "Застосування AI у лікарнях Європи",
        "data": [
          {"name": "Онкологія", "value": 45},
          {"name": "Кардіологія", "value": 30},
          {"name": "Інше", "value": 25}
        ]
      },
      {
        "type": "bar",
        "title": "Впровадження AI у лікарнях (% загальної кількості)",
        "data": [
          {"name": "2021", "value": 15},
          {"name": "2022", "value": 25},
          {"name": "2023", "value": 38},
          {"name": "2024", "value": 51},
          {"name": "2025", "value": 63}
        ]
      }
    ]
  },
  {
    "title": "Автоматизація у виробництві продуктів харчування",
    "summary": "Нові технології в агросекторі та харчовій промисловості.",
    "source": "FoodTech News, FAO",
    "category": "Food",
    "region": "Світ",
    "date": "2025-03-20",
    "description": "Smart-ферми та автоматизовані лінії виробництва дають змогу збільшити врожайність на 30%. Використання дронів, IoT, big data та штучного інтелекту у вирощуванні продуктів набуло глобального масштабу.",
    "image": "https://via.placeholder.com/400x200.png?text=Agro+Automation",
    "views": 4700,
    "charts": [
      {
        "type": "pie",
        "title": "Технології у Smart-фермах",
        "data": [
          {"name": "Дрони", "value": 35},
          {"name": "Сенсори IoT", "value": 40},
          {"name": "Інше", "value": 25}
        ]
      },
      {
        "type": "bar",
        "title": "Впровадження технологій у фермах (% глобально)",
        "data": [
          {"name": "2021", "value": 18},
          {"name": "2022", "value": 27},
          {"name": "2023", "value": 36},
          {"name": "2024", "value": 44},
          {"name": "2025", "value": 53}
        ]
      }
    ]
  },
  {
    "title": "Віртуальні fitting rooms: технології в Fashion",
    "summary": "AR-додатки змінюють спосіб покупок онлайн.",
    "source": "Vogue Business, Fashion Innovation Week",
    "category": "Fashion",
    "region": "Світ",
    "date": "2025-04-15",
    "description": "Доповнена реальність у fashion допомагає покупцям віртуально приміряти одяг. Цей підхід знижує повернення товарів на 30% і підвищує конверсію до 45%. У 2025 році 60% великих брендів інтегрували AR-додатки у свої сайти.",
    "image": "https://via.placeholder.com/400x200.png?text=AR+Fashion",
    "views": 4900,
    "charts": [
      {
        "type": "pie",
        "title": "Користувачі AR-фітингів серед онлайн-шоперів",
        "data": [
          {"name": "Так", "value": 60},
          {"name": "Ні", "value": 40}
        ]
      },
      {
        "type": "bar",
        "title": "Зменшення повернень (%)",
        "data": [
          {"name": "2021", "value": 0},
          {"name": "2022", "value": 10},
          {"name": "2023", "value": 18},
          {"name": "2024", "value": 25},
          {"name": "2025", "value": 30}
        ]
      }
    ]
  },
  {
    "title": "Роботизація у сфері доставки товарів",
    "summary": "Дрони, кур'єри-роботи та автономні машини.",
    "source": "McKinsey & Company",
    "category": "Technology",
    "region": "США",
    "date": "2025-03-05",
    "description": "Використання роботів у доставці зросло на 200% з 2021 року. Amazon, Starship та інші лідери галузі активно впроваджують роботизовану логістику. До 2025 року прогнозується, що 20% останньої милі в містах США здійснюватиметься автоматизовано.",
    "image": "https://via.placeholder.com/400x200.png?text=Delivery+Robots",
    "views": 5400,
    "charts": [
      {
        "type": "pie",
        "title": "Типи роботів у доставці",
        "data": [
          {"name": "Наземні кур'єри", "value": 50},
          {"name": "Дрони", "value": 35},
          {"name": "Інше", "value": 15}
        ]
      },
      {
        "type": "bar",
        "title": "Автоматизація «останньої милі» (%)",
        "data": [
          {"name": "2021", "value": 3},
          {"name": "2022", "value": 7},
          {"name": "2023", "value": 12},
          {"name": "2024", "value": 17},
          {"name": "2025", "value": 21}
        ]
      }
    ]
  },
  {
    "title": "Економіка підписок у E-commerce",
    "summary": "Ріст моделей «підписка як послуга» в роздрібі.",
    "source": "Insider Intelligence",
    "category": "E-commerce",
    "region": "Світ",
    "date": "2025-04-25",
    "description": "До 2025 року економіка підписок у e-commerce сягне $500 млрд. Сервіси доставки їжі, косметики та техніки масово переходять на S-commerce (subscription commerce). Це дозволяє стабілізувати дохід і покращити прогнозованість клієнтської бази.",
    "image": "https://via.placeholder.com/400x200.png?text=Subscription+Commerce",
    "views": 6200,
    "charts": [
      {
        "type": "pie",
        "title": "Категорії підписок",
        "data": [
          {"name": "Їжа", "value": 40},
          {"name": "Косметика", "value": 30},
          {"name": "Техніка", "value": 30}
        ]
      },
      {
        "type": "bar",
        "title": "Обсяг S-commerce (млрд $)",
        "data": [
          {"name": "2021", "value": 150},
          {"name": "2022", "value": 240},
          {"name": "2023", "value": 320},
          {"name": "2024", "value": 410},
          {"name": "2025", "value": 500}
        ]
      }
    ]
  },
  {
    "title": "Green Finance: інвестиції у сталий розвиток",
    "summary": "Ринок ESG-активів перевищує $50 трлн у 2025 році.",
    "source": "Bloomberg, S&P Global",
    "category": "Finance",
    "region": "Світ",
    "date": "2025-04-12",
    "description": "У 2025 році понад третина всіх глобальних інвестицій спрямована на ESG-проєкти. Green bonds, соціальні кредити та екологічні ETF — основні фінансові інструменти. Ключовим ринком є ЄС, що регулює прозорість ESG-звітності.",
    "image": "https://via.placeholder.com/400x200.png?text=Green+Finance",
    "views": 4900,
    "charts": [
      {
        "type": "pie",
        "title": "Типи ESG-інструментів у 2025",
        "data": [
          {"name": "Green Bonds", "value": 40},
          {"name": "Соціальні фонди", "value": 30},
          {"name": "Sustainability ETFs", "value": 30}
        ]
      },
      {
        "type": "bar",
        "title": "Глобальний ринок ESG-активів (трлн $)",
        "data": [
          {"name": "2021", "value": 30},
          {"name": "2022", "value": 35},
          {"name": "2023", "value": 41},
          {"name": "2024", "value": 47},
          {"name": "2025", "value": 52}
        ]
      }
    ]
  },
  {
    "title": "AI в освіті: адаптивне навчання як норма",
    "summary": "ШІ автоматизує навчання за індивідуальною траєкторією.",
    "source": "EdTech Review, HolonIQ",
    "category": "Education",
    "region": "Північна Америка",
    "date": "2025-04-08",
    "description": "ШІ у навчанні дозволяє адаптувати контент у реальному часі. У 2025 році 40% EdTech-платформ мають AI-функціонал. Найбільше поширення мають системи рекомендацій, голосові помічники та генерація тестів.",
    "image": "https://via.placeholder.com/400x200.png?text=AI+Education",
    "views": 4100,
    "charts": [
      {
        "type": "pie",
        "title": "Застосування AI у навчанні",
        "data": [
          {"name": "Рекомендації", "value": 35},
          {"name": "Голосові помічники", "value": 30},
          {"name": "Інше", "value": 35}
        ]
      },
      {
        "type": "bar",
        "title": "EdTech із AI (%) від загальної кількості",
        "data": [
          {"name": "2021", "value": 12},
          {"name": "2022", "value": 20},
          {"name": "2023", "value": 28},
          {"name": "2024", "value": 35},
          {"name": "2025", "value": 40}
        ]
      }
    ]
  },
  {
    "title": "Доставка продуктів за 15 хвилин: Quick Commerce",
    "summary": "Ринок Q-commerce перевищив $100 млрд у 2025 році.",
    "source": "Retail Dive, McKinsey",
    "category": "Food",
    "region": "Світ",
    "date": "2025-04-01",
    "description": "Завдяки dark stores і алгоритмічній логістиці компанії доставляють товари за 10–15 хв. Відомі гравці — Getir, Gorillas, Glovo. Найбільше впровадження — у мегаполісах, де середній чек виріс на 22%.",
    "image": "https://via.placeholder.com/400x200.png?text=Q-commerce",
    "views": 5200,
    "charts": [
      {
        "type": "pie",
        "title": "Гравці Q-commerce у 2025",
        "data": [
          {"name": "Getir", "value": 30},
          {"name": "Gorillas", "value": 25},
          {"name": "Інші", "value": 45}
        ]
      },
      {
        "type": "bar",
        "title": "Обсяг ринку Q-commerce (млрд $)",
        "data": [
          {"name": "2021", "value": 40},
          {"name": "2022", "value": 55},
          {"name": "2023", "value": 72},
          {"name": "2024", "value": 90},
          {"name": "2025", "value": 105}
        ]
      }
    ]
  },
  {
    "title": "Електрифікація транспорту: перехід на EV",
    "summary": "Світовий ринок електрокарів зростає вибухово.",
    "source": "IEA, BloombergNEF",
    "category": "Automotive",
    "region": "Світ",
    "date": "2025-03-27",
    "description": "Продажі електрокарів перевищили 16 млн одиниць у 2025. Основні ринки — Китай, ЄС, США. Уряди стимулюють покупців субсидіями, а виробники інвестують у гігафабрики батарей.",
    "image": "https://via.placeholder.com/400x200.png?text=EV+Growth",
    "views": 6000,
    "charts": [
      {
        "type": "pie",
        "title": "Ринки продажу EV у 2025",
        "data": [
          {"name": "Китай", "value": 45},
          {"name": "ЄС", "value": 30},
          {"name": "США", "value": 25}
        ]
      },
      {
        "type": "bar",
        "title": "Світові продажі EV (млн авто)",
        "data": [
          {"name": "2021", "value": 6.5},
          {"name": "2022", "value": 9.1},
          {"name": "2023", "value": 11.8},
          {"name": "2024", "value": 14.2},
          {"name": "2025", "value": 16.0}
        ]
      }
    ]
  },
  {
    "title": "Generative AI у контент-маркетингу",
    "summary": "Штучний інтелект створює тексти, зображення, відео.",
    "source": "Content Marketing Institute, OpenAI Reports",
    "category": "Technology",
    "region": "Світ",
    "date": "2025-03-22",
    "description": "75% компаній застосовують генеративний AI у своїй контент-стратегії. Найчастіше використовують для генерації SEO-текстів, візуалізацій та сценаріїв відео. Популярні платформи — ChatGPT, Midjourney, Jasper.",
    "image": "https://via.placeholder.com/400x200.png?text=GenAI+Marketing",
    "views": 6300,
    "charts": [
      {
        "type": "pie",
        "title": "Застосування GenAI у контенті",
        "data": [
          {"name": "Тексти", "value": 45},
          {"name": "Зображення", "value": 30},
          {"name": "Відео", "value": 25}
        ]
      },
      {
        "type": "bar",
        "title": "Використання GenAI (% компаній)",
        "data": [
          {"name": "2021", "value": 10},
          {"name": "2022", "value": 25},
          {"name": "2023", "value": 40},
          {"name": "2024", "value": 60},
          {"name": "2025", "value": 75}
        ]
      }
    ]
  },
  {
    "title": "Банківські сервіси без банків: Embedded Finance",
    "summary": "Фінанси, вбудовані у не фінансові продукти.",
    "source": "Accenture, Forbes",
    "category": "Finance",
    "region": "США",
    "date": "2025-03-17",
    "description": "Понад 60% фінансових транзакцій у США у 2025 проходять через небанківські сервіси. BNPL, страхування, кредитування прямо в e-commerce платформах змінюють ландшафт традиційного банкінгу.",
    "image": "https://via.placeholder.com/400x200.png?text=Embedded+Finance",
    "views": 5800,
    "charts": [
      {
        "type": "pie",
        "title": "Embedded-фінанси у 2025",
        "data": [
          {"name": "Платежі", "value": 40},
          {"name": "Кредитування", "value": 30},
          {"name": "Страхування", "value": 30}
        ]
      },
      {
        "type": "bar",
        "title": "Транзакції через embedded-сервіси (%)",
        "data": [
          {"name": "2021", "value": 15},
          {"name": "2022", "value": 27},
          {"name": "2023", "value": 39},
          {"name": "2024", "value": 52},
          {"name": "2025", "value": 61}
        ]
      }
    ]
  },
  {
    "title": "Fashion resale: вторинний ринок як новий тренд",
    "summary": "Платформи перепродажу одягу як рушій сталого споживання.",
    "source": "ThredUp, Business of Fashion",
    "category": "Fashion",
    "region": "США / ЄС",
    "date": "2025-04-12",
    "description": "У 2025 році ринок resale fashion оцінюється в $70 млрд. Основні гравці — ThredUp, Vinted, The RealReal. 60% покоління Z обирають вживаний одяг, що формує нову культуру відповідального споживання.",
    "image": "https://via.placeholder.com/400x200.png?text=Resale+Fashion",
    "views": 5400,
    "charts": [
      {
        "type": "pie",
        "title": "Користувачі resale-платформ за поколіннями",
        "data": [
          {"name": "Gen Z", "value": 60},
          {"name": "Millennials", "value": 30},
          {"name": "Інші", "value": 10}
        ]
      },
      {
        "type": "bar",
        "title": "Обсяг ринку Fashion Resale (млрд $)",
        "data": [
          {"name": "2021", "value": 28},
          {"name": "2022", "value": 36},
          {"name": "2023", "value": 48},
          {"name": "2024", "value": 60},
          {"name": "2025", "value": 70}
        ]
      }
    ]
  },
  {
    "title": "Food waste tech: боротьба зі втратами продуктів",
    "summary": "ІТ-рішення для зменшення харчових відходів.",
    "source": "FAO, WRAP",
    "category": "Food",
    "region": "Європа",
    "date": "2025-03-30",
    "description": "40% продуктів харчування у світі не потрапляє до споживача. У 2025 році платформи на зразок Too Good To Go, OLIO допомагають зменшити втрати у ритейлі до 18%. Алгоритми прогнозують попит, знижуючи надвиробництво.",
    "image": "https://via.placeholder.com/400x200.png?text=Food+Waste+Tech",
    "views": 4200,
    "charts": [
      {
        "type": "pie",
        "title": "Втрати продуктів на етапах постачання",
        "data": [
          {"name": "Виробництво", "value": 35},
          {"name": "Дистрибуція", "value": 25},
          {"name": "Роздріб", "value": 40}
        ]
      },
      {
        "type": "bar",
        "title": "Зменшення харчових втрат завдяки tech (%)",
        "data": [
          {"name": "2021", "value": 5},
          {"name": "2022", "value": 9},
          {"name": "2023", "value": 12},
          {"name": "2024", "value": 15},
          {"name": "2025", "value": 18}
        ]
      }
    ]
  },
  {
    "title": "AI в автомобілях: автономні системи 5-го рівня",
    "summary": "Машини без керма — вже не фантастика.",
    "source": "Tesla, Waymo, NVIDIA Drive",
    "category": "Automotive",
    "region": "Світ",
    "date": "2025-04-20",
    "description": "Рівень автономності Level 5 досягнуто в тестовому режимі в США та ОАЕ. Компанії працюють над сертифікацією масового використання. Проблеми — етика AI, аварійність, законодавство.",
    "image": "https://via.placeholder.com/400x200.png?text=Autonomous+AI",
    "views": 5900,
    "charts": [
      {
        "type": "pie",
        "title": "Автовиробники з Level 5 системами",
        "data": [
          {"name": "Tesla", "value": 40},
          {"name": "Waymo", "value": 30},
          {"name": "Інші", "value": 30}
        ]
      },
      {
        "type": "bar",
        "title": "Поширення Level 5 EV в містах (%)",
        "data": [
          {"name": "2021", "value": 0},
          {"name": "2022", "value": 1},
          {"name": "2023", "value": 2},
          {"name": "2024", "value": 4},
          {"name": "2025", "value": 7}
        ]
      }
    ]
  },
  {
    "title": "Digital ID: майбутнє онлайн-ідентифікації",
    "summary": "Єдина цифрова ідентичність для держпослуг та банкінгу.",
    "source": "World Bank ID4D, European Digital Identity",
    "category": "Technology",
    "region": "ЄС / Глобально",
    "date": "2025-04-25",
    "description": "80% населення ЄС у 2025 мають цифровий ID. Єдина система дозволяє входити в урядові, банківські та медичні сервіси. Ключові виклики — приватність і захист даних. Головні розробники — Thales, IDEMIA.",
    "image": "https://via.placeholder.com/400x200.png?text=Digital+ID",
    "views": 5100,
    "charts": [
      {
        "type": "pie",
        "title": "Сфери застосування Digital ID",
        "data": [
          {"name": "Банкінг", "value": 40},
          {"name": "Урядові послуги", "value": 35},
          {"name": "Охорона здоров’я", "value": 25}
        ]
      },
      {
        "type": "bar",
        "title": "Покриття цифровими ID в ЄС (%)",
        "data": [
          {"name": "2021", "value": 20},
          {"name": "2022", "value": 35},
          {"name": "2023", "value": 50},
          {"name": "2024", "value": 65},
          {"name": "2025", "value": 80}
        ]
      }
    ]
  },
  {
    "title": "AI для автоматизованого клієнтського сервісу",
    "summary": "ШІ-чатботи, голосові асистенти та емоційні моделі.",
    "source": "Gartner, Microsoft",
    "category": "Technology",
    "region": "Світ",
    "date": "2025-04-18",
    "description": "Очікується, що до 2025 року 85% взаємодії з клієнтами відбувається без участі людей. Емоційний AI аналізує тон голосу, настрій клієнта, покращує NPS та час відповіді.",
    "image": "https://via.placeholder.com/400x200.png?text=AI+Support",
    "views": 5700,
    "charts": [
      {
        "type": "pie",
        "title": "Формати AI-сервісу",
        "data": [
          {"name": "Чат-боти", "value": 50},
          {"name": "Голосові", "value": 30},
          {"name": "Інше", "value": 20}
        ]
      },
      {
        "type": "bar",
        "title": "Автоматизовані взаємодії з клієнтами (%)",
        "data": [
          {"name": "2021", "value": 45},
          {"name": "2022", "value": 58},
          {"name": "2023", "value": 68},
          {"name": "2024", "value": 77},
          {"name": "2025", "value": 85}
        ]
      }
    ]
  },
  {
    "title": "Екосистеми цифрових банків",
    "summary": "Необанки та фінансові супердодатки.",
    "source": "CB Insights, Revolut Reports",
    "category": "Finance",
    "region": "Світ",
    "date": "2025-03-29",
    "description": "У 2025 році Revolut, N26, Monzo — повноцінні фінансові платформи. В одному додатку: рахунки, інвестиції, страхування, крипта. 50% користувачів переходять на повністю необанківські рішення.",
    "image": "https://via.placeholder.com/400x200.png?text=Neobanks",
    "views": 6500,
    "charts": [
      {
        "type": "pie",
        "title": "Функції, доступні в супердодатках",
        "data": [
          {"name": "Платежі", "value": 30},
          {"name": "Інвестиції", "value": 30},
          {"name": "Крипто/страхування", "value": 40}
        ]
      },
      {
        "type": "bar",
        "title": "Користувачі цифрових банків (млн)",
        "data": [
          {"name": "2021", "value": 100},
          {"name": "2022", "value": 160},
          {"name": "2023", "value": 230},
          {"name": "2024", "value": 310},
          {"name": "2025", "value": 400}
        ]
      }
    ]
  }
];

const client = new MongoClient('mongodb://localhost:27017');
try {
  await client.connect();
  const db = client.db('prodexplorer');
  const collection = db.collection('research');

  await collection.deleteMany({});
  await collection.insertMany(seedData);

  console.log('✅ Seed completed successfully');
} catch (err) {
  console.error('❌ Seed error:', err);
} finally {
  await client.close();
}
