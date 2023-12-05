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