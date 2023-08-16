import dayjs from "dayjs";
// 前端获取时间eg:202303-至今
export const oData = () => {
    let startYear = 2023, startMonth = 3; // 开始时间配置
    let curYear = dayjs().year(), curMonth = dayjs().month() + 1;
    if (curYear > startYear) {
        let day1 = dayjs(`${startYear}${(startMonth-1)}`), day2 = dayjs(dayjs().format('YYYYMM')); //月份默认是从0开始的
        let monthLen = day1.diff(day2, 'month', true);  //获取两个时间段总共相差的月数
        let preYearMonth = Math.abs(monthLen) - 1, dateList = [];
        for (let i = preYearMonth + 1; i >= 1; i--) {
            dateList.push(dayjs().month(curMonth).subtract(i,'month').format('YYYYMM'));
        }
        let dateListAll = dateList;
        console.log('获取下一年的年份月份', dateListAll);
        return dateListAll;
    } else {
        let monthLen = curMonth - startMonth, dateList = [];
        for (let i = 0; i <= monthLen; i++) {
            dateList.push(dayjs().add(-i, 'month').startOf('month').format('YYYYMM'));
        }
        console.log('获取今年的年份月份', dateList);
        return dateList;
    }
}