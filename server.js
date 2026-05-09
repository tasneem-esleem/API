const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "learnsmart_secret_2024";

// ─── Middleware: Auth ────────────────────────────────────────────────────────
function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

// ─── DB (in-memory) ──────────────────────────────────────────────────────────
const users = [
  {
    id: 1,
    name: "Sara Ahmad",
    email: "sara@learnsmart.com",
    password: "123456",
    avatar: "https://i.pravatar.cc/150?img=1",
    grade: "Grade 10",
  },
  {
    id: 2,
    name: "Ahmed Al-Najjar",
    email: "ahmed@learnsmart.com",
    password: "123456",
    avatar: "https://i.pravatar.cc/150?img=3",
    grade: "Grade 10",
  },
];

const books = [
  {
    id: 1,
    subject: "Mathematics",
    grade: "Grade 10",
    title: "Mathematics Book Grade 10",
    description: "Learn algebra, equations, and basic geometry concepts",
    cover: "https://placehold.co/160x200/4CAF50/white?text=Math+10",
  },
  {
    id: 2,
    subject: "Physics",
    grade: "Grade 10",
    title: "Physics Book Grade 10",
    description: "Understand motion, forces, and the laws of physics.",
    cover: "https://placehold.co/160x200/FF9800/white?text=Physics+10",
  },
  {
    id: 3,
    subject: "Chemistry",
    grade: "Grade 10",
    title: "Chemistry Book Grade 10",
    description: "Learn about elements, reactions, and chemical experiments.",
    cover: "https://placehold.co/160x200/E91E63/white?text=Chemistry+10",
  },
  {
    id: 4,
    subject: "Biology",
    grade: "Grade 10",
    title: "Biology Book Grade 10",
    description: "Explore scientific concepts about nature, energy, and living things.",
    cover: "https://placehold.co/160x200/2196F3/white?text=Biology+10",
  },
  {
    id: 5,
    subject: "English",
    grade: "Grade 10",
    title: "English Book Grade 10",
    description: "Improve reading, writing, and grammar concepts in English.",
    cover: "https://placehold.co/160x200/009688/white?text=English+10",
  },
  {
    id: 6,
    subject: "Arabic",
    grade: "Grade 10",
    title: "Arabic Book Grade 10",
    description: "Develop reading, writing, and grammar skills in Arabic.",
    cover: "https://placehold.co/160x200/795548/white?text=Arabic+10",
  },
  {
    id: 7,
    subject: "History",
    grade: "Grade 10",
    title: "History Book Grade 10",
    description: "Discover important historical events and civilizations from the past.",
    cover: "https://placehold.co/160x200/607D8B/white?text=History+10",
  },
  {
    id: 8,
    subject: "Geography",
    grade: "Grade 10",
    title: "Geography Book Grade 10",
    description: "Learn about countries, climates, and the Earth's natural features.",
    cover: "https://placehold.co/160x200/8BC34A/white?text=Geography+10",
  },
];

const lessons = [
  {
    id: 1,
    bookId: 3,
    subject: "Chemistry",
    grade: "Grade 10",
    title: "Atomic Structure",
    duration: "45 min",
    videoUrl: "#",
    watched: false,
  },
  {
    id: 2,
    bookId: 3,
    subject: "Chemistry",
    grade: "Grade 10",
    title: "Atom Theory",
    duration: "38 min",
    videoUrl: "#",
    watched: false,
  },
  {
    id: 3,
    bookId: 3,
    subject: "Chemistry",
    grade: "Grade 10",
    title: "Energy Levels Of The Atom",
    duration: "50 min",
    videoUrl: "#",
    watched: true,
  },
  {
    id: 4,
    bookId: 4,
    subject: "Biology",
    grade: "Grade 10",
    title: "Cell Installation",
    duration: "40 min",
    videoUrl: "#",
    watched: false,
  },
  {
    id: 5,
    bookId: 4,
    subject: "Biology",
    grade: "Grade 10",
    title: "Installation Of Microscopes",
    duration: "35 min",
    videoUrl: "#",
    watched: false,
  },
  {
    id: 6,
    bookId: 4,
    subject: "Biology",
    grade: "Grade 10",
    title: "Plant Cell Structure",
    duration: "42 min",
    videoUrl: "#",
    watched: true,
  },
  {
    id: 7,
    bookId: 4,
    subject: "Biology",
    grade: "Grade 10",
    title: "Animal Cell Structure",
    duration: "44 min",
    videoUrl: "#",
    watched: false,
  },
];

const assignments = [
  {
    id: 1,
    bookId: 6,
    subject: "Arabic",
    grade: "Grade 10",
    taskNumber: 1,
    question:
      "Extract from the text a word that indicates (value/importance/problem). What is your opinion on the topic that the writer addressed? Why? And how can the ideas of the text be applied in reality?",
    completed: true,
    userId: 1,
  },
  {
    id: 2,
    bookId: 2,
    subject: "Physics",
    grade: "Grade 10",
    taskNumber: 2,
    question:
      "What is the definition of (speed/force/energy)? What is the difference between velocity vector and speed vector? And what is the relationship between force and acceleration?",
    completed: false,
    userId: 1,
  },
  {
    id: 3,
    bookId: 7,
    subject: "History",
    grade: "Grade 10",
    taskNumber: 3,
    question:
      "What is meant by history? Why is history important in human life? Who are the prominent figures mentioned in the lesson? What was their role? What were the most important events that occurred during this period?",
    completed: true,
    userId: 1,
  },
];

const notifications = [
  {
    id: 1,
    userId: 1,
    from: "Sara Ahmad",
    avatar: "https://i.pravatar.cc/150?img=1",
    message: "Login successful. Welcome back!",
    time: "35 min ago",
    read: true,
  },
  {
    id: 2,
    userId: 1,
    from: "Ahmed Al-Najjar",
    avatar: "https://i.pravatar.cc/150?img=3",
    message: "A new lesson has been added to your course.",
    time: "1 day ago",
    read: true,
  },
  {
    id: 3,
    userId: 1,
    from: "Youssef Al-Kilani",
    avatar: "https://i.pravatar.cc/150?img=5",
    message: "Don't forget to complete your pending lessons",
    time: "5 day ago",
    read: false,
  },
  {
    id: 4,
    userId: 1,
    from: "Miriana Muhammad",
    avatar: null,
    message: "Network error. Check your internet connection",
    time: "1 week ago",
    read: false,
  },
  {
    id: 5,
    userId: 1,
    from: "Dima Mahmoud",
    avatar: null,
    message: "Reminder: Your exam is scheduled for tomorrow.",
    time: "2 week ago",
    read: true,
  },
  {
    id: 6,
    userId: 1,
    from: "Fares Hamdan",
    avatar: null,
    message: "Your account has been created successfully",
    time: "1 month ago",
    read: false,
  },
  {
    id: 7,
    userId: 1,
    from: "Omar Al-Shami",
    avatar: null,
    message: "Your message has been sent successfully",
    time: "3 month ago",
    read: true,
  },
  {
    id: 8,
    userId: 1,
    from: "Yara Hassan",
    avatar: null,
    message: "Your assignment has been graded. Check your results",
    time: "5 month ago",
    read: false,
  },
  {
    id: 9,
    userId: 1,
    from: "Amira Malik",
    avatar: null,
    message: "You have successfully completed this lesson. Great job",
    time: "9 month ago",
    read: true,
  },
];

const messages = [
  {
    id: 1,
    participants: [1, 2],
    messages: [
      { from: 2, text: "Hi, How are you?", time: "2:10 pm", date: "Yesterday" },
      { from: 1, text: "Hi, Im thanks", time: "2:10 pm", date: "Yesterday" },
      { from: 2, text: "Can I ask question?", time: "2:22 pm", date: "Yesterday" },
      { from: 1, text: "Yes, you can ask", time: "3:31 pm", date: "Yesterday" },
      { from: 2, text: "Do you want to ask", time: "5:31 pm", date: "Today" },
      { from: 1, text: "Yes, sure", time: "5:00 pm", date: "Today" },
      { from: 2, text: "Send a picture", time: "6:00 pm", date: "Today" },
    ],
  },
];

const quizzes = [
  {
    id: 1,
    bookId: 3,
    subject: "Chemistry",
    grade: "Grade 10",
    title: "Atomic Structure Quiz",
    questions: [
      {
        q: "What is the atomic number of Carbon?",
        options: ["4", "6", "8", "12"],
        answer: 1,
      },
      {
        q: "Who proposed the planetary model of the atom?",
        options: ["Bohr", "Rutherford", "Dalton", "Thomson"],
        answer: 1,
      },
    ],
  },
];

// ─── AUTH ROUTES ─────────────────────────────────────────────────────────────
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: "Invalid email or password" });
  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: "7d" });
  const { password: _, ...userSafe } = user;
  res.json({ token, user: userSafe });
});

app.get("/api/auth/me", auth, (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  const { password: _, ...userSafe } = user;
  res.json(userSafe);
});

// ─── BOOKS ───────────────────────────────────────────────────────────────────
app.get("/api/books", (req, res) => {
  const { grade, subject } = req.query;
  let result = books;
  if (grade) result = result.filter((b) => b.grade === grade);
  if (subject) result = result.filter((b) => b.subject === subject);
  res.json(result);
});

app.get("/api/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
});

// ─── LESSONS ─────────────────────────────────────────────────────────────────
app.get("/api/lessons", (req, res) => {
  const { bookId, subject, grade } = req.query;
  let result = lessons;
  if (bookId) result = result.filter((l) => l.bookId === parseInt(bookId));
  if (subject) result = result.filter((l) => l.subject === subject);
  if (grade) result = result.filter((l) => l.grade === grade);
  res.json(result);
});

app.get("/api/lessons/:id", (req, res) => {
  const lesson = lessons.find((l) => l.id === parseInt(req.params.id));
  if (!lesson) return res.status(404).json({ error: "Lesson not found" });
  res.json(lesson);
});

// ─── ASSIGNMENTS ─────────────────────────────────────────────────────────────
app.get("/api/assignments", auth, (req, res) => {
  const { subject, grade } = req.query;
  let result = assignments.filter((a) => a.userId === req.user.id);
  if (subject) result = result.filter((a) => a.subject === subject);
  if (grade) result = result.filter((a) => a.grade === grade);
  res.json(result);
});

app.patch("/api/assignments/:id/complete", auth, (req, res) => {
  const assignment = assignments.find(
    (a) => a.id === parseInt(req.params.id) && a.userId === req.user.id
  );
  if (!assignment) return res.status(404).json({ error: "Assignment not found" });
  assignment.completed = true;
  res.json(assignment);
});

// ─── NOTIFICATIONS ───────────────────────────────────────────────────────────
app.get("/api/notifications", auth, (req, res) => {
  const result = notifications.filter((n) => n.userId === req.user.id);
  res.json(result);
});

app.patch("/api/notifications/read-all", auth, (req, res) => {
  notifications.forEach((n) => {
    if (n.userId === req.user.id) n.read = true;
  });
  res.json({ success: true });
});

app.patch("/api/notifications/:id/read", auth, (req, res) => {
  const notif = notifications.find(
    (n) => n.id === parseInt(req.params.id) && n.userId === req.user.id
  );
  if (!notif) return res.status(404).json({ error: "Notification not found" });
  notif.read = true;
  res.json(notif);
});

// ─── MESSAGES ────────────────────────────────────────────────────────────────
app.get("/api/messages", auth, (req, res) => {
  const myChats = messages.filter((m) => m.participants.includes(req.user.id));
  const result = myChats.map((chat) => {
    const otherId = chat.participants.find((p) => p !== req.user.id);
    const otherUser = users.find((u) => u.id === otherId);
    const lastMsg = chat.messages[chat.messages.length - 1];
    return {
      chatId: chat.id,
      contact: { id: otherId, name: otherUser?.name, avatar: otherUser?.avatar },
      lastMessage: lastMsg?.text,
      lastTime: lastMsg?.time,
    };
  });
  res.json(result);
});

app.get("/api/messages/:chatId", auth, (req, res) => {
  const chat = messages.find((m) => m.id === parseInt(req.params.chatId));
  if (!chat || !chat.participants.includes(req.user.id))
    return res.status(404).json({ error: "Chat not found" });
  res.json(chat.messages);
});

app.post("/api/messages/:chatId", auth, (req, res) => {
  const chat = messages.find((m) => m.id === parseInt(req.params.chatId));
  if (!chat || !chat.participants.includes(req.user.id))
    return res.status(404).json({ error: "Chat not found" });
  const newMsg = {
    from: req.user.id,
    text: req.body.text,
    time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    date: "Today",
  };
  chat.messages.push(newMsg);
  res.status(201).json(newMsg);
});

// ─── QUIZZES ─────────────────────────────────────────────────────────────────
app.get("/api/quizzes", (req, res) => {
  const { bookId, subject } = req.query;
  let result = quizzes;
  if (bookId) result = result.filter((q) => q.bookId === parseInt(bookId));
  if (subject) result = result.filter((q) => q.subject === subject);
  res.json(result);
});

app.get("/api/quizzes/:id", (req, res) => {
  const quiz = quizzes.find((q) => q.id === parseInt(req.params.id));
  if (!quiz) return res.status(404).json({ error: "Quiz not found" });
  res.json(quiz);
});

// ─── START ───────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ LearnSmart API running on port ${PORT}`);
});
