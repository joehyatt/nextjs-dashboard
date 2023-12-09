const hotels = [{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'intercontinental',brand_name_jp:'インターコンチネンタル',brand_name_en:'InterContinental',hotel_code:'TYOHC',hotel_name_jp:'ANAインターコンチネンタルホテル東京',hotel_name_en:'InterContinental - ANA Tokyo',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'intercontinental',brand_name_jp:'インターコンチネンタル',brand_name_en:'InterContinental',hotel_code:'TYOHB',hotel_name_jp:'ホテルインターコンチネンタル東京ベイ',hotel_name_en:'InterContinental Tokyo Bay',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'kimpton',brand_name_jp:'キンプトン',brand_name_en:'Kimpton',hotel_code:'TYOSJ',hotel_name_jp:'キンプトン新宿東京',hotel_name_en:'Kimpton Shinjuku Tokyo',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'indigo',brand_name_jp:'インディゴ',brand_name_en:'Indigo',hotel_code:'HNDSH',hotel_name_jp:'ホテルインディゴ東京渋谷',hotel_name_en:'Hotel Indigo Tokyo Shibuya',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'intercontinental',brand_name_jp:'インターコンチネンタル',brand_name_en:'InterContinental',hotel_code:'TYOSE',hotel_name_jp:'ストリングスホテル東京インターコンチネンタル',hotel_name_en:'InterContinental The Strings Tokyo',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'intercontinental',brand_name_jp:'インターコンチネンタル',brand_name_en:'InterContinental',hotel_code:'TYOYH',hotel_name_jp:'インターコンチネンタル横浜Pier 8',hotel_name_en:'InterContinental Yokohama Pier 8',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'intercontinental',brand_name_jp:'インターコンチネンタル',brand_name_en:'InterContinental',hotel_code:'YOKHA',hotel_name_jp:'ヨコハマグランドインターコンチネンタルホテル',hotel_name_en:'InterContinental Yokohama Grand',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'crowneplaza',brand_name_jp:'クラウンプラザ',brand_name_en:'Crowne Plaza',hotel_code:'NARCP',hotel_name_jp:'ANAクラウンプラザホテル成田',hotel_name_en:'Crowne Plaza - ANA Narita',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'indigo',brand_name_jp:'インディゴ',brand_name_en:'Indigo',hotel_code:'HKHHG',hotel_name_jp:'ホテルインディゴ箱根強羅',hotel_name_en:'Hotel Indigo Hakone Gora',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'indigo',brand_name_jp:'インディゴ',brand_name_en:'Indigo',hotel_code:'QNGKA',hotel_name_jp:'ホテルインディゴ軽井沢',hotel_name_en:'Hotel Indigo Karuizawa',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'holidayinn',brand_name_jp:'ホリデイ・イン',brand_name_en:'Holiday Inn',hotel_code:'QNGSH',hotel_name_jp:'ANAホリデイ・インリゾート信濃大町くろよん',hotel_name_en:'Holiday Inn Resort Shinano-Omachi Kuroyon',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'crowneplaza',brand_name_jp:'クラウンプラザ',brand_name_en:'Crowne Plaza',hotel_code:'TOYJA',hotel_name_jp:'ANAクラウンプラザホテル富山',hotel_name_en:'Crowne Plaza - ANA Toyama',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'crowneplaza',brand_name_jp:'クラウンプラザ',brand_name_en:'Crowne Plaza',hotel_code:'KIJCP',hotel_name_jp:'ANAクラウンプラザホテル新潟',hotel_name_en:'Crowne Plaza - ANA Niigata',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'indigo',brand_name_jp:'インディゴ',brand_name_en:'Indigo',hotel_code:'IUNKJ',hotel_name_jp:'ホテルインディゴ犬山有楽苑',hotel_name_en:'Hotel Indigo Inuyama Urakuen Garden',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'crowneplaza',brand_name_jp:'クラウンプラザ',brand_name_en:'Crowne Plaza',hotel_code:'NGOJA',hotel_name_jp:'ANAクラウンプラザホテルグランコート名古屋',hotel_name_en:'Crowne Plaza - ANA Hotel Grand Court Nagoya',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'holidayinn',brand_name_jp:'ホリデイ・イン',brand_name_en:'Holiday Inn',hotel_code:'QKWHI',hotel_name_jp:'ANAホリデイ・イン 金沢スカイ',hotel_name_en:'ANA Holiday Inn Kanazawa Sky',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'crowneplaza',brand_name_jp:'クラウンプラザ',brand_name_en:'Crowne Plaza',hotel_code:'QKWJA',hotel_name_jp:'ANAクラウンプラザホテル金沢',hotel_name_en:'Crowne Plaza - ANA Kanazawa',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'holidayinn',brand_name_jp:'ホリデイ・イン',brand_name_en:'Holiday Inn',hotel_code:'SDJJA',hotel_name_jp:'ANA ホリデイ・イン 仙台',hotel_name_en:'ANA Holiday Inn Sendai',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'crowneplaza',brand_name_jp:'クラウンプラザ',brand_name_en:'Crowne Plaza',hotel_code:'KSTNA',hotel_name_jp:'ANAクラウンプラザホテル京都',hotel_name_en:'Crowne Plaza - ANA Kyoto',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'holidayinn',brand_name_jp:'ホリデイ・イン',brand_name_en:'Holiday Inn',hotel_code:'OSASO',hotel_name_jp:'ホリデイ・イン&スイーツ新大阪',hotel_name_en:'Holiday Inn & Suites Shin Osaka',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'intercontinental',brand_name_jp:'インターコンチネンタル',brand_name_en:'InterContinental',hotel_code:'OSAHA',hotel_name_jp:'インターコンチネンタルホテル大阪',hotel_name_en:'InterContinental Osaka',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'crowneplaza',brand_name_jp:'クラウンプラザ',brand_name_en:'Crowne Plaza',hotel_code:'OSAJA',hotel_name_jp:'ANAクラウンプラザホテル大阪',hotel_name_en:'Crowne Plaza - ANA Osaka',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'holidayinnex',brand_name_jp:'ホリデイ・イン・エクスプレス',brand_name_en:'Holiday Inn Express',hotel_code:'OSAMS',hotel_name_jp:'ホリデイ・イン・エクスプレス大阪シティセンター御堂筋',hotel_name_en:'Holiday Inn Express Osaka City Centre - Midosuji',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'holidayinn',brand_name_jp:'ホリデイ・イン',brand_name_en:'Holiday Inn',hotel_code:'OSANA',hotel_name_jp:'ホリデイ・イン大阪難波',hotel_name_en:'Holiday Inn Osaka Namba',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'voco',brand_name_jp:'voco',brand_name_en:'voco',hotel_code:'OSAKN',hotel_name_jp:'voco大阪セントラル',hotel_name_en:'voco Osaka Central',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'crowneplaza',brand_name_jp:'クラウンプラザ',brand_name_en:'Crowne Plaza',hotel_code:'OSAKB',hotel_name_jp:'ANAクラウンプラザホテル神戸',hotel_name_en:'Crowne Plaza - ANA Kobe',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'crowneplaza',brand_name_jp:'クラウンプラザ',brand_name_en:'Crowne Plaza',hotel_code:'AXTCR',hotel_name_jp:'ANAクラウンプラザホテル秋田',hotel_name_en:'Crowne Plaza - ANA Akita',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'intercontinental',brand_name_jp:'インターコンチネンタル',brand_name_en:'InterContinental',hotel_code:'AXTAP',hotel_name_jp:'ANAインターコンチネンタル安比高原リゾート',hotel_name_en:'InterContinental - ANA Appi Kogen Resort',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'crowneplaza',brand_name_jp:'クラウンプラザ',brand_name_en:'Crowne Plaza',hotel_code:'AXTHC',hotel_name_jp:'ANAクラウンプラザリゾート安比高原',hotel_name_en:'Crowne Plaza - ANA Resort Appi Kogen',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'sixsenses',brand_name_jp:'シックスセンシズ',brand_name_en:'Six Senses',hotel_code:'UKYSS',hotel_name_jp:'シックスセンシズ京都',hotel_name_en:'Six Senses Kyoto',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'holidayinn',brand_name_jp:'ホリデイ・イン',brand_name_en:'Holiday Inn',hotel_code:'AXTCI',hotel_name_jp:'ANAホリデイ・インリゾート安比高原',hotel_name_en:'Holiday Inn Resort Appi Kogen',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'intercontinental',brand_name_jp:'インターコンチネンタル',brand_name_en:'InterContinental',hotel_code:'OKAHA',hotel_name_jp:'ANAインターコンチネンタル万座ビーチリゾート',hotel_name_en:'InterContinental - ANA Manza Beach Resort',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'intercontinental',brand_name_jp:'インターコンチネンタル',brand_name_en:'InterContinental',hotel_code:'OKAHB',hotel_name_jp:'ANAインターコンチネンタル石垣リゾート',hotel_name_en:'InterContinental - ANA Ishigaki Resort',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'crowneplaza',brand_name_jp:'クラウンプラザ',brand_name_en:'Crowne Plaza',hotel_code:'HAKJA',hotel_name_jp:'ANAクラウンプラザホテル福岡',hotel_name_en:'Crowne Plaza - ANA Fukuoka',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'crowneplaza',brand_name_jp:'クラウンプラザ',brand_name_en:'Crowne Plaza',hotel_code:'UBJJA',hotel_name_jp:'ANAクラウンプラザホテル宇部',hotel_name_en:'Crowne Plaza - ANA Ube',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'crowneplaza',brand_name_jp:'クラウンプラザ',brand_name_en:'Crowne Plaza',hotel_code:'KMJJA',hotel_name_jp:'ANAクラウンプラザホテル熊本ニュースカイ',hotel_name_en:'Crowne Plaza - ANA Kumamoto New Sky',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'intercontinental',brand_name_jp:'インターコンチネンタル',brand_name_en:'InterContinental',hotel_code:'OITKY',hotel_name_jp:'ANAインターコンチネンタル別府リゾート＆スパ',hotel_name_en:'InterContinental - ANA Beppu Resort & Spa',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'crowneplaza',brand_name_jp:'クラウンプラザ',brand_name_en:'Crowne Plaza',hotel_code:'NGSGH',hotel_name_jp:'ANAクラウンプラザホテル長崎グラバーヒル',hotel_name_en:'Crowne Plaza - ANA Nagasaki Gloverhill',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'crowneplaza',brand_name_jp:'クラウンプラザ',brand_name_en:'Crowne Plaza',hotel_code:'HIJJA',hotel_name_jp:'ANAクラウンプラザホテル広島',hotel_name_en:'Crowne Plaza - ANA Hiroshima',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'crowneplaza',brand_name_jp:'クラウンプラザ',brand_name_en:'Crowne Plaza',hotel_code:'MYJJA',hotel_name_jp:'ANAクラウンプラザホテル松山',hotel_name_en:'Crowne Plaza - ANA Matsuyama',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'holidayinn',brand_name_jp:'ホリデイ・イン',brand_name_en:'Holiday Inn',hotel_code:'KMIHI',hotel_name_jp:'ANAホリデイ・イン リゾート宮崎',hotel_name_en:'Holiday Inn Resort Miyazaki',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'crowneplaza',brand_name_jp:'クラウンプラザ',brand_name_en:'Crowne Plaza',hotel_code:'TTJJA',hotel_name_jp:'ANAクラウンプラザホテル米子',hotel_name_en:'Crowne Plaza - ANA Yonago',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'crowneplaza',brand_name_jp:'クラウンプラザ',brand_name_en:'Crowne Plaza',hotel_code:'OKJJA',hotel_name_jp:'ANAクラウンプラザホテル岡山',hotel_name_en:'Crowne Plaza - ANA Okayama',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'crowneplaza',brand_name_jp:'クラウンプラザ',brand_name_en:'Crowne Plaza',hotel_code:'SPKJA',hotel_name_jp:'ANAクラウンプラザホテル札幌',hotel_name_en:'Crowne Plaza - ANA Sapporo',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'holidayinn',brand_name_jp:'ホリデイ・イン',brand_name_en:'Holiday Inn',hotel_code:'SPKHI',hotel_name_jp:'ANAホリデイ・イン札幌すすきの',hotel_name_en:'ANA Holiday Inn Sapporo Susukino',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'crowneplaza',brand_name_jp:'クラウンプラザ',brand_name_en:'Crowne Plaza',hotel_code:'CTSJA',hotel_name_jp:'ANAクラウンプラザホテル千歳',hotel_name_en:'Crowne Plaza - ANA Chitose',},
{group_code:'ihg',group_name_jp:'IHG',group_name_en:'IHG',brand_code:'crowneplaza',brand_name_jp:'クラウンプラザ',brand_name_en:'Crowne Plaza',hotel_code:'KUHJA',hotel_name_jp:'ANAクラウンプラザホテル釧路',hotel_name_en:'Crowne Plaza - ANA Kushiro',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'mercure',brand_name_jp:'メルキュール',brand_name_en:'Mercure',hotel_code:'B9G5',hotel_name_jp:'メルキュール飛騨高山',hotel_name_en:'Mercure Hida Takayama',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'mercure',brand_name_jp:'メルキュール',brand_name_en:'Mercure',hotel_code:'C1F1',hotel_name_jp:'メルキュール東京日比谷',hotel_name_en:'Mercure Tokyo Hibiya',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'pullman',brand_name_jp:'プルマン',brand_name_en:'Pullman',hotel_code:'B137',hotel_name_jp:'プルマン東京田町',hotel_name_en:'Pullman Tokyo Tamachi',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'ibisstyles',brand_name_jp:'イビススタイルズ',brand_name_en:'ibis Styles',hotel_code:'B9H6',hotel_name_jp:'イビススタイルズ東京銀座',hotel_name_en:'ibis Styles Tokyo Ginza',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'mercure',brand_name_jp:'メルキュール',brand_name_en:'Mercure',hotel_code:'5701',hotel_name_jp:'メルキュール東京銀座',hotel_name_en:'Mercure Tokyo Ginza',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'ibisstyles',brand_name_jp:'イビススタイルズ',brand_name_en:'ibis Styles',hotel_code:'C185',hotel_name_jp:'イビススタイルズ東京銀座 East',hotel_name_en:'ibis Styles Tokyo Ginza East',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'mercure',brand_name_jp:'メルキュール',brand_name_en:'Mercure',hotel_code:'B7G7',hotel_name_jp:'メルキュール東京羽田エアポート',hotel_name_en:'Mercure Tokyo Haneda Airport',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'ibisstyles',brand_name_jp:'イビススタイルズ',brand_name_en:'ibis Styles',hotel_code:'B2X6',hotel_name_jp:'イビススタイルズ東京ベイ',hotel_name_en:'ibis Styles Tokyo Bay',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'mercure',brand_name_jp:'メルキュール',brand_name_en:'Mercure',hotel_code:'7490',hotel_name_jp:'メルキュール横須賀',hotel_name_en:'Mercure Yokosuka',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'mercure',brand_name_jp:'メルキュール',brand_name_en:'Mercure',hotel_code:'5300',hotel_name_jp:'ザ サイプレス メルキュールホテル名古屋',hotel_name_en:'The Cypress Mercure Hotel Nagoya',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'ibisstyles',brand_name_jp:'イビススタイルズ',brand_name_en:'ibis Styles',hotel_code:'B4F6',hotel_name_jp:'イビススタイルズ名古屋',hotel_name_en:'ibis Styles Nagoya',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'dhawa',brand_name_jp:'ダーワ',brand_name_en:'Dhawa',hotel_code:'C015',hotel_name_jp:'ダーワ悠洛京都',hotel_name_en:'Dhawa Yura Kyoto',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'ibisstyles',brand_name_jp:'イビススタイルズ',brand_name_en:'ibis Styles',hotel_code:'B9H7',hotel_name_jp:'イビススタイルズ京都四条',hotel_name_en:'ibis Styles Kyoto Shijo',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'garrya',brand_name_jp:'ギャリア',brand_name_en:'Garrya',hotel_code:'C016',hotel_name_jp:'ギャリア二条城京都',hotel_name_en:'Garrya Nijo Castle Kyoto',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'ibisstyles',brand_name_jp:'イビススタイルズ',brand_name_en:'ibis Styles',hotel_code:'9418',hotel_name_jp:'イビススタイルズ京都ステーション',hotel_name_en:'ibis Styles Kyoto Station',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'mercure',brand_name_jp:'メルキュール',brand_name_en:'Mercure',hotel_code:'B4F4',hotel_name_jp:'メルキュール京都ステーション',hotel_name_en:'Mercure Kyoto Station',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'ibisbudget',brand_name_jp:'イビスバジェット',brand_name_en:'ibis Budget',hotel_code:'B5X1',hotel_name_jp:'イビスバジェット大阪梅田',hotel_name_en:'ibis Budget Osaka Umeda',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'ibis',brand_name_jp:'イビス',brand_name_en:'ibis',hotel_code:'A5U8',hotel_name_jp:'イビス大阪梅田',hotel_name_en:'ibis Osaka Umeda',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'ibisstyles',brand_name_jp:'イビススタイルズ',brand_name_en:'ibis Styles',hotel_code:'A0E7',hotel_name_jp:'イビススタイルズ大阪難波',hotel_name_en:'ibis Styles Osaka Namba',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'mercure',brand_name_jp:'メルキュール',brand_name_en:'Mercure',hotel_code:'B9I7',hotel_name_jp:'メルキュール東急ステイ大阪難波',hotel_name_en:'Mercure Tokyu Stay Osaka Namba',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'swissotel',brand_name_jp:'スイスホテル',brand_name_en:'Swissôtel',hotel_code:'A5C3',hotel_name_jp:'スイスホテル南海大阪',hotel_name_en:'Swissôtel Nankai Osaka',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'ibisstyles',brand_name_jp:'イビススタイルズ',brand_name_en:'ibis Styles',hotel_code:'9730',hotel_name_jp:'イビス スタイルズ札幌',hotel_name_en:'ibis Styles Sapporo',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'mercure',brand_name_jp:'メルキュール',brand_name_en:'Mercure',hotel_code:'7023',hotel_name_jp:'メルキュール札幌',hotel_name_en:'Mercure Sapporo',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'novotel',brand_name_jp:'ノボテル',brand_name_en:'Novotel',hotel_code:'B2P9',hotel_name_jp:'ノボテル沖縄那覇',hotel_name_en:'Novotel Okinawa Naha',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'mercure',brand_name_jp:'メルキュール',brand_name_en:'Mercure',hotel_code:'8725',hotel_name_jp:'メルキュール沖縄那覇',hotel_name_en:'Mercure Okinawa Naha',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'grandmercure',brand_name_jp:'グランドメルキュール',brand_name_en:'Grand Mercure',hotel_code:'C1R1',hotel_name_jp:'グランドメルキュール八ヶ岳リゾート&スパ',hotel_name_en:'Grand Mercure Yatsugatake Resort & Spa',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'mercure',brand_name_jp:'メルキュール',brand_name_en:'Mercure',hotel_code:'C1Q8',hotel_name_jp:'メルキュール長野松代リゾート&スパ',hotel_name_en:'Mercure Nagano Matsushiro Resort & Spa',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'mercure',brand_name_jp:'メルキュール',brand_name_en:'Mercure',hotel_code:'C1P0',hotel_name_jp:'メルキュール富山砺波リゾート&スパ',hotel_name_en:'Mercure Toyama Tonami Resort & Spa',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'mercure',brand_name_jp:'メルキュール',brand_name_en:'Mercure',hotel_code:'C1Q1',hotel_name_jp:'メルキュール能登リゾート&スパ',hotel_name_en:'Mercure Noto Resort & Spa',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'grandmercure',brand_name_jp:'グランドメルキュール',brand_name_en:'Grand Mercure',hotel_code:'C1P4',hotel_name_jp:'グランドメルキュール浜名湖リゾート&スパ',hotel_name_en:'Grand Mercure Lake Hamana Resort & Spa',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'grandmercure',brand_name_jp:'グランドメルキュール',brand_name_en:'Grand Mercure',hotel_code:'C1I6',hotel_name_jp:'グランドメルキュール那須ハイランドリゾート&スパ',hotel_name_en:'Grand Mercure Nasu Highlands Resort & Spa',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'grandmercure',brand_name_jp:'グランドメルキュール',brand_name_en:'Grand Mercure',hotel_code:'C1P2',hotel_name_jp:'グランドメルキュール南房総リゾート&スパ',hotel_name_en:'Grand Mercure Minamiboso Resort & Spa',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'grandmercure',brand_name_jp:'グランドメルキュール',brand_name_en:'Grand Mercure',hotel_code:'C1Q7',hotel_name_jp:'グランドメルキュール琵琶湖リゾート&スパ',hotel_name_en:'Grand Mercure Lake Biwa Resort & Spa',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'mercure',brand_name_jp:'メルキュール',brand_name_en:'Mercure',hotel_code:'C1P1',hotel_name_jp:'メルキュール裏磐梯リゾート&スパ',hotel_name_en:'Mercure Urabandai Resort & Spa',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'grandmercure',brand_name_jp:'グランドメルキュール',brand_name_en:'Grand Mercure',hotel_code:'C1Q3',hotel_name_jp:'グランドメルキュール伊勢志摩リゾート&スパ',hotel_name_en:'Grand Mercure Ise-shima Resort & Spa',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'mercure',brand_name_jp:'メルキュール',brand_name_en:'Mercure',hotel_code:'C1P6',hotel_name_jp:'メルキュール京都宮津リゾート&スパ',hotel_name_en:'Mercure Kyoto Miyazu Resort & Spa',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'grandmercure',brand_name_jp:'グランドメルキュール',brand_name_en:'Grand Mercure',hotel_code:'C1P9',hotel_name_jp:'グランドメルキュール奈良橿原',hotel_name_en:'Grand Mercure Nara Kashihara',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'mercure',brand_name_jp:'メルキュール',brand_name_en:'Mercure',hotel_code:'C1R2',hotel_name_jp:'メルキュール宮城蔵王リゾート&スパ',hotel_name_en:'Mercure Miyagi Zao Resort & Spa ',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'mercure',brand_name_jp:'メルキュール',brand_name_en:'Mercure',hotel_code:'C1Q2',hotel_name_jp:'メルキュール和歌山串本リゾート&スパ',hotel_name_en:'Mercure Wakayama Kushimoto Resort & Spa',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'grandmercure',brand_name_jp:'グランドメルキュール',brand_name_en:'Grand Mercure',hotel_code:'C1Q5',hotel_name_jp:'グランドメルキュール和歌山みなべリゾート&スパ',hotel_name_en:'Grand Mercure Wakayama Minabe Resort & Spa',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'grandmercure',brand_name_jp:'グランドメルキュール',brand_name_en:'Grand Mercure',hotel_code:'C1R3',hotel_name_jp:'グランドメルキュール淡路島リゾート&スパ',hotel_name_en:'Grand Mercure Awaji Island Resort & Spa',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'mercure',brand_name_jp:'メルキュール',brand_name_en:'Mercure',hotel_code:'C1P7',hotel_name_jp:'メルキュール鳥取大山リゾート&スパ',hotel_name_en:'Mercure Tottori Daisen Resort & Spa',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'mercure',brand_name_jp:'メルキュール',brand_name_en:'Mercure',hotel_code:'C1N8',hotel_name_jp:'メルキュール高知土佐リゾート&スパ',hotel_name_en:'Mercure Kochi Tosa Resort & Spa',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'grandmercure',brand_name_jp:'グランドメルキュール',brand_name_en:'Grand Mercure',hotel_code:'C1N6',hotel_name_jp:'グランドメルキュール別府湾リゾート&スパ',hotel_name_en:'Grand Mercure Beppu Bay Resort & Spa',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'mercure',brand_name_jp:'メルキュール',brand_name_en:'Mercure',hotel_code:'C1N7',hotel_name_jp:'メルキュール福岡宗像リゾート&スパ',hotel_name_en:'Mercure Fukuoka Munakata Resort & Spa',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'grandmercure',brand_name_jp:'グランドメルキュール',brand_name_en:'Grand Mercure',hotel_code:'C1P3',hotel_name_jp:'グランドメルキュール札幌大通公園',hotel_name_en:'Grand Mercure Sapporo Odori Park',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'mgallery',brand_name_jp:'Mギャラリー',brand_name_en:'MGallery',hotel_code:'C082',hotel_name_jp:'ホテル創成札幌Mギャラリー ',hotel_name_en:'Hotel Sosei Sapporo MGallery',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'mercure',brand_name_jp:'メルキュール',brand_name_en:'Mercure',hotel_code:'C1P5',hotel_name_jp:'メルキュール佐賀唐津リゾート',hotel_name_en:'Mercure Saga Karatsu Resort',},
{group_code:'accor',group_name_jp:'アコー',group_name_en:'Accor',brand_code:'grandmercure',brand_name_jp:'グランドメルキュール',brand_name_en:'Grand Mercure',hotel_code:'C1Q6',hotel_name_jp:'グランドメルキュール沖縄残波岬リゾート',hotel_name_en:'Grand Mercure Okinawa Cape Zanpa Resort',},];

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
  