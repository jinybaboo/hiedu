import styled from "styled-components/native";
import colors from "../common/commonColors";
import { useNavigation } from "@react-navigation/native";
import AutoHeightImage from "react-native-auto-height-image";
import { Space } from "../common/commonStyled";
import { AntDesign } from '@expo/vector-icons'; 
import { downloadFile, linkWeb } from "../common/commonExportFunc";
import { Alert, Platform } from "react-native";
import { getAdminInfo } from "../common/commonData";
import { useEffect, useState } from "react";


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


export const AlarmContentBottom = ({data, fileUrl}:any)=>{
    
    const navigation:any = useNavigation();
    const files = data.file.split("^^");
    const newFiles = data.file_new.split("^^");
    const qrFile = data?.qrImage;
    const qrImage = fileUrl+qrFile;
    const qrUrl = data?.qrUrl;

    function askDownload(item:any){
        if(Platform.OS=='android'){
            Alert.alert( //alert 사용			
                '안내', '파일을 다운로드 하시겠습니까?', [ //alert창 문구 작성		
                    {text: '취소', onPress: () => {}}, //alert 버튼 작성	
                    {text: '확인', onPress: () => {
                        downloadFile(item);
                    }}, //alert 버튼 작성	
                ]		
            );			

        }else{
            downloadFile(item);
        }
    }

    
    return (
        <>
        <QrBoxPress onPress={()=>{linkWeb(qrUrl)}}>
            {qrFile!=''&&
            <AutoHeightImage 
                width={100}
                source={{uri:qrImage}}
            />}
            {qrUrl!='' && <QrTxt>{qrUrl}</QrTxt>}
        </QrBoxPress>

        <Space height={35}/>

        <DownloadBox>
            {newFiles[0]!="" && newFiles.map((item:any, idx:number)=>{
                return(
                    <DownPress key={idx+"file"} onPress={()=>{askDownload(item)}}>
                        <AntDesign name="paperclip" size={18} color="black" />
                        <DownTxt numberOfLines={1}>{files[idx]}</DownTxt>
                    </DownPress>
                )
            })
            }
        </DownloadBox>
        </>
    )
}

  