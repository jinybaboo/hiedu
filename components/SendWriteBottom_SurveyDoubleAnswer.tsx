import colors from "../common/commonColors";
import { BottomSelTxt1, BottomSelTxt2, BottomSelectAnimated, BottomSelectHeader, BottomTxtPress, ClosePress, Line, ModalBackground, Space } from "../common/commonStyled";
import { Ionicons, AntDesign } from '@expo/vector-icons'; 
import styled from "styled-components/native";
import { BlueBottomBtn } from "./BlueBottomBtn";
import { Platform } from "react-native";

const os = Platform.OS;


export const SendWriteBottom_SurveyDoubleAnswer = ({aniBoxPositionY, setIsDoubleAnswerData, isDoubleAnswer}:any)=>{


    return (
        <ModalBackground>
            <BottomSelectAnimated
                style={[{ transform: [{ translateY: aniBoxPositionY }] }]}
            >
                <BottomSelectHeader>
                    <BottomSelTxt1>중복 답변 선택</BottomSelTxt1>
                </BottomSelectHeader>

                <BottomTxtPress onPress={()=>{setIsDoubleAnswerData('중복답변 불가')}}>
                    <BottomSelTxt2 style={isDoubleAnswer=='중복답변 불가' && {fontFamily:'noto500'}}>중복답변 불가</BottomSelTxt2>
                </BottomTxtPress>

                <BottomTxtPress onPress={()=>{setIsDoubleAnswerData('중복답변 가능')}}>
                    <BottomSelTxt2 style={isDoubleAnswer=='중복답변 가능' && {fontFamily:'noto500'}}>중복답변 가능</BottomSelTxt2>
                </BottomTxtPress>

                <Line color={colors.lightGrayLine}/>

                <Space height={15}/>
                <Space height={os=='ios'?30:15}/>

            </BottomSelectAnimated>
        </ModalBackground>
    )
}

  