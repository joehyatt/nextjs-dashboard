const hotels = [
    {group_code:'marriott',group_name_jp:'マリオット',group_name_en:'Marriott',brand_code:'stregis',brand_name_jp:'セントレジス',brand_name_en:'St.Regis',hotel_code:'OSAXR',hotel_name_jp:'セントレジスホテル大阪',hotel_name_en:'The St. Regis Osaka',},
    {group_code:'marriott',group_name_jp:'マリオット',group_name_en:'Marriott',brand_code:'tp',brand_name_jp:'トリビュートポートフォリオ',brand_name_en:'Tribute Portfolio',hotel_code:'OSAKT',hotel_name_jp:'チャプター京都 トリビュートポートフォリオホテル',hotel_name_en:'The Chapter Kyoto, a Tribute Portfolio Hotel',},
    {group_code:'marriott',group_name_jp:'マリオット',group_name_en:'Marriott',brand_code:'whotel',brand_name_jp:'Wホテル',brand_name_en:'W Hotels',hotel_code:'OSAOW',hotel_name_jp:'Ｗ大阪',hotel_name_en:'W Osaka',},
    {group_code:'marriott',group_name_jp:'マリオット',group_name_en:'Marriott',brand_code:'westin',brand_name_jp:'ウェスティン',brand_name_en:'Westin',hotel_code:'UKYWI',hotel_name_jp:'ウェスティン都ホテル京都',hotel_name_en:'The Westin Miyako Kyoto',},
    {group_code:'marriott',group_name_jp:'マリオット',group_name_en:'Marriott',brand_code:'westin',brand_name_jp:'ウェスティン',brand_name_en:'Westin',hotel_code:'OSAWI',hotel_name_jp:'ウェスティンホテル大阪',hotel_name_en:'The Westin Osaka',},
    {group_code:'marriott',group_name_jp:'マリオット',group_name_en:'Marriott',brand_code:'westin',brand_name_jp:'ウェスティン',brand_name_en:'Westin',hotel_code:'CTSWI',hotel_name_jp:'ウェスティン ルスツリゾート',hotel_name_en:'The Westin Rusutsu Resort',},
    {group_code:'marriott',group_name_jp:'マリオット',group_name_en:'Marriott',brand_code:'westin',brand_name_jp:'ウェスティン',brand_name_en:'Westin',hotel_code:'SDJWI',hotel_name_jp:'ウェスティンホテル仙台',hotel_name_en:'The Westin Sendai',},
    {group_code:'marriott',group_name_jp:'マリオット',group_name_en:'Marriott',brand_code:'westin',brand_name_jp:'ウェスティン',brand_name_en:'Westin',hotel_code:'TYOWI',hotel_name_jp:'ウェスティンホテル東京',hotel_name_en:'The Westin Tokyo',},
    {group_code:'marriott',group_name_jp:'マリオット',group_name_en:'Marriott',brand_code:'westin',brand_name_jp:'ウェスティン',brand_name_en:'Westin',hotel_code:'TYOWY',hotel_name_jp:'ウェスティンホテル横浜',hotel_name_en:'The Westin Yokohama',},
    {group_code:'marriott',group_name_jp:'マリオット',group_name_en:'Marriott',brand_code:'ritz-carlton',brand_name_jp:'リッツ・カールトン',brand_name_en:'Ritz-Carlton',hotel_code:'UKYRZ',hotel_name_jp:'ザ・リッツ・カールトン京都',hotel_name_en:'The Ritz-Carlton, Kyoto',},
    {group_code:'marriott',group_name_jp:'マリオット',group_name_en:'Marriott',brand_code:'ritz-carlton',brand_name_jp:'リッツ・カールトン',brand_name_en:'Ritz-Carlton',hotel_code:'OSARZ',hotel_name_jp:'ザ・リッツ・カールトン大阪',hotel_name_en:'The Ritz-Carlton, Osaka',},
    {group_code:'marriott',group_name_jp:'マリオット',group_name_en:'Marriott',brand_code:'ritz-carlton',brand_name_jp:'リッツ・カールトン',brand_name_en:'Ritz-Carlton',hotel_code:'OKARZ',hotel_name_jp:'ザ・リッツ・カールトン沖縄',hotel_name_en:'The Ritz-Carlton, Okinawa',},
    {group_code:'marriott',group_name_jp:'マリオット',group_name_en:'Marriott',brand_code:'ritz-carlton',brand_name_jp:'リッツ・カールトン',brand_name_en:'Ritz-Carlton',hotel_code:'TYONZ',hotel_name_jp:'ザ・リッツ・カールトン日光',hotel_name_en:'The Ritz-Carlton, Nikko',},
    {group_code:'marriott',group_name_jp:'マリオット',group_name_en:'Marriott',brand_code:'ritz-carlton',brand_name_jp:'リッツ・カールトン',brand_name_en:'Ritz-Carlton',hotel_code:'TYORZ',hotel_name_jp:'ザ・リッツ・カールトン東京',hotel_name_en:'The Ritz-Carlton, Tokyo',},
    {group_code:'marriott',group_name_jp:'マリオット',group_name_en:'Marriott',brand_code:'ritz-carlton',brand_name_jp:'リッツ・カールトン',brand_name_en:'Ritz-Carlton',hotel_code:'FUKRZ',hotel_name_jp:'ザ・リッツ・カールトン福岡',hotel_name_en:'The Ritz-Carlton, Fukuoka',},
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
  