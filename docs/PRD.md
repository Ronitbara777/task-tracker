# Product Requirements Document (PRD)

## Problem it solves
People often lose track of daily tasks because most project management tools are too complex or bloated. This app provides a lightweight, focused interface just for tracking personal to-dos.

## Target Users
Developers, students, and professionals who just want a fast, simple list to track what they need to get done today without a steep learning curve.

## Core Features (MVP)
- A dashboard to view all current tasks.
- Ability to create a task with a title, optional description, priority level, and due date.
- Ability to edit task details or quickly mark a task as completed.
- Ability to delete a task.
- Basic filtering by status (todo, in-progress, completed) and priority (low, medium, high).
- Form validation to ensure tasks have titles and valid due dates.

## Out of Scope
- User authentication and accounts (this is a single-user MVP).
- Collaboration features or sharing tasks.
- Email or push notifications for upcoming due dates.
- Sub-tasks or complex nested dependencies.

## Success Metrics
- A user can successfully perform full CRUD operations on tasks.
- The UI handles errors gracefully (e.g., bad API requests or invalid form inputs) without crashing.
