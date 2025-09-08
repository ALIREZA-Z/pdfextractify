

# pdfextractify 🚀

![Python](https://img.shields.io/badge/python-3.9+-blue)
![Django](https://img.shields.io/badge/django-4.2-green)
![Next.js](https://img.shields.io/badge/next.js-13-black)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

**pdfextractify** is a full-stack web app for uploading PDFs, extracting text/data, and displaying results.  
Backend: **Django REST Framework** | Frontend: **Next.js** | Lottie animations for UI feedback.

---

## 🔹 Features

- Upload PDFs and store metadata  
- Extract text and tables from PDFs  
- Display extraction results on the frontend  
- Beautiful animations with Lottie  
- Scalable backend with domain-based apps (`users`, `documents`, `extraction`)  

---

## 🗂 Project Structure



## ⚡ Quick Start

### Backend (Django REST Framework)

```bash
# navigate to backend
cd backend

# activate virtual environment
# macOS/Linux
python -m venv venv
source venv/bin/activate
# Windows
venv\Scripts\activate

# install dependencies
pip install -r requirements.txt

# apply migrations
python manage.py migrate

# run server
python manage.py runserver

--

## Frontend

# navigate to frontend
cd frontend

# install dependencies
npm install

# run dev server
npm run dev


--
docker-compose up --build

# if you have already the docker container
# keep in your mind for most of frontend modification you need to restart frontend server
docker-compose up -d 