import styled from "styled-components/native";
import { linkWeb } from "../common/commonExportFunc";
import { Platform } from "react-native";



export const KakaoBtn = ()=>{
    const KakaoBtn = styled.Pressable`
        width: 40px; height: 40px; position: absolute; right:20px;  bottom:20px;
    `
    const KakaoImg = styled.Image`
        width: 40px; height:40px; border-radius: 50px;
    `

    return (
        <KakaoBtn onPress={()=>{linkWeb('http://pf.kakao.com/_nzxabxj/chat')}}>
            <KakaoImg source={require('../assets/icons/kakao2.jpeg')}/>
        </KakaoBtn>
    )
}

