import react, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { Line, ModalBackground, PaddingView, SafeBasicView, Space } from "../common/commonStyled";
import colors from "../common/commonColors";
import { Image, Platform, Pressable, ScrollView } from "react-native";
import { getAlarmFullDate, getWindowHeight, getWindowWidth } from "../common/commonFunc";
import AutoHeightImage from "react-native-auto-height-image";
import { AntDesign } from '@expo/vector-icons'; 
import { BlueBottomBtn } from "../components/BlueBottomBtn";
import { goBack } from "../common/commonNaviFunc";
import { useNavigation, useRoute } from "@react-navigation/native";
import { HeaderCustom } from "../components/HeaderCustom";
import { Loader } from "../components/Loader";
import { getAdminInfo, getBoardContent } from "../common/commonData";
import { changeHttpUrlTxt, downloadFile, linkWeb } from "../common/commonExportFunc";

const os = Platform.OS;
const windowWidth = getWindowWidth();
const windowHeight = getWindowHeight();
const contentHeight = os=='android'?windowHeight - 190:windowHeight - 240;


const AlarmConentBox = styled.View`
    padding:20px 0 ; 
`
const AlarmContetnTxt1 = styled.Text`
    font-family: 'noto400'; font-size: 15px; line-height: 27px; color:${colors.textBlack}; letter-spacing: -0.6px;
`
const AlarmImageBox = styled.View`
    
`

const AlarmContentHead = styled.View`
    padding-top: 15px;
`
const HeadertxtBox = styled.View`
    flex-direction: row; justify-content: space-between;
`
const HeaderTxt1 = styled.Text`
    font-family: 'noto400'; font-size: 15px; line-height: 18px; color:${colors.mainBlue}; letter-spacing: -0.1px;
`
const HeaderTxt1_1 = styled.Text`
    font-family: 'noto400'; font-size: 12px; line-height: 16px; color:${colors.textBlack}; letter-spacing: -0.4px; 
`
const HeaderTxt2 = styled.Text`
    font-family: 'noto500'; font-size: 16px; line-height: 26px; color:${colors.textBlack}; letter-spacing: -0.8px; margin-top: 10px;;
`
const HeaderTxt3 = styled.Text`
    font-family: 'noto400'; font-size: 13px; line-height: 16px; color:${colors.dateGray}; letter-spacing: -0.4px; margin-top:10px;
`

const QrBoxPress = styled.TouchableOpacity`
    align-items: center; margin-top: 40px;
`
const QrTxt = styled.Text`
    font-family: 'noto400'; font-size: 12px; line-height: 15px; color:${colors.textBlack}; letter-spacing: -0.2px; margin-top: 8px;
    text-decoration: underline;
`
const DownloadBox = styled.View`
`
const DownPress = styled.Pressable`
    flex-direction: row; height: 35px; align-items: center; padding-left: 20px;
`
const DownTxt = styled.Text`
    font-family: 'noto400'; font-size: 13px; line-height: 16px; color:${colors.textBlack}; letter-spacing: -0.2px; padding-left: 10px;
    padding-right: 50px; text-decoration: underline;
`
const ContentHeightView = styled.View`
    min-height: ${contentHeight}px;
`


export const BoardContent = () =>{

    const navigation:any = useNavigation();
    const route = useRoute();				
    const { id }:any = route.params; 	

    const [isLoading, setIsLoading] = useState(true);
    const [content, setContent] = useState([]);
    const [fileUrl, setFileUrl ] = useState('');
    

    async function getData(){

        let data = await getBoardContent(id);
        setContent(data[0]);

        const {webUrl}:any = await getAdminInfo();
        setFileUrl(webUrl+"/hieduapp/upload/files/");
        
        setIsLoading(false); 
    }

    useEffect(()=>{
        getData();
    },[]);


    if(isLoading){
        return <Loader />
    }
    

    let {qrFile, qrUrl, attach_file, attach_new, image_new, school_name, title, insert_date, content:message }:any = content;
    const insertDate = getAlarmFullDate(insert_date);

    const qrImage = fileUrl+qrFile;
    const image = fileUrl+image_new;


    message = changeHttpUrlTxt(message);
    
    return (
        <SafeBasicView>
            <HeaderCustom title={'공지사항'} />
            
            <ScrollView>
            <PaddingView>
                <ContentHeightView>
                    <AlarmContentHead>
                        <HeadertxtBox>
                            <HeaderTxt1>{school_name}</HeaderTxt1>
                        </HeadertxtBox>
                        <HeaderTxt2>{title}</HeaderTxt2>
                        <HeaderTxt3>{insertDate}</HeaderTxt3>
                    </AlarmContentHead>

                    <Space height={25}/>
                    <Line color={colors.lightGrayLine} />

                    <AlarmConentBox>
                        <AlarmContetnTxt1>{message}</AlarmContetnTxt1>
                    </AlarmConentBox>

                    
                    {image_new!=null && <AlarmImageBox>
                        <AutoHeightImage 
                            width={windowWidth-40}
                            source={{uri:image}}
                        />
                        <Space height={20}/>
                    </AlarmImageBox>}

                    <>
                        <QrBoxPress onPress={()=>{linkWeb(qrUrl)}}>
                            {qrFile!= undefined &&
                            <AutoHeightImage 
                                width={100}
                                source={{uri:qrImage}}
                            />
                            }
                            {qrUrl!='' && <QrTxt>{qrUrl}</QrTxt>}
                        </QrBoxPress>

                        <Space height={35}/>

                        <DownloadBox>
                            {attach_file!= undefined && attach_file!="" &&
                                <DownPress onPress={()=>{downloadFile(attach_new)}}>
                                    <AntDesign name="paperclip" size={18} color="black" />
                                    <DownTxt numberOfLines={1}>{attach_file}</DownTxt>
                                </DownPress>
                            }
                        </DownloadBox>
                    </>
                </ContentHeightView>
                
                <Space height={35}/>
                <Pressable onPress={()=>{goBack(navigation)}}>
                    <BlueBottomBtn text={"목록"} status={"active"}/>
                </Pressable>
                <Space height={30}/>
            </PaddingView>
            </ScrollView>
        </SafeBasicView>
    )

}