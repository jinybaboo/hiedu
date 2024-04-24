import colors from "../common/commonColors";
import { BottomSelTxt1, BottomSelTxt2, BottomSelectAnimated, BottomSelectHeader, BottomTxtPress, ClosePress, Line, ModalBackground, Space } from "../common/commonStyled";
import { Ionicons, AntDesign } from '@expo/vector-icons'; 
import styled from "styled-components/native";
import { BlueBottomBtn } from "./BlueBottomBtn";
import { Platform } from "react-native";

const os = Platform.OS;


export const SendWriteBottom_SurveyType = ({aniBoxPositionY, setQtypeData, qType}:any)=>{

    return (
        <ModalBackground>
            <BottomSelectAnimated
                style={[{ transform: [{ translateY: aniBoxPositionY }] }]}
            >
                <BottomSelectHeader>
                    <BottomSelTxt1>질문 타입 선택</BottomSelTxt1>
                </BottomSelectHeader>

                <BottomTxtPress onPress={()=>{setQtypeData('객관식');}}>
                    <BottomSelTxt2 style={qType==='객관식' && {fontFamily:'noto500'}}>객관식</BottomSelTxt2>
                </BottomTxtPress>

                <BottomTxtPress onPress={()=>{setQtypeData('주관식');}}>
                    <BottomSelTxt2 style={qType==='주관식' && {fontFamily:'noto500'}}>주관식</BottomSelTxt2>
                </BottomTxtPress>

                <Line color={colors.lightGrayLine}/>

                <Space height={15}/>
                <Space height={os=='ios'?30:15}/>

            </BottomSelectAnimated>
        </ModalBackground>
    )
}

  