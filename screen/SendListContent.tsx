import react, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { BasicScrollView, HeaderSpaceForAndroid, PaddingView, SafeBasicView, Space } from "../common/commonStyled";
import { Ionicons } from '@expo/vector-icons'; 
import { getWindowWidth } from "../common/commonFunc";
import { Alert, BackHandler, DeviceEventEmitter, Platform, Pressable, RefreshControl } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAppDispatch } from "../store";
import { Loader } from "../components/Loader";
import { deleteUmslog, getSendListContent, getUmslogInsertDate, insertResendSms, updateSecret, updateSendResult } from "../common/commonData";
import { useSelector } from "react-redux";
import colors from "../common/commonColors";
import { goBack, goSendList } from "../common/commonNaviFunc";
import { BlueBottomBtn } from "../components/BlueBottomBtn";
import { goSendWrite } from "../common/commonNaviFunc";
import { Shadow } from "react-native-shadow-2";

const windowWidth = getWindowWidth();

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
    width: 100%; height:40px; border-bottom-width: 1px; border-color: #eef0f3; flex-direction: row; 
`
const Td1 = styled.Text`
    width:12%; font-family: 'noto300'; font-size: 13px; height: 40px; text-align: center; line-height: 40px; 
`
const Td2 = styled(Td1)`
    width:15%; text-align: center; padding-left: 0;
`
const Td3 = styled(Td2)`
    width:15%;   
`
const Td4 = styled(Td2)`
    width:15%;   
`
const Td5 = styled(Td2)`
    width:25%;   
`
const Td6 = styled(Td2)`
    width:15%;   
`
// const Td7 = styled(Td2)`
//     width:15%; line-height: 17px; padding-top: 3px;
// `
// const Td7_1Press = styled.TouchableOpacity`
//     width:15%;  height: 40px; align-items: center; justify-content: center;
// `
// const Td7_1 = styled(Td2)`
//     width:100%; text-decoration: underline;
// `

const BtnsView = styled.View`
    padding:0 20px; flex-direction: row; justify-content: space-around; height: 190px;
`
const ReSendBtn = styled.View`
    height:36px; background-color:#ffae00 ; border-radius: 3px; justify-content: center; align-items: center; padding: 0 20px;
`
const ResendTxt = styled.Text`
    font-family: 'noto400'; font-size: 13px; line-height:17px; color:#FFF; letter-spacing: -0.2px; 
`
const LockBtn = styled(ReSendBtn)`
     background-color:#046de3 ;
`
const LockTxt = styled(ResendTxt)`
    
`
const UnreadBtn = styled(ReSendBtn)`
     background-color:#474747 ;
`
const UnreadTxt = styled(ResendTxt)`
    
`

const BtnWrap = styled.View`
    position: relative; 
`
const MoreBtnView = styled.View`
    position: absolute; top:40px; height:135px; width: 200px; 
`
const ReceiveBtnPress = styled.TouchableOpacity`
   width:100%; height:45px; align-items: center; justify-content: center;  padding: 0 10px;
`
const ReceiveBtnTxt = styled.Text`
    font-family: 'noto400'; font-size: 13px; line-height: 17px; color:${colors.textBlack}; letter-spacing: -0.5px; margin-top: 5px;
`


export const SendListContent = () =>{
    let user_id = useSelector((state:any)=>state.user.user_id);
    let unreadCount = 0;
    let failCount = 0;

    const route = useRoute();			
    const { id, startDate, endDate }:any = route.params; 	

    const navigation:any = useNavigation();
    const dispatch = useAppDispatch();
    const [data, setData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const [isSecret, setIsSecret] = useState(false);
    const [showMoreBtn, setShowMoreBtn] = useState<any>(false);

    async function getData(){
        let data = await getSendListContent(id);
        setData(data);

        const {options} = await getUmslogInsertDate(id);
        setIsSecret(options.includes('secret'));

        setIsLoading(false);
    }

    useEffect(()=>{
        getData();

        return () => {
            DeviceEventEmitter.emit('backFromResult', {startDate, endDate});
        }
    },[isSecret]);



    const backAction = () => {
        goSendList(navigation);
        return true;
    }

    useEffect(()=>{
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
        return () => backHandler.remove(); 
    },[]);




    async function onRefresh(){
        getData();
        await updateSendResult(user_id);
    }
    async function onRefresh2(){
        setIsLoading(true);
        getData();
        await updateSendResult(user_id);
    }
    
    function askReSendAllUnread(){
        setShowMoreBtn(false);

        if(category=='survey' ){
            Alert.alert('','설문조사는 SMS로 재발송 할 수 없습니다.');
            return;
        }

        if(unreadCount==0){
            Alert.alert('','재발송 대상이 없습니다.');
            return;
        }

        Alert.alert( //alert 사용							
            '안내',  `SMS 발송 문자 건수에 대하여 요금이 발생합니다.${'\n'}읽지 않은 APP발신 ${unreadCount}건을 SMS 문자로 재발신 하시겠습니까?`, [					
                {text: '취소', onPress: () => {}},			
                {text: '확인', onPress: () => {
                    const umslog_report_arr = data.filter( (item:any) => (							
                        item.result == '1' && item.send_type=='app' && item.is_read == 0
                    ));						
                    resendSms(id, umslog_report_arr);
                }}, 		
            ]						
        );							
    }

    function askReSendFailed(){
        setShowMoreBtn(false);

        if(category=='survey' ){
            Alert.alert('','설문조사는 SMS로 재발송 할 수 없습니다.');
            return;
        }
        
        if(failCount==0){
            Alert.alert('','발송에 실패한 건이 없습니다.');
            return;
        }

        Alert.alert( //alert 사용							
            '안내',  `SMS 발송 문자 건수에 대하여 요금이 발생합니다.${'\n'}발송에 실패한 ${unreadCount}건을 SMS 문자로 재발신 하시겠습니까?`, [			
                {text: '취소', onPress: () => {}},			
                {text: '확인', onPress: () => {
                    const umslog_report_arr = data.filter( (item:any) => (							
                        item.result == '2'
                    ));
                    resendSms(id, umslog_report_arr);
                }}, 		
            ]						
        );				
    }

    function askCancelReserve(){
        Alert.alert( //alert 사용							
            '안내',  `발송 예약을 취소 하시겠습니까?`, [					
                {text: '취소', onPress: () => {}},			
                {text: '확인', onPress: async () => {
                    const isSuccess = await deleteUmslog(id);
                    if(isSuccess){
                        goBack(navigation);
                    }else{
                        Alert.alert('안내','예약취소에 실패하였습니다.\n다시 시도해 주세요.')
                    }
                }}, 		
            ]						
        );							
    }


    function checkResendWrite(category:string, umslog_id:string, send_from:string){
        setShowMoreBtn(false); 
        if(send_from==='web'){
            Alert.alert('안내', '웹에서 발송한 건은 받는사람 내역을 불러올 수 없습니다.')
        }
        goSendWrite(navigation, category, umslog_id);
    }



    async function resendSms(umslog_id:string, umslog_report_arr:object){
        const isSuccess = await insertResendSms({umslog_id, umslog_report_arr});

        const alertTxt = isSuccess?'재발송이 요청 되었습니다.':'재발송이 실패하였습니다. 다시 시도해 주세요.';

        Alert.alert('',alertTxt,  [{text: '확인', onPress: () => {
            isSuccess && goSendList(navigation);
        } }])
    }

    async function updateSecretLock(isSecret:boolean){
        updateSecret(id);
        if(isSecret){
            Alert.alert('','잠금해제가 완료 되었습니다.');
        }else{
            Alert.alert('','메세지 잠금처리가 완료 되었습니다.');
        }
        setIsSecret(!isSecret);
    }


    if(isLoading){
        return <Loader />
    }

    const category = data[0].category;
    const umslog_id = data[0].umslog_id;
    const send_from = data[0].send_from;
    const sendName = data[0].etc1;


    let isShowCancelReserve = false;
    

    return (
        <SafeBasicView>
            {/* <HeaderCustom title={'발송 결과 확인'}/> */}
            <HeaderSpaceForAndroid />
            <Header>
                <HeaderPress onPress={()=>{goSendList(navigation)}}>
                    <Ionicons style={{marginTop:6}} name="chevron-back" size={28} color="#000000" />
                </HeaderPress>
                <HeaderTxt>{sendName}님 발송 결과</HeaderTxt>
                <RefreshPress onPress={onRefresh2}>
                    <Ionicons name="reload" size={18} color="black" />
                </RefreshPress>
            </Header>

            <Space height={15}/>
            <TrView style={{borderTopWidth:1, backgroundColor:'#F9F9F9'}}>
                <Td1 style={{fontFamily:'noto500'}}>번호</Td1>
                <Td2 style={{fontFamily:'noto500'}}>이름</Td2>
                <Td3 style={{fontFamily:'noto500'}}>발신종류</Td3>
                <Td5 style={{fontFamily:'noto500'}}>수신번호</Td5>
                <Td6 style={{fontFamily:'noto500'}}>결과</Td6>
                <Td4 style={{fontFamily:'noto500'}}>열람여부</Td4>
                {/* <Td7 style={{fontFamily:'noto500'}}>SMS{'\n'}재발송</Td7> */}
            </TrView>   
            <BasicScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {data.map((item:any, idx:number)=>{
                    const result = item.result;
                    const umslog_report_id = item.id;
                    const isScheduling = item.scheduling == '1' && item.isSchedulingSent == '0' ? true:false;

                    let resultKor = "처리중";
                    if(result==1){resultKor="성공"}
                    if(result==2){resultKor="실패"}

                    let isReadKor = item.is_read == 1 ? "열람" : "미열람";
                    if(item.send_type=='sms' || result!='1'){
                        isReadKor="-";
                    }

                    if(isScheduling){
                        resultKor='예약';
                        isShowCancelReserve = true;
                    }

                    if((result=='1' && item.send_type=='app' && item.is_read == 0)){
                        unreadCount++;
                    }
                    if((result==2)){
                        failCount++;
                    }

                    

                    return(
                        <TrView key={'list_'+idx} style={idx%2==1&&{backgroundColor:'#F9F9F9'}}>
                            <Td1>{idx+1}</Td1>
                            <Td2>{item.name}</Td2>
                            <Td3>{item.send_type}</Td3>
                            <Td5>{item.phone}</Td5>
                            <Td6>{resultKor}</Td6>
                            <Td4>{isReadKor}</Td4>
                            {/* <Td7_1Press onPress={()=>{
                                askResendSms(item.name, umslog_report_id, item.category, item.phone)
                            }}>
                                <Ionicons name="paper-plane-outline" size={16} color={colors.textBlack} />
                            </Td7_1Press> */}
                        </TrView>    
                    )
                })}

                <Space height={25}/>

                <BtnsView>
                    <BtnWrap>
                        <Pressable onPress={()=>{setShowMoreBtn(!showMoreBtn)}}>
                            <ReSendBtn>
                                <ResendTxt>재전송</ResendTxt>
                            </ReSendBtn>
                        </Pressable>

                        {showMoreBtn &&
                        <MoreBtnView>
                            <Shadow		
                                style={{
                                    borderRadius:10, 
                                    backgroundColor:'#FFF',
                                    
                                }}	
                                distance={10} 
                                startColor={'#f0f0f0'} 
                                endColor={'#FFFFFF'} 
                                offset={[4, 6]}
                            >	
                                <ReceiveBtnPress onPress={()=>{checkResendWrite(category, umslog_id, send_from)}}>
                                    <ReceiveBtnTxt style={{marginTop:10}}>다시 작성하기</ReceiveBtnTxt>
                                </ReceiveBtnPress>
                               {!isShowCancelReserve &&
                                <ReceiveBtnPress onPress={askReSendAllUnread}>
                                    <ReceiveBtnTxt style={{marginTop:-3}} >미열람 SMS 재발송 ({unreadCount}건)</ReceiveBtnTxt>
                                </ReceiveBtnPress>
                                }
                                {!isShowCancelReserve &&
                                <ReceiveBtnPress onPress={askReSendFailed}>
                                    <ReceiveBtnTxt style={{marginTop:-18}}>실패건 SMS 재발송 ({failCount}건)</ReceiveBtnTxt>
                                </ReceiveBtnPress>
                                }
                            </Shadow>
                        </MoreBtnView>
                        }
                    </BtnWrap>

                    <Pressable onPress={()=>{updateSecretLock(isSecret)}}>
                        <LockBtn>
                            <LockTxt>{isSecret?'잠금 해제':'메세지 잠금'}</LockTxt>
                        </LockBtn>
                    </Pressable>
                    
                    {/* {category !=='survey' && !isShowCancelReserve &&
                    <Pressable onPress={askReSendAllUnread}>
                        <UnreadBtn>
                            <UnreadTxt>미열람 SMS 발송({unreadCount}건)</UnreadTxt>
                        </UnreadBtn>
                    </Pressable>
                    } */}

                    {isShowCancelReserve &&
                    <Pressable onPress={askCancelReserve}>
                        <UnreadBtn 
                            style={{backgroundColor:'#e7795f'}}
                        >
                            <UnreadTxt>예약취소</UnreadTxt>
                        </UnreadBtn>
                    </Pressable>
                    }
                </BtnsView>
                
            </BasicScrollView>
        </SafeBasicView>
    )

}

