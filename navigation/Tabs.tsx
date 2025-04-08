import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"

import {Ionicons, AntDesign} from '@expo/vector-icons';
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducer";
import { Home } from "../screen/Home";
import colors from "../common/commonColors";
import { BoardList } from "../screen/BoardList";
import { Mypage } from "../screen/Mypage";
import { Platform } from "react-native";
import { goLoginAgree } from "../common/commonNaviFunc";
import styled from "styled-components/native";
import { useEffect, useState } from "react";
import { getAuth, getBoardList, getMypageInfo, getUserServiceMessenger } from "../common/commonData";
import { getBoardNew } from "../common/commonFunc";
import { SendMain } from "../screen/SendMain";
import { useAppDispatch } from "../store";
import userSlice from "../slices/user";
const Tab = createBottomTabNavigator();

const Tabs = () => {

    const navigation = useNavigation();
    const os = Platform.OS;
    const iconSize = 24;
    const tapBarFontSize = os==='ios'?10:9;

    const dispatch = useAppDispatch();

    const isLogin = useSelector((state:RootState)=>state.user.isLogin);
    const member_id = useSelector((state:any)=>state.user.member_id);
    const isUser = useSelector((state:RootState)=>state.user.isUser);
    const auth:any = useSelector((state:RootState)=>state.user.auth);
    const user_id = useSelector((state:any)=>state.user.user_id);


    async function getServiceData (){
        if(isUser>0){
            setIsSender(true);
        }
        if(auth!=null && auth.includes('send_sms')){
            setIsSender(true);
        }
        const {messengerCount} = await getUserServiceMessenger(user_id);
        
        if(messengerCount==0){
            setIsSender(false);
        }

    }

    const [isSender, setIsSender] = useState<any>(false);
    useEffect(()=>{
        getServiceData();
    },[]);

   
    

    const [hasNewBoard, setHasNewBoard] = useState(false);
    const isFocused = useIsFocused();
    
    if(!isLogin){
        goLoginAgree(navigation);
    }

    async function getData(){
        let data = await getMypageInfo();

        const schoolArr = data?.reduce((returnArr:any, item:any) =>{								
            returnArr.push(item.schoolName)
            return returnArr;							
        },[]);								

        data = await getBoardList(schoolArr);
        setHasNewBoard(false);
        data?.forEach(({insert_date}:any)=>{
            const isNew = getBoardNew(insert_date, 2);
            if(isNew){
                setHasNewBoard(true);
            }
        })
    }

    useEffect(()=>{
        getData();
    },[isFocused]);


    // 탭 네비게이션 시 auth 재설정 하기 
    async function setAuthData(){
        const {auth} = await getAuth(isUser, member_id);
        dispatch(userSlice.actions.setAuth(auth));
    }
    useFocusEffect(()=>{
        setAuthData();
    })


    const BoardView = styled.View`
        position: relative;
    `
    const NewBanner = styled.View`
        width:15px; height:15px; background-color: ${colors.mainOrange}; border-radius: 50px;
        position: absolute; top:-5px; right:-8px;
    `
    const NewBannerTxt = styled.Text`
        font-family: 'noto700'; font-size: 9px; line-height: 12px; color:#fff; letter-spacing: -0.3px; text-align: center; margin-top: 1.5px;
    `

    return(
        <Tab.Navigator 
            initialRouteName="Home" 

            screenOptions={{
                tabBarShowLabel:true,
                tabBarLabelPosition:"below-icon",
                headerShown : false, //헤더 보여줄지 말지
                tabBarStyle:{
                    paddingTop:5,
                },
                tabBarLabelStyle:{
                    fontSize:tapBarFontSize,
                    paddingBottom:3,
                    // paddingTop:3,
                },

                tabBarHideOnKeyboard: true, //안드로이드 키보드 입력시 탭바 올리기
                //페이지 전환시 마다 데이터를 다시 호출함!!!
                //unmountOnBlur:true,
                //tabBarActiveTintColor:"red",
            }}>
            <Tab.Screen 
                name="홈" 
                component={Home} 
                options={{
                    tabBarActiveTintColor : colors.mainBlue,
                    unmountOnBlur: true, // 화면 접속시 마다 데이터 재요청
                    tabBarIcon:({focused,color,size}) =>{
                        return <AntDesign name="home" size={iconSize} color={color} />
                },
            }}/>
            <Tab.Screen name="공지사항" component={BoardList} 
                options={{
                    tabBarActiveTintColor : colors.mainBlue,
                    tabBarIcon :({focused, color, size}) =>{
                        return (
                            <BoardView>
                                <AntDesign name="filetext1" size={iconSize} color={color} />
                               {hasNewBoard &&
                                <NewBanner>
                                    <NewBannerTxt>N</NewBannerTxt>
                                </NewBanner>
                                }
                            </BoardView>
                        )
                    },
                }}
            />
            {isSender &&
            <Tab.Screen name="발송하기" component={SendMain} 
                options={{
                    tabBarActiveTintColor : colors.mainBlue,
                    tabBarIcon :({focused, color, size}) =>{
                        return <Ionicons name="paper-plane-outline" size={iconSize} color={color} />
                    },
                }}
            />}
          
            <Tab.Screen name="마이페이지" component={Mypage} 
                 options={{
                    tabBarActiveTintColor : colors.mainBlue,
                    tabBarIcon :({focused, color, size}) =>{
                        return <AntDesign name="user" size={iconSize} color={color} />
                    },
                }}
            />
        </Tab.Navigator>
    )
};

export default Tabs;
