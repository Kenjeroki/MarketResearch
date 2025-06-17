import React, { createContext, useContext } from 'react';
import { format as dateFnsFormat } from 'date-fns';
import { uk } from 'date-fns/locale';

type LanguageContextType = {
  translate: (key: string) => string;
  formatDate: (date: Date, formatStr: string) => string;
  formatNumber: (num: number, options?: Intl.NumberFormatOptions) => string;
};

const translations: Record<string, string> = {
  home: 'Головна',
  research: 'Дослідження',
  contact: 'Контакти',
  profile: 'Профіль',
  
  login: 'Увійти',
  register: 'Зареєструватися',
  registering: 'Реєстрація...',
  registerDescription: 'Створіть обліковий запис для доступу до всіх функцій',
  logout: 'Вийти',
  alreadyHaveAccount: 'Вже маєте обліковий запис?',
  enterPassword: 'Введіть пароль',
  enterConfirmPassword: 'Підтвердіть пароль',
  passwordTooShort: 'Пароль повинен містити щонайменше 8 символів',
  passwordRequiresUppercase: 'Пароль повинен містити велику літеру',
  passwordRequiresNumber: 'Пароль повинен містити цифру',
  loginError: 'Помилка входу. Перевірте свої облікові дані.',
  registrationError: 'Помилка реєстрації. Будь ласка, спробуйте ще раз.',
  registrationSuccess: 'Реєстрація успішна!',
  logoutSuccess: 'Ви успішно вийшли з системи.',
  
  startResearch: 'Почати дослідження',
  latestResearch: 'Останні дослідження',
  viewMore: 'Переглянути більше',
  viewAllResearch: 'Переглянути всі дослідження',
  popularCategories: 'Популярні категорії',
  viewAllCategories: 'Переглянути всі категорії',
  searchResearch: 'Пошук досліджень',
  searchPlaceholder: 'Пошук маркетингових досліджень, тенденцій або галузей...',
  
  popularProductCategories: 'Популярні категорії товарів',
  categoriesDescription: 'Досліджуйте дані ринкових досліджень за різними категоріями товарів, щоб знайти найперспективніші можливості для вашого бізнесу.',
  viewResearch: 'Переглянути дослідження',
  
  about: 'Про нас',
  aboutPlatform: 'Про нашу платформу',
  aboutTitle: 'Ваше джерело комплексної ринкової аналітики',
  aboutDescription1: 'Ми надаємо підприємцям, компаніям та аналітикам ринку аналітичні дані для прийняття обґрунтованих рішень. Наша комплексна методологія досліджень поєднує галузеву експертизу з передовою аналітикою для надання точної та практичної ринкової інформації.',
  aboutDescription2: 'Від виявлення нових тенденцій до аналізу моделей поведінки споживачів, наша платформа пропонує інструменти, необхідні для того, щоб залишатися попереду в сучасному конкурентному бізнес-середовищі.',
  
  teamAnalyzingData: 'Команда аналізує ринкові дані',
  globalMarket: 'Глобальний ринок',
  platformFeatures: 'Особливості платформи',
  comprehensiveReports: 'Комплексні звіти',
  comprehensiveReportsDesc: 'Отримуйте детальні звіти з глибоким аналізом ринку',
  globalCoverage: 'Глобальне охоплення',
  globalCoverageDesc: 'Дані по різних регіонах та галузях світу',
  targetAudience: 'Для кого ця платформа',
  targetAudienceItem1: 'Підприємці та засновники стартапів, що шукають нові ринкові можливості',
  targetAudienceItem2: 'Маркетологи та аналітики, яким потрібні детальні ринкові дані',
  targetAudienceItem3: 'Компанії, що прагнуть розширити свій бізнес на нові ринки',
  establishedIn: 'Засновано в',
  trustedBy: 'Довіряють',
  companies: 'компаній',
  
  dataInsights: 'Аналітичні дані',
  dataInsightsDesc: 'Приймайте рішення на основі комплексних ринкових даних',
  trendIdentification: 'Виявлення тенденцій',
  trendIdentificationDesc: 'Виявляйте нові тенденції раніше за конкурентів',
  consumerBehavior: 'Поведінка споживачів',
  consumerBehaviorDesc: 'Краще розумійте свою цільову аудиторію',
  competitiveAnalysis: 'Конкурентний аналіз',
  competitiveAnalysisDesc: 'Знайте своє місце на ринку',
  learnMoreAboutUs: 'Дізнатися більше про нас',
  
  findSpecificResearch: 'Знайти конкретне дослідження ринку',
  searchDescription: 'Шукаєте конкретні ринкові дані? Шукайте в нашій комплексній базі даних звітів про дослідження ринку в різних галузях та регіонах.',
  search: 'Пошук',
  popularSearches: 'Популярні запити',
  popular: 'Популярні:',
  
  contactUs: 'Зв\'яжіться з нами',
  quickLinks: 'Швидкі посилання',
  categories: 'Категорії',
  pricing: 'Ціни',
  newsletter: 'Підписатися на розсилку',
  newsletterDesc: 'Слідкуйте за нашими останніми дослідженнями та галузевими аналітичними матеріалами',
  subscribe: 'Підписатися',
  yourEmail: 'Ваша електронна адреса',
  privacyPolicy: 'Політика конфіденційності',
  termsOfService: 'Умови використання',
  cookiePolicy: 'Політика використання файлів cookie',
  allRightsReserved: 'Всі права захищено.',
  
  marketResearchPlatform: 'Платформа дослідження ринку',
  discoverOpportunities: 'Відкрийте невикористані можливості ринку',
  heroDescription: 'Отримайте доступ до комплексних маркетингових досліджень для прийняття рішень на основі даних. Визначайте тенденції, аналізуйте попит та знаходьте нові бізнес-можливості.',
  researchReports: 'Звіти досліджень',
  
  errorOccurred: 'Виникла помилка.',
  pleaseRetry: 'Будь ласка, спробуйте ще раз.',
  successfulSubmission: 'Успішно відправлено!',
  requiredField: 'Це поле обов\'язкове.',
  invalidEmail: 'Будь ласка, введіть дійсну електронну адресу.',
  close: 'Закрити',
  
  notFound: 'Сторінку не знайдено',
  returnHome: 'Повернутися на Головну',
  
  resultsFound: 'результатів знайдено',
  dataVisualization: 'Візуалізація даних',
  noResultsFound: 'Досліджень за вашими критеріями не знайдено',
  tryDifferentSearch: 'Спробуйте інші пошукові терміни або фільтри',
  popularity: 'Популярність',
  date: 'Дата',
  title: 'Назва',
  region: 'Регіон',
  browseResearch: 'Огляд досліджень',
  customResearch: 'Власне дослідження',
  searching: 'Пошук',
  searchingFor: 'Пошук за запитом',
  researchSelected: 'Дослідження вибрано',
  viewingResearch: 'Перегляд дослідження',
  dataVisualizationClosed: 'Візуалізацію даних закрито',
  dataVisualizationOpened: 'Візуалізацію даних відкрито',
  toggledDataVisualization: 'Переключено візуалізацію даних',
  
  contactDescription: 'Маєте питання або хочете дізнатися більше про наші послуги з дослідження ринку? Зв\'яжіться з нашою командою.',
  getInTouch: 'Зв\'яжіться з нами',
  address: 'Адреса',
  phone: 'Телефон',
  email: 'Електронна пошта',
  workingHours: 'Робочі години',
  mondayToFriday: 'Понеділок-П\'ятниця',
  saturdaySunday: 'Субота і Неділя',
  closed: 'Зачинено',
  sendMessage: 'Надіслати повідомлення',
  yourName: 'Ваше ім\'я',
  enterYourName: 'Введіть ваше ім\'я',
  enterYourEmail: 'Введіть вашу електронну пошту',
  subject: 'Тема',
  enterSubject: 'Введіть тему',
  message: 'Повідомлення',
  enterYourMessage: 'Введіть ваше повідомлення тут...',
  sending: 'Надсилання...',
  messageReceived: 'Повідомлення отримано',
  thankYouForContacting: 'Дякуємо за звернення. Ми зв\'яжемося з вами найближчим часом.',
  ourLocation: 'Наше розташування',
  messageTooShort: 'Повідомлення має містити щонайменше 10 символів',
  
  profileInformation: 'Інформація профілю',
  updateProfileDescription: 'Оновіть свою особисту інформацію та фото профілю',
  name: 'Ім\'я',
  activity: 'Активність',
  profilePicture: 'Фото профілю',
  saveChanges: 'Зберегти зміни',
  memberSince: 'Учасник з',
  cancel: 'Скасувати',
  edit: 'Редагувати',
  activityHistory: 'Історія активності',
  activityHistoryDescription: 'Відстежуйте свою взаємодію з маркетинговими дослідженнями на нашій платформі',
  viewed: 'Переглянуто',
  favorites: 'Улюблені',
  comments: 'Коментарі',
  security: 'Безпека',
  securityDescription: 'Керуйте безпекою та налаштуваннями вашого облікового запису',
  currentPassword: 'Поточний пароль',
  newPassword: 'Новий пароль',
  confirmPassword: 'Підтвердити пароль',
  changePassword: 'Змінити пароль',
  accountSettings: 'Налаштування облікового запису',
  deleteAccount: 'Видалити обліковий запис',
  deleteAccountDescription: 'Остаточно видалити ваш обліковий запис та всі пов\'язані дані',
  downloadData: 'Завантажити ваші дані',
  downloadDataDescription: 'Завантажити копію ваших особистих даних з нашої платформи',
  profileUpdated: 'Профіль оновлено',
  profileUpdateSuccess: 'Інформацію вашого профілю успішно оновлено',
  passwordChanged: 'Пароль змінено',
  passwordChangeSuccess: 'Ваш пароль успішно змінено',
  passwordsDoNotMatch: 'Новий пароль і підтвердження не співпадають',
  loggedOut: 'Вихід здійснено',
  error: 'Помилка',
  
  researchTitle: "Назва дослідження",
  enterTitle: "Введіть назву для вашого дослідження",
  industry: "Галузь",
  selectIndustry: "Виберіть галузь",
  timeframe: "Часовий діапазон",
  selectTimeframe: "Виберіть часовий діапазон",
  selectRegion: "Виберіть регіон",
  dataPoints: "Дані для аналізу",
  enterDataPoints: "Введі��ь ваші дані (наприклад, обсяги продажів, ринкова статистика, результати опитувань)",
  dataPointsDescription: "Введіть будь-які числові або категоріальні дані, що стосуються вашого дослідження",
  objectives: "Цілі дослідження",
  enterObjectives: "Що ви хочете дізнатися з цього дослідження?",
  objectivesDescription: "Чітко вкажіть, що ви сподіваєтесь виявити або проаналізувати",
  processing: "Обробка...",
  conductResearch: "Провести дослідження",
  resetForm: "Скинути форму",
  researchResults: "Результати дослідження",
  analysisInsights: "Аналітичні висновки",
  insightsDescription: "На основі наданих даних, наш аналіз показує кілька ключових тенденцій та можливостей на обраному вами ринку. Дослідження вказує на потенційні області зростання та стратегії конкурентного позиціонування.",
  furtherResearch: "Для повного аналізу з детальними рекомендаціями зверніться до нашої дослідницької команди для отримання повного звіту.",
  downloadReport: "Завантажити звіт",
  researchComplete: "Дослідження завершено",
  researchResultsReady: "Результати вашого власного дослідження готові",
  researchError: "Помилка дослідження",
  errorProcessingResearch: "Виникла помилка при обробці вашого запиту на дослідження",
  customResearchDescription: "Введіть свої дані для створення власного аналізу ринку",
  
  settings: "Налаштування",
  generalSettings: "Загальні налаштування",
  notificationSettings: "Налаштування сповіщень",
  dataSettings: "Налаштування даних",
  appearanceSettings: "Налаштування зовнішнього вигляду",
  emailNotifications: "Сповіщення електронною поштою",
  pushNotifications: "Push-сповіщення",
  dataSharingConsent: "Згода на обмін даними",
  analyticsConsent: "Згода на аналітику",
  marketingConsent: "Згода на маркетинг",
  researchRecommendations: "Рекомендації досліджень",
  researchAlerts: "Сповіщення про дослідження",
  newsletterUpdates: "Оновлення розсилки",
  marketingCommunications: "Маркетингові комунікації",
  accountActivity: "Активність облікового запису",
  newFeatures: "Нові функції",
  saveSettings: "Зберегти налаштування",
  resetDefaults: "Скинути до типових",
  settingsSaved: "Налаштування збережено",
  settingsReset: "Налаштування скинуто",
  
  aboutUsTitle: "Про Центр Дослідження Ринку",
  aboutUsSubtitle: "Ми надаємо комплексні ринкові дослідження та аналітику, щоб допомогти бізнесу приймати обґрунтовані рішення та випереджати конкурентів.",
  established: "Засновано",
  team: "Членів команди",
  countries: "Країн",
  reports: "Опублікованих звітів",
  ourMission: "Наша місія",
  missionTitle: "Розширення можливостей бізнесу через ринкову аналітику",
  missionDescription: "У Центрі Дослідження Ринку наша місія - надавати точну, своєчасну та дієву ринкову аналітику, яка допомагає бізнесу орієнтуватися у складних ринкових умовах і приймати рішення на основі даних.",
  missionDescription2: "Ми віримо, що доступ до високоякісної ринкової аналітики повинен бути доступним для бізнесу будь-якого розміру, від стартапів до великих корпорацій.",
  missionPoint1: "Надавати точні та неупереджені ринкові дослідження",
  missionPoint2: "Допомагати бізнесу приймати обґрунтовані рішення",
  missionPoint3: "Сприяти інноваціям через ринкову аналітику",
  learnMore: "Дізнатися більше",
  ourTeam: "Наша команда",
  teamTitle: "Познайомтеся з нашою експертною дослідницькою командою",
  teamDescription: "Наша команда складається з досвідчених ринкових аналітиків, галузевих експертів та фахівців з обробки даних, які працюють разом, щоб надати вам найточнішу та дієву ринкову аналітику.",
  viewFullTeam: "Переглянути повну команду",
  ourValues: "Наші цінності",
  valuesTitle: "Принципи, які спрямовують нашу роботу",
  valuesDescription: "Ці базові цінності становлять основу нашої корпоративної культури та спрямовують кожен аспект нашої роботи.",
  integrity: "Цілісність",
  integrityDescription: "Ми проводимо наші дослідження з найвищим рівнем чесності, гарантуючи, що наші висновки є точними, неупередженими і отримані етичним шляхом.",
  innovation: "Інновації",
  innovationDescription: "Ми постійно вдосконалюємо наші методології досліджень та технології, щоб надавати нашим клієнтам найбільш інноваційну та ефективну ринкову аналітику.",
  collaboration: "Співпраця",
  collaborationDescription: "Ми віримо в силу співпраці з нашими клієнтами, партнерами та всередині нашої команди для надання комплексної та цінної ринкової аналітики.",
  
  backToAllCategories: "Назад до всіх категорій",
  findLatestResearch: "Знайдіть останні ринкові дослідження та дані про",
  searchIn: "Пошук у",
  filters: "Фільтри"
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const translate = (key: string): string => {
    return translations[key] || key;
  };

  const formatDate = (date: Date, formatStr: string): string => {
    return dateFnsFormat(date, formatStr, {
      locale: uk
    });
  };

  const formatNumber = (num: number, options?: Intl.NumberFormatOptions): string => {
    return new Intl.NumberFormat('uk-UA', options).format(num);
  };

  return (
    <LanguageContext.Provider value={{ 
      translate,
      formatDate,
      formatNumber
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
