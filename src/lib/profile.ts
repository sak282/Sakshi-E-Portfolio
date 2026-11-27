// Single source of truth for portfolio content. Shared by pages and the AI chatbot.
export const profile = {
  name: "Sakshi Vilas Temghare",
  shortName: "Sakshi",
  initials: "ST",
  role: "MCA Student · Aspiring Data Analyst & Software Developer",
  university: "IMED, Bharati Vidyapeeth University, Pune",
  email: "sakshitemghare887@gmail.com",
  location: "Pune, Maharashtra, India",
  whatsappNumber: "917776959054",
  intro:
    "I'm a first-year MCA student who loves turning raw data into clear stories and ideas into working software. I build with Python, Java and the web, and I'm growing into a data analyst who can also ship.",
  objective:
    "To begin my career as a Data Analyst or Software Developer in a team where I can solve real problems with data, write clean and reliable code, and keep learning modern tools — while contributing from day one.",
  socials: {
    github: "https://github.com/sak282",
    linkedin: "https://www.linkedin.com/in/sakshi-temghare",
  },
};

export type Skill = { name: string; level: number; group: "Languages" | "Web" | "Data"; note: string };

export const skills: Skill[] = [
  { name: "Python", level: 85, group: "Languages", note: "Scripting, Pandas, NumPy, automation" },
  { name: "Java", level: 75, group: "Languages", note: "OOP, collections, JDBC" },
  { name: "HTML", level: 90, group: "Web", note: "Semantic, accessible markup" },
  { name: "CSS", level: 82, group: "Web", note: "Flexbox, Grid, responsive design" },
  { name: "JavaScript", level: 72, group: "Web", note: "DOM, ES6+, fetch & APIs" },
  { name: "SQL", level: 80, group: "Data", note: "Joins, subqueries, MySQL" },
  { name: "Data Analytics", level: 78, group: "Data", note: "Excel, Power BI, visualisation" },
];

export type Education = {
  degree: string;
  short: string;
  institution: string;
  period: string;
  status: string;
  highlights: string[];
};

// TODO: confirm BSc college name and years
export const education: Education[] = [
  {
    degree: "Master of Computer Applications",
    short: "MCA",
    institution: "IMED, Bharati Vidyapeeth University, Pune",
    period: "2025 — 2027",
    status: "Pursuing · First Year",
    highlights: [
      "Advanced Java, Python & Data Structures",
      "Database Management Systems & SQL",
      "Data Analytics and Software Engineering",
    ],
  },
  {
    degree: "Bachelor of Science in Computer Science",
    short: "BSc CS",
    institution: "Savitribai Phule Pune University",
    period: "2022 — 2025",
    status: "Completed",
    highlights: [
      "Programming in C, C++, Java and Python",
      "Web technologies — HTML, CSS, JavaScript",
      "Operating systems, networks and DBMS",
    ],
  },
];

export type Project = {
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  github?: string;
  year?: string;
};

export const projects: Project[] = [
  {
    title: "Web Development Project — Launchpad Career Portal",
    tagline: "Web Development",
    description:
      "A frontend-only internship and placement portal built with HTML, CSS and JavaScript. It includes sample student and company screens, navigation, search filters and demo interactions to showcase student and company workflows.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/sak282/Web_Development_project",
    year: "2026",
  },
  {
    title: "MCA Web Technologies — Practical Assignments",
    tagline: "Academic Practicals",
    description:
      "A collection of five MCA Web Technologies practical assignments, organized into separate folders covering HTML basics, images and tables, forms, HTML5 features and JavaScript fundamentals.",
    tech: ["HTML", "HTML5", "Forms", "JavaScript"],
    github: "https://github.com/sak282/Web-Devolpment_practical-Assignment",
    year: "2026",
  },
  {
    title: "Duplicate File Cleaner & Log Automation",
    tagline: "Python Automation",
    description:
      "A Python automation script that finds and removes duplicate files from a directory on a schedule. Duplicates are detected with MD5 checksums, every run is written to a timestamped log file, and the log is emailed automatically for audit purposes.",
    tech: ["Python", "OS module", "Hashlib (MD5)", "Schedule", "smtplib"],
    github: "https://github.com/sak282/Disk-Sanitizer",
    year: "2026",
  },
  {
    title: "Surface-Crack Detection using CNN",
    tagline: "Deep Learning",
    description:
      "An AI-based system that detects cracks on industrial surfaces from image datasets using a Convolutional Neural Network. Covers image preprocessing, feature extraction and binary classification, with prediction visualisations and performance metrics from a TensorFlow / Keras model.",
    tech: ["Python", "TensorFlow", "Keras", "OpenCV", "NumPy", "Matplotlib", "Scikit-learn"],
    github: "https://github.com/sak282/Surface-Crack-Detection",
    year: "2026",
  },
  {
    title: "Text Sentiment Analysis using RNN / LSTM",
    tagline: "Natural Language Processing",
    description:
      "A recurrent neural network with LSTM layers that predicts positive, negative or neutral sentiment from text such as movie reviews and social media posts. Text is tokenised, stripped of stopwords, padded and embedded with word vectors; dropout and an Adam optimiser keep the model generalising.",
    tech: ["Python", "TensorFlow", "Keras", "NLTK", "NumPy", "Matplotlib"],
    year: "2026",
  },
];

export type MentoringSession = {
  id: "python" | "sql-analytics" | "project-guidance";
  title: string;
  duration: string;
  priceInr: number;
  description: string;
  includes: string[];
};

// TODO: confirm session prices
export const mentoringSessions: MentoringSession[] = [
  {
    id: "python",
    title: "Python Foundations",
    duration: "45 min · 1:1 online",
    priceInr: 299,
    description: "For beginners who want to understand Python basics, logic building and writing clean code.",
    includes: ["Concept walkthrough", "Live practice problems", "Notes after the session"],
  },
  {
    id: "sql-analytics",
    title: "SQL & Data Analytics",
    duration: "60 min · 1:1 online",
    priceInr: 499,
    description: "Learn to query real datasets, write joins with confidence and turn results into insights.",
    includes: ["Hands-on SQL queries", "Excel / Power BI tips", "Mini dataset to practise"],
  },
  {
    id: "project-guidance",
    title: "College Project Guidance",
    duration: "60 min · 1:1 online",
    priceInr: 699,
    description: "Help planning, building or debugging your college mini-project — from idea to presentation.",
    includes: ["Idea & scope review", "Code / database review", "Presentation pointers"],
  },
];

export const whatsappLink = (text = "Hi Sakshi! I visited your portfolio and would like to connect.") =>
  `https://wa.me/${profile.whatsappNumber}?text=${encodeURIComponent(text)}`;
