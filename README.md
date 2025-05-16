# 🚀 GitHub Clone – Full Stack Version Control Platform

A powerful, full-stack GitHub-inspired application built with the **MERN** stack. This clone replicates core GitHub features including repository management, version control commands, user authentication, and issue tracking. It also includes a **custom CLI tool** for Git-like operations.

---

## 📌 Tech Stack

| Layer       | Technology                     |
|-------------|--------------------------------|
| Frontend    | React, HTML, CSS, JS, Bootstrap |
| Backend     | Node.js, Express.js, Yargs     |
| Database    | MongoDB Atlas                  |
| Testing     | Jest                           |
| Deployment  | AWS EC2 (Backend), Amplify (Frontend), S3 |

---

## 🧩 Key Features

| Feature                          | Description                                                                 |
|----------------------------------|-----------------------------------------------------------------------------|
| 🛠️ CLI Tool                     | Git-like commands: `init`, `add`, `commit`, `push`, `pull`, `revert`       |
| 🔐 Authentication                | Secure user login/signup using JWT                                         |
| 📁 Repository Management         | Create, manage, and view code repositories                                 |
| 🐛 Issue Tracker                 | Create and track issues within each repo                                   |
| 🌐 RESTful APIs                  | Modular routes for users, repositories, and issues                         |
| ☁️ Cloud Deployment              | Scalable frontend/backend hosting via AWS EC2, Amplify, and S3             |

---

## 🎮 CLI Command Reference

```bash
init                # Initialize a new repository
add <file.txt>      # Stage a file for commit
commit "message"    # Commit staged files with a message
push                # Push commits to remote (MongoDB)
pull                # Pull latest commits
revert              # Revert to previous commit state
