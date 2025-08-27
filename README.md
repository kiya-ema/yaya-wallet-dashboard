d# YaYa Wallet Transactions Dashboard

A React.js dashboard for monitoring transactions made to/from YaYa Wallet accounts. This application provides a clean, responsive interface for viewing transaction history with search, pagination, and visual transaction type indicators.

## Live Demo

[StackBlitz Live Preview](https://stackblitz.com/edit/your-project-link-here)

## Features

### ✅ Core Requirements

- **Transaction Listing**: Tabular display of transactions with all required fields
- **Pagination**: Navigate through transaction pages using the "p" query parameter
- **Search Functionality**: Search by sender, receiver, cause, or transaction ID
- **Visual Indicators**:
  - 🟢 Green badges for incoming transactions (receiver = current user)
  - 🔴 Red badges for outgoing transactions (receiver ≠ current user)
  - 🟢 Top-up transactions (sender = receiver) are treated as incoming

### ✅ Additional Features

- **Responsive Design**: Adapts to different screen sizes (mobile, tablet, desktop)
- **Error Handling**: Graceful fallback to demo data when API is unavailable
- **Loading States**: Visual feedback during API requests
- **Security**: API credentials handled securely
- **Type Safety**: Full TypeScript implementation

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **HTTP Client**: Fetch API (with axios as optional dependency)
- **Styling**: Custom CSS with responsive design
- **Build Tool**: Vite
- **Development**: StackBlitz online IDE

## Project Structure
