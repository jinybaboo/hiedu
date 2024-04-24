import styled from "styled-components/native";
import { Line, SafeBasicView, Space } from "../common/commonStyled";
import { getAlarmFullDate, getIsSurveyStarted, getWindowWidth } from "../common/commonFunc";
import { UnreadComp } from "../components/UnreadComp";
import colors from "../common/commonColors";
import { HeaderCustom } from "../components/HeaderCustom";
import { useEffect, useState } from "react";
import { getAlarmSearch } from "../common/commonData";
import { useNavigation, useRoute } from "@react-navigation/native";
import { goAlarmContent, goHomeLetterContent, goSurveyContent } from "../common/commonNaviFunc";
import { Loader } from "../components/Loader";

const windowWidth = getWindowWidth();

const SearchResultFlatList = styled.FlatList`
  
`

const SearchResultPress = styled.Pressable`
    height:140px; padding:26px 22px 30px 22px;
`

const SearchResultTxtBox1 = styled.View`
    flex-direction: row; align-items: center; justify-content: space-between;
`
const SearchResultTxt1 = styled.Text`
    font-family: 'noto700'; font-size: 15px; line-height: 18px; color:${colors.mainBlue}; letter-spacing: -0.1px;
`
const SearchResultTxt2 = styled.Text`
    font-family: 'noto400'; font-size: 12px; line-height: 15px; color:${colors.textBlack}; letter-spacing: -0.1px;
`
const SearchResultTxt3 = styled.Text`
    font-family: 'noto400'; font-size: 15px; line-height: 18px; color:${colors.textBlack}; letter-spacing: -0.1px; margin-top: 12px; width: ${windowWidth-30-40}px;
`
const SearchResultTxt4 = styled.Text`
    font-family: 'noto400'; font-size: 13px; line-height: 16px; color:#c3c3c3; letter-spacing: -0.1px; margin-top: 20px;
`   


export const SearchResult = () =>{
    const navigation:any = useNavigation();
    const route = useRoute();				
    const { searchWord }:any = route.params; 	

    const [searchData, setSerachData] = useState<any>();
    const [isLoading, setIsLoading] = useState(true);


    async function getData(){
       const data = await getAlarmSearch(searchWord);
       setSerachData(data);
       setIsLoading(false);
    }

    useEffect(()=>{
        getData();
    },[]);

 
    if(isLoading){return <Loader />}

    const renderItem = ({item, index}:any) => {		
        const {category, school_name, insert_date, id, name, subject, start_date} = item;
        const insertDate = getAlarmFullDate(insert_date);
        const yyyymm = insertDate.replace(".","").replace(" ","").substring(0,6);
        const isSurveyStarted = getIsSurveyStarted(start_date)
        
        let cateKor = "";
        let goFunction:any;

        if(category==='notice'){
            cateKor="알림장";
            goFunction = goAlarmContent;
        }else if(category==='letter'){
            cateKor="가정통신문";
            goFunction = goHomeLetterContent;
        }else if(category==='survey'){
            cateKor="설문조사";
            goFunction = goSurveyContent;
        }
        
        return(						
           <>
            {index===0 && <Line color={'#c3c3c3'}/>}
            <SearchResultPress onPress={()=>goFunction(navigation, id, yyyymm, isSurveyStarted)}>	
                <SearchResultTxtBox1>
                    <SearchResultTxt1>{cateKor}</SearchResultTxt1>
                    <SearchResultTxt2>{school_name}  [{name}]</SearchResultTxt2>
                </SearchResultTxtBox1>
                <SearchResultTxt3 numberOfLines={1}>{subject}</SearchResultTxt3>
                <SearchResultTxt4>{insertDate}</SearchResultTxt4>
            </SearchResultPress>
            <Line color={'#c3c3c3'}/>				
           </>
    )};										


    return (
        <SafeBasicView>
            <HeaderCustom title={'검색결과'}/>
            {searchData.length==0?
            <UnreadComp text={'검색 결과가 없습니다.'}/>
            :
            <>
                <Space height={6}/>
                <SearchResultFlatList
                    data = {searchData}
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