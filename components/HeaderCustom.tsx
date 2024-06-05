import styled from "styled-components/native";
import colors from "../common/commonColors";
import { HeaderSpaceForAndroid } from "../common/commonStyled";
import { Ionicons } from '@expo/vector-icons'; 
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

export const HeaderCustom = ({title, hideBack}:any)=>{
    const navigation:any = useNavigation();
    return (
        <>
            <HeaderSpaceForAndroid />
            <Header>
                {!hideBack &&
                <HeaderPress onPress={()=>{goBack(navigation)}}>
                    <Ionicons style={{marginTop:6}} name="chevron-back" size={28} color="#000000" />
                </HeaderPress>
                }
                <HeaderTxt>{title}</HeaderTxt>
            </Header>
        </>
    )
}

  