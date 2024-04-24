import colors from "../common/commonColors";
import { BottomSelTxt1, BottomSelTxt2, BottomSelectAnimated, BottomSelectHeader, BottomTxtView, ClosePress, Line, ModalBackground, Space } from "../common/commonStyled";
import { Ionicons, AntDesign } from '@expo/vector-icons'; 
import styled from "styled-components/native";
import { BlueBottomBtn } from "./BlueBottomBtn";
import { Platform, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { convertUTCToKoreanTime, getWindowWidth, getYYYYMMDD_dot } from "../common/commonFunc";

const windowWidth = getWindowWidth();
const btmTxtInnerWidth1 = windowWidth-76 - 20;
const os = Platform.OS;

const ContinuePress = styled.Pressable`
      width:100%; height:55px; padding:0 20px;
`

const BottemTxtInnerRight1 = styled.View`
    width: ${btmTxtInnerWidth1}px; height: 100%; flex-direction: row; align-items: center; padding-left: 25px; 
`
const BottemTxtInnerRight2 = styled.View`
    width: ${btmTxtInnerWidth1 -150}px; height: 100%; flex-direction: row; align-items: center; padding-left: 25px; 
`
const DatePress = styled.Pressable`
    width: ${(btmTxtInnerWidth1/2)-24}px; height: 30px; background-color: #F1F2F4; border-radius: 4px;  flex-direction: row; align-items: center; padding-left: 8px;
` 
const WaveTxt = styled.Text`
    font-family: 'noto700'; font-size: 13px; line-height: 16px; color:${colors.textBlack}; padding:0 7px;
`
const DateTxt = styled.Text`
    font-family: 'noto400'; font-size: 13px; line-height: 16px; color:${colors.placeholder}; letter-spacing: -0.2px; margin-top: 2px; padding-left: 8px;
`
const PhoneNumPress = styled.Pressable`
    width: 170px; height: 30px; background-color: #F1F2F4; border-radius: 4px;  flex-direction: row; align-items: center; padding-left: 8px;
` 
const SwitchToggle = styled.Switch``;

export const SendWriteBottom_FinalSend = ({aniBoxPositionY, closeFinalSendModal, openSendPhoneNumberPicker, startDate, endDate, setIsShowDatePicker, setDateKind, 
    duplication, setDuplication, isOpen, setIsOpen, sendPhoneNumber, checkFinalSendData, pageKor, sendBtnDisabled, isReservation, setIsReservation,
    reserveDate, reserveTime, setIsShowReserveDatePicker, setIsShowReserveTimePicker}:any)=>{

    const startDateStr = getYYYYMMDD_dot(startDate);
    const endDateStr = endDate!=null && getYYYYMMDD_dot(endDate);
    const reserveDateStr = reserveDate!=null && getYYYYMMDD_dot(reserveDate);
    const reserveTimeStr = reserveTime!=null && convertUTCToKoreanTime(reserveTime);

    
    return (
        <ModalBackground>
            <BottomSelectAnimated
                style={[{ transform: [{ translateY: aniBoxPositionY }] }]}
            >
                <BottomSelectHeader>
                    <BottomSelTxt1>발신 설정</BottomSelTxt1>
                    <ClosePress onPress={closeFinalSendModal}>
                        <Ionicons name="close" size={24} color="black" />
                    </ClosePress>
                </BottomSelectHeader>

                {pageKor =='설문조사' &&
                <BottomTxtView>
                    <BottomSelTxt2>설문기간</BottomSelTxt2>
                    <BottemTxtInnerRight1>
                        <DatePress
                            onPress={()=>{
                                setIsShowDatePicker(true);
                                setDateKind('startDate');
                            }}
                        >
                            <FontAwesome5 name="calendar-alt" size={13} color="black" />
                            <DateTxt>{startDateStr}</DateTxt>
                        </DatePress>

                        <WaveTxt>~</WaveTxt>

                        <DatePress
                            onPress={()=>{
                                setIsShowDatePicker(true);
                                setDateKind('endDate');
                            }}
                        >
                            <FontAwesome5 name="calendar-alt" size={13} color="black" />
                            <DateTxt>{endDateStr}</DateTxt>
                        </DatePress>
                    </BottemTxtInnerRight1>
                </BottomTxtView>
                }

                <BottomTxtView>
                    <BottomSelTxt2>발신번호</BottomSelTxt2>
                    <BottemTxtInnerRight1 style={{justifyContent:'flex-end'}}>
                        <PhoneNumPress onPress={openSendPhoneNumberPicker}>
                            <DateTxt>{sendPhoneNumber}</DateTxt>
                        </PhoneNumPress>
                    </BottemTxtInnerRight1>
                </BottomTxtView>


                <BottomTxtView>
                    <BottomSelTxt2>중복번호 1번만 보내기</BottomSelTxt2>
                    <BottemTxtInnerRight2 style={{justifyContent:'flex-end'}}>
                        <SwitchToggle 
                            trackColor={{ false: '#C5C5C5', true: '#E4DEFF' }}
                            thumbColor={duplication ? colors.mainBlue : '#F1F2F4'}
                            ios_backgroundColor="#C5C5C5"
                            value={duplication} 
                            onValueChange={()=>{setDuplication(!duplication)}} 
                        />
                    </BottemTxtInnerRight2>
                </BottomTxtView>

                <BottomTxtView>
                    <BottomSelTxt2>공개여부 선택</BottomSelTxt2>
                    <BottemTxtInnerRight2 style={{justifyContent:'flex-end'}}>
                        <SwitchToggle 
                            trackColor={{ false: '#C5C5C5', true: '#E4DEFF' }}
                            thumbColor={isOpen ? colors.mainBlue : '#F1F2F4'}
                            ios_backgroundColor="#C5C5C5"
                            value={isOpen} 
                            onValueChange={()=>{setIsOpen(!isOpen)}} 
                        />
                    </BottemTxtInnerRight2>
                </BottomTxtView>

                <BottomTxtView>
                    <BottomSelTxt2>예약발송</BottomSelTxt2>
                    <BottemTxtInnerRight2 style={{justifyContent:'flex-end'}}>
                        <SwitchToggle 
                            trackColor={{ false: '#C5C5C5', true: '#E4DEFF' }}
                            thumbColor={isReservation ? colors.mainBlue : '#F1F2F4'}
                            ios_backgroundColor="#C5C5C5"
                            value={isReservation} 
                            onValueChange={()=>{setIsReservation(!isReservation)}} 
                        />
                    </BottemTxtInnerRight2>
                </BottomTxtView>

                {isReservation &&
                <BottomTxtView>
                    <BottomSelTxt2>예약일시</BottomSelTxt2>
                    <BottemTxtInnerRight1>
                        <DatePress
                            onPress={()=>{
                                setIsShowReserveDatePicker(true);
                            }}
                        >
                            <FontAwesome5 name="calendar-alt" size={13} color="black" />
                            <DateTxt>{reserveDateStr}</DateTxt>
                        </DatePress>

                        <WaveTxt></WaveTxt>

                        <DatePress
                            onPress={()=>{
                                setIsShowReserveTimePicker(true);
                            }}
                            style={{position:'relative'}}
                        >
                            <AntDesign name="clockcircleo" size={13} color="black" />
                            <DateTxt
                                style={{width:'80%', position:'absolute', left:22, top:6 }}
                            >{reserveTimeStr}</DateTxt>
                        </DatePress>
                    </BottemTxtInnerRight1>
                </BottomTxtView>
                }
               

                <Line color={colors.lightGrayLine}/>

                <Space height={15}/>
                <ContinuePress 
                    disabled = {sendBtnDisabled}
                    onPress={checkFinalSendData}
                >
                    <BlueBottomBtn text={'발송하기'} status={'active'} style={{marginTop:2}}/>
                </ContinuePress>
                <Space height={os=='ios'?30:15}/>

            </BottomSelectAnimated>
        </ModalBackground>
    )
}

  