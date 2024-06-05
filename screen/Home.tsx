import { useIsFocused, useNavigation } from "@react-navigation/native";
import react, { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Platform, Pressable } from "react-native";
import styled from "styled-components/native";
import { goAlarmList, goHomeLetterList, goLunchList, goNotification, goScheduleCalendar, goSearchResult, goSetting, goSurveyList, goTimeTableList, goUnreadAlarm} from "../common/commonNaviFunc";
import { BasicScrollView, HeaderSpaceForAndroid, PaddingView, SafeBasicView, Space } from "../common/commonStyled";
import { Ionicons } from '@expo/vector-icons'; 
import colors from "../common/commonColors";
import { getWindowWidth } from "../common/commonFunc";
import { UnReadBox } from "../components/UnReadBox";

import { checkNotifications, PERMISSIONS, RESULTS, requestNotifications, request } from 'react-native-permissions';
import { getUnreadData } from "../common/commonData";
import { Loader } from "../components/Loader";
import { useAppDispatch } from "../store";


const os = Platform.OS;
const windowWidth = getWindowWidth();

const HomeHeaderView = styled.View`
    flex-direction:row; width:100%; height:50px; justify-content:space-between; align-items: center; 
`
const HomeLogo = styled.Image`
    width:120px; 
`
const SettingPress = styled.Pressable`
    width:50px; height:50px;justify-content: center; align-items: flex-end; justify-content: center; padding-top: 8px;
`
const WelcomeView = styled.View`
    width:100%; height:200px; background-color: ${colors.mainGreen}; border-radius: 10px;
`
const WelcoleTxt1 = styled.Text`
    font-family: 'noto400'; font-size: 20px; line-height: 25px; color:#FFFFFF; margin: 30px 0 0 22px; letter-spacing: -0.8px;
`
const UnReadView = styled.View`
    flex-direction: row;
`

const SearchView = styled.View`
    width:100%; height:140px; background-color: #E5E9FD; border-radius: 10px; padding:25px;
`
const SearchViewTxt = styled.Text`
    font-family: 'noto700'; font-size: 17px; line-height: 20px; color:${colors.textBlack}; letter-spacing: -0.4px;
`
const SearchInputBox = styled.View`
    flex-direction: row; width:100%; height:55px; background-color:#F7F8FA; border-radius: 5px; margin-top: 17px; align-items: center;
    padding: 0 0 0 15px;
`
const SearchInput = styled.TextInput`
    width:${windowWidth-140}px; height:55px; font-size:${os==='ios'?16:15}px; padding-left: 5px;
`
const MainMenuView = styled.View`
    flex-direction: row; flex-wrap: wrap;
`
const MainMenuPress = styled.Pressable`
    width:33.333%;  align-items: center; padding-bottom: 33px;
`
const MainMenuIcon = styled.Image`
    width:50px; height:50px;
`
const MainMenuTxt = styled.Text`
 width:99%; text-align:center; height:16px; font-family: 'noto400'; font-size: 13px; line-height: 16px; color:${colors.textBlack}; letter-spacing: -0.4px; margin-top: 3px;
`


export const Home = () =>{
    const dispatch = useAppDispatch();
    const navigation:any = useNavigation();

    const [unreadNotice, setUnreadNotice] = useState<any>('');
    const [unreadLetter, setUnreadLetter] = useState<any>('');
    const [unreadSurvey, setUnreadSurvey] = useState<any>('');

    const [isLoading, setIsLoading] = useState(true);

    const [searchWord, setSearchWord] = useState('');
    const serialInputRef:any = useRef(null);

    const isFocused = useIsFocused();


    async function getData(){
        const data = await getUnreadData();

        let noticeCount:number = 0;
        let letterCount:number = 0;
        let surveyCount:number = 0;

        data?.forEach(({category, unreadCount}:any)=>{
            if(category==='notice'){  noticeCount+=unreadCount;  }
            if(category==='letter'){  letterCount+=unreadCount;  }
            if(category==='survey'){  surveyCount+=unreadCount;  }
        })
        setUnreadNotice(noticeCount);
        setUnreadLetter(letterCount);
        setUnreadSurvey(surveyCount);

        setIsLoading(false);
    } 

    useEffect(()=>{
        getData();
    },[isFocused]);
 



    const onChangeSearchWord = (text:string) => {
        setSearchWord(text);

    }
    const sendSearch = () =>{
        if(searchWord.length<2){
            Alert.alert( '잠깐!', '검색어를 2자 이상 입력해 주세요.');
            return;
        }
        goSearchResult(navigation, searchWord);
        setSearchWord('');
    }


    useEffect(()=>{
        //최초 시작 시 푸시알림 권한 얻기
        requestNotifications(['alert', 'sound']).then(({status, settings}) => {
           
        });
        
    },[]);



    if(isLoading){
        return <Loader />
    }


    return (
        <SafeBasicView>
            <HeaderSpaceForAndroid/>

            <BasicScrollView>
                <PaddingView>
                    <HomeHeaderView>
                        <HomeLogo 
                            resizeMode="contain"
                            source={require('../assets/icons/hiedulogo.png')}
                        />
                        
                        <SettingPress onPress={()=>goSetting(navigation)}>
                            <Ionicons name="settings-outline" size={22} color="black" />
                        </SettingPress>
                    </HomeHeaderView>

                    <Space height={20}/>

                    <WelcomeView>
                        <WelcoleTxt1>{unreadNotice+unreadLetter+unreadSurvey ==0?`읽지 않은 수신내역이 없습니다!`:`아직 읽지 않았어요!`}</WelcoleTxt1>

                        <Space height={20}/>

                        <UnReadView>
                            <UnReadBox 
                                goFunc={goUnreadAlarm} 
                                txt1 = {'알림장'}
                                txt2 = {`${unreadNotice}건`}
                            />
                            <UnReadBox 
                                goFunc={goUnreadAlarm} 
                                txt1 = {"가정통신문"}
                                txt2 = {`${unreadLetter}건`}
                            />
                             <UnReadBox 
                                goFunc={goUnreadAlarm} 
                                txt1 = {'설문조사'}
                                txt2 = {`${unreadSurvey}건`}
                            />
                        </UnReadView>
                    </WelcomeView>

                    <Space height={30}/>

                    <SearchView>
                        <SearchViewTxt>수신 내역을 검색해 보세요.</SearchViewTxt>

                        <SearchInputBox>
                            <Ionicons name="search" size={24} color="black" />
                            <SearchInput 
                                placeholder="검색어 입력"
                                placeholderTextColor={colors.placeholder}
                                ref = {serialInputRef}
                                onChangeText={onChangeSearchWord} 
                                onSubmitEditing={sendSearch}
                                value={searchWord}
                            />
                        </SearchInputBox>
                    </SearchView>

                    <Space height={40}/>
                    
                    <MainMenuView>
                        <MainMenuPress onPress={()=>{goAlarmList(navigation, dispatch)}}>
                            <MainMenuIcon 
                                resizeMode="contain"
                                source={require('../assets/icons/alarm.png')}
                            />
                            <MainMenuTxt>알림장</MainMenuTxt>
                        </MainMenuPress>
                        <MainMenuPress onPress={()=>{goHomeLetterList(navigation, dispatch)}}>
                            <MainMenuIcon 
                                resizeMode="contain"
                                source={require('../assets/icons/homeLetter.png')}
                            />
                            <MainMenuTxt>가정통신문</MainMenuTxt>
                        </MainMenuPress>
                        <MainMenuPress onPress={()=>{goSurveyList(navigation, dispatch)}}>
                            <MainMenuIcon 
                                resizeMode="contain"
                                source={require('../assets/icons/survey.png')}
                            />
                            <MainMenuTxt>설문조사</MainMenuTxt>
                        </MainMenuPress>
                        <MainMenuPress onPress={()=>{goLunchList(navigation)}}>
                            <MainMenuIcon 
                                resizeMode="contain"
                                source={require('../assets/icons/lunch.png')}
                            />
                            <MainMenuTxt>오늘의 급식</MainMenuTxt>
                        </MainMenuPress>
                        <MainMenuPress onPress={()=>{goTimeTableList(navigation)}}>
                            <MainMenuIcon 
                                resizeMode="contain"
                                source={require('../assets/icons/timetable.png')}
                            />
                            <MainMenuTxt>우리반 시간표</MainMenuTxt>
                        </MainMenuPress>
                        <MainMenuPress onPress={()=>{goScheduleCalendar(navigation)}}>
                            <MainMenuIcon 
                                resizeMode="contain"
                                source={require('../assets/icons/schedule.png')}
                            />
                            <MainMenuTxt>학사일정</MainMenuTxt>
                        </MainMenuPress>

                    </MainMenuView>
                </PaddingView>
            </BasicScrollView>
        </SafeBasicView>
    )

}