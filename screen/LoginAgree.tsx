import react, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { BasicInnerView, GrayInputBox, HeaderSpaceForAndroid, SafeBasicView, Space } from "../common/commonStyled";
import colors from "../common/commonColors";
import { useNavigation } from "@react-navigation/native";
import { goAgreement, goPrivacy, goLoginAgree2 } from "../common/commonNaviFunc";
import { Entypo, Ionicons } from '@expo/vector-icons'; 
import { BlueBottomBtn } from "../components/BlueBottomBtn";
import { HeaderCustom } from "../components/HeaderCustom";
import { Alert, BackHandler } from "react-native";
import { getAdminInfo } from "../common/commonData";

import AntDesign from '@expo/vector-icons/AntDesign';



const TopTextBox = styled.View`
    width:100%; height:40px; justify-content: center;
`
const TopText = styled.Text` 
    font-family: 'noto500'; font-size: 18px; line-height: 21px; color:#000000; text-align: center;
`

const ProcessNumBox = styled.View`
    flex-direction: row; width:100%; justify-content: flex-end; margin-top: 40px;
`
const ProcessNum = styled.Text`
    font-family: 'noto400'; font-size: 15px; line-height: 18px; color:#555555; margin-left: 5px;
`
const ProcessNumInactive = styled(ProcessNum)`
    color:#D8D8D8;
`

const AgreeText1 = styled.Text`
     font-family: 'noto400'; font-size: 22px; line-height: 32px; color:#000000; margin-top: 35px;
`
const AgreeText2 = styled.Text`
     font-family: 'noto500'; font-size: 16px; line-height: 19px; color:#000000; margin-top: 50px;
`

const IconPress = styled.Pressable`
    flex-direction: row; align-items: center; padding:10px 0;
`
const AgreeText3 = styled.Text`
    font-family: 'noto400'; font-size: 15px; line-height: 20.5px; color:#555555; padding-left: 10px;
`
const SeeMorePress = styled.Pressable`
    padding:10px 0 10px 80px;
`

const ContinuePress = styled.Pressable`
      width:100%; height:55px; position: absolute; bottom: 25px; left:20px; 
`


export const LoginAgree = () =>{
    
    const navigation:any = useNavigation();

    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);

    // async function getData(){ 
    //     await getAdminInfo(); 
    // }

    useEffect(()=>{
        // getData()

        const backAction = () => {
            return true; 
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
        return () => backHandler.remove(); // 컴포넌트가 언마운트될 때 리스너를 제거합니다.
    },[]);

    function checkAgreement(){
        if(!isChecked1 || !isChecked2){
            Alert.alert('안내','이용약관 및 개인정보처리방침에 동의해 주세요.');
        }else{
            goLoginAgree2(navigation);
        }
    }
 

    return (
        <SafeBasicView>
            <BasicInnerView>
                <HeaderCustom title={"약관동의"} hideBack={true}/>

                <ProcessNumBox>
                    <ProcessNum>01</ProcessNum>
                    <ProcessNumInactive>·</ProcessNumInactive>
                    <ProcessNumInactive>02</ProcessNumInactive>
                </ProcessNumBox>

                <AgreeText1>이용약관에{'\n'}동의해주세요.</AgreeText1>
                
                <AgreeText2>서비스 이용을 위한 필수 동의사항</AgreeText2>
                <Space height={20} />
                <GrayInputBox>
                    <IconPress onPress={()=>{setIsChecked1(!isChecked1)}}>
                        {isChecked1?
                        <Ionicons name="checkmark-circle-sharp" size={26} color={colors.buttonBlue} />
                        :
                        <Ionicons name="ios-checkmark-circle-outline" size={26} color="#D8D8D8" />
                        }
                        <AgreeText3>이용약관</AgreeText3>
                    </IconPress>
                    <SeeMorePress onPress={()=>{goAgreement(navigation)}}>
                        <Entypo name="chevron-small-right" size={24} color="black" />
                    </SeeMorePress>
                </GrayInputBox>

                <Space height={15} />

                <GrayInputBox>
                    <IconPress onPress={()=>{setIsChecked2(!isChecked2)}}>
                        {isChecked2?
                        <Ionicons name="checkmark-circle-sharp" size={26} color={colors.buttonBlue} />
                        :
                        <Ionicons name="ios-checkmark-circle-outline" size={26} color="#D8D8D8" />
                        }
                        <AgreeText3>개인정보처리방침</AgreeText3>
                    </IconPress>
                    <SeeMorePress onPress={()=>{goPrivacy(navigation)}}>
                        <Entypo name="chevron-small-right" size={24} color="black" />
                    </SeeMorePress>
                    
                </GrayInputBox>

                <ContinuePress onPress={checkAgreement}>
                    {isChecked1&&isChecked2?
                        <BlueBottomBtn text={'계속하기'} status={'active'}/>
                    :
                        <BlueBottomBtn text={'계속하기'} status={'inactive'}/>
                    }
                </ContinuePress>
            </BasicInnerView>
        </SafeBasicView>
    )

}