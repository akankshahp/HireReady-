# HireReady — AI Resume Analyzer

An AI-powered resume analyzer that scores resumes against a job description, highlights strengths, gaps, and suggests improvements.

---

## Features
- Paste or upload resume 
- Paste target job description
- AI analysis: match score, keyword coverage, strengths, gaps, actionable suggestions
- Clean, modern UI (React + Vite + TypeScript)

---

## 🛠️ Tech Stack

| Layer      | Choice                            |
| ---------- | --------------------------------- |
| Framework  | React 18 + TypeScript             |
| Build tool | Vite 5                            |
| AI         | OpenAI Chat Completions (`gpt-4o-mini`) |
| Styling    | Hand-rolled CSS (dark theme)      |

---

## ⚡ Quick Start

### 1. Install

```bash
npm install
```

### 2. Add your OpenAI API key

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Then edit `.env`:

```
VITE_OPENAI_API_KEY=sk-your-real-key-here
```

### 3. Run the dev server

```bash
npm run dev
```

Open **http://localhost:5173**.

### 4. Build for production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
hireready/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .env.example
└── src/
    ├── main.tsx        
    ├── App.tsx         
    ├── analyzer.ts     
    ├── types.ts        
    └── styles.css      
```

---

## 👩‍💻 Author

```
Akanksha H P
BE Computer Science Engineering Student
```