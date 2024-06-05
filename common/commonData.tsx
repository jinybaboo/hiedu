
import axios from 'axios'
import { getTodayAsYYYYMMDD } from './commonFunc';
import EncryptedStorage from 'react-native-encrypted-storage';

let serverUrl = `http://172.30.1.89:100`;
serverUrl = `http://192.168.0.33:100`;
// serverUrl = `https://app.hiedu.kr`; 

export const getLunchInfo = async (ATPT_OFCDC_SC_CODE:string, SD_SCHUL_CODE:string) => {  
    const today = getTodayAsYYYYMMDD();
    const {neisKey} = await getAdminInfo();
    const url = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${neisKey}&Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${SD_SCHUL_CODE}&MLSV_FROM_YMD=${today}`;
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      console.error('getLunchInfo', error);
    }
};

export const getTimeTableInfo = async (SCHUL_KND_SC_NM:string, ATPT_OFCDC_SC_CODE:string, SD_SCHUL_CODE:string, GRADE:string, CLASS_NM:string, startDate:string, endDate:string, endDate2:string) => { 
  let scKind = "els";
  if(SCHUL_KND_SC_NM==='중학교'){
    scKind="mis";
  }else if(SCHUL_KND_SC_NM==='고등학교'){
    scKind="his";
  }
  //els(초), mis(중), his(고)
  const callCode = `${scKind}Timetable`;
  const {neisKey} = await getAdminInfo();

  let url = `https://open.neis.go.kr/hub/${callCode}?KEY=${neisKey}&Type=json&pIndex=1&pSize=1000&ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${SD_SCHUL_CODE}&TI_FROM_YMD=${startDate}&TI_TO_YMD=${endDate}&GRADE=${GRADE}&CLASS_NM=${CLASS_NM}`;
  
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error('getTimeTableInfo', error);
  }
};

export const getScheduleCalendar = async (ATPT_OFCDC_SC_CODE:string, SD_SCHUL_CODE:string, minDate:string) => { 
  const {neisKey} = await getAdminInfo();

  const url = `https://open.neis.go.kr/hub/SchoolSchedule?KEY=${neisKey}&Type=json&ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${SD_SCHUL_CODE}&AA_FROM_YMD=${minDate}&pIndex=1&pSize=1000`;
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error('getScheduleCalendar', error);
  }
};

export const getLoginTokens = async (phone:string) => {
  const url = `${serverUrl}/getData/loginTokens?phone=${phone}`;
  try {
    const {data} = await axios.get(url);
    return data;
  } catch (error) {
    console.error('getLoginTokens', error);
  }
};

export const getIsPhoneExist = async (phone:string) => {
  const url = `${serverUrl}/getData/getIsPhoneExist?phone=${phone}`;
  try {
    const {data} = await axios.get(url);
    return data;
  } catch (error) {
    console.error('getIsPhoneExist', error);
  }
};


export const getIsExistAndSaveIfExist = async (phone:string, fcmToken:any) => {
  const url = `${serverUrl}/getData/getIsExistAndSaveIfExist?phone=${phone}&fcmToken=${fcmToken}`;
  try {
    const {data} = await axios.get(url);
    return data;
  } catch (error) {
    console.error('getIsExistAndSaveIfExist', error);
  }
};



// 액세스토큰 사용 함수
export const getIsAccessTokenValid = async (accessToken:any) => {
  if(accessToken==undefined || accessToken==null){
    return false;
  }

  const url = `${serverUrl}/getData/isAccessTokenValid`;
  try {
    const {data} = await axios.get(url, {headers:{'Authorization': `Bearer ${accessToken}`, }});
    return data;
  } catch (error) {
    // console.error('토큰 유효하지 않음', error);
    return false;
  }
};

export const getSendAuthInfo = async (accessToken:any) => {
  const url = `${serverUrl}/getData/sendAuthInfo`;
  try {
    const {data} = await axios.get(url, {headers:{'Authorization': `Bearer ${accessToken}`, }});
    return data[0];
  } catch (error) {
    console.error('getSendAuthInfo', error);
  }
};

export const getMypageInfo = async () => {
  const accessToken =  await EncryptedStorage.getItem('accessToken');
  if(accessToken == undefined || accessToken == null){return null;}

  const url = `${serverUrl}/getData/mypageInfo`;
  try {
    const {data} = await axios.get(url, {headers:{'Authorization': `Bearer ${accessToken}`, }});
    return data;
  } catch (error) {
    console.error('getMypageInfo', error);
  }
};

export const getAlarmList = async (category:string, isAll:string, user_id:string) => {
  
  const accessToken =  await EncryptedStorage.getItem('accessToken');
  //isAll = 'all' : 전체, '' : 읽지 않은 것만.
  const url = `${serverUrl}/getData/alarmList?category=${category}&isAll=${isAll}&user_id=${user_id}`;
  try {
    const {data} = await axios.get(url, {headers:{'Authorization': `Bearer ${accessToken}`, }});
    return data;
  } catch (error) {
    console.error('getAlarmList', error);
  }
};

export const getBoardList = async (schoolArr:any) => {
  const accessToken =  await EncryptedStorage.getItem('accessToken');
  if(accessToken==undefined){
    return [];
  }

  const url = `${serverUrl}/getData/boardList`;
  const sendData:any = {
    schoolStr : schoolArr.toString(), 
};
  try {
    const {data} = await axios.post(url, sendData, {headers:{'Authorization': `Bearer ${accessToken}`, }});
    return data;
  } catch (error) {
    console.error('getBoardList', error);
  }
};

export const getAlarmSearch = async (searchWord:string) => {
  const accessToken =  await EncryptedStorage.getItem('accessToken');
  const url = `${serverUrl}/getData/alarmSearch`;
  const sendData ={searchWord}
  try {
    const {data} = await axios.post(url, sendData, {headers:{'Authorization': `Bearer ${accessToken}`, }});
    return data;
  } catch (error) {
    console.error('getAlarmSearch', error);
  }
};


export const getAlarmContent = async (id:string, yyyymm:string) => {
  const accessToken =  await EncryptedStorage.getItem('accessToken');
  const url = `${serverUrl}/getData/alarmContent?id=${id}&yyyymm=${yyyymm}`;
  try {
    const {data} = await axios.get(url, {headers:{'Authorization': `Bearer ${accessToken}`, }});
    return data;
  } catch (error) {
    console.error('getAlarmContent', error);
  }
};

export const getSurveyContent = async (id:string, yyyymm:string) => {
  const accessToken =  await EncryptedStorage.getItem('accessToken');
  const url = `${serverUrl}/getData/surveyContent?id=${id}&yyyymm=${yyyymm}`;
  try {
    const {data} = await axios.get(url, {headers:{'Authorization': `Bearer ${accessToken}`, }});
    return data;
  } catch (error) {
    console.error('getSurveyContent', error);
  }
};

export const getBoardContent = async (id:string) => {
  const accessToken =  await EncryptedStorage.getItem('accessToken');
  const url = `${serverUrl}/getData/boardContent?id=${id}`;
  try {
    const {data} = await axios.get(url, {headers:{'Authorization': `Bearer ${accessToken}`, }});
    return data;
  } catch (error) {
    console.error('getBoardContent', error);
  }
};


export const getUnreadData = async () => {
  const accessToken =  await EncryptedStorage.getItem('accessToken');
  if(accessToken == undefined || accessToken == null){return null;}
  const url = `${serverUrl}/getData/unreadData`;
  try {
    const {data} = await axios.get(url, {headers:{'Authorization': `Bearer ${accessToken}`, }});
    return data;
  } catch (error) {
    console.error('getUnreadData', error);
  }
};


export const getMySchoolCodeInfo = async (sendData:any) => {
  const accessToken =  await EncryptedStorage.getItem('accessToken');
  const url = `${serverUrl}/getData/mySchoolCodeInfo`;
  try {
    const {data} = await axios.post(url, sendData, {headers:{'Authorization': `Bearer ${accessToken}`, }});
    return data;
  } catch (error) {
    console.error('getMySchoolCodeInfo', error);
  }
};

export const getSimpleAddr = async (user_id:string) => {
  const accessToken =  await EncryptedStorage.getItem('accessToken');
  const url = `${serverUrl}/getData/simpleAddr`;
  try {
    const {data} = await axios.post(url, {user_id}, {headers:{'Authorization': `Bearer ${accessToken}`, }});
    return data;
  } catch (error) {
    console.error('getSimpleAddr', error);
  }
};


export const getSimpleAddrGroupSelect = async (user_id:string) => {
  const accessToken =  await EncryptedStorage.getItem('accessToken');
  const url = `${serverUrl}/getData/simpleAddrGroupSelect`;
  try {
    const {data} = await axios.post(url, {user_id}, {headers:{'Authorization': `Bearer ${accessToken}`, }});
    return data;
  } catch (error) {
    console.error('simpleAddrGroupSelect', error);
  }
};


export const getSimpleAddrGroup = async (user_id:string) => {
  const accessToken =  await EncryptedStorage.getItem('accessToken');
  const url = `${serverUrl}/getData/simpleAddrGroup`;
  try {
    const {data} = await axios.post(url, {user_id}, {headers:{'Authorization': `Bearer ${accessToken}`, }});
    return data;
  } catch (error) {
    console.error('getSimpleAddrGroup', error);
  }
};

export const getAppMemberPhone = async () => {
  const accessToken =  await EncryptedStorage.getItem('accessToken');
  const url = `${serverUrl}/getData/appMemberPhone`;
  try {
    const {data} = await axios.get(url, {headers:{'Authorization': `Bearer ${accessToken}`, }});
    return data;
  } catch (error) {
    console.error('getAppMemberPhone', error);
  }
};

export const getSendPhoneNumber = async (user_id:string, member_id:string, isUser:string) => {
  const accessToken =  await EncryptedStorage.getItem('accessToken');
  const url = `${serverUrl}/getData/sendPhoneNumber`;

  try {
    const {data} = await axios.post(url, {user_id, member_id, isUser}, {headers:{'Authorization': `Bearer ${accessToken}`, }});
    return data;
  } catch (error) {
    console.error('getSendPhoneNumber', error);
  }
};

export const getUmslogInsertDate = async (id:string) => {
  const accessToken =  await EncryptedStorage.getItem('accessToken');
  const url = `${serverUrl}/getData/umslogInsertDate`;
  try {
    const {data} = await axios.post(url, {id}, {headers:{'Authorization': `Bearer ${accessToken}`, }});
    return data;
  } catch (error) {
    console.error('getUmslogInsertDate', error);
  }
};

export const getMyMemberInfo = async () => {
  const accessToken =  await EncryptedStorage.getItem('accessToken');
  const url = `${serverUrl}/getData/myMemberInfo`;
  try {
    const {data} = await axios.get(url, {headers:{'Authorization': `Bearer ${accessToken}`, }});
    return data;
  } catch (error) {
    console.error('myMemberInfo', error);
  }
};

export const getSendMemberInfo = async (isUser:any, member_id:string) => {
  const accessToken =  await EncryptedStorage.getItem('accessToken');
  const url = `${serverUrl}/getData/sendMemberInfo?isUser=${isUser}&member_id=${member_id}`;
  try {
    const {data} = await axios.get(url, {headers:{'Authorization': `Bearer ${accessToken}`, }});
    return data;
  } catch (error) {
    console.error('getSendMemberInfo', error);
  }
};



export const getAdminInfo = async () => {
  const accessToken =  await EncryptedStorage.getItem('accessToken');
  const url = `${serverUrl}/getData/adminInfo`;
  if(accessToken==undefined || accessToken==null){
    return false;
  }
  try {
    const {data} = await axios.get(url, {headers:{'Authorization': `Bearer ${accessToken}`, }});
    return data;
  } catch (error) {
    console.error('getAdminInfo', error); 
  }
}; 

export const getAgreementInfo = async () => {
  const accessToken =  await EncryptedStorage.getItem('accessToken');
  const url = `${serverUrl}/getData/agreementInfo`;

  try {
    const {data} = await axios.get(url, {headers:{'Authorization': `Bearer ${accessToken}`, }});
    return data;
  } catch (error) {
    console.error('getAgreementInfo', error); 
    return false;
  }
}; 

export const getSendList = async (isUser:string, portal_id:string, startDate:string, endDate:string) => {
  
  const accessToken =  await EncryptedStorage.getItem('accessToken');
  const url = `${serverUrl}/getData/sendList?isUser=${isUser}&portal_id=${portal_id}&startDate=${startDate}&endDate=${endDate}`;
  try {
    const {data} = await axios.get(url, {headers:{'Authorization': `Bearer ${accessToken}`, }});
    return data;
  } catch (error) {
    console.error('getSendList', error);
  }
};

export const getSendListContent = async (umslog_id:string) => {
  const accessToken =  await EncryptedStorage.getItem('accessToken');
  const url = `${serverUrl}/getData/sendListContent?umslog_id=${umslog_id}`;
  try {
    const {data} = await axios.get(url, {headers:{'Authorization': `Bearer ${accessToken}`, }});
    return data;
  } catch (error) {
    console.error('getSendListContent', error);
  }
};

export const getResendData = async (umslog_id:string) => {
  const accessToken =  await EncryptedStorage.getItem('accessToken');
  const url = `${serverUrl}/getData/resendData?umslog_id=${umslog_id}`;
  try {
    const {data} = await axios.get(url, {headers:{'Authorization': `Bearer ${accessToken}`, }});
    return data;
  } catch (error) {
    console.error('getResendData', error);
  }
};

export const getAuth = async (isUser:any, member_id:string) => {
  const accessToken =  await EncryptedStorage.getItem('accessToken');
  if(accessToken===undefined){
    return {};
  }
  
  const url = `${serverUrl}/getData/auth?isUser=${isUser}&member_id=${member_id}`;
  try {
    const {data} = await axios.get(url, {headers:{'Authorization': `Bearer ${accessToken}`, }});
    return data;
  } catch (error) {
    console.error('getAuth', error);
  }
};

export const getUserInfoWithAccessToken = async () => {
  const accessToken =  await EncryptedStorage.getItem('accessToken');
  const url = `${serverUrl}/getData/userInfoWithAccessToken`;
  try {
    const {data} = await axios.get(url, {headers:{'Authorization': `Bearer ${accessToken}`, }});
    return data[0];
  } catch (error) {
    console.error('getUserInfoWithAccessToken', error);
  }
};




///// insert /////
export const insertSendData = async (sendData:any) => {
  const accessToken =  await EncryptedStorage.getItem('accessToken');
  const url = `${serverUrl}/postData/insertSendData`;

  const MAX_RETRY = 3; // 최대 재시도 횟수
  const RETRY_DELAY = 1000; // 재시도 간격 (밀리초)
  let retries = 0;

  while (retries < MAX_RETRY) {
      try {
          const {data} = await axios.post(url, sendData, {headers:{'Authorization': `Bearer ${accessToken}` }},);
          return data;
      } catch (error:any) {
          console.error('insertSendData 에러로 재실행', retries);
          retries++;
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      }
  }
};

export const insertBoardData = async (sendData:any) => {
  const accessToken =  await EncryptedStorage.getItem('accessToken');
  const url = `${serverUrl}/postData/insertBoardData`;

  const MAX_RETRY = 5; // 최대 재시도 횟수
  const RETRY_DELAY = 1000; // 재시도 간격 (밀리초)
  let retries = 0;

  while (retries < MAX_RETRY) {
      try {
          const {data} = await axios.post(url, sendData, {headers:{'Authorization': `Bearer ${accessToken}` }},);
          return data;
      } catch (error:any) {
          console.error('insertBoardData 에러로 재실행', retries);
          retries++;
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      }
  }
};

export const insertResendSms = async (sendData:any) => {
  const accessToken =  await EncryptedStorage.getItem('accessToken');
  const url = `${serverUrl}/postData/insertResendSms`;

  const MAX_RETRY = 5; // 최대 재시도 횟수
  const RETRY_DELAY = 1000; // 재시도 간격 (밀리초)
  let retries = 0;

  while (retries < MAX_RETRY) {
      try {
          const {data} = await axios.post(url, sendData, {headers:{'Authorization': `Bearer ${accessToken}` }},);
          return true;
      } catch (error:any) {
          console.error('insertResendSms 에러로 재실행', retries);
          retries++;
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      }
  }

  return false;
};



export const insertFilesToJavaServer = async (formData:any) =>{
  const accessToken =  await EncryptedStorage.getItem('accessToken');
  const {webUrl} = await getAdminInfo();
  const url = `${webUrl}/hieduapp/app.do?no=2004`;
  
  try {
    const data = {
      method: 'POST',
      body: formData,
    };
     try {
          const response = await fetch(url, data);  
          return response; 	
      } catch (error) { 
        console.error('insertFilesToJavaServer 에러', error);
      }

  } catch (error:any) {
      console.error('insertBoardData 에러', error);
  }
}





///// update /////
export const updateSurveyResult = async (survey_answer:string, umslog_app_report_id:any, yyyymm:string) =>{
  const accessToken =  await EncryptedStorage.getItem('accessToken');
  const url = `${serverUrl}/postData/updateSurveyResult`;
  const sendData:any = {
      survey_answer,
      umslog_app_report_id,
      yyyymm,
  };
  try {
    const {data} = await axios.post(url, sendData, {headers:{'Authorization': `Bearer ${accessToken}` }},);
    return data;
  } catch (error) {
    console.error('updateSurveyResult', error);
  }
}

export const sendSMS_Random6 = async (randomNum:string, phone:string, ip:string) =>{
  const accessToken =  await EncryptedStorage.getItem('accessToken');
  const url = `${serverUrl}/postData/sendSMS_Random6`;
  const sendData:any = {
    randomNum, phone, ip
  };
  try {
    const {data} = await axios.post(url, sendData, {headers:{'Authorization': `Bearer ${accessToken}` }},);
    return data;
  } catch (error) {
    console.error('sendSMS_Random6', error);
  }
}

export const updateSendPushOn = async (isPushOn:string) =>{
    const accessToken =  await EncryptedStorage.getItem('accessToken');
    const url = `${serverUrl}/postData/updateSendPushOn`;
    const sendData:any = {
        isPushOn
    };
    try {
        const {data} = await axios.post(url, sendData, {headers:{'Authorization': `Bearer ${accessToken}` }},);
        return data;
    } catch (error) {
        console.error('updateSendPushOn', error);
    }
}

export const updateSendResult = async (user_id:string) =>{
    const accessToken =  await EncryptedStorage.getItem('accessToken');
    const url = `${serverUrl}/postData/updateSendResult`;
    const sendData:any = {
        user_id
    };
    try {
        const {data} = await axios.post(url, sendData, {headers:{'Authorization': `Bearer ${accessToken}` }},);
        return data;
    } catch (error) {
        console.error('updateSendResult', error);
    }
}

export const updateSecret = async (umslog_id:any) =>{
    const accessToken =  await EncryptedStorage.getItem('accessToken');
    const url = `${serverUrl}/postData/updateSecret`;
    const sendData:any = {umslog_id};
    try {
        await axios.post(url, sendData, {headers:{'Authorization': `Bearer ${accessToken}` }},);
    } catch (error) {
        console.error('updateSecret', error);
    }
}

export const deleteUmslog = async (umslog_id:any) =>{
    const accessToken =  await EncryptedStorage.getItem('accessToken');
    const url = `${serverUrl}/postData/deleteUmslog`;
    const sendData:any = {umslog_id};
    try {
        await axios.post(url, sendData, {headers:{'Authorization': `Bearer ${accessToken}` }},);
        return true;
    } catch (error) {
        console.error('deleteUmslog', error);
        return false;
    }
}

export const deleteAppMember = async () =>{
  const accessToken =  await EncryptedStorage.getItem('accessToken');
  const url = `${serverUrl}/postData/deleteAppMember`;
  try {
      await axios.post(url, {}, {headers:{'Authorization': `Bearer ${accessToken}` }},);
      return true;
  } catch (error) {
      console.error('deleteAppMember', error);
      return false;
  }
}