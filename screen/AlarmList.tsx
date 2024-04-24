import react, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { Line, ModalBackground, PaddingView, SafeBasicView, Space } from "../common/commonStyled";
import { Animated, AppState, DeviceEventEmitter, Platform, View } from "react-native";

import { StudentSelectTop } from "../components/StudentSelectTop";
import { StudentSelectBottom } from "../components/StudentSelectBottom";
import { HeaderCustom } from "../components/HeaderCustom";
import { UnreadComp } from "../components/UnreadComp";
import { getAlarmList, getMypageInfo } from "../common/commonData";
import { useQuery } from "react-query";
import { Loader } from "../components/Loader";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { changeAlarmToRead, getAlarmFullDate, removeDuplicateJsonArrData } from "../common/commonFunc";
import colors from "../common/commonColors";
import { goAlarmContent } from "../common/commonNaviFunc";
import { AlarmListHeader } from "../components/AlarmListHeader";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store";
import userSlice from "../slices/user";


const AlarmBoxPress = styled.Pressable`
    width:100%; padding:25px 20px; border-width: 1px; border-color:${colors.boxBorder}; border-radius: 10px;
`

const AlarmTxt3 = styled.Text`
    font-family: 'noto700'; font-size: 16px; line-height: 19px; color:${colors.textBlack}; letter-spacing: -0.3px; margin-top: 20px;
`
const AlarmTxt4 = styled.Text`
    font-family: 'noto500'; font-size: 14px; line-height: 19.5px; color:${colors.textBlack}; letter-spacing: -0.3px; margin-top: 12px;
`
const AlarmTxt5 = styled.Text`
    font-family: 'noto400'; font-size: 12px; line-height: 15px; color:${colors.dateGray}; letter-spacing: -0.1px; margin-top: 22px; text-align: right;
`
const AlarmFlatList = styled.FlatList``


const endReached = () =>{
    
}




export const AlarmList = () =>{
    const dispatch = useAppDispatch();
    const navigation:any = useNavigation();

    const [selectedStudent, setSelectedStudent] = useState("전체");
    const [selectedSchool, setSelectedSchool] = useState("");
    const [isShowBottomModal, setIsShowBottomModal] = useState(false);

    const [listData, setListData] = useState([]);
    const [listDataFiltered, setListDataFiltered] = useState([]);
    const [receiveList, setReceiveList] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);


    async function getData(){
        const data = await getAlarmList('notice', 'all');
        setListData(data);

        //상단 필터용 데이터 만들기
        const receiveListData = removeDuplicateJsonArrData(data, 'name');
        let reveiveListTemp = [{name:'전체', school_name:""}];
        receiveListData.forEach(({name, school_name}:any)=>{ reveiveListTemp.push({name, school_name});});
        setReceiveList(reveiveListTemp);

        setIsLoading(false);
    }

    useEffect(()=>{
        getData();

    },[]);


    

    const selectStudent = (name:any, school_name:any) =>{
        setSelectedStudent(name);
        setSelectedSchool(school_name);
        closeBottomModal();

        resetFilteredData(name, school_name);
    }

    function resetFilteredData(name:any, school_name:any){
        const listDataFiltered = listData.filter((item:any)=> item.name == name && item.school_name == school_name);
        setListDataFiltered(listDataFiltered);
    }

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
    },[]);

    function prepareGoAlarm(id:any, yyyymm:any){
        // 리스트에서 알림 처리!
        let newList =  changeAlarmToRead(listData, id);
        setListData(newList);

        newList =  changeAlarmToRead(listDataFiltered, id);
        setListDataFiltered(listDataFiltered);

        goAlarmContent(navigation, id, yyyymm);
    }



    const dataLength = listData?.length;

    if(isLoading){return <Loader/>}



    const renderItem = ({item:data, index}:any) => {			
        const sendDate = getAlarmFullDate(data?.send_date);							
        const insertDate = getAlarmFullDate(data?.insert_date);
        const yyyymm = insertDate.replace(".","").replace(" ","").substring(0,6);
        const {id, message, subject} = data;
    
        return (
            <>
            <AlarmBoxPress onPress={()=>{
                prepareGoAlarm(id, yyyymm);
                
            }}>
            <AlarmListHeader data={data} />
                <Space height={12}/>
                <Line color={colors.lightGrayLine}/>

                <AlarmTxt3 numberOfLines={1}>{subject}</AlarmTxt3>
                <AlarmTxt4 numberOfLines={2}>{message}</AlarmTxt4>
                <AlarmTxt5>{sendDate}</AlarmTxt5>
            </AlarmBoxPress>
            <Space height={25}/>
            </>
        )
    };										


    return (
        <>
        <SafeBasicView>
            <HeaderCustom title={"알림장"}/>
            
            {dataLength<1?
            <UnreadComp text={'수신된 알림장이 없습니다.'}/>
            :
            <PaddingView >
                {receiveList.length > 2 &&
                    <StudentSelectTop 
                        openBottomModal={openBottomModal} 
                        selectedStudent={selectedStudent}
                        selectedSchool={selectedSchool}
                    />
                }

                <Space height={8}/>
                <AlarmFlatList 
                    data = {selectedStudent=='전체'?listData:listDataFiltered}
                    renderItem={renderItem}
                    keyExtractor={(item:any, index:number) => index.toString()+""}
                    showsVerticalScrollIndicator={false}
                    onEndReached={endReached}
                    onEndReachedThreshold={0.8}
                    initialNumToRender={10} // 처음 10개의 아이템을 렌더링
                    maxToRenderPerBatch={5} // 한 번에 최대 5개씩 렌더링
                    ListFooterComponent={<Space height={150}/>} 
                />
           </PaddingView>
           
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