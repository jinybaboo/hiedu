import styled from "styled-components/native";
import colors from "../common/commonColors";



export const BlueBottomBtn = ({text, status}:any)=>{

    const ContinueButton = styled.View`
    width:100%; height:55px; background-color:${colors.buttonBlue} ; border-radius: 50px;justify-content:center;
    `
    const ContinueButtonText = styled.Text`
        font-family: 'noto400'; font-size: 18px; line-height: 22px; color:#FFFFFF; text-align: center;
    `
    const ContinueButtonInactive = styled(ContinueButton)`
        background-color:#F1F1F1 ;
    `
    const ContinueButtonTextInactive = styled(ContinueButtonText)`
        color:#D8D8D8;
    `



    return (
        status==='active'?
        <ContinueButton><ContinueButtonText>{text}</ContinueButtonText></ContinueButton>
        :
        <ContinueButtonInactive><ContinueButtonTextInactive>{text}</ContinueButtonTextInactive></ContinueButtonInactive>
    )
}

