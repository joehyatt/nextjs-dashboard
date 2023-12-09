// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type RateField = {
  id: string;
  hotel_name_jp: string;
  cid: string;
  rate: number | null;
  exception: string | null;
  capture_date: string;
};

export type WatchitemField = {
  id: string;
  hotel_name_jp: string;
  cid: string;
  basis: number;
  status: 'watching' | 'canceled' | 'breakthrough';
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type WatchitemForm = {
  id: string;
  hotel_id: string;
  cid: string;
  basis: number;
};

export type HotelForm = {
  id: string;
  capture_script: string;
  capture_month_count: number;
};

export type GroupField = {
  group_code: string;
  group_name_jp: string;
};

export type HotelField = {
  id: string;
  hotel_name_jp: string;
  capture_script: string;
  capture_month_count: number;
};

export type CaptureHotelField = {
  hotel_id: string;
  hotel_code: string;
  capture_script: string;
  capture_month_count: number;
};

export type RatesTable = {
  id: string;
  hotel_id: string;
  hotel_name_jp: string;
  cid: string;
  rate: number | null;
  exception: string | null;
  capture_date: string;
};

export type WatchlistTable = {
  id: string;
  hotel_id: string;
  hotel_name_jp: string;
  cid: string;
  basis: number;
  rate: number | null;
  exception: string | null;
  status: 'watching' | 'canceled' | 'breakthrough';
};

export type HotelWithLogField = {
  hotel_id: string;
  capture_month: string;
  timestamp: string;
}