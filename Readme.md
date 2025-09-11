# Chattingo 🗨️  
_A real-time chat application with React, Spring Boot, MySQL, Docker, Jenkins CI/CD, and Nginx reverse proxy._

![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![Jenkins](https://img.shields.io/badge/Jenkins-D24939?logo=jenkins&logoColor=white)
![Spring Boot](https://img.shields.io/badge/SpringBoot-6DB33F?logo=springboot&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)

[![Docker Hub](https://img.shields.io/badge/DockerHub-chattingo-blue?logo=docker)](https://hub.docker.com/)  
[![Jenkins Pipeline](https://img.shields.io/badge/Jenkins-Pipeline-green?logo=jenkins)](#cicd-with-jenkins)

---

## 📖 Table of Contents
- [Overview](#-overview)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Nginx Setup](#-nginx-setup)
- [CI/CD with Jenkins](#-cicd-with-jenkins)
- [Accessing the App](#-accessing-the-app)
- [Tech Stack](#-tech-stack)

---

## 🌟 Overview
Chattingo is a **real-time chat application** with features like:
- User authentication 🔐  
- Real-time messaging 💬  
- WebSocket support ⚡  
- Dockerized deployment 🐳  
- CI/CD pipeline with Jenkins 🚀  

---

## 🏗️ Architecture

React (Frontend) → Nginx (Reverse Proxy) → Spring Boot (Backend) → MySQL

WebSocket Proxy

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/pritee-c/chattingo.git
cd chattingo
```

2. Build & Run with Docker

```
docker-compose up -d --build
```

This will start:

Frontend → React app

Backend → Spring Boot (on port 8081)

Database → MySQL

Nginx → Reverse proxy

🌐 Nginx Setup

We use Nginx for:

Reverse proxying /api/ requests → backend
WebSocket handling on /ws/
Injecting default placeholders

```
server {
    listen 80;

    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri /index.html;
    }

    location /api/ {
        proxy_pass http://chattingo_backend:8081/auth/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Authorization $http_authorization;


    }

    location /ws/ {
        proxy_pass http://chattingo_backend:8081;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Authorization $http_authorization;
    }
}
```
⚙️ CI/CD with Jenkins

The Jenkins pipeline automates:

1. Git clone
2. Docker build (frontend & backend)
3. Filesystem scan with Trivy
4. Image scan with Trivy
5. Push images to Docker Hub
6. Update docker-compose.yml
7. Deploy with docker-compose


🛠️ Tech Stack

Frontend → React
Backend → Spring Boot
Database → MySQL
Reverse Proxy → Nginx
Containerization → Docker + Docker Compose
CI/CD → Jenkins + Trivy + Docker Hub

📸 Screenshots

<img width="1913" height="1010" alt="image" src="https://github.com/user-attachments/assets/2477ca04-f673-4317-8d9c-53cdb4e21338" />

<img width="1438" height="770" alt="image" src="https://github.com/user-attachments/assets/67f5cffe-338d-4c50-a5fd-f76116379370" />


