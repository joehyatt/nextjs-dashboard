const hotels = [
    {
        group_code: 'hilton',
        group_name_jp: 'ヒルトン',
        group_name_en: 'Hilton',
        brand_code: 'hilton',
        brand_name_jp: 'ヒルトン',
        brand_name_en: 'Hilton',
        hotel_code: 'TYOHITW',
        hotel_name_jp: 'ヒルトン東京',
        hotel_name_en: 'Hilton Tokyo',
    },
    {
        group_code: 'hilton',
        group_name_jp: 'ヒルトン',
        group_name_en: 'Hilton',
        brand_code: 'hilton',
        brand_name_jp: 'ヒルトン',
        brand_name_en: 'Hilton',
        hotel_code: 'HIJSHHI',
        hotel_name_jp: 'ヒルトン広島',
        hotel_name_en: 'Hilton Hiroshima',
    },
    {
        group_code: 'hilton',
        group_name_jp: 'ヒルトン',
        group_name_en: 'Hilton',
        brand_code: 'doubletree',
        brand_name_jp: 'ダブルツリー',
        brand_name_en: 'DoubleTree',
        hotel_code: 'TOYSHDI',
        hotel_name_jp: 'ダブルツリーbyヒルトン富山',
        hotel_name_en: 'DoubleTree by Hilton Toyama',
    },
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
    // hotels,
    // prices,
    watchlist,
};
  