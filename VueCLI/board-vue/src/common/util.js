export default {
    makeDateStr(year, month, day, type) {
        //2010.05.05
        return year + type + ((month < 10) ? '0' + month : month) + type + ((day < 10) ? '0' + day : day);
    },
    makeTimeStr(hour, minute, second, type) {
        //07:25:33
        return hour + type + ((minute < 10) ? '0' + minute : minute) + type + ((second < 10) ? '0' + second : second);
    }
}
