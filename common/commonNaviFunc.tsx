import { Alert } from "react-native";
import EncryptedStorage from 'react-native-encrypted-storage';
import userSlice from "../slices/user";

export const goBack = (navigation:any) =>{navigation.goBack();}


//탭 메뉴
export const goHome             = (navigation:any) => {navigation.navigate('Tabs', { screen: '홈'}); }
export const goSendMain         = (navigation:any) => {navigation.navigate('Tabs', { screen: '발송하기'}); }
export const goBoardList        = (navigation:any) => {navigation.navigate('Tabs', { screen: '공지사항'}); }
export const goMypage           = (navigation:any) => {navigation.navigate('Tabs', { screen: '마이페이지'}); }

//스택 메뉴
export const goNotification     = (navigation:any) => {navigation.navigate('Stack', {screen: 'Notification', params:{}});}
export const goLoginAgree       = (navigation:any) => {navigation.navigate('Stack', {screen: 'LoginAgree', params:{}});}
export const goLoginAgree2      = (navigation:any) => {navigation.navigate('Stack', {screen: 'LoginAgree2', params:{}});}
export const goAgreement        = (navigation:any) => {navigation.navigate('Stack', {screen: 'Agreement', params:{}});}
export const goPrivacy          = (navigation:any) => {navigation.navigate('Stack', {screen: 'Privacy', params:{}});}
export const goLunchList        = (navigation:any) => {navigation.navigate('Stack', {screen: 'LunchList', params:{}});}
export const goTimeTableList    = (navigation:any) => {navigation.navigate('Stack', {screen: 'TimeTableList', params:{}});}
export const goScheduleCalendar = (navigation:any) => {navigation.navigate('Stack', {screen: 'ScheduleCalendar', params:{}});}
export const goSetting          = (navigation:any) => {navigation.navigate('Stack', {screen: 'Setting', params:{}});}
export const goSendList         = (navigation:any) => {navigation.navigate('Stack', {screen: 'SendList', params:{}});}

export const goUnreadAlarm      = (navigation:any, boardType:string) => {navigation.navigate('Stack', {screen: 'UnreadAlarm', params:{boardType}});}
export const goSearchResult     = (navigation:any, searchWord:string) => {navigation.navigate('Stack', {screen: 'SearchResult', params:{searchWord}});}

export const goHomeLetterContent= (navigation:any, id:any, yyyymm:any) => {navigation.navigate('Stack', {screen: 'HomeLetterContent', params:{id, yyyymm}});}
export const goBoardContent     = (navigation:any, id:any) => {navigation.navigate('Stack', {screen: 'BoardContent', params:{id}});}
export const goSendListContent  = (navigation:any, id:any, isSecret:boolean, startDate:string, endDate:string) => {navigation.navigate('Stack', {screen: 'SendListContent', params:{id, isSecret, startDate, endDate}});}

export const goSendWrite        = (navigation:any, page:any, umslog_id:any) => {navigation.navigate('Stack', {screen: 'SendWrite', params:{page, umslog_id}});}
export const goTest             = (navigation:any, page:any) => {navigation.navigate('Stack', {screen: 'Test', params:{page}});}

export const goSurveyContent    = async (navigation:any, id:any, yyyymm:any, isSurveyStarted:boolean) => {
    if(!isSurveyStarted){
        Alert.alert('예약설문','아직 설문조사 시작 시간이 아닙니다.')
    }else{
        navigation.navigate('Stack', {screen: 'SurveyContent', params:{id, yyyymm}});
    }
}

export const goAlarmContent     = (navigation:any, id:any, yyyymm:any) => {navigation.navigate('Stack', {screen: 'AlarmContent', params:{id, yyyymm}});}


export const goAlarmList        = (navigation:any, dispatch:any) => {
    dispatch(userSlice.actions.setSelectedStudent('전체'));
    navigation.navigate('Stack', {screen: 'AlarmList', params:{}});
}
export const goHomeLetterList   = (navigation:any, dispatch:any) => {
    dispatch(userSlice.actions.setSelectedStudent('전체'));
    navigation.navigate('Stack', {screen: 'HomeLetterList', params:{}});
}
export const goSurveyList       = (navigation:any, dispatch:any) => {
    dispatch(userSlice.actions.setSelectedStudent('전체'));
    navigation.navigate('Stack', {screen: 'SurveyList', params:{}});
}


export const goCompanyInfo     = (navigation:any) => {navigation.navigate('Stack', {screen: 'CompanyInfo', params:{}});}