const hotels = [
    {group_code:'hyatt',group_name_jp:'ハイアット',group_name_en:'Hyatt',brand_code:'hyattregency',brand_name_jp:'ハイアットリージェンシー',brand_name_en:'Hyatt Regency',hotel_code:'nrtzt',hotel_name_jp:'ハイアットリージェンシー東京ベイ',hotel_name_en:'Hyatt Regency Tokyo Bay',},
{group_code:'hyatt',group_name_jp:'ハイアット',group_name_en:'Hyatt',brand_code:'hyattregency',brand_name_jp:'ハイアットリージェンシー',brand_name_en:'Hyatt Regency',hotel_code:'hndry',hotel_name_jp:'ハイアットリージェンシー横浜',hotel_name_en:'Hyatt Regency Yokohama',},
{group_code:'hyatt',group_name_jp:'ハイアット',group_name_en:'Hyatt',brand_code:'hyattregency',brand_name_jp:'ハイアットリージェンシー',brand_name_en:'Hyatt Regency',hotel_code:'hakhr',hotel_name_jp:'ハイアットリージェンシー箱根リゾート＆スパ',hotel_name_en:'Hyatt Regency Hakone Resort & Spa',},
{group_code:'hyatt',group_name_jp:'ハイアット',group_name_en:'Hyatt',brand_code:'grandhyatt',brand_name_jp:'グランドハイアット',brand_name_en:'Grand Hyatt',hotel_code:'fukgh',hotel_name_jp:'グランドハイアット福岡',hotel_name_en:'Grand Hyatt Fukuoka',},
{group_code:'hyatt',group_name_jp:'ハイアット',group_name_en:'Hyatt',brand_code:'hyattcentric',brand_name_jp:'ハイアットセントリック',brand_name_en:'Hyatt Centric',hotel_code:'kmqct',hotel_name_jp:'ハイアットセントリック金沢',hotel_name_en:'Hyatt Centric Kanazawa',},
{group_code:'hyatt',group_name_jp:'ハイアット',group_name_en:'Hyatt',brand_code:'hyattregency',brand_name_jp:'ハイアットリージェンシー',brand_name_en:'Hyatt Regency',hotel_code:'okaro',hotel_name_jp:'ハイアットリージェンシー瀬良垣アイランド沖縄',hotel_name_en:'Hyatt Regency Seragaki Island, Okinawa',},
{group_code:'hyatt',group_name_jp:'ハイアット',group_name_en:'Hyatt',brand_code:'hyattregency',brand_name_jp:'ハイアットリージェンシー',brand_name_en:'Hyatt Regency',hotel_code:'tyoty',hotel_name_jp:'ハイアットリージェンシー東京',hotel_name_en:'Hyatt Regency Tokyo',},
{group_code:'hyatt',group_name_jp:'ハイアット',group_name_en:'Hyatt',brand_code:'grandhyatt',brand_name_jp:'グランドハイアット',brand_name_en:'Grand Hyatt',hotel_code:'tyogh',hotel_name_jp:'グランドハイアット東京',hotel_name_en:'Grand Hyatt Tokyo',},
{group_code:'hyatt',group_name_jp:'ハイアット',group_name_en:'Hyatt',brand_code:'hyattregency',brand_name_jp:'ハイアットリージェンシー',brand_name_en:'Hyatt Regency',hotel_code:'okarn',hotel_name_jp:'ハイアットリージェンシー那覇沖縄',hotel_name_en:'Hyatt Regency Naha, Okinawa',},
{group_code:'hyatt',group_name_jp:'ハイアット',group_name_en:'Hyatt',brand_code:'hyatthouse',brand_name_jp:'ハイアットハウス',brand_name_en:'Hyatt House',hotel_code:'kmqxk',hotel_name_jp:'ハイアットハウス 金沢',hotel_name_en:'Hyatt House Kanazawa',},
{group_code:'hyatt',group_name_jp:'ハイアット',group_name_en:'Hyatt',brand_code:'hyattregency',brand_name_jp:'ハイアットリージェンシー',brand_name_en:'Hyatt Regency',hotel_code:'kyoto',hotel_name_jp:'ハイアットリージェンシー京都',hotel_name_en:'Hyatt Regency Kyoto',},
{group_code:'hyatt',group_name_jp:'ハイアット',group_name_en:'Hyatt',brand_code:'parkhyatt',brand_name_jp:'パークハイアット',brand_name_en:'Park Hyatt',hotel_code:'tyoph',hotel_name_jp:'パークハイアット東京',hotel_name_en:'Park Hyatt Tokyo',},
{group_code:'hyatt',group_name_jp:'ハイアット',group_name_en:'Hyatt',brand_code:'hyattplace',brand_name_jp:'ハイアットプレイス',brand_name_en:'Hyatt Place',hotel_code:'kyozk',hotel_name_jp:'ハイアットプレイス京都',hotel_name_en:'Hyatt Place Kyoto',},
{group_code:'hyatt',group_name_jp:'ハイアット',group_name_en:'Hyatt',brand_code:'hyattcentric',brand_name_jp:'ハイアットセントリック',brand_name_en:'Hyatt Centric',hotel_code:'tyoct',hotel_name_jp:'ハイアットセントリック銀座東京',hotel_name_en:'Hyatt Centric Ginza Tokyo',},
{group_code:'hyatt',group_name_jp:'ハイアット',group_name_en:'Hyatt',brand_code:'unbound',brand_name_jp:'アンバウンドコレクション',brand_name_en:'Unbound Collection',hotel_code:'fswub',hotel_name_jp:'富士スピードウェイホテル - アンバウンドコレクション by Hyatt',hotel_name_en:'Fuji Speedway Hotel - The Unbound Collection by Hyatt',},
{group_code:'hyatt',group_name_jp:'ハイアット',group_name_en:'Hyatt',brand_code:'parkhyatt',brand_name_jp:'パークハイアット',brand_name_en:'Park Hyatt',hotel_code:'itmph',hotel_name_jp:'パークハイアット京都',hotel_name_en:'Park Hyatt Kyoto',},
{group_code:'hyatt',group_name_jp:'ハイアット',group_name_en:'Hyatt',brand_code:'andaz',brand_name_jp:'アンダーズ',brand_name_en:'Andaz',hotel_code:'tyoaz',hotel_name_jp:'アンダーズ東京',hotel_name_en:'Andaz Tokyo',},
{group_code:'hyatt',group_name_jp:'ハイアット',group_name_en:'Hyatt',brand_code:'parkhyatt',brand_name_jp:'パークハイアット',brand_name_en:'Park Hyatt',hotel_code:'ctsph',hotel_name_jp:'パークハイアットニセコHANAZONO',hotel_name_en:'Park Hyatt Niseko Hanazono',},
{group_code:'hyatt',group_name_jp:'ハイアット',group_name_en:'Hyatt',brand_code:'unbound',brand_name_jp:'アンバウンドコレクション',brand_name_en:'Unbound Collection',hotel_code:'tyoub',hotel_name_jp:'ホテル虎ノ門ヒルズ - アンバウンドコレクション by Hyatt',hotel_name_en:'Hotel Toranomon Hills - The Unbound Collection by Hyatt',},
{group_code:'hyatt',group_name_jp:'ハイアット',group_name_en:'Hyatt',brand_code:'hyatthouse',brand_name_jp:'ハイアットハウス',brand_name_en:'Hyatt House',hotel_code:'tyoxs',hotel_name_jp:'ハイアットハウス東京渋谷',hotel_name_en:'Hyatt House Tokyo Shibuya',},
{group_code:'hyatt',group_name_jp:'ハイアット',group_name_en:'Hyatt',brand_code:'caption',brand_name_jp:'キャプション',brand_name_en:'Caption',hotel_code:'osacp',hotel_name_jp:'キャプション by Hyatt なんば大阪',hotel_name_en:'Caption by Hyatt Namba, Osaka',},
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
  