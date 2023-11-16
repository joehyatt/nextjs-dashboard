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


-- カラムの追加
ALTER TABLE users ADD COLUMN link_token VARCHAR(255); 


UPDATE users SET link_token = ${linkToken} WHERE email = ${email}

UPDATE users SET line_id = null, link_token = null, nonce = null  WHERE email = 'user@nextmail.com';

-- ユーザー追加
INSERT INTO users (name, email, password) VALUES ('Test', 'test@nextmail.com', '$2b$10$fumaJC.VIR/NyWzWnJy3m.W/WRkJ.O49CwcDcxd8kIFESG2gVvHB6');

-- watchlist追加
INSERT INTO watchlist (user_id, hotel_id, cid, threshold, start_date, status) VALUES ('8022354a-e36e-4488-8736-d90802f99069', '3041f199-0049-406b-b862-8422c48f7708', '2023-12-20', 50000, '2023-11-13', 'watching');