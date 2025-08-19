Here's a detailed user manual for the Authentication & User Management Module, formatted in Markdown:

```markdown
# Authentication & User Management Module

A code-first approach to implementing authentication and user management functionalities in your applications.

## Main Functions

This module provides the following key features:

- **User Authentication**: Users can sign up, log in, and verify their email addresses.
- **Role-based Access Control**: Different user roles (ADMIN, AGENCY, ADVERTISER) determine access to various parts of the application.
- **Protected Routes**: Certain routes are accessible only to authenticated users.
- **Email Verification**: Users receive a verification email upon signing up to confirm their identity.
- **Dashboard**: A user-specific dashboard that displays content based on the user's role.

## Environment Setup

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or later)
- npm (Node Package Manager)
- Supabase account

### Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Navigate to the Frontend Directory**:
   ```bash
   cd frontend
   ```

3. **Install Frontend Dependencies**:
   ```bash
   npm install
   ```

4. **Set Up Supabase**:
   - Create a new project in Supabase.
   - Obtain your Supabase URL and API key.
   - Create a `.env` file in the `frontend` directory and add the following:
     ```
     VITE_SUPABASE_URL=<your-supabase-url>
     VITE_SUPABASE_ANON_KEY=<your-anon-key>
     ```

5. **Apply Supabase Schema**:
   - Navigate to the Supabase SQL editor and run the following commands from `schema.sql` and `rls.sql`:
     ```sql
     -- Run schema.sql
     -- Add your schema definitions here

     -- Run rls.sql
     -- Add your row-level security policies here
     ```

6. **Run the Frontend Application**:
   ```bash
   npm run dev
   ```

## Usage

### Accessing the Application

- Open your browser and navigate to `http://localhost:3000` (or the port specified in your terminal).

### User Registration

1. Navigate to the `/signup` route.
2. Fill in the required fields (email, password, role) and submit the form.
3. Check your email for a verification link and click it to verify your account.

### User Login

1. Navigate to the `/login` route.
2. Enter your email and password, then submit the form.
3. Upon successful login, you will be redirected to your dashboard.

### Email Verification

- After signing up, you will receive an email with a verification link. Click the link to verify your account.

### Role-based Dashboard

- After logging in, you will be redirected to the `/dashboard` route. The content displayed will depend on your assigned role (ADMIN, AGENCY, ADVERTISER).

### Protected Routes

- If you attempt to access the `/dashboard` route without being logged in, you will be redirected to the `/login` page.

## Conclusion

This Authentication & User Management Module provides a robust foundation for managing user authentication and roles in your applications. For further customization and enhancements, feel free to explore the codebase and modify it according to your needs.

For any issues or support, please reach out to our development team.
```

This manual provides a comprehensive overview of the module's functionality, installation instructions, and usage guidelines, ensuring users can effectively utilize the software.