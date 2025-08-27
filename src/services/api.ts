import { API_CONFIG } from '../utils/security';
import { TransactionsResponse } from '../types/transaction';

const API_BASE_URL = API_CONFIG.BASE_URL;

export const transactionAPI = {
  getTransactions: async (page: number = 1): Promise<TransactionsResponse> => {
    try {
      console.log('Fetching transactions for page:', page);

      const response = await fetch(
        `${API_BASE_URL}/transaction/find-by-user?p=${page}`,
        {
          headers: {
            Authorization: `Bearer ${API_CONFIG.API_SECRET}`,
            'X-API-Key': API_CONFIG.API_KEY,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      console.log('Response status:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error details:', errorText);
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('API response data:', data);
      return data;
    } catch (error) {
      console.error('Error in getTransactions:', error);
      throw error;
    }
  },

  searchTransactions: async (
    query: string,
    page: number = 1
  ): Promise<TransactionsResponse> => {
    try {
      console.log('Searching transactions:', query, 'page:', page);

      const response = await fetch(`${API_BASE_URL}/transaction/search`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${API_CONFIG.API_SECRET}`,
          'X-API-Key': API_CONFIG.API_KEY,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ query, page }),
      });

      console.log(
        'Search response status:',
        response.status,
        response.statusText
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Search API Error details:', errorText);
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Search API response data:', data);
      return data;
    } catch (error) {
      console.error('Error in searchTransactions:', error);
      throw error;
    }
  },
};
