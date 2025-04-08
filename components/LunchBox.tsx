import styled from "styled-components/native";
import colors from "../common/commonColors";
import { Space } from "../common/commonStyled";
import { useNavigation } from "@react-navigation/native";
import { Shadow } from "react-native-shadow-2";
import { changeYYYYMMDDToMMDD_Day, getTodayAsYYYYMMDD, getWindowWidth, replaceAllCustom } from "../common/commonFunc";

const windowWidth = getWindowWidth();

const ListView = styled.View`
    margin-left: 20px; margin-top: 15px; margin-bottom: 20px;
`
const LunchView = styled.View`
    width:${windowWidth-40}px; padding:30px 20px 10px; 
`
const LunchHeadView = styled.View`
    flex-direction: row; justify-content: space-between;
`
const LunchHeadLeft = styled.View`
    
`
const LunchHeadTxt1 = styled.Text`
    font-family: 'noto500'; font-size: 14px; line-height: 17px; color:${colors.textBlack}; letter-spacing: -0.4px;
`
const LunchHeadTxt2 = styled.Text`
    font-family: 'noto400'; font-size: 12px; line-height: 15px; color:${colors.textBlack}; letter-spacing: -0.1px; margin-top: 2px;
`
const LunchHeadTxt3 = styled(LunchHeadTxt2)`
    margin-top: 0px; font-family: 'noto500';
`
// 대시라인
const DashBox = styled.View`
    overflow: hidden;
`
const DashLine = styled.View`
    border-style: dashed; border-width: 1px; border-color: #D8D8D8; margin:-1px; height:0px; margin-bottom: 0;
`

const MiddleBox = styled.View`
    width:100%; flex-direction: row; 
`
const MiddleBoxInner1 = styled.View`
    width:50%; height:40px;
`
const MiddleTxt = styled.Text`
    font-family: 'noto700'; font-size: 13px; line-height: 40px; color:${colors.textBlack}; letter-spacing: -0.4px; text-align: center;
`
const InfoTxtInner =  styled.View`
    width:50%; 
`
const InfoTxt1 = styled.Text`
    font-family: 'noto500'; font-size: 13px; line-height: 16px; color:${colors.textBlack}; letter-spacing: -0.4px; 
    padding:4px 15px;
`
const InfoTxt2 = styled(InfoTxt1)`
    font-family: 'noto300'; 
`
const OrignBox = styled.View`
    padding:15px;
`
const OrignTxt1 = styled(MiddleTxt)`
    text-align: left; line-height: 16px;
`
const OrignTxt2 = styled(InfoTxt2)`
    padding:0; margin-top: 8px;
`


export const LunchBox = ({item}:any)=>{
    const navigation:any = useNavigation();

    const {SCHUL_NM, MLSV_YMD, MMEAL_SC_NM, DDISH_NM, NTR_INFO, ORPLC_INFO} = item;									
    const date = changeYYYYMMDDToMMDD_Day(MLSV_YMD);
    const dishNameArr = DDISH_NM.split("<br/>");
    const ntrInfoArr = NTR_INFO.split("<br/>");
    const originInfo = replaceAllCustom(ORPLC_INFO,"<br/>",",  ").replace(",  비고 :","");
    const today = getTodayAsYYYYMMDD();

    return (
        <ListView>
            <Shadow		
                style={today==MLSV_YMD?{
                    borderRadius:10, 
                    backgroundColor:'#FFF',
                    borderColor:'rgba(48, 108, 245, 0.4)',
                    borderWidth:1,
                }:{
                    borderRadius:10, 
                    backgroundColor:'#FFF',
                }}	

                // distance={10}	
                // offset = {[1,8]}	
                distance={10} 
                // startColor={MLSV_YMD==today?'rgba(37, 181, 108,0.3)':'#f0f0f0'} 
                startColor={'#f0f0f0'} 
                endColor={'#FFFFFF'} 
                offset={[4, 6]}
            >	
                <LunchView>
                    <LunchHeadView>
                        <LunchHeadLeft>
                            <LunchHeadTxt1>{SCHUL_NM}</LunchHeadTxt1>
                            <LunchHeadTxt2>{date}</LunchHeadTxt2>
                        </LunchHeadLeft>
                        <LunchHeadTxt3>{MMEAL_SC_NM}</LunchHeadTxt3>
                    </LunchHeadView>

                    <Space height={15}/>

                    <DashBox><DashLine/></DashBox>
                    <MiddleBox>
                        <MiddleBoxInner1>
                            <MiddleTxt>요리명</MiddleTxt>
                        </MiddleBoxInner1>
                        <MiddleBoxInner1>
                            <MiddleTxt>영양정보</MiddleTxt>
                        </MiddleBoxInner1>
                    </MiddleBox>
                    <DashBox><DashLine/></DashBox>

                    <Space height={10}/>
                    <MiddleBox>
                        <InfoTxtInner>
                            {dishNameArr.map((item:any, idx:number)=>{
                                const cutIdx = item.indexOf('(');
                                let dishName = cutIdx===-1?item:item.substring(0,cutIdx);
                                    return <InfoTxt1 key={"dish"+idx}>{dishName}</InfoTxt1>
                            })}
                        </InfoTxtInner>

                        <InfoTxtInner>
                            {ntrInfoArr.map((item:any, idx:number)=>{
                                    return <InfoTxt2 key={"ntr"+idx}>{item}</InfoTxt2>
                            })}
                        </InfoTxtInner>
                    </MiddleBox>
                    <Space height={10}/>

                    <DashBox><DashLine/></DashBox>

                    <OrignBox>
                        <OrignTxt1>원산지 정보</OrignTxt1>
                        <OrignTxt2>{originInfo}</OrignTxt2>
                    </OrignBox>
                </LunchView>	
            </Shadow>
        </ListView>
    )
}

  