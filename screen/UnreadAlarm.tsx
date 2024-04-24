import styled from "styled-components/native";
import { SafeBasicView, Space } from "../common/commonStyled";
import { UnreadComp } from "../components/UnreadComp";
import { UnreadListComp } from "../components/UnreadListComp";
import { HeaderCustom } from "../components/HeaderCustom";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getAlarmList } from "../common/commonData";
import { DeviceEventEmitter } from "react-native";
import { Loader } from "../components/Loader";



const UnreadFlatList = styled.FlatList`
  
`


export const UnreadAlarm = () =>{

    const isFocused = useIsFocused();

    const route = useRoute();				
    const { boardType }:any = route.params; 	
    let boardNameEng = "";
    if(boardType==='알림장'){
        boardNameEng='notice'
    }else if(boardType==='가정통신문'){
        boardNameEng='letter'
    }
    else if(boardType==='설문조사'){
        boardNameEng='survey'
    }
    
    const [listData, setListData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function getData(){
        const data = await getAlarmList(boardNameEng, 'unread');
        
        setListData(data);
        setIsLoading(false);
    }

    useEffect(()=>{
        getData();

        DeviceEventEmitter.addListener('backFromContent', () => {
            getData();
        });
    },[isFocused]);
    

 
    if(isLoading){return <Loader />}

    const renderItem = ({item, index}:any) => {										
        return(						
            <UnreadListComp item={item} index={index} />
        )};								    		

  

    return (
        <SafeBasicView>
            <HeaderCustom title={`읽지 않은 ${boardType}`}/>
            {listData.length==0?
            <UnreadComp text={`읽지 않은 ${boardType}내역이 없습니다.`}/>
            :
            <>
                <Space height={6}/>
                <UnreadFlatList
                    data = {listData}
                    renderItem={renderItem}
                    keyExtractor={(item:any, index:number) => index.toString()+""}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.8}
                    initialNumToRender={10} // 처음 10개의 아이템을 렌더링
                    maxToRenderPerBatch={5} // 한 번에 최대 5개씩 렌더링
                />
            </>
            }
        </SafeBasicView>
    )

}