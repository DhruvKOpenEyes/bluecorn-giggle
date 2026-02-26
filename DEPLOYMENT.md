
# Deployment Guide

## Docker Deployment
docker-compose up --build -d

## Access
App: http://localhost
MongoDB: localhost:27017

## PM2 Production
npm install -g pm2
pm2 start ecosystem.config.js

## GitHub Actions
Push to main branch to trigger build pipeline.

## Recommended Production Setup
- Use HTTPS (Let's Encrypt)
- Store secrets in environment variables
- Enable firewall
- Use MongoDB Atlas for managed DB
