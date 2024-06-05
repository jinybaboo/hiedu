import react, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { Line, PaddingView, SafeBasicView, Space } from "../common/commonStyled";
import { Animated, View } from "react-native";

import { StudentSelectTop } from "../components/StudentSelectTop";
import { StudentSelectBottom } from "../components/StudentSelectBottom";
import { HeaderCustom } from "../components/HeaderCustom";
import colors from "../common/commonColors";
import { UnreadComp } from "../components/UnreadComp";

import { changeYYYYMMDDToYYYY_MM_DD, getTodayAsYYYY_MM_DD, getYYYYMM, removeDuplicateJsonArrData } from "../common/commonFunc";
import { getLunchInfo, getMySchoolCodeInfo, getMypageInfo, getScheduleCalendar } from "../common/commonData";

import { Calendar, LocaleConfig } from "react-native-calendars";
import { getMyInfoDataForBottomSelect, prepareCalendarData } from "../common/commonExportFunc";
import { calendarTheme, calendarType } from "../common/commonSetting";
import { Loader } from "../components/Loader";


const ScheduleBox = styled.View`
    width: 100%; height:75px; background-color:#F8F8F8; margin-top: 22px; border-bottom-width: 1px; border-bottom-color:#D8D8D8;
    padding:0 15px;
`
const ScheduleTxt1 = styled.Text`
     font-family: 'noto500'; font-size: 10px; line-height: 13px; color:${colors.textBlack}; margin-top: 18px;
`
const ScheduleTxt2 = styled.Text`
     font-family: 'noto500'; font-size: 14px; line-height: 17px; color:#000000; margin-top: 8px;
`

export const ScheduleCalendar = () =>{
    const [selectedStudent, setSelectedStudent] = useState("전체");
    const [selectedSchool, setSelectedSchool] = useState("");
    const [isShowBottomModal, setIsShowBottomModal] = useState(false);

    const [studentList, setStudentList] = useState([]);
    const [listData, setListData] = useState([]);
    const [listDataFiltered, setListDataFiltered] = useState([]);

    const [isLoading, setIsLoading] = useState(true);



    const [markObj, setMarkObj] = useState<any>({});
    const [isTxtExist, setIsTxtExist] = useState(false);
    const [txt1, setTxt1] = useState('')
    const [txt2, setTxt2] = useState('')


    const getData = async () => {
        let data = await getMypageInfo();
        let myInfo = getMyInfoDataForBottomSelect(data);

        
        // 등록된 정보의 학교 코드 가져오기
        let schoolCodeArr = await getMySchoolCodeInfo(myInfo);

        //등록된 학교 코드가 없으면 수신 myInfo 에서 제거
        myInfo = myInfo.filter((item:any)=>{
            const {name, school_name} = item;
            let hasSchool = false;
            schoolCodeArr.forEach(({SCHUL_NM}:any)=>{
                if(SCHUL_NM==school_name){
                    hasSchool = true;
                }
            })
            if(name==='전체'){
                hasSchool = true
            }
            return hasSchool;
        });

        //급식은 학교 단위 이므로 중복된 학교 코드는 myInfo에서 제거
        myInfo = removeDuplicateJsonArrData(myInfo, 'school_name');
        setStudentList(myInfo);

        
        let dataTemp:any = [];

        for(let i =0; i<schoolCodeArr.length; i++){
            const {ATPT_OFCDC_SC_CODE, SD_SCHUL_CODE, SCHUL_NM, SCHUL_KND_SC_NM} = schoolCodeArr[i];
            const today = new Date();
            const minDate = getYYYYMM(today, -24);
            data = await getScheduleCalendar(ATPT_OFCDC_SC_CODE, SD_SCHUL_CODE, minDate);
            if(data.SchoolSchedule!= undefined){
                let arr = data?.SchoolSchedule[1]?.row;
                dataTemp = [...dataTemp, ...arr];
            }
        }

        
        setListData(dataTemp);
        prepareData(dataTemp);

        setIsLoading(false);

   }

    
    useEffect(()=>{
        getData();
    },[])


    LocaleConfig.locales['kr'] = calendarType
    LocaleConfig.defaultLocale = 'kr';

    const today = getTodayAsYYYY_MM_DD();


    const onDayPress = ({dateString}:any) =>{
        setTxt1(dateString);
        let tempObj:any = {};

        //1. 기존의 마크및 EVENT_NM은 유지한채, 모든 selected는 false로 변경하여 꺼준다.
        Object.keys(markObj).forEach((key) => {
            const value:any = markObj[key];
            const {marked, EVENT_NM, SCHUL_NM} = value;
            tempObj[key] = {marked, selected:false, EVENT_NM, SCHUL_NM}
        });
        
        //선택한 날짜의 selected를 true로 만들어줌.
        if(tempObj[dateString]!==undefined && tempObj[dateString].EVENT_NM != undefined){
            tempObj[dateString].selected = true;
            setTxt2(`[${tempObj[dateString].SCHUL_NM}] ${tempObj[dateString].EVENT_NM}`);
            setIsTxtExist(true);
        }else{
            tempObj[dateString] = {selected:true}
            setTxt2('일정이 없습니다');
        }
        setMarkObj(tempObj);
    }

    const prepareData = (data:any) =>{
        const obj = prepareCalendarData(data);
        setMarkObj(obj);
    }

    const monthChange = async ({dateString}:any) =>{
        
    }


     //애니메이션 세팅
     const aniBoxPositionY = useRef(new Animated.Value(0)).current;

     function closeBottomModal(){
         Animated.timing(aniBoxPositionY, {
             toValue: 500,
             duration:400,
             useNativeDriver: true,
         }).start(()=>{
             setIsShowBottomModal(false);
         });
     }
 
     function openBottomModal(){
         setIsShowBottomModal(true);
         Animated.timing(aniBoxPositionY, {
             toValue: 0,
             duration:600,
             useNativeDriver: true,
         }).start(()=>{
             
         });
     }
 
     useEffect(()=>{
         //애니메이션 기본값 셋팅
         closeBottomModal();
     },[])
 
 
     const selectStudent = (name:any, school_name:any) =>{
        setSelectedStudent(name);
        setSelectedSchool(school_name);

        if(name=='전체'){
            prepareData(listData);
        }else{
            const listDataFiltered = listData.filter((item:any)=> item.SCHUL_NM == school_name);
            prepareData(listDataFiltered);
        }
        closeBottomModal();
    }


    if(isLoading){
        return <Loader />
    }

    return (
        <>
        <SafeBasicView>
            <>
                <HeaderCustom title={"학사 일정"}/>
                <Space height={6}/>
            </>
            {false ?
            <UnreadComp text={'학사일정 데이터가 없습니다.'}/>
            : 
            <>
                <PaddingView>
                {studentList.length > 2 &&
                    <StudentSelectTop 
                        openBottomModal={openBottomModal} 
                        selectedStudent={selectedStudent}
                        selectedSchool={selectedSchool}
                        from = 'lunchList'
                    />
                }
                </PaddingView>

                <>
                    <Line color={colors.lightGrayLine}/>

                    <Space height={30}/>
                    <Calendar 
                        monthFormat={'yyyy년 M월'}
                        current={today}
                        theme={calendarTheme}
                        markedDates={markObj}
                        onMonthChange={monthChange}
                        onDayPress={onDayPress}
	                    hideExtraDays={true}
                    />

                    {isTxtExist && 
                    <PaddingView>
                        <ScheduleBox>
                            <ScheduleTxt1>{txt1}</ScheduleTxt1>
                            <ScheduleTxt2>{txt2}</ScheduleTxt2>
                        </ScheduleBox>
                    </PaddingView>}
                    
                </>
           </>
           }
        </SafeBasicView>
            
        {isShowBottomModal &&
            <StudentSelectBottom 
                aniBoxPositionY={aniBoxPositionY}
                closeBottomModal={closeBottomModal}
                selectStudent={selectStudent}
                selectedStudent={selectedStudent}
                selectedSchool={selectedSchool}
                studentList ={studentList}
                from = 'lunchList'
            />
        }
        </>
        

    )

}