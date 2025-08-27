import { Transaction, TransactionsResponse } from '../types/transaction';

export const mockTransactions: Transaction[] = [
  {
    id: 'txn_001',
    sender: 'user-12345',
    receiver: 'merchant-abc',
    amount: 150.75,
    currency: 'USD',
    cause: 'Coffee purchase',
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 'txn_002',
    sender: 'employer-corp',
    receiver: 'user-12345',
    amount: 2500.0,
    currency: 'USD',
    cause: 'Salary payment',
    createdAt: '2024-01-14T09:00:00Z',
  },
  {
    id: 'txn_003',
    sender: 'user-12345',
    receiver: 'utility-company',
    amount: 89.99,
    currency: 'USD',
    cause: 'Electricity bill',
    createdAt: '2024-01-13T14:45:00Z',
  },
  {
    id: 'txn_004',
    sender: 'friend-john',
    receiver: 'user-12345',
    amount: 50.0,
    currency: 'USD',
    cause: 'Dinner repayment',
    createdAt: '2024-01-12T19:20:00Z',
  },
  {
    id: 'txn_005',
    sender: 'user-12345',
    receiver: 'user-12345',
    amount: 100.0,
    currency: 'USD',
    cause: 'Wallet top-up',
    createdAt: '2024-01-11T11:15:00Z',
  },
];

export const mockTransactionsResponse: TransactionsResponse = {
  transactions: mockTransactions,
  totalPages: 3,
  currentPage: 1,
  totalItems: 15,
};
