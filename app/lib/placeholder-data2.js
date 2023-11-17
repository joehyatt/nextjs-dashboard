const hotels = [
    {group_code:'hilton',group_name_jp:'ヒルトン',group_name_en:'Hilton',brand_code:'conrad',brand_name_jp:'コンラッド',brand_name_en:'Conrad',hotel_code:'TYOCICI',hotel_name_jp:'コンラッド東京',hotel_name_en:'Conrad Tokyo',},
{group_code:'hilton',group_name_jp:'ヒルトン',group_name_en:'Hilton',brand_code:'hilton',brand_name_jp:'ヒルトン',brand_name_en:'Hilton',hotel_code:'TYOTBTW',hotel_name_jp:'ヒルトン東京ベイ',hotel_name_en:'Hilton Tokyo Bay',},
{group_code:'hilton',group_name_jp:'ヒルトン',group_name_en:'Hilton',brand_code:'hilton',brand_name_jp:'ヒルトン',brand_name_en:'Hilton',hotel_code:'TYOTOHI',hotel_name_jp:'ヒルトン東京お台場',hotel_name_en:'Hilton Tokyo Odaiba',},
{group_code:'hilton',group_name_jp:'ヒルトン',group_name_en:'Hilton',brand_code:'hilton',brand_name_jp:'ヒルトン',brand_name_en:'Hilton',hotel_code:'TYOODHI',hotel_name_jp:'ヒルトン小田原リゾート＆スパ',hotel_name_en:'Hilton Odawara Resort & Spa',},
{group_code:'hilton',group_name_jp:'ヒルトン',group_name_en:'Hilton',brand_code:'hilton',brand_name_jp:'ヒルトン',brand_name_en:'Hilton',hotel_code:'NRTHIHI',hotel_name_jp:'ヒルトン成田',hotel_name_en:'Hilton Tokyo Narita Airport',},
{group_code:'hilton',group_name_jp:'ヒルトン',group_name_en:'Hilton',brand_code:'hilton',brand_name_jp:'ヒルトン',brand_name_en:'Hilton',hotel_code:'CTSNVHI',hotel_name_jp:'ヒルトンニセコビレッジ',hotel_name_en:'Hilton Niseko Village',},
{group_code:'hilton',group_name_jp:'ヒルトン',group_name_en:'Hilton',brand_code:'hilton',brand_name_jp:'ヒルトン',brand_name_en:'Hilton',hotel_code:'NAGHITW',hotel_name_jp:'ヒルトン名古屋',hotel_name_en:'Hilton Nagoya',},
{group_code:'hilton',group_name_jp:'ヒルトン',group_name_en:'Hilton',brand_code:'curio',brand_name_jp:'キュリオ・コレクション',brand_name_en:'Curio Collection',hotel_code:'MMJKZQQ',hotel_name_jp:'旧軽井沢KIKYOキュリオ・コレクションbyヒルトン',hotel_name_en:'Kyukaruizawa Kikyo, Curio Collection by Hilton',},
{group_code:'hilton',group_name_jp:'ヒルトン',group_name_en:'Hilton',brand_code:'hilton',brand_name_jp:'ヒルトン',brand_name_en:'Hilton',hotel_code:'OSAHITW',hotel_name_jp:'ヒルトン大阪',hotel_name_en:'Hilton Osaka',},
{group_code:'hilton',group_name_jp:'ヒルトン',group_name_en:'Hilton',brand_code:'conrad',brand_name_jp:'コンラッド',brand_name_en:'Conrad',hotel_code:'OSACICI',hotel_name_jp:'コンラッド大阪',hotel_name_en:'Conrad Osaka',},
{group_code:'hilton',group_name_jp:'ヒルトン',group_name_en:'Hilton',brand_code:'lxr',brand_name_jp:'LXR ホテルズ＆リゾーツ',brand_name_en:'LXR Hotels & Resorts',hotel_code:'ITMOLOL',hotel_name_jp:'ROKU KYOTO, LXR ホテルズ＆リゾーツ',hotel_name_en:'ROKU KYOTO, LXR Hotels & Resorts',},
{group_code:'hilton',group_name_jp:'ヒルトン',group_name_en:'Hilton',brand_code:'gardeninn',brand_name_jp:'ヒルトン・ガーデン・イン',brand_name_en:'Hilton Garden Inn',hotel_code:'ITMKYGI',hotel_name_jp:'ヒルトン・ガーデン・イン京都四条烏丸',hotel_name_en:'Hilton Garden Inn Kyoto Shijo Karasuma',},
{group_code:'hilton',group_name_jp:'ヒルトン',group_name_en:'Hilton',brand_code:'doubletree',brand_name_jp:'ダブルツリー',brand_name_en:'DoubleTree',hotel_code:'ITMHADI',hotel_name_jp:'ダブルツリーbyヒルトン京都東山',hotel_name_en:'DoubleTree by Hilton Kyoto Higashiyama',},
{group_code:'hilton',group_name_jp:'ヒルトン',group_name_en:'Hilton',brand_code:'hilton',brand_name_jp:'ヒルトン',brand_name_en:'Hilton',hotel_code:'FUKHIHI',hotel_name_jp:'ヒルトン福岡シーホーク',hotel_name_en:'Hilton Fukuoka Sea Hawk',},
{group_code:'hilton',group_name_jp:'ヒルトン',group_name_en:'Hilton',brand_code:'hilton',brand_name_jp:'ヒルトン',brand_name_en:'Hilton',hotel_code:'NGSJPHI',hotel_name_jp:'ヒルトン長崎',hotel_name_en:'Hilton Nagasaki',},
{group_code:'hilton',group_name_jp:'ヒルトン',group_name_en:'Hilton',brand_code:'hilton',brand_name_jp:'ヒルトン',brand_name_en:'Hilton',hotel_code:'OKAOCHI',hotel_name_jp:'ヒルトン沖縄北谷リゾート',hotel_name_en:'Hilton Okinawa Chatan Resort',},
{group_code:'hilton',group_name_jp:'ヒルトン',group_name_en:'Hilton',brand_code:'doubletree',brand_name_jp:'ダブルツリー',brand_name_en:'DoubleTree',hotel_code:'OKADIDI',hotel_name_jp:'ダブルツリーbyヒルトン沖縄北谷リゾート',hotel_name_en:'DoubleTree by Hilton Okinawa Chatan Resort',},
{group_code:'hilton',group_name_jp:'ヒルトン',group_name_en:'Hilton',brand_code:'doubletree',brand_name_jp:'ダブルツリー',brand_name_en:'DoubleTree',hotel_code:'OKANADI',hotel_name_jp:'ダブルツリー by ヒルトン那覇',hotel_name_en:'DoubleTree by Hilton Hotel Naha',},
{group_code:'hilton',group_name_jp:'ヒルトン',group_name_en:'Hilton',brand_code:'doubletree',brand_name_jp:'ダブルツリー',brand_name_en:'DoubleTree',hotel_code:'OKANJDI',hotel_name_jp:'ダブルツリー by ヒルトン那覇首里城',hotel_name_en:'DoubleTree by Hilton Hotel Naha Shuri Castle',},
{group_code:'hilton',group_name_jp:'ヒルトン',group_name_en:'Hilton',brand_code:'hilton',brand_name_jp:'ヒルトン',brand_name_en:'Hilton',hotel_code:'OKASEHI',hotel_name_jp:'ヒルトン沖縄瀬底リゾート',hotel_name_en:'Hilton Okinawa Sesoko Resort',},
{group_code:'hilton',group_name_jp:'ヒルトン',group_name_en:'Hilton',brand_code:'hilton',brand_name_jp:'ヒルトン',brand_name_en:'Hilton',hotel_code:'OKAMIHI',hotel_name_jp:'ヒルトン沖縄宮古島リゾート',hotel_name_en:'Hilton Okinawa Miyako Island Resort',},
{group_code:'hilton',group_name_jp:'ヒルトン',group_name_en:'Hilton',brand_code:'hilton',brand_name_jp:'ヒルトン',brand_name_en:'Hilton',hotel_code:'HNDHIHI',hotel_name_jp:'ヒルトン横浜',hotel_name_en:'Hilton Yokohama',},
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
    watchlist,
};
  