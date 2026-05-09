// ============================================================
//  LearnSmart - Mock API for React (no server needed!)
//  Usage: import api from './mockApi'
//  Switch to real API: change USE_MOCK to false
// ============================================================

const USE_MOCK = true;
const BASE_URL = "http://localhost:5000/api";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const _users = [
  {
    id: 1,
    name: "Sara Ahmad",
    email: "sara@learnsmart.com",
    password: "123456",
    avatar: "https://i.pravatar.cc/150?img=1",
    grade: "Grade 10",
  },
];

const _books = [
  { id: 1, subject: "Mathematics", grade: "Grade 10", title: "Mathematics Book Grade 10", description: "Learn algebra, equations, and basic geometry concepts", cover: "https://placehold.co/160x200/4CAF50/white?text=Math" },
  { id: 2, subject: "Physics",     grade: "Grade 10", title: "Physics Book Grade 10",     description: "Understand motion, forces, and the laws of physics.",   cover: "https://placehold.co/160x200/FF9800/white?text=Physics" },
  { id: 3, subject: "Chemistry",   grade: "Grade 10", title: "Chemistry Book Grade 10",   description: "Learn about elements, reactions, and chemical experiments.", cover: "https://placehold.co/160x200/E91E63/white?text=Chemistry" },
  { id: 4, subject: "Biology",     grade: "Grade 10", title: "Biology Book Grade 10",     description: "Explore scientific concepts about nature, energy, and living things.", cover: "https://placehold.co/160x200/2196F3/white?text=Biology" },
  { id: 5, subject: "English",     grade: "Grade 10", title: "English Book Grade 10",     description: "Improve reading, writing, and grammar concepts in English.", cover: "https://placehold.co/160x200/009688/white?text=English" },
  { id: 6, subject: "Arabic",      grade: "Grade 10", title: "Arabic Book Grade 10",      description: "Develop reading, writing, and grammar skills in Arabic.", cover: "https://placehold.co/160x200/795548/white?text=Arabic" },
  { id: 7, subject: "History",     grade: "Grade 10", title: "History Book Grade 10",     description: "Discover important historical events and civilizations.", cover: "https://placehold.co/160x200/607D8B/white?text=History" },
  { id: 8, subject: "Geography",   grade: "Grade 10", title: "Geography Book Grade 10",   description: "Learn about countries, climates, and the Earth's natural features.", cover: "https://placehold.co/160x200/8BC34A/white?text=Geography" },
];

const _lessons = [
  { id: 1, bookId: 3, subject: "Chemistry", grade: "Grade 10", title: "Atomic Structure",        duration: "45 min", watched: false },
  { id: 2, bookId: 3, subject: "Chemistry", grade: "Grade 10", title: "Atom Theory",             duration: "38 min", watched: false },
  { id: 3, bookId: 3, subject: "Chemistry", grade: "Grade 10", title: "Energy Levels Of The Atom", duration: "50 min", watched: true },
  { id: 4, bookId: 4, subject: "Biology",   grade: "Grade 10", title: "Cell Installation",       duration: "40 min", watched: false },
  { id: 5, bookId: 4, subject: "Biology",   grade: "Grade 10", title: "Installation Of Microscopes", duration: "35 min", watched: false },
  { id: 6, bookId: 4, subject: "Biology",   grade: "Grade 10", title: "Plant Cell Structure",    duration: "42 min", watched: true },
  { id: 7, bookId: 4, subject: "Biology",   grade: "Grade 10", title: "Animal Cell Structure",   duration: "44 min", watched: false },
];

const _assignments = [
  { id: 1, bookId: 6, subject: "Arabic",   grade: "Grade 10", taskNumber: 1, question: "Extract from the text a word that indicates (value/importance/problem). What is your opinion on the topic that the writer addressed? Why? And how can the ideas of the text be applied in reality?", completed: true },
  { id: 2, bookId: 2, subject: "Physics",  grade: "Grade 10", taskNumber: 2, question: "What is the definition of (speed/force/energy)? What is the difference between velocity vector and speed vector? And what is the relationship between force and acceleration?", completed: false },
  { id: 3, bookId: 7, subject: "History",  grade: "Grade 10", taskNumber: 3, question: "What is meant by history? Why is history important in human life? Who are the prominent figures mentioned in the lesson? What was their role? What were the most important events that occurred during this period?", completed: true },
];

const _notifications = [
  { id: 1, from: "Sara Ahmad",        avatar: "https://i.pravatar.cc/150?img=1", message: "Login successful. Welcome back!",                          time: "35 min ago",   read: true },
  { id: 2, from: "Ahmed Al-Najjar",   avatar: "https://i.pravatar.cc/150?img=3", message: "A new lesson has been added to your course.",               time: "1 day ago",    read: true },
  { id: 3, from: "Youssef Al-Kilani", avatar: "https://i.pravatar.cc/150?img=5", message: "Don't forget to complete your pending lessons",             time: "5 day ago",    read: false },
  { id: 4, from: "Miriana Muhammad",  avatar: null,                              message: "Network error. Check your internet connection",             time: "1 week ago",   read: false },
  { id: 5, from: "Dima Mahmoud",      avatar: null,                              message: "Reminder: Your exam is scheduled for tomorrow.",            time: "2 week ago",   read: true },
  { id: 6, from: "Fares Hamdan",      avatar: null,                              message: "Your account has been created successfully",                time: "1 month ago",  read: false },
  { id: 7, from: "Omar Al-Shami",     avatar: null,                              message: "Your message has been sent successfully",                   time: "3 month ago",  read: true },
  { id: 8, from: "Yara Hassan",       avatar: null,                              message: "Your assignment has been graded. Check your results",       time: "5 month ago",  read: false },
  { id: 9, from: "Amira Malik",       avatar: null,                              message: "You have successfully completed this lesson. Great job",    time: "9 month ago",  read: true },
];

const _contacts = [
  { id: 2, name: "Sara Ahmad",         avatar: "https://i.pravatar.cc/150?img=1", lastMessage: "Hi, How are you?",    lastTime: "Today",      unread: 2, online: true },
  { id: 3, name: "Ahmed Al-Najjar",    avatar: "https://i.pravatar.cc/150?img=3", lastMessage: "maybe a question?",   lastTime: "yesterday",  unread: 0, online: false },
  { id: 4, name: "Youssef Al-Kilani",  avatar: "https://i.pravatar.cc/150?img=5", lastMessage: "I need an answer",    lastTime: "30/1/2026",  unread: 0, online: false },
  { id: 5, name: "Fares Hamdan",       avatar: null,                              lastMessage: "Hello !!",            lastTime: "11/1/2026",  unread: 0, online: true },
  { id: 6, name: "Miriana Muhammad",   avatar: null,                              lastMessage: "can i ask a question", lastTime: "11/1/2026", unread: 3, online: false },
];

const _chatHistory = {
  2: [
    { from: 2, text: "Hi, How are you?",     time: "2:10 pm", date: "Yesterday" },
    { from: 1, text: "Hi, Im thanks",        time: "2:10 pm", date: "Yesterday" },
    { from: 2, text: "Can I ask question?",  time: "2:22 pm", date: "Yesterday" },
    { from: 1, text: "Yes, you can ask",     time: "3:31 pm", date: "Yesterday" },
    { from: 2, text: "Do you want to ask",   time: "5:31 pm", date: "Today" },
    { from: 1, text: "Yes, sure",            time: "5:00 pm", date: "Today" },
  ],
};

const _quizzes = [
  {
    id: 1, bookId: 3, subject: "Chemistry", grade: "Grade 10", title: "Atomic Structure Quiz",
    questions: [
      { q: "What is the atomic number of Carbon?", options: ["4","6","8","12"], answer: 1 },
      { q: "Who proposed the planetary model of the atom?", options: ["Bohr","Rutherford","Dalton","Thomson"], answer: 1 },
    ],
  },
];

// ─── Mock token storage ───────────────────────────────────────────────────────
let _token = localStorage.getItem("ls_token") || null;
let _currentUser = null;

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

// ─── Mock API implementation ─────────────────────────────────────────────────
const mockApi = {
  // AUTH
  async login(email, password) {
    await delay();
    const user = _users.find((u) => u.email === email && u.password === password);
    if (!user) throw new Error("Invalid email or password");
    _token = "mock_token_" + user.id;
    _currentUser = user;
    localStorage.setItem("ls_token", _token);
    const { password: _, ...userSafe } = user;
    return { token: _token, user: userSafe };
  },

  async getMe() {
    await delay(100);
    if (!_token) throw new Error("Not authenticated");
    const id = parseInt(_token.replace("mock_token_", ""));
    const user = _users.find((u) => u.id === id);
    if (!user) throw new Error("User not found");
    const { password: _, ...userSafe } = user;
    return userSafe;
  },

  logout() {
    _token = null;
    _currentUser = null;
    localStorage.removeItem("ls_token");
  },

  // BOOKS
  async getBooks({ grade, subject } = {}) {
    await delay();
    let result = [..._books];
    if (grade)   result = result.filter((b) => b.grade === grade);
    if (subject) result = result.filter((b) => b.subject === subject);
    return result;
  },

  async getBook(id) {
    await delay(100);
    const book = _books.find((b) => b.id === parseInt(id));
    if (!book) throw new Error("Book not found");
    return book;
  },

  // LESSONS
  async getLessons({ bookId, subject, grade } = {}) {
    await delay();
    let result = [..._lessons];
    if (bookId)  result = result.filter((l) => l.bookId === parseInt(bookId));
    if (subject) result = result.filter((l) => l.subject === subject);
    if (grade)   result = result.filter((l) => l.grade === grade);
    return result;
  },

  // ASSIGNMENTS
  async getAssignments({ subject, grade } = {}) {
    await delay();
    let result = [..._assignments];
    if (subject) result = result.filter((a) => a.subject === subject);
    if (grade)   result = result.filter((a) => a.grade === grade);
    return result;
  },

  async completeAssignment(id) {
    await delay(200);
    const a = _assignments.find((a) => a.id === parseInt(id));
    if (!a) throw new Error("Assignment not found");
    a.completed = true;
    return a;
  },

  // NOTIFICATIONS
  async getNotifications() {
    await delay();
    return [..._notifications];
  },

  async markAllRead() {
    await delay(200);
    _notifications.forEach((n) => (n.read = true));
    return { success: true };
  },

  async markRead(id) {
    await delay(100);
    const n = _notifications.find((n) => n.id === parseInt(id));
    if (n) n.read = true;
    return n;
  },

  // MESSAGES
  async getContacts() {
    await delay();
    return [..._contacts];
  },

  async getChatHistory(contactId) {
    await delay();
    return _chatHistory[contactId] || [];
  },

  async sendMessage(contactId, text) {
    await delay(200);
    const msg = { from: 1, text, time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }), date: "Today" };
    if (!_chatHistory[contactId]) _chatHistory[contactId] = [];
    _chatHistory[contactId].push(msg);
    return msg;
  },

  // QUIZZES
  async getQuizzes({ bookId, subject } = {}) {
    await delay();
    let result = [..._quizzes];
    if (bookId)  result = result.filter((q) => q.bookId === parseInt(bookId));
    if (subject) result = result.filter((q) => q.subject === subject);
    return result;
  },
};

// ─── Real API implementation ─────────────────────────────────────────────────
const realApi = {
  _headers() {
    const token = localStorage.getItem("ls_token");
    return { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) };
  },

  async _fetch(method, path, body) {
    const res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: this._headers(),
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Request failed");
    return data;
  },

  async login(email, password) {
    const data = await this._fetch("POST", "/auth/login", { email, password });
    localStorage.setItem("ls_token", data.token);
    return data;
  },
  getMe()                          { return this._fetch("GET", "/auth/me"); },
  logout()                         { localStorage.removeItem("ls_token"); },
  getBooks(params = {})            { return this._fetch("GET", "/books?" + new URLSearchParams(params)); },
  getBook(id)                      { return this._fetch("GET", `/books/${id}`); },
  getLessons(params = {})          { return this._fetch("GET", "/lessons?" + new URLSearchParams(params)); },
  getAssignments(params = {})      { return this._fetch("GET", "/assignments?" + new URLSearchParams(params)); },
  completeAssignment(id)           { return this._fetch("PATCH", `/assignments/${id}/complete`); },
  getNotifications()               { return this._fetch("GET", "/notifications"); },
  markAllRead()                    { return this._fetch("PATCH", "/notifications/read-all"); },
  markRead(id)                     { return this._fetch("PATCH", `/notifications/${id}/read`); },
  getContacts()                    { return this._fetch("GET", "/messages"); },
  getChatHistory(chatId)           { return this._fetch("GET", `/messages/${chatId}`); },
  sendMessage(chatId, text)        { return this._fetch("POST", `/messages/${chatId}`, { text }); },
  getQuizzes(params = {})          { return this._fetch("GET", "/quizzes?" + new URLSearchParams(params)); },
};

// ─── Export: swap USE_MOCK to false for production ───────────────────────────
const api = USE_MOCK ? mockApi : realApi;
export default api;

// ─── Named exports for convenience ───────────────────────────────────────────
export const { login, logout, getMe, getBooks, getBook, getLessons,
               getAssignments, completeAssignment, getNotifications,
               markAllRead, markRead, getContacts, getChatHistory,
               sendMessage, getQuizzes } = api;
