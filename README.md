# PersonalM-blog-web

Official web application and author administrative dashboard for the **PersonalM Blog & Novel Platform**, designed for author **Hannah Montemayor**.

Part of the **PersonalM** multi-client ecosystem:
- **`PersonalM-blog-api`**: Central REST API & PostgreSQL database service
- **`PersonalM-blog-web`**: (This repo) Next.js 15 web client & admin portal
- **`PersonalM-blog-mobile`**: React Native (Expo) app for iOS & Android

---

## 🏗️ Architecture

```mermaid
flowchart LR
    Browser["Client Web Browser"] --> Web["PersonalM-blog-web\n(Next.js 15 + Tailwind CSS)"]
    Web -->|REST API / JSON| API["PersonalM-blog-api\n(Express + TypeScript)"]
    API --> Postgres[("PostgreSQL Database")]
```

---

## 🚀 Features

### Public Portal
- **Hero & Author Bio**: Introduction banner with dynamic author avatar and bio description.
- **Serialized Stories**: Novel and series catalog with cover art, genre tags, and chapter counts.
- **Chapter Reader**: Distraction-free reading experience with Prev / Next chapter navigation, table of contents, and responsive typography.
- **Editorial Blog**: Curated essays and articles with category filtering (`Blog`, `Random`, `Both`).
- **Random Thoughts**: Stream of brief reflections and musings.
- **Visitor Analytics**: Automatic view counting for posts and serialized story chapters.

### Admin Dashboard (`/admin`)
- **Protected Access**: Route guards redirecting unauthenticated visitors to `/login`.
- **Overview Dashboard**: High-level metrics for published stories, blog posts, random thoughts, drafts, and total reads.
- **Post Manager**: Full CRUD for articles with category assignment and Draft vs. Published states.
- **Stories & Chapters Manager**: Create novels, upload covers, add new chapters, and manage parts.
- **Author Profile**: Edit name, bio, login username, password, and public avatar photo.

---

## 🛠️ Getting Started

### 1. Prerequisites
- **Node.js**: v18.18+ or v20+ (tested on Node.js 24)
- **Central API**: Running instance of `PersonalM-blog-api` (default: `http://localhost:5000`)

### 2. Install Dependencies
```bash
git clone https://github.com/paulrndp/PersonalM-blog-web.git
cd PersonalM-blog-web
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```
Configure your environment:
```env
NEXT_PUBLIC_API_URL="http://localhost:5000/api/v1"
DATABASE_URL="postgresql://postgres:password@localhost:5432/hannahm_db?schema=public"
AUTH_SECRET="your-super-secret-random-32-character-key"
PORT=3000
```

### 4. Run the Application

#### Development Mode:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Production Build & Start:
```bash
npm run build
npm run start
```

---

## 🔐 Default Admin Credentials

- **Login URL**: [http://localhost:3000/login](http://localhost:3000/login)
- **Username**: `admin`
- **Password**: `password`

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).
