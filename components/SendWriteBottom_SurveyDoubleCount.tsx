import colors from "../common/commonColors";
import { BottomSelTxt1, BottomSelTxt2, BottomSelectAnimated, BottomSelectHeader, BottomTxtPress, ClosePress, Line, ModalBackground, Space } from "../common/commonStyled";
import { Platform } from "react-native";

const os = Platform.OS;


export const SendWriteBottom_SurveyDoubleCount = ({aniBoxPositionY, setDoubleCountData, doubleAnsCount}:any)=>{
    return (
        <ModalBackground>
            <BottomSelectAnimated
                style={[{ transform: [{ translateY: aniBoxPositionY }] }]}
            >
                <BottomSelectHeader>
                    <BottomSelTxt1>중복 답변 선택</BottomSelTxt1>
                </BottomSelectHeader>

                <BottomTxtPress onPress={()=>{setDoubleCountData(2)}} style={{height:40}}>
                    <BottomSelTxt2 style={doubleAnsCount==2 && {fontFamily:'noto500'}}> 2개</BottomSelTxt2>
                </BottomTxtPress>
                <BottomTxtPress onPress={()=>{setDoubleCountData(3)}} style={{height:40}}>
                    <BottomSelTxt2 style={doubleAnsCount==3 && {fontFamily:'noto500'}}> 3개</BottomSelTxt2>
                </BottomTxtPress>
                <BottomTxtPress onPress={()=>{setDoubleCountData(4)}} style={{height:40}}>
                    <BottomSelTxt2 style={doubleAnsCount==4 && {fontFamily:'noto500'}}> 4개</BottomSelTxt2>
                </BottomTxtPress>
                <BottomTxtPress onPress={()=>{setDoubleCountData(5)}} style={{height:40}}>
                    <BottomSelTxt2 style={doubleAnsCount==5 && {fontFamily:'noto500'}}> 5개</BottomSelTxt2>
                </BottomTxtPress>
                <BottomTxtPress onPress={()=>{setDoubleCountData(6)}} style={{height:40}}>
                    <BottomSelTxt2 style={doubleAnsCount==6 && {fontFamily:'noto500'}}> 6개</BottomSelTxt2>
                </BottomTxtPress>
                <BottomTxtPress onPress={()=>{setDoubleCountData(7)}} style={{height:40}}>
                    <BottomSelTxt2 style={doubleAnsCount==7 && {fontFamily:'noto500'}}> 7개</BottomSelTxt2>
                </BottomTxtPress>
                <BottomTxtPress onPress={()=>{setDoubleCountData(7)}} style={{height:40}}>
                    <BottomSelTxt2 style={doubleAnsCount==7 && {fontFamily:'noto500'}}> 8개</BottomSelTxt2>
                </BottomTxtPress>
                <BottomTxtPress onPress={()=>{setDoubleCountData(9)}} style={{height:40}}>
                    <BottomSelTxt2 style={doubleAnsCount==9 && {fontFamily:'noto500'}}> 9개</BottomSelTxt2>
                </BottomTxtPress>
                <BottomTxtPress onPress={()=>{setDoubleCountData(10)}} style={{height:40}}>
                    <BottomSelTxt2 style={doubleAnsCount==10 && {fontFamily:'noto500'}}> 10개</BottomSelTxt2>
                </BottomTxtPress>


                <Line color={colors.lightGrayLine}/>

                <Space height={15}/>
                <Space height={os=='ios'?30:15}/>

            </BottomSelectAnimated>
        </ModalBackground>
    )
}

  