# Reminder App

A feature-rich Angular application designed to help users manage their medication schedules with reminders, notifications, and a user-friendly interface.

## Features
- **Authentication**: Secure login system to manage user accounts.
- **Add Medicine**: Easily add and manage medications with details like name, dosage, and time.
- **Medicine List**: View and manage a list of all medications.
- **Reminders**: Set reminders for specific medications.
- **Notifications**: Receive alerts to take medications on time.
- **Responsive UI**: Built using Angular Material.
- **Custom Utilities**: Pipes and directives for enhancing functionality and usability.

## Project Structure
```plaintext
/pill-reminder-app
├── /src
│   ├── /app
│   │   ├── /components      # Reusable UI components
│   │   ├── /services        # Business logic and data management
│   │   ├── /models          # Data models for the app
│   │   ├── /pages           # Main app pages (Login, Dashboard, etc.)
│   │   ├── /guards          # Route guards for authentication
│   │   ├── /directives      # Custom directives
│   │   ├── /pipes           # Custom pipes
│   │   ├── app-routing.module.ts  # Route configurations
│   │   ├── app.module.ts    # App root module
│   ├── /environments        # Environment-specific configurations
├── /node_modules            # Dependencies
├── package.json             # Project dependencies and scripts
├── angular.json             # Angular project configuration
└── tsconfig.json            # TypeScript configuration
