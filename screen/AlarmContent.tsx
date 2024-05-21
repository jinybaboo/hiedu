import react, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Line, PaddingView, SafeBasicView, Space } from "../common/commonStyled";
import colors from "../common/commonColors";
import { DeviceEventEmitter, Platform, Pressable, ScrollView, View } from "react-native";
import { getWindowHeight, getWindowWidth } from "../common/commonFunc";
import AutoHeightImage from "react-native-auto-height-image";
import { BlueBottomBtn } from "../components/BlueBottomBtn";
import { goBack } from "../common/commonNaviFunc";
import { useNavigation, useRoute } from "@react-navigation/native";
import { HeaderCustom } from "../components/HeaderCustom";
import { AlarmContentHeader } from "../components/AlarmContentHeader";
import { AlarmContentBottom } from "../components/AlarmContentBottom";
import { getAdminInfo, getAlarmContent } from "../common/commonData";
import { Loader } from "../components/Loader";
import { changeHttpUrlTxt } from "../common/commonExportFunc";
import { ImageModal } from "../components/ImageModal";



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
const ContentHeightView = styled.View`
    min-height: ${contentHeight}px;
`


export const AlarmContnet = () =>{
    const route = useRoute();				
    const { id, yyyymm}:any = route.params; 	
    const navigation:any = useNavigation();

    const [data, setData] = useState<any>([]);
    const [fileUrl, setFileUrl ] = useState('');
    const [isLoading, setIsLoading] = useState(true);


    async function getAllData(){
        const data = await getAlarmContent(id, yyyymm);
        setData(data);

        const {webUrl}:any = await getAdminInfo();
        setFileUrl(webUrl+"/hieduapp/upload/files/");

        setIsLoading(false);
    }

    useEffect(()=>{
        getAllData();

    },[]);

    // 이미지 모달 세트
    const [showModal, setShowModal] = useState(false);
    const [modalImg, setModalImg] = useState<any>([]);
    function showImageModal(url:string){
        setModalImg([{url}]);
        setShowModal(true);
    }


    if(isLoading){return <Loader />}

    const images = data?.image_new?.split("^^");
    const message = changeHttpUrlTxt(data?.message);

    return (
        <SafeBasicView>
            <HeaderCustom title={'알림장'} />
            
            <ScrollView>
            <PaddingView>
                <ContentHeightView>
                    <AlarmContentHeader page={'alarm'} data={data}/>
                    <Space height={25}/>
                    <Line color={colors.lightGrayLine} />

                    <AlarmConentBox>
                        <AlarmContetnTxt1>{message}</AlarmContetnTxt1>
                    </AlarmConentBox>

                    
                    <AlarmImageBox>
                    {images.map((item:any, idx:number)=>{
                        const uri = fileUrl+item;
                            return(
                                <View key={idx+"img"}>
                                    <Pressable onPress={()=>{showImageModal(uri)}}>
                                        <AutoHeightImage 
                                            width={windowWidth-40}
                                            source={{uri:uri}}
                                        />
                                    </Pressable>
                                    <Space height={20}/>
                                </View>
                            )
                        })
                    }
                    </AlarmImageBox>


                    <AlarmContentBottom data={data} fileUrl={fileUrl}/>
                </ContentHeightView>

                <Space height={35}/>
                <Pressable onPress={()=>{goBack(navigation)}}>
                    <BlueBottomBtn text={"목록"} status={"active"}/>
                </Pressable>
                <Space height={30}/>
            </PaddingView>
            </ScrollView>

            {showModal && 
            <ImageModal 
                setShowModal ={setShowModal}
                modalImg ={modalImg}
            />
            }
        </SafeBasicView>
    )

}