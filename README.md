# RastaBike

RastaBike is a polished browser mock for an electric bike catalog. It includes a public website, English and Hebrew pages, product detail pages, a contact form mock, and a local admin analytics mock.

The easiest way to run it is with Docker. You do not need to install Node.js, Next.js, or any JavaScript tools on your computer.


## What You Get

- Home page with RastaBike branding.
- Product catalog with filters.
- Product detail pages.
- English and Hebrew routes.
- Contact page with phone, WhatsApp, Facebook, and a mock form.
- Mock admin dashboard.
- Browser-only analytics stored in localStorage.
- Docker setup for one-command startup.

## Quick Start With Docker

```bash
docker compose up --build
```

Open the app:
=======

## What You Get

- Home page with RastaBike branding.
- Product catalog with filters.
- Product detail pages.
- English and Hebrew routes.
- Contact page with phone, WhatsApp, Facebook, and a mock form.
- Mock admin dashboard.
- Browser-only analytics stored in localStorage.
- Docker setup for one-command startup.

## Quick Start

For a brand-new computer, do these steps:

1. Install Docker.
2. Install Git.
3. Download this project with Git.
4. Start the app with Docker.

The project link is:

```text
https://github.com/asdumitrescu/rastabike.git
```

After setup, the app opens here:


```text
http://localhost:3000/en
```


Hebrew version:

```text
http://localhost:3000/he
```

Stop the app:

```bash
docker compose down
```

## Install Docker

Docker lets you run the app in a container. Think of the container as a small box that already has everything the app needs.

### Linux

1. Install Docker Desktop for Linux:
   https://docs.docker.com/desktop/setup/install/linux/
2. Open Docker Desktop and make sure it is running.
3. Open a terminal and check:

```bash
docker --version
docker compose version
```

If both commands print versions, Docker is ready.

### Windows

=======
## Install Docker

Docker lets you run the app in a container. Think of the container as a small box that already has everything the app needs.

### Docker On Linux

1. Install Docker Desktop for Linux:
   https://docs.docker.com/desktop/setup/install/linux/
2. Open Docker Desktop and make sure it is running.
3. Open a terminal and check:

```bash
docker --version
docker compose version
```

If both commands print versions, Docker is ready.

### Docker On Windows


1. Install Docker Desktop for Windows:
   https://docs.docker.com/desktop/setup/install/windows-install/
2. During installation, allow WSL 2 if Docker asks.
3. Restart the computer if Docker asks.
4. Open Docker Desktop and wait until it says Docker is running.
5. Open PowerShell and check:

```powershell
docker --version
docker compose version
```

If both commands print versions, Docker is ready.


=======
## Install Git

Git is the tool used to download the project from GitHub.

### Git On Linux

Ubuntu or Debian:

```bash
sudo apt update
sudo apt install git
```

Fedora:

```bash
sudo dnf install git
```

Arch Linux:

```bash
sudo pacman -S git
```

Check that Git works:

```bash
git --version
```

### Git On Windows

1. Download Git for Windows:
   https://git-scm.com/download/win
2. Run the installer.
3. The default installer options are fine.
4. Open PowerShell and check:

```powershell
git --version
```

If it prints a version, Git is ready.

## Download The Project

Choose a folder where you want to save the project, then run the clone command.


## Run The App On Linux

Open a terminal:

```bash

=======
cd ~

git clone https://github.com/asdumitrescu/rastabike.git
cd rastabike
docker compose up --build
```

Then open:

```text
http://localhost:3000/en
```

## Run The App On Windows

Open PowerShell:

```powershell

=======
cd $HOME

git clone https://github.com/asdumitrescu/rastabike.git
cd rastabike
docker compose up --build
```

Then open:

```text
http://localhost:3000/en
```


=======
Hebrew version:

```text
http://localhost:3000/he
```

Stop the app:

```bash
docker compose down
```

The same stop command works in Windows PowerShell.


## If Port 3000 Is Already Busy

Use another port, for example `3002`.

Linux/macOS:

```bash
HOST_PORT=3002 docker compose up --build
```

Windows PowerShell:

```powershell
$env:HOST_PORT=3002
docker compose up --build
```

Then open:

```text
http://localhost:3002/en
```

## Admin Mock Login

Open:

```text
http://localhost:3000/en/admin/login
```

Use:

```text
Username: admin
Password: rastabike2024
```

If you are using another port, change the URL. Example:

```text
http://localhost:3002/en/admin/login
```

## Useful Docker Commands

Start and show logs:

```bash
docker compose up
```

Start in the background:

```bash
docker compose up -d
```

Stop:

```bash
docker compose down
```

Rebuild after code changes:

```bash
docker compose up --build
```

See running containers:

```bash
docker ps
```

## Local Development Without Docker

This project uses Next.js 16, which needs Node.js `20.9.0` or newer. Node 22 is recommended.

```bash
npm ci
npm run dev
```

Open:

```text
http://localhost:3000/en
```

## Project Structure

```text
src/app/[locale]        App pages for English and Hebrew routes
src/components          Shared UI and layout components
src/data/products.ts    Hardcoded product catalog data
src/lib/analytics       Browser-only mock analytics
messages                English and Hebrew translations
public/images           Website and product images
Dockerfile              Production container image
docker-compose.yml      Easy local Docker startup
```

## Mock Status

This app is complete enough for demos, browser testing, and design review.

It is not a production ecommerce system yet:

- There is no real database.
- The contact form does not send email.
- Admin login is client-side only and not secure for production.
- Analytics are stored in the visitor browser, not on a server.
- There is no payment or checkout flow.

## Verification

The Docker image should build and serve the app at:

```text
http://localhost:3000/en
```

The app should also render:

```text
http://localhost:3000/he
http://localhost:3000/en/catalog
http://localhost:3000/en/catalog/rasta-cruiser-750
http://localhost:3000/en/contact
http://localhost:3000/en/admin/login
```
