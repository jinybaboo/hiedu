import react, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { HeaderSpaceForAndroid, PaddingView, SafeBasicView, Space } from "../common/commonStyled";
import colors from "../common/commonColors";
import { UnReadBox } from "../components/UnReadBox";
import { getWindowHeight } from "../common/commonFunc";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../store";
import React from "react";
import { Ionicons } from '@expo/vector-icons'; 
import { goSendWrite, goSetting, goTest } from "../common/commonNaviFunc";
import { Shadow } from "react-native-shadow-2";

const windowHeight = getWindowHeight();

const SendHead = styled.View`
    width: 100%; height:210px; border-bottom-left-radius: 20px; border-bottom-right-radius:20px; overflow: hidden;
`
const SendHeadImg = styled.ImageBackground`
     width: 100%; height:210px;
`
const SendHeadBox = styled.View`
     flex-direction:row; width:100%; height:50px; justify-content:space-between; align-items: center; padding:25px 20px 0;
`
const HomeLogo = styled.Image`
    width:120px; 
`
const SettingPress = styled.Pressable`
    width:50px; height:50px;justify-content: center; align-items: flex-end; justify-content: center; padding-top: 2px;
`
const SendHeadBox2 = styled.View`
    align-items: center; height: 100%; 
`
const SendHeadTxt = styled.Text`
    font-family: 'noto500'; font-size: 28px; line-height: 31px; color:#FFFFFF; padding-top: 45px;
`

const BtnsView = styled.View`
    flex-wrap:wrap; flex-direction: row; margin-top:10px ; padding: 0 4%;
`
const BtnsBoxWrap = styled.View`
    width:50%; align-items: center;
`
const BtnsPress = styled.Pressable`
    width: 140px; height:190px; align-items: center; justify-content: center;
`
const BtnsImg = styled.Image`
    width:100px; height:100px;
`
const BtnsTxt = styled.Text`
 width:99%; text-align:center; height:18px; font-family: 'noto500'; font-size: 15px; line-height: 18px; color:${colors.textBlack}; letter-spacing: -0.4px; margin-top: 3px;
`

export const SendMain = () =>{
    const navigation:any = useNavigation();
    const dispatch = useAppDispatch();

    const isFocused = useIsFocused();

    const [userData, setUserData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);


    return (
        <SafeBasicView >
            <HeaderSpaceForAndroid />
            <SendHead>
                <SendHeadImg source={require('../assets/icons/sendBack.jpg')}>
                    <SendHeadBox>
                        <HomeLogo 
                            resizeMode="contain"
                            source={require('../assets/icons/hiedulogo.png')}
                        />
                        
                        <SettingPress onPress={()=>goSetting(navigation)}>
                            <Ionicons name="settings-outline" size={22} color="white" />
                        </SettingPress>
                    </SendHeadBox>
                    <SendHeadBox2>
                        <SendHeadTxt>발송하기</SendHeadTxt>
                    </SendHeadBox2>
                </SendHeadImg>
            </SendHead>

            <BtnsView>
                <BtnsBoxWrap>
                    <Shadow		
                        style={{
                            borderRadius:10, 
                            backgroundColor:'#FFF',
                        }}	
                        distance={10} 
                        startColor={'#f0f0f0'} 
                        endColor={'#FFFFFF'} 
                        offset={[2, 6]}
                    >	
                        <BtnsPress onPress={()=>{goSendWrite(navigation, 'notice', 'none')}}>
                            <BtnsImg 
                                resizeMode="contain"
                                source={require('../assets/icons/alarm.png')}
                            />
                            <BtnsTxt>알림장</BtnsTxt>
                        </BtnsPress>
                    </Shadow>
                    <Space height={35}/>
                </BtnsBoxWrap>


                <BtnsBoxWrap>
                    <Shadow		
                        style={{
                            borderRadius:10, 
                            backgroundColor:'#FFF',
                        }}	
                        distance={10} 
                        startColor={'#f0f0f0'} 
                        endColor={'#FFFFFF'} 
                        offset={[2, 6]}
                    >	
                    <BtnsPress onPress={()=>{goSendWrite(navigation, 'letter', 'none')}}>
                        <BtnsImg 
                            resizeMode="contain"
                            source={require('../assets/icons/homeLetter.png')}
                        />
                        <BtnsTxt>가정통신문</BtnsTxt>
                    </BtnsPress>
                    </Shadow>
                    <Space height={35}/>
                </BtnsBoxWrap>

                <BtnsBoxWrap>
                    <Shadow		
                        style={{
                            borderRadius:10, 
                            backgroundColor:'#FFF',
                        }}	
                        distance={10} 
                        startColor={'#f0f0f0'} 
                        endColor={'#FFFFFF'} 
                        offset={[4, 6]}
                    >	
                        <BtnsPress onPress={()=>{goSendWrite(navigation, 'survey', 'none')}}>
                            <BtnsImg 
                                resizeMode="contain"
                                source={require('../assets/icons/survey.png')}
                            />
                            <BtnsTxt>설문조사</BtnsTxt>
                        </BtnsPress>
                    </Shadow>
                </BtnsBoxWrap>

                <BtnsBoxWrap>
                    <Shadow		
                        style={{
                            borderRadius:10, 
                            backgroundColor:'#FFF',
                        }}	
                        distance={10} 
                        startColor={'#f0f0f0'} 
                        endColor={'#FFFFFF'} 
                        offset={[4, 6]}
                    >	
                        <BtnsPress onPress={()=>{goSendWrite(navigation, 'board', 'none')}}>
                            <BtnsImg 
                                resizeMode="contain"
                                source={require('../assets/icons/board.png')}
                            />
                            <BtnsTxt>공지사항</BtnsTxt>
                        </BtnsPress>
                    </Shadow>
                </BtnsBoxWrap>

            </BtnsView>

        </SafeBasicView>
    )
}