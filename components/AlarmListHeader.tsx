import styled from "styled-components/native";
import colors from "../common/commonColors";
import { useNavigation } from "@react-navigation/native";
import { CircleTxtBanner } from "./CircleTxtBanner";

const AlarmTopBox = styled.View`
    flex-direction: row; justify-content:space-between;
`
const AlarmTopInner1 = styled.View``
const AlarmTopInner2 = styled.View``
const TxtBox = styled.View`
    flex-direction: row;
`
const AlarmTxt1 = styled.Text`
    font-family: 'noto500'; font-size: 14px; line-height: 17px; color:${colors.textBlack}; letter-spacing: -0.3px; padding-right: 2px;
`
const AlarmTxt2 = styled.Text`
    font-family: 'noto400'; font-size: 12px; line-height: 16px; color:${colors.textBlack}; letter-spacing: -0.1px;
`
const AlarmTxt3 = styled(AlarmTxt2)`
    font-family: 'noto500';
`
export const AlarmListHeader = ({data}:any)=>{
    const {name, school_name,  send_name, etc2, send_info, is_read, category} = data;
    const grade_class =  etc2!=null && `[${etc2?.split("^")[1]}-${etc2.split("^")[2]}]`
    const sendInfoGrade = send_info?.split("^")[0];
    const isTeacher = isNaN(sendInfoGrade)?"":"선생님";
    
    return (
        <AlarmTopBox>
            <AlarmTopInner1>
                <TxtBox>
                    <AlarmTxt1>{school_name}</AlarmTxt1>
                    {category!='notice' && category!='letter' && <AlarmTxt2>{send_name} {isTeacher}</AlarmTxt2>}
                </TxtBox>
                <TxtBox>
                    <AlarmTxt3>{grade_class} {name}</AlarmTxt3>
                </TxtBox>
            </AlarmTopInner1>
            {is_read==0 && <AlarmTopInner2>
                <CircleTxtBanner text={'미열람'} color={colors.mainBlue}></CircleTxtBanner>
            </AlarmTopInner2>}
        </AlarmTopBox>
    )
}

  