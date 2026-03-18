# Jobseekers

Jobseekers is a full-stack job board application inspired by platforms like Indeed.

It allows companies to create and manage job listings, and users to search for roles, apply, and track applications.

**Live Demo**: [https://jobseekerss.netlify.app](https://jobseekerss.netlify.app/)  
**Backend API**: [https://github.com/Gilson96/jobseekers-api](https://github.com/Gilson96/jobseekers-api/)

---

## Main features:

- Roles access (**Guest / User / Admin**)
- Many-to-many relationships,
- JWT authentication
- Full CRUD operations across jobs, companies, skills, and applications
- Application workflows: job posting, applying for jobs, and application tracking
- Deployed frontend + backend

---

## Demo Credentials

> Demo login emails are shown directly on the login screen.

---

## Technologies Used

**Frontend**
- React
- TypeScript
- React Router
- TanStack React Query
- Zustand
- Tailwind CSS
- shadcn/ui

**Tooling & Deployment**
- Axios
- Netlify
  
---

## Project Screenshot

![project screenshot](https://github.com/Gilson96/jobseekers/blob/master/src/assets/projectScreenshot.png?raw=true)

---

## What each user can do:

**Guest Mode**

Guests can:

- Browse a list of available jobs
- Search jobs by job title, company name, or required skills
- View job details
- Apply for jobs without creating an account
  
**User Mode**

Registered users can do everything a guest can, plus:

- Save jobs for later
- View and track submitted applications
- Edit personal details
- Manage personal skills
  
**Admin Mode**

Admins can:

- View all posted jobs
- Create and edit jobs
- Edit company and job details
- Manage job skills
- See all applicants for each job
- Remove jobs from the platform

---

## How to Run Locally

```bash
git clone https://github.com/Gilson96/jobseekers.git
cd jobseekers
npm install

# Start the development server
npm run dev
```

## Contact

LinkedIn:  https://www.linkedin.com/in/gilson-de-almeida
Email: grafael99@gmail.com
