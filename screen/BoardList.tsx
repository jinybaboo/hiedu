import react, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { Line, NoPaddingView, PaddingView, SafeBasicView, Space } from "../common/commonStyled";
import { Animated, View } from "react-native";

import { StudentSelectTop } from "../components/StudentSelectTop";
import { StudentSelectBottom } from "../components/StudentSelectBottom";
import { HeaderCustom } from "../components/HeaderCustom";
import { UnreadComp } from "../components/UnreadComp";
import { getBoardList, getMypageInfo } from "../common/commonData";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Loader } from "../components/Loader";
import { getAlarmFullDate, getBoardNew, getWindowWidth, removeDuplicateJsonArrData } from "../common/commonFunc";
import colors from "../common/commonColors";
import { goBoardContent } from "../common/commonNaviFunc";
import { CircleTxtBanner } from "../components/CircleTxtBanner";
import { Entypo } from '@expo/vector-icons';
import { useAppDispatch } from "../store";

const HomeLetterFlatList = styled.FlatList`
    margin-bottom: 50px;
`
const windowWidth = getWindowWidth();

const UnreadPress = styled.Pressable`
    height:140px; padding:26px 22px 30px 22px;
`

const UnreadTxtBox1 = styled.View`
    flex-direction: row; align-items: center; justify-content: space-between;
`
const UnreadTxt1 = styled.Text`
    font-family: 'noto500'; font-size: 15px; line-height: 20px; color:${colors.textBlack}; letter-spacing: -0.1px;
`
const UnreadTxt2 = styled(UnreadTxt1)`
    font-family: 'noto400'; margin-top: 12px; width: ${windowWidth-30-40}px;
`
const UnreadTxt3 = styled.Text`
    font-family: 'noto400'; font-size: 13px; line-height: 16px; color:#c3c3c3; letter-spacing: -0.1px; margin-top: 20px;
`



export const BoardList = () =>{
    const dispatch = useAppDispatch();
    const navigation:any = useNavigation();

    const [selectedStudent, setSelectedStudent] = useState("전체");
    const [selectedSchool, setSelectedSchool] = useState("");
    const [isShowBottomModal, setIsShowBottomModal] = useState(false);

    const isFocused = useIsFocused();

    const [listData, setListData] = useState([]);
    const [listDataFiltered, setListDataFiltered] = useState([]);
    const [receiveList, setReceiveList] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);


    async function getData(){
        let data = await getMypageInfo();
        const receiveListData = removeDuplicateJsonArrData(data, 'schoolName');
        
        let reveiveListTemp = [{name:'전체', school_name:""}];
        receiveListData.forEach(({name, schoolName:school_name}:any)=>{
            reveiveListTemp.push({name, school_name});
        })
        setReceiveList(reveiveListTemp);

        const schoolArr = data.reduce((returnArr:any, item:any) =>{								
            returnArr.push(item.schoolName)
            return returnArr;							
        },[]);								

        data = await getBoardList(schoolArr);
        setListData(data);

        setIsLoading(false); 
    }

    useEffect(()=>{
        getData();
    },[isFocused]);


    //애니메이션 세팅
    const aniBoxPositionY = useRef(new Animated.Value(0)).current;

    function closeBottomModal(){
        Animated.timing(aniBoxPositionY, {
            toValue: 500,
            duration:400,
            useNativeDriver: true,
        }).start(()=>{
            setIsShowBottomModal(false);
        });
    }

    function openBottomModal(){
        setIsShowBottomModal(true);
        Animated.timing(aniBoxPositionY, {
            toValue: 0,
            duration:600,
            useNativeDriver: true,
        }).start(()=>{
            
        });
    }

    useEffect(()=>{
        //애니메이션 기본값 셋팅
        closeBottomModal();
    },[])


    const selectStudent = (name:any, school_name:any) =>{
        setSelectedStudent(name);
        setSelectedSchool(school_name);
        closeBottomModal();

        const listDataFiltered = listData.filter((item:any)=> item.school_name == school_name);
        setListDataFiltered(listDataFiltered);
    }

    const renderItem = ({item, index}:any) => {		
        const {school_name, title, insert_date, id} = item;	
        const insertDate = getAlarmFullDate(insert_date);
        const isNew = getBoardNew(insert_date, 2);
        return(						
            <>
            {index===0 && <Line color={'#c3c3c3'}/>}
            <UnreadPress onPress={()=>{goBoardContent(navigation, id)}}>	
                <UnreadTxtBox1>
                    <UnreadTxt1>{school_name}</UnreadTxt1>
                    {isNew?<CircleTxtBanner text={'New'} color={colors.mainOrange}/> : <></>}
                </UnreadTxtBox1>
                <UnreadTxt2 numberOfLines={1}>{title}</UnreadTxt2>
                <UnreadTxt3>{insertDate}</UnreadTxt3>
            </UnreadPress>
            <Line color={'#c3c3c3'}/>								
        </>			
    )};		


    const dataLength = listData?.length;

    if(isLoading){return <Loader/>}


    return (
        <>
        <SafeBasicView>
            <HeaderCustom title={"공지사항"} hideBack={true}/>
            {dataLength<1?
            <UnreadComp text={'공지사항이 없습니다.'}/>
            : 
           <NoPaddingView>
               {receiveList.length > 2 &&
                    <PaddingView>
                        <StudentSelectTop 
                            openBottomModal={openBottomModal} 
                            selectedStudent={selectedStudent}
                            selectedSchool={selectedSchool}
                        />
                    </PaddingView>
                }

                <Space height={8}/>
                <HomeLetterFlatList 
                     data = {selectedStudent=='전체'?listData:listDataFiltered}
                    renderItem={renderItem}
                    keyExtractor={(item:any, index:number) => index.toString()+""}
                    showsVerticalScrollIndicator={false}
                    onEndReached={getData}
                    onEndReachedThreshold={0.8}
                    initialNumToRender={10} // 처음 10개의 아이템을 렌더링
                    maxToRenderPerBatch={5} // 한 번에 최대 5개씩 렌더링
                    ListFooterComponent = {()=>(
                        <Space height={50}/>
                    )}
                />
           </NoPaddingView>
           }
        </SafeBasicView>
            
        {isShowBottomModal &&
            <StudentSelectBottom 
                aniBoxPositionY={aniBoxPositionY}
                closeBottomModal={closeBottomModal}
                selectStudent={selectStudent}
                selectedStudent={selectedStudent}
                selectedSchool={selectedSchool}
                studentList ={receiveList}
            />
        }
        </>
        

    )

}