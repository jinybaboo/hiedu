import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RootNav from './navigation/RootNav';
import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { useAppDispatch } from './store';
import { loginCheckAndSaveSendInfo } from './common/commonExportFunc';
import { useSelector } from 'react-redux';

// 페이지 이동을 위한 네이게이터 생성 및 제작
const NativeStack = createNativeStackNavigator();

let customFonts = {
    'noto100': require('./assets/fonts/NotoSansKR_100Thin.ttf'),
    'noto300': require('./assets/fonts/NotoSansKR_300Light.ttf'),
    'noto400': require('./assets/fonts/NotoSansKR_400Regular.ttf'),
    'noto500': require('./assets/fonts/NotoSansKR_500Medium.ttf'),
    'noto700': require('./assets/fonts/NotoSansKR_700Bold.ttf'),
    'noto900': require('./assets/fonts/NotoSansKR_900Black.ttf'),
};

const AppInnerForRedux:any = () => {
    const dispatch = useAppDispatch();
    const [isAppReady, setAppReady] = useState(false);

    const phone = useSelector((state:any)=>state.user.phone);
    useEffect(()=>{
        async function prepare(){
            await loginCheckAndSaveSendInfo(dispatch, phone);
            await Font.loadAsync(customFonts);   
            setAppReady(true);
        }
        prepare();
    },[])

     
   
   
    if(!isAppReady){return;}

    return (
        <NavigationContainer>
           <RootNav />
        </NavigationContainer>
    )
}

export default AppInnerForRedux;

