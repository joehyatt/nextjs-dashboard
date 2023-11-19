SELECT user_id, watchinglist.hotel_id, watchinglist.cid, threshold, price
FROM
(SELECT * FROM watchlist WHERE status = 'watching' ) AS watchinglist
INNER JOIN
(SELECT * FROM prices WHERE capture_date = '2023-11-14' ) AS latestprices
ON watchinglist.hotel_id = latestprices.hotel_id AND watchinglist.cid = latestprices.cid
WHERE threshold > price + 500


SELECT user_id, hotel_id, cid, threshold, price, name, email
FROM 
(SELECT user_id, watchinglist.hotel_id, watchinglist.cid, threshold, price
FROM
(SELECT * FROM watchlist WHERE status = 'watching' ) AS watchinglist
INNER JOIN
(SELECT * FROM prices WHERE capture_date = '2023-11-14' ) AS latestprices
ON watchinglist.hotel_id = latestprices.hotel_id AND watchinglist.cid = latestprices.cid
WHERE threshold > price + 500) AS breakthroughlist 
INNER JOIN users
ON breakthroughlist.user_id = users.id


SELECT line_id, hotel_name_jp, cid, threshold, price
FROM 
    (SELECT user_id, watchinglist.hotel_id, watchinglist.cid, threshold, price
    FROM
        (SELECT user_id, hotel_id, cid, threshold FROM watchlist WHERE status = 'watching' ) AS watchinglist
    INNER JOIN
        (SELECT hotel_id, cid, price FROM prices WHERE capture_date = ${today} ) AS latestprices
    ON watchinglist.hotel_id = latestprices.hotel_id AND watchinglist.cid = latestprices.cid
    WHERE threshold > price + 500) AS breakthroughlist 
INNER JOIN users
    ON breakthroughlist.user_id = users.id
INNER JOIN hotels
    ON breakthroughlist.hotel_id = hotels.id;




UPDATE users SET link_token = ${linkToken} WHERE email = ${email}
UPDATE hotels SET capture_script = ${linkToken} WHERE id = ${email}

UPDATE users SET line_id = null, link_token = null, nonce = null  WHERE email = 'user@nextmail.com';

-- ユーザー追加
INSERT INTO users (name, email, password) VALUES ('Test', 'test@nextmail.com', '$2b$10$fumaJC.VIR/NyWzWnJy3m.W/WRkJ.O49CwcDcxd8kIFESG2gVvHB6');

-- watchlist追加
INSERT INTO watchlist (user_id, hotel_id, cid, threshold, start_date, status) VALUES ('8022354a-e36e-4488-8736-d90802f99069', '3041f199-0049-406b-b862-8422c48f7708', '2023-12-20', 50000, '2023-11-13', 'watching');

-- 価格取得（hotel_id & cidの組み合わせでCONSTRAINT）
INSERT INTO prices (hotel_id, cid, price, is_soldout, capture_date)
VALUES (${price.hotel_id}, ${price.cid}, ${price.price}, ${price.is_soldout}, ${price.capture_date})
ON CONFLICT ON CONSTRAINT unique_night DO UPDATE SET
    hotel_id = EXCLUDED.hotel_id,
    cid = EXCLUDED.cid,
    price = EXCLUDED.price,
    is_soldout = EXCLUDED.is_soldout,
    capture_date = EXCLUDED.capture_date;

ALTER TABLE prices DROP CONSTRAINT unique_night;
ALTER TABLE prices ADD CONSTRAINT capture_unit UNIQUE (hotel_id,cid,capture_date);

-- 価格取得（hotel_id & cid & capture_dateの組み合わせでCONSTRAINT）
INSERT INTO prices (hotel_id, cid, price, is_soldout, capture_date)
VALUES (${price.hotel_id}, ${price.cid}, ${price.price}, ${price.is_soldout}, ${price.capture_date})
ON CONFLICT ON CONSTRAINT capture_unit DO UPDATE SET
    hotel_id = EXCLUDED.hotel_id,
    cid = EXCLUDED.cid,
    price = EXCLUDED.price,
    is_soldout = EXCLUDED.is_soldout,
    capture_date = EXCLUDED.capture_date;

-- テーブル名変更
ALTER TABLE prices RENAME TO rates;

-- カラムの追加
ALTER TABLE hotels ADD COLUMN capture_script VARCHAR(50); 
ALTER TABLE hotels ADD COLUMN capture_month_count INT NOT NULL DEFAULT 2; 

-- カラム名変更
ALTER TABLE rates RENAME COLUMN is_soldout TO exception;
ALTER TABLE watchlist RENAME COLUMN threshold TO basis;
ALTER TABLE watchlist RENAME COLUMN start_date TO init_date;

-- カラム型変更
ALTER TABLE logs ALTER COLUMN result TYPE VARCHAR(50);
ALTER TABLE rates ALTER COLUMN price TYPE INT;
ALTER TABLE logs ALTER COLUMN capture_datetime TYPE timestamp;

-- NOT NULL制約解除
ALTER TABLE rates ALTER COLUMN price DROP NOT NULL;
ALTER TABLE rates ALTER COLUMN exception DROP NOT NULL;

-- 古いキャプチャを削除
DELETE FROM rates WHERE capture_date = '2023-11-13'

-- デフォルト値の追加
ALTER TABLE watchlist ALTER COLUMN status SET DEFAULT 'watching'

-- カラム削除
ALTER TABLE watchlist DROP COLUMN init_date; 


-- テーブル作成
CREATE TABLE IF NOT EXISTS logs (
    id SERIAL PRIMARY KEY,
    hotel_id UUID NOT NULL,
    capture_month VARCHAR(11) NOT NULL,
    result VARCHAR(11) NOT NULL,
    capture_time DATE NOT NULL,
    save_time DATE
);

-- サンプルデータ挿入
INSERT INTO logs (hotel_id, capture_month, result, capture_timestamp, save_timestamp)
VALUES ('857817cd-0cfa-4f01-babc-aff31b6e0224', '2023-11', 'success', '2023-11-18 15:45:20', '2023-11-18 15:46:37')
ON CONFLICT DO NOTHING;