const { db } = require('@vercel/postgres');
import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  message: string
}

const prices = [
    {
        hotel_id: '3041f199-0049-406b-b862-8422c48f7708',
        cid: '2023-12-01',
        price: 15000,
        is_soldout: false,
        capture_date: '2023-11-11',
    },
    {
        hotel_id: '3041f199-0049-406b-b862-8422c48f7708',
        cid: '2023-12-02',
        price: 15000,
        is_soldout: false,
        capture_date: '2023-11-11',
    },
    {
        hotel_id: '3041f199-0049-406b-b862-8422c48f7708',
        cid: '2023-11-24',
        price: 22130,
        is_soldout: false,
        capture_date: '2023-11-11',
    },
];

async function seedPrices(client:any) {
    try {
      const insertedPrices = await Promise.all(
        prices.map(
          (price) => client.sql`
            INSERT INTO prices (hotel_id, cid, price, is_soldout, capture_date)
            VALUES (${price.hotel_id}, ${price.cid}, ${price.price}, ${price.is_soldout}, ${price.capture_date})
            ON CONFLICT ON CONSTRAINT unique_night DO UPDATE SET
                hotel_id = EXCLUDED.hotel_id,
                cid = EXCLUDED.cid,
                price = EXCLUDED.price,
                is_soldout = EXCLUDED.is_soldout,
                capture_date = EXCLUDED.capture_date;
        `,
        ),
      );
  
      console.log(`Seeded ${insertedPrices.length} prices`);
  
      return {
        prices: insertedPrices,
      };
    } catch (error) {
      console.error('Error seeding prices:', error);
      throw error;
    }
}

async function main() {
    const client = await db.connect();
    await seedPrices(client);
    await client.end();
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
    main().catch((err) => {
        console.error(
          'An error occurred while attempting to seed the database:',
          err,
        );
    });
    res.status(200).json({ message: 'Inserted test data' })
}


// INSERT INTO prices (hotel_id, cid, price, is_soldout, capture_date)
// VALUES (${price.hotel_id}, ${price.cid}, ${price.price}, ${price.is_soldout}, ${price.capture_date})
// ON CONFLICT (unique_price) DO UPDATE SET
//     hotel_id = EXCLUDED.hotel_id,
//     cid = EXCLUDED.cid,
//     price = EXCLUDED.price,
//     is_soldout = EXCLUDED.is_soldout,
//     capture_date = EXCLUDED.capture_date;

// 重複でなければいINSERT
// INSERT INTO prices(hotel_id, cid, price, is_soldout, capture_date) 
// SELECT ${price.hotel_id}, ${price.cid}, ${price.price}, ${price.is_soldout}, ${price.capture_date}
// WHERE NOT EXISTS (SELECT id FROM prices WHERE hotel_id = ${price.hotel_id} AND cid = ${price.cid} AND price = ${price.price});

// unique_priceという複合キーを設定
// create unique index unique_night on prices (hotel_id, cid);

// ユニークインデックスの削除
// drop index unique_night;

// ユニーク成約の設定
// ALTER TABLE prices ADD CONSTRAINT unique_night UNIQUE(hotel_id, cid);
// ALTER TABLE テーブル名 DROP CONSTRAINT 制約名称;

// // 型変更
// ALTER TABLE prices
// ALTER COLUMN "capture_date" TYPE VARCHAR(255) USING "capture_date"::DATE;