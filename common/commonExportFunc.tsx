import { Alert, Animated, Linking, Text } from "react-native";
import userSlice from "../slices/user";
import { deleteAppMember, getAdminInfo, getAuth, getIsAccessTokenValid, getSendAuthInfo, getUserInfoWithAccessToken } from "./commonData";
import { changeYYYYMMDDToYYYY_MM_DD, countJsonArrKeyValue, isObjectInArray } from "./commonFunc";
import EncryptedStorage from 'react-native-encrypted-storage';
import { goHome } from "./commonNaviFunc";
import RNFetchBlob from 'rn-fetch-blob';
import { Platform } from 'react-native';

const os = Platform.OS;

export const fixTimeTableData = (arr:any) =>{
    let finalReturnArr:any = [];
    arr.forEach((saperateArr:any)=>{
        const tempArr:any = [];

        const dateArr = saperateArr.reduce((returnArr:any, item:any) =>{		
            if(!tempArr.includes(item.ALL_TI_YMD)){
                returnArr.push(item.ALL_TI_YMD)
            }	
            tempArr.push(item.ALL_TI_YMD);												
            return returnArr;												
        },[]);	

        const dataByDateArr = dateArr.map((item:any, idx:any)=>{
            const tempArr2 = saperateArr.filter((value:any)=>{
                return item == value.ALL_TI_YMD
            })
            return tempArr2;
        })
       finalReturnArr = [...finalReturnArr, ...dataByDateArr];
    });
    
    return finalReturnArr;
}

export const prepareCalendarData = (data:any) => {
    const obj:any = {};
    data.map((item:any) =>{
        const {AA_YMD, EVENT_NM, SCHUL_NM} = item;
        const date = changeYYYYMMDDToYYYY_MM_DD(AA_YMD);
        obj[date] = {marked: true, EVENT_NM, SCHUL_NM}
    });
    return obj;
}

export const loginCheckAndSaveSendInfo = async (dispatch:any, phone:any) => {
    const accessToken:any =  await EncryptedStorage.getItem('accessToken'); 
    const isValid = await getIsAccessTokenValid(accessToken);
    if(isValid){
        dispatch(userSlice.actions.setIsLogin(true));
        dispatch(userSlice.actions.setPhone(phone));
        saveSendUserAndMemberInfo(dispatch); // 발신 관리자 정보 가져와서 리덕스 저장
    }
}

export const saveSendUserAndMemberInfo = async (dispatch:any) => {
    const accessToken:any =  await EncryptedStorage.getItem('accessToken'); 
    const {user_id, member_id, memberCount:isMember, userCount:isUser} = await getSendAuthInfo(accessToken);
    dispatch(userSlice.actions.setIsMember(isMember));
    dispatch(userSlice.actions.setIsUser(isUser));
    dispatch(userSlice.actions.setUser_id(user_id));
    dispatch(userSlice.actions.setMember_id(member_id));

    if(isUser && user_id==null){
        //user이나 member테이블에 명단이 없는 경우! user테이블에서 userId 가져오기
        const {id} = await getUserInfoWithAccessToken();
        dispatch(userSlice.actions.setUser_id(id));
    }

    const {auth} = await getAuth(isUser, member_id);
    dispatch(userSlice.actions.setAuth(auth));
}

export const logoutCheck = (dispatch:any, navigation:any) =>{
    Alert.alert( //alert 사용							
        '안내', '정말로 로그아웃 하시겠습니까?', [ //alert창 문구 작성						
            {text: '취소', onPress: () => {}}, //alert 버튼 작성					
            {text: '확인', onPress: () => {goLogout(dispatch, navigation)}}, //alert 버튼 작성					
        ]						
    );							
}

export const goLogout = async (dispatch:any, navigation:any) => {
    Alert.alert( '', '로그아웃 되었습니다.',  [{text: '확인', onPress: async () => {
        await deleteAppMember();
        
        await EncryptedStorage.removeItem('accessToken');
        dispatch(userSlice.actions.setIsLogin(false));
        goHome(navigation);
    } }])
}


export async function goToPageByPush(remoteMessage:any){
    const {category, id} = remoteMessage?.data;
    if(category=='notice'){
        // let result:any =  await getReportReplyList(ReportId, dispatch, navigation, '최신순'); //30분 이상 미접속시 토큰사용용!
        // goHome();
        // setTimeout(()=>{
        //     goReportContentDaily(ReportId);
        // },500)
        
    }else if(category=='letter'){
        
    }else if (category=='survey'){

    }
}

export function getSurverResponseArr(arr:any){
    let returnArr:any = [];
    arr.forEach(({qType,isDoubleAnswer,answer}:any, idx:number)=>{
        let tempObj:any = {};
        if(qType=='write'){
            tempObj = {
                qType,
                isDoubleAnswer,
                response:null,
            };
        }else if(qType=='choice' && !isDoubleAnswer){
            tempObj = {
                qType,
                isDoubleAnswer,
                response:null
            };
        }else if(qType=='choice' && isDoubleAnswer){
            const answerLength = answer.split("^^^^^").length;
            const resArr = new Array(answerLength).fill(false)
            tempObj = {
                qType,
                isDoubleAnswer,
                response:resArr,
            };
        }
        returnArr.push(tempObj);
    });
    return returnArr;
}

export function getMyInfoDataForBottomSelect(data:any){
    let myInfo:any = [ {id:'all', name:'전체'},];
    data.forEach((item:any, idx:number)=>{
        const {memberType, schoolName, name, category1, category2, kind} = item;
        let text1 = name;
        let text2 = "";
        if(memberType=='student'){
            text2 = `${category1}학년 ${category2}반`
        }
        if(memberType =='parent'){
            text2 = `${category1}학년 ${category2}반`
        }
        if(memberType=='member'){
            text2 ='교직원';
        }
        if(memberType=='user'){
            text1 ='관리자';
            text2 ='교직원';
        }
        if(memberType=='staff'){
            text2 = category1+' '+category2;
        }
        myInfo.push({
            id:idx+1,
            name:text1,
            school_name:schoolName,
            category1, 
            category2,
            kind,
        })
    });
    return myInfo;
}

export const linkWeb = (uri:string) => {
    if(uri!=''){
        Linking.openURL(uri).then((supported) => {
            if (!supported) {
            console.error('웹 브라우저 열기가 지원되지 않습니다.');
            } else {
            
            }
        })
        .catch((err) => console.error('오류 발생: ', err));
    }
    
}


export const downloadFile = async (fileName:any) =>{
    const { config, fs } = RNFetchBlob;
    const { DownloadDir, DocumentDir } = fs.dirs;

    const {webUrl}:any = await getAdminInfo();
    const fileUrl = webUrl+"/hieduapp/upload/files/";
    let downUrl = fileUrl+fileName;

    const filePath = os==='ios'?`${DocumentDir}/${fileName}`:`${DownloadDir}/${fileName}`

    try {
        const res:any = await RNFetchBlob.config({
          fileCache: true,
          path: filePath,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            mediaScannable: true,
            title: fileName,
            path: filePath,
          },
        }).fetch('GET', downUrl);
    
        // iOS에서 파일 저장
        if (os === 'ios') {
          fs.writeFile(filePath, res.data, 'base64');
          RNFetchBlob.ios.previewDocument(filePath);
        }
      } catch (error) {
        console.error('파일 다운로드 중 오류 발생:', error);
      }

}

export const changeHttpUrlTxt = (text:string) =>{
    // 정규표현식을 사용하여 URL 추출
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const splitText = text.split(urlRegex);

    const urlUnderlineTxt = splitText.map((item, index)=>{
    const isUrl = item.substring(0,4)==='http'?true:false;
        return(
            <Text key={index}>
            {isUrl ? 
                <Text 
                style={{ textDecorationLine: 'underline', color:'#2685CA' }} 
                onPress={() => Linking.openURL(item)}
                >{item}</Text>
            :
            <Text>{item}</Text>
            }
            </Text>
        )
    })

    return urlUnderlineTxt;
}

export const printSimpleAddrStudent = (dataArr:any, type:any, hasAuth:boolean, sendMemberInfo:any) =>{
	const simpleAddrStudentArr = dataArr.filter((item:any)=>{ return (item.mobile1 != null && item.mobile1 != "null" &&  item.mobile1.length != 0)});
	const simpleAddrParent1Arr = dataArr.filter((item:any)=>{ return (item.mobile2 != null && item.mobile2 != "null" &&  item.mobile2.length != 0)});
	const simpleAddrParent2Arr = dataArr.filter((item:any)=>{ return (item.mobile3 != null && item.mobile3 != "null" &&  item.mobile3.length != 0)});

    let arr:any = [];
	let basicTxt, addTxt = "";
	
	if(type==="student"){
		arr = simpleAddrStudentArr;	basicTxt ="학생번호";
	}else if(type==="parent1"){
		arr = simpleAddrParent1Arr;	basicTxt ="학부모번호1";	addTxt = "학부모"; 
	}else if(type==="parent2"){
		arr = simpleAddrParent2Arr;	basicTxt ="학부모번호2";	addTxt = "학부모2"; 
	}

    const allCount = arr.length;
	const optionInfoArr = [];
	
    //학년 정보 배열에 넣기
	let gradeList:any = []; 
	arr.forEach(({category1}:any)=>{
		if(!gradeList.includes(category1)){
			gradeList.push(category1);
		}
	});
	
	//학년 학반 정보 배열에 넣기
	let gradeClassList :any= []; 
	arr.forEach(({category1, category2}:any)=>{
		const tempObj = {category1, category2}
		const hasObj = isObjectInArray(gradeClassList,  tempObj);
		if(!hasObj){
			gradeClassList.push(tempObj);
		}
	});

	
	//학교 레벨 정보 넣기
	optionInfoArr.push({"level":"school","count":allCount });

    gradeList.forEach((grade:any)=>{
		//학년레벨 정보 넣기
		let gradeMemberCount = 0;
		arr.forEach(({category1}:any) =>{
			if(grade == category1){
				gradeMemberCount++;
			}
		})
		optionInfoArr.push({"level":"grade", grade, "count":gradeMemberCount });
		
		
		//반 레벨 정보 넣기
		gradeClassList.forEach(({category1:cate1, category2:cate2}:any)=>{
			if(grade == cate1){
				let classMemberCount = 0;
				arr.forEach(({category1, category2}:any) =>{
					if(cate1 == category1 && cate2 == category2){
						classMemberCount++;
					}
				})
				optionInfoArr.push({"level":"class", grade, classNum:cate2, "count":classMemberCount });
			}//
		})
	}); // End
	
    const initMenu = {value:'none',txt:'간편추가 선택',count:''};

    let returnArr:any = [initMenu];

    optionInfoArr.forEach((item:any)=>{
        
        const {level, count} = item;
        const grade = level=="school"?"-":item.grade;
        const classNum = (level=="school"|| level=="grade")? "-" : item.classNum;
        
        let txt = type==="student"?"학생":"학부모";
        if(type=='parent2'){txt='학부모2'}
        
        if(level=="grade"){
            txt = `${grade}학년 ${addTxt}`
        }else if(level=="class"){
            txt = `${grade}학년 ${classNum}반 ${addTxt}`
        }
        let value:any = {type, level, category1:grade, category2:classNum};
        value = JSON.stringify(value);
        returnArr.push({value, txt, count});
    });
    

    //조회 권한 설정
    const {category1, category2} = sendMemberInfo;

    let isClassTeacher = false;
    if(category1!==null && category1.length!=0 && category2!==null && category2.length!=0 ){
        isClassTeacher = true;
    }
    if(!hasAuth){
        let newReturnArr = [initMenu];
        if(isClassTeacher){
            returnArr = returnArr.filter((item:any)=> {		
                const teacherInfo = `${category1}학년 ${category2}반`;		
                return item.txt.includes(teacherInfo);
            });		
            newReturnArr =[...newReturnArr, ...returnArr];
            return newReturnArr;
        }else{
            return [{"count":"", "txt":"조회 권한이 없습니다.", "value":"none"}];
        }
    }else{
        return returnArr;
    }
    
}


export function printSimpleAddrTeacher(dataArr:any, hasAuth:boolean){
    // 교직원 간편 추가
    const cate1Arr:any = [];
    const cate2Arr:any = [];

    const allCount = dataArr.length;
    const optionInfoArr:any = [];


    dataArr.forEach((item:any) =>{
        const category1 = item.category1;
        const category2 = item.category2;
        (category1 != null && category1 != "null" &&  category1.length != 0) && !cate1Arr.includes(category1) && cate1Arr.push(category1);
        (category2 != null && category2 != "null" &&  category2.length != 0) && !cate2Arr.includes(category2) && cate2Arr.push(category2);
    })



    //전체 레벨 정보 넣기
    // optionInfoArr.push({"level":"교직원","count":allCount });


    //부서 레벨 정보 넣기
    cate1Arr.forEach((category1:any) =>{
        const count = countJsonArrKeyValue(dataArr,'category1', category1);
        optionInfoArr.push({"level":"부서별", "cateName":category1, count});
    })

    //직급레벨 정보 넣기
    cate2Arr.forEach((category2:any) =>{
        const count = countJsonArrKeyValue(dataArr,'category2', category2);
        optionInfoArr.push({"level":"직급별","cateName":category2, count});
    })

    let returnArr:any = [{value:'none',txt:'간편추가 선택',count:''}];
    optionInfoArr.forEach((item:any)=>{
		let {level, count, cateName}:any = item;
        if(cateName!=undefined){
            let value:any = {type:'teacher', level, cateName};
            value = JSON.stringify(value);
            returnArr.push({value, txt:cateName, count});
        };
	});

    if(!hasAuth){ returnArr = [{"count":"", "txt":"조회 권한이 없습니다.", "value":"none"}];}

    return returnArr;
}

export function printSimpleAddrGroup(dataArr:any, hasAuth:boolean){
    const groupNames = dataArr.map((item:any) => item.groupName); // groupName 값 추출
    const uniqueGroupNames = [...new Set(groupNames)]; // Set을 이용해 중복 제거

    let returnArr:any = [{value:'none',txt:'간편추가 선택',count:''}];

    uniqueGroupNames.forEach((item)=>{
        let mobile1Count = 0;
        let mobile2Count = 0;
        let mobile3Count = 0;
        let idFinal = '';
        dataArr.forEach((data:any)=>{
            const {groupName, mobile1, mobile2, mobile3, id} = data;
            if(item == groupName){
                idFinal = id;
                if(mobile1 != '' && mobile1 != undefined && mobile1 !='undefined' && mobile1 != null){
                    mobile1Count++;
                }
                if(mobile2 != '' && mobile2 != undefined && mobile2 !='undefined' && mobile2 != null){
                    mobile2Count++;
                }
                if(mobile3 != '' && mobile3 != undefined && mobile3 !='undefined' && mobile3 != null){
                    mobile3Count++;
                }
            }
        });
        

        if(mobile1Count !=0){
            let value:any = {type:'group', cateName:item, id:idFinal, mobileType:'mobile1'};
            value = JSON.stringify(value);
            returnArr.push({value, txt:item, count:mobile1Count, mobileType:'mobile1'});
        }
        if(mobile2Count !=0){
            let value:any = {type:'group', cateName:item, id:idFinal, mobileType:'mobile2'};
            value = JSON.stringify(value);
            returnArr.push({value, txt:item, count:mobile2Count, mobileType:'mobile2'});
        }
        if(mobile3Count !=0){
            let value:any = {type:'group', cateName:item, id:idFinal, mobileType:'mobile3'};
            value = JSON.stringify(value);
            returnArr.push({value, txt:item, count:mobile3Count, mobileType:'mobile3'});
        }
    })
    
    // dataArr.forEach((item:any)=>{
    //     const {name, count, id} = item;
    //     let value:any = {type:'group', cateName:name, id};
    //     value = JSON.stringify(value);
    //     returnArr.push({value, txt:name, count});
    // });

    if(!hasAuth){ returnArr = [{"count":"", "txt":"조회 권한이 없습니다.", "value":"none"}];}
    return returnArr;
}


export function addSimpleAddr(selectedArr:any, simpleStuAndPar:any, simpleTeacher:any, simpleGroup:any){
    
    let simpleDataArr:any = [];
    selectedArr.forEach(({type, level, category1, category2, cateName, id, mobileType}:any)=>{
        // 1. 학생 및 부모 간편추가 처리
        if(type==='student' || type==='parent1' || type==='parent2' ){
            const tempArr = getStudentParentDataWithSimpleInfo(simpleStuAndPar, type, level, category1, category2, '간편추가');
            simpleDataArr = [...simpleDataArr, ...tempArr];
        }// 2. 교직원 간편추가 처리			
        else if(type==='teacher'){
            const tempArr = getTeacherDataWithSimpleInfo(simpleTeacher, cateName, type, level, '간편추가');
            simpleDataArr = [...simpleDataArr, ...tempArr];
        }
        // 3. 그룹 간편추가 처리			
        else if(type==='group'){
            const tempArr = getGroupDataWithSimpleInfo(simpleGroup, type, id, mobileType, '간편추가');
            simpleDataArr = [...simpleDataArr, ...tempArr];
        }
    });

    return simpleDataArr;
}

const getStudentParentDataWithSimpleInfo = (arr:any, type:any, levelType:any, grade:any, classes:any, addType:any) =>{
	const returnArr:any = [];
	arr.forEach((item:any)=>{
		let tempObj:any = {};
		tempObj.addType = addType;
		tempObj.type = type;

        tempObj.category1 = item.category1;
        tempObj.category2 = item.category2;
        tempObj.category3 = item.category3;
        tempObj.category4 = item.category4;
        tempObj.fax = item.fax;
        tempObj.grade_class = item.grade_class;
        tempObj.isOpen = item.isOpen;
        tempObj.isSelected = item.isSelected;
        tempObj.kind = item.kind;
        tempObj.name = item.name;
        tempObj.user_id = item.user_id;

		//학교 전체 레벨
		if(levelType==='school' && type==='student'){
            if(item.mobile1!='' && item.mobile1!= undefined && item.mobile1!= null){
                tempObj.mobile = item.mobile1;
                tempObj.mobileType = 'mobile1';
                returnArr.push(tempObj);
            }
		}
		if(levelType==='school' && type==='parent1'){
            if(item.mobile2!='' && item.mobile2!= undefined && item.mobile2!= null){
                tempObj.mobile = item.mobile2;
                tempObj.mobileType = 'mobile2';
                returnArr.push(tempObj);
            }
		}
		if(levelType==='school' && type==='parent2'){
            if(item.mobile3!='' && item.mobile3!= undefined && item.mobile3!= null){
                tempObj.mobile = item.mobile3;
                tempObj.mobileType = 'mobile3';
                returnArr.push(tempObj);
            }
		}
		
		//학년 레벨
		if(levelType==='grade' && type==='student' && item.category1 == grade){
			if(item.mobile1!='' && item.mobile1!= undefined && item.mobile1!= null){
                tempObj.mobile = item.mobile1;
                tempObj.mobileType = 'mobile1';
                returnArr.push(tempObj);
            }
		}if(levelType==='grade' && type==='parent1' && item.category1 == grade){
            if(item.mobile2!='' && item.mobile2!= undefined && item.mobile2!= null){
                tempObj.mobile = item.mobile2;
                tempObj.mobileType = 'mobile2';
                returnArr.push(tempObj);
            }
		}if(levelType==='grade' && type==='parent2' && item.category1 == grade){
            if(item.mobile3!='' && item.mobile3!= undefined && item.mobile3!= null){
                tempObj.mobile = item.mobile3;
                tempObj.mobileType = 'mobile3';
                returnArr.push(tempObj);
            }
		}
		
		//반 레벨
		if(levelType==='class' && type==='student' && item.category1 == grade && item.category2 == classes){
			if(item.mobile1!='' && item.mobile1!= undefined && item.mobile1!= null){
                tempObj.mobile = item.mobile1;
                tempObj.mobileType = 'mobile1';
                returnArr.push(tempObj);
            }
		}
		if(levelType==='class' && type==='parent1' && item.category1 == grade && item.category2 == classes){
            if(item.mobile2!='' && item.mobile2!= undefined && item.mobile2!= null){
                tempObj.mobile = item.mobile2;
                tempObj.mobileType = 'mobile2';
                returnArr.push(tempObj);
            }
		}
		if(levelType==='class' && type==='parent2' && item.category1 == grade && item.category2 == classes){
            if(item.mobile3!='' && item.mobile3!= undefined && item.mobile3!= null){
                tempObj.mobile = item.mobile3;
                tempObj.mobileType = 'mobile3';
                returnArr.push(tempObj);
            }
		}
	})
	return returnArr;
}

const getTeacherDataWithSimpleInfo = (arr:any, cateName:any, type:any, level:any, addType:any) =>{
	const returnArr:any = [];
	
	arr.forEach((item:any)=>{
		let tempObj:any = {};
		tempObj.mobile = item.mobile1;
		tempObj.mobileType = 'mobile1';
		tempObj.addType = addType;
		tempObj.type = type;

        tempObj.category1 = item.category1;
        tempObj.category2 = item.category2;
        tempObj.category3 = item.category3;
        tempObj.category4 = item.category4;
        tempObj.isOpen = item.isOpen;
        tempObj.isSelected = item.isSelected;
        tempObj.kind = item.kind;
        tempObj.name = item.name;
        tempObj.user_id = item.user_id;

		
		const {category1, category2} = item;

        if(item.mobile1!='' && item.mobile1!= undefined && item.mobile1!= null){
            if(level==='부서별' && cateName == category1){
                returnArr.push(tempObj);
            }
            if(level==='직급별' && cateName == category2){
                returnArr.push(tempObj);
            }
        }
		
		
	});
	
	return returnArr;
}

const getGroupDataWithSimpleInfo = (arr:any, type:any, groupId:any, mobileType:any, addType:any) =>{
	const returnArr:any = [];
	arr.forEach((item:any)=>{
		let tempObj:any = {};
		tempObj.addType = addType;
        tempObj.type = type;
        tempObj.groupName = item.groupName;
        tempObj.isOpen = item.isOpen;
        tempObj.isSelected = item.isSelected;
        tempObj.name = item.name;
        tempObj.user_id = item.user_id;
        tempObj.mobileType = mobileType;
		
		const {group_id, phone_field, mobile1, mobile2, mobile3} = item;
        
		if(group_id == groupId){
			if(mobileType=='mobile1' && mobile1 != '' && mobile1 != undefined && mobile1 !='undefined' && mobile1 != null){
				tempObj.mobile = mobile1;
                returnArr.push(tempObj);
			}
			if(mobileType=='mobile2' && mobile2 != '' && mobile2 != undefined && mobile2 !='undefined' && mobile2 != null){
				tempObj.mobile = mobile2;
                returnArr.push(tempObj);
			}
			if(mobileType=='mobile3' && mobile3 != '' && mobile3 != undefined && mobile3 !='undefined' && mobile3 != null){
				tempObj.mobile = mobile3;
                returnArr.push(tempObj);
			}
			// if(phone_field=='tel'){
			// 	tempObj.mobile = item.tel;
			// 	tempObj.mobileType = 'tel';
			// }
		}
	});
	return returnArr;
}

export const checkAppMember = (totalSendInfoArr:any, appMemberPhone:any) =>{
    let appCount = 0;	
	totalSendInfoArr.forEach((item:any, idx:any) =>{
        if(item.mobile!=null){
            const mobile = item.mobile.replace("-","").replace("-","");
            const appMemberPhoneArr = appMemberPhone.map((item:any)=>item?.phone)
            const isApp = appMemberPhoneArr.includes(mobile);
            item.isApp = isApp;
            isApp && appCount++;
        }
		
	});
    return appCount;
}

export function getDirectPhoneSendAddrInfo(directPhoneNumber:string, simpleStuAndPar:any, simpleTeacher:any, simpleGroup:any){
    const returnArr:any = [];

    let isAdded = false;

    for (let item of simpleStuAndPar) {
        let tempObj:any = {};
		const {mobile1, mobile2, mobile3} = item;

        tempObj.addType = '직접입력';
        tempObj.kind = 's';
        tempObj.name = item.name;
        tempObj.user_id = item.user_id;
        tempObj.category1 = item.category1;
        tempObj.category2 = item.category2;
        tempObj.category3 = item.category3;
        tempObj.category4 == undefined?'':item.category4;
        
        if(mobile1 == directPhoneNumber){
            tempObj.mobileType = 'mobile1';
            tempObj.type = 'student';
            tempObj.mobile = item.mobile1;
            returnArr.push(tempObj);
            isAdded = true;
            return returnArr;
        }else if(mobile2 == directPhoneNumber){
            tempObj.mobileType = 'mobile2';
            tempObj.type = 'parent1';
            tempObj.mobile = item.mobile2;
            isAdded = true;
            returnArr.push(tempObj);
            return returnArr;
        }else if(mobile3 == directPhoneNumber){
            tempObj.mobileType = 'mobile3';
            tempObj.type = 'parent2';
            tempObj.mobile = item.mobile3;
            isAdded = true;
            returnArr.push(tempObj);
            return returnArr;
        }
    }

    //선생님인지 확인
    if(!isAdded){
        for (let item of simpleTeacher) {
            let tempObj:any = {};
            const {mobile1} = item;
    
            if(mobile1 == directPhoneNumber){
                tempObj.addType = '직접입력';
                tempObj.kind = 't';
                tempObj.name = item.name;
                tempObj.user_id = item.user_id;
                tempObj.category1 = item.category1;
                tempObj.category2 = item.category2;
                tempObj.category3 = item.category3;
                tempObj.category4 == undefined?'':item.category4;

                tempObj.mobileType = 'mobile1';
                tempObj.type = 'teacher';
                tempObj.mobile = item.mobile1;
                returnArr.push(tempObj);
                isAdded = true;
                return returnArr;
            }
        }
    }


    //그룹인지 확인은 안해도 됨!
    // if(!isAdded){
    //     for (let item of simpleGroup) {
    //         let tempObj:any = {};
    //         const {mobile1, mobile2, mobile3} = item;
            
    //     }
    // }



    // 하나도 안걸리면, 멤버가 아닌 일반 번호 입력됨.
    if(!isAdded){
        let tempObj:any = {};
        tempObj.addType = '직접입력';
        tempObj.kind = '직접입력';
        tempObj.name = '직접입력';
        tempObj.user_id = '직접입력';;
        tempObj.category1 = '직접입력';
        tempObj.category2 = '직접입력';
        tempObj.category3 = '직접입력';
        tempObj.category4 = '직접입력';

        tempObj.mobileType = '직접입력';
        tempObj.type = '직접입력';
        tempObj.mobile = directPhoneNumber;
        returnArr.push(tempObj);
        isAdded = true;
        return returnArr;
    }
        
}

    
		

export const isDirectPhoneAppMember = (directPhoneNumber:string, appMemberPhone:any) => {
    const mobile = directPhoneNumber.replace("-","").replace("-","");
    const appMemberPhoneArr = appMemberPhone.map((item:any)=>item?.phone);
    const isApp = appMemberPhoneArr.includes(mobile);
    return isApp;
}


export function getUpdatedDataArr_ToggleGrade(gradeArr:any, classArr:any, category1:string){
    const updatedGradeArr:any = gradeArr.map((item:any) => {
        if(item.category1 === category1) {
            return {
                ...item,
                showPlus: item.showPlus === 'y' ? 'n' : 'y'
            };
        }
        return item;
    });
    
    const updatedClassArr:any = classArr.map((item:any) => {
        if(item.category1 === category1) {
            return {
                ...item,
                isOpen: item.isOpen === 'y' ? 'n' : 'y'
            };
        }
        return item;
    });

    return {updatedGradeArr, updatedClassArr};
}



export function getUpdatedDataArr_ToggleClass(classArr:any, simpleStuAndPar:any, category1:string, category2:string){
    const updatedClassArr:any = classArr.map((item:any) => {
        if(item.category1 === category1 && item.category2 === category2) {
            return {
                ...item,
                showPlus: item.showPlus === 'y' ? 'n' : 'y'
            };
        }
        return item;
    });

    const updatedDataArr:any = simpleStuAndPar.map((item:any) => {
        if(item.category1 === category1 && item.category2 === category2) {
            return {
                ...item,
                isOpen: item.isOpen === 'y' ? 'n' : 'y'
            };
        }
        return item;
    });

    return {updatedClassArr, updatedDataArr};
}


export function getUpdatedStudentArr_ToggleLv4(simpleStuAndPar:any, category1:string, category2:string, category3:string){
    const updatedDataArr:any = simpleStuAndPar.map((item:any) => {
        if(item.category1 === category1 && item.category2 === category2 && item.category3 == category3) { 
            return {
                ...item,
                showLv4: item.showLv4 === 'y' ? 'n' : 'y'
            };
        }
        return item;
    });
    return updatedDataArr;
}


export function getUpdatedDataArr_ToggleTeacherCate(teacherCateArr:any, simpleTeacher:any, category1:string){
    const updatedTeacherCateArr:any = teacherCateArr.map((item:any) => {
        if(item.category1 === category1) {
            return {
                ...item,
                showPlus: item.showPlus === 'y' ? 'n' : 'y'
            };
        }
        return item;
    });

    const updatedDataArr:any = simpleTeacher.map((item:any) => {
        if(item.category1 === category1) {
            return {
                ...item,
                isOpen: item.isOpen === 'y' ? 'n' : 'y'
            };
        }
        return item;
    });
    
    return {updatedTeacherCateArr, updatedDataArr};
}

export function getUpdatedDataArr_ToggleGroup(simpleGroupSelect:any, simpleGroup:any, id:string){
    const updatedSimpleGroupSelect:any = simpleGroupSelect.map((item:any) => {
        if(item.id === id) {
            return {
                ...item,
                showPlus: item.showPlus === 'y' ? 'n' : 'y'
            };
        }
        return item;
    });

    const updatedDataArr:any = simpleGroup.map((item:any) => {
        if(item.group_id === id) {
            return {
                ...item,
                isOpen: item.isOpen === 'y' ? 'n' : 'y'
            };
        }
        return item;
    });
    
    return {updatedSimpleGroupSelect, updatedDataArr};
}

export function getUpdatedDataArr_ToggleGroupLv2(simpleGroupSelect:any, simpleGroup:any, address_id:string){
    const updatedDataArr:any = simpleGroup.map((item:any) => {
        if(item.address_id === address_id) {
            return {
                ...item,
                showLv2: item.showLv2 === 'y' ? 'n' : 'y'
            };
        }
        return item;
    });
    
    return {updatedDataArr};
}


export function getUpdatedDataArr_GradeSelect(gradeArr:any, classArr:any, simpleStuAndPar:any, category1:string, selPhoneType:any){
    let level1Selected = '';
    const updatedGradeArr:any = gradeArr.map((item:any) => {
        if(item.category1 === category1) {
            level1Selected = item.isSelected;
            return {
                ...item,
                isSelected: item.isSelected === 'y' ? 'n' : 'y'
            };
        }
        return item;
    });

    const updatedClassArr:any = classArr.map((item:any) => {
        if(item.category1 === category1) {
            return {
                ...item,
                isSelected: level1Selected === 'y' ? 'n' : 'y'
            };
        }
        return item;
    });

    const updatedDataArr:any = simpleStuAndPar.map((item:any) => {
        if(item.category1 === category1) { 
            if(selPhoneType==0){
                return {
                    ...item,
                    isSelected: level1Selected === 'y' ? 'n' : 'y',
                    mobile1Selected: level1Selected === 'y' ? 'n' : 'y',
                    mobile2Selected: level1Selected === 'y' ? 'n' : 'y',
                    mobile3Selected: level1Selected === 'y' ? 'n' : 'y',
                };
            }else if(selPhoneType==1){
                return {
                    ...item,
                    isSelected: level1Selected === 'y' ? 'n' : 'y',
                    mobile1Selected: level1Selected === 'y' ? 'n' : 'y',
                    mobile2Selected: 'n',
                    mobile3Selected: 'n',
                };
            }else if(selPhoneType==2){
                return {
                    ...item,
                    isSelected: level1Selected === 'y' ? 'n' : 'y',
                    mobile1Selected: 'n',
                    mobile2Selected: level1Selected === 'y' ? 'n' : 'y',
                    mobile3Selected: 'n',
                };
            }else if(selPhoneType==3){
                return {
                    ...item,
                    isSelected: level1Selected === 'y' ? 'n' : 'y',
                    mobile1Selected: 'n',
                    mobile2Selected: 'n',
                    mobile3Selected: level1Selected === 'y' ? 'n' : 'y',
                };
            }

            
        }
        return item;
    });
    return {updatedGradeArr, updatedClassArr, updatedDataArr};
}


export function getUpdatedDataArr_ClassSelect(classArr:any, simpleStuAndPar:any, category1:string, category2:string, selPhoneType:any){
    let level2Selected ='';

    const updatedClassArr:any = classArr.map((item:any) => {
        if(item.category1 === category1 && item.category2 === category2) {
            level2Selected = item.isSelected;
            return {
                ...item,
                isSelected: item.isSelected === 'y' ? 'n' : 'y'
            };
        }
        return item;
    });

    const updatedDataArr:any = simpleStuAndPar.map((item:any) => {
        if(item.category1 === category1 && item.category2 === category2) { 
            if(selPhoneType==0){
                return {
                    ...item,
                    isSelected: level2Selected === 'y' ? 'n' : 'y',
                    mobile1Selected: level2Selected === 'y' ? 'n' : 'y',
                    mobile2Selected: level2Selected === 'y' ? 'n' : 'y',
                    mobile3Selected: level2Selected === 'y' ? 'n' : 'y',
                };
            }else if(selPhoneType==1){
                return {
                    ...item,
                    isSelected: level2Selected === 'y' ? 'n' : 'y',
                    mobile1Selected: level2Selected === 'y' ? 'n' : 'y', 
                    mobile2Selected: 'n',
                    mobile3Selected: 'n',
                };
            }else if(selPhoneType==2){
                return {
                    ...item,
                    isSelected: level2Selected === 'y' ? 'n' : 'y',
                    mobile1Selected: 'n',
                    mobile2Selected: level2Selected === 'y' ? 'n' : 'y',
                    mobile3Selected: 'n',
                };
            }else if(selPhoneType==3){
                return {
                    ...item,
                    isSelected: level2Selected === 'y' ? 'n' : 'y',
                    mobile1Selected: 'n',
                    mobile2Selected: 'n',
                    mobile3Selected: level2Selected === 'y' ? 'n' : 'y',
                };
            }

            
        }
        return item;
    });

    return {updatedClassArr, updatedDataArr};
}

export function getUpdatedDataArr_StudentSelect(simpleStuAndPar:any, category1:string, category2:string, category3:string, selPhoneType:any){
    const updatedDataArr:any = simpleStuAndPar.map((item:any) => {
        if(item.category1 === category1 && item.category2 === category2 && item.category3 == category3) {
            let level3Selected = item.isSelected;
            if(selPhoneType==0){
                return {
                    ...item,
                    isSelected:  level3Selected === 'y' ? 'n' : 'y',
                    mobile1Selected: level3Selected === 'y' ? 'n' : 'y',
                    mobile2Selected: level3Selected === 'y' ? 'n' : 'y',
                    mobile3Selected: level3Selected === 'y' ? 'n' : 'y',
                };
            }else if(selPhoneType==1){
                return {
                    ...item,
                    isSelected: level3Selected === 'y' ? 'n' : 'y',
                    mobile1Selected: level3Selected === 'y' ? 'n' : 'y', 
                    mobile2Selected: 'n',
                    mobile3Selected: 'n',
                };
            }else if(selPhoneType==2){
                return {
                    ...item,
                    isSelected: level3Selected === 'y' ? 'n' : 'y',
                    mobile1Selected: 'n',
                    mobile2Selected: level3Selected === 'y' ? 'n' : 'y',
                    mobile3Selected: 'n',
                };
            }else if(selPhoneType==3){
                return {
                    ...item,
                    isSelected: level3Selected === 'y' ? 'n' : 'y',
                    mobile1Selected: 'n',
                    mobile2Selected: 'n',
                    mobile3Selected: level3Selected === 'y' ? 'n' : 'y',
                };
            }

            
        }
        return item;
    });

    return updatedDataArr;
}

export function getUpdatedDataArr_MobileSelect_stu(simpleStuAndPar:any, category1:string, category2:string, category3:string, mobileType:any){
    const updatedDataArr:any = simpleStuAndPar.map((item:any) => {
        if(item.category1 === category1 && item.category2 === category2 && item.category3 == category3) {
            const {mobile1, mobile2, mobile3} = item;

            const mobile1Selected = (mobile1=="" || mobile1==null || mobile1 == undefined) ?'n' : item.mobile1Selected;
            const mobile2Selected = (mobile2=="" || mobile2==null || mobile2 == undefined) ?'n' : item.mobile2Selected;
            const mobile3Selected = (mobile3=="" || mobile3==null || mobile3 == undefined) ?'n' : item.mobile3Selected;

            if(mobileType=='1'){
                let isSelected_1 = mobile1Selected === 'y' ? 'n' : 'y';
                if(mobile2Selected==='y' || mobile3Selected =='y'){ isSelected_1 = 'y';}
                return {
                    ...item,
                    isSelected : isSelected_1,
                    mobile1Selected: mobile1Selected === 'y' ? 'n' : 'y',
                    
                };
            }else if(mobileType=='2'){
                let isSelected_2 = mobile2Selected === 'y' ? 'n' : 'y';
                if(mobile1Selected==='y' || mobile3Selected =='y'){ isSelected_2 = 'y';}

                return {
                    ...item,
                    isSelected : isSelected_2,
                    mobile2Selected: mobile2Selected === 'y' ? 'n' : 'y',
                };
            }else if(mobileType=='3'){
                let isSelected_3 = mobile3Selected === 'y' ? 'n' : 'y';
                if(mobile1Selected==='y' || mobile2Selected =='y'){ isSelected_3 = 'y';}
                return {
                    ...item,
                    isSelected : isSelected_3,
                    mobile3Selected: mobile3Selected === 'y' ? 'n' : 'y',
                };
            }
        }
        return item;
    });
    return updatedDataArr;
}

export function getUpdatedDataArr_MobileSelect_tea(simpleTeacher:any, id:string){
    const updatedDataArr:any = simpleTeacher.map((item:any) => {
        if(item.id === id) {
            return {
                ...item,
                isSelected: item.isSelected === 'y' ? 'n' : 'y',
            }
        }
        return item;
    });
    return updatedDataArr;
}



export function getUpdatedDataArr_TeacherCate1Select(teacherCateArr:any, simpleTeacher:any, category1:string){
    let level1Selected = '';
    const updatedTeacherCateArr:any = teacherCateArr.map((item:any) => {
        if(item.category1 === category1) {
            level1Selected = item.isSelected;
            return {
                ...item,
                isSelected: item.isSelected === 'y' ? 'n' : 'y'
            };
        }
        return item;
    });

    const updatedDataArr:any = simpleTeacher.map((item:any) => {
        if(item.category1 === category1) { 
            return {
                ...item,
                isSelected: level1Selected === 'y' ? 'n' : 'y',
                mobile1Selected: level1Selected === 'y' ? 'n' : 'y',
                mobile2Selected: 'n',
                mobile3Selected: 'n',
            };
        }
        return item;
    });
    return {updatedTeacherCateArr, updatedDataArr};
}

export function getUpdatedDataArr_GroupSelect(simpleGroupSelect:any, simpleGroup:any, id:string, selGroupPhoneType:any){
    let level1Selected = '';
    const updatedSimpleGroupSelect:any = simpleGroupSelect.map((item:any) => {
        if(item.id === id) {
            level1Selected = item.isSelected;
            return {
                ...item,
                isSelected: item.isSelected === 'y' ? 'n' : 'y'
            };
        }
        return item;
    });

    const updatedDataArr:any = simpleGroup.map((item:any) => {
        if(item.group_id === id) { 
            if(selGroupPhoneType==0){
                return {
                    ...item,
                    isSelected: level1Selected === 'y' ? 'n' : 'y',
                    mobile1Selected: level1Selected === 'y' ? 'n' : 'y',
                    mobile2Selected: level1Selected === 'y' ? 'n' : 'y',
                    mobile3Selected: level1Selected === 'y' ? 'n' : 'y',
                };
            }else if(selGroupPhoneType==1){
                return {
                    ...item,
                    isSelected: level1Selected === 'y' ? 'n' : 'y',
                    mobile1Selected: level1Selected === 'y' ? 'n' : 'y',
                    mobile2Selected: 'n',
                    mobile3Selected: 'n',
                };
            }else if(selGroupPhoneType==2){
                return {
                    ...item,
                    isSelected: level1Selected === 'y' ? 'n' : 'y',
                    mobile1Selected: 'n',
                    mobile2Selected: level1Selected === 'y' ? 'n' : 'y',
                    mobile3Selected: 'n',
                };
            }else if(selGroupPhoneType==3){
                return {
                    ...item,
                    isSelected: level1Selected === 'y' ? 'n' : 'y',
                    mobile1Selected: 'n',
                    mobile2Selected: 'n',
                    mobile3Selected: level1Selected === 'y' ? 'n' : 'y',
                };
            }
            
        }
        return item;
    });
    return {updatedSimpleGroupSelect, updatedDataArr};
}

export function getUpdatedDataArr_MobileSelect_group(simpleGroup:any, address_id:string, phone_field:string, selGroupPhoneType:any){
    const updatedDataArr:any = simpleGroup.map((item:any) => {
        if(item.address_id === address_id && item.phone_field == phone_field) {
            if(selGroupPhoneType==0){
                return {
                    ...item,
                    isSelected: item.isSelected === 'y' ? 'n' : 'y',
                    mobile1Selected: item.isSelected === 'y' ? 'n' : 'y',
                    mobile2Selected: item.isSelected === 'y' ? 'n' : 'y',
                    mobile3Selected: item.isSelected === 'y' ? 'n' : 'y',
                };
            }else if(selGroupPhoneType==1){
                return {
                    ...item,
                    isSelected: item.isSelected === 'y' ? 'n' : 'y',
                    mobile1Selected: item.isSelected === 'y' ? 'n' : 'y',
                    mobile2Selected: 'n',
                    mobile3Selected: 'n',
                };
            }else if(selGroupPhoneType==2){
                return {
                    ...item,
                    isSelected: item.isSelected === 'y' ? 'n' : 'y',
                    mobile1Selected: 'n',
                    mobile2Selected: item.isSelected === 'y' ? 'n' : 'y',
                    mobile3Selected: 'n',
                };
            }else if(selGroupPhoneType==3){
                return {
                    ...item,
                    isSelected: item.isSelected === 'y' ? 'n' : 'y',
                    mobile1Selected: 'n',
                    mobile2Selected: 'n',
                    mobile3Selected: item.isSelected === 'y' ? 'n' : 'y',
                };
            }

        }
        return item;
    });
    return updatedDataArr;
}


export function getUpdatedDataArr_MobileTypeSelect_group(simpleGroup:any, address_id:string, phone_field:string, selectType:number){
    const updatedDataArr:any = simpleGroup.map((item:any) => {
        if(item.address_id === address_id && item.phone_field == phone_field) {
            if(selectType==1){
                return {
                    ...item,
                    mobile1Selected: item.mobile1Selected === 'y' ? 'n' : 'y',
                };
            }else if(selectType==2){
                return {
                    ...item,
                    mobile2Selected: item.mobile2Selected === 'y' ? 'n' : 'y',
                };
            }else if(selectType==3){
                return {
                    ...item,
                    mobile3Selected: item.mobile3Selected === 'y' ? 'n' : 'y',
                };
            }

        }
        return item;
    });
    return updatedDataArr;
}



export function getFinalSelectedAddBookData_stu(arr:any, hasAuth:boolean, sendMemberInfo:any){
    let tempArr = arr.filter( (item:any) => {
        return item.isSelected == 'y'
    });

    // 보낼 권한 없는 담임선생님 데이터 필터 
    const {category1, category2} = sendMemberInfo;
    let isClassTeacher = false;
    if(category1!==null && category1?.length!=0 && category2!==null && category2?.length!=0 ){
        isClassTeacher = true;
    }
    if(!hasAuth){
        if(isClassTeacher){
            tempArr = tempArr.filter((item:any)=> {		
                return item.category1 == category1 && item.category2 == category2
            });		
        }
    }


    // 필터 시작
    let resultArr:any = [];
    const type = 'student';
    const addType ='학생주소록';

    //모바일 1 설정
    tempArr.forEach((item:any)=>{
        const {mobile1, mobile1Selected} = item;
        let tempObj:any = {};

        tempObj.addType = addType;
        tempObj.type = type;
        tempObj.category1 = item.category1;
        tempObj.category2 = item.category2;
        tempObj.category3 = item.category3;
        tempObj.category4 = item.category4;
        tempObj.fax = item.fax;
        tempObj.grade_class = item.grade_class;
        tempObj.isOpen = item.isOpen;
        tempObj.isSelected = item.isSelected;
        tempObj.kind = item.kind;
        tempObj.name = item.name;
        tempObj.user_id = item.user_id;

        if(mobile1Selected=='y' && mobile1!='' && mobile1 != null && mobile1 != undefined){
            tempObj.mobile = item.mobile1;
            tempObj.mobileType = 'mobile1';
            resultArr.push(tempObj)
        }
    });

    //모바일 2 설정
    tempArr.forEach((item:any)=>{
        const {mobile2, mobile2Selected} = item;
        let tempObj:any = {};
        
        tempObj.addType = addType;
        tempObj.type = type;
        tempObj.category1 = item.category1;
        tempObj.category2 = item.category2;
        tempObj.category3 = item.category3;
        tempObj.category4 = item.category4;
        tempObj.fax = item.fax;
        tempObj.grade_class = item.grade_class;
        tempObj.isOpen = item.isOpen;
        tempObj.isSelected = item.isSelected;
        tempObj.kind = item.kind;
        tempObj.name = item.name;
        tempObj.user_id = item.user_id;

        if(mobile2Selected=='y' && mobile2!='' && mobile2 != null && mobile2 != undefined){
            tempObj.mobile = item.mobile2;
            tempObj.mobileType = 'mobile2';
            resultArr.push(tempObj)
        }
    });

    //모바일 3 설정
    tempArr.forEach((item:any)=>{
        const {mobile3, mobile3Selected} = item;
        let tempObj:any = {};

        tempObj.addType = addType;
        tempObj.type = type;
        tempObj.category1 = item.category1;
        tempObj.category2 = item.category2;
        tempObj.category3 = item.category3;
        tempObj.category4 = item.category4;
        tempObj.fax = item.fax;
        tempObj.grade_class = item.grade_class;
        tempObj.isOpen = item.isOpen;
        tempObj.isSelected = item.isSelected;
        tempObj.kind = item.kind;
        tempObj.name = item.name;
        tempObj.user_id = item.user_id;

        if(mobile3Selected=='y' && mobile3!='' && mobile3 != null && mobile3 != undefined){
            tempObj.mobile = item.mobile3;
            tempObj.mobileType = 'mobile3';
            resultArr.push(tempObj)
        }
    });

    return resultArr;
    
}


export function getFinalSelectedAddBookData_tea(arr:any){
    const tempArr = arr.filter( (item:any) => {
        return item.isSelected == 'y'
    });

    let resultArr:any = [];
    const type = 'teacher';
    const addType ='교직원주소록';

    //모바일 1만 설정 (2,3은 없음)
    tempArr.forEach((item:any)=>{
        const {mobile1} = item;
        let tempObj:any = {};

        tempObj.addType = addType;
        tempObj.type = type;
        tempObj.category1 = item.category1;
        tempObj.category2 = item.category2;
        tempObj.category3 = item.category3;
        tempObj.category4 = item.category4;
        tempObj.fax = item.fax;
        tempObj.grade_class = item.grade_class;
        tempObj.isOpen = item.isOpen;
        tempObj.isSelected = item.isSelected;
        tempObj.kind = item.kind;
        tempObj.name = item.name;
        tempObj.user_id = item.user_id;

        if(mobile1!='' && mobile1 != null && mobile1 != undefined){
            tempObj.mobile = item.mobile1;
            tempObj.mobileType = 'mobile1';
            resultArr.push(tempObj)
        }
    });
    return resultArr;
}


export function getFinalSelectedAddBookData_group(arr:any){
    const tempArr = arr.filter( (item:any) => {
        return (item.mobile1Selected == 'y' || item.mobile2Selected == 'y' || item.mobile3Selected == 'y')
    });

    let resultArr:any = [];
    const type = 'group';
    const addType ='그룹주소록';

    //모바일 1 설정
    tempArr.forEach((item:any)=>{
        const {mobile1, phone_field, mobile1Selected} = item;
        let tempObj:any = {};

        tempObj.addType = addType;
        tempObj.type = type;
        tempObj.isOpen = item.isOpen;
        tempObj.isSelected = item.isSelected;
        tempObj.name = item.name;
        tempObj.user_id = item.user_id;
        tempObj.groupName = item.groupName;

        if(mobile1Selected == 'y' && phone_field=='mobile1' && mobile1!='' && mobile1 != null && mobile1 != undefined){
            tempObj.mobile = item.mobile1;
            tempObj.mobileType = 'mobile1';
            resultArr.push(tempObj)
        }
    });

    //모바일 2 설정
    tempArr.forEach((item:any)=>{
        const {mobile2, phone_field, mobile2Selected} = item;
        let tempObj:any = {};
        
        tempObj.addType = addType;
        tempObj.type = type;
        tempObj.isOpen = item.isOpen;
        tempObj.isSelected = item.isSelected;
        tempObj.name = item.name;
        tempObj.user_id = item.user_id;
        tempObj.groupName = item.groupName;

        if(mobile2Selected == 'y' &&  phone_field=='mobile1' && mobile2!='' && mobile2 != null && mobile2 != undefined){
            tempObj.mobile = item.mobile2;
            tempObj.mobileType = 'mobile2';
            resultArr.push(tempObj)
        }
    });

    //모바일 3 설정
    tempArr.forEach((item:any)=>{
        const {mobile3, phone_field, mobile3Selected} = item;
        let tempObj:any = {};

        tempObj.addType = addType;
        tempObj.type = type;
        tempObj.isOpen = item.isOpen;
        tempObj.isSelected = item.isSelected;
        tempObj.name = item.name;
        tempObj.user_id = item.user_id;
        tempObj.groupName = item.groupName;

        if(mobile3Selected == 'y' && phone_field=='mobile1' && mobile3!='' && mobile3 != null && mobile3 != undefined){
            tempObj.mobile = item.mobile3;
            tempObj.mobileType = 'mobile3';
            resultArr.push(tempObj)
        }
    });

    // //tel 설정
    // tempArr.forEach((item:any)=>{
    //     const {tel, phone_field} = item;
    //     let tempObj:any = {};

    //     tempObj.addType = addType;
    //     tempObj.type = type;
    //     tempObj.isOpen = item.isOpen;
    //     tempObj.isSelected = item.isSelected;
    //     tempObj.name = item.name;
    //     tempObj.user_id = item.user_id;
    //     tempObj.groupName = item.groupName;

    //     if(phone_field=='tel' && tel!='' && tel != null && tel != undefined){
    //         tempObj.mobile = item.tel;
    //         tempObj.mobileType = 'tel';
    //         resultArr.push(tempObj)
    //     }
    // });
    
    return resultArr;
}


export function filterAddBookStudentNoAuthClassTeacher(arr:any, hasAuth:boolean, sendMemberInfo:any, type:string){
    const {category1, category2} = sendMemberInfo;
    
    let isClassTeacher = false;
    if(category1!==null && category1?.length!=0 && category2!==null && category2?.length!=0 ){
        isClassTeacher = true;
    }
    
    if(!hasAuth){
        if(isClassTeacher){
            const newArr = arr.filter((item:any)=> {		
                if(type==='grade'){
                    return item.category1 == category1
                }else{
                    return item.category1 == category1 && item.category2 == category2
                }
            });	
            return newArr;
        }else{
            return [];
        }
    }else{
        return arr;
    }
}


export function filterAddBookAuth(arr:any, hasAuth:boolean){
    
}
