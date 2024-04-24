import styled from "styled-components/native";
import colors from "../common/commonColors";
import { CircleTxtBanner } from "./CircleTxtBanner";
import { Line } from "../common/commonStyled";
import { getAlarmFullDate, getAlarmSimpleDate, getDDay, getIsSurveyFinished, getIsSurveyStarted, getWindowWidth } from "../common/commonFunc";
import { useNavigation } from "@react-navigation/native";
import { goAlarmContent, goHomeLetterContent, goSurveyContent } from "../common/commonNaviFunc";

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
const UnreadTxt2 = styled(UnreadTxt1)`
    font-family: 'noto400'; margin-top: 12px; width: ${windowWidth-30-40}px;
`
const UnreadTxt3 = styled.Text`
    font-family: 'noto400'; font-size: 13px; line-height: 16px; color:#c3c3c3; letter-spacing: -0.1px; margin-top: 20px;
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


export const UnreadListComp = ({item, index}:any)=>{
    
    const navigation:any = useNavigation();
    const {category, subject, school_name, send_date, insert_date, id, start_date, end_date, is_survey_answer} = item;
    // console.log('send_date', send_date);
    
    const sendDate = getAlarmFullDate(send_date); 
    const insertDate = getAlarmFullDate(insert_date); 
    const yyyymm = insertDate.replace(".","").replace(" ","").substring(0,6);
    const isSurveyStarted = getIsSurveyStarted(start_date);

    const eDate = getAlarmSimpleDate(end_date);
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

    let goFunction:any;
    if(category==='notice'){
        goFunction = goAlarmContent;
    }else if(category==='letter'){
        goFunction = goHomeLetterContent;
    }
    else if(category==='survey'){
        goFunction = goSurveyContent;
    }
    
    

    return (
        <>
            {index===0 && <Line color={'#c3c3c3'}/>}
            <UnreadPress onPress={()=>{goFunction(navigation, id, yyyymm, isSurveyStarted)}}>	
                <UnreadTxtBox1>
                    <UnreadTxt1>{school_name}</UnreadTxt1>
                    {category==='survey'?
                    <BannerView>
                        {badge==='미응답'&& <DDayBanner><DDayBannerTxt>{dDayTxt}</DDayBannerTxt></DDayBanner>}
                        <CircleTxtBanner text={badge} color={badgeColor}/>
                    </BannerView>
                    :
                    <CircleTxtBanner text={'미열람'} color={'#306CF4'}/>
                    }
                </UnreadTxtBox1>
                <UnreadTxt2 numberOfLines={1}>{subject}</UnreadTxt2>
                <UnreadTxt3>{sendDate}</UnreadTxt3>
            </UnreadPress>
            <Line color={'#c3c3c3'}/>								
        </>			
    )
}

  