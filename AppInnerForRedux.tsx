import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RootNav from './navigation/RootNav';
import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { useAppDispatch } from './store';
import { linkWeb, loginCheckAndSaveSendInfo } from './common/commonExportFunc';
import { useSelector } from 'react-redux';
import VersionCheck from 'react-native-version-check';
import { Linking, Platform } from 'react-native';
import styled from "styled-components/native";
import { getWindowHeight, getWindowWidth } from './common/commonFunc';
import { Space } from './common/commonStyled';
import colors from './common/commonColors';
import { KakaoBtn } from './components/KakaoBtn';

// 페이지 이동을 위한 네이게이터 생성 및 제작
const NativeStack = createNativeStackNavigator();
const windowWidth = getWindowWidth();
const windowHeight = getWindowHeight();
const os = Platform.OS;

const AlertView = styled.View`
    width: 100%; height:${windowHeight}px; background: rgba(0, 0, 0, 0.50); position: absolute; bottom:0; display: flex; align-items: center; justify-content:center; z-index: 9999;
`
const AlertBox = styled.View`
    width: ${windowWidth-40}px; border-radius:8px; background: #FFF; padding:26px 24px 18px; margin: 0 auto;
`
const AlertTxt = styled.Text`
    color: #000; text-align: center; font-size: 16px; font-weight: 400; line-height: 24px;
`
const BtnsView = styled.View`
    flex-direction: row; justify-content: space-between;
`
const AlertBtn = styled.Pressable`
    width: 48%; height: 50px; line-height:50px; border-radius: 8px; background-color: ${colors.buttonBlue};
`
const AlertBtnTxt = styled.Text`
    font-family: 'noto700'; font-size: 16px; line-height:19px; color:#FFF; text-align: center; line-height: 50px; 
`
const AlertBtn2 = styled(AlertBtn)`
    background-color: #FFF; border-width: 1px; border-color: ${colors.dateGray};
`
const AlertBtnTxt2 = styled(AlertBtnTxt)`
    color:${colors.dateGray};
`


let customFonts = {
    'noto100': require('./assets/fonts/NotoSansKR_100Thin.ttf'),
    'noto300': require('./assets/fonts/NotoSansKR_300Light.ttf'),
    'noto400': require('./assets/fonts/NotoSansKR_400Regular.ttf'),
    'noto500': require('./assets/fonts/NotoSansKR_500Medium.ttf'),
    'noto700': require('./assets/fonts/NotoSansKR_700Bold.ttf'),
    'noto900': require('./assets/fonts/NotoSansKR_900Black.ttf'),
    'tit300': require('./assets/fonts/TitilliumWeb-Light.ttf'),
    'tit900': require('./assets/fonts/TitilliumWeb-Black.ttf'),
};

const AppInnerForRedux:any = () => {
    const dispatch = useAppDispatch();
    
    const [isAppReady, setAppReady] = useState(false);
    const [showUpdate, setShowUpdate] = useState<any>(false);


    async function compareVersion(){
        const storeVersion =  os === 'ios'?await VersionCheck.getLatestVersion({provider: 'appStore'}) : await VersionCheck.getLatestVersion({provider: 'playStore'});
        const currentVersion = VersionCheck.getCurrentVersion();
        setShowUpdate(storeVersion!==currentVersion);
    }

    async function prepare(){
        await loginCheckAndSaveSendInfo(dispatch, phone);
        await Font.loadAsync(customFonts);   
        setAppReady(true);
    }

    const phone = useSelector((state:any)=>state.user.phone);
    useEffect(()=>{
        compareVersion();
        prepare();
    },[]);

    function openPlayStore(){
        let url = os=='ios'?'https://apps.apple.com/us/app/%ED%95%98%EC%9D%B4%EC%97%90%EB%93%80/id6499091336':'market://details?id=com.hiedu';
        Linking.openURL(url);
    }
    
   
    if(!isAppReady){return;}

    return (
        <NavigationContainer>
           <RootNav />

           {showUpdate &&
            <AlertView>
                <AlertBox>
                    <AlertTxt>{`앱이 업데이트 되었습니다.\n업데이트 후 이용해 주세요`}</AlertTxt>
                    <Space height={20}/>

                    <BtnsView>
                        <AlertBtn2 
                            onPress={()=>{setShowUpdate(false)}}
                        >
                            <AlertBtnTxt2>다음에</AlertBtnTxt2>
                        </AlertBtn2>

                        <AlertBtn onPress={openPlayStore}>
                            <AlertBtnTxt>업데이트</AlertBtnTxt>
                        </AlertBtn>
                    </BtnsView>
                </AlertBox>
            </AlertView>
            }

            {/* <KakaoBtn /> */}
        </NavigationContainer>
    )
}

export default AppInnerForRedux;

