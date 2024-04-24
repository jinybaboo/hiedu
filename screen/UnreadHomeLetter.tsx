import styled from "styled-components/native";
import { SafeBasicView, Space } from "../common/commonStyled";
import { UnreadComp } from "../components/UnreadComp";
import { UnreadListComp } from "../components/UnreadListComp";
import { HeaderCustom } from "../components/HeaderCustom";
import { goHomeLetterContent } from "../common/commonNaviFunc";



const UnreadFlatList = styled.FlatList`
  
`


export const UnreadHomeLetter = () =>{
    
    const isUnreadExist = !true;

    const tempData = ['','','','','','','','','','','','','','','','']



    const renderItem = ({item, index}:any) => {										
        return(						
            <UnreadListComp item={item} index={index} goFunc={goHomeLetterContent}/>
        )};										

    const getData = () =>{
        
    }

    return (
        <SafeBasicView>
            <HeaderCustom title={'미열람 가정통신문'}/>
            {isUnreadExist?
            <UnreadComp text={'읽지 않은 가정통신문이 없습니다.'}/>
            :
            <>
                <Space height={6}/>
                <UnreadFlatList
                    data = {tempData}
                    renderItem={renderItem}
                    keyExtractor={(item:any, index:number) => index.toString()+""}
                    showsVerticalScrollIndicator={false}
                    onEndReached={getData}
                    onEndReachedThreshold={0.8}
                    initialNumToRender={10} // 처음 10개의 아이템을 렌더링
                    maxToRenderPerBatch={5} // 한 번에 최대 5개씩 렌더링
                />
            </>
            }
        </SafeBasicView>
    )

}