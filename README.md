# MeY Garage

MeY Garage is a full-stack garage management system for digitizing the day-to-day operations of a car service business. It turns paper-based intake, phone-heavy status updates, and manual order coordination into a secure web workflow for employees and customers.

This repository also serves as a real-world learning project. The goal is not only to build software, but to practice the full lifecycle of delivery: business analysis, scoping, design, development, security, testing, and deployment.

## Main Goal

The primary goal of this project is to simulate what it feels like to work on a real client-facing software project. That includes:

- understanding the business before writing code
- translating business pain points into technical requirements
- designing and building a secure full-stack application
- thinking about deployment, maintenance, and long-term value
- learning how to work like an architect, designer, developer, tester, and project manager

## Business Problem

A typical garage workflow still includes several manual steps:

- customer and vehicle details are written down repeatedly
- pricing, receipts, and service intake are handled manually
- managers follow up with mechanics in person
- customers call to check service status
- employees recreate old receipts on request
- the business has limited ability to market to past customers or manage recalls

These gaps lead to lost time, inconsistent records, missed follow-up opportunities, and unnecessary interruptions for staff.

## Proposed Solution

The application provides a web-based system that helps the garage:

- manage employees with role-based access
- store customer and vehicle records
- create, assign, and track service orders
- let customers check order progress without creating an account
- reduce general information calls with public-facing pages
- support future recall outreach, customer retention, and reporting

## Business Value

Using the assumptions from the project brief, the estimated value added over 5 years is approximately `$445,750`, excluding softer gains like customer satisfaction and retention.

Key drivers include:

- improved recall and promotion follow-up
- less manager time spent coordinating mechanics manually
- fewer receptionist calls for general information and order status
- less time recreating receipts
- faster repeat-customer intake
- more new customers discovered online

At a 20% profit margin, that value is roughly `$90,000` in net profit over 5 years. Capturing 20% of that value suggests a fair project price of around `$18,000`.

## Functional Scope

### Public pages

- `/` home page
- `/about`
- `/services`
- `/contact`
- `/login`
- `/order/{orderHash}` public order tracking

### Employee authentication and authorization

- employee registration and login
- secure authentication
- role-based access levels for admin, manager, mechanic, and receptionist
- admin ability to grant or revoke access

### Customer management

- add, edit, and delete customers
- store contact details, vehicle details, and service history
- search and filter by name, email, or phone

### Order management

- create, edit, and delete orders
- assign orders to technicians
- track status and progress
- allow public order-status lookup without requiring a customer account

## Non-Functional Requirements

- responsive and mobile-friendly UI
- secure authentication and access control
- acceptable page and API response times
- scalable structure for future growth
- maintainable, well-documented code
- reliable infrastructure with low risk of data loss

## Original Proposal Stack

The original project brief proposed this stack:

- Node.js and Express.js
- MySQL
- React.js
- Bootstrap
- AWS hosting
- Git and GitHub

## Current Implementation Snapshot

The code currently in this repository is using:

- frontend: Next.js 16, React 19, TypeScript, Tailwind CSS, Radix UI
- backend: Node.js, Express, TypeScript
- database: PostgreSQL with Prisma ORM
- auth/session-related code: cookie-based auth token utilities plus Better Auth-related Prisma models

This means the repo has already evolved from the original proposal. The business scope remains aligned, but the implementation stack is currently:

- not using MySQL
- not using Bootstrap
- not yet clearly wired to AWS deployment in code or docs

## Current Backend Coverage

Based on the present codebase, the backend already includes early work for:

- authentication routes
- role-aware middleware
- user routes
- order routes
- Prisma schema models for users, sessions, customers, vehicles, services, and orders

## Suggested Service Boundaries

To keep the system modular, the project can be organized around these business services:

- authentication
- employees
- customers
- vehicles
- orders
- services
- database setup and seed utilities

## Timeline

The original placeholder timeline is:

- kickoff and planning: 1 week
- design and wireframing: 1 week
- backend development: 2 weeks
- frontend development: 2 weeks
- testing and deployment: 1 week
- post-launch support: ongoing

Actual delivery timing depends on team size, scope adjustments, and review cycles.

## Repo Structure

- [client](/home/mohammed/Desktop/project/MeY_Garage/client) Next.js frontend
- [server](/home/mohammed/Desktop/project/MeY_Garage/server) Express and Prisma backend
- [docs/project-scope.md](/home/mohammed/Desktop/project/MeY_Garage/docs/project-scope.md) detailed project brief distilled from the business notes

## Getting Started

### Backend

From [server](/home/mohammed/Desktop/project/MeY_Garage/server):

```bash
npm install
npm run prisma:generate
npm run dev
```

Expected environment values include at least:

- `DATABASE_URL`
- `FRONTEND_URL`
- `PORT`
- `JWT_SECRET`

### Frontend

From [client](/home/mohammed/Desktop/project/MeY_Garage/client):

```bash
npm install
npm run dev
```

The frontend defaults to the standard Next.js local server on `http://localhost:3000`.

## Recommended Next Steps

- align the README and proposal with the actual stack decision
- finish the customer, vehicle, and service CRUD flows
- add public marketing pages and public order tracking
- define environment setup and deployment targets clearly
- add validation, testing, and API documentation

## Status

The project is in active development. The business vision is well defined, while the implemented product is currently at an early backend-plus-auth stage with frontend scaffolding in place.
