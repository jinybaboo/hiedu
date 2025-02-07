import styled from "styled-components/native";
import colors from "../common/commonColors";
import { useNavigation } from "@react-navigation/native";
import { UnReadBox } from "../components/UnReadBox";
import { useEffect, useState } from "react";
import { goUnreadAlarm } from "../common/commonNaviFunc";
import { Space } from "../common/commonStyled";
import { getUnreadData } from "../common/commonData";
import messaging from '@react-native-firebase/messaging';



export const HomeUnread = ({isFocused, from}:any)=>{
    const navigation:any = useNavigation();
    const [unreadNotice, setUnreadNotice] = useState<any>('');
    const [unreadLetter, setUnreadLetter] = useState<any>('');
    const [unreadSurvey, setUnreadSurvey] = useState<any>('');
    const [isLoading, setIsLoading] = useState(true);

    const UnReadView = styled.View`
        flex-direction: row; margin-top: ${from==='home'?0:40}px;
    `

    async function getData(){
        setIsLoading(true);
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


    useEffect(() => {
        //앱이 켜져있을때 푸시알람 수신시 데이터 리셋
       const unsubscribe = messaging().onMessage(async (remoteMessage:any) => {
           getData();
       });
       return unsubscribe;
   }, []);


    return (
        <UnReadView>
            <UnReadBox 
                goFunc={goUnreadAlarm} 
                txt1 = {'알림장'}
                txt2 = {`${unreadNotice}건`}
                isLoading = {isLoading}
            />
            <UnReadBox 
                goFunc={goUnreadAlarm} 
                txt1 = {"가정통신문"}
                txt2 = {`${unreadLetter}건`}
                isLoading = {isLoading}
            />
                <UnReadBox 
                goFunc={goUnreadAlarm} 
                txt1 = {'설문조사'}
                txt2 = {`${unreadSurvey}건`}
                isLoading = {isLoading}
            />
        </UnReadView>
    )
}

  