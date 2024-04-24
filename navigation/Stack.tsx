import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons'; 
import colors from "../common/commonColors";
import { Notification } from "../screen/Notification";
import { goBack } from "../common/commonNaviFunc";
import { LoginAgree } from "../screen/LoginAgree";
import { LoginAgree2} from "../screen/LoginAgree2";
import { Agreement } from "../screen/Agreement";
import { Privacy } from "../screen/Privacy";
import { UnreadAlarm } from "../screen/UnreadAlarm";
import { UnreadHomeLetter } from "../screen/UnreadHomeLetter";
import { UnreadSurvey } from "../screen/UnreadSurvey";
import { SearchResult } from "../screen/SearchResult";
import { AlarmList } from "../screen/AlarmList";
import { AlarmContnet } from "../screen/AlarmContent";
import { HomeLetterList } from "../screen/HomeLetterList";
import { HomeLetterContent } from "../screen/HomeLetterContent";
import { SurveyList } from "../screen/SurveyList";
import { SurveyContent } from "../screen/SurveyContent";
import { LunchList } from "../screen/LunchList";
import { TimeTableList } from "../screen/TimeTableList";
import { ScheduleCalendar } from "../screen/ScheduleCalendar";
import { Setting } from "../screen/Setting";
import { BoardContent } from "../screen/BoardContent";
import { SendWrite } from "../screen/SendWrite";
import { SendList } from "../screen/SendList";
import { SendListContent } from "../screen/SendListContent";



// 페이지 이동을 위한 네이게이터 생성 및 제작
const NativeStack = createNativeStackNavigator();



//네비게이터 스크린의 네임을, 향후 props에서 navigate 함수를 이용하여 페이지 이동시에 사용한다!!!!!
const Stack = () =>{
    const navigation = useNavigation();
   

    return (
        <NativeStack.Navigator 
            initialRouteName="LoginAgree"
            
            screenOptions={{
                headerTintColor:"#000000",
                headerTitleAlign:"center",
                headerBackTitleVisible:false,
                headerTitleStyle:{
                    fontSize:18,
                    fontFamily:'noto500',
                },
                headerShadowVisible:false, //헤더 밑줄 없애기
               
                //gestureEnabled: true,  // 이곳에 False 설정시 모든 페이지의 화면에 대해 제스쳐를 금지한다.(IOS 슬라이드로 뒤로가기 포함)
                
                // headerLeft:()=>(
                //     // <Pressable onPress={()=>{navigation.goBack()}}>
                //     <Pressable onPress={()=>{goBack(navigation)}} style={{width:50, height:40}}>
                //         {/* <Image source={require('../assets/icons/backArrow.png')} style={{width:16,height:20,marginTop:10}}/> */}
                //         <Ionicons style={{marginTop:6}} name="chevron-back" size={28} color="#000000" />
                //     </Pressable>
                // )
            }}
        >

            {/* 헤더는 커스텀 적용함, 위의 헤더세팅은 적용 안됨 */}
            <NativeStack.Screen 
                name="LoginAgree"
                component={LoginAgree}
                options={{
                    headerShown:false,
                    animation:'none',
                }}
            />

            <NativeStack.Screen 
                name="Agreement"
                component={Agreement}
                options={{
                    headerShown:false,
                    animation:'slide_from_right',
                    presentation:'card',
                    //presentation:'modal',
                }}
            />

            <NativeStack.Screen 
                name="Privacy"
                component={Privacy}
                options={{
                    headerShown:false,
                    animation:'slide_from_right',
                    presentation:'card',
                    //presentation:'modal',
                }}
            />
            <NativeStack.Screen 
                name="LoginAgree2"
                component={LoginAgree2}
                options={{
                    headerShown:false,
                    // headerTitle:'로그인',
                    animation:'slide_from_right',
                    presentation:'card',
                }}
            />
            <NativeStack.Screen 
                name="UnreadAlarm"
                component={UnreadAlarm}
                options={{
                    headerShown:false,
                    animation:'slide_from_right',
                    presentation:'card',
                }}
            />
            <NativeStack.Screen 
                name="UnreadHomeLetter"
                component={UnreadHomeLetter}
                options={{
                    headerShown:false,
                    animation:'slide_from_right',
                    presentation:'card',
                }}
            />
            <NativeStack.Screen 
                name="UnreadSurvey"
                component={UnreadSurvey}
                options={{
                    headerShown:false,
                    animation:'slide_from_right',
                    presentation:'card',
                }}
            />
            <NativeStack.Screen 
                name="SearchResult"
                component={SearchResult}
                options={{
                    headerShown:false,
                    animation:'slide_from_right',
                    presentation:'card',
                }}
            />
            <NativeStack.Screen 
                name="AlarmList" //알림장
                component={AlarmList}
                options={{
                    headerShown:false,
                    animation:'slide_from_right',
                    presentation:'card',
                }}
            />
            <NativeStack.Screen 
                name="AlarmContent" //알림장 내용
                component={AlarmContnet}
                options={{
                    headerShown:false,
                    animation:'slide_from_right',
                    presentation:'card',
                }}
            />
            <NativeStack.Screen 
                name="HomeLetterList" //가정통신문
                component={HomeLetterList}
                options={{
                    headerShown:false,
                    animation:'slide_from_right',
                    presentation:'card',
                }}
            />
            <NativeStack.Screen 
                name="HomeLetterContent" //가정통신문 내용
                component={HomeLetterContent}
                options={{
                    headerShown:false,
                    animation:'slide_from_right',
                    presentation:'card',
                }}
            />
            <NativeStack.Screen 
                name="SurveyList"
                component={SurveyList}
                options={{
                    headerShown:false,
                    animation:'slide_from_right',
                    presentation:'card',
                }}
            />
            <NativeStack.Screen 
                name="SurveyContent"
                component={SurveyContent}
                options={{
                    headerShown:false,
                    animation:'slide_from_right',
                    presentation:'card',
                }}
            /> 
            <NativeStack.Screen 
                name="LunchList"
                component={LunchList}
                options={{
                    headerShown:false,
                    animation:'slide_from_right',
                    presentation:'card',
                }}
            />
            <NativeStack.Screen 
                name="TimeTableList"
                component={TimeTableList}
                options={{
                    headerShown:false,
                    animation:'slide_from_right',
                    presentation:'card',
                }}
            />
            <NativeStack.Screen 
                name="ScheduleCalendar"
                component={ScheduleCalendar}
                options={{
                    headerShown:false,
                    animation:'slide_from_right',
                    presentation:'card',
                }}
            />
            <NativeStack.Screen 
                name="Setting"
                component={Setting}
                options={{
                    headerShown:false,
                    animation:'slide_from_right',
                    presentation:'card',
                }}
            />
            <NativeStack.Screen 
                name="BoardContent"
                component={BoardContent}
                options={{
                    headerShown:false,
                    animation:'slide_from_right',
                    presentation:'card',
                }}
            />
            <NativeStack.Screen 
                name="SendWrite"
                component={SendWrite}
                options={{
                    headerShown:false,
                    animation:'slide_from_right',
                    presentation:'card',
                }}
            />
            <NativeStack.Screen 
                name="SendList"
                component={SendList}
                options={{
                    headerShown:false,
                    animation:'slide_from_right',
                    presentation:'card',
                }}
            />
            <NativeStack.Screen 
                name="SendListContent"
                component={SendListContent}
                options={{
                    headerShown:false,
                    animation:'slide_from_right',
                    presentation:'card',
                }}
            />
            



        </NativeStack.Navigator>
        
        
    )
}

export default Stack;