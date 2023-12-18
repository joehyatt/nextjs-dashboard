const hotels = [
    {country_code:'MY',group_code:'hilton',group_name_jp:'ヒルトン',group_name_en:'Hilton',brand_code:'doubletree',brand_name_jp:'ダブルツリー',brand_name_en:'DoubleTree',hotel_code:'KULDTDI',hotel_name_jp:'ダブルツリーバイヒルトンクアラルンプール',hotel_name_en:'DoubleTree by Hilton Kuala Lumpur',},
    {country_code:'MY',group_code:'hilton',group_name_jp:'ヒルトン',group_name_en:'Hilton',brand_code:'gardeninn',brand_name_jp:'ヒルトンガーデンイン',brand_name_en:'Hilton Garden Inn',hotel_code:'KULUMGI',hotel_name_jp:'ヒルトンガーデンインクアラルンプールジャラントゥアンクアブドゥルラーマンノース',hotel_name_en:'Hilton Garden Inn Kuala Lumpur Jalan Tuanku Abdul Rahman North',},
    {country_code:'MY',group_code:'hilton',group_name_jp:'ヒルトン',group_name_en:'Hilton',brand_code:'gardeninn',brand_name_jp:'ヒルトンガーデンイン',brand_name_en:'Hilton Garden Inn',hotel_code:'KULMYGI',hotel_name_jp:'ヒルトンガーデンインクアラルンプールジャラントゥアンクアブドゥルラーマンサウス',hotel_name_en:'Hilton Garden Inn Kuala Lumpur Jalan Tuanku Abdul Rahman South',},
    {country_code:'MY',group_code:'hilton',group_name_jp:'ヒルトン',group_name_en:'Hilton',brand_code:'hilton',brand_name_jp:'ヒルトン',brand_name_en:'Hilton',hotel_code:'KULHIHI',hotel_name_jp:'ヒルトンクアラルンプール',hotel_name_en:'Hilton Kuala Lumpur',},
    {country_code:'MY',group_code:'hilton',group_name_jp:'ヒルトン',group_name_en:'Hilton',brand_code:'hilton',brand_name_jp:'ヒルトン',brand_name_en:'Hilton',hotel_code:'PETHITW',hotel_name_jp:'ヒルトンプタリンジャヤ',hotel_name_en:'Hilton Petaling Jaya',},
    {country_code:'MY',group_code:'hilton',group_name_jp:'ヒルトン',group_name_en:'Hilton',brand_code:'gardeninn',brand_name_jp:'ヒルトンガーデンイン',brand_name_en:'Hilton Garden Inn',hotel_code:'KULPUGI',hotel_name_jp:'ヒルトンガーデンインプチョン',hotel_name_en:'Hilton Garden Inn Puchong',},
    {country_code:'MY',group_code:'hilton',group_name_jp:'ヒルトン',group_name_en:'Hilton',brand_code:'doubletree',brand_name_jp:'ダブルツリー',brand_name_en:'DoubleTree',hotel_code:'SZBSADI',hotel_name_jp:'ダブルツリーバイヒルトンシャーアラムアイシティ',hotel_name_en:'DoubleTree by Hilton Shah Alam i-City',},
    {country_code:'MY',group_code:'hilton',group_name_jp:'ヒルトン',group_name_en:'Hilton',brand_code:'doubletree',brand_name_jp:'ダブルツリー',brand_name_en:'DoubleTree',hotel_code:'KULPRDI',hotel_name_jp:'ダブルツリーバイヒルトンプトラジャヤレイクサイド',hotel_name_en:'DoubleTree by Hilton Putrajaya Lakeside',},
    {country_code:'MY',group_code:'hilton',group_name_jp:'ヒルトン',group_name_en:'Hilton',brand_code:'doubletree',brand_name_jp:'ダブルツリー',brand_name_en:'DoubleTree',hotel_code:'MKZMMDI',hotel_name_jp:'ダブルツリーバイヒルトンマラッカ',hotel_name_en:'DoubleTree by Hilton Melaka',},
];

const prices = [
    {
        hotel_id: '3041f199-0049-406b-b862-8422c48f7708',
        cid: '2023-12-01',
        price: 10680,
        is_soldout: false,
        capture_date: '2023-11-11',
    },
    {
        hotel_id: '3041f199-0049-406b-b862-8422c48f7708',
        cid: '2023-12-02',
        price: 11230,
        is_soldout: false,
        capture_date: '2023-11-11',
    },
    {
        hotel_id: '3041f199-0049-406b-b862-8422c48f7708',
        cid: '2023-12-03',
        price: 9850,
        is_soldout: false,
        capture_date: '2023-11-11',
    },
];

const watchlist = [
    {
        user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
        hotel_id: '3041f199-0049-406b-b862-8422c48f7708',
        cid: '2023-11-24',
        threshold: 80000,
        start_date: '2023-11-13',
        status: 'watching',
    },
    {
        user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
        hotel_id: '3041f199-0049-406b-b862-8422c48f7708',
        cid: '2023-11-25',
        threshold: 32500,
        start_date: '2023-11-13',
        status: 'watching',
    },
    {
        user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
        hotel_id: '3041f199-0049-406b-b862-8422c48f7708',
        cid: '2023-11-26',
        threshold: 92500,
        start_date: '2023-11-13',
        status: 'watching',
    },
];

module.exports = {
    hotels,
    // prices,
    // watchlist,
};
  