# Abe's Garage Project Scope

## Purpose

This document turns the raw project notes into a structured scope reference for planning, building, and discussing the application with teammates or stakeholders.

## Project Goal

The main goal of this project is to simulate a real-world software engagement from end to end. That means:

- identifying a business problem worth solving
- estimating the value created by the solution
- defining scope before implementation
- designing a secure and maintainable system
- building, testing, and deploying a usable product

This project is also meant to help the team practice multiple responsibilities at once:

- architect
- designer
- developer
- tester
- business analyst
- project manager

## Business Workflow Observed

The garage currently relies on manual and phone-driven processes across customer intake, order handling, and follow-up.

### Customer walk-ins

- customers explain the issue to the receptionist
- pricing and service availability are discussed
- staff manually record vehicle and service details
- staff collect payment
- staff prepare a receipt
- the manager assigns work to mechanics
- customers later call back for updates or get contacted when work is done

### Phone calls

- general information calls about hours, directions, and services
- order status calls from customers
- garage callback requests when service is completed
- requests for copies of past receipts

### Marketing and retention

- difficulty reaching past customers for promotions
- no strong recall-management workflow
- limited inbound discovery without public-facing web content

### Operations and compliance

- manual purchasing and inventory awareness
- receipt organization for taxes and insurance
- legal documents and agreements handled outside a unified system

## Problems to Solve

### Problem 1: No effective way to reach returning customers

Solution:

- store customer contact information and service history
- support recalls and promotions

Estimated value:

- 10% of 1,300 customers return for recalls/promotions
- average visit value is `$400`
- estimated impact over 5 years: `$260,000`

### Problem 2: Managers manually follow up with mechanics

Solution:

- assign tasks digitally
- allow mechanics to update status in the system

Estimated value:

- 30 minutes saved per day
- 650 manager hours saved over 5 years
- estimated savings: `$16,250`

### Problem 3: Too many general-information calls

Solution:

- provide public pages with hours, location, and services

Estimated value:

- 5 calls saved per day at 3 minutes each
- 325 receptionist hours saved over 5 years
- estimated savings: `$4,875`

### Problem 4: Too many service-status calls

Solution:

- allow customers to check order status online without logging in

Estimated value:

- 3 calls saved per day at 3 minutes each
- 195 receptionist hours saved over 5 years
- estimated savings: `$2,925`

### Problem 5: Too much time spent recreating receipts

Solution:

- let customers download receipts digitally

Estimated value:

- 43 manager hours saved over 5 years
- estimated savings: `$1,075`

### Problem 6: Returning customers repeatedly provide vehicle details

Solution:

- store customer vehicles for reuse on future visits

Estimated value:

- 15 minutes saved per repeat visit
- 1,625 customer hours saved over 5 years
- estimated value of customer time: `$40,625`

### Problem 7: New customers are not finding the business online

Solution:

- create search-friendly public pages

Estimated value:

- 5 additional customers per month
- 300 additional customers over 5 years
- estimated added revenue: `$120,000`

## Total Estimated Value

- total value added over 5 years: `$445,750`
- assumed profit margin: `20%`
- estimated net profit impact: about `$90,000`
- if capturing 20% of value created, fair project price: about `$18,000`

## Functional Requirements

### Public-facing pages

- home page
- about page
- services page
- contact page
- login page
- order details page using `orderHash`

### Employee registration and authentication

- management creates employee accounts
- employees log in securely
- roles control access levels
- admins can grant or revoke access

### Customer management

- add, edit, and delete customers
- store contact details, vehicles, and service history
- search and filter by name, email, and phone

### Order management

- create, edit, and delete orders
- assign orders to technicians
- track progress and status
- expose public status tracking without requiring customer login

## Non-Functional Requirements

- responsive and mobile friendly
- strong authentication and authorization
- secure handling of sensitive data
- acceptable performance
- scalable architecture
- maintainable code and documentation
- reliable infrastructure and backups

## Wireframe Navigation

### Public routes

- `/`
- `/about`
- `/services`
- `/contact`
- `/login`
- `/order/{orderHash}`

### Admin routes

- `/admin`
- `/admin/employees`
- `/admin/add-employee`
- `/admin/employee/edit/:id`
- `/admin/customers`
- `/admin/add-customer`
- `/admin/customer/edit/:id`
- `/admin/customer/{customerId}`
- `/admin/orders`
- `/admin/order`
- `/admin/order/{orderHash}/edit`
- `/admin/order/{orderHash}`
- `/admin/services`
- `/admin/add-service`

## Proposed Architecture

### Platform

- single web application for a small business deployment
- REST API between frontend and backend

### Core services

- authentication
- employees
- customers
- vehicles
- orders
- services
- setup and seed utilities

### Hosting direction from the original brief

- AWS EC2 for application hosting
- CloudWatch for monitoring

### Original stack direction

- Node.js
- Express.js
- MySQL
- React.js
- Bootstrap
- Git and GitHub

## Current Repository Reality

The codebase currently differs from parts of the original proposal:

- PostgreSQL is used instead of MySQL
- Next.js is used instead of plain React
- Tailwind-based styling is present instead of Bootstrap

That is not a problem, but it should be acknowledged in all future planning and proposal materials so the implementation and documentation stay aligned.

## Suggested Delivery Phases

1. Kickoff and planning
2. Design and wireframes
3. Backend development
4. Frontend development
5. Testing and deployment
6. Post-launch support

## Immediate Product Priorities

- complete authentication and role flows
- add customer CRUD
- add vehicle CRUD
- add service CRUD
- complete order creation, assignment, and status updates
- build public marketing pages
- build public order tracking
- add validation, test coverage, and deployment docs
