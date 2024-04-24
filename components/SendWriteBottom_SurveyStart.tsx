import colors from "../common/commonColors";
import { BottomSelTxt1, BottomSelTxt2, BottomSelectAnimated, BottomSelectHeader, BottomTxtPress, ClosePress, Line, ModalBackground, Space } from "../common/commonStyled";
import { Ionicons, AntDesign } from '@expo/vector-icons'; 
import styled from "styled-components/native";
import { BlueBottomBtn } from "./BlueBottomBtn";
import { Platform } from "react-native";

const os = Platform.OS;

const ContinuePress = styled.Pressable`
      width:100%; height:55px; padding:0 20px;
`


export const SendWriteBottom_SurveyStart = ({aniBoxPositionY, closeSurveyStartModal, setSurveyQtype,setSurveyIsDoubleAnswer, openDoubleAnsCountSelect, qType, isDoubleAnswer, doubleAnsCount, openSurveyWriteModal}:any)=>{

    return (
        <ModalBackground>
            <BottomSelectAnimated
                style={[{ transform: [{ translateY: aniBoxPositionY }] }]}
            >
                <BottomSelectHeader>
                    <BottomSelTxt1>질문 추가</BottomSelTxt1>
                    <ClosePress onPress={closeSurveyStartModal}>
                        <Ionicons name="close" size={24} color="black" />
                    </ClosePress>
                </BottomSelectHeader>

                <BottomTxtPress onPress={()=>{setSurveyQtype('qType')}}>
                    <BottomSelTxt2>{qType}</BottomSelTxt2>
                    <AntDesign name="right" size={16} color="#9F9FA1" />
                </BottomTxtPress>

                {qType =='객관식' &&
                <BottomTxtPress onPress={()=>{setSurveyIsDoubleAnswer('isDoubleAnswer')}}>
                    <BottomSelTxt2>{isDoubleAnswer}</BottomSelTxt2>
                    <AntDesign name="right" size={16} color="#9F9FA1" />
                </BottomTxtPress>
                }

                {qType =='객관식' && isDoubleAnswer =='중복답변 가능' &&
                <BottomTxtPress onPress={openDoubleAnsCountSelect}>
                    <BottomSelTxt2>중복답변 갯수 {doubleAnsCount}개</BottomSelTxt2>
                    <AntDesign name="right" size={16} color="#9F9FA1" />
                </BottomTxtPress>
                }

                <Line color={colors.lightGrayLine}/>

                <Space height={15}/>
                <ContinuePress onPress={()=>{
                    closeSurveyStartModal();
                    setTimeout(openSurveyWriteModal, 1);
                }}>
                    <BlueBottomBtn text={'질문작성 시작'} status={'active'} style={{marginTop:2}}/>
                </ContinuePress>
                <Space height={os=='ios'?30:15}/>

            </BottomSelectAnimated>
        </ModalBackground>
    )
}

  