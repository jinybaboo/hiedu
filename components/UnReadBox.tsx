import styled from "styled-components/native";
import colors from "../common/commonColors";
import { HeaderSpaceForAndroid, Space } from "../common/commonStyled";
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";
import { goBack } from "../common/commonNaviFunc";
import { Platform } from "react-native";


const UnReadPress = styled.Pressable`
    width:33.333%;  align-items: center; position: relative;
`
const GreenBoxIcon = styled.Image`
    width: 40px; height:40px;
`
const Txt1 = styled.Text`
    width:99%; height:17px; font-family: 'noto400'; font-size: 14px; line-height: 17px; color:#FFFFFF;letter-spacing: -0.8px; margin-top: 9px; text-align: center;
`
const Txt2 = styled.Text`
    font-family: 'noto500'; font-size: 16px; line-height: 19px; color:#FFFFFF;letter-spacing: -0.8px; margin-top: 5px; 
`
const LoadImage = styled.Image`
    width:20px; height:20px; margin-top: 6px;
`

export const UnReadBox = ({goFunc, txt1, txt2, isLoading}:any)=>{
    const navigation:any = useNavigation();
    return (
        <UnReadPress onPress={()=>{goFunc(navigation, txt1)}}>
            {txt1 === '알림장'&& <GreenBoxIcon  resizeMode="contain"source={require('../assets/icons/alarm.png')}/>}
            {txt1 === '가정통신문'&& <GreenBoxIcon  resizeMode="contain"source={require('../assets/icons/homeLetter.png')}/>}
            {txt1 === '설문조사'&& <GreenBoxIcon  resizeMode="contain"source={require('../assets/icons/survey.png')}/>}
            <Txt1>{txt1}</Txt1>
            {isLoading?
            <LoadImage source={require('../assets/icons/spinner_green.gif')}/>
            :
            <Txt2>{txt2}</Txt2>
            }
        </UnReadPress>
    )
}

  