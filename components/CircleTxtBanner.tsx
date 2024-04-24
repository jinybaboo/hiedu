import styled from "styled-components/native";
import colors from "../common/commonColors";



export const CircleTxtBanner = ({text, color}:any)=>{

    const CircleBanner = styled.View`
        width: 40px; height: 22px; background-color:${color}; border-radius: 50px; justify-content: center; align-items: center;
    `
    const CircleBannerTxt = styled.Text`
        font-family: 'noto500'; font-size: 9px; line-height: 12px; color:#FFFFFF; 
    `


    return (
        <CircleBanner><CircleBannerTxt>{text}</CircleBannerTxt></CircleBanner>
    )
}

