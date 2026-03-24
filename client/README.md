# MeY Garage Client

This is the Next.js frontend for the MeY Garage management system.

## Purpose

The client application is responsible for:

- public-facing marketing pages
- employee login and protected admin pages
- customer, vehicle, and order management interfaces
- public order-status tracking by `orderHash`

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Radix UI primitives
- Zustand for client-side state

## Development

From [client](/home/mohammed/Desktop/project/MeY_Garage/client):

```bash
npm install
npm run dev
```

The app starts on `http://localhost:3000` by default.

## Current State

Frontend scaffolding is present, including:

- public auth-related routes
- protected layout structure
- shared UI primitives
- basic state stores

Public marketing pages, customer workflows, and richer dashboard screens still need to be implemented.
