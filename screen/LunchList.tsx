import react, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { PaddingView, SafeBasicView, Space } from "../common/commonStyled";
import { Animated } from "react-native";

import { StudentSelectTop } from "../components/StudentSelectTop";
import { StudentSelectBottom } from "../components/StudentSelectBottom";
import { HeaderCustom } from "../components/HeaderCustom";
import { UnreadComp } from "../components/UnreadComp";

import { useQuery } from "react-query";
import { Loader } from "../components/Loader";
import { LunchBox } from "../components/LunchBox";
import { getMyInfoDataForBottomSelect } from "../common/commonExportFunc";
import { getLunchInfo, getMySchoolCodeInfo, getMypageInfo} from "../common/commonData";
import { removeDuplicateJsonArrData, sortJsonArrayByKey } from "../common/commonFunc";



const FlatList = styled.FlatList`

`

export const LunchList = () =>{
    const [selectedStudent, setSelectedStudent] = useState("전체");
    const [selectedSchool, setSelectedSchool] = useState("");
    const [isShowBottomModal, setIsShowBottomModal] = useState(false);

    const [studentList, setStudentList] = useState([]);
    const [listData, setListData] = useState([]);
    const [listDataFiltered, setListDataFiltered] = useState([]);

    const [isLoading, setIsLoading] = useState(true);


    async function getData(){

        //바틈 메뉴 데이터
        let data = await getMypageInfo();
        let myInfo = getMyInfoDataForBottomSelect(data);

        console.log(myInfo);
        

        // 등록된 정보의 학교 코드 가져오기
        let schoolCodeArr = await getMySchoolCodeInfo(myInfo)

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

        //급식은 학교 단위 이므로 중복된 학교 코드는 myInfo에서 제거
        myInfo = removeDuplicateJsonArrData(myInfo, 'school_name');
        setStudentList(myInfo);

        
        let dataTemp:any = [];
        for(let i =0; i<schoolCodeArr.length; i++){
            const {ATPT_OFCDC_SC_CODE, SD_SCHUL_CODE, SCHUL_NM, SCHUL_KND_SC_NM} = schoolCodeArr[i];
            data = await getLunchInfo(ATPT_OFCDC_SC_CODE, SD_SCHUL_CODE);
            if(data?.mealServiceDietInfo!= undefined){
                let lunchArr = data?.mealServiceDietInfo[1]?.row;
                dataTemp = [...dataTemp, ...lunchArr];
            }
        }

        const finalData = sortJsonArrayByKey(dataTemp, 'MLSV_YMD');
        setListData(finalData);

        setIsLoading(false);

    } 

    useEffect(()=>{
        getData();
    },[]);
 


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


        const listDataFiltered = listData.filter((item:any)=> item.SCHUL_NM == school_name);
        setListDataFiltered(listDataFiltered);
    }


    const renderItem = ({item, index}:any) => {	
        return <LunchBox key={index+"_lb"} item={item} />
    };					
    


    if(isLoading){
        return <Loader />
    }

    return (
        <>
        <SafeBasicView>
            <HeaderCustom title={"오늘의 급식"}/>
            {listData.length===0?
            <UnreadComp text={'오늘의 급식 데이터가 없습니다.'}/>
            : 
            <>
                <PaddingView>
                {studentList.length > 2 &&
                    <StudentSelectTop 
                        openBottomModal={openBottomModal} 
                        selectedStudent={selectedStudent}
                        selectedSchool={selectedSchool}
                        from = 'lunchList'
                    />
                }
                </PaddingView>

                <FlatList 
                    data = {selectedStudent=='전체'?listData:listDataFiltered}
                    renderItem={renderItem}
                    keyExtractor={(item:any, index:number) => index.toString()+""}
                    showsVerticalScrollIndicator={true} //스크롤바 활성화
                    // onEndReached={getData}
                    onEndReachedThreshold={0.9}
                    initialNumToRender={2} // 처음 2개의 아이템을 렌더링
                    maxToRenderPerBatch={3} // 한 번에 최대 1개씩 렌더링
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
                from = 'lunchList'
            />
        }
        </>
        

    )

}