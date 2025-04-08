import react, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { BasicScrollView, HeaderSpaceForAndroid, SafeBasicView, Space } from "../common/commonStyled";
import { Ionicons } from '@expo/vector-icons'; 
import { getNumberDaysBefore, getWindowHeight, getWindowWidth, getYYMMDD_dash, getYYYYMMDD_dash, getYYYYMMDD_dot } from "../common/commonFunc";
import { Alert, BackHandler, DeviceEventEmitter, Platform, RefreshControl, TouchableOpacity } from "react-native";
import { goBack, goMypage, goSendListContent } from "../common/commonNaviFunc";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../store";
import { getSendList, updateSendResult } from "../common/commonData";
import { useSelector } from "react-redux";
import { Loader } from "../components/Loader";
import { UnreadComp } from "../components/UnreadComp";
import colors from "../common/commonColors";
import { FontAwesome5 } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const windowWidth = getWindowWidth();
const windowHeight = getWindowHeight();

const os = Platform.OS;
const Header = styled.View`
    width:100%; height:50px; flex-direction: row; justify-content: center; align-items: center; position: relative;
`
const HeaderPress = styled.Pressable`
    padding:10px 20px 10px 10px; position: absolute; left:0px;
`
const HeaderTxt = styled.Text`
    font-family: 'noto500'; font-size: 18px; line-height: 21px; color:${colors.textBlack}; letter-spacing: -0.2px; margin-top:${os==='ios'?7:6}px;
`
const RefreshPress = styled.TouchableOpacity`
    width: 50px; height: 50px; position: absolute; right:10px; justify-content: center; align-items: center; padding-top: 5px;
`


const TrView = styled.View`
    width: 100%; height:40px; border-bottom-width: 1px; border-color: #eef0f3; flex-direction: row; position: relative;
`
const Td1 = styled.Text`
     font-family: 'noto300'; font-size: 13px; width:${windowWidth-80-40-40}px;  height: 40px; text-align: center; line-height: 40px; padding-left: 20px; text-align: left;
`
const Td1Bold = styled(Td1)`
    font-family: 'noto500';
`
const Td2 = styled(Td1)`
    width:70px; text-align: center; padding-left: 0;
`
const Td3 = styled(Td2)`
    width:40px; 
`
const Td4 = styled(Td2)`
    width:40px;
`

const Td5 = styled(Td2)`
    width:80px;
`

const Lock = styled.Image`
    width: 9px; height: 14px; position: absolute; left:8px; top:13px;
`



const btmTxtInnerWidth1 = windowWidth-76 - 20;

const BottemTxtInnerRight1 = styled.View`
    width: ${btmTxtInnerWidth1}px; height: 100%; flex-direction: row; align-items: center; padding-left: 15px;  position: absolute; top:3px;
`
const DatePress = styled.Pressable`
    width: ${(btmTxtInnerWidth1/2)-24}px; height: 30px; background-color: #F1F2F4; border-radius: 4px;  flex-direction: row; align-items: center; padding-left: 8px;
` 
const WaveTxt = styled.Text`
    font-family: 'noto700'; font-size: 13px; line-height: 16px; color:${colors.textBlack}; padding:0 7px;
`
const DateTxt = styled.Text`
    font-family: 'noto400'; font-size: 13px; line-height: 16px; color:${colors.placeholder}; letter-spacing: -0.2px; margin-top: 2px; padding-left: 8px;
`


//얘약 타임피커 박스
const TimePickerWrap = styled.View`
    background-color:rgba(0,0,0,0.6); position: fixed; width: 100%; height:100%; margin-top: -100px; padding: 100px 15px 0;
`
const IosPickerView = styled.View`
    flex-direction:row;justify-content:space-between;  align-items: flex-end;
`
const IosPickerPress = styled.TouchableOpacity`
    padding: 20px;
`
const IosPickerTxt = styled.Text`
    font-family: 'noto700'; font-size: 16px; line-height: 18px; color:${colors.mainBlue}; letter-spacing: -0.2px; 
`


const LoadImage = styled.Image`
    width:70px; height:70px; position: absolute;  z-index: 100; left:${(windowWidth/2)-35}px; top: ${(windowHeight/2)-70}px;
`


export const SendList = () =>{
    const navigation:any = useNavigation();
    const dispatch = useAppDispatch();

    let user_id = useSelector((state:any)=>state.user.user_id);
    let isUser = useSelector((state:any)=>state.user.isUser);

    let member_id = useSelector((state:any)=>state.user.member_id);
    const portal_id = isUser==1?user_id:member_id;

    const [data, setData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showInnerLoader, setShowInnerLoader] = useState(false);
    const [refreshing, setRefreshing] = useState(false);


    const [isShowDatePicker, setIsShowDatePicker] = useState(false);
    const [dateKind, setDateKind] = useState('startDate');
    const [startDate, setStartDate] = useState<any>(getNumberDaysBefore(30));
    const [endDate, setEndDate] = useState<any>(new Date());

    async function getData(){
        const data = await getSendList(isUser, portal_id, getYYYYMMDD_dash(startDate) , getYYYYMMDD_dash(endDate));
        setData(data);

        setIsLoading(false);
    }

    async function getDataFromContentBack(obj:any){
        const data = await getSendList(isUser, portal_id, getYYYYMMDD_dash(obj.startDate) , getYYYYMMDD_dash(obj.endDate));
        setData(data);

        setIsLoading(false);
    }

    useEffect(()=>{
        getData();

        DeviceEventEmitter.addListener('backFromResult', (data) => {
            getDataFromContentBack(data);
        });
    },[]);


    const backAction = () => {
        goMypage(navigation);
        return true;
    }

    useEffect(()=>{
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
        return () => backHandler.remove(); 
    },[]);


    async function updateData(){
        await updateSendResult(user_id);
        getData();
        setShowInnerLoader(false);

    }

    
    function onRefresh(){
        setShowInnerLoader(true);
        updateData();
    }


    const onChangeSurveyDate = async (event:any, selectedDate:any) => {
        const {type} = event;
        if(type==='dismissed'){
            setIsShowDatePicker(false);
            return;
        }

        const sDate = dateKind==='startDate'?selectedDate:startDate;
        const eDate = dateKind==='startDate'?endDate:selectedDate;

        const dateGap = (eDate-sDate)/1000/60/60/24;
        if(dateGap<0){
            Alert.alert('검색 종료 일자는 검색 시작일 보다 빠를수 없습니다.');
            setIsShowDatePicker(false);
            return;
        }
        
        if(dateGap>30*6){
            Alert.alert('안내','검색기간이 클 경우 데이터 호출이 지연될 수 있습니다.');
        }

        
        setIsLoading(true);
        setIsShowDatePicker(false);
        
        if(dateKind==='startDate'){
            setStartDate(selectedDate);
        }else{
            setEndDate(selectedDate);
        }

        const data = await getSendList(isUser, portal_id, getYYYYMMDD_dash(sDate) , getYYYYMMDD_dash(eDate));
        setData(data);
        setIsLoading(false);
    };



    function checkLockStatus(id:any, isSecret:any, insert_id:string, options:string, sendName:string){
        const isLock = options.includes('secret');

        if(isLock){
            if(insert_id==portal_id){
                goSendListContent(navigation, id, isSecret, startDate, endDate);
            }else{
                Alert.alert('안내',`잠금 메세지는 발송자만 열람 가능 합니다.\n발신자 : ${sendName}`);
            }

        }else{
            goSendListContent(navigation, id, isSecret, startDate, endDate);
        }


    }
    

    
    if(isLoading){
        return <Loader />
    }

    return (
        <SafeBasicView>
            <HeaderSpaceForAndroid />
            {showInnerLoader && <LoadImage source={require('../assets/icons/loading.gif')}/>}

            <Header>
                <HeaderPress onPress={()=>{goMypage(navigation)}}>
                    <Ionicons style={{marginTop:6}} name="chevron-back" size={28} color="#000000" />
                </HeaderPress>

                <HeaderTxt></HeaderTxt>
                <RefreshPress onPress={()=>{onRefresh()}}>
                    <Ionicons name="reload" size={18} color="black" />
                </RefreshPress>


                <BottemTxtInnerRight1>
                    <DatePress
                        onPress={()=>{
                            setIsShowDatePicker(true);
                            setDateKind('startDate');
                        }}
                    >
                        <FontAwesome5 name="calendar-alt" size={13} color="black" />
                        <DateTxt>{getYYYYMMDD_dot(startDate)}</DateTxt>
                    </DatePress>

                    <WaveTxt>~</WaveTxt>

                    <DatePress
                        onPress={()=>{
                            setIsShowDatePicker(true);
                            setDateKind('endDate');
                        }}
                    >
                        <FontAwesome5 name="calendar-alt" size={13} color="black" />
                        <DateTxt>{getYYYYMMDD_dot(endDate)}</DateTxt>
                    </DatePress>
                </BottemTxtInnerRight1>
            </Header>


            {data== undefined || data.length==0?
            <UnreadComp text={'발송내역이 없습니다.'}/>
            :
            <>
            <Space height={15}/>
            <TrView style={{borderTopWidth:1, backgroundColor:'#F9F9F9'}}>
                <Td1 style={{fontFamily:'noto500', textAlign:'center'}}>제목</Td1>
                <Td2 style={{fontFamily:'noto500'}}>발송일</Td2>
                <Td3 style={{fontFamily:'noto500'}}>성공</Td3>
                <Td4 style={{fontFamily:'noto500'}}>실패</Td4>
            </TrView>   
            <BasicScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {data.map((item:any, idx:number)=>{

                    const category = item.category;
                    let cateKor = "";
                    if(category==='notice'){
                        cateKor='[알림장]';
                    }else if(category==='letter'){
                        cateKor='[가정통신문]';
                    }else if(category==='survey'){
                        cateKor='[설문조사]';
                    }

                    const isScheduling = item.scheduling == '1' && item.isSchedulingSent == '0' ? true:false;


                    const options = item.options;
                    const isSecret = options.includes('secret');
                    const sendDate = getYYYYMMDD_dash(item.send_date);

                    return(
                        <TouchableOpacity key={'list_'+idx} onPress={()=>{
                            checkLockStatus(item.id, isSecret, item.insert_id, item.options, item.etc1);
                        }}>
                        <TrView style={idx%2==1&&{backgroundColor:'#F9F9F9'}}>
                            {isSecret && <Lock source={require('../assets/icons/tree_lock.png')}/>}
                            <Td1 numberOfLines={1} style={{textAlign:'left', fontFamily:'noto400'}}><Td1Bold>{cateKor}</Td1Bold> {item.subject}</Td1>
                            <Td2>{sendDate} </Td2>
                            {isScheduling?
                            <Td5>예약전송</Td5>
                            :
                            <>
                            <Td3>{item.succ_count_sms + item.succ_count_app} </Td3>
                            <Td4>{item.fail_count_sms + item.fail_count_app}</Td4>
                            </>
                            }
                        </TrView>    
                        </TouchableOpacity>
                    )
                })}
            </BasicScrollView>
            </>
            }


            {isShowDatePicker &&    // 설문 날짜 선택 2차 모달
            <TimePickerWrap>
                {os=='ios' && 
                <IosPickerView>
                        <IosPickerPress onPress={()=>{}}>
                    </IosPickerPress>
                    <IosPickerPress onPress={()=>{setIsShowDatePicker(false)}}>
                        <IosPickerTxt style={{color:'#FFF'}}>&times;</IosPickerTxt>
                    </IosPickerPress>
                </IosPickerView>
                }
                <DateTimePicker
                    testID="datePicker"
                    value={dateKind=='startDate'?startDate:endDate}
                    mode="date" // 'date'를 'time'으로 변경하여 시간 선택도 가능합니다.
                    display="inline"
                    timeZoneName={'Asia/Seoul'}
                    locale="ko-KR"
                    onChange={onChangeSurveyDate}
                    style={{ backgroundColor: 'white', height:550}} // 배경색 및 글자색 설정
                />
            </TimePickerWrap>
            }
            
        </SafeBasicView>
    )

}

