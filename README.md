# 🏥 MediaFlow — Client (Patient Portal)

A patient-facing web portal that allows users to securely sign up/log in, book appointments with doctors, and leave ratings & reviews after their visits. Built with **Angular** and **Tailwind CSS**, connecting to a dedicated **Express.js/MongoDB** backend via a secure JWT-based API.

**🔗 Live Demo:** [media-flow-client.vercel.app](https://media-flow-client.vercel.app)

---

## ✨ Features

- 🔐 **Patient Authentication** — Secure sign up, login, and session management using JWT.
- 📅 **Appointment Booking** — Browse available doctors and book appointments directly from the portal.
- ⭐ **Doctor Ratings & Reviews** — Patients can rate doctors and leave reviews based on their experience.
- 📱 **Responsive UI** — Clean, mobile-friendly interface built with Tailwind CSS.
- 🔗 **API-Driven** — Communicates with a separate backend service for all data operations.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | [Angular 17+](https://angular.io/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Backend | [Express.js](https://expressjs.com/) *(separate repository)* |
| Database | [MongoDB](https://www.mongodb.com/) |
| Auth | [JWT](https://jwt.io/) (JSON Web Tokens) |
| Deployment | [Vercel](https://vercel.com/) |

> ℹ️ This repository contains the **frontend (client)** only. The backend API is maintained in a separate repository.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Angular CLI](https://angular.io/cli)
- The MediaFlow backend running locally or deployed (see backend repo)

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/mediaflow-client.git
cd mediaflow-client

# Install dependencies
npm install
```

### Environment Setup

Configure the API base URL in `src/environments/environment.ts`:

```ts
export const environment = {
  production: false,
  apiUrl: "http://localhost:3000/api" // point to your backend URL
};
```

### Run Locally

```bash
ng serve
```

Then navigate to `http://localhost:4200/`.

### Build for Production

```bash
ng build --configuration production
```
