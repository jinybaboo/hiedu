import colors from "../common/commonColors";
import { BottomSelTxt1, BottomSelTxt1_1, BottomSelectAnimated, BottomSelectHeader, ClosePress, Line, ModalBackground, Space } from "../common/commonStyled";
import { Ionicons, Entypo } from '@expo/vector-icons'; 
import styled from "styled-components/native";
import { BlueBottomBtn } from "./BlueBottomBtn";
import { Keyboard, Platform, Pressable, View } from "react-native";
import { getWindowHeight, getWindowWidth } from "../common/commonFunc";

const windowHeight = getWindowHeight();
const windowWidth = getWindowWidth();
const os = Platform.OS;

const ContinuePress = styled.Pressable`
      width:100%; height:55px; padding:0 20px;
`

const BottomSelTxt1View = styled.View`
   
`
const SurveyScrollView = styled.ScrollView`
    max-height: 500px; padding: 15px 20px;
`
const QueView = styled.View`
    
`
const SurveyTxt1 = styled.Text`
    font-family: 'noto400'; font-size: 14px; line-height: 17px; color:${colors.textBlack}; letter-spacing: -0.2px;
`
const SurveyInputTxtView = styled.View`
    width: 100%; height:35px; background-color: #F1F2F4; border-radius: 7px; align-items: center; padding:0 10px; flex-direction: row; justify-content: space-between;
`
const SurveyInputTxt = styled.Text`
    width:${windowWidth-40-40}px; font-family: 'noto400'; font-size: 14px; line-height: 17px; color:${colors.textBlack}; letter-spacing: -0.2px; margin-top: 2px;
`
const SurveyInputPlaceholderTxt = styled(SurveyInputTxt)`
    color:${colors.placeholder}; 
`
const AddAnswerPress = styled.TouchableOpacity`
    width: 100%; height:35px; background-color: #CFD2D9; border-radius: 7px; justify-content: center; align-items: center;
`
const SurveyInputView = styled.View`
   width:100%; height:100%; position: absolute; flex:1; background-color:rgba(0,0,0,0.7);
`
const SurveyInputBox = styled.View`
     width:${windowWidth-40}px; height:85px; border-radius: 10px; background-color: #FFF; position:absolute; top:50px; left:20px; padding: 15px;
`
const SurveyInputBoxTxt = styled.Text`
    font-family: 'noto500'; font-size: 12px; line-height: 17px; color:${colors.placeholder}; letter-spacing: -0.2px; margin-top: 1.5px;
`
const SurveyInput = styled.TextInput`
     width:100%; height:35px; border-radius: 10px; background-color: #FFF; margin-top: 10px;
`
const SurveyInputClosePress = styled.Pressable`
    position: absolute;  right:5px; top:5px; padding:5px;
`




export const SendWriteBottom_SurveyWrite = ({aniBoxPositionY, closeSurveyWriteModal, surveyArr, qType, isDoubleAnswer, currentWriteSurveyObj, writeSurveyInput, 
    currentWriteSurveyAnsArr, setCurrentWriteSurveyAnsArr, finishWriteSurveyQtn, isShowSurveyWriteInput, writeSurveyInputType, surveyWriteInputRef,
    onChangeSurveyWrite, onSubmitSurveyWrite, surveyInputTxt, setIsShowSurveyWriteInput}:any)=>{


    function removeAnswer(idx:number){
        const newAnswerArr = [...currentWriteSurveyAnsArr];
        newAnswerArr.splice(idx, 1);
        setCurrentWriteSurveyAnsArr(newAnswerArr);
    }

    function addAnswer(){
        const newAnswerArr = [...currentWriteSurveyAnsArr, ...['']];
        setCurrentWriteSurveyAnsArr(newAnswerArr);
    }


    return (
        <ModalBackground>
            <BottomSelectAnimated
                style={[{ transform: [{ translateY: aniBoxPositionY }] }]}
            >
                <BottomSelectHeader>
                    <BottomSelTxt1View>
                        <BottomSelTxt1>질문 추가</BottomSelTxt1>
                        {qType=='주관식'?
                        <BottomSelTxt1_1>{qType}</BottomSelTxt1_1>
                        :
                        <BottomSelTxt1_1>{qType}, {isDoubleAnswer}</BottomSelTxt1_1>
                        }
                    </BottomSelTxt1View>
                    
                    <ClosePress onPress={closeSurveyWriteModal}>
                        <Ionicons name="close" size={24} color="black" />
                    </ClosePress>
                </BottomSelectHeader>

                <SurveyScrollView>
                    <QueView>
                        <SurveyTxt1>질문 {surveyArr.length+1}</SurveyTxt1>
                        <Space height={5}/>
                        <SurveyInputTxtView>
                            {currentWriteSurveyObj.question.length==0?
                            <Pressable onPress={()=>{writeSurveyInput('question', currentWriteSurveyObj.question)}}>
                                <SurveyInputPlaceholderTxt>질문을 입력하세요.</SurveyInputPlaceholderTxt>
                            </Pressable>
                            :
                            <Pressable onPress={()=>{writeSurveyInput('question', currentWriteSurveyObj.question)}}>
                                <SurveyInputTxt numberOfLines={1}>{currentWriteSurveyObj.question}</SurveyInputTxt> 
                            </Pressable>
                            }
                        </SurveyInputTxtView>
                    </QueView>
                    
                    <Space height={15}/>
                    {qType=='객관식' &&
                    <>
                    <Line color={colors.lightGrayLine}/>
                    <Space height={15}/>

                    <QueView>
                        <SurveyTxt1>답변</SurveyTxt1>
                        {currentWriteSurveyAnsArr.map((item:any, idx:number)=>{
                            return (
                                <View key={'ans_'+idx}>
                                    <Space height={10}/>
                                    <SurveyInputTxtView>
                                        {item.length==0?
                                        <Pressable onPress={()=>{writeSurveyInput(idx, item)}}>
                                            <SurveyInputPlaceholderTxt>답변{idx+1}을(를) 입력하세요.</SurveyInputPlaceholderTxt>
                                        </Pressable>
                                        :
                                        <Pressable onPress={()=>{writeSurveyInput(idx, item)}}>
                                            <SurveyInputTxt SurveyInputTxt numberOfLines={1}>{item}</SurveyInputTxt>
                                        </Pressable>
                                        }
                                        {idx>1 &&
                                        <Pressable style={{padding:7}} onPress={()=>{removeAnswer(idx)}}>
                                            <Entypo name="circle-with-minus" size={16} color="#CFD2D9" />
                                        </Pressable>}
                                    </SurveyInputTxtView>
                                </View>
                            )})
                        }


                    </QueView>

                    <Space height={10}/>
                    <AddAnswerPress onPress={addAnswer}>
                        <Entypo name="plus" size={22} color="#FFFFFF" />
                    </AddAnswerPress>
                    <Space height={20}/>
                    </>
                    }


                    
                </SurveyScrollView>

                <Line color={colors.lightGrayLine}/>

                <Space height={15}/>
                <ContinuePress onPress={finishWriteSurveyQtn}>
                    <BlueBottomBtn text={'질문작성 완료'} status={'active'} style={{marginTop:2}}/>
                </ContinuePress>
                <Space height={os=='ios'?30:15}/>

            </BottomSelectAnimated>

            <SurveyInputView style={isShowSurveyWriteInput?{display:'block'}:{display:'none'}}>
                <SurveyInputBox>
                    <SurveyInputBoxTxt>{writeSurveyInputType=='question'?'질문을 작성해 주세요':'답변 '+(writeSurveyInputType+1)+' 작성'}</SurveyInputBoxTxt>
                    <SurveyInput
                        placeholderTextColor={colors.placeholder}
                        style={{textAlignVertical:'top'}}	
                        maxLength ={50}
                        ref = {surveyWriteInputRef}
                        onChangeText={onChangeSurveyWrite} 
                        onSubmitEditing={onSubmitSurveyWrite}
                        value={surveyInputTxt}
                    />
                    <SurveyInputClosePress 
                        onPress={(()=>{
                            setIsShowSurveyWriteInput(false); 
                            Keyboard.dismiss();
                        })}
                    >
                        <Ionicons name="close-outline" size={18} color={colors.placeholder} />
                    </SurveyInputClosePress>
                </SurveyInputBox>
            </SurveyInputView>


        </ModalBackground>
    )
}

  