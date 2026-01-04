# Video Sharing SASS Application

A modern full-stack **video sharing platform** built with **Next.js**, combining web and desktop experiences for creators and viewers.  
It allows users to **record, upload, share, and manage videos** seamlessly — directly from their browser or desktop app.

---

##  Tech Stack

###  Frontend
- **Next.js** (App Router)
- **React 18**
- **Tailwind CSS** 

###  Backend
- **Next.js API Routes** (Serverless backend)
- **Express.js** (for handling real-time video chunk processing)
- **Socket.IO** (video chunk transfer and streaming)
- **Prisma ORM** (for database access)
- **Neon** (PostgreSQL cloud database)
- **AWS S3** (video storage)

###  Desktop App
- **Electron.js**
- Integrated with **Socket.IO** and **MediaRecorder API**
- Supports:
  -  Screen recording  
  - 🎥 Webcam recording

---

##  Features

###  User System
- **Free User**
  - Upload limited videos
  - Basic workspace and sharing features

- **PRO User**
  - Unlimited uploads
  - Advanced workspace tools
  - Priority video processing

---

###  Member Workspace
Each user has a personal workspace to:
- Upload, organize, and manage videos
- Share videos with others
- Track upload status and processing

---

###  Video Recording & Upload Flow

#### 1. **Recording (Desktop App)**
- Electron app captures video via **screen** or **webcam**
- Video is recorded in **chunks**
- Each chunk is sent to the Express.js server in real time via **Socket.IO**

#### 2. **Chunk Processing (Express Server)**
- Express server receives video chunks
- Combines and processes them into a complete video file
- Sends the final processed video to the **Next.js API** endpoint

#### 3. **Storage (Next.js API)**
- Next.js backend receives processed video
- Uploads it securely to **AWS S3**
- Stores metadata and URL in **Neon (PostgreSQL)** via **Prisma**

---

## Database Schema (Prisma)
------------------------------------------------------------
## Architecture Of The Project
                ┌────────────────────────┐
                │      Electron App       │
                │  - Screen/Webcam record │
                │  - Sends video chunks   │
                └────────────┬────────────┘
                             │
                             ▼
                ┌────────────────────────┐
                │      Express Server     │
                │  - Handles chunks       │
                │  - Combines video files │
                └────────────┬────────────┘
                             │
                             ▼
                ┌────────────────────────┐
                │       Next.js API       │
                │  - Receives final video │
                │  - Uploads to S3        │
                │  - Stores metadata      │
                └────────────┬────────────┘
                             │
                             ▼
                ┌────────────────────────┐
                │        AWS S3          │
                │   (video storage)      │
                └────────────┬────────────┘
                             │
                             ▼
                ┌────────────────────────┐
                │         Neon DB         │
                │    (video metadata)     │
                └────────────────────────┘
---------------------------------------------------------------------
 Future Enhancements

Video analytics (views, likes, comments)

Real-time streaming

Thumbnail and preview generation

Admin dashboard

Mobile recording support

💡 Author

Shovan Mazumder
 Software Engineer | Full Stack Developer


<img width="1907" height="862" alt="image" src="https://github.com/user-attachments/assets/105f20c0-c680-49b5-a9c5-96a94861edb1" />

<img width="1907" height="858" alt="image" src="https://github.com/user-attachments/assets/ae4e99dc-e750-42d0-b032-b2ce98df36db" />

<img width="880" height="717" alt="image" src="https://github.com/user-attachments/assets/a7d8a3cb-4d68-4367-b6e2-f6993699d443" />





