import { sql } from '@vercel/postgres';
import {
  HotelField,
  HotelForm,
  HotelWithLogField,
  CaptureHotelField,
  RateField,
  WatchitemField,
  WatchlistTable,
  WatchitemForm,
  CustomerField,
  CustomersTable,
  InvoiceForm,
  InvoicesTable,
  RatesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchRevenue() {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();

  try {
    // Artificially delay a reponse for demo purposes.
    // Don't do this in real life :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    // console.log('Data fetch complete after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  noStore();
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  noStore();
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  noStore();
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));
    console.log(invoice);
    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  noStore();
  try {
    const data = await sql<CustomersTable>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * from USERS where email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function completeAccountLink() {
  try {
    const user = await sql`SELECT link_token,nonce FROM users WHERE id = '8022354a-e36e-4488-8736-d90802f99069'`;
    return user.rows[0]
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function fetchAllRates() {
  try {
    const data = await sql<RateField>`
      SELECT rates.id, hotel_name_jp, cid, rate, exception, capture_date
      FROM rates
        INNER JOIN hotels
        ON rates.hotel_id = hotels.id
      WHERE capture_date = (SELECT MAX(capture_date) FROM rates)
      ORDER BY cid ASC
    `;

    const rates = data.rows;
    return rates;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all rates.');
  }
}

export async function fetchAllWhatchlist() {
  try {
    const data = await sql<WatchitemField>`
      SELECT watchlist.id, hotel_name_jp, cid, basis, status
      FROM watchlist
        INNER JOIN hotels
        ON watchlist.hotel_id = hotels.id
      ORDER BY cid ASC
    `;

    const watchlist = data.rows;
    return watchlist;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all watchlist.');
  }
}

export async function fetchHotels() {
  try {
    const data = await sql<HotelField>`
      SELECT
        id,
        hotel_name_jp
      FROM hotels
      ORDER BY hotel_name_jp ASC
    `;

    const hotels = data.rows;
    return hotels;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all hotels.');
  }
}

export async function fetchWatchitemById(id: string) {
  noStore();
  try {
    const data = await sql<WatchitemForm>`
      SELECT id, hotel_id, cid, basis
      FROM watchlist
      WHERE id = ${id};
    `;

    // const watchitem = data.rows.map((watchitem) => ({
    //   ...watchitem,
    //   // Convert amount from cents to dollars
    //   basis: watchitem.basis,
    // }));
    // console.log(watchitem);
    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
  }
}

export async function fetchHotelById(id: string) {
  noStore();
  try {
    const data = await sql<HotelForm>`
      SELECT id, hotel_name_jp, capture_script, capture_month_count
      FROM hotels
      WHERE id = ${id};
    `;

    // const hotels = data.rows
    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
  }
}

export async function fetchAllHotels() {
  noStore();
  try {
    const data = await sql<HotelField>`
      SELECT
        id,
        hotel_name_jp,
        capture_script,
        capture_month_count
      FROM hotels
      ORDER BY hotel_name_jp ASC
    `;

    const hotels = data.rows;
    return hotels;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all hotels.');
  }
}

export async function fetchCaptureHotels(capture_script: string)  {
  try {
    const data = await sql<CaptureHotelField>`
      SELECT id as hotel_id, hotel_code, capture_month_count
      FROM hotels
      WHERE capture_script = ${capture_script}
    `;

    const hotels = data.rows;
    return hotels;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch capture hotels.');
  }
}

export async function fetchFilteredRates(
  hotel_id: string,
  cim: string,
) {
  noStore();

  try {
    const rates = await sql<RatesTable>`
      SELECT
        rates.id,
        rates.hotel_id,
        hotel_name_jp,
        rates.cid,
        rate,
        exception,
        capture_date
      FROM rates
      JOIN hotels ON rates.hotel_id = hotels.id
      WHERE
        rates.hotel_id = ${hotel_id} AND
        rates.cid ILIKE ${`${cim}%`} AND
        capture_date = (SELECT MAX(capture_date) FROM rates)
      ORDER BY rates.cid ASC
    `;

    return rates.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch rates.');
  }
}

export async function fetchCapturedMonths(
  hotel_id: string
) {
  noStore();

  try {
    const months = await sql<{cim: string}>`
      SELECT left(cid,7) as cim
      FROM rates
      WHERE
        hotel_id = ${hotel_id} AND
        capture_date = (SELECT MAX(capture_date) FROM rates)
      GROUP BY cim
      ORDER BY cim ASC
    `;

    return months.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch rates.');
  }
}

export async function fetchOldRates(hotel_id: string, cid: string) {
  noStore();
  try {
    const oldRates = await sql<{capture_date: string, rate: number | null, exception: string | null}>`
      SELECT capture_date, rate, exception FROM rates
      WHERE hotel_id = ${hotel_id} AND cid = ${cid}
    `;
    return oldRates.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch old rates.');
  }
}

export async function fetchFilteredWatchlist(
  status: string,
) {
  noStore();

  try {
    const watchlist = await sql<WatchlistTable>`
      SELECT
        watchlist.id,
        watchlist.hotel_id,
        hotel_name_jp,
        watchlist.cid,
        basis,
        rate,
        exception,
        status
      FROM watchlist
      INNER JOIN hotels ON watchlist.hotel_id = hotels.id
      LEFT OUTER JOIN (SELECT hotel_id,cid,rate,exception FROM rates WHERE capture_date = (SELECT MAX(capture_date) FROM rates)) as latest_rates
        ON watchlist.hotel_id = latest_rates.hotel_id AND watchlist.cid = latest_rates.cid
      WHERE watchlist.status = ${status}
      ORDER BY cid ASC
    `;

    return watchlist.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch watchlist.');
  }
}

export async function fetchAllHotelsWithLog() {
  try {
    const data = await sql<HotelWithLogField>`
    SELECT hotel_id, capture_month, MAX(to_char(timezone('JST',capture_timestamp::timestamptz), 'yyyy/mm/dd hh24:mm:ss')) as timestamp
    FROM logs
    GROUP BY hotel_id, capture_month, result
    HAVING result = 'success'
    `;

    const hotels = data.rows;
    return hotels;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all hotels with latest capture logs.');
  }
}

export async function fetchHotelCodeById(hotel_id: string) {
  try {
    const data = await sql`
    SELECT hotel_code FROM hotels
    WHERE id = ${hotel_id}
    `;

    const hotel_code = data.rows[0]['hotel_code'];
    return hotel_code;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch hotel_code by id.');
  }
}

export async function fetchGroupHotels(group_code: string) {
  try {
    const data = await sql<{id:string,hotel_code:string}>`
      SELECT id, hotel_code
      FROM hotels
      WHERE group_code = ${group_code};
    `;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
  }
}