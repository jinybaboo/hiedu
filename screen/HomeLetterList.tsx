import react, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { Line, PaddingView, SafeBasicView, Space } from "../common/commonStyled";
import { Animated, AppState, DeviceEventEmitter, View } from "react-native";

import { StudentSelectTop } from "../components/StudentSelectTop";
import { StudentSelectBottom } from "../components/StudentSelectBottom";
import { HeaderCustom } from "../components/HeaderCustom";
import colors from "../common/commonColors";
import { UnreadComp } from "../components/UnreadComp";
import { getAdminInfo, getAlarmList } from "../common/commonData";
import { useQuery } from "react-query";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { changeAlarmToRead, getAlarmFullDate, getWindowWidth, removeDuplicateJsonArrData } from "../common/commonFunc";
import { Loader } from "../components/Loader";
import { goHomeLetterContent } from "../common/commonNaviFunc";
import { AlarmListHeader } from "../components/AlarmListHeader";
import { useAppDispatch } from "../store";
import userSlice from "../slices/user";
import { useSelector } from "react-redux";

const HomeLetterFlatList = styled.FlatList`
`
const windowWidth = getWindowWidth();

const HomeLetterBoxPress = styled.Pressable`
    width:100%; padding:25px 0px 30px;
`
const HomeLetterTxt3 = styled.Text`
    font-family: 'noto700'; font-size: 16px; line-height: 19px; color:${colors.textBlack}; letter-spacing: -0.3px; margin-top: 20px;
`
const HomeLetterImgBox = styled.View`
    width:100%; height:${windowWidth-40}px; border-width: 1px; border-color: ${colors.lightGrayLine}; position: relative; margin-top: 12px;
`
const HomeLetterBlackOpa = styled.Image`
    width:${windowWidth-40}px; position: absolute; bottom:0;
` 
const HomeLetterImg = styled.Image`
     width:100%; height:${windowWidth-40-5}px;
`
const HomeLetterTxtBox = styled.View`
     width:100%; position: absolute; bottom:20px; padding: 12px 18px; 
`
const HomeLetterTxt4 = styled.Text`
    font-family: 'noto400'; font-size: 14px; line-height: 19.5px; color:#FFFFFF; letter-spacing: -0.3px;
`
const HomeLetterTxtBox2 = styled.View`
    flex-direction:row; justify-content:space-between; width:100%; position: absolute; bottom:8px; padding: 0px 18px 0; 
`
const HomeLetterTxtBox3 = styled.View`
    flex-direction:row; justify-content:space-between; width:100%; position: absolute; bottom:0px;
`

const HomeLetterTxt5 = styled(HomeLetterTxt4)`
    font-family: 'noto300'; font-size: 13px; text-decoration: underline; color:${colors.dateGray}; text-decoration-color: ${colors.dateGray}; text-align: right;
`
const HomeLetterTxt6 = styled.Text`
    font-family: 'noto400'; font-size: 13px; line-height: 15px; color:${colors.dateGray}; letter-spacing: -0.1px; margin-top: 3px;
`
const NoImageView =styled.View`
    width:100%; height:90px;  padding-top: 20px; margin-bottom: -10px;
`

const endReached = () =>{
    
}



export const HomeLetterList = () =>{
    const dispatch = useAppDispatch();
    const navigation:any = useNavigation();

    const selectedStudent:any = useSelector((state:any)=>state.user.selectedStudent);

    // const [selectedStudent, setSelectedStudent] = useState("전체");
    const [selectedSchool, setSelectedSchool] = useState("");
    const [isShowBottomModal, setIsShowBottomModal] = useState(false);

    const [listData, setListData] = useState([]);
    const [listDataFiltered, setListDataFiltered] = useState([]);
    const [receiveList, setReceiveList] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [fileUrl, setFileUrl ] = useState('');
    let user_id = useSelector((state:any)=>state.user.user_id);

    async function getData(){
        const data = await getAlarmList('letter', 'all', user_id);
        setListData(data);
        
        const receiveListData = removeDuplicateJsonArrData(data, 'name');
        let reveiveListTemp = [{name:'전체', school_name:""}];
        receiveListData.forEach(({name, school_name}:any)=>{
            reveiveListTemp.push({name, school_name});
        })
        setReceiveList(reveiveListTemp);


        const {webUrl}:any = await getAdminInfo();
        setFileUrl(webUrl+"/hieduapp/upload/files/");

        setIsLoading(false);
    }

    useEffect(()=>{
        getData();

    },[]);


    const selectStudent = (name:any, school_name:any) =>{
        dispatch(userSlice.actions.setSelectedStudent(name));
        // setSelectedStudent(name);
        setSelectedSchool(school_name);
        closeBottomModal();

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

        goHomeLetterContent(navigation,id, yyyymm);
    }

    const dataLength = listData?.length;
    if(isLoading){return <Loader/>}

    const renderItem = ({item:data, index}:any) => {										
        const sendDate = getAlarmFullDate(data?.send_date);	
        const insertDate = getAlarmFullDate(data?.insert_date);
        const yyyymm = insertDate.replace(".","").replace(" ","").substring(0,6);
        const {id, message, image} = data;
        const imageName = image?.split("^^")[0];
        
        const imgUrl = fileUrl+imageName.toLowerCase();
        return (
            <>
                <HomeLetterBoxPress onPress={()=>{
                    prepareGoAlarm(id, yyyymm);
                }}>
                    <AlarmListHeader data={data} />
    
                    <HomeLetterTxt3 numberOfLines={1}>{data.subject}</HomeLetterTxt3>
                    {imageName!=''?
                    <HomeLetterImgBox>
                        <HomeLetterImg 
                            source={{uri:imgUrl}}
                            resizeMode ="contain"
                        />
    
                        <HomeLetterBlackOpa 
                            source={require('../assets/icons/letterBlackOpa.png')}                
                        />
    
                         <HomeLetterTxtBox>
                            <HomeLetterTxt4 numberOfLines={2}>{message}</HomeLetterTxt4>
                        </HomeLetterTxtBox>
                        <HomeLetterTxtBox2>
                            <HomeLetterTxt6>{sendDate}</HomeLetterTxt6>
                            <HomeLetterTxt5>더보기</HomeLetterTxt5>
                        </HomeLetterTxtBox2>
                    </HomeLetterImgBox> 
                    :
                    <NoImageView>
                        <HomeLetterTxt4 numberOfLines={2} style={{color:colors.textBlack}}>{message}</HomeLetterTxt4>
                        <HomeLetterTxtBox3>
                            <HomeLetterTxt6>{sendDate}</HomeLetterTxt6>
                            <HomeLetterTxt5>더보기</HomeLetterTxt5>
                        </HomeLetterTxtBox3>
                    </NoImageView>
                    }
    
                </HomeLetterBoxPress>
                <Line color={colors.boxBorder}/>
            </>
        )
    
    
    };			

    return (
        <>
        <SafeBasicView>
            <HeaderCustom title={"가정통신문"}/>
            {dataLength<1?
            <UnreadComp text={'수신된 가정통신문이 없습니다.'}/>
            : 
           <PaddingView>
                {receiveList.length > 2 &&
                    <StudentSelectTop 
                        openBottomModal={openBottomModal} 
                        selectedStudent={selectedStudent}
                        selectedSchool={selectedSchool}
                    />
                }

                <Space height={8}/>
                <HomeLetterFlatList 
                    data = {selectedStudent=='전체'?listData:listDataFiltered}
                    renderItem={renderItem}
                    keyExtractor={(item:any, index:number) => index.toString()+""}
                    showsVerticalScrollIndicator={false}
                    onEndReached={endReached}
                    onEndReachedThreshold={0.8}
                    initialNumToRender={10} // 처음 10개의 아이템을 렌더링
                    maxToRenderPerBatch={5} // 한 번에 최대 5개씩 렌더링
                    ListHeaderComponent = {()=>(
                        <Line color={colors.boxBorder}/>
                    )}
                    ListFooterComponent = {()=>(
                        <Space height={150}/>
                    )}
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