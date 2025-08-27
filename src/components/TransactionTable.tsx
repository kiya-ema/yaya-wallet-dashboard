import React from 'react';
import { Transaction } from '../types/transaction';

interface TransactionTableProps {
  transactions: Transaction[];
  currentUser: string;
  isLoading?: boolean;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  currentUser,
  isLoading = false,
}) => {
  const getTransactionType = (
    transaction: Transaction
  ): 'incoming' | 'outgoing' => {
    if (transaction.receiver === currentUser) {
      return 'incoming';
    }
    return 'outgoing';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
        No transactions found.
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Type</th>
            <th>ID</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Cause</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => {
            const type = getTransactionType(transaction);

            return (
              <tr key={transaction.id}>
                <td>
                  <span className={`badge badge-${type}`}>
                    {type === 'incoming' ? 'Incoming' : 'Outgoing'}
                  </span>
                </td>
                <td>{transaction.id}</td>
                <td>{transaction.sender}</td>
                <td>{transaction.receiver}</td>
                <td>{transaction.amount.toLocaleString()}</td>
                <td>{transaction.currency}</td>
                <td>{transaction.cause}</td>
                <td>{formatDate(transaction.createdAt)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
