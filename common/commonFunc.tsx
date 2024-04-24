import moment from "moment-timezone";
import { Dimensions, Platform } from "react-native";

import ImageResizer from 'react-native-image-resizer';


export const formatTime = (seconds:number) => { //초를 mm:ss로 변환
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

export const getRandomNum6 = () => {
    const min = 100000; // 6자리 숫자의 최소값
    const max = 999999; // 6자리 숫자의 최대값

    let ranNum:any = Math.floor(Math.random() * (max - min + 1)) + min;
    ranNum = ranNum+''
    // return '000000';
    return ranNum;
}


export function getWindowWidth(){
    return Dimensions.get('window').width;
}

export function getWindowHeight(){
    return Dimensions.get('window').height;
}

export function convertUTCToKoreanTime(dateTimeString:any) {
    // UTC 날짜에서 한국시간으로 변환 후 시간만 추출 (예약시간 용)
    const utcDateTime = moment.utc(dateTimeString);
    const koreanDateTime = utcDateTime.tz('Asia/Seoul');
    const formattedTime = koreanDateTime.format('HH:mm');
    return formattedTime;
}

export function getYYYYMMDD_dot(date:Date) {
     // UTC 날짜에서 한국시간으로 변환 후 YYYY.MM.DD 리턴 (예약시간 용)
    const utcDateTime = moment.utc(date);
    const koreanDateTime = utcDateTime.tz('Asia/Seoul');
    const formattedTime = koreanDateTime.format('YYYY.MM.DD');
    return formattedTime;
}

export function getYYYYMMDD_dash(date:Date) {
     // UTC 날짜에서 한국시간으로 변환 후 YYYY-MM-DD 리턴 (예약시간 용)
     const utcDateTime = moment.utc(date);
     const koreanDateTime = utcDateTime.tz('Asia/Seoul');
     const formattedTime = koreanDateTime.format('YYYY-MM-DD');
     return formattedTime;
}

export function getYYMMDD_dash(date:Date) {
    // UTC 날짜에서 한국시간으로 변환 후 YYYY-MM-DD 리턴 (예약시간 용)
    const utcDateTime = moment.utc(date);
    const koreanDateTime = utcDateTime.tz('Asia/Seoul');
    const formattedTime = koreanDateTime.format('YY-MM-DD');
    return formattedTime;
}


  

export function changeYYYYMMDDToMMDD_Day(dateString:any) {
    //20210203 => 02.03 (월)로 바꿈
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    const options:any = { year: 'numeric', month: 'numeric', day: 'numeric', weekday: 'short' };
    const date = new Date(`${year}-${month}-${day}`);
    
    let DateStr = date.toLocaleDateString('ko-KR', options);
    DateStr = DateStr.substring(6).replace(". ","월").replace(". ","일");
    return DateStr;
}
  
export function changeYYYYMMDDToYYYYMMDD_Day(dateString:any) {
    //20210203 => 02.03 (월)로 바꿈
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    const options:any = { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' };
    const date = new Date(`${year}-${month}-${day}`);

    let DateStr = date.toLocaleDateString('ko-KR', options);
    DateStr = DateStr.replace(". "," - ").replace(". "," - ").replace(".","");
    return DateStr;
}

export function changeYYYYMMDDToYYYY_MM_DD(YYYYMMDD:any) {
    //20210203 => 2021-02-03으로 바꿈
    const year = YYYYMMDD.slice(0, 4);
    const month = YYYYMMDD.slice(4, 6);
    const day = YYYYMMDD.slice(6, 8);
  return `${year}-${month}-${day}`;
}
export function changeYYYYMMDDToYYYY_MM_DD_Dot(YYYYMMDD:any) {
    //20210203 => 2021-02-03으로 바꿈
    const year = YYYYMMDD.slice(0, 4);
    const month = YYYYMMDD.slice(4, 6);
    const day = YYYYMMDD.slice(6, 8);
  return `${year}.${month}.${day}`;
}
export function getTodayAsYYYYMMDD() {
    // const todayKor = moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss');
    const todayKorStr = moment().tz('Asia/Seoul').format('YYYYMMDD');
    return todayKorStr;
}
export function getMonthsBeforeAsYYYYMMDD(month:number) {
    // const todayKor = moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss');
    const date = moment().subtract(month, 'months').tz('Asia/Seoul').format('YYYYMMDD');
    return date;
}
export function getMonthsLaterAsYYYYMMDD(month:number) {
    // const todayKor = moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss');
    const date = moment().add(month, 'months').tz('Asia/Seoul').format('YYYYMMDD');
    return date;
}
export function getDaysBeforeAsYYYYMMDD(day:number) {
    // const todayKor = moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss');
    const date = moment().subtract(day, 'days').tz('Asia/Seoul').format('YYYYMMDD');
    return date;
}


export function getTodayAsYYYY_MM_DD() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 두 자리로 포맷
    const day = String(date.getDate()).padStart(2, '0'); // 일자를 두 자리로 포맷
    return `${year}-${month}-${day}`;
}

export function getYYYYMM(date:Date, nextNum:number) {
    // nextNum : 전달된 날짜 기준 기준 몇달 앞 또는 뒤의 값을 가져올건지 정한는 숫자
    date.setMonth(date.getMonth() + nextNum);
  
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
  
    return `${year}${month}`;
}

export function getAlarmFullDate(dateStr:string) {
    const date = new Date(dateStr);
    const options:any = { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short', hour: 'numeric', minute: 'numeric', };
    let DateStr = date.toLocaleDateString('ko-KR', options);
    return DateStr;
}

export function getAlarmFullDate2(dateStr:string) {
    const date = new Date(dateStr);
    const options:any = { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short'};
    let DateStr = date.toLocaleDateString('ko-KR', options);
    return DateStr;
}

export function getAlarmSimpleDate(dateStr:string) {
    const date = new Date(dateStr);
    const options:any = { year: 'numeric', month: '2-digit', day: '2-digit'};
    let DateStr = date.toLocaleDateString('ko-KR', options);
    return DateStr.slice(0, -1);
}

export function getNumberDaysBefore (num:number){
    const today = new Date();
    let date = new Date(today);
    date.setDate(today.getDate() - num);
    return date;
}

export function getDDay(date:string) {
    const today:any = new Date();
    const targetDate:any = new Date(date);
    const timeDiff = targetDate - today;
    var daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysLeft-1;
}

export function replaceAllCustom(str:string, find:string, replace:string) {
    // 정규 표현식을 사용하여 모든 find 문자열을 replace 문자열로 교체
    return str.replace(new RegExp(find, 'g'), replace);
}

export function removeDuplicateJsonArrData(arr:any, key:string){
	const result = arr?.filter((item1:any, idx1:number)=>{
	    return arr?.findIndex((item2:any)=>{
	        return item1[key] == item2[key];
	    }) == idx1;
	});
	return result;
}

export function removeJsonArrByKeyValue(arr:any, key:string, value:string){
    return arr.filter((item:any) => item[key] !== value);
}

export function getIsSurveyStarted (start_date:string) {
    const now = new Date();
    const startDate = new Date(start_date);
    return now >= startDate;
}

export function getIsSurveyFinished (end_date:string) {
    const now = new Date();
    const endDate = new Date(end_date);
    return now > endDate;
} 

export function getBoardNew (date:any, newDate:number){
    const inputDate = new Date(date).getTime();
    const today = new Date().getTime();
    const howLongNew = today - (newDate * 24 * 60 * 60 * 1000);
    return inputDate >= howLongNew;
}

export const filterJsonArrKeyValue = (arr:any, key:any, value:any) =>{
	return arr.filter((item:any)=>item[key] == value)
}

export const countJsonArrKeyValue = (arr:any, key:any, value:any) =>{
    let count = 0;
   arr.forEach((item:any)=>{
       if (item[key] == value) {
           count++;
       }
   })
   return count;
}

export function delay(milliseconds:number) {
    return new Promise(resolve => {
      setTimeout(resolve, milliseconds);
    });
}

export function sortJsonArrayWithKey(arr:any, key:string){
    arr.sort(function(a:any, b:any) {
        var nameA = a[key].toUpperCase(); // 대소문자를 구분하지 않도록 대문자로 변환
        var nameB = b[key].toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
    return arr;
}


export const resizeImage = async (imageUri:string) => {
    const width = 800;
    const height = 1600;
    const format = 'JPEG' 
    const quality = 90;
    try {
      const resizedImageUri = await ImageResizer.createResizedImage(
        imageUri,
        width,
        height,
        format,
        quality
      );
      
      return resizedImageUri;
    } catch (error) {
      console.error('Error resizing image:', error);
    }
  };


  export function getFileExtension(filename:string) {
    const random = getRandomNum6();
    const lastDotIndex = filename.lastIndexOf('.');
    if (lastDotIndex === -1 || lastDotIndex === filename.length - 1) {
      return '';
    }
    const extension = filename.slice(lastDotIndex + 1);
    return random+'.'+extension;
  }


  // 제이슨 배열에서 특정 obj가 포함되어 있는지 여부 확인 (제이슨 배열 중복 확인)
export function isObjectInArray(array:any, obj:any) {
    const objString = JSON.stringify(obj);
    for (let i = 0; i < array.length; i++) {
      const currentObjString = JSON.stringify(array[i]);
      if (objString === currentObjString) {
        return true; // 일치하는 객체가 발견되면 true 반환
      }
    }
    return false; // 배열 안에 찾고자 하는 객체가 없으면 false 반환
}

export function changeAlarmToRead(arr:any, id:any){
    const tempArr:any = [];
    arr.forEach((item:any)=>{
        const {id:tempId, is_read} = item;
        if(id==tempId){
            item.is_read='1';
        }
        tempArr.push(item)
    })
    return tempArr;
}