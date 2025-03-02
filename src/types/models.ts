export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  creditBalance: number;
}

export interface CreditTransaction {
  id: string;
  user: string; // user id
  amount: number;
  transactionType: 'purchase' | 'usage' | 'refund';
  timestamp: string;
  paymentId?: string;
}

export interface Call {
  id: string;
  user: string; // user id
  phoneNumber: string;
  countryCode: string;
  startTime: string;
  endTime?: string;
  duration?: number;
  status: 'completed' | 'failed' | 'in-progress';
  cost?: number;
  qualityRating?: number;
}

export interface Country {
  id: string;
  name: string;
  code: string;
  ratePerMinute: number;
  flagIcon?: string;
}

export interface Contact {
  id: string;
  user: string; // user id
  name: string;
  phoneNumber: string;
  countryCode: string;
  isFavorite: boolean;
}
