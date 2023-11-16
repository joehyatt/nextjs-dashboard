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

INSERT INTO users (name, email, password) VALUES ('Test', 'test@nextmail.com', '$2b$10$fumaJC.VIR/NyWzWnJy3m.W/WRkJ.O49CwcDcxd8kIFESG2gVvHB6');