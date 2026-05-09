# 🎓 LearnSmart API

مشروع تخرج - Backend كامل للمنصة التعليمية

---

## 📁 الملفات

| الملف | الوصف |
|-------|-------|
| `server.js` | Node.js + Express backend كامل |
| `mockApi.js` | Mock API للـ React (بدون server) |

---

## 🚀 التشغيل السريع

### للتطوير (Mock - بدون server)
```js
// 1. انسخ ملف mockApi.js في مجلد src/
// 2. استخدمه هيك:
import api from './mockApi'

const books = await api.getBooks()
const assignments = await api.getAssignments()
```

### للـ Backend الحقيقي
```bash
npm install
node server.js
# Server running on http://localhost:5000
```

---

## 🔌 API Endpoints

### 🔐 Auth
| Method | URL | Description |
|--------|-----|-------------|
| POST | `/api/auth/login` | تسجيل الدخول |
| GET  | `/api/auth/me` | بيانات المستخدم الحالي |

**Login Body:**
```json
{ "email": "sara@learnsmart.com", "password": "123456" }
```

**Login Response:**
```json
{
  "token": "eyJ...",
  "user": { "id": 1, "name": "Sara Ahmad", "email": "...", "grade": "Grade 10" }
}
```

---

### 📚 Books
| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/books` | كل الكتب |
| GET | `/api/books?grade=Grade+10` | فلتر حسب الصف |
| GET | `/api/books?subject=Chemistry` | فلتر حسب المادة |
| GET | `/api/books/:id` | كتاب محدد |

---

### 🎥 Lessons
| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/lessons` | كل الدروس |
| GET | `/api/lessons?bookId=3` | دروس كتاب معين |
| GET | `/api/lessons?subject=Chemistry` | فلتر حسب المادة |
| GET | `/api/lessons/:id` | درس محدد |

---

### 📝 Assignments (يحتاج token)
| Method | URL | Description |
|--------|-----|-------------|
| GET   | `/api/assignments` | واجبات المستخدم |
| PATCH | `/api/assignments/:id/complete` | تمييز كمنجز |

---

### 🔔 Notifications (يحتاج token)
| Method | URL | Description |
|--------|-----|-------------|
| GET   | `/api/notifications` | كل الإشعارات |
| PATCH | `/api/notifications/read-all` | تمييز الكل كمقروء |
| PATCH | `/api/notifications/:id/read` | تمييز إشعار محدد |

---

### 💬 Messages (يحتاج token)
| Method | URL | Description |
|--------|-----|-------------|
| GET  | `/api/messages` | قائمة المحادثات |
| GET  | `/api/messages/:chatId` | رسائل محادثة معينة |
| POST | `/api/messages/:chatId` | إرسال رسالة جديدة |

---

### 📋 Quizzes
| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/quizzes` | كل الكويزات |
| GET | `/api/quizzes?bookId=3` | كويزات كتاب معين |
| GET | `/api/quizzes/:id` | كويز محدد |

---

## 📱 استخدام في React

### إضافة الـ Token للـ Header
```js
const response = await fetch('http://localhost:5000/api/assignments', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('ls_token')}`
  }
})
```

### مثال كامل: صفحة الكتب
```jsx
import { useEffect, useState } from 'react'
import api from './mockApi' // غير لـ realApi عند التسليم

export default function BooksPage() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    api.getBooks({ grade: 'Grade 10' }).then(setBooks)
  }, [])

  return (
    <div className="grid grid-cols-4 gap-4">
      {books.map(book => (
        <div key={book.id} className="card">
          <img src={book.cover} alt={book.title} />
          <h3>{book.title}</h3>
          <p>{book.description}</p>
        </div>
      ))}
    </div>
  )
}
```

### مثال: تسجيل الدخول
```jsx
import api from './mockApi'

async function handleLogin(e) {
  e.preventDefault()
  try {
    const { token, user } = await api.login(email, password)
    // token محفوظ تلقائياً في localStorage
    navigate('/home')
  } catch (err) {
    setError(err.message)
  }
}
```

### مثال: إنهاء واجب
```jsx
import api from './mockApi'

async function handleComplete(assignmentId) {
  await api.completeAssignment(assignmentId)
  setAssignments(prev => 
    prev.map(a => a.id === assignmentId ? { ...a, completed: true } : a)
  )
}
```

---

## 🔄 التبديل من Mock لـ Real API

في ملف `mockApi.js`، غير السطر الأول فقط:
```js
const USE_MOCK = false; // كان true
```

---

## 👥 المستخدمون للتجربة

| Email | Password | Name |
|-------|----------|------|
| sara@learnsmart.com | 123456 | Sara Ahmad |
| ahmed@learnsmart.com | 123456 | Ahmed Al-Najjar |
