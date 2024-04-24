import styled from "styled-components/native";
import colors from "../common/commonColors";
import { Space } from "../common/commonStyled";
import { Shadow } from "react-native-shadow-2";
import { changeYYYYMMDDToYYYYMMDD_Day, getTodayAsYYYYMMDD, getWindowWidth } from "../common/commonFunc";
import { View } from "react-native";

const windowWidth = getWindowWidth();


const ListView = styled.View`
    margin-left: 20px; margin-top: 15px; margin-bottom: 20px; 
`
const TimeTableView = styled.View`
    width:${windowWidth-40}px; padding:30px 20px 10px;
`
const TimeTableHeadView = styled.View`
    flex-direction: row; justify-content: space-between;
`
const TimeTableHeadLeft = styled.View`
     min-width: 80%;
`
const TimeTableHeadTxt1 = styled.Text`
    font-family: 'noto500'; font-size: 14px; line-height: 17px; color:${colors.textBlack}; letter-spacing: -0.4px; 
`
const TimeTableHeadTxt2 = styled.Text`
    font-family: 'noto400'; font-size: 12px; line-height: 15px; color:${colors.textBlack}; letter-spacing: -0.1px; margin-top: 2px;
`
const TimeTableHeadTxt3 = styled(TimeTableHeadTxt2)`
    margin-top: 0px;
`
// 대시라인
const DashBox = styled.View`
    overflow: hidden;
`
const DashLine = styled.View`
    border-style: dashed; border-width: 1px; border-color: #D8D8D8; margin:-1px; height:0px; margin-bottom: 0;
`

const MiddleBox = styled.View`
    width:100%;
`
const DateBox = styled.View`
    width:100%; align-items: center; justify-content: center;
`
const MiddleTxt = styled.Text`
    font-family: 'noto700'; font-size: 13px; line-height: 40px; color:${colors.textBlack}; letter-spacing: -0.4px; text-align: center;
`
const TextView = styled.View`
    flex-direction: row; width: 100%;
`
const InfoTxtInner1 =  styled.View`
    width:25%;
`
const InfoTxtInner2 =  styled.View`
    width:73%;   
`
const InfoTxt1 = styled.Text`
    font-family: 'noto300'; font-size: 13px; line-height: 16px; color:${colors.textBlack}; letter-spacing: -0.4px; 
    padding:4px 0px; padding-left: 20px; 
`
const InfoTxt2 = styled(InfoTxt1)`
    font-family: 'noto400';  padding-left:10px; width: 95%;
`
const DeptName = styled.Text`
    font-family: 'noto500'; font-size: 13px; line-height: 16px; color:${colors.textBlack}; letter-spacing: -0.4px; text-align: center;
    padding: 10px 0 4px;

`

export const TimeTableBox = ({item}:any)=>{
    const {SCHUL_NM, GRADE, CLASS_NM, ALL_TI_YMD, DGHT_CRSE_SC_NM} = item[0];									
    const date = changeYYYYMMDDToYYYYMMDD_Day(ALL_TI_YMD);
    const today = getTodayAsYYYYMMDD();

    let deptArr:any =[];
    item.forEach(({DDDEP_NM}:any)=>{
        if(!deptArr.includes(DDDEP_NM)){
            deptArr.push(DDDEP_NM);
        }
    });

    let currentDept = '';

    return(
        <ListView>
            <Shadow		
                style={today==ALL_TI_YMD?{
                    borderRadius:10, 
                    backgroundColor:'#FFF',
                    borderColor:'rgba(48, 108, 245, 0.4)',
                    borderWidth:1,
                }:{
                    borderRadius:10, 
                    backgroundColor:'#FFF',
                }}	
                distance={10} 
                startColor={'#f0f0f0'} 
                endColor={'#FFFFFF'} 
                offset={[4, 6]}
            >	
                <TimeTableView>
                    <TimeTableHeadView>
                        <TimeTableHeadLeft>
                            <TimeTableHeadTxt1>{SCHUL_NM}</TimeTableHeadTxt1>
                            <TimeTableHeadTxt2>{GRADE}학년 {CLASS_NM}반</TimeTableHeadTxt2>
                        </TimeTableHeadLeft>
                        <TimeTableHeadTxt3>{DGHT_CRSE_SC_NM}</TimeTableHeadTxt3>
                    </TimeTableHeadView>

                    <Space height={15}/>

                    <DashBox><DashLine/></DashBox>
                    <DateBox>
                            <MiddleTxt>{date}</MiddleTxt>
                    </DateBox>
                    <DashBox><DashLine/></DashBox>

                    <Space height={10}/>

                    <MiddleBox>
                        {item.map((item:any, idx:number)=>{
                            const {PERIO, ITRT_CNTNT, DDDEP_NM} = item;
                            const ShowDept = currentDept!=DDDEP_NM;
                            currentDept = DDDEP_NM;

                            return (
                                <View key={'table_'+idx}>
                                {deptArr.length>1 && ShowDept&& <DeptName>[{DDDEP_NM}]</DeptName>}
                                <TextView key={'sch_'+idx}>
                                    <InfoTxtInner1><InfoTxt1>{PERIO} 교시</InfoTxt1></InfoTxtInner1>
                                    <InfoTxtInner2><InfoTxt2>{ITRT_CNTNT}</InfoTxt2></InfoTxtInner2>
                                </TextView>
                                </View>
                            )
                        })}
                    </MiddleBox>






                    <Space height={10}/>

                    
                </TimeTableView>	
            </Shadow>
        </ListView>
       
    )
}

  