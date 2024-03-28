type UUID = string;
export interface PageMeta {
  title: string
  description: string
  cardImage: string
  url: string
  robots?: string
  favicon?: string
  type?: string
}

export interface User {
  created_at: string | null
  email: string | null | undefined
  email_verified: string | null
  id: string
  image: string | null
  name: string | null
  updated_at: string | null
}

export type GameAccess = {
  id?: number;
  uid: string | undefined; // Assuming this is a string representation of a UUID
  gid: string; // Assuming this is a string representation of a UUID
  access_granted_date?: string; // Or Date, if you prefer
  access_type: string; // Consider enumerating the possible access types if they are limited
  status: 'active' | 'expired' | 'revoked'; // Enumerate known statuses as string literal types
  created_at?: string; // Or Date
  updated_at?: string; // Or Date
};

export type Payment = {
  id?: number;
  uid: string | undefined; // Assuming this is a string representation of a UUID
  gid: string; // Assuming this is a string representation of a UUID
  transaction_id: string;
  transaction_details: any; // Replace 'any' with a more specific type if you know the structure of your transaction details
  created_at?: string; // Depending on how you handle dates, you might want to use Date type instead
};
