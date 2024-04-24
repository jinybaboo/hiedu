import react, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { PaddingView, SafeBasicView, Space } from "../common/commonStyled";
import { Alert, Animated} from "react-native";

import { StudentSelectTop } from "../components/StudentSelectTop";
import { StudentSelectBottom } from "../components/StudentSelectBottom";
import { HeaderCustom } from "../components/HeaderCustom";
import { UnreadComp } from "../components/UnreadComp";

import { fixTimeTableData, getMyInfoDataForBottomSelect } from "../common/commonExportFunc";
import { useQuery } from "react-query";
import { Loader } from "../components/Loader";
import { TimeTableBox } from "../components/TimeTableBox";
import { getMySchoolCodeInfo, getMypageInfo, getTimeTableInfo } from "../common/commonData";
import { useNavigation } from "@react-navigation/native";
import { goBack } from "../common/commonNaviFunc";
import { getDaysBeforeAsYYYYMMDD, getMonthsLaterAsYYYYMMDD, getTodayAsYYYYMMDD } from "../common/commonFunc";


const FlatList = styled.FlatList`

`


export const TimeTableList = () =>{
    const navigation:any = useNavigation();

    const [selectedStudent, setSelectedStudent] = useState("전체");
    const [selectedSchool, setSelectedSchool] = useState("");
    const [isShowBottomModal, setIsShowBottomModal] = useState(false);

    const [studentList, setStudentList] = useState([]);
    const [listData, setListData] = useState<any>([]);
    const [listDataFiltered, setListDataFiltered] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [schoolCodeArr, setSchoolCodeArr] = useState();
    const [pastDataNum, setPastDataNum] = useState(1);

    const flatListRef:any = useRef(null);
    const scrollOffset = useRef(0);

    async function getTimetableRawData(schoolCodeArr:any, studentList:any, startDate:string, endDate:string, endDate2:string){
        let dataTemp:any = [];
        
        for(let i =0; i<schoolCodeArr.length; i++){
            const {ATPT_OFCDC_SC_CODE, SD_SCHUL_CODE, SCHUL_NM, SCHUL_KND_SC_NM} = schoolCodeArr[i];
            for(let j=0; j<studentList.length; j++){
                const {school_name, category1, category2}:any = studentList[j];
                    if(SCHUL_NM==school_name && category1>=1 && category2>=1){
                        const data = await getTimeTableInfo(SCHUL_KND_SC_NM, ATPT_OFCDC_SC_CODE, SD_SCHUL_CODE,category1, category2, startDate, endDate, endDate2);
                        if(data?.RESULT?.code == undefined){
                            let arr:any = [];
                            if(SCHUL_KND_SC_NM==='중학교'){
                                arr = data?.misTimetable[1]?.row;
                            }else if(SCHUL_KND_SC_NM==='고등학교'){
                                arr = data?.hisTimetable[1]?.row;
                            }else{
                                arr = data?.elsTimetable[1]?.row;
                            }
                            dataTemp.push(arr)
                        }
                    }
            }
        }
        return dataTemp;
    }
    

    async function getData(){
        //바틈 메뉴 데이터
        let data = await getMypageInfo();
        let myInfo = getMyInfoDataForBottomSelect(data);

         // 등록된 정보의 학교 코드 가져오기
        let schoolCodeArr = await getMySchoolCodeInfo(myInfo);
        setSchoolCodeArr(schoolCodeArr);

        //등록된 학교 코드가 없으면 수신 myInfo 에서 제거
        myInfo = myInfo.filter((item:any)=>{
            const {name, school_name} = item;
            let hasSchool = false;
            schoolCodeArr.forEach(({SCHUL_NM}:any)=>{
                if(SCHUL_NM==school_name){
                    hasSchool = true;
                }
            })
            if(name==='전체'){
                hasSchool = true
            }
            return hasSchool;
        });

        //학생이 아닌데 category가 숫자가 아니면(담임이 아님) myInfo에서 제거
        myInfo = myInfo.filter((item:any)=>{
            const {category1, category2, kind, name} = item;
            
            let useData = false;
            if(kind==='s'){ 
                //학생데이터는 시간표 보여줌
                useData = true;
            }
            if(kind!=='s' && category1*1>0 && category2*1>0){
                //교직원중 선생님(학, 반이 1 이상인 교직원)은 시간표 보여줌
                useData = true;
            }
            if(name==='전체'){
                useData = true
            }
            return useData;
        });

        if(myInfo.length<=1){
            Alert.alert( '안내!', `시간표는 학생 및 학부모에게만 제공됩니다.`,  [{text: '확인', onPress: () => {
                // goBack(navigation);
            } }]);
            // return null;
        }




        setStudentList(myInfo);

        const today = getTodayAsYYYYMMDD(); 
        const fiveDayLater = getDaysBeforeAsYYYYMMDD(-2);
        const twoMonLater = getMonthsLaterAsYYYYMMDD(2)
        const dataTemp = await getTimetableRawData(schoolCodeArr, myInfo, today, twoMonLater, fiveDayLater);

        const timeTableData:any = fixTimeTableData(dataTemp);
        
        setListData(timeTableData);
        
        setIsLoading(false); 

    } 

    useEffect(()=>{
        getData();
    },[]);


    const selectStudent = (name:any, school_name:any, category1:any, category2:any) =>{
        setSelectedStudent(name);
        setSelectedSchool(school_name);
        closeBottomModal();

        let listDataFiltered:any = [];

        listData.forEach((item:any, idx:number) =>{
            const {SCHUL_NM, GRADE, CLASS_NM} = item[0];
            if(SCHUL_NM == school_name && GRADE == category1 && CLASS_NM ==category2){
                listDataFiltered.push(item)
            }
        })
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

    useEffect(()=>{ //애니메이션 기본값 셋팅
        closeBottomModal();
    },[])


    const handleScroll = async (event:any) => {
        // const offsetY = event.nativeEvent.contentOffset.y;
        
        //     if (offsetY === 0) {
        //         scrollOffset.current = event.nativeEvent.contentOffset.y;

        //         // 맨 위로 스크롤됐을 때 새로운 데이터 가져오기
        //         if (!isLoading) {
        //         // setIsLoading(true);
                
        //         const startDate = getDaysBeforeAsYYYYMMDD(pastDataNum+1);
        //         const endDate = getDaysBeforeAsYYYYMMDD(pastDataNum);


        //         const dataTemp = await getTimetableRawData(schoolCodeArr, studentList, startDate, endDate);
        //         const newData:any = fixTimeTableData(dataTemp);
        //         // 예를 들어, API 호출을 통해 새로운 데이터를 가져와서 newData 배열에 할당합니다.
        //         // 가져온 새로운 데이터를 newData 배열에 추가합니다.

        //         setListData([...newData, ...listData]);
                
        //         // 기존 데이터와 새로운 데이터를 합쳐서 업데이트합니다.
        //         // setIsLoading(false);
        //         setPastDataNum(pastDataNum+1);
        //         }
        // }
    };


    if(isLoading){return <Loader />}


    const renderItem = ({item, index}:any) => {	
        return(
            <TimeTableBox key={index+"ttb"} item={item}/>
    )};					
    

    return (
        <>
        <SafeBasicView>
            <HeaderCustom title={"우리반 시간표"}/>
            {listData.length===0?
            <UnreadComp text={'시간표 데이터가 없습니다.'}/>
            : 
            <>
                <PaddingView>
                {studentList.length > 2 &&
                    <StudentSelectTop 
                        openBottomModal={openBottomModal} 
                        selectedStudent={selectedStudent}
                        selectedSchool={selectedSchool}
                    />
                }
                </PaddingView>

                <FlatList 
                    ref={flatListRef}
                    data = {selectedStudent=='전체'?listData:listDataFiltered}
                    renderItem={renderItem}
                    keyExtractor={(item:any, index:number) => index.toString()+""}
                    showsVerticalScrollIndicator={true} //스크롤바 활성화
                    onEndReachedThreshold={0.9}
                    initialNumToRender={10} // 처음 2개의 아이템을 렌더링
                    maxToRenderPerBatch={10} // 한 번에 최대 1개씩 렌더링
                    onScroll={handleScroll}
                    ListFooterComponent = {()=>(
                        <Space height={50}/>
                    )}
                />
           </>
           }
        </SafeBasicView>
            
        {isShowBottomModal &&
            <StudentSelectBottom 
                aniBoxPositionY={aniBoxPositionY}
                closeBottomModal={closeBottomModal}
                selectStudent={selectStudent}
                selectedStudent={selectedStudent}
                selectedSchool={selectedSchool}
                studentList ={studentList}
            />
        }
        </>
        

    )

}