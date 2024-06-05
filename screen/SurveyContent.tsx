import react, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { BasicKeyboardAvoidingView, PaddingView, SafeBasicView, Space } from "../common/commonStyled";
import colors from "../common/commonColors";
import { Alert, DeviceEventEmitter, Platform, Pressable, ScrollView, View } from "react-native";
import { getAlarmSimpleDate, getDDay, getIsSurveyFinished, getIsSurveyStarted, getWindowWidth } from "../common/commonFunc";
import { BlueBottomBtn } from "../components/BlueBottomBtn";
import { goBack } from "../common/commonNaviFunc";
import { useNavigation, useRoute } from "@react-navigation/native";
import { HeaderCustom } from "../components/HeaderCustom";
import { CircleTxtBanner } from "../components/CircleTxtBanner";

import { getSurveyContent, updateSurveyResult } from "../common/commonData";
import { Loader } from "../components/Loader";
import { changeHttpUrlTxt, getSurverResponseArr } from "../common/commonExportFunc";
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; 


const windowWidth = getWindowWidth();
const os = Platform.OS;

const SurveyHeaderView = styled.View`
    padding:20px 12px ; background-color: #F7F9FB; border-radius: 10px;
`
const HeaderTopBox = styled.View`
    flex-direction: row; justify-content: space-between;
`
const HeaderDateTxt = styled.Text`
    font-family: 'noto400'; font-size: 13px; line-height: 16px; color:#989898;
`
const SurveyTitleTxt = styled.Text`
    font-family: 'noto500'; font-size: 18px; line-height: 27px; color:${colors.textBlack}; margin-top: 10px;
`
const SurveySubTxt = styled.Text`
    font-family: 'noto300'; font-size: 14px; line-height: 23px; color:#989898; margin-top: 15px; letter-spacing: -0.5px;
`
const SurveyDateTxt = styled.Text`
    font-family: 'noto400'; font-size: 12px; line-height: 17px; color:${colors.textBlack}; margin-top: 8px;
`
const QtnView = styled.View`
    margin-top:35px;
`
const QtnTxt1 = styled.Text`
    font-family: 'noto400'; font-size: 16px; line-height: 27px; color:${colors.textBlack}; 
`
const QtnPress = styled.Pressable`
    flex-direction: row; padding:6px 0; padding-left:7px;
`
const QtnTxt2 = styled.Text`
    width:${windowWidth - 70}px; font-family: 'noto300'; font-size: 15px; line-height: 20px; color: #747474; letter-spacing: -0.3px; 
    padding-left: 5px; padding-top: ${os==='ios'?1:1.5}px;
`
const QtnTextInput = styled.TextInput`
     width:100%; height:48px; border-width:1px; border-color: ${colors.lightGrayLine}; border-radius: 5px; margin-top: 12px; padding:0 15px;
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


export const SurveyContent = () =>{

    const route = useRoute();				
    const { id, yyyymm }:any = route.params; 	
    const navigation:any = useNavigation();

    const [surveyResponseArr, setSurveyResponseArr] = useState<any>([]);

    const [data, setData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);

    async function getAllData(){
        const data = await getSurveyContent(id, yyyymm);
        setData(data);

        const surveyResponseArr = getSurverResponseArr(data);
        setSurveyResponseArr(surveyResponseArr);

        setIsLoading(false);
    }

    useEffect(()=>{
        getAllData();

        return () => {
            DeviceEventEmitter.emit('backFromContent');
        }
    },[])

    
    if(isLoading){
        return <Loader />
    }

    const title = data[0]?.subject;
    let message = data[0]?.message;
    message = changeHttpUrlTxt(message);
    const insert_date = getAlarmSimpleDate(data[0]?.insert_date);
    const send_date = getAlarmSimpleDate(data[0]?.send_date);
    const sDate = getAlarmSimpleDate(data[0]?.start_date);
    const eDate = getAlarmSimpleDate(data[0]?.end_date);
    const is_survey_answer = data[0]?.is_survey_answer;
    const survey_answer_result = data[0]?.survey_answer;
    const isSurveyFinished = getIsSurveyFinished(data[0]?.end_date);
    const isSurveyStarted = getIsSurveyStarted(data[0]?.start_date)

    let dDayTxt = "";
    let badge = "";
    let btnChk = "";
    let badgeColor = "";
    if(is_survey_answer==0){
        const dDay = getDDay(data[0]?.end_date);
        badge ="미응답";
        dDayTxt = dDay==0?'D-Day':`D-${dDay}`;
        badgeColor = colors.mainBlue;
        btnChk = "미응답";
    }else if(is_survey_answer==1){
        badge = "완료";
        btnChk = "완료";
        badgeColor = colors.mainGreen;
    }
    if(!isSurveyStarted){
        badge ='예약';
        btnChk = "예약";
    }

    if(isSurveyFinished){
        badge = "종료";
        btnChk = "종료";
        badgeColor = colors.finishBanner;
    }



    const onChangeText = (text:string, idx:number) => {
        setSurveyResponseArr((prevState:any) => {
            const updatedResponses = [...prevState]; // 기존 상태를 복사하여 새 배열 생성
            updatedResponses[idx] = { ...updatedResponses[idx], response: text }; // 해당 인덱스의 response만 업데이트
            return updatedResponses; // 새로운 배열을 반환하여 상태 업데이트
        });
    }

    const onChangeRadio = (qtnIdx:number, ansIdx:number) => {
        setSurveyResponseArr((prevState:any) => {
            const updatedResponses = [...prevState]; 
            updatedResponses[qtnIdx] = { ...updatedResponses[qtnIdx], response: ansIdx }; 
            return updatedResponses;
        });
    }

    const onChangeCheckbox = (qtnIdx:number, ansIdx:number, isChecked:boolean, doubleAnsCount:number) => {
        if(badge==='종료'){
            Alert.alert('안내',`설문 기간이 완료 되었습니다.`);
            return;
        }
        setSurveyResponseArr((prevState:any) => {
            const updatedResponses = [...prevState]; 
            let currentIsCheckedArr = updatedResponses[qtnIdx]?.response;
            currentIsCheckedArr[ansIdx] = !isChecked;
            updatedResponses[qtnIdx] = { ...updatedResponses[qtnIdx], response: currentIsCheckedArr }; 
            
            const selectedCount = countOccurrences(currentIsCheckedArr, true);
            
            if(selectedCount > doubleAnsCount){ //선택 다시 취소 하기
                Alert.alert('',`최대 ${doubleAnsCount}까지 선택 가능합니다.`);
                currentIsCheckedArr = updatedResponses[qtnIdx]?.response;
                currentIsCheckedArr[ansIdx] = isChecked;
                updatedResponses[qtnIdx] = { ...updatedResponses[qtnIdx], response: currentIsCheckedArr }; 
            }

            return updatedResponses;
        });
    }

    function countOccurrences(arr:any, target:boolean) {
        let count = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === target) {
                count++;
            }
        }
        return count;
    }

    const checkSurveyResult = async () =>{
        for(let i = 0; i<surveyResponseArr.length; i++){
            const {isDoubleAnswer, qType, response} = surveyResponseArr[i];
            if(response==null){
                Alert.alert('',`${i+1}번 질문에 답변해 주세요.`); return;
            }else if(qType=='write' && response.length==0){
                Alert.alert('',`${i+1}번 질문에 답변해 주세요.`); return;
            }else if(qType=='choice' && isDoubleAnswer && !response.includes(true)){
                Alert.alert('',`${i+1}번 질문에 답변해 주세요.`); return;
            }
        }

        let survey_answer:string='';
        surveyResponseArr.forEach((item:any, idx:number)=>{
            const response = item.response;
            survey_answer+= idx===0?response:'^^^^^'+response;
        });

        const res = await updateSurveyResult(survey_answer, id, yyyymm);
        if(res==='OK'){
            Alert.alert('감사합니다!','설문조사 답변이 완료 되었습니다.',  [{text: '확인', onPress: () => {
                goBack(navigation);
            } }]);
        }else{
            Alert.alert('이런!',`설문조사 전송에 실패하였습니다.${'\n'}다시 시도해 주세요.`);
        }
    }

   
    return (
           	
        <SafeBasicView>
            <BasicKeyboardAvoidingView		
                behavior={os === 'ios' ? 'padding' : 'height'}	
                style={{background:'yellow'}}
            >	
            <HeaderCustom title={'설문조사'} />
            <ScrollView>
                <PaddingView>
                    <SurveyHeaderView>
                        <HeaderTopBox>
                            <BannerView>
                                {badge==='미응답'&& <DDayBanner><DDayBannerTxt>{dDayTxt}</DDayBannerTxt></DDayBanner>}
                                <CircleTxtBanner text={badge} color={badgeColor}/>
                            </BannerView>   
                            <HeaderDateTxt>{send_date}</HeaderDateTxt>
                        </HeaderTopBox>
                        
                        <SurveyTitleTxt>{title}</SurveyTitleTxt>
                        <SurveySubTxt>{message}</SurveySubTxt>
                        <SurveyDateTxt>설문기간 : {sDate} ~ {eDate}</SurveyDateTxt>
                    </SurveyHeaderView>

                   { data.map((item:any, idx:any) =>{
                        let {qType, isDoubleAnswer, doubleAnsCount, question, answer}:any = item;
                        const answerArr = answer.split('^^^^^');
                        let currentResopnse:any = surveyResponseArr[idx]?.response;
                        let currentResopnseBooleanArr:any = [];

                        // 응답 완료는 답변을 응답으로 바꿔줄것!
                        if(badge==='완료'){
                            currentResopnse = survey_answer_result.split('^^^^^')[idx];
                            if(qType==="choice"&& isDoubleAnswer=='1'){
                                currentResopnse = currentResopnse.split(",");
                                currentResopnse.forEach((item:string)=>{
                                    //문지열로 저장된 true/false를 boolean으로 전환!
                                    if(item==='true'){
                                        currentResopnseBooleanArr.push(true);
                                    }else{
                                        currentResopnseBooleanArr.push(false);
                                    }
                                })
                                currentResopnse = currentResopnseBooleanArr;
                            }
                        } 

                        //종료시에는 모두 null
                        if(badge==='종료'){
                            currentResopnse=null;
                        }

                        let doubletTxt = "";
                        
                        if(isDoubleAnswer==1){
                            if(doubleAnsCount > answerArr.length){
                                doubleAnsCount = answerArr.length;
                            }
                            doubletTxt = `(최대 ${doubleAnsCount}개 선택)`
                        }

                        
                        return(
                            <View key={idx+"qtn"}>
                            {qType==="write"&&
                                <QtnView>
                                    <QtnTxt1>{idx+1}. {question} </QtnTxt1>
                                    <QtnTextInput 
                                        placeholder="답변을 입력해 주세요"
                                        placeholderTextColor={colors.placeholder}
                                        value={currentResopnse}
                                        onChangeText={(text:string)=>{onChangeText(text, idx)}} 
                                        editable ={(badge==='완료' || badge==='종료')?false:true}
                                    />
                                </QtnView>
                            }

                            {qType==="choice"&& isDoubleAnswer=='0' &&
                                <QtnView>
                                    <QtnTxt1>{idx+1}. {question}</QtnTxt1>
                                    {answerArr.map((item:any, idx2:number)=>{
                                        const isSelected = currentResopnse==idx2;
                                        return(
                                            <QtnPress key={idx+"_"+idx2+"ans"} onPress={()=>{onChangeRadio(idx, idx2)}}>
                                                {/* <Ionicons name={isSelected?"radio-button-on":"radio-button-off"} size={22} color={colors.mainBlue} /> */}
                                                <MaterialIcons name={isSelected?"radio-button-on":"radio-button-off"} size={22} color={colors.mainBlue} />
                                                <QtnTxt2>{item}</QtnTxt2>
                                            </QtnPress>
                                        )
                                    })}
                                </QtnView>
                            }

                            {qType==="choice"&& isDoubleAnswer=='1' &&
                                <QtnView>
                                    <QtnTxt1>{idx+1}. {question} {doubletTxt}</QtnTxt1>
                                    {answerArr.map((item:any, idx2:number)=>{
                                        const isChecked:boolean = currentResopnse?.[idx2];
                                        return(
                                            <QtnPress key={idx+"_"+idx2+"ans"} onPress={()=>{onChangeCheckbox(idx, idx2, isChecked, doubleAnsCount)}}>
                                                {/* <Ionicons name={isChecked?"checkbox":"checkbox-outline"} size={22} color={colors.mainBlue} /> */}
                                                <MaterialIcons name={isChecked?"check-box":"check-box-outline-blank"} size={22} color={colors.mainBlue} />
                                                <QtnTxt2>{item}</QtnTxt2>
                                            </QtnPress>
                                        )
                                    })}
                                </QtnView>
                            }
                            </View>
                        )
                    })}

                    <Space height={60}/>
                        {
                            btnChk==='미응답'?
                            <Pressable  onPress={checkSurveyResult}>
                                <BlueBottomBtn text={'제출하기'} status={'active'}/>
                            </Pressable>
                            :
                            <BlueBottomBtn text={badge==='종료'?badge:'응답 '+badge} status={'inactive'}/>
                        }
                    <Space height={35}/>
                </PaddingView>
            </ScrollView>
            </BasicKeyboardAvoidingView>
        </SafeBasicView>
           
    )

}