import styled from "styled-components/native";
import colors from "../common/commonColors";



export const UnreadComp = ({text}:any)=>{

    const UnreadGrayBack = styled.View`
        flex:1; justify-content: center; align-items: center; background-color:#F0F0F0;
    `
    const UnreadNoIcon = styled.Image`
        width: 45px; height:53.3px;
    `
    const UnreadTxt = styled.Text`
        font-family: 'noto400'; font-size: 15px; line-height: 18px; color:#989898; letter-spacing: -0.3px; margin-top: 20px;
    `



    return (
        <UnreadGrayBack>
            <UnreadNoIcon 
                resizeMode="contain"
                source={require('../assets/icons/unread.png')}
            />
            <UnreadTxt>{text}</UnreadTxt>
        </UnreadGrayBack>
    )
}

  