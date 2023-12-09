const { memo } = require("react");

const allHotelsElement = Array.from(document.querySelectorAll("*[id^='property-record-map-']>div>div>div:nth-child(2)>div>div>a.t-alt-link.js-hotel-quickview-link"))
allHotelsElement.map(el => {
    const hotel_code = el.getAttribute('data-marsha');
    const hotel_name_jp = el.querySelector("h2:nth-child(1)>span")?.innerHTML;
    const hotel_name_en = el.querySelector("h2:nth-child(2)>span")?.innerHTML;
    return `${hotel_code},${hotel_name_jp},${hotel_name_en}`
})



const allHotelsElement = Array.from(document.querySelectorAll("*[data-js='hotel-card']"))
allHotelsElement.map(el => {
    const hotel_code = el.getAttribute('data-spirit-code');
    const hotel_name_jp = el.querySelector("div.name-rating-amenities-wrapper > div.hotel-name-wrapper")?.title.replace(" ","");
    return `${hotel_code},${hotel_name_jp}`
})

const allHotelsElement = Array.from(document.querySelectorAll("#topOfPage > div > div.theme-6c > div.search-results.hotel-list-resize.ng-star-inserted > div > app-hotel-card-list > div > div"))
allHotelsElement.map(el => {
    const hotel_code = el.querySelector("app-hotel-card > div:nth-child(2) > hotel-card-list-view > div.hotel-card-list-view-container").id;
    const hotel_name_en = el.querySelector("app-hotel-card > div:nth-child(2) > hotel-card-list-view > div.hotel-card-list-view-container > div > div.hotel-card-body-container > div.hotel-card-title > app-hotel-card-title > div > div > div.title.hotel-name.ng-star-inserted > span").innerText;
    return `${hotel_code},${hotel_name_en}`
})


const allHotelsElement = Array.from(document.querySelectorAll("li.hotelsList__actual-item > div.hotelsList__hotel"))
allHotelsElement.map(el => {
    const hotel_code = el.querySelector("div > div.hotelblock > div > div > div").getAttribute("described-by").replace("hotel-id-","");
    const hotel_name_jp = el.querySelector("div > div > div.hotelblock__content > header > h2 > a").innerText;
    return `${hotel_code},${hotel_name_jp}`
})