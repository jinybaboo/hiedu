import styled from "styled-components/native";
import colors from "../common/commonColors";
import { getAlarmFullDate } from "../common/commonFunc";

const AlarmContentHead = styled.View`
    padding-top: 15px;
`
const HeadertxtBox = styled.View`
    flex-direction: row; justify-content: space-between;
`
const HeaderTxt1 = styled.Text`
    font-family: 'noto400'; font-size: 15px; line-height: 18px; color:${colors.mainBlue}; letter-spacing: -0.1px;
`
const HeaderTxt1_1 = styled.Text`
    font-family: 'noto400'; font-size: 12px; line-height: 16px; color:${colors.textBlack}; letter-spacing: -0.4px; 
`
const HeaderTxt2 = styled.Text`
    font-family: 'noto500'; font-size: 16px; line-height: 26px; color:${colors.textBlack}; letter-spacing: -0.8px; margin-top: 10px;;
`
const HeaderTxt3 = styled.Text`
    font-family: 'noto400'; font-size: 13px; line-height: 16px; color:${colors.dateGray}; letter-spacing: -0.4px; margin-top:10px;
`

export const AlarmContentHeader = ({page, data}:any)=>{
    
    const sendDate = getAlarmFullDate(data?.send_date);
    const {name, send_info, student_info} = data;
    const grade_class =  student_info!=null && `[${student_info?.split("^")[1]}-${student_info.split("^")[2]}]`
    const sendInfoGrade = send_info.split("^")[0];
    const isTeacher = isNaN(sendInfoGrade)?"":"선생님";
    return (
        <AlarmContentHead>
            <HeadertxtBox>
                <HeaderTxt1>{data.school_name}</HeaderTxt1>
                {page==='homeLetter' && <HeaderTxt1_1>{grade_class} {name}</HeaderTxt1_1>}
            </HeadertxtBox>
            <HeaderTxt2>{data.subject}</HeaderTxt2>
            <HeaderTxt3>{sendDate}</HeaderTxt3>
        </AlarmContentHead>
    )
}

  