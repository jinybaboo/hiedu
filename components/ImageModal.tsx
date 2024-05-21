import styled from "styled-components/native";
import { getWindowHeight } from "../common/commonFunc";
import ImageViewer from 'react-native-image-zoom-viewer';
import { EvilIcons } from '@expo/vector-icons'; 
import { View } from "react-native";
import { useState } from "react";

export const ImageModal = ({setShowModal, modalImg}:any)=>{



    const renderIndicator = ({ index, total }: any) => (
        <View></View>
    );


    const windowHeight = getWindowHeight();

    const ModalView = styled.View`
        width:100%; height:${windowHeight+50}px; background-color:rgba(0,0,0,1); position:absolute; top:0px;  padding-top: 0px;
    `
    const ModalCloseView = styled.View`
        width:100%; height:50px; align-items:flex-end;  position: absolute; top:50px; z-index: 100;
    `
    const ClosePress = styled.Pressable`
        width:100px; height:50px; justify-content: center; align-items: flex-end; padding-right: 20px;
    `
    return (
        <ModalView>
            <ModalCloseView>
                <ClosePress onPress={()=>{setShowModal(false)}}>
                    <EvilIcons name="close" size={28} color="white" />
                </ClosePress>
            </ModalCloseView>
            <ImageViewer 
                imageUrls={modalImg}
                renderIndicator={renderIndicator}
            />

        </ModalView>
    )
}

