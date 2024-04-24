import styled from "styled-components/native";
import colors from "../common/commonColors";
import { HeaderSpaceForAndroid } from "../common/commonStyled";
import { Ionicons, EvilIcons } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";
import { goBack } from "../common/commonNaviFunc";
import { Platform } from "react-native";

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
const SendCheckPress = styled.Pressable`
     position: absolute; right: 20px; top:5px; flex-direction: row; align-items: center; height: 50px; padding-left: 30px; 
`
const SendCheckTxt = styled.Text`
    font-family: 'noto700'; font-size: 13px; line-height: 16px; color:${colors.mainBlue}; margin-right: -5px;
`

export const HeaderCustomWrite = ({title, checkAlarmSendContent, backAction}:any)=>{
    const navigation:any = useNavigation();
    return (
        <>
        <HeaderSpaceForAndroid />
        <Header>
            <HeaderPress onPress={backAction}>
                <Ionicons style={{marginTop:6}} name="chevron-back" size={28} color="#000000" />
            </HeaderPress>
            <HeaderTxt>{title}</HeaderTxt>

            <SendCheckPress onPress={checkAlarmSendContent}>
                <SendCheckTxt>{title=='공지사항 작성'?'작성하기':'발송하기'}</SendCheckTxt>
                <EvilIcons name="chevron-right" size={26} color={colors.mainBlue} style={{marginTop:os=='ios'?-1:-8}}/>
            </SendCheckPress>
        </Header>
        </>
    )
}

  