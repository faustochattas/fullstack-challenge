# Fullstack Challenge (React + Node + SQL Server)

## Tech Stack
- Frontend: React
- Backend: Node.js + Express + TypeScript
- DB: SQL Server (Docker)
- Auth: JWT stored in HttpOnly cookie

## Requirements Covered
- User register / login
- JWT auth (HttpOnly cookie)
- Protected CRUD for Tasks
- SQL Server integration

---

## Run Locally

### 1) Start SQL Server (Docker)
```bash
docker run -d \
  --name sqlserver-fullstack \
  -e ACCEPT_EULA=Y \
  -e MSSQL_SA_PASSWORD=Password123! \
  -p 1433:1433 \
  mcr.microsoft.com/mssql/server:2022-latest
