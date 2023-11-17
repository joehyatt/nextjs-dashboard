const { db } = require('@vercel/postgres');
const {
  watchlist,
  hotels
} = require('../app/lib/placeholder-data2.js');
// const bcrypt = require('bcrypt');

async function seedHotels(client) {
    try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`; 
      // Create the "hotels" table if it doesn't exist
      const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS hotels (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            group_code VARCHAR(10) NOT NULL,
            group_name_jp VARCHAR(50) NOT NULL,
            group_name_en VARCHAR(50) NOT NULL,
            brand_code VARCHAR(10) NOT NULL,
            brand_name_jp VARCHAR(50) NOT NULL,
            brand_name_en VARCHAR(50) NOT NULL,
            hotel_code VARCHAR(10) NOT NULL UNIQUE,
            hotel_name_jp VARCHAR(255) NOT NULL UNIQUE,
            hotel_name_en VARCHAR(255) NOT NULL UNIQUE
        );
      `;
      console.log(`Created "hotels" table`);
  
      // Insert data into the "hotels" table
      const insertedHotels = await Promise.all(
        hotels.map(
          (hotel) => client.sql`
            INSERT INTO hotels (group_code, group_name_jp, group_name_en, brand_code, brand_name_jp, brand_name_en, hotel_code, hotel_name_jp, hotel_name_en)
            VALUES (${hotel.group_code}, ${hotel.group_name_jp}, ${hotel.group_name_en}, ${hotel.brand_code}, ${hotel.brand_name_jp}, ${hotel.brand_name_en}, ${hotel.hotel_code}, ${hotel.hotel_name_jp}, ${hotel.hotel_name_en})
            ON CONFLICT (id) DO NOTHING;
        `,
        ),
      );
  
      console.log(`Seeded ${insertedHotels.length} hotels`);
  
      return {
        createTable,
        hotels: insertedHotels,
      };
    } catch (error) {
      console.error('Error seeding hotels:', error);
      throw error;
    }
}

// async function seedPrices(client) {
//     try {
//       // Create the "prices" table if it doesn't exist
//       const createTable = await client.sql`
//         CREATE TABLE IF NOT EXISTS prices (
//             id SERIAL PRIMARY KEY,
//             hotel_id UUID NOT NULL,
//             cid VARCHAR(11) NOT NULL,
//             price INT NOT NULL,
//             is_soldout BOOLEAN NOT NULL,
//             capture_date DATE NOT NULL
//         );
//       `;
//       console.log(`Created "prices" table`);
  
//       // Insert data into the "prices" table
//       const insertedPrices = await Promise.all(
//         prices.map(
//           (price) => client.sql`
//             INSERT INTO prices (hotel_id, cid, price, is_soldout, capture_date)
//             VALUES (${price.hotel_id}, ${price.cid}, ${price.price}, ${price.is_soldout}, ${price.capture_date})
//             ON CONFLICT (id) DO NOTHING;
//         `,
//         ),
//       );
  
//       console.log(`Seeded ${insertedPrices.length} prices`);
  
//       return {
//         createTable,
//         prices: insertedPrices,
//       };
//     } catch (error) {
//       console.error('Error seeding prices:', error);
//       throw error;
//     }
// }

// async function seedWatchlist(client) {
//   try {
//     // Create the "prices" table if it doesn't exist
//     const createTable = await client.sql`
//       CREATE TABLE IF NOT EXISTS watchlist (
//           id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//           user_id UUID NOT NULL,
//           hotel_id UUID NOT NULL,
//           cid VARCHAR(11) NOT NULL,
//           threshold INT NOT NULL,
//           start_date VARCHAR(11) NOT NULL,
//           status VARCHAR(13) NOT NULL
//       );
//     `;
//     console.log(`Created "watchlist" table`);

//     // Insert data into the "watchlist" table
//     const insertedWatchlist = await Promise.all(
//       watchlist.map(
//         (watchitem) => client.sql`
//           INSERT INTO watchlist (user_id, hotel_id, cid, threshold, start_date, status)
//           VALUES (${watchitem.user_id}, ${watchitem.hotel_id}, ${watchitem.cid}, ${watchitem.threshold}, ${watchitem.start_date}, ${watchitem.status})
//           ON CONFLICT (id) DO NOTHING;
//       `,
//       ),
//     );

//     console.log(`Seeded ${insertedWatchlist.length} watchlist`);

//     return {
//       createTable,
//       watchlist: insertedWatchlist,
//     };
//   } catch (error) {
//     console.error('Error seeding watchlist:', error);
//     throw error;
//   }
// }

async function main() {
    const client = await db.connect();
  
    await seedHotels(client);
  
    await client.end();
}
  
main().catch((err) => {
    console.error(
      'An error occurred while attempting to seed the database:',
      err,
    );
});