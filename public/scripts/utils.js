var utils = (function (){
    var dateDigitToString = function (num) {
        return num < 10 ? '0' + num : num;
    };

    var getDate = function () {
        var currentDate = new Date();
        var year = dateDigitToString(currentDate.getFullYear());
        var month = dateDigitToString(currentDate.getMonth() + 1);
        var date = dateDigitToString(currentDate.getDate());
        var hour = dateDigitToString(currentDate.getHours());
        var minute = dateDigitToString(currentDate.getMinutes());
        var second = dateDigitToString(currentDate.getSeconds());
        return  year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;
    };

    return {
        getDate: getDate
    }
})();
