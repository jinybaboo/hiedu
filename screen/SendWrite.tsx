import react, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { BottomSelTxt1, BottomSelectAnimated, BottomSelectHeader, ClosePress, ModalBackground, PaddingView, SafeBasicView, Space } from "../common/commonStyled";
import colors from "../common/commonColors";
import { convertUTCToKoreanTime, delay, filterJsonArrKeyValue, getFileExtension, getWindowHeight, getWindowWidth, getYYYYMMDD_dash, removeDuplicateJsonArrData, removeJsonArrByKeyValue, resizeImage, sortJsonArrayWithKey } from "../common/commonFunc";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Entypo, Ionicons, AntDesign, EvilIcons, MaterialIcons } from '@expo/vector-icons'; 
import { HeaderCustomWrite } from "../components/HeaderCustomWrite";
import { Line } from "../common/commonStyled";
import { Shadow } from "react-native-shadow-2";
import { Alert, Animated, BackHandler, Keyboard, Platform, Pressable, ScrollView, TouchableOpacity, View, } from "react-native";
import { useSelector } from "react-redux";
import { getAppMemberPhone, getResendData, getSendMemberInfo, getSendPhoneNumber, getSimpleAddr, getSimpleAddrGroup, getSimpleAddrGroupSelect, insertBoardData, insertFilesToJavaServer, insertSendData } from "../common/commonData";
import { Loader } from "../components/Loader";
import { addSimpleAddr, checkAppMember, filterAddBookStudentNoAuthClassTeacher, getDirectPhoneSendAddrInfo, getFinalSelectedAddBookData_group, getFinalSelectedAddBookData_stu, getFinalSelectedAddBookData_tea, 
    getUpdatedDataArr_ClassSelect, getUpdatedDataArr_GradeSelect, getUpdatedDataArr_GroupSelect, getUpdatedDataArr_MobileSelect_group, getUpdatedDataArr_MobileSelect_stu, 
    getUpdatedDataArr_MobileSelect_tea, getUpdatedDataArr_MobileTypeSelect_group, getUpdatedDataArr_StudentSelect, getUpdatedDataArr_TeacherCate1Select, getUpdatedDataArr_ToggleClass, getUpdatedDataArr_ToggleGrade, 
    getUpdatedDataArr_ToggleGroup, getUpdatedDataArr_ToggleGroupLv2, getUpdatedDataArr_ToggleTeacherCate, getUpdatedStudentArr_ToggleLv4, isDirectPhoneAppMember, printSimpleAddrGroup, printSimpleAddrStudent, printSimpleAddrTeacher 
} from "../common/commonExportFunc";
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from '@react-native-community/datetimepicker';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import DocumentPicker, {DirectoryPickerResponse, DocumentPickerResponse, isCancel, isInProgress, types} from 'react-native-document-picker'
import { SendWriteBottom_SimpleSelect } from "../components/SendWriteBottom_SimpleSelect";
import { SendWriteBottom_AddrBookSelect } from "../components/SendWriteBottom_AddrBookSelect";
import { SendWriteBottom_SurveyStart } from "../components/SendWriteBottom_SurveyStart";
import { SendWriteBottom_SurveyWrite } from "../components/SendWriteBottom_SurveyWrite";
import { SendWriteBottom_FinalSend } from "../components/SendWriteBottom_FinalSend";

import { goBack, goBoardList, goSendList } from "../common/commonNaviFunc";
import { SendWriteBottom_SurveyType } from "../components/SendWriteBottom_SurveyType";
import { SendWriteBottom_SurveyDoubleAnswer } from "../components/SendWriteBottom_SurveyDoubleAnswer";
import { SendWriteBottom_SurveyDoubleCount } from "../components/SendWriteBottom_SurveyDoubleCount";



const windowHeight = getWindowHeight();
const windowWidth = getWindowWidth();
const os = Platform.OS;

const ReceiveView = styled.View`
    width:100%; height: 45px; flex-direction:row; align-items: center; justify-content: space-between; 
`
const ReceiveInner = styled.View`
    flex-direction:row; align-items: center; 
`
const ReceiveTxt = styled.Text`
    font-family: 'noto400'; font-size: 15px; line-height: 18px; color:${colors.textBlack}; letter-spacing: -0.5px; padding-left: 5px;
`
const ReceiveTxt2 = styled(ReceiveTxt)`
    font-family: 'noto400'; font-size: 13px; line-height: 18px; padding-left: 15px; color:${colors.textBlack}; 
`
const TitleInput = styled.TextInput`
    width:${windowWidth-40-45}px; height: 45px; font-size:16px; 
`
const ReceiveBtnView = styled.View`
   width:95px; height:90px; position: absolute; top:140px; right:30px; border-radius: 8px; background-color:#FFF;  
`
const FileBtnView = styled(ReceiveBtnView)`
   top:95px;  height:118px;
`
const ReceiveBtnPress = styled.TouchableOpacity`
   width:100%; height:45px; align-items: center; justify-content: center; 
`
const ReceiveBtnTxt = styled.Text`
    font-family: 'noto400'; font-size: 15px; line-height: 18px; color:${colors.textBlack}; letter-spacing: -0.5px; margin-top: 5px;
`

const ReceiveCountView = styled.View`
    width:100%; height: 40px; flex-direction:row; align-items: center; padding-left: 10px; position: relative; margin-top: -10px;
`
const ReceiveCountTxt1 = styled.Text`
    font-family: 'noto300'; font-size: 13px; line-height: 16px; color:${colors.textBlack}; 
`
const ReceiveCountTxt2 = styled(ReceiveCountTxt1)`
    font-family: 'noto500';  color:${colors.mainBlue};
`
const InputSidePress = styled.Pressable`
    position: absolute; padding: 10px 0; padding-left: 30px; right:10px; margin-top: -2px; 
`
const IconImg = styled.Image`
    width:15px; height:15px;margin-right:1px; 
`
const SeePress = styled.Pressable`
    height:40px; flex-direction: row; align-items: center; padding-right: 20px;
`

const FileAttachView = styled.View`
    width:100%; min-height: 45px; justify-content: center;
`
const AttachFileBox = styled.View`
     position: relative; flex-direction:row; align-items: center; padding:10px 0; margin-left: 15px;
`
const AttachAngleImg= styled.Image`
    width: 17px; height:17px; margin-top: -6px;
`
const FileNameTxt = styled.Text`
    font-family: 'noto300'; font-size: 13px; line-height: 16px; color:${colors.textBlack}; width: ${windowWidth-40-60}px;
`
const SurveyResultView = styled.View`
    width:100%;  
`
const SurveyResultBox = styled.View`
    width: 100%; background-color:#f5f5f6 ; border-radius: 5px; padding: 5px 0;
`
const SurveyResultTitleBox = styled.View`
      height:30px; flex-direction:row; align-items:center;
`
const SurveyResulTitle = styled.Text`
     font-family: 'noto400'; font-size: 13px; line-height: 16px; color:${colors.textBlack}; width: ${windowWidth-40-50}px; margin-top: 2px; padding-left: 10px;
`
const SurverAnsBox = styled.View`
     position: relative; flex-direction:row; align-items: center; padding:3px 10px;
`
const SurverAnsAngleImg= styled.Image`
    width: 17px; height:17px; margin-top: -6px;
`
const SurverAnsTxt = styled.Text`
    font-family: 'noto300'; font-size: 13px; line-height: 16px; color:${colors.textBlack}; width: ${windowWidth-40-60}px;
`

const ContentInput = styled.TextInput`
    width:100%; height:200px; font-size: 15px;
`

const SimplePickerView = styled.View`
`
const SendNumberPickerView = styled.View`
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


// 수신자 리스트 보기
const AddBookScroll = styled.ScrollView`
    width:100%; max-height: ${windowHeight-160}px; 
`
const Padding15 = styled.View`
    padding: 0 15px;
`
const ReceiveListBox = styled.View`
    height: 32px; border-bottom-width:1px; border-bottom-color: ${colors.lightGrayLine}; flex-direction: row; align-items: center;
`
const ReceiveListTxt1 = styled.Text`
    font-family: 'noto400'; font-size: 11px; line-height: 35px; color:#747474; letter-spacing: -0.2px; width:100px; text-align: center;
`
const ReceiveListTxt2 = styled.Text`
    font-family: 'noto500'; font-size: 12px; line-height: 35px; color:#747474; letter-spacing: -0.2px; padding-left: 8px; width: ${windowWidth-30-100 - 40}px;
`
const DelReceivePress = styled.Pressable`
    width: 40px; height:32px; justify-content: center; align-items: center; 
`


//직접입력 모달
const SurveyInputView = styled.View`
   width:100%; height:100%; position: absolute; flex:1; background-color:rgba(0,0,0,0.7);
`
const SurveyInputBox = styled.View`
     width:${windowWidth-40}px; height:85px; border-radius: 10px; background-color: #FFF; position:absolute; top:50px; left:20px; padding: 15px;
`
const SurveyInputBoxTxt = styled.Text`
    font-family: 'noto500'; font-size: 12px; line-height: 17px; color:${colors.placeholder}; letter-spacing: -0.2px; margin-top: 1.5px;
`
const SurveyInput = styled.TextInput`
     width:100%; height:35px; border-radius: 10px; background-color: #FFF; margin-top: 10px;
`
const SurveyInputClosePress = styled.Pressable`
    position: absolute;  right:5px; top:5px; padding:5px;
`



// 로더 
const LoaderView = styled.View`
    width: 100%; height:${windowHeight}px; justify-content: center; align-items: center; background-color: #FFFFFF;
`
const LoadImage = styled.Image`
    width:30px; height:30px;  margin-top: 80px;
`
//얘약 Date피커 박스
const DatePickerWrap = styled.View`
    background-color:rgba(0,0,0,0.2);
`


//얘약 타임피커 박스
const TimePickerWrap = styled.View`
    background-color:rgba(0,0,0,0.2);
`


export const SendWrite = () =>{
    const route = useRoute();				
    const { page, umslog_id:resend_id}:any = route.params; 	
    let pageKor="";
    if(page=='notice'){
        pageKor="알림장";
    }else if(page=='letter'){
        pageKor="가정통신문";
    }else if(page=='survey'){
        pageKor="설문조사";
    }else if(page=='board'){
        pageKor="공지사항";
    }

    const isUser = useSelector((state:any)=>state.user.isUser);
    const auth:any = useSelector((state:any)=>state.user.auth);
    let user_id = useSelector((state:any)=>state.user.user_id);
    const member_id = useSelector((state:any)=>state.user.member_id);

    const hasSendAuth = auth.includes('send_sms');
    const hasSelect_S = auth.includes('select_s');
    const hasSelect_T = auth.includes('select_t');
    const hasSelect_A = auth.includes('select_a');


    const navigation:any = useNavigation();

    const [isLoading, setIsLoading] = useState(true);
    const [reloadData, setReloadData] = useState(false);

    const [isModalOn, setIsModalOn] = useState(false);

    const [isShowReceiveBtns, setIsShowReceiveBtns] = useState(false);
    const [isShowFileBtns, setIsShowFileBtns] = useState(false);
    const [isShowSimpleSelectModal, setIsShowSimpleSelectModal] = useState(false);
    const [isShowSurveyStartModal, setIsShowSurveyStartModal] = useState(false);
    const [isShowSurveyWriteModal, setIsShowSurveyWriteModal] = useState(false);
    const [isShowSurveyWriteInput, setIsShowSurveyWriteInput] = useState(false);
    const [isShowFinalSendModal, setIsShowFinalSendModal] = useState(false);
    const [isShowReceiceListModal, setIsShowReceiceListModal] = useState(false);
    const [isShowSurveyTypeModal, setIsShowSurveyTypeModal] = useState(false);
    const [isShowSurveyDoubleAnswerModal, setIsShowSurveyDoubleAnswerModal] = useState(false);
    const [isShowSurveyDoubleCountModal, setIsShowSurveyDoubleCountModal] = useState(false);
    const [isShowReserveDatePicker, setIsShowReserveDatePicker] = useState(false);
    const [isShowReserveTimePicker, setIsShowReserveTimePicker] = useState(false);
    const [isShowDirectPhoneInput, setIsShowDirectPhoneInput] = useState(false);

    const [simpleStuAndPar, setSimpleStuAndParent] = useState([]);
    const [simpleTeacher, setSimpleTeacher] = useState([]);
    const [simpleGroup, setSimpleGroup] = useState([]);
    const [simpleGroupSelect, setSimpleGroupSelect] = useState([]);
    const [sendPhoneNumberList, setSendPhoneNumberList] = useState([]);

    const [isShowSimplePicker, setIsShowSimplePicker] = useState(false);
    const [simplePickerArr, setSimplePickerArr]= useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [selectedSimpleValueArr, setSelectedSimpleValueArr] = useState<any>([]);
    const [appMemberPhone, setAppMemberPhone] = useState<any>([]);

    const [isShowSendNumPicker, setIsShowSendNumPicker] = useState(false);


    const [sendMemberInfo, setSendMemberInfo] = useState({})

    const [isSpreadImgAttachView, setIsSpreadImgAttachView] = useState(true);
    const [isSpreadFileAttachView, setIsSpreadFileAttachView] = useState(true);
    const [isSpreadQrAttachView, setIsSpreadQrAttachView] = useState(true);

    // 재전송 데이터
    const [resendData, setResendData] = useState([]);

    // 작성내용
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');

    //주소록 부분
    const [isShowAddBook, setIsShowAddBook] = useState(false);
    const [addBookCate, setAddBookCate] = useState(1);
    const [selPhoneType, setSelPhoneType] = useState(0);
    const [selGroupPhoneType, setSelGroupPhoneType] = useState(0);
    const [gradeArr, setGradeArr] = useState([]);
    const [classArr, setClassArr] = useState([]);
    const [teacherCateArr, setTeacherCateArr] = useState([]);
    const [isBookLoading, setIsBookLoading ] = useState(false);

    //수신자 정보
    const [finalSendInfoArr, setFinalSendInfoArr] = useState<any>([]);
    const [simpleAddrFinal, setSimpleAddrFinal] = useState<any>([])
    const [addBookAddrFinal, setAddBookAddrFinal] = useState<any>([])
    const [directPhoneInputFinal, setDirectPhoneInputFinal] = useState<any>([])
    const [appCount, setAppCount] = useState(0);
    const [smsCount, setSmsCount] = useState(0);

    //이미지
    const [selectedImg, setSelectedImg] = useState([]);
    const [selectedImgCount, setSelectedImgCount] = useState(0);

    //QR
    const [qrImage, setQrImage] = useState<any>([]);
    const [qrUrl, setQrUrl] = useState('');

    //파일 
    const [selectedFile, setSelectedFile] = useState<any>([]);
    const [selectedFileCount, setSelectedFileCount] = useState(0);



    //설문조사 타입
    const [qType, setQtype] = useState('객관식');
    const [isDoubleAnswer, setIsDoubleAnswer] = useState('중복답변 불가');
    const [doubleAnsCount, setDoubleAnsCount] = useState(2);

    //설문조사 작성
    const [writeSurveyInputType, setWriteSurveyInputType] = useState<any>('');
    const [surveyInputTxt, setSurveyInputTxt] = useState('');
    const [directPhoneNumber, setDirectPhoneNumber] = useState('');
    const [surveyArr, setSurveyArr] = useState<any>([]);
    const [currentWriteSurveyObj, setCurrentWriteSurveyObj] = useState<any>({qType:'',isDoubleAnswer:'', question:'',answer:[]});
    const [currentWriteSurveyAnsArr, setCurrentWriteSurveyAnsArr] = useState<any>(['','']);
    const [isShowDatePicker, setIsShowDatePicker] = useState(false);
    const [dateKind, setDateKind] = useState('startDate');
    const [startDate, setStartDate] = useState<any>(new Date());
    const [endDate, setEndDate] = useState<any>(null);
    
    //최종 발송 조건
    const [duplication, setDuplication] = useState(true);
    const [isOpen, setIsOpen] = useState(true);
    const [sendPhoneNumber, setSendPhoneNumber] = useState('');
    const [sendBtnDisabled, setSendBtnDisabled] = useState(false);
    const [isReservation, setIsReservation] = useState(false);
    const [reserveDate, setReserveDate] = useState<any>(new Date());
    const [reserveTime, setReserveTime] = useState<any>(null);
    
    //키보드 avoid 커스텀 
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const scrollViewRef:any = useRef();

    //재발송 데이터 로드 여부
    const [isResendLoaded, setIsResendLoaded] = useState(false);


    const simplePickerRef:any = useRef();
    const sendPhoneNumberPickerRef:any = useRef();
    const contentInputRef:any = useRef(null);
    const surveyWriteInputRef:any = useRef(null);
    const subjectInputRef:any = useRef();
    const qrUrlInputRef:any = useRef();
    const directPhoneInputRef:any = useRef();


    const backAction = () => {
        if(isShowSurveyTypeModal){
            Alert.alert('','질문타입을 선택해 주세요.');
            return true;
        }
        
        if(isShowSurveyDoubleCountModal){
            Alert.alert('','중복답변 개수를 선택해 주세요.');
            return true;
        }

        if(isShowSurveyDoubleAnswerModal){
            Alert.alert('','중복답변 여부를 선택해 주세요.');
            return true;
        }
        
        if(isModalOn){
            closeAllModal();
        }else{
            Alert.alert( //alert 사용						
                '잠깐!', '작성중인 내용이 삭제 됩니다.\n정말로 취소 하시겠습니까?', [ 					
                    {text: '취소', onPress: () => {}}, 				
                    {text: '확인', onPress: () => { goBack(navigation);}}, 				
                ]					
            );						
        }
        return true; 
    };


    useEffect(()=>{
       
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
        return () => backHandler.remove(); 
    },[isModalOn]);


    function closeAllModal(){
        closeSimpleReveiceModal();
        closeAddBookModal();
        closeAddBookModal();
        closeSurveyStartModal();
        closeSurveyWriteModal();
        closeFinalSendModal();
        closeReceiveListModal();
    }


    const getData = async() =>{
        let data = await getSimpleAddr(user_id);
        
        const simpleAddrStudentAndParentArr = filterJsonArrKeyValue(data, "kind", "s"); 
	    let simpleAddrTeacherArr = filterJsonArrKeyValue(data, "kind", "t"); 
        simpleAddrTeacherArr = sortJsonArrayWithKey(simpleAddrTeacherArr, 'name');
        
        setSimpleStuAndParent(simpleAddrStudentAndParentArr);
        setSimpleTeacher(simpleAddrTeacherArr);
        data = await getSimpleAddrGroupSelect(user_id);
        
        data = hasSelect_A ? data : []; //그룹 조회 권한 설정
        setSimpleGroupSelect(data);
  
        data = await getSimpleAddrGroup(user_id);

        setSimpleGroup(data);

        let appMemberPhonedata = await getAppMemberPhone();
        setAppMemberPhone(appMemberPhonedata);
        
        data = await getSendPhoneNumber(user_id, member_id, isUser);

        setSendPhoneNumberList(data);
        data.forEach(({kind, phone, memo}:any)=>{
            if(kind=='default'){
                setSendPhoneNumber(phone);
            }
        })

        data = await getSendMemberInfo(isUser, member_id);
        setSendMemberInfo(data);

        //재발송일때 데이터 설정
        if(!isResendLoaded && resend_id!=='none'){
            setIsResendLoaded(true);
            data = await getResendData(resend_id);
                setResendData(data);
                setSubject(data.subject);
                setContent(data.message);
                setQrUrl(data.qrUrl);


                //연락처 추가하기
                if(data.appReceiveStr!=null){
                    const finalTotalDataForResend = JSON.parse(data.appReceiveStr);
                    const simpleReceiveResendArr = finalTotalDataForResend?.filter((item:any)=>item.addType == '간편추가');				
                    const addBookAddrResendArr = finalTotalDataForResend?.filter((item:any)=>item.addType != '간편추가');				
                    setSelectedSimpleValueArr(simpleReceiveResendArr);
                    setAddBookAddrFinal(addBookAddrResendArr);
                    prepareFinalTotalDataForResend(finalTotalDataForResend, appMemberPhonedata);
                }
              
            
        }
        

        setIsLoading(false);
    }
 
  

    useEffect(()=>{
        closeSimpleReveiceModal();  //모달 위치 초기화
        getData();
        readyStudentListData(); //주소록 학생,교직원 리스트 준비
    },[reloadData]);


    //애니메이션 세팅
    const aniBoxPositionY = useRef(new Animated.Value(0)).current;

    // 간편선택 모달 
    function closeSimpleReveiceModal(){
         Animated.timing(aniBoxPositionY, {
             toValue: 500,
             duration:400,
             useNativeDriver: true,
         }).start(()=>{
             setIsShowSimpleSelectModal(false);
             setIsModalOn(false);
         });
    }

    function closeSimpleReveiceModalFast(){
        Animated.timing(aniBoxPositionY, {
            toValue: 500,
            duration:0,
            useNativeDriver: true,
        }).start(()=>{
            setIsShowSimpleSelectModal(false);
            setIsModalOn(false);
        });
   }

    function openSimpleReceiveModal(){
         setIsShowSimpleSelectModal(true);
         setIsShowReceiveBtns(false);
         Animated.timing(aniBoxPositionY, {
             toValue: 0,
             duration:600,
             useNativeDriver: true,
         }).start(()=>{
             setIsModalOn(true);
         });
    }


    // 주소록 모달 
    function closeAddBookModal(){
        Animated.timing(aniBoxPositionY, {
            toValue: 1500,
            duration:400,
            useNativeDriver: true,
        }).start(()=>{
            setIsShowAddBook(false);
            setIsModalOn(false);
        });

        setReloadData(!reloadData);
        setAddBookCate(1);
        setSelPhoneType(0);
        setSelGroupPhoneType(0);
    }

    function openAddBookModal(){
        readyStudentListData();
        setIsShowAddBook(true);
        setIsShowReceiveBtns(false);
         Animated.timing(aniBoxPositionY, {
             toValue: 0,
             duration:600,
             useNativeDriver: true,
         }).start(()=>{
            setIsModalOn(true);
         });
    }


    //설문조사 모달
    function closeSurveyStartModal(){
        Animated.timing(aniBoxPositionY, {
            toValue: 1500,
            duration:300,
            useNativeDriver: true,
        }).start(()=>{
            setIsShowSurveyStartModal(false);
            setIsModalOn(false);
        });
    }
    function closeSurveyStartModalFast(){
        Animated.timing(aniBoxPositionY, {
            toValue: 1500,
            duration:0,
            useNativeDriver: true,
        }).start(()=>{
            setIsShowSurveyStartModal(false);
            setIsModalOn(false);
        });
    }

    function openSurveyStartModal(){
        setIsShowSurveyStartModal(true);
        Animated.timing(aniBoxPositionY, {
            toValue: 0,
            duration:600,
            useNativeDriver: true,
        }).start(()=>{
            setIsModalOn(true);
        });
    }
    function openSurveyStartModalFast(){
        setIsShowSurveyStartModal(true);
        Animated.timing(aniBoxPositionY, {
            toValue: 0,
            duration:0,
            useNativeDriver: true,
        }).start(()=>{
            setIsModalOn(true);
        });
    }

    // 객관 주관 설문 타입 2차 모달
    function closeSurveyTypeModal(){
        Animated.timing(aniBoxPositionY, {
            toValue: 1500,
            duration:400,
            useNativeDriver: true,
        }).start(()=>{
            setIsShowSurveyTypeModal(false);
            openSurveyStartModal();
            setIsModalOn(false);
        });
    }
    function closeSurveyTypeModalFast(){
        Animated.timing(aniBoxPositionY, {
            toValue: 1500,
            duration:0,
            useNativeDriver: true,
        }).start(()=>{
            setIsShowSurveyTypeModal(false);
            openSurveyStartModalFast();
            setIsModalOn(false);
        });
    }

    function openSurveyTypeModal(){
        setIsShowSurveyTypeModal(true);
        Animated.timing(aniBoxPositionY, {
            toValue: 0,
            duration:0,
            useNativeDriver: true,
        }).start(()=>{
            setIsModalOn(true);
        });
    }

    // 중복질문 설문 타입 2차 모달
    function closeSurveyDoubleAnswerModal(){
        Animated.timing(aniBoxPositionY, {
            toValue: 1500,
            duration:600,
            useNativeDriver: true,
        }).start(()=>{
            setIsShowSurveyDoubleAnswerModal(false);
            openSurveyStartModalFast();
            setIsModalOn(false);
        });
    }
    function closeSurveyDoubleAnswerModalFast(){
        Animated.timing(aniBoxPositionY, {
            toValue: 1500,
            duration:0,
            useNativeDriver: true,
        }).start(()=>{
            setIsShowSurveyDoubleAnswerModal(false);
            openSurveyStartModalFast();
            setIsModalOn(false);
        });
    }

    function openSurveyDoubleAnswerModal(){
        setIsShowSurveyDoubleAnswerModal(true);
        Animated.timing(aniBoxPositionY, {
            toValue: 0,
            duration:600,
            useNativeDriver: true,
        }).start(()=>{
            setIsModalOn(true);
        });
    }
    function openSurveyDoubleAnswerModalFast(){
        setIsShowSurveyDoubleAnswerModal(true);
        Animated.timing(aniBoxPositionY, {
            toValue: 0,
            duration:0,
            useNativeDriver: true,
        }).start(()=>{
            setIsModalOn(true);
        });
    }

     // 중복질문 설문 타입 2차 모달
     function closeSurveyDoubleCountrModal(){
        Animated.timing(aniBoxPositionY, {
            toValue: 1500,
            duration:400,
            useNativeDriver: true,
        }).start(()=>{
            setIsShowSurveyDoubleCountModal(false);
            openSurveyStartModal();
            setIsModalOn(false);
        });
    }
    function closeSurveyDoubleCountrModalFast(){
        Animated.timing(aniBoxPositionY, {
            toValue: 1500,
            duration:0,
            useNativeDriver: true,
        }).start(()=>{
            setIsShowSurveyDoubleCountModal(false);
            openSurveyStartModalFast();
            setIsModalOn(false);
        });
    }

    function openSurveyDoubleCountModal(){
        setIsShowSurveyDoubleCountModal(true);
        Animated.timing(aniBoxPositionY, {
            toValue: 0,
            duration:600,
            useNativeDriver: true,
        }).start(()=>{
            setIsModalOn(true);
        });
    }

    function openSurveyDoubleCountModalFast(){
        setIsShowSurveyDoubleCountModal(true);
        Animated.timing(aniBoxPositionY, {
            toValue: 0,
            duration:0,
            useNativeDriver: true,
        }).start(()=>{
            setIsModalOn(true);
        });
    }





    //설문 질문 추가 모달 
    function closeSurveyWriteModal(){
        Animated.timing(aniBoxPositionY, {
            toValue: 1500,
            duration:400,
            useNativeDriver: true,
        }).start(()=>{
            setIsShowSurveyWriteModal(false);
            setIsModalOn(false);
        });
    }
    function closeSurveyWriteModalFast(){
        Animated.timing(aniBoxPositionY, {
            toValue: 1500,
            duration:0,
            useNativeDriver: true,
        }).start(()=>{
            setIsShowSurveyWriteModal(false);
            setIsModalOn(false);
        });
    }
    function openSurveyWriteModal(){
        setIsShowSurveyWriteModal(true);
        Animated.timing(aniBoxPositionY, {
            toValue: 0,
            duration:600,
            useNativeDriver: true,
        }).start(()=>{
            setIsModalOn(true);
        });
    }
    function openSurveyWriteModalFast(){
        setIsShowSurveyWriteModal(true);
        Animated.timing(aniBoxPositionY, {
            toValue: 0,
            duration:0,
            useNativeDriver: true,
        }).start(()=>{
            setIsModalOn(true);
        });
    }


    //최종발송 추가 모달 
    function closeFinalSendModal(){
        Animated.timing(aniBoxPositionY, {
            toValue: 1500,
            duration:400,
            useNativeDriver: true,
        }).start(()=>{
            setIsShowFinalSendModal(false);
            setIsModalOn(false);
        });
    }
    function closeFinalSendModalFast(){
        Animated.timing(aniBoxPositionY, {
            toValue: 1500,
            duration:0,
            useNativeDriver: true,
        }).start(()=>{
            setIsShowFinalSendModal(false);
            setIsModalOn(false);
        });
    }

    function openFinalSendModal(){
        setIsShowFinalSendModal(true);
        Animated.timing(aniBoxPositionY, {
            toValue: 0,
            duration:600,
            useNativeDriver: true,
        }).start(()=>{
            setIsModalOn(true);
        });
    }

    //받는사람 리스트 열기 모달
    function closeReceiveListModal(){
        Animated.timing(aniBoxPositionY, {
            toValue: 1500,
            duration:400,
            useNativeDriver: true,
        }).start(()=>{
            setIsShowReceiceListModal(false);
            setIsModalOn(false);
        });
    }

    function openReceiveListModal(){
        setIsShowReceiceListModal(true);
        Animated.timing(aniBoxPositionY, {
            toValue: 0,
            duration:600,
            useNativeDriver: true,
        }).start(()=>{
            setIsBookLoading(false);
            setIsModalOn(true);
        });
    }

    // 2차 모달 : 객관식 주관식 선택 모달 열기
    function setSurveyQtype(type:string){
        closeSurveyStartModalFast(); //모달 닫고

        setTimeout(()=>{
            openSurveyTypeModal();
        },10);
    }

    // 2차 모달 : 중복질문 여부 선택 모달 열기
    function setSurveyIsDoubleAnswer(type:string){
        // setIsDoubleAnswer(type);
        closeSurveyStartModalFast(); //모달 닫고

        setTimeout(()=>{
            openSurveyDoubleAnswerModalFast();
        },10);
    }

    // 2차 모달 : 중복질문 갯수 선택 모달 열기
    function openDoubleAnsCountSelect(type:string){
        closeSurveyStartModalFast(); //모달 닫고

        setTimeout(()=>{
            openSurveyDoubleCountModalFast();
        },200);
    }



    function setQtypeData(type:string){
        setQtype(type);
        closeSurveyTypeModalFast();
    }

    function setIsDoubleAnswerData(type:string){
        setIsDoubleAnswer(type);
        closeSurveyDoubleAnswerModalFast();
    }

    function setDoubleCountData(count:number){
        setDoubleAnsCount(count);
        closeSurveyDoubleCountrModalFast();
    }



    // 2차 셀렉트 (간편 주소록 피커)
    function setSimplePickerData(type:string){
        closeSimpleReveiceModalFast(); //모달 닫고
        let pickerArr;
        if(type=='student' || type=='parent1' || type=='parent2'){
            pickerArr = printSimpleAddrStudent(simpleStuAndPar, type, hasSelect_S, sendMemberInfo);
        }
        if(type=='teacher'){
            pickerArr = printSimpleAddrTeacher(simpleTeacher, hasSelect_T);
        } 
        if(type=='group'){
            // pickerArr = printSimpleAddrGroup(simpleGroupSelect, hasSelect_A);
            pickerArr = printSimpleAddrGroup(simpleGroup, hasSelect_A);
        }

        setSimplePickerArr(pickerArr);
        setIsShowSimplePicker(true);
        simplePickerRef?.current?.focus();
        os=='android' && setIsShowSimplePicker(false); //안드로이드에서는 바로 닫아주기
    }


    // 2차 셀렉트 (설문 타입 피커)
    function openSendPhoneNumberPicker(type:string){
        closeFinalSendModalFast(); //모달 닫고

        setIsShowSendNumPicker(true);
        sendPhoneNumberPickerRef?.current?.focus();
        os=='android' && setIsShowSendNumPicker(false); //안드로이드에서는 바로 닫아주기
    }




    function selectSimpleData(value:string){
        if(value=='none' || value==''){
            setIsShowSimplePicker(false);
            return
        }
        
        const valueObj = JSON.parse(value);
        const tempArr = [valueObj]
        
        setIsShowSimplePicker(false);

        const simpleAddrTemp =  addSimpleAddr(tempArr, simpleStuAndPar, simpleTeacher, simpleGroup);

        
        const simpleAddrFinalTemp = [...simpleAddrFinal, ...simpleAddrTemp];
        setSimpleAddrFinal(simpleAddrFinalTemp);

        const totalTempArr = [...addBookAddrFinal, ...simpleAddrFinalTemp, ...directPhoneInputFinal];
        prepareFinalTotalData(totalTempArr);
    }

    function selectAddBookData(){
        let addBookAddrTemp:any = [];
        
        if(addBookCate==1){
            addBookAddrTemp = getFinalSelectedAddBookData_stu(simpleStuAndPar, hasSelect_S, sendMemberInfo);
        }else if(addBookCate==2){
            addBookAddrTemp = getFinalSelectedAddBookData_tea(simpleTeacher);
        }else if(addBookCate==3){
            addBookAddrTemp = getFinalSelectedAddBookData_group(simpleGroup);
        }
        
        if(addBookAddrTemp.length==0){
            Alert.alert('','선택된 주소록이 없습니다.');
            return;
        }

        const tempArr = [...addBookAddrFinal, ...addBookAddrTemp];

        setAddBookAddrFinal(tempArr);
        const totalTempArr = [...tempArr, ...simpleAddrFinal, ...directPhoneInputFinal];



        prepareFinalTotalData(totalTempArr);
        closeAddBookModal();
    }


    function prepareFinalTotalData(totalSendInfo:any){
        const appCount = checkAppMember(totalSendInfo, appMemberPhone);
        setAppCount(appCount);
        setSmsCount(totalSendInfo.length-appCount);
        setFinalSendInfoArr(totalSendInfo);
    }
    function prepareFinalTotalDataForResend(totalSendInfo:any, appMemberPhoneResend:any){
        const appCount = checkAppMember(totalSendInfo, appMemberPhoneResend);
        setAppCount(appCount);
        setSmsCount(totalSendInfo.length-appCount);
        setFinalSendInfoArr(totalSendInfo);
    }



    function seeFinalReceiveList(){
        setIsBookLoading(true);
        setTimeout(()=>{
            openReceiveListModal();
        },10)
    }

    function removeReveiceIdx(idx:number, txt:string){
        Alert.alert( //alert 사용							
            '안내', `${txt}\n삭제 하시겠습니까?`, [ //alert창 문구 작성						
                {text: '취소', onPress: () => {}}, //alert 버튼 작성					
                {text: '확인', onPress: () => {
                    const tempArr = [...finalSendInfoArr];
                    tempArr.splice(idx, 1);
                    
                    const tempSimpleArr = tempArr.filter((item:any)=>{
                        return item.addType == '간편추가';
                    });

                    const tempAddBookArr = tempArr.filter((item:any)=>{
                        return item.addType.includes('주소록');
                    });

                    const tempDirectArr = tempArr.filter((item:any)=>{
                        return item.addType == '직접입력';
                    });


                    setSimpleAddrFinal(tempSimpleArr);
                    setAddBookAddrFinal(tempAddBookArr);
                    setDirectPhoneInputFinal(tempDirectArr);
                    
                    prepareFinalTotalData(tempArr);

                    // setSimpleAddrFinal(tempSimpleArr);
                    // setAddBookAddrFinal(addBookAddrFinal);
                    // const totalTempArr = [...tempAddBookArr, ...tempSimpleArr];
                    // prepareFinalTotalData(totalTempArr);

                    // const appCount = checkAppMember(tempArr, appMemberPhone);
                    // setAppCount(appCount);
                    // setSmsCount(tempArr.length-appCount);
                }}, 			
            ]						
        );							
    }



    function delReceiveData(){
        setSelectedSimpleValueArr([]);
        setSimpleAddrFinal([]);
        setAddBookAddrFinal([]);
        setDirectPhoneInputFinal([]);
        setAppCount(0);
        setSmsCount(0);
    }

    function readyStudentListData(){ 
        //학생 부분
        let gradeArr = removeDuplicateJsonArrData(simpleStuAndPar, "category1");
        let classArr = removeDuplicateJsonArrData(simpleStuAndPar, "grade_class");

        
        //권한 설정
        gradeArr = filterAddBookStudentNoAuthClassTeacher(gradeArr, hasSelect_S, sendMemberInfo, 'grade');
        classArr = filterAddBookStudentNoAuthClassTeacher(classArr, hasSelect_S, sendMemberInfo, 'class');

        setGradeArr(gradeArr);
        setClassArr(classArr);

        //교직원 부분
        let teacherCateArr = removeDuplicateJsonArrData(simpleTeacher, "category1");
        teacherCateArr = sortJsonArrayWithKey(teacherCateArr, 'category1');
        teacherCateArr = hasSelect_T?teacherCateArr:[]; //권한 설정
        setTeacherCateArr(teacherCateArr);

    }

    // 주소록 펼치기 (학생부분)
    async function toggleGrade(category1:string){
        setIsBookLoading(true); 
        await delay(10);
        const {updatedGradeArr, updatedClassArr} = getUpdatedDataArr_ToggleGrade(gradeArr, classArr, category1);
        setGradeArr(updatedGradeArr);
        setClassArr(updatedClassArr);
        setIsBookLoading(false);
    }

    async function toggleClass(category1:string, category2:string){
        setIsBookLoading(true); 
        await delay(10);
        const {updatedClassArr, updatedDataArr} = getUpdatedDataArr_ToggleClass(classArr, simpleStuAndPar, category1, category2);
        setClassArr(updatedClassArr);
        setSimpleStuAndParent(updatedDataArr);
        setIsBookLoading(false);
    }

    async function toggleLv4(category1:string, category2:string, category3:string){
        setIsBookLoading(true); 
        await delay(10);
        const updatedDataArr = getUpdatedStudentArr_ToggleLv4(simpleStuAndPar, category1, category2, category3);
        setSimpleStuAndParent(updatedDataArr); 
        setIsBookLoading(false);  
    }

    //주소록 펼치기 (교직원)
    async function toggleTeacherCate(category1:string){
        setIsBookLoading(true); 
        await delay(10);
        const {updatedTeacherCateArr, updatedDataArr} = getUpdatedDataArr_ToggleTeacherCate(teacherCateArr, simpleTeacher, category1);
        setTeacherCateArr(updatedTeacherCateArr);
        setSimpleTeacher(updatedDataArr);
        setIsBookLoading(false);
    }

    //주소록 펼치기 (그룹)
    async function toggleGroup(id:string){
        setIsBookLoading(true); 
        await delay(10);
        let {updatedSimpleGroupSelect, updatedDataArr} = getUpdatedDataArr_ToggleGroup(simpleGroupSelect, simpleGroup, id);
        setSimpleGroupSelect(updatedSimpleGroupSelect);
        setSimpleGroup(updatedDataArr);
        setIsBookLoading(false);
    }
    async function toggleGroupLv2(address_id:string){
        setIsBookLoading(true); 
        await delay(10);
        let {updatedDataArr} = getUpdatedDataArr_ToggleGroupLv2(simpleGroupSelect, simpleGroup, address_id);
        setSimpleGroup(updatedDataArr);
        setIsBookLoading(false);
    }


    //주소록 셀렉트 (학생부분)
    function toggleGradeSelect(category1:string){
        const {updatedGradeArr, updatedClassArr, updatedDataArr} = getUpdatedDataArr_GradeSelect(gradeArr, classArr, simpleStuAndPar, category1, selPhoneType);
        setGradeArr(updatedGradeArr);
        setClassArr(updatedClassArr); 
        setSimpleStuAndParent(updatedDataArr); 
    }

    function toggleClassSelect(category1:string, category2:string){
        const {updatedClassArr, updatedDataArr} = getUpdatedDataArr_ClassSelect(classArr, simpleStuAndPar, category1, category2, selPhoneType)
        setClassArr(updatedClassArr); 
        setSimpleStuAndParent(updatedDataArr); 
    }

    function toggleStudentSelect(category1:string, category2:string, category3:string){
        const updatedDataArr = getUpdatedDataArr_StudentSelect(simpleStuAndPar, category1, category2, category3, selPhoneType);
        setSimpleStuAndParent(updatedDataArr); 
    }

    function toggleMobileSelect_stu(category1:string, category2:string, category3:string, mobileType:string){
        const updatedDataArr = getUpdatedDataArr_MobileSelect_stu(simpleStuAndPar, category1, category2, category3, mobileType);
        setSimpleStuAndParent(updatedDataArr); 
    }


    //주소록 셀렉트 (교직원)
    function toggleTeacherCateSelect(category1:string){
        const {updatedTeacherCateArr, updatedDataArr} = getUpdatedDataArr_TeacherCate1Select(teacherCateArr, simpleTeacher, category1);
        
        setTeacherCateArr(updatedTeacherCateArr);
        setSimpleTeacher(updatedDataArr); 
    }

    function toggleMobileSelect_tea(id:string){
        const updatedDataArr = getUpdatedDataArr_MobileSelect_tea(simpleTeacher, id);
        setSimpleTeacher(updatedDataArr); 
    }

    //주소록 셀렉트 (그룹)
    function toggleGroupSelect(id:string){
        let {updatedSimpleGroupSelect, updatedDataArr} = getUpdatedDataArr_GroupSelect(simpleGroupSelect, simpleGroup, id, selGroupPhoneType);
        setSimpleGroupSelect(updatedSimpleGroupSelect);
        setSimpleGroup(updatedDataArr); 
    }

    function toggleMobileSelect_group(address_id:string, phone_field:string){
        const updatedDataArr = getUpdatedDataArr_MobileSelect_group(simpleGroup, address_id, phone_field, selGroupPhoneType);
        setSimpleGroup(updatedDataArr); 
    }

    function toggleMobileTypeSelect_group (address_id:string, phone_field:string, selectType:number){
        const updatedDataArr = getUpdatedDataArr_MobileTypeSelect_group(simpleGroup, address_id, phone_field, selectType);
        setSimpleGroup(updatedDataArr); 
    }


    function changeMobileType(typeNum:any){
        setSelPhoneType(typeNum);

        const updatedDataArr:any = simpleStuAndPar.map((item:any) => {
            let level3Selected = item.isSelected;
            if(typeNum==1 && level3Selected == 'y'){
                return {
                    ...item,
                    mobile1Selected: 'y',
                    mobile2Selected: 'n',
                    mobile3Selected: 'n',
                };
            }else if(typeNum==2 && level3Selected == 'y'){
                return {
                    ...item,
                    mobile1Selected: 'n',
                    mobile2Selected: 'y',
                    mobile3Selected: 'n',
                };
            }else if(typeNum==3 && level3Selected == 'y'){
                return {
                    ...item,
                    mobile1Selected: 'n',
                    mobile2Selected: 'n',
                    mobile3Selected: 'y',
                };
            }
                 
            return item;
        });
        setSimpleStuAndParent(updatedDataArr);   
    }

    function changeMobileTypeGroup(typeNum:any){
        setSelGroupPhoneType(typeNum)

        const updatedDataArr:any = simpleGroup.map((item:any) => {
            let level2Selected = item.isSelected;
            if(typeNum==1 && level2Selected == 'y'){
                return {
                    ...item,
                    mobile1Selected: 'y',
                    mobile2Selected: 'n',
                    mobile3Selected: 'n',
                };
            }else if(typeNum==2 && level2Selected == 'y'){
                return {
                    ...item,
                    mobile1Selected: 'n',
                    mobile2Selected: 'y',
                    mobile3Selected: 'n',
                };
            }else if(typeNum==3 && level2Selected == 'y'){
                return {
                    ...item,
                    mobile1Selected: 'n',
                    mobile2Selected: 'n',
                    mobile3Selected: 'y',
                };
            }
                 
            return item;
        });
        setSimpleGroup(updatedDataArr);   
        
    }
  
    function onChangeContent(text:string){
        setContent(text);
    }
    function onChangeSubject(text:string){
        if(text.length>19){
            Alert.alert("제목은 20자 까지만 작성 가능합니다.");
        }
        setSubject(text);
    }
    function onChangeQrUrl(text:string){
        setQrUrl(text);
    }
    

    //권한요청
    const requestPermission = async () => {
        const PERMISSION_TYPE = os === 'android' ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES : PERMISSIONS.IOS.PHOTO_LIBRARY;

        try {
            const result = await request(PERMISSION_TYPE);
        
        if (result === RESULTS.GRANTED) {
            selectImage();
        } else {
            const alertTxt = os==='ios'?`사집첩 접근 권한이 없습니다${'\n'}설정 - 하이에듀앱 - 사진 접근 허용을 '모든 사진 접근허용'으로 설정해 주세요`:`사집첩 접근 권한이 없습니다${'\n'}설정 - 애플리케이션 - 하이에듀앱 - 권한 - 사진 및 동영상 접근 권한을 허용해 주세요`
                Alert.alert( //alert 사용							
                '이런!', alertTxt, [ //alert창 문구 작성						
                    {text: '확인', onPress: () => {} }, //alert 버튼 작성					
                ]						
            );							
        }
        } catch (error) {
            
        }
    };


    // 갤러리 또는 카메라 접근하기
    async function selectImage(){
        setIsShowFileBtns(false);

        const maxImageCount = pageKor=='공지사항'?1:5;

        if(selectedImgCount>=maxImageCount){
            Alert.alert('안내', `이미지는 최대 ${maxImageCount}개까지 선택 가능합니다.`);		
            return;
        }
    
        const options:any ={
            mediaType: 'photo', //필수값
            selectionLimit:maxImageCount-selectedImgCount //사진갯수 제한
        }
        const result:any = await launchImageLibrary(options);
        if (result.didCancel){
            return null;
        } 


        const {assets} = result;
        let finalSelectedImgArr:any = [...selectedImg, ...assets];
        
        setSelectedImg(finalSelectedImgArr);
        setSelectedImgCount(finalSelectedImgArr.length)
    }

    // 갤러리 또는 카메라 접근하기
    async function selectQrImage(){
        setIsShowFileBtns(false);

        const options:any ={
            mediaType: 'photo', //필수값
            selectionLimit:1
        }
        const result:any = await launchImageLibrary(options);
        if (result.didCancel){
            return null;
        } 
        const {assets} = result;
        setQrImage(assets);
        
    }


    //파일 접근하기
    async function selectFiles(){
        setIsShowFileBtns(false);

        const maxFileCount = pageKor=='공지사항'?1:5;

        if(selectedFileCount>=maxFileCount){
            Alert.alert('안내', `파일은 최대 ${maxFileCount}개까지 선택 가능합니다.`);		
            return;
        }

        try {
            const pickerResult = await DocumentPicker.pickSingle({
              presentationStyle: 'fullScreen',
              copyTo: 'cachesDirectory',
            })
            
            const result = [pickerResult];

            let finalSelectedFileArr:any = [...selectedFile, ...result];

            setSelectedFile(finalSelectedFileArr);
            setSelectedFileCount(finalSelectedFileArr.length);
            
            
            // selectedFile([pickerResult])
        } catch (err) {
            if (isCancel(err)) {
                
                // User cancelled the picker, exit any dialogs or menus and move on
            } else if (isInProgress(err)) {
                
            } else {
                throw err
            }
        }
    }

    function removeImage(fileName:string){
        const tempArr = removeJsonArrByKeyValue(selectedImg, 'fileName', fileName);
        setSelectedImg(tempArr);
        setSelectedImgCount(tempArr.length);
    }

    function removeFile(name:string){
        const tempArr = removeJsonArrByKeyValue(selectedFile, 'name', name);
        setSelectedFile(tempArr);
        setSelectedFileCount(tempArr.length);
    }
    function removeQrImage(){
        setQrImage([]);
    }

    function writeSurveyInput(type:any, currentStr:string){
        setWriteSurveyInputType(type)
        setSurveyInputTxt(currentStr);
        setIsShowSurveyWriteInput(true);
        setTimeout(()=>{
            surveyWriteInputRef.current.focus();
        },100);
    }

    function showDirectPhoneInputModal(){
        setIsShowDirectPhoneInput(true);
        setIsShowReceiveBtns(false);

        setTimeout(()=>{
            directPhoneInputRef.current.focus();
        },100);
        
    }

    function onChangeSurveyWrite(text:string){
        setSurveyInputTxt(text);
    }
    function onChangeDirectPhoneInput(text:string){
        setDirectPhoneNumber(text);
    }


    function onSubmitSurveyWrite(){
        setIsShowSurveyWriteInput(false);

        if(writeSurveyInputType=='question'){
            currentWriteSurveyObj.question = surveyInputTxt;
        }else{
            currentWriteSurveyAnsArr[writeSurveyInputType] = surveyInputTxt;
        }
    }

    function onSubmitDirectPhoneInput(){
        // setIsShowDirectPhoneInput(false);
        // setDirectPhoneNumber('');
        // const isAppMember = isDirectPhoneAppMember(directPhoneNumber, appMemberPhone);
        // console.log(isAppMember);

        const tempArr = getDirectPhoneSendAddrInfo(directPhoneNumber, simpleStuAndPar, simpleTeacher, simpleGroup);
       
        const directPhoneInputFinalTemp = [...directPhoneInputFinal, ...tempArr];
        setDirectPhoneInputFinal(directPhoneInputFinalTemp);
        const totalTempArr = [...directPhoneInputFinalTemp, ...simpleAddrFinal, ...addBookAddrFinal];

        prepareFinalTotalData(totalTempArr);
    
        closeDirectInputModal();
    }

    

   

    function removeSurveyResult(idx:number){
        const newAnswerArr = [...surveyArr];
        newAnswerArr.splice(idx, 1);
        setSurveyArr(newAnswerArr);
    }

    function finishWriteSurveyQtn(){
        //유효성 검증
        const question = currentWriteSurveyObj.question;
        if(question.length == 0){
            Alert.alert('안내','질문을 입력해 주세요.');
            return;
        }

        if(qType==='객관식'){
            for(let i=0; i<currentWriteSurveyAnsArr.length; i++){
                const item = currentWriteSurveyAnsArr[i];
                if(item.length==0){
                    Alert.alert('안내',`답변${i+1}을(를) 입력해 주세요.`);
                    return;
                }
            }
        }
       

        //최종 데이터 세팅
        const qTypeVal = qType==='객관식'?'choice':'write';
        const isDoubleAnswerVal = isDoubleAnswer==='중복답변 불가'?'0':'1';
        currentWriteSurveyObj.qType = qTypeVal;
        currentWriteSurveyObj.isDoubleAnswer = isDoubleAnswerVal;
        currentWriteSurveyObj.doubleAnsCount = doubleAnsCount;
        currentWriteSurveyObj.answer = currentWriteSurveyAnsArr;

        let newSurveyArr = [...surveyArr];
        newSurveyArr.push(currentWriteSurveyObj)

        setSurveyArr(newSurveyArr);

        //조건 초기화
        setQtype('객관식');
        setIsDoubleAnswer('중복답변 불가');
        setDoubleAnsCount(2);
        setCurrentWriteSurveyObj({qType:'',isDoubleAnswer:'', doubleAnsCount:2, question:'',answer:[]});
        setCurrentWriteSurveyAnsArr(['','']);

        //닫기 
        closeSurveyWriteModalFast();
    }

    const onChangeSurveyDate = (event:any, selectedDate:any) => {
        if(dateKind==='startDate'){
            setStartDate(selectedDate);
        }else{
            setEndDate(selectedDate);
        }
        setIsShowDatePicker(false);
    };
    


    const onChangeReserveDate = (event:any, date:any)=>{
        setReserveDate(date);
        setIsShowReserveDatePicker(false);
    }

    const onChangeReserveTime = (event:any, date:any)=>{
        const currentDate = date || reserveTime

        setReserveTime(currentDate);

        if(os=='android'){
            setIsShowReserveTimePicker(false);
        }
    }


    //KeyboardAvoidView 오작동 커스컴
    const KeyboardAvoidCustomView = styled.View`
        width:100%; 
    `

    useEffect(()=>{ // 키보드 활성화 될때 조절		
        setTimeout(()=>{
            Keyboard.addListener('keyboardDidShow', (event:any) => {	
                setKeyboardHeight(event.endCoordinates.height);
            });				
            Keyboard.addListener('keyboardDidHide', (event:any) => {				
                setKeyboardHeight(0);		
            });			

        },1000)		
       	
    },[])		
    
    

    function onTextInputFocus(inputKind:string){
        //IOS에서만 작동해 준다
        if(os=='ios' && inputKind=='본문'){
            setTimeout(()=>{
                scrollViewRef?.current?.scrollToEnd({ animated: true });
            },1000)	
        }
    }
    

    function checkAlarmSendContent(){   
        if(subject.length==0){
            Alert.alert('안내', `제목을 입력해 주세요.`, [{text: '확인', onPress: () => {
                setTimeout(()=>{
                    subjectInputRef.current.focus();
                },300)
            } }]);  
            return;
        }

        if(content.length==0){
            Alert.alert('안내', `본문을 작성해 주세요.`);  
            return;
        }

        if(content.length<=10){
            Alert.alert('안내', `본문 내용은 10자 이상으로 입력해 주세요.`);  
            return;
		}

        const hasHttp = qrUrl.includes("http://");
		const hasHttps = qrUrl.includes("https://");

        if(pageKor!= '설문조사' && (qrUrl.length > 0 && !hasHttp) && (qrUrl.length > 0 && !hasHttps) ){
            Alert.alert('안내', `QR URL은 'http://' 또는 'https://' 와 함께 입력하셔야 합니다.`);  
            return;
		}

        if(pageKor!='공지사항' && (appCount+smsCount==0)){
            Alert.alert('안내', `받는사람이 없습니다.`);  
            return;
        }
        if(pageKor=='설문조사' && appCount==0){
            Alert.alert('안내', `받는사람이 없습니다.\n설문조사는 App 사용자만 수신 가능합니다.`);  
            return;
        }

        if(pageKor=='설문조사' && surveyArr.length==0){
            Alert.alert('안내', `설문조사 질문을 추가해 주세요.`);  
            return;
        }
       

        Keyboard.dismiss();

        if(pageKor=='공지사항'){
            checkFinalSendData();
        }else{
            openFinalSendModal();
        }
    }

    function closeDirectInputModal(){
        setIsShowDirectPhoneInput(false); 
        setDirectPhoneNumber('');
        Keyboard.dismiss();
    }



    async function checkFinalSendData(){
        const reserveDateStr = reserveDate!=null && getYYYYMMDD_dash(reserveDate);
        const reserveTimeStr = reserveTime!=null && convertUTCToKoreanTime(reserveTime);
        const send_date = isReservation?`${reserveDateStr} ${reserveTimeStr}:00`:'';
        const scheduling = isReservation?'1':'0';

        if(pageKor=='설문조사' && endDate==null){
            Alert.alert('안내', `설문 종료일자를 입력해 주세요.`);  
            return;
        }
       
        if(pageKor!='공지사항' && sendPhoneNumber.length==0){
            Alert.alert('안내', `발신번호가 없습니다.\n발신 번호를 선택해 주세요.`);  
            return;
        }

        let surveyStartTime='';
        let surveyEndTime='';
        if(pageKor=='설문조사'){
            surveyStartTime = getYYYYMMDD_dash(startDate)+ ' 00:00:00';
            surveyEndTime = getYYYYMMDD_dash(endDate)+ ' 23:59:59';
        }
        let sDate = new Date(surveyStartTime);
        let eDate = new Date(surveyEndTime);
        const today = new Date();

        if(eDate<today){
            Alert.alert('안내', `설문 종료일자는 현재보다 커야합니다.`);  
            return;
        }

        if(eDate<=sDate){
            Alert.alert('안내', `설문 종료일자는 설문시작일과 같거나 커야합니다.`);  
            return;
        }


        //예약발송시 
        if(isReservation){
            if(reserveDate === null || reserveTime === null){
                Alert.alert('안내', `예약 일시를 입력해 주세요.`);  
                return;
            }
            const now = new Date();
            const send_date_new = new Date(send_date);
            if(send_date_new<now){
                Alert.alert('안내', `예약일시는 현재일시보다 커야합니다.`);  
                return;
            }
        }   

        //발송버튼 비활성화
        // setSendBtnDisabled(true);

        const appSendArr = finalSendInfoArr.filter((item:any) =>{		
			if( item.isApp){return item}			
		});		
		let smsSendArr = finalSendInfoArr.filter((item:any) =>{				
			if( !item.isApp){return item}			
		});
		if(duplication){ //sms의 경우에만 중목 제거함!
			smsSendArr = removeDuplicateJsonArrData(smsSendArr, 'mobile')
		}
		
        //설문은 SMS 안보냄
		let finalSendInfoArrFiltered = pageKor=='설문조사'? [...appSendArr]:[...appSendArr, ...smsSendArr];

        const portal_id = isUser==1?user_id:member_id;
        
        const formData = new FormData();
        const sendData:any = {};


        let saveImageNames ="";
        let newImageNames ="";

        let saveFileNames ="";
        let newFileNames ="";

        let saveQrName = "";
        let originalQrName ="";


        //파일 처리
        for(let i=0; i<selectedImg.length; i++){
            const {fileName, uri}:any = selectedImg[i];
            const fileExtention = getFileExtension(fileName);

            const resizeUri:any = await resizeImage(uri);

            const newName = Date.now() + '_'+fileExtention;
            saveImageNames += i==0?fileName:"^^"+fileName;
			newImageNames += i==0?newName:"^^"+newName;

            formData.append('images', {
                uri:resizeUri.uri,
                type: 'image/jpeg', 
                name: newName,
            });
        }

        for(let i=0; i<qrImage.length; i++){
            const {fileName, uri}:any = qrImage[i];
            const fileExtention = getFileExtension(fileName);

            const resizeUri:any = await resizeImage(uri);
            saveQrName = Date.now() + '_'+fileExtention;
            originalQrName = fileName;
            formData.append('qrImage', {
                uri:resizeUri.uri,
                type: 'image/jpeg', 
                name: saveQrName,
            });
        }
        
        selectedFile.forEach(({name, uri}:any, idx:number)=>{
            const fileExtention = getFileExtension(name);
            
            const newName = Date.now() + '_'+fileExtention;
            saveFileNames += idx==0?name:"^^"+name;
			newFileNames += idx==0?newName:"^^"+newName;

            formData.append('files', {
                uri,
                type: 'image/jpeg', 
                name: newName,
            });
        });

        formData.append('sendFromApp', 'sendFromApp'); // 사용하는 데이터 아님, 자바쪽 오류 방지!



        // 설문 정보
        if(pageKor=='설문조사'){
            if(appSendArr.length==0){
                Alert.alert("안내","설문 수신자가 없습니다.\n설문조사는 앱 가입 회원에게만 발송 가능합니다.");
                return;
            }


            let surveyInfoArr:any = [];
			surveyArr.forEach(({answer, isDoubleAnswer, doubleAnsCount, qType, question}:any, idx:number)=>{

				let answerArr ="";
				answer.forEach((item:any,idx:number)=>{
					answerArr+=idx==0?item:"^^^^^"+item;
				});

				let tempObj = {surveyType:qType, doubleAnsType:isDoubleAnswer, doubleAnsCount, ansCount:answer.length, question, answerArr};
				surveyInfoArr.push(tempObj);
			})
            
            sendData.surveyStartTime = surveyStartTime;
            sendData.surveyEndTime = surveyEndTime;
            sendData.surveyInfoArr = surveyInfoArr;
        }


         //텍스트 데이터
         sendData.pageName = page;
         sendData.subject = subject;
         sendData.message = content;
         sendData.qrUrl = qrUrl;
         sendData.isopen = isOpen;
         sendData.callback = sendPhoneNumber;
         sendData.duplication = duplication;
         sendData.user_id = user_id;
         sendData.portal_id = portal_id;
         sendData.member_id = member_id;
         sendData.user_type = isUser==1?'user':'member';
         sendData.scheduling = scheduling;  //scheduling : 0-즉시, 1-예약, 
         sendData.send_date = send_date;
         // //발신 권한 정보
         sendData.hasSendAuth = hasSendAuth;


         // // 파일정보 
         sendData.imageCount = selectedImgCount;
         sendData.fileCount = selectedFileCount;
         sendData.qrCount = qrImage.length;

         sendData.saveImageNames = saveImageNames;
         sendData.newImageNames = newImageNames;
         sendData.saveFileNames = saveFileNames;
         sendData.newFileNames = newFileNames;
         sendData.saveQrName = saveQrName;
         sendData.originalQrName = originalQrName;

         //발신자 정보
         sendData.finalSendInfoArr = finalSendInfoArrFiltered;



        if(pageKor=='공지사항'){
            finalSendData(sendData, formData);
        }else{
            Alert.alert( //alert 사용								
                '안내', '앱에 미가입된 회원은 SMS로 발신하며, SMS 발송 문자 건수에 대하여 별도의 요금이 발생합니다. \n\n발송 하시겠습니까?', [ 							
                    {text: '취소', onPress: () => {}}, 						
                    {text: '확인', onPress: async () => {
                        finalSendData(sendData, formData);
                    }}, 						
                ]							
            );			
        }
    }
    

    async function finalSendData(sendData:any, formData:any){
        setIsLoading(true);
        if(pageKor !='공지사항'){
            const res = await insertSendData(sendData);
            if(res=='OK'){
                //자바서버에 파일 정보 넣기
                await insertFilesToJavaServer(formData);
                goSendList(navigation);
            }else{
                Alert.alert('안내', `오류가 발생하였습니다.\n다시 발송해 주세요.`); 
            }
        }else if(pageKor =='공지사항'){
            const res = await insertBoardData(sendData);
            if(res=='OK'){
                //자바서버에 파일 정보 넣기
                await insertFilesToJavaServer(formData);
                goBoardList(navigation);
                
            }else{
                Alert.alert('안내', `오류가 발생하였습니다.\n다시 전송해 주세요.`); 
                setSendBtnDisabled(false);
            }
        }
        setIsLoading(false);
    }


    if(isLoading){return <Loader/>}

    let fileBtnTop = appCount+smsCount==0 ?185:215;
    if(pageKor=='공지사항'){
        fileBtnTop = 140;
    }

    return (
        <>
        <SafeBasicView >
        <HeaderCustomWrite 
            title={pageKor+" 작성"}
            checkAlarmSendContent={checkAlarmSendContent}
            backAction = {backAction}
        />
        <Space height={5}/>

        <ScrollView
            ref={scrollViewRef}
        >
            <PaddingView>

            <Line color={"#F1F1F1"}/>
                <ReceiveView>
                    <TitleInput 
                        placeholder= {`${pageKor} 제목입력 (최대 20자)`}
                        placeholderTextColor ={colors.placeholder2}        
                        maxLength={20}
                        onChangeText={onChangeSubject} 
                        onFocus={()=>{onTextInputFocus('제목')}}
                        ref={subjectInputRef}
                        value={subject}
                     />
                </ReceiveView>

                {pageKor !='설문조사' &&
                <>
                <Line color={"#F1F1F1"}/>
                <ReceiveView>
                    <TitleInput 
                        style={{width:windowWidth-40}}
                        placeholder="(선택) https://를 포함한 QR URL을 입력해 주세요."
                        placeholderTextColor ={colors.placeholder2}        
                        maxLength={50}
                        onChangeText={onChangeQrUrl} 
                        onFocus={()=>{onTextInputFocus('QR')}}
                        ref={qrUrlInputRef}
                        value={qrUrl}
                     />
                </ReceiveView>
                </>
                }

                {pageKor !='공지사항' &&
                <>
                <Line color={"#F1F1F1"}/>
                <ReceiveView>
                    <ReceiveInner>
                        <AntDesign name="addusergroup" size={17} color="black" style={{marginTop:-2}}/>
                        <ReceiveTxt>받는사람</ReceiveTxt>
                    </ReceiveInner>

                    <InputSidePress onPress={()=>{
                        setIsShowFileBtns(false);
                        setIsShowReceiveBtns(!isShowReceiveBtns);
                    }}>
                        <Entypo name="circle-with-plus" size={18} color="#9F9FA1" />
                    </InputSidePress>
                </ReceiveView>
                </>
                }

                {appCount+smsCount!=0 && 
                <ReceiveCountView>
                        <ReceiveCountTxt1>전체 </ReceiveCountTxt1>
                        <ReceiveCountTxt2>{pageKor=='설문조사'?appCount:appCount+smsCount}</ReceiveCountTxt2>
                        <ReceiveCountTxt1>명 (APP </ReceiveCountTxt1>
                        <ReceiveCountTxt2>{appCount}</ReceiveCountTxt2>
                        <ReceiveCountTxt1>명, SMS {pageKor=='설문조사'&&'전송불가'}</ReceiveCountTxt1>
                        <ReceiveCountTxt2>{smsCount}</ReceiveCountTxt2>
                        <ReceiveCountTxt1>명)</ReceiveCountTxt1>
                        <SeePress onPress={seeFinalReceiveList}>
                            <Entypo name="magnifying-glass" size={16} color="black" style={{marginLeft:4}}/>
                        </SeePress>

                    <InputSidePress onPress={delReceiveData}>
                        <EvilIcons name="close" size={18} color="black" />
                    </InputSidePress>
                </ReceiveCountView>}

                {pageKor !='설문조사' &&
                <>
                <Line color={"#F1F1F1"}/>
                <ReceiveView>
                    <ReceiveInner>
                        <AntDesign name="paperclip" size={16} color="black" style={{marginTop:-1}}/>
                        <ReceiveTxt>사진 및 파일첨부</ReceiveTxt>
                    </ReceiveInner>

                    <InputSidePress 
                        onPress={()=>{
                            setIsShowReceiveBtns(false);
                            setIsShowFileBtns(!isShowFileBtns);
                        }}
                    >
                        <Entypo name="circle-with-plus" size={18} color="#9F9FA1" />
                    </InputSidePress>

                </ReceiveView>
                </>
                }
                

                {selectedImgCount >=1 && 
                <FileAttachView>
                    <Line color={"#F1F1F1"}/>
                    <ReceiveView style={{marginBottom:-10}}>
                        <ReceiveTxt2>사진첨부 {selectedImgCount}개</ReceiveTxt2>
                        <InputSidePress onPress={()=>{setIsSpreadImgAttachView(!isSpreadImgAttachView)}}>
                            <IconImg source={isSpreadImgAttachView?require('../assets/icons/spread_up.png'):require('../assets/icons/spread_down.png')}/>
                        </InputSidePress>
                    </ReceiveView>

                    {isSpreadImgAttachView &&
                    <>
                        {selectedImg.map((item:any, idx)=>{
                            return(
                                <AttachFileBox  key={'img_'+idx}>
                                    <AttachAngleImg source={require('../assets/icons/treeAngle.png')}/>
                                    <FileNameTxt numberOfLines={1}>[사진] {item.fileName}</FileNameTxt>
                                    <InputSidePress onPress={()=>{removeImage(item.fileName)}}>
                                        <EvilIcons name="close" size={18} color="black" />
                                    </InputSidePress>
                                </AttachFileBox>
                            )
                        })}
                    </>
                    }
                </FileAttachView>
                }

                {selectedFileCount >=1 && 
                <FileAttachView>
                    <Line color={"#F1F1F1"}/>
                    <ReceiveView style={{marginBottom:-10}}>
                        <ReceiveTxt2>파일첨부 {selectedFileCount}개</ReceiveTxt2>
                        <InputSidePress onPress={()=>{setIsSpreadFileAttachView(!isSpreadFileAttachView)}}>
                            <IconImg source={isSpreadFileAttachView?require('../assets/icons/spread_up.png'):require('../assets/icons/spread_down.png')}/>
                        </InputSidePress>
                    </ReceiveView>

                    {isSpreadFileAttachView &&
                    <>
                        {selectedFile.map((item:any, idx:number)=>{
                            return(
                                <AttachFileBox key={'file_'+idx}>
                                    <AttachAngleImg source={require('../assets/icons/treeAngle.png')}/>
                                    <FileNameTxt numberOfLines={1}>[파일] {item.name}</FileNameTxt>
                                    <InputSidePress onPress={()=>{removeFile(item.name)}}>
                                        <EvilIcons name="close" size={18} color="black" />
                                    </InputSidePress>
                                </AttachFileBox>
                            )
                        })}
                    </>
                    }
                </FileAttachView>
                }

                {qrImage.length == 1 &&
                <FileAttachView>
                    <Line color={"#F1F1F1"}/>
                    <ReceiveView style={{marginBottom:-10}}>
                        <ReceiveTxt2>QR 첨부</ReceiveTxt2>
                        <InputSidePress onPress={()=>{setIsSpreadQrAttachView(!isSpreadQrAttachView)}}>
                            <IconImg source={isSpreadQrAttachView?require('../assets/icons/spread_up.png'):require('../assets/icons/spread_down.png')}/>
                        </InputSidePress>
                    </ReceiveView>

                    {isSpreadQrAttachView &&
                    <>
                        {qrImage.map((item:any, idx:number)=>{
                            return(
                                <AttachFileBox key={'file_'+idx}>
                                    <AttachAngleImg source={require('../assets/icons/treeAngle.png')}/>
                                    <FileNameTxt numberOfLines={1}>[QR] {item?.fileName}</FileNameTxt>
                                    <InputSidePress onPress={removeQrImage}>
                                        <EvilIcons name="close" size={18} color="black" />
                                    </InputSidePress>
                                </AttachFileBox>
                            )
                        })}
                    </>
                    }
                </FileAttachView>
                }


                <Line color={"#F1F1F1"}/>

                {pageKor=='설문조사' &&
                <>
                <ReceiveView>
                    <ReceiveInner>
                        {/* <SimpleLineIcons name="note" size={16} color="black" /> */}
                        <AntDesign name="addfile" size={16} color="black" />
                        <ReceiveTxt>질문 추가  {surveyArr.length>0 && surveyArr.length+'개'}</ReceiveTxt>
                    </ReceiveInner>

                    <InputSidePress onPress={openSurveyStartModalFast}>
                        <Entypo name="circle-with-plus" size={18} color="#9F9FA1" />
                    </InputSidePress>
                </ReceiveView>

                <SurveyResultView style={surveyArr.length>0&&{marginBottom: 15}}>
                    {surveyArr.map((item:any, idx:any)=>{
                        return(
                            <View key={'sv_'+idx}>
                             <SurveyResultBox>
                                <SurveyResultTitleBox>
                                    <SurveyResulTitle numberOfLines={1}>{item.question}</SurveyResulTitle>
                                    <InputSidePress onPress={()=>{removeSurveyResult(idx)}}>
                                        <EvilIcons name="close" size={18} color="black"  style={{marginTop:-2}}/>
                                    </InputSidePress>
                                </SurveyResultTitleBox>
                                {item.qType =='choice' && item.answer.map((item2:any, idx2:number)=>{
                                    return(
                                    <SurverAnsBox key={'sva_'+idx2}>
                                        <SurverAnsAngleImg source={require('../assets/icons/treeAngle.png')}/>
                                        <SurverAnsTxt numberOfLines={1}>{item2}</SurverAnsTxt>
                                    </SurverAnsBox>
                                    )
                                })}
                                
                            </SurveyResultBox>
                            <Space height={10}/>
                            </View>

                        )
                    })}


                </SurveyResultView>
                <Line color={"#F1F1F1"}/>
                </>
                }

                <Space height={15}/>
                <ContentInput 
                    placeholder="본문을 작성해 주세요."
                    placeholderTextColor={colors.placeholder2}
                    style={{textAlignVertical:'top'}}	
                    multiline = {true}	
                    numberOfLines = {10}	
                    ref = {contentInputRef}
                    onChangeText={onChangeContent} 
                    onFocus={()=>{onTextInputFocus('본문')}}
                    value={content}
                />


                {isShowReceiveBtns && 
                <ReceiveBtnView
                    style={pageKor=='설문조사' && {top:95}}
                >
                    <Shadow		
                        style={{
                            borderRadius:10, 
                            backgroundColor:'#FFF',
                            width:95,
                            height:125,
                        }}	
                        distance={6} 
                        startColor={'rgba(193, 193, 193, 0.4)'} 
                        endColor={'rgba(255, 255, 255, 0.5)'} 
                        offset={[4, 5]}
                    >	
                    <ReceiveBtnPress onPress={openSimpleReceiveModal}>
                        <ReceiveBtnTxt style={{marginTop:10}}>간편추가</ReceiveBtnTxt>
                    </ReceiveBtnPress>
                    <ReceiveBtnPress onPress={openAddBookModal}>
                        <ReceiveBtnTxt style={{marginTop:-3}}>주소록</ReceiveBtnTxt>
                    </ReceiveBtnPress>
                    <ReceiveBtnPress onPress={showDirectPhoneInputModal}>
                        <ReceiveBtnTxt style={{marginTop:-20}}>직접입력</ReceiveBtnTxt>
                    </ReceiveBtnPress>
                    </Shadow>
                </ReceiveBtnView>
                }

                {isShowFileBtns && 
                <FileBtnView style={{top:fileBtnTop}}>
                    <Shadow		
                        style={{
                            borderRadius:10, 
                            backgroundColor:'#FFF',
                            width:95,
                            height:135,
                        }}	
                        distance={10} 
                        startColor={'#f0f0f0'} 
                        endColor={'#FFFFFF'} 
                        offset={[4, 6]}
                    >	
                        <ReceiveBtnPress onPress={selectImage}>
                            <ReceiveBtnTxt style={{marginTop:10}}>사진등록</ReceiveBtnTxt>
                        </ReceiveBtnPress>
                        <ReceiveBtnPress onPress={selectFiles}>
                            <ReceiveBtnTxt style={{marginTop:-3}}>파일첨부</ReceiveBtnTxt>
                        </ReceiveBtnPress>
                        <ReceiveBtnPress onPress={selectQrImage}>
                            <ReceiveBtnTxt style={{marginTop:-18}}>QR 첨부</ReceiveBtnTxt>
                        </ReceiveBtnPress>
                    </Shadow>
                </FileBtnView>
                }

            </PaddingView>

            <KeyboardAvoidCustomView style={os==='ios'?{height:keyboardHeight}:{height:0}}/>
        </ScrollView>			
        </SafeBasicView>


        
        {/* 수신자 간편 선택 모달 */}
        {isShowSimpleSelectModal && 
        <SendWriteBottom_SimpleSelect 
            aniBoxPositionY={aniBoxPositionY}
            closeSimpleReveiceModal={closeSimpleReveiceModal}
            setSimplePickerData={setSimplePickerData}
        />
        }

        {/* 수신자 주소록 선택 모달 */}
        {isShowAddBook && 
        <SendWriteBottom_AddrBookSelect 
            aniBoxPositionY={aniBoxPositionY}
            closeAddBookModal={closeAddBookModal}
            selectAddBookData={selectAddBookData}
            addBookCate={addBookCate}
            setAddBookCate={setAddBookCate}
            changeMobileType={changeMobileType}
            changeMobileTypeGroup = {changeMobileTypeGroup}
            selPhoneType={selPhoneType}
            selGroupPhoneType={selGroupPhoneType}
            toggleGradeSelect={toggleGradeSelect}
            gradeArr={gradeArr}
            toggleGrade={toggleGrade}
            classArr={classArr}
            toggleClassSelect={toggleClassSelect}
            toggleClass={toggleClass}
            simpleStuAndPar={simpleStuAndPar}
            toggleStudentSelect={toggleStudentSelect}
            toggleLv4={toggleLv4}
            toggleMobileSelect_stu={toggleMobileSelect_stu}

            teacherCateArr={teacherCateArr}
            simpleTeacher={simpleTeacher}
            toggleTeacherCateSelect={toggleTeacherCateSelect}
            toggleTeacherCate={toggleTeacherCate}
            toggleMobileSelect_tea={toggleMobileSelect_tea}

            simpleGroupSelect={simpleGroupSelect}
            simpleGroup={simpleGroup}
            toggleGroupSelect={toggleGroupSelect}
            toggleGroup={toggleGroup}
            toggleGroupLv2 = {toggleGroupLv2}
            toggleMobileSelect_group = {toggleMobileSelect_group}
            toggleMobileTypeSelect_group = {toggleMobileTypeSelect_group}
            
        />
        }

        {/* 설문지 질문 타입 선택 모달 (설문 1차 모달) */}
        {isShowSurveyStartModal &&  
        <SendWriteBottom_SurveyStart 
            aniBoxPositionY={aniBoxPositionY}
            closeSurveyStartModal={closeSurveyStartModalFast}
            setSurveyQtype={setSurveyQtype}
            setSurveyIsDoubleAnswer={setSurveyIsDoubleAnswer}
            openDoubleAnsCountSelect ={openDoubleAnsCountSelect}
            qType={qType}
            isDoubleAnswer={isDoubleAnswer}
            doubleAnsCount = {doubleAnsCount}

            openSurveyWriteModal={openSurveyWriteModalFast}
        />
        }   

        {/* 객관식 주관식 타입 선택 모달 (설문 2차 모달) */}
        {isShowSurveyTypeModal &&  
        <SendWriteBottom_SurveyType 
            aniBoxPositionY={aniBoxPositionY}
            setQtypeData={setQtypeData}
            qType={qType}
        />
        }

        {/* 중복답변 가능여부 선택 모달 */}
        {isShowSurveyDoubleAnswerModal &&  
        <SendWriteBottom_SurveyDoubleAnswer
            aniBoxPositionY={aniBoxPositionY}
            setIsDoubleAnswerData={setIsDoubleAnswerData}
            isDoubleAnswer={isDoubleAnswer}
        />
        }
        
        {/* 중복답변 갯수 선택 모달 */}
        {isShowSurveyDoubleCountModal && 
        <SendWriteBottom_SurveyDoubleCount
            aniBoxPositionY={aniBoxPositionY}
            setDoubleCountData={setDoubleCountData}
            doubleAnsCount={doubleAnsCount}
        />
        }

        {/* 설문지 질문 작성 모달  */}
        {isShowSurveyWriteModal && 
        <SendWriteBottom_SurveyWrite 
            aniBoxPositionY={aniBoxPositionY}
            closeSurveyWriteModal={closeSurveyWriteModal}
            surveyArr={surveyArr}
            qType={qType}
            isDoubleAnswer={isDoubleAnswer}
            currentWriteSurveyObj={currentWriteSurveyObj}
            writeSurveyInput={writeSurveyInput}
            currentWriteSurveyAnsArr={currentWriteSurveyAnsArr}
            setCurrentWriteSurveyAnsArr={setCurrentWriteSurveyAnsArr}
            finishWriteSurveyQtn={finishWriteSurveyQtn}
            isShowSurveyWriteInput={isShowSurveyWriteInput}
            writeSurveyInputType={writeSurveyInputType}
            surveyWriteInputRef={surveyWriteInputRef}
            onChangeSurveyWrite={onChangeSurveyWrite}
            onSubmitSurveyWrite={onSubmitSurveyWrite}
            surveyInputTxt={surveyInputTxt}
            setIsShowSurveyWriteInput={setIsShowSurveyWriteInput}
            doubleAnsCount = {doubleAnsCount}
        />
        }

        {/* 최종 발신 선택 모달 */}
        {isShowFinalSendModal  &&
        <SendWriteBottom_FinalSend 
           aniBoxPositionY={aniBoxPositionY}
           closeFinalSendModal={closeFinalSendModal}
           openSendPhoneNumberPicker={openSendPhoneNumberPicker}
           startDate={startDate}
           endDate={endDate}
           setIsShowDatePicker={setIsShowDatePicker}
           setDateKind={setDateKind}
           duplication={duplication}
           setDuplication={setDuplication}
           isOpen={isOpen}
           setIsOpen={setIsOpen}
           sendPhoneNumber={sendPhoneNumber}
           checkFinalSendData={checkFinalSendData}
           pageKor = {pageKor}
           sendBtnDisabled = {sendBtnDisabled}
           isReservation={isReservation}
           setIsReservation = {setIsReservation}
           reserveDate={reserveDate}
           reserveTime={reserveTime}
           setIsShowReserveDatePicker = {setIsShowReserveDatePicker}
           setIsShowReserveTimePicker = {setIsShowReserveTimePicker}
        />
        }




        {/* 간편추가 2차 피커  */}
        <SimplePickerView style={isShowSimplePicker?{display:'block'}:{display:'none'}}>
            {os=='ios' && 
            <IosPickerView>
                <IosPickerPress onPress={()=>{setIsShowSimplePicker(false)}}>
                    <IosPickerTxt style={{color:colors.placeholder}}>&times;</IosPickerTxt>
                </IosPickerPress>
                <IosPickerPress onPress={()=>{selectSimpleData(selectedValue)}}>
                    <IosPickerTxt>확인</IosPickerTxt>
                </IosPickerPress>
            </IosPickerView>
            }
            <Picker
                ref={simplePickerRef}
                selectedValue={selectedValue}
                onValueChange={(itemValue) =>{
                    if(os=='ios'){
                        setSelectedValue(itemValue);
                    }else{
                        setSelectedValue(itemValue);
                        selectSimpleData(itemValue);
                    }

                }}
            >
                {simplePickerArr.map((item:any, idx)=>{
                    const {value, txt, count, mobileType} = item;
                    let subTxt = '전체';
                    if(mobileType==='mobile1'){
                        subTxt = '휴대폰번호1 전체';
                    }else if(mobileType==='mobile2'){
                        subTxt = '휴대폰번호2 전체';
                    }else if(mobileType==='mobile3'){
                        subTxt = '휴대폰번호3 전체';
                    }
                    
                    return(
                        <Picker.Item key={'picker_'+idx} label={value=='none'?`${txt}`:`${txt} ${subTxt}(${count}명)`} value={value} />
                    )
                })}
                
            </Picker>
        </SimplePickerView>

        
        {/* 발신번호 2차 피커 */}
        <SendNumberPickerView style={isShowSendNumPicker?{display:'block'}:{display:'none'}}>
            {os=='ios' && 
            <IosPickerView>
                <IosPickerPress>
                    {/* <IosPickerTxt style={{color:colors.placeholder}}>&times;</IosPickerTxt> */}
                </IosPickerPress>
                <IosPickerPress onPress={()=>{ 
                        setIsShowSendNumPicker(false)
                        openFinalSendModal()
                    }}
                >
                    <IosPickerTxt>확인</IosPickerTxt>
                </IosPickerPress>
            </IosPickerView>
            
            }
            <Picker
                ref={sendPhoneNumberPickerRef}
                selectedValue={sendPhoneNumber}
                onValueChange={(itemValue) =>{
                    if(os=='ios'){
                        setSendPhoneNumber(itemValue)
                    }else{
                        setSendPhoneNumber(itemValue);
                        openFinalSendModal();
                    }

                }}
            >   
                <Picker.Item key={'phone_none'} label={'전화번호 선택'} value={''} />
                {sendPhoneNumberList.map(({memo, phone}:any, idx)=>{
                    let label = "";

                    if(memo==null || memo.length==0){
                        label = phone;
                    }else{
                        label = `${phone} (${memo})`
                    }
                    return(
                        <Picker.Item key={'picker_'+idx} label={label} value={phone} />
                    )
                })}
                
            </Picker>
        </SendNumberPickerView>


        
        {isShowDatePicker &&    // 설문 날짜 선택 2차 모달
         <TimePickerWrap>
         {os=='ios' && 
         <IosPickerView>
                 <IosPickerPress onPress={()=>{}}>
             </IosPickerPress>
             <IosPickerPress onPress={()=>{setIsShowDatePicker(false)}}>
                 <IosPickerTxt>&times;</IosPickerTxt>
             </IosPickerPress>
         </IosPickerView>
         }
        <DateTimePicker
            testID="dateTimePicker"
            value={dateKind=='startDate'?startDate:(endDate==null?new Date():endDate)}
            mode="date" // 'date'를 'time'으로 변경하여 시간 선택도 가능합니다.
            display="inline"
            timeZoneName={'Asia/Seoul'}
            locale="ko-KR"
            onChange={onChangeSurveyDate}
            style={{ backgroundColor: 'white', height:550}} // 배경색 및 글자색 설정
        />
        </TimePickerWrap>
        }


         
        {isShowReserveDatePicker &&    // 예약 일자 선택
        <TimePickerWrap>
        {os=='ios' && 
        <IosPickerView>
                <IosPickerPress onPress={()=>{}}>
            </IosPickerPress>
            <IosPickerPress onPress={()=>{setIsShowReserveDatePicker(false)}}>
                <IosPickerTxt>&times;</IosPickerTxt>
            </IosPickerPress>
        </IosPickerView>
        }
        <DateTimePicker
            testID="dateTimePicker"
            value={reserveDate==null?new Date():reserveDate}
            mode="date" 
            display="inline"
            timeZoneName={'Asia/Seoul'}
            locale="ko-KR"
            onChange={onChangeReserveDate}
            
            style={{ backgroundColor: 'white', height:550}} 
        />
        </TimePickerWrap>
        }

        {isShowReserveTimePicker &&    // 예약 시간 선택 
        <TimePickerWrap>
            {os=='ios' && 
            <IosPickerView>
                <IosPickerPress onPress={()=>{setIsShowReserveTimePicker(false)}}>
                    <IosPickerTxt style={{color:colors.placeholder}}>&times;</IosPickerTxt>
                </IosPickerPress>
                <IosPickerPress onPress={()=>{setIsShowReserveTimePicker(false)}}>
                    <IosPickerTxt>확인</IosPickerTxt>
                </IosPickerPress>
            </IosPickerView>
            }
            <DateTimePickerModal
                testID="reserveTimePicker"
                display="spinner"
                value={reserveTime==null?new Date():reserveTime}
                mode="time" 
                onChange={onChangeReserveTime}
                style={{ backgroundColor: '#FFF', height:500}} 
                textColor="black" 
                themeVariant="dark"
                is24Hour={true}
                positiveButton={{label: '확인', textColor: '#000'}} 
                negativeButton={{label: '취소', textColor: '#000'}} 
            />
        </TimePickerWrap>
        }



        {isBookLoading && 
        <LoaderView>
            <LoadImage source={require('../assets/icons/spinner.gif')}/>
        </LoaderView>
        }







        {isShowReceiceListModal &&
        <ModalBackground>
            <BottomSelectAnimated
                style={[{ transform: [{ translateY: aniBoxPositionY }] }]}
            >
                <BottomSelectHeader style={{position:'relative'}}>
                    {/* <BottomSelTxt1>전체 0명 (APP 0명, SMS 0명)</BottomSelTxt1> */}
                    <BottomSelTxt1>수신자 현황</BottomSelTxt1>
                    <ClosePress onPress={closeReceiveListModal}>
                        <Ionicons name="close" size={24} color="black" />
                    </ClosePress>
                   
                </BottomSelectHeader>
                <AddBookScroll
                    showsVerticalScrollIndicator={true}
                >
                    <Padding15>

                        {finalSendInfoArr.map((item:any, idx:number)=>{
                            let typeTxt = "";
                            let infoTxt = "";
                            if(item.kind =='s'){
                                infoTxt = `${item.category1}학년${item.category2}반${item.category3}번 ${item.name} - ${item.mobile}`;
                                if(item.mobileType=="mobile1"){typeTxt+="학생번호"}
                                else if(item.mobileType=="mobile2"){typeTxt+="학부모번호1"}
                                else if(item.mobileType=="mobile3"){typeTxt+="학부모번호2"}
                               
                            }else if(item.kind =='t'){
                                let category1Kor = item.category1.length==0?'부서없음':item.category1;
                                infoTxt = `${category1Kor} ${item.name} - ${item.mobile}`;
                                typeTxt = '교직원번호';
                            }else if(item.type =='group'){
                                let mobileNumType = "";
                                if(item.mobileType=='mobile1'){
                                    mobileNumType ="(휴대폰번호1)"; 
                                }else if(item.mobileType=='mobile2'){
                                    mobileNumType ="(휴대폰번호2)";
                                }else if(item.mobileType=='mobile3'){
                                    mobileNumType ="(휴대폰번호3)";
                                }else if(item.mobileType=='tel'){
                                    mobileNumType ="(전화번호)";
                                }
                                infoTxt = `${item.name} - ${item.mobile} ${mobileNumType}`;
                                typeTxt = item.groupName;
                            }else if(item.name == '직접입력'){
                                typeTxt+="직접입력"
                                infoTxt = `${item.mobile}`;
                            }

                            return(
                                <ReceiveListBox key={'plist_'+idx}>
                                    <ReceiveListTxt1 numbersOfLine={1}>{typeTxt}</ReceiveListTxt1>
                                    <ReceiveListTxt2>{infoTxt}</ReceiveListTxt2>
                                    <DelReceivePress
                                        onPress={()=>{
                                            removeReveiceIdx(idx, infoTxt);
                                        }}
                                    >
                                        <EvilIcons name="close" size={16} color="#747474" />
                                    </DelReceivePress>
                                </ReceiveListBox>
                            )
                        })}

                    </Padding15> 
                </AddBookScroll>

                <Line color={colors.lightGrayLine}/>
                <Space height={30}/>

            </BottomSelectAnimated>
        </ModalBackground>
        }


        {isShowDirectPhoneInput &&

        <SurveyInputView>
            <SurveyInputBox>
                <SurveyInputBoxTxt>전화번호를 입력해 주세요.</SurveyInputBoxTxt>
                <SurveyInput
                    placeholderTextColor={colors.placeholder}
                    style={{textAlignVertical:'top'}}	
                    maxLength ={50}
                    keyboardType={os==='ios'?"numbers-and-punctuation":"numeric"}
                    ref = {directPhoneInputRef}
                    onChangeText={onChangeDirectPhoneInput} 
                    onSubmitEditing={onSubmitDirectPhoneInput}
                    value={directPhoneNumber}
                />
                <SurveyInputClosePress 
                    onPress={closeDirectInputModal}
                >
                    <Ionicons name="close-outline" size={18} color={colors.placeholder} />
                </SurveyInputClosePress>
            </SurveyInputBox>
        </SurveyInputView>

        }














        </>
    )
}

