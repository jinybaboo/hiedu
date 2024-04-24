import colors from "./commonColors";

export const calendarTheme = {
    backgroundColor: '#ffffff',
    calendarBackground: '#ffffff',
    textSectionTitleColor: '#b6c1cd',
    selectedDayBackgroundColor: colors.mainBlue,
    selectedDayTextColor: '#ffffff',
    todayTextColor: colors.mainOrange,
    dayTextColor: '#2d4150',
    textDisabledColor: colors.dateGray,
}

export const calendarType = {
    monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
    monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
    dayNames: ['일요일','월요일', '화요일','수요일','목요일','금요일','토요일'],
    dayNamesShort: ['일', '월','화','수','목','금','토'],
    today: ''
};