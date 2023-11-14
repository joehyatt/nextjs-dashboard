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