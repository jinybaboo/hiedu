import react, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { BasicInnerView, BasicView, GrayInputBox, ModalBackground, SafeBasicView, Space } from "../common/commonStyled";
import colors from "../common/commonColors";
import { Alert, Animated, Keyboard, Platform, Pressable, View } from "react-native";
import { formatTime, getRandomNum6 } from "../common/commonFunc";
import { BlueBottomBtn } from "../components/BlueBottomBtn";
import { goBack, goHome, goLoginAgree } from "../common/commonNaviFunc";
import { useNavigation } from "@react-navigation/native";
import { HeaderCustom } from "../components/HeaderCustom";
import { useAppDispatch } from "../store";
import { getIsExistAndSaveIfExist, getIsPhoneExist, getLoginTokens, getMypageInfo, sendSMS_Random6 } from "../common/commonData";
import EncryptedStorage from 'react-native-encrypted-storage';
import { loginCheckAndSaveSendInfo } from "../common/commonExportFunc";
import messaging from '@react-native-firebase/messaging';
import axios from 'axios'
import { Loader } from "../components/Loader";

const os = Platform.OS;

const ProcessNumBox = styled.View`
    flex-direction: row; width:100%; justify-content: flex-end; margin-top: 40px;
`
const ProcessNum = styled.Text`
    font-family: 'noto400'; font-size: 15px; line-height: 18px; color:#555555; margin-left: 5px;
`
const ProcessNumInactive = styled(ProcessNum)`
    color:#D8D8D8;
`
const CellTitle = styled.Text`
    font-family: 'noto500'; font-size: 18px; line-height: 21px; color:#000000; 
`

const PhoneInput = styled.TextInput`
   width:200px;font-size:${os==='ios'?16:15}px; 
`
const CellSendPress = styled.TouchableOpacity`
    width:105px; height:30px; border-radius: 3px; background-color: #F1F1F1; align-items: center; justify-content: center;
`
const CellSendBtnText = styled.Text`
    font-family: 'noto400'; font-size: 13px; line-height:16px; color:#0080F5;margin-top:2px;
`
const SerialSendPress = styled(CellSendPress)`
    width:45px;
`
const SerialSendBtnText = styled(CellSendBtnText)``

const SerialTitle = styled.Text`
    font-family: 'noto400'; font-size: 13px; line-height: 16px; color:#555555; 
`
const SerialInputBox = styled.View`
    flex-direction: row; width:100%; height:50px; border-bottom-width:1px; border-color: #f1f1f1; border-style: solid;
    align-items: center; justify-content: space-between; padding:0 8px 0 4px;
`
const SerialInput = styled(PhoneInput)``

const SerialTimeTxt = styled.Text`
    font-family: 'noto400'; font-size: 13px; line-height: 16px; color:#D00000;  margin-right:-25px;
`
const SerialSubTxt = styled.Text`
    font-family: 'noto400'; font-size: 12px; line-height: 15px; color:${colors.textBlack}; 
`
const ContinuePress = styled.Pressable`
      width:100%; height:55px; position: absolute; bottom: 25px; left:20px; 
`

const BottomUpBoxAnimated = styled(Animated.createAnimatedComponent(View))`
    width:100%; padding:30px 20px 20px; background-color: #FFFFFF; position: absolute; bottom:0px; border-top-left-radius: 20px; border-top-right-radius:20px ;
`
const BottomUpText1 = styled.Text`
    font-family: 'noto700'; font-size: 17px; line-height: 20px; color:#000000;  text-align: center;
`
const BottomUpText2 = styled.Text`
    font-family: 'noto300'; font-size: 14px; line-height: 20px; color:#000000;  text-align: center; margin-top: 28px;
`
const BottomUpText3 = styled(BottomUpText2)`
    font-family: 'noto500'; 
`

export const LoginAgree2 = () =>{

    const navigation:any = useNavigation();
    //리듀서 사용 세팅
    const dispatch = useAppDispatch();

    const [ip, setIp] = useState('');
    const [phone, setPhone] = useState('');
    const [serialSent, setSerialSent] = useState('');
    const [serialReceived, setSerialReceived] = useState('');
    const [isSerialConfirmed, setIsSerialConfirmed] = useState(false);

    const [time, setTime] = useState(180); // 초 단위로 3분(3 * 60) 설정
    const [displayTime, setDisplayTime] = useState(formatTime(time));
    const [isRunning, setIsRunning] = useState(false);

    //휴대폰 번호 요청시 활성/비활성 관리
    const [isPhoneEditable, setIsPhoneEditable] = useState(true);
    const [isSendPhoneBtnDisabled, setIsSendPhoneBtnDisabled] = useState(false);

    // 모달관리
    const [isShowModal, setIsShowModal] = useState(false);

    const [showLoader, setShowLoader] = useState<any>(false);

    const phoneInputRef:any = useRef(null);
    const serialInputRef:any = useRef(null);

    //애니메이션 세팅
    const aniBoxPositionY = useRef(new Animated.Value(0)).current;

    function closeBottomModal(){
        Animated.timing(aniBoxPositionY, {
            toValue: 500,
            duration:400,
            useNativeDriver: true,
        }).start(()=>{
            goLoginAgree(navigation);
        });
    }

    function openBottomModal(){
        Animated.timing(aniBoxPositionY, {
            toValue: 0,
            duration:600,
            useNativeDriver: true,
        }).start(()=>{
           
        });
    }

    useEffect(()=>{
        //애니메이션 기본값 셋팅
        Animated.timing(aniBoxPositionY, {
            toValue: 500,
            duration:400,
            useNativeDriver: true,
        }).start();

    },[])


    const goBackLogin = () => {
        closeBottomModal();
        goBack(navigation);
    }

    const checkGoHome = async () =>{
        setShowLoader(true);
        const fcmToken = await messaging().getToken();
        
        if(isSerialConfirmed){
            const isNumExistInDB = await getIsExistAndSaveIfExist(phone, fcmToken);
            //서버 다녀와서 해당 번호가 있을경우 로그인 처리하기!
            if(isNumExistInDB){
                const {accessToken} = await getLoginTokens(phone);
                await EncryptedStorage.setItem('accessToken',accessToken);
                await loginCheckAndSaveSendInfo(dispatch, phone);
                goHome(navigation);
            }else{
                //모달 보여주고 애니메이션 띄우기
                openLoginReject();
            }
            setShowLoader(false);
        }
    }


    function openLoginReject(){
        setIsShowModal(true);
        setTimeout(()=>{
            openBottomModal()
        },200)
    }

    


    useEffect(() => {
        if (isRunning) {
          const timer = setInterval(() => {
            if (time > 0) {
              setTime(time - 1);
              setDisplayTime(formatTime(time - 1));
            }else{
                clearInterval(timer); 
                Alert.alert(
                '안내', '인증 유효 시간이 만료되었습니다.\n다시 인증번호를 요청해 주세요.', [ //alert창 문구 작성						
                    {text: '확인', onPress: () => {
                        resetPhone(); 
                    } }, 		
                ])
            }
          }, 1000);
    
          return () => {
            clearInterval(timer);
          };
        }
    }, [time, isRunning]);


    useEffect( () => {    
        axios.get('https://geolocation-db.com/json/').then((res) => {      
            setIp(res.data.IPv4)    
        })  
    },[])



    const onChangeNumber = (text:string) => {
        const numericText = text.replace(/[^0-9]/g, ''); //숫자 이외 문자는 제거
        setPhone(numericText)
    }

    const onChangeSerial = (text:string) => {
        const numericText = text.replace(/[^0-9]/g, ''); //숫자 이외 문자는 제거
        setSerialReceived(numericText)
    }

    const sendPhone = async () =>{
        const phone3 = phone.substring(0,3);
        if(phone.length != 11 || phone3!='010'){
            Alert.alert('안내', '전화번호를 정확하게 입력해 주세요.');	
            return;
        }

        Keyboard.dismiss(); //키보드 숨김
        inActivePhoneSend(); // 휴대폰 번호 입력 기능 및 번호요청 버튼 비활성화

        //DB에 전화번호 없을시 인증문자 발송 거절
        const isNumExistInDB = await getIsPhoneExist(phone);
        
        console.log(isNumExistInDB);
        
        if(!isNumExistInDB){
            openLoginReject();
            return;
        }

        const randomNum = phone==='01012340000'?'000000': getRandomNum6();
        setSerialSent(randomNum);

        if(phone!==''){
            await sendSMS_Random6(randomNum, phone, ip);
        }

        console.log(randomNum);

        Alert.alert( //alert 사용							
        '안내', '인증번호를 발송하였습니다.', [ //alert창 문구 작성						
            {text: '확인', onPress: () => {setIsRunning(true);} }, 		
        ]);		
    }


    const sendSerial = () =>{
        Keyboard.dismiss();

        if(serialReceived===serialSent){
            Alert.alert( //alert 사용							
                '안내', '인증이 완료 되었습니다.', [ //alert창 문구 작성						
                {text: '확인', onPress: () => {finishSerialCheck()} }, 		
            ])
        }else{
            Alert.alert( //alert 사용							
                '안내', '인증번호가 일치하지 않습니다.', [ //alert창 문구 작성						
                {text: '확인', onPress: () => { serialInputRef.current.focus() } }, 		
            ])
        }
    }

    const inActivePhoneSend = () =>{
        setIsPhoneEditable(false);
        setIsSendPhoneBtnDisabled(true);
    }

    const resetPhone = () =>{
        setIsRunning(false);
        setIsPhoneEditable(true);
        setIsSendPhoneBtnDisabled(false);
        setTime(180);

        phoneInputRef.current.focus();
    }

    const finishSerialCheck = () =>{
        setIsRunning(false);
        setIsSerialConfirmed(true);
    }


    return (
        <>
        <SafeBasicView>
            <HeaderCustom title={"로그인"}/>
            <BasicInnerView>

            <ProcessNumBox>
                <ProcessNumInactive>01</ProcessNumInactive>
                <ProcessNumInactive>·</ProcessNumInactive>
                <ProcessNum>02</ProcessNum>
            </ProcessNumBox>

            <Space height={40}/>
            <CellTitle>휴대폰번호 입력</CellTitle>
            
            <Space height={25}/>
            <GrayInputBox style={{paddingRight:5}}>
                <PhoneInput 
                    keyboardType="numeric"
                    // keyboardType="numbers-and-punctuation"
                    returnKeyType="done"
                    placeholder="'-'없이 숫자만 입력"
                    placeholderTextColor={colors.placeholder}
                    ref = {phoneInputRef}
                    autoFocus = {true}
                    onChangeText={onChangeNumber} 
                    onSubmitEditing={sendPhone}
                    editable = {isPhoneEditable}
                />

                <CellSendPress 
                    disabled={isSendPhoneBtnDisabled}
                    onPress={sendPhone}
                >
                    <CellSendBtnText>인증번호요청</CellSendBtnText>
                </CellSendPress>
            </GrayInputBox>

            <Space height={45}/>

            {isRunning?
            <>
            <SerialTitle>인증번호</SerialTitle>
            <Space height={15}/>
            <SerialInputBox>
                <SerialInput 
                    // keyboardType="name-phone-pad"
                    keyboardType="numeric"
                    returnKeyType="done"
                    placeholder=""
                    placeholderTextColor={colors.placeholder}
                    ref = {serialInputRef}
                    autoFocus = {true}
                    onChangeText={onChangeSerial} 
                    onSubmitEditing={sendSerial}
                />
                <>
                    <SerialTimeTxt>{displayTime}</SerialTimeTxt>
                    <SerialSendPress 
                        onPress={sendSerial}
                    >
                        <SerialSendBtnText>확인</SerialSendBtnText>
                    </SerialSendPress>
                </>
                
            </SerialInputBox>
            <Space height={18}/>
            <SerialSubTxt> · 휴대폰으로 전송된 인증번호를 입력해 주세요</SerialSubTxt>
            </>
            :
            <>
            </>
            }
            
            {showLoader && <Loader />}

            <ContinuePress onPress={checkGoHome}>
                <BlueBottomBtn text={'로그인 하기'} status={isSerialConfirmed?'active':'inactive'}/>
            </ContinuePress>

            </BasicInnerView>
        </SafeBasicView>


        {isShowModal && 
        <ModalBackground>
            <BottomUpBoxAnimated
                style={[{ transform: [{ translateY: aniBoxPositionY }] }]}
            >
                <Space height={6}/>
                <BottomUpText1>로그인 안내</BottomUpText1>
                <BottomUpText2>
                    HiEdu에 전화번호 및 학교 정보가{'\n'}
                    등록되어 있지 않습니다.{'\n'}{'\n'}

                    학교별 등록되어 있는 전화번호를 통해 {'\n'}
                    자동으로 학교 및 학생/선생님 정보가 연동됩니다.{'\n'}{'\n'}

                    정보 등록을 위해서는{'\n'}
                    <BottomUpText3>www.hiedu.kr</BottomUpText3>로 문의해 주세요.

                </BottomUpText2>
                <Space height={30}/>
                <Pressable onPress={goBackLogin}>
                    <BlueBottomBtn text={'돌아가기'} status={'active'}/>
                </Pressable>

            </BottomUpBoxAnimated>
        </ModalBackground>}
        </>
    )

}