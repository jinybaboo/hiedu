import react, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { HeaderSpaceForAndroid, PaddingView, SafeBasicView, Space } from "../common/commonStyled";
import colors from "../common/commonColors";
import { goAgreement, goCompanyInfo, goPrivacy, goSendList } from "../common/commonNaviFunc";
import { getWindowHeight } from "../common/commonFunc";
import { Entypo, Ionicons } from '@expo/vector-icons'; 
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../store";
import * as commonData from "../common/commonData";
import { Loader } from "../components/Loader";
import { logoutCheck } from "../common/commonExportFunc";
import React from "react";
import { useSelector } from "react-redux";
import { KakaoBtn } from "../components/KakaoBtn";
import { HomeUnread } from "../components/HomeUnread";

const windowHeight = getWindowHeight();

const MyScrollView = styled.ScrollView`
    width:100%; height: 100%; background-color: #FFFFFF;
`
const MyHeadView = styled.View`
    width:100%; background-color: ${colors.mainGreen}; padding-bottom: 25px; border-bottom-left-radius:20px ; border-bottom-right-radius:20px ;
    height:200px;
`
const MyHeadViewBack = styled.View`
    background-color: #FFFFFF;
`
const HeadTxt1 = styled.Text`
     font-family: 'noto400'; font-size: 22px; line-height: 25px; color:#FFFFFF; padding:20px 0 0 20px ;
`
const HeadTxt2 = styled(HeadTxt1)`
     font-size: 14px; 
`
const MyTitleTxt = styled.Text`
    font-family: 'noto700'; font-size: 18px; line-height:21px; color:${colors.textBlack};
`
const SchoolBox = styled.View`
    width:100%; height:96px; border-width: 1px; border-color:${colors.boxBorder}; border-radius: 10px; margin-bottom: 25px; padding: 0 25px; position: relative;
`
const SchoolTxt1 = styled.Text`
    font-family: 'noto500'; font-size: 14px; line-height:17px; color:${colors.mainBlue}; letter-spacing: -0.3px; margin-top: 19px;
`
const SchoolTxt2 = styled.Text`
    font-family: 'noto500'; font-size: 16px; line-height:19px; color:#000000; letter-spacing: -0.3px; margin-top: 6px;
`
const SchoolTxt3 = styled.Text`
    font-family: 'noto400'; font-size: 12px; line-height:15px; color:${colors.textBlack}; letter-spacing: -0.1px; margin-top: 2px;
`
const SchoolTxt4 = styled.Text`
    font-family: 'noto400'; font-size: 9px; line-height:13px; color:${colors.mainBlueOpa}; letter-spacing: -0.1px; margin-top: 5px;
`
const SendIcon = styled.View`
    padding:28px; position: absolute; right:0; align-items: center;
`
const AgreementPress = styled.TouchableOpacity`
    width:100%; height:60px; border-width: 1px; border-color:${colors.boxBorder}; border-radius: 10px; margin-bottom: 16px; flex-direction: row; justify-content: space-between; 
    align-items: center; padding: 0 25px;
`
const AgreementTxt1 = styled.Text`
    font-family: 'noto500'; font-size: 16px; line-height:19px; color:#000; letter-spacing: -0.3px; 
`
const LogoutBox = styled.View`
    width:100%; height:60px; justify-content: center; margin-top: 10px;
    /* align-items: flex-end; */
`
const LogoutPress = styled.TouchableOpacity`
    padding:15px 5px; 
`
const LogoutTxt = styled.Text`
    font-family: 'noto400'; font-size: 12px; line-height:15px; color:${colors.dateGray}; text-decoration: underline;
`

export const Mypage = () =>{
    const navigation:any = useNavigation();
    const dispatch = useAppDispatch();

    const isFocused = useIsFocused();

    const [userData, setUserData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);

    const isUser = useSelector((state:any)=>state.user.isUser);
    const auth:any = useSelector((state:any)=>state.user.auth);
    let isSender = false;
    if(isUser>0){
        isSender = true;
    }
    if(auth!=null && auth.includes('send_sms')){
        isSender = true;
    }

    async function getData(){
        const data = await commonData.getMypageInfo();
        setUserData(data);
        setIsLoading(false);
    } 

    useEffect(()=>{
        getData();
    },[isFocused]);


    if(isLoading){
        return <Loader />
    }

    let displayName:any = "";
    let displayName2:any ="";

    userData?.forEach((item:any, idx:any)=>{
        const {memberType, schoolName, name, category2} = item;
        if(memberType=='student'){
            displayName = name;
            displayName2="학생";
        }
        if(memberType =='parent'){
            if(idx==0){displayName=name;}else{displayName+=", "+name}
            displayName2="학부모님";
        }
        if(displayName=="" && memberType=='member'){
            displayName = name;
            displayName2="교직원님";
        }
        if(displayName=="" && memberType=='user'){
            displayName = schoolName;
            displayName2="관리자님";
        }
        if(displayName=="" && memberType=='staff'){
            displayName = name;
            displayName2 = category2;
        }
    })

    return (
        <SafeBasicView  style={{backgroundColor:colors.mainGreen}}>
            <HeaderSpaceForAndroid style={{backgroundColor:colors.mainGreen}}/>
            <MyHeadViewBack>
                <MyHeadView>
                    <HeadTxt1>{displayName}<HeadTxt2> {displayName2}</HeadTxt2></HeadTxt1>
                    <HomeUnread isFocused={isFocused} from={'mypage'}/>
                </MyHeadView>
            </MyHeadViewBack>

            <MyScrollView>
                <PaddingView>
                    <Space height={40}/>
                    <MyTitleTxt>등록된 학교</MyTitleTxt>
                    <Space height={12}/>

                    {userData?.map((item:any, idx:number)=>{
                        let {memberType, schoolName, name, category1, category2} = item;
                        let text2 = name;
                        let text3 = "";
                        if(memberType=='student'){
                            text3 = `${category1}학년 ${category2}반 학생`
                        }
                        if(memberType =='parent'){
                            text3 = `${category1}학년 ${category2}반 학부모`
                        }
                        if(memberType=='member'){
                            text3 ='교직원';
                        }
                        if(memberType=='user'){
                            text2 ='관리자';
                            text3 ='교직원';
                        }
                        if(memberType=='staff'){
                            category1 = category1==null?'':category1;
                            category2 = category2==null?'':category2;
                            text3 = category1+' '+category2;
                        }
                        return(
                            <SchoolBox key={idx+"member"}
                                style={isSender && (memberType=='member' || memberType=='user') && {borderColor:colors.mainBlueOpa}}
                            >
                                <SchoolTxt1>{schoolName}</SchoolTxt1>
                                <SchoolTxt2>{text2}</SchoolTxt2>
                                <SchoolTxt3>{text3} </SchoolTxt3>
                               {isSender && (memberType=='member' || memberType=='user') && 
                               <SendIcon>
                                    <Ionicons name="paper-plane-outline" size={23} color={colors.mainBlueOpa} />
                                    <SchoolTxt4>앱발송가능</SchoolTxt4>
                                </SendIcon>
                                }
                            </SchoolBox>
                        )
                    })}

                    {isSender &&
                    <>
                    <Space height={15}/>
                    <MyTitleTxt>보낸 결과</MyTitleTxt>
                    <Space height={12}/>
                    <AgreementPress onPress={()=>{goSendList(navigation)}}>
                        <AgreementTxt1>발송 내역</AgreementTxt1>
                        <Entypo name="chevron-small-right" size={24} color="black" />
                    </AgreementPress>
                    </>
                    }


                    <Space height={15}/>
                    <MyTitleTxt>약관 및 정책</MyTitleTxt>
                    <Space height={12}/>

                    <AgreementPress onPress={()=>{goAgreement(navigation)}}>
                        <AgreementTxt1>이용 약관</AgreementTxt1>
                        <Entypo name="chevron-small-right" size={24} color="black" />
                    </AgreementPress>
                    <AgreementPress onPress={()=>{goPrivacy(navigation)}}>
                        <AgreementTxt1> 개인정보 처리방침</AgreementTxt1>
                        <Entypo name="chevron-small-right" size={24} color="black" />
                    </AgreementPress>


                    <Space height={15}/>
                    <MyTitleTxt>회사소개</MyTitleTxt>
                    <Space height={12}/>

                    <AgreementPress onPress={()=>{goCompanyInfo(navigation)}}>
                        <AgreementTxt1>학교기업 소개</AgreementTxt1>
                        <Entypo name="chevron-small-right" size={24} color="black" />
                    </AgreementPress>



                    <LogoutBox>
                        <LogoutPress onPress={()=>{logoutCheck(dispatch, navigation)}}><LogoutTxt>로그아웃</LogoutTxt></LogoutPress>
                    </LogoutBox>
                </PaddingView>
            </MyScrollView>
            <KakaoBtn />
        </SafeBasicView>
    )
}