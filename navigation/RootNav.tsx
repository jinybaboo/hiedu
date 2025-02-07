import react, { useEffect, useState } from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import Tabs from "./Tabs";
import Stack from "./Stack";
import { useNavigation } from "@react-navigation/native";
import { Alert, AppState, BackHandler, Platform } from "react-native";
import { goAlarmContent, goBack, goHome, goHomeLetterContent, goSurveyList} from "../common/commonNaviFunc";
import { linkWeb, loginCheckAndSaveSendInfo } from "../common/commonExportFunc";
import { useAppDispatch } from "../store";
import messaging from '@react-native-firebase/messaging';
import { useSelector } from "react-redux";
import { getUmslogInsertDate } from "../common/commonData";
import { goAlarmList } from "../common/commonNaviFunc";
import { goHomeLetterList } from "../common/commonNaviFunc";
import styled from "styled-components/native";

const Nav = createNativeStackNavigator();

const RootNav = () => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();

    useEffect(()=>{
        const androidBackAction = () =>{
            const canGoBack = navigation.canGoBack();

            if(canGoBack){
                goBack(navigation);
            }else{
                //돌아갈수 없으면 종료시킴
                Alert.alert("종료", "앱을 종료 하시겠습니까?", [
                    {
                    text: "취소",
                    onPress: () => null,
                    style: "cancel"
                    },
                    { text: "확인", onPress: () => BackHandler.exitApp() }
                ]);
            }
            return true;
        }
        //안드로이드 백버튼 누를때 처리
        const backHandler = BackHandler.addEventListener('hardwareBackPress', androidBackAction);
        return () => {backHandler.remove();}
    }) //모든 동작에 반응하도록 [] 안넣어줌!


    const phone = useSelector((state:any)=>state.user.phone);
    
    useEffect(() => {
        //백그라운드 복귀 시 로그인 확인 !
        AppState.addEventListener('change', (nextAppState) => {
            if (nextAppState === 'active') {
                loginCheckAndSaveSendInfo(dispatch, phone);
            }
        });


         //앱이 켜져있을때 푸시알람 수신 처리
        const unsubscribe = messaging().onMessage(async (remoteMessage:any) => {
        const {title, body} = remoteMessage?.notification;

        Alert.alert( //alert 사용					
        title, body, [ //alert창 문구 작성				
                    {text: '취소', onPress: () => {}}, 
                    {text: '보기', onPress: () => { goToPageByPush(remoteMessage)}}, 
                ]				
            );					
        });
        return unsubscribe;
    }, []);


    // 앱이 백그라운드에 있을때(앱을 사용하지 않으나 활성화 되어있는 경우) 푸시 수신될 경우
    useEffect(()=>{
        const background =  messaging().setBackgroundMessageHandler(async (remoteMessage:any) => {
        });
        return background;
    },[]);


    //앱이 백그라운드에 있을때 사용자가 푸시알람을 눌렀을때 앱이 실행된뒤 호출되는 함수(페이지 전환 등)
    useEffect(()=>{
        const onNotiOpened =   messaging().onNotificationOpenedApp(async (remoteMessage:any) => {
            const category = remoteMessage?.data?.category;
            if(category!=undefined){
                goToPageByPush(remoteMessage)
            }
        });
            return onNotiOpened;
    },[]);

    // 앱이 꺼져있는 경우 사용자가 푸시알람을 눌렀을때 앱이 실행된뒤 호출되는 함수(페이지 전환 등)
    useEffect(()=>{
        messaging().getInitialNotification().then(async (remoteMessage) => {
            const category = remoteMessage?.data?.category;
            if(category!=undefined){
                goToPageByPush(remoteMessage)
            }
        });
    },[]);
   

    async function goToPageByPush(remoteMessage:any){
        loginCheckAndSaveSendInfo(dispatch, phone); //백그라운드 복귀 시 로그인 확인 !
        
        const {category, id, umslog_report_id} = remoteMessage?.data;
        const {insert_date} = await getUmslogInsertDate(id);
        const yyyymm = insert_date.replace("-","").substring(0,6);

        if(category=='notice'){
            goHome(navigation);
            setTimeout(()=>{
                goAlarmList(navigation, dispatch);
                // goAlarmContent(navigation, umslog_report_id, yyyymm);
            },500)
            
        }else if(category =='letter'){
            goHome(navigation);
            setTimeout(()=>{
                goHomeLetterList(navigation, dispatch);
                // goHomeLetterContent(navigation, umslog_report_id, yyyymm);
            },500)
            
        }else if(category=='survey'){
            goHome(navigation);
            setTimeout(()=>{
                goSurveyList(navigation, dispatch);
                // goSurveyContent(navigation, umslog_report_id, yyyymm);
            },500)
            
        }else{
            setTimeout(()=>{
                goHome(navigation);
            },500)
        }
    }


    
    return(
        <Nav.Navigator 
            screenOptions={{
                headerShown:false,
                animation:'slide_from_right',
            }}
        >
            <Nav.Screen name ="Tabs" component={Tabs} />
            <Nav.Screen name ="Stack" component={Stack} />
        </Nav.Navigator>
    )
}
export default RootNav;