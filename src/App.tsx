import React, { useState, useEffect } from 'react';
import { TransactionTable } from './components/TransactionTable';
import { SearchBar } from './components/SearchBar';
import { Pagination } from './components/Pagination';
import { transactionAPI } from './services/api';
import { Transaction } from './types/transaction';
import { mockTransactions, mockTransactionsResponse } from './utils/mockData';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useMockData, setUseMockData] = useState(false);

  const currentUser = 'user-12345';

  const fetchTransactions = async (page: number = 1, search: string = '') => {
    setIsLoading(true);
    setError(null);

    try {
      // Use mock data if real API fails or for demo
      if (useMockData) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate loading
        setTransactions(mockTransactions);
        setTotalPages(mockTransactionsResponse.totalPages);
        setCurrentPage(mockTransactionsResponse.currentPage);
        return;
      }

      let response;

      if (search.trim()) {
        response = await transactionAPI.searchTransactions(search, page);
      } else {
        response = await transactionAPI.getTransactions(page);
      }

      setTransactions(response.transactions);
      setTotalPages(response.totalPages);
      setCurrentPage(response.currentPage);
    } catch (err) {
      console.error('API Error:', err);
      setError(
        'Failed to fetch transactions from API. Showing demo data instead.'
      );

      // Fallback to mock data
      await new Promise((resolve) => setTimeout(resolve, 500));
      setTransactions(mockTransactions);
      setTotalPages(3);
      setCurrentPage(1);
      setUseMockData(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(1);
  }, []);

  const handleSearch = () => {
    if (useMockData) {
      // Filter mock data for search
      const filtered = mockTransactions.filter(
        (txn) =>
          txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          txn.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
          txn.receiver.toLowerCase().includes(searchTerm.toLowerCase()) ||
          txn.cause.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setTransactions(filtered);
    } else {
      fetchTransactions(1, searchTerm);
    }
  };

  const handlePageChange = (page: number) => {
    if (useMockData) {
      setCurrentPage(page);
      // Simulate pagination with mock data
      const start = (page - 1) * 5;
      const end = start + 5;
      setTransactions(mockTransactions.slice(start, end));
    } else {
      fetchTransactions(page, searchTerm);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <div className="container">
      <div className="card">
        <h1
          style={{
            textAlign: 'center',
            marginBottom: '24px',
            color: '#1f2937',
          }}
        >
          YaYa Wallet Transactions Dashboard
          {useMockData && (
            <span
              style={{ color: '#ef4444', fontSize: '14px', display: 'block' }}
            >
              (Using Demo Data)
            </span>
          )}
        </h1>

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSearch={handleSearch}
        />

        {error && (
          <div className="error">
            {error}
            <button
              onClick={clearError}
              style={{
                marginLeft: '10px',
                background: 'none',
                border: 'none',
                color: '#991b1b',
                cursor: 'pointer',
              }}
            >
              ×
            </button>
          </div>
        )}

        <TransactionTable
          transactions={transactions}
          currentUser={currentUser}
          isLoading={isLoading}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        <div
          style={{
            textAlign: 'center',
            marginTop: '24px',
            color: '#6b7280',
            fontSize: '14px',
            padding: '10px',
            background: '#f3f4f6',
            borderRadius: '6px',
          }}
        >
          <p>
            💡 <strong>Demo Mode:</strong> The app will automatically use sample
            data if the API is unavailable.
          </p>
          <p>
            Green indicates incoming transactions, red indicates outgoing
            transactions.
          </p>
        </div>

        {/* Debug info */}
        <div
          style={{
            marginTop: '20px',
            padding: '10px',
            background: '#f1f5f9',
            borderRadius: '6px',
            fontSize: '12px',
            color: '#64748b',
          }}
        >
          <strong>Current User:</strong> {currentUser}
          <br />
          <strong>API Status:</strong>{' '}
          {useMockData ? 'Using Mock Data' : 'Using Real API'}
          <br />
          <strong>Transactions:</strong> {transactions.length} found
        </div>
      </div>
    </div>
  );
}

export default App;
