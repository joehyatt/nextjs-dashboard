'use client'

export default function Calendar() {

    // const week = ["日", "月", "火", "水", "木", "金", "土"];
    // const today = new Date();
    // var showDate = new Date(today.getFullYear(), today.getMonth(), 1);

    // window.onload = function () {
    //     showProcess(today);
    // };

    // function prev(){
    //     showDate.setMonth(showDate.getMonth() - 1);
    //     showProcess(showDate);
    // }

    // function next(){
    //     showDate.setMonth(showDate.getMonth() + 1);
    //     showProcess(showDate);
    // }

    // function showProcess(date) {
    //     var year = date.getFullYear();
    //     var month = date.getMonth();
    //     document.querySelector('#header').innerHTML = year + "年 " + (month + 1) + "月";
    
    //     var calendar = createProcess(year, month);
    //     document.querySelector('#calendar').innerHTML = calendar;
    // }

    // function createProcess(year, month) {
    //     // 曜日
    //     var calendar = "<table><tr class='dayOfWeek'>";
    //     for (var i = 0; i < week.length; i++) {
    //         calendar += "<th>" + week[i] + "</th>";
    //     }
    //     calendar += "</tr>";
    
    //     var count = 0;
    //     var startDayOfWeek = new Date(year, month, 1).getDay();
    //     var endDate = new Date(year, month + 1, 0).getDate();
    //     var lastMonthEndDate = new Date(year, month, 0).getDate();
    //     var row = Math.ceil((startDayOfWeek + endDate) / week.length);
    
    //     // 1行ずつ設定
    //     for (var i = 0; i < row; i++) {
    //         calendar += "<tr>";
    //         for (var j = 0; j < week.length; j++) {
    //             if (i == 0 && j < startDayOfWeek) {
    //                 calendar += "<td class='disabled'>" + (lastMonthEndDate - startDayOfWeek + j + 1) + "</td>";
    //             } else if (count >= endDate) {
    //                 count++;
    //                 calendar += "<td class='disabled'>" + (count - endDate) + "</td>";
    //             } else {
    //                 // 当月の日付を曜日に照らし合わせて設定
    //                 count++;
    //                 if(year == today.getFullYear()
    //                   && month == (today.getMonth())
    //                   && count == today.getDate()){
    //                     calendar += "<td className='bg-gray-400'>" + count + "</td>";
    //                 } else {
    //                     calendar += "<td className='bg-blue-400'>" + count + "<br>test</td>";
    //                 }
    //             }
    //         }
    //         calendar += "</tr>";
    //     }
    //     return calendar;
    // }

    return (
        <div className="w-full">
            <h1 id="header">2023-11</h1>

            <div id="next-prev-button" className="flex">
                <button id="prev" className="basis-1/2" onClick={() => {}}>2023-10</button>
                <button id="next" className="basis-1/2" onClick={() => {}}>2023-12</button>
            </div>

            <div id="calendar" className="w-full">
                <table className="w-full">
                    <thead className="w-full">
                        <tr className="w-full">
                            <th className="flex basis-1/7">日</th>
                            <th className="flex flex-row basis-1/7">月</th>
                            <th className="flex basis-1/7">火</th>
                            <th className="flex basis-1/7">水</th>
                            <th className="basis-1/7">木</th>
                            <th className="basis-1/7">金</th>
                            <th className="basis-1/7">土</th>
                        </tr>
                    </thead>
                    <tbody className="w-full">
                        <tr className="w-full h-36">
                            <td className="basis-1/7"></td>
                            <td className="basis-1/7"></td>
                            <td className="basis-1/7"></td>
                            <td className="basis-1/7">
                                <p className="h-8">1</p>
                                <p className="h-28">29876</p>
                            </td>
                            <td className="h-4 basis-1/7">
                                <p className="h-8">2</p>
                                <p className="h-28">29876</p>
                            </td>
                            <td className="h-4 basis-1/7">
                                <p className="h-8">3</p>
                                <p className="h-28">29876</p>
                            </td>
                            <td className="h-4 basis-1/7">
                                <p className="h-8">4</p>
                                <p className="h-28">29876</p>
                            </td>
                        </tr>
                        <tr className="w-full h-36">
                            <td className="basis-1/7"></td>
                            <td className="basis-1/7"></td>
                            <td className="basis-1/7"></td>
                            <td className="basis-1/7">
                                <p className="h-8">1</p>
                                <p className="h-28">29876</p>
                            </td>
                            <td className="h-4 basis-1/7">
                                <p className="h-8">2</p>
                                <p className="h-28">29876</p>
                            </td>
                            <td className="h-4 basis-1/7">
                                <p className="h-8">3</p>
                                <p className="h-28">29876</p>
                            </td>
                            <td className="h-4 basis-1/7">
                                <p className="h-8">4</p>
                                <p className="h-28">29876</p>
                            </td>
                        </tr>
                        <tr className="w-full h-36">
                            <td className="basis-1/7"></td>
                            <td className="basis-1/7"></td>
                            <td className="basis-1/7"></td>
                            <td className="basis-1/7">
                                <p className="h-8">1</p>
                                <p className="h-28">29876</p>
                            </td>
                            <td className="h-4 basis-1/7">
                                <p className="h-8">2</p>
                                <p className="h-28">29876</p>
                            </td>
                            <td className="h-4 basis-1/7">
                                <p className="h-8">3</p>
                                <p className="h-28">29876</p>
                            </td>
                            <td className="h-4 basis-1/7">
                                <p className="h-8">4</p>
                                <p className="h-28">29876</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

