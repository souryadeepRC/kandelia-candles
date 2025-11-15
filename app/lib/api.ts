import type { Product } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export interface FetchOptions {
  id?: string;
  bestseller?: boolean;
  limit?: number;
}

/**
 * Fetch all candles or filter by options
 */
export async function fetchCandles(options?: FetchOptions): Promise<Product[]> {
  try {
    const params = new URLSearchParams();

    if (options?.id) params.append('id', options.id);
    if (options?.bestseller !== undefined) params.append('bestseller', String(options.bestseller));
    if (options?.limit) params.append('limit', String(options.limit));

    const url = `${API_BASE_URL}/api/candles${params.toString() ? `?${params.toString()}` : ''}`;
    
    const response = await fetch(url, {
      cache: 'no-store', // Disable caching to always get fresh data
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch candles');
    }

    const result = await response.json();
    
    // Handle single candle (when id is provided)
    if (options?.id && result.data && !Array.isArray(result.data)) {
      return [result.data];
    }

    return result.data || [];
  } catch (error) {
    console.error('Error fetching candles:', error);
    // Return empty array on error - you might want to handle this differently
    return [];
  }
}

/**
 * Fetch a single candle by ID
 */
export async function fetchCandleById(id: string): Promise<Product | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/candles/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to fetch candle');
    }

    const result = await response.json();
    return result.data || null;
  } catch (error) {
    console.error('Error fetching candle:', error);
    return null;
  }
}

/**
 * Add a new candle
 */
export async function addCandle(candle: Product): Promise<{ success: boolean; insertedId?: string; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/candles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(candle),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to add candle');
    }

    const result = await response.json();
    return {
      success: true,
      insertedId: result.insertedId,
    };
  } catch (error) {
    console.error('Error adding candle:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Update a candle
 */
export async function updateCandle(id: string, updates: Partial<Product>): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/candles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update candle');
    }

    return { success: true };
  } catch (error) {
    console.error('Error updating candle:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Delete a candle
 */
export async function deleteCandle(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/candles/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete candle');
    }

    return { success: true };
  } catch (error) {
    console.error('Error deleting candle:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
