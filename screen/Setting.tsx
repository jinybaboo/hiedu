import react, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { PaddingView, SafeBasicView, Space } from "../common/commonStyled";
import colors from "../common/commonColors";
import { useNavigation } from "@react-navigation/native";
import { HeaderCustom } from "../components/HeaderCustom";
import { Alert, Platform } from "react-native";
import DeviceInfo, { getUniqueId, getManufacturer }  from 'react-native-device-info';
import { getMyMemberInfo, updateSendPushOn } from "../common/commonData";

const os = Platform.OS;

const SettingTitle = styled.Text`
    font-family: 'noto400'; font-size: 18px; line-height:21px; color:${colors.textBlack}; margin-top: 35px;
`
const SettingBox = styled.View`
    width:100%; border-width: 1px; border-color: ${colors.boxBorder}; border-radius: 15px; padding:25px; margin-top: 15px; 
`
const SettingBoxInner = styled.View`
    flex-direction: row; justify-content: space-between;
`
const SettingTxt1 = styled.Text`
    font-family: 'noto400'; font-size: 14px; line-height:19px; color:${colors.textBlack}; letter-spacing: -0.5px;
`
const SettingTxt2 = styled.Text`
    font-family: 'noto500'; font-size: 16px; line-height:20px; color:${colors.textBlack}; letter-spacing: -0.5px;
`
const SwitchToggleBox = styled.View`
    margin-bottom: -8px;  margin-top:${os==='ios'?-5:-4}px; 
`
const SwitchToggle = styled.Switch` 
    /* height:17px; margin-top:${os==='ios'?-6:2}px; */
`;

export const Setting = () =>{

    const [isPushOn, setIsPushOn] = useState(true);

    const [appName, setAppName]= useState('');
    const [appVer, setAppVer]= useState('');
    const [model, setModel]= useState('');
    const [deviceVer, setDeviceVer]= useState('');

    const changeSwitch = async () =>{
        setIsPushOn(!isPushOn);
        await updateSendPushOn(isPushOn?'0':'1');
    }

    async function getData(){
        const {isPushOn} = await getMyMemberInfo();
        setIsPushOn(isPushOn==1);
        if(isPushOn==0){
            Alert.alert( //alert 사용							
                '안내', 'PUSH 알람 수신이 꺼져있습니다.\n 알람을 켜시겠습니까?', [ //alert창 문구 작성						
                    {text: '취소', onPress: () => {}}, //alert 버튼 작성					
                    {text: '확인', onPress: async () => {
                        await updateSendPushOn('1');
                        setIsPushOn(true);
                    }}, //alert 버튼 작성					
                ]						
            );							
        }
    } 


    useEffect(()=>{
        let appName = DeviceInfo.getApplicationName();
        setAppName(appName);

        let appVersion = DeviceInfo.getVersion();
        setAppVer(appVersion);

        let model = DeviceInfo.getModel();
        setModel(model);

        let systemName = DeviceInfo.getSystemName();
        let systemVersion = DeviceInfo.getSystemVersion();
        setDeviceVer(systemName+' '+systemVersion)
        getData();
       
        
      
    },[])

    return (
        <SafeBasicView>
            <HeaderCustom title={'설정'} />
            <PaddingView>
                <SettingTitle>알림설정</SettingTitle>

                <SettingBox>
                    <SettingBoxInner>
                        <SettingTxt1>PUSH 알람 수신</SettingTxt1>
                        <SwitchToggleBox>
                            <SwitchToggle 
                                trackColor={{ false: '#C5C5C5', true: '#E4DEFF' }}
                                thumbColor={isPushOn ? colors.mainBlue : '#F1F2F4'}
                                ios_backgroundColor="#C5C5C5"
                                value={isPushOn} 
                                onValueChange={changeSwitch} 
                            />
                        </SwitchToggleBox>
                    </SettingBoxInner>
                </SettingBox>

                <SettingTitle>앱 정보</SettingTitle>
                <SettingBox>
                    <SettingBoxInner>
                        <SettingTxt1>앱이름</SettingTxt1>
                        <SettingTxt2>{appName}</SettingTxt2>
                    </SettingBoxInner>
                    <Space height={18}/>
                    <SettingBoxInner>
                        <SettingTxt1>현재버전</SettingTxt1>
                        <SettingTxt2>{appVer}</SettingTxt2>
                    </SettingBoxInner>
                </SettingBox>


                <SettingTitle>디바이스 정보</SettingTitle>
                <SettingBox>
                    <SettingBoxInner>
                        <SettingTxt1>모델명</SettingTxt1>
                        <SettingTxt2>{model}</SettingTxt2>
                    </SettingBoxInner>
                    <Space height={18}/>
                    <SettingBoxInner>
                        <SettingTxt1>OS 정보</SettingTxt1>
                        <SettingTxt2>{deviceVer}</SettingTxt2>
                    </SettingBoxInner>
                </SettingBox>


            </PaddingView>
        </SafeBasicView>
    )
}