import react, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { Line, NoPaddingView, PaddingView, SafeBasicView, Space } from "../common/commonStyled";
import { Alert, Animated, AppState, DeviceEventEmitter, View } from "react-native";

import { StudentSelectTop } from "../components/StudentSelectTop";
import { StudentSelectBottom } from "../components/StudentSelectBottom";
import { HeaderCustom } from "../components/HeaderCustom";
import colors from "../common/commonColors";
import { UnreadComp } from "../components/UnreadComp";
import { useQuery } from "react-query";
import { getAlarmList } from "../common/commonData";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { changeAlarmToRead, getAlarmFullDate, getAlarmFullDate2, getAlarmSimpleDate, getDDay, getIsSurveyFinished, getIsSurveyStarted, getWindowWidth, removeDuplicateJsonArrData } from "../common/commonFunc";
import { CircleTxtBanner } from "../components/CircleTxtBanner";
import { goSurveyContent } from "../common/commonNaviFunc";
import { Loader } from "../components/Loader";
import { useAppDispatch } from "../store";
import { useSelector } from "react-redux";
import userSlice from "../slices/user";
import EncryptedStorage from 'react-native-encrypted-storage';

const HomeLetterFlatList = styled.FlatList`
`
const windowWidth = getWindowWidth();

const UnreadPress = styled.Pressable`
    height:140px; padding:26px 22px 30px 22px;
`

const UnreadTxtBox1 = styled.View`
    flex-direction: row; align-items: center; justify-content: space-between;
`
const UnreadTxt1 = styled.Text`
    font-family: 'noto500'; font-size: 15px; line-height: 20px; color:${colors.textBlack}; letter-spacing: -0.1px;
`
const UnreadTxt1_1 = styled.Text`
    font-family: 'noto400'; font-size: 12px; line-height: 20px; color:${colors.textBlack}; letter-spacing: -0.1px;
`
const UnreadTxt2 = styled(UnreadTxt1)`
    font-family: 'noto400'; margin-top: 12px; width: ${windowWidth-30-40}px;
`
const UnreadTxt3 = styled.Text`
    font-family: 'noto400'; font-size: 13px; line-height: 16px; color:${colors.dateGray}; letter-spacing: -0.5px; margin-top: 20px;
`

const BannerView = styled.View`
    flex-direction: row; 
`
const DDayBanner = styled.View`
    width: 40px; height: 22px;  border-radius: 50px; justify-content: center; align-items: center;
    margin-right: 4px; border-color: ${colors.mainBlue}; border-width: 1px;
`
const DDayBannerTxt = styled.Text`
    font-family: 'noto500'; font-size: 9px; line-height: 12px; color:${colors.mainBlue};
`



const endReached = () =>{
}




export const SurveyList = () =>{
    const dispatch = useAppDispatch();
    const navigation:any = useNavigation();

    const selectedStudent:any = useSelector((state:any)=>state.user.selectedStudent);

    // const [selectedStudent, setSelectedStudent] = useState("전체");
    const [selectedSchool, setSelectedSchool] = useState("");
    const [isShowBottomModal, setIsShowBottomModal] = useState(false);

    const [listData, setListData] = useState([]);
    const [listDataFiltered, setListDataFiltered] = useState([]);
    const [receiveList, setReceiveList] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);


    async function getData(){
        const data = await getAlarmList('survey', 'all');
        setListData(data);
        
        const receiveListData = removeDuplicateJsonArrData(data, 'name');
        let reveiveListTemp = [{name:'전체', school_name:""}];
        receiveListData.forEach(({name, school_name}:any)=>{
            reveiveListTemp.push({name, school_name});
        })
        setReceiveList(reveiveListTemp);
        
        setIsLoading(false);
    }

    useEffect(()=>{
        getData();

    },[]);

    useEffect(()=>{
        //애니메이션 기본값 셋팅
        closeBottomModal();
    },[]);

    useEffect(()=>{
        DeviceEventEmitter.addListener('backFromContent', () => {
            getData();
        });
    },[]);


    const selectStudent = (name:any, school_name:any) =>{
        dispatch(userSlice.actions.setSelectedStudent(name));
        // setSelectedStudent(name);
        setSelectedSchool(school_name);
        closeBottomModal();

        const listDataFiltered = listData.filter((item:any)=> item.name == name && item.school_name == school_name);
        setListDataFiltered(listDataFiltered);
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

    // function prepareGoAlarm(id:any, yyyymm:any, isSurveyStarted:any){
    //     // 리스트에서 알림 처리!
    //     let newList =  changeAlarmToRead(listData, id);
    //     setListData(newList);

    //     newList =  changeAlarmToRead(listDataFiltered, id);
    //     setListDataFiltered(listDataFiltered);

    //     goSurveyContent(navigation, id, yyyymm, isSurveyStarted);
    // }


    if(isLoading){return <Loader/>}

    const dataLength = listData?.length;

    const renderItem = ({item:data, index}:any) => {	
        const {id, subject, name, school_name,  insert_date, etc2, send_info, is_read, is_survey_answer, start_date, end_date} = data;
        const grade_class =  etc2!=null && `[${etc2?.split("^")[1]}-${etc2.split("^")[2]}]`
        const sendInfoGrade = send_info?.split("^")[0];
        const isTeacher = isNaN(sendInfoGrade)?"":"선생님";

        const insertDate = getAlarmFullDate(insert_date);
        const yyyymm = insertDate.replace(".","").replace(" ","").substring(0,6);

        const sDate = getAlarmSimpleDate(start_date);
        const eDate = getAlarmSimpleDate(end_date);

        const isSurveyStarted = getIsSurveyStarted(start_date);
        const isSurveyFinished = getIsSurveyFinished(end_date);
        
        let dDayTxt = "";
        let badge:any = "";
        let badgeColor = "";
        if(is_survey_answer==0){
            const dDay = getDDay(end_date);
            dDayTxt = dDay==0?'D-Day':`D-${dDay}`;
            badge ="미응답";
            badgeColor = colors.mainBlue;
            
        }else if(is_survey_answer==1){
            badge = "완료"
            badgeColor = colors.mainGreen;
        }
        if(!isSurveyStarted){
            badge ='예약'
        }
        if(isSurveyFinished){
            badge = "종료"
            badgeColor = colors.finishBanner;
        }
        
        return (
            <>
                {index===0 && <Line color={'#c3c3c3'}/>}
                <UnreadPress onPress={()=>{goSurveyContent(navigation, id, yyyymm, isSurveyStarted)}}>	
                    <UnreadTxtBox1>
                        <UnreadTxt1>{school_name} <UnreadTxt1_1>{grade_class} {name}</UnreadTxt1_1></UnreadTxt1>
                        <BannerView>
                            {badge==='미응답'&& <DDayBanner><DDayBannerTxt>{dDayTxt}</DDayBannerTxt></DDayBanner>}
                            <CircleTxtBanner text={badge} color={badgeColor}/>
                        </BannerView>
                    </UnreadTxtBox1>
                    <UnreadTxt2 numberOfLines={1}>{subject}</UnreadTxt2>
                    <UnreadTxt3>설문기간 : {sDate} ~ {eDate}</UnreadTxt3>
                </UnreadPress>
                <Line color={'#c3c3c3'}/>								
            </>			
        )    
    };		


    return (
        <>
        <SafeBasicView>
            <HeaderCustom title={"설문조사"}/>
            {dataLength<1?
            <UnreadComp text={'수신된 설문조사가 없습니다.'}/>
            : 
           <NoPaddingView>
                {receiveList.length > 2 &&
                    <PaddingView>
                        <StudentSelectTop 
                            openBottomModal={openBottomModal} 
                            selectedStudent={selectedStudent}
                        />
                    </PaddingView>
                }

                <Space height={8}/>
                <HomeLetterFlatList 
                    data = {selectedStudent=='전체'?listData:listDataFiltered}
                    renderItem={renderItem}
                    keyExtractor={(item:any, index:number) => index.toString()+""}
                    showsVerticalScrollIndicator={false}
                    onEndReached={endReached}
                    onEndReachedThreshold={0.8}
                    initialNumToRender={10} // 처음 10개의 아이템을 렌더링
                    maxToRenderPerBatch={5} // 한 번에 최대 5개씩 렌더링
                    ListFooterComponent = {()=>(
                        <Space height={150}/>
                    )}
                />
                
           </NoPaddingView>
           }

           
        </SafeBasicView>
            
        {isShowBottomModal &&
            <StudentSelectBottom 
                aniBoxPositionY={aniBoxPositionY}
                closeBottomModal={closeBottomModal}
                selectStudent={selectStudent}
                selectedStudent={selectedStudent}
                selectedSchool={selectedSchool}
                studentList ={receiveList}
            />
        }
        </>
        

    )

}