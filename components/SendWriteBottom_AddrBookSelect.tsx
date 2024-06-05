import { Platform, View } from "react-native";
import colors from "../common/commonColors";
import { getWindowHeight, getWindowWidth } from "../common/commonFunc";
import { BottomSelTxt1, BottomSelTxt2, BottomSelectAnimated, BottomSelectHeader, BottomTxtPress, ClosePress, Line, ModalBackground, Space } from "../common/commonStyled";
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; 
import styled from "styled-components/native";

const windowHeight = getWindowHeight();
const windowWidth = getWindowWidth();
const os = Platform.OS;

const AddBookScroll = styled.ScrollView`
    width:100%; height: ${windowHeight-160}px; 
`
const Padding15 = styled.View`
    padding: 0 15px;
`
const BookCateView = styled.View`
    width: ${windowWidth-30}px; height:45px; background-color:#EFF0F3; border-radius: 5px; margin-top: 15px; flex-direction: row;
`
const BookCatePress = styled.Pressable`
    width:${((windowWidth-30)/3) - 1.5}px; height: 43px; background-color: #EFF0F3; border-radius: 5px; margin-top: 1px;  margin-left: 1px; justify-content: center; align-items: center;
`
const BookCateTxt = styled.Text`
    font-family: 'noto400'; font-size: 14px; line-height: 17px; color:${colors.textBlack}; letter-spacing: -0.2px; margin-top: 2px;
`

const BookBackground = styled.View`
    width: 100%; background-color:#EFF0F3; border-top-right-radius:15px; border-top-left-radius:15px; margin-top:15px; min-height: ${windowHeight-160 - 75 }px;
`
const BookBackground2 = styled.View`
    width: 100%; background-color:#FFFFFF; min-height: ${windowHeight-160 - 75 - 45}px; padding:25px 20px; padding-right: 0;
`
const BookBackground2_1 = styled(BookBackground2)`
    min-height: ${windowHeight-160 - 75 - 15}px; 
`
const PhoneSelView = styled.View`
    width:100%; height: 45px; flex-direction: row;
`
const PhoneSelPress = styled.Pressable`
    width:33.3%; align-items: center; justify-content: center; flex-direction: row;
`
const PhoneSelTxt = styled.Text`
    font-family: 'noto400'; font-size: 12px; line-height: 15px; color:#747474; letter-spacing: -0.2px; margin-top: 2px; padding-left: 3px;
`
const SelectView_Lv1 = styled.View`
    width:100%; height: 45px; flex-direction: row; justify-content: space-between;
`
const SelectLeftPress = styled.Pressable`
    height: 45px; align-items: center; flex-direction: row;
`
const SelectRightPress = styled.Pressable`
    width: 70px; height: 45px; justify-content: center; align-items: flex-end; padding-right: 20px;
`
const TreeImg = styled.Image`
    width: 17px; height:17px;
`
const TreeTxt = styled.Text`
    font-family: 'noto400'; font-size: 14px; line-height: 17px; color:${colors.textBlack}; letter-spacing: -0.2px; margin-top: 1.5px; padding-left: 6px;
`

const SelectView_Lv2 = styled.View`
    width:100%; height: 25px; margin-bottom:10px; flex-direction: row; justify-content: space-between;
`
const SelectLeftPress2 = styled.Pressable`
    height: 25px; align-items: center; flex-direction: row;
`
const SelectRightPress2 = styled.Pressable`
    width: 70px; height: 25px; justify-content: center; align-items: flex-end; padding-right: 20px;
`
const SelectView_Lv3 = styled(SelectView_Lv2)`
    padding-left: 22px;
`
const SelectView_Lv4 = styled(SelectView_Lv2)`
    padding-left: 42px;
`


const AddBookBtnPress = styled.Pressable`
    width:70px; height: 40px; background-color: ${colors.mainGreen}; border-radius: 5px; position: absolute; right:70px; align-items: center; justify-content: center;
`
const AddBookBtnTxt = styled.Text`
    font-family: 'noto400'; font-size: 14px; line-height: 17px; color:#FFF; letter-spacing: -0.2px; margin-top: 1.5px;
`

export const SendWriteBottom_AddrBookSelect = ({aniBoxPositionY, closeAddBookModal, selectAddBookData, addBookCate, setAddBookCate, changeMobileType, selPhoneType, 
    toggleGradeSelect, gradeArr, toggleGrade, classArr, toggleClassSelect, toggleClass, simpleStuAndPar, toggleStudentSelect, toggleLv4, toggleMobileSelect_stu, 
    teacherCateArr, simpleTeacher, toggleTeacherCateSelect, toggleTeacherCate, toggleMobileSelect_tea, simpleGroupSelect, simpleGroup, toggleGroupSelect, toggleGroup, toggleMobileSelect_group}:any)=>{
    
    return (
        <ModalBackground>
            <BottomSelectAnimated
                style={[{ transform: [{ translateY: aniBoxPositionY }] }]}
            >
                <BottomSelectHeader style={{position:'relative'}}>
                    <BottomSelTxt1>주소록</BottomSelTxt1>
                    <AddBookBtnPress onPress={selectAddBookData}>
                        <AddBookBtnTxt>추가</AddBookBtnTxt>
                    </AddBookBtnPress>
                    <ClosePress onPress={closeAddBookModal}>
                        <Ionicons name="close" size={24} color="black" />
                    </ClosePress>
                   
                </BottomSelectHeader>
                <AddBookScroll>
                    <Padding15>
                        <BookCateView>
                            <BookCatePress style={addBookCate==1 &&{backgroundColor:'#FFFFFF'}} onPress={()=>{setAddBookCate(1)}}>
                                <BookCateTxt style={addBookCate==1 &&{color:colors.mainBlue}}>학생/학부모</BookCateTxt>
                            </BookCatePress>
                            <BookCatePress style={addBookCate==2 &&{backgroundColor:'#FFFFFF'}} onPress={()=>{setAddBookCate(2)}}>
                                <BookCateTxt style={addBookCate==2 &&{color:colors.mainBlue}}>교직원</BookCateTxt>
                            </BookCatePress>
                            <BookCatePress style={addBookCate==3 &&{backgroundColor:'#FFFFFF'}} onPress={()=>{setAddBookCate(3)}}>
                                <BookCateTxt style={addBookCate==3 &&{color:colors.mainBlue}}>그룹</BookCateTxt>
                            </BookCatePress>
                        </BookCateView>
                    </Padding15> 

                    
                    {addBookCate == 1 &&
                    <BookBackground>
                        <Padding15>
                            <PhoneSelView>
                                <PhoneSelPress onPress={()=>{changeMobileType(1)}}>
                                    <MaterialIcons name={selPhoneType==1?"radio-button-on":"radio-button-off"} size={18} color={colors.mainBlue} />
                                    <PhoneSelTxt>학생번호</PhoneSelTxt>
                                </PhoneSelPress>
                                <PhoneSelPress onPress={()=>{changeMobileType(2)}}>
                                    <MaterialIcons name={selPhoneType==2?"radio-button-on":"radio-button-off"} size={18} color={colors.mainBlue} />
                                    <PhoneSelTxt>학부모번호1</PhoneSelTxt>
                                </PhoneSelPress>
                                <PhoneSelPress onPress={()=>{changeMobileType(3)}}>
                                    <MaterialIcons name={selPhoneType==3?"radio-button-on":"radio-button-off"} size={18} color={colors.mainBlue} />
                                    <PhoneSelTxt>학부모번호2</PhoneSelTxt>
                                </PhoneSelPress>                                
                            </PhoneSelView>
                            <BookBackground2>
                                {//학년 프린트
                                gradeArr.lenfth !=0 &&
                                gradeArr.map(({category1, showPlus, isSelected}:any, idx:number)=>{
                                    return(
                                        <View key={'grade_'+idx}>
                                        <SelectView_Lv1>
                                            <SelectLeftPress onPress={()=>{toggleGradeSelect(category1)}}>
                                                <TreeImg source={isSelected=='n'?require('../assets/icons/treeCheckOff.png'):require('../assets/icons/treeCheckOn.png')}/>
                                                <TreeTxt>{category1}학년</TreeTxt>
                                            </SelectLeftPress>
                                            <SelectRightPress onPress={()=>{toggleGrade(category1)}}>
                                                <TreeImg source={showPlus=='y'?require('../assets/icons/treePlus.png'):require('../assets/icons/treeMinus.png')}/>
                                            </SelectRightPress>
                                        </SelectView_Lv1>

                                        { //반 프린트
                                        classArr.lenfth !=0 &&
                                        classArr.map(({category1:category1_2, category2:category2_2, showPlus:showPlus2, isOpen:isOpen2, isSelected:isSelected2}:any, idx2:number)=>{
                                            return(
                                                <View key={'class_'+idx2}>
                                                    {category1 == category1_2 && isOpen2 =='y' && 
                                                    <View>
                                                   
                                                    <SelectView_Lv2>
                                                        <SelectLeftPress2 onPress={()=>{toggleClassSelect(category1_2, category2_2)}}>
                                                            <TreeImg source={require('../assets/icons/treeSide.png')} style={{marginRight:3}}/>
                                                            <TreeImg source={isSelected2=='n'?require('../assets/icons/treeCheckOff.png'):require('../assets/icons/treeCheckOn.png')}/>
                                                            <TreeTxt>{category2_2}반</TreeTxt>
                                                        </SelectLeftPress2>
                                                        <SelectRightPress2 onPress={()=>{toggleClass(category1_2, category2_2)}}>
                                                            <TreeImg source={showPlus2=='y'?require('../assets/icons/treePlus.png'):require('../assets/icons/treeMinus.png')}/>
                                                        </SelectRightPress2>
                                                    </SelectView_Lv2>

                                                    {
                                                    simpleStuAndPar.map((item3:any, idx3:number)=>{
                                                        const category1_3 = item3.category1;
                                                        const category2_3 = item3.category2;
                                                        const category3_3 = item3.category3;
                                                        const name = item3.name;
                                                        const mobile1 = item3?.mobile1;
                                                        const mobile2 = item3?.mobile2;
                                                        const mobile3 = item3?.mobile3;
                                                        const isOpen3 = item3?.isOpen;
                                                        const showLv4 = item3?.showLv4;

                                                        const isSelected3 = item3?.isSelected;
                                                        const mobile1Selected = item3?.mobile1Selected;
                                                        const mobile2Selected = item3?.mobile2Selected;
                                                        const mobile3Selected = item3?.mobile3Selected;

                                                        return(
                                                        <View key={'name_'+idx3}> 
                                                        {category1_2 == category1_3 && category2_2 == category2_3 && isOpen3 =='y' &&  
                                                        <View>
                                                            <SelectView_Lv3>
                                                                <SelectLeftPress2 onPress={()=>{toggleStudentSelect(category1_3, category2_3, category3_3)}}>
                                                                    <TreeImg source={require('../assets/icons/treeAngle.png')} style={{marginRight:3}}/>
                                                                    <TreeImg source={isSelected3=='n'?require('../assets/icons/treeCheckOff.png'):require('../assets/icons/treeCheckOn.png')}/>
                                                                    <TreeTxt>{category3_3}번 {name}</TreeTxt>
                                                                </SelectLeftPress2>
                                                                <SelectRightPress2 onPress={()=>{toggleLv4(category1_2, category2_2, category3_3)}}>
                                                                    <TreeImg source={showLv4=='n'?require('../assets/icons/treePlus.png'):require('../assets/icons/treeMinus.png')}/>
                                                                </SelectRightPress2>
                                                            </SelectView_Lv3>

                                                            {mobile1!=''&& mobile1 != null && mobile1 != undefined && showLv4 =='y' &&
                                                            <SelectView_Lv4>
                                                                <SelectLeftPress2 onPress={()=>{toggleMobileSelect_stu(category1_3, category2_3, category3_3, '1')}}>
                                                                    <TreeImg source={require('../assets/icons/treeDot.png')}/>
                                                                    <TreeImg source={mobile1Selected=='n'?require('../assets/icons/treeCheckOff.png'):require('../assets/icons/treeCheckOn.png')}/>
                                                                    <TreeTxt>학생번호</TreeTxt>
                                                                </SelectLeftPress2>
                                                            </SelectView_Lv4>}

                                                            {mobile2!=''&& mobile2 != null && mobile2 != undefined && showLv4 =='y' &&
                                                            <SelectView_Lv4>
                                                                <SelectLeftPress2 onPress={()=>{toggleMobileSelect_stu(category1_3, category2_3, category3_3, '2')}}>
                                                                    <TreeImg source={require('../assets/icons/treeDot.png')}/>
                                                                    <TreeImg source={mobile2Selected=='n'?require('../assets/icons/treeCheckOff.png'):require('../assets/icons/treeCheckOn.png')}/>
                                                                    <TreeTxt>학부모번호1</TreeTxt>
                                                                </SelectLeftPress2>
                                                            </SelectView_Lv4>}

                                                            {mobile3!=''&& mobile3 != null && mobile3 != undefined && showLv4 =='y' &&
                                                            <SelectView_Lv4>
                                                                <SelectLeftPress2 onPress={()=>{toggleMobileSelect_stu(category1_3, category2_3, category3_3, '3')}}>
                                                                    <TreeImg source={require('../assets/icons/treeDot.png')}/>
                                                                    <TreeImg source={mobile3Selected=='n'?require('../assets/icons/treeCheckOff.png'):require('../assets/icons/treeCheckOn.png')}/>
                                                                    <TreeTxt>학부모번호2</TreeTxt> 
                                                                </SelectLeftPress2>
                                                            </SelectView_Lv4>}

                                                        </View>
                                                        
                                                        }
                                                        </View>
                                                        )
                                                    //학생 프린트 끝 
                                                    })}
                                                     

                                                    </View>
                                                    }
                                                </View>
                                            )
                                        //반 프린트 끝
                                        })} 


                                        </View>

                                    )
                                
                                //학년 프린트 끝
                                })} 


                            </BookBackground2>
                        </Padding15>
                    </BookBackground>
                    }



                    {addBookCate == 2 &&
                    <BookBackground>
                        <Padding15>
                            <Space height={15}/>
                            <BookBackground2_1>
                            {teacherCateArr.map(({category1, showPlus, isSelected}:any, idx:number)=>{
                                return(
                                    <View key={'cate1_'+idx}>
                                        <SelectView_Lv1>
                                            <SelectLeftPress onPress={()=>{toggleTeacherCateSelect(category1)}}>
                                                <TreeImg source={isSelected=='n'?require('../assets/icons/treeCheckOff.png'):require('../assets/icons/treeCheckOn.png')}/>
                                                <TreeTxt>{category1==""?"부서없음":category1}</TreeTxt>
                                            </SelectLeftPress>
                                            <SelectRightPress onPress={()=>{toggleTeacherCate(category1)}}>
                                                <TreeImg source={showPlus=='y'?require('../assets/icons/treePlus.png'):require('../assets/icons/treeMinus.png')}/>
                                            </SelectRightPress>
                                        </SelectView_Lv1>

                                        {
                                        simpleTeacher.map((item1:any, idx1:number)=>{
                                            const category1_1 = item1.category1;
                                            const name = item1.name;
                                            const isOpen = item1?.isOpen;

                                            const isSelected1 = item1?.isSelected;
                                            const id = item1.id;

                                            return(
                                                <View key={'class_'+idx1}>
                                                    {category1 == category1_1 && isOpen =='y' && 
                                                   
                                                    <SelectView_Lv2>
                                                        <SelectLeftPress2 onPress={()=>{toggleMobileSelect_tea(id)}}>
                                                            <TreeImg source={require('../assets/icons/treeSide.png')} style={{marginRight:3}}/>
                                                            <TreeImg source={isSelected1=='n'?require('../assets/icons/treeCheckOff.png'):require('../assets/icons/treeCheckOn.png')}/>
                                                            <TreeTxt>{name}</TreeTxt>
                                                        </SelectLeftPress2>
                                                    </SelectView_Lv2>
                                                    }
                                                </View>
                                            
                                            )
                                        //교직원 프린트 끝 
                                        })}

                                    </View>
                                )
                            })

                            }
                            </BookBackground2_1>
                        </Padding15>
                    </BookBackground>
                    }

                    {addBookCate == 3 &&
                    <BookBackground>
                        <Padding15>
                            <Space height={15}/>
                            <BookBackground2_1>
                                
                            {simpleGroupSelect !=0 &&
                            simpleGroupSelect.map(({name, showPlus, isSelected, id}:any, idx:number)=>{
                                return(
                                    <View key={'cate1_'+idx}>
                                        <SelectView_Lv1>
                                            <SelectLeftPress onPress={()=>{toggleGroupSelect(id)}}>
                                                <TreeImg source={isSelected=='n'?require('../assets/icons/treeCheckOff.png'):require('../assets/icons/treeCheckOn.png')}/>
                                                <TreeTxt>{name}</TreeTxt>
                                            </SelectLeftPress>
                                            <SelectRightPress onPress={()=>{toggleGroup(id)}}>
                                                <TreeImg source={showPlus=='y'?require('../assets/icons/treePlus.png'):require('../assets/icons/treeMinus.png')}/>
                                            </SelectRightPress>
                                        </SelectView_Lv1>

                                        {
                                        simpleGroup.map((item1:any, idx1:number)=>{
                                            const group_id = item1.group_id;
                                            const name = item1.name;
                                            const isOpen = item1?.isOpen;
                                            const isSelected1 = item1?.isSelected;
                                            const phone_field = item1?.phone_field;
                                            const address_id = item1?.address_id;

                                            let mobileNumType = "";
                                            if(phone_field=='mobile1'){
                                                mobileNumType ="(휴대폰번호)"; 
                                            }else if(phone_field=='mobile2'){
                                                mobileNumType ="(휴대폰번호)";
                                            }else if(phone_field=='mobile3'){
                                                mobileNumType ="(휴대폰번호)";
                                            }else if(phone_field=='tel'){
                                                mobileNumType ="(전화번호)";
                                            }

                                            return(
                                                <View key={'class_'+idx1}>
                                                    {id == group_id && isOpen =='y' && 
                                                    <SelectView_Lv2>
                                                        <SelectLeftPress2 onPress={()=>{toggleMobileSelect_group(address_id, phone_field)}}>
                                                            <TreeImg source={require('../assets/icons/treeSide.png')} style={{marginRight:3}}/>
                                                            <TreeImg source={isSelected1=='n'?require('../assets/icons/treeCheckOff.png'):require('../assets/icons/treeCheckOn.png')}/>
                                                            <TreeTxt>{name} {mobileNumType}</TreeTxt>
                                                        </SelectLeftPress2>
                                                    </SelectView_Lv2>
                                                    }
                                                </View>
                                            
                                            )
                                        //그룹 프린트 끝 
                                        })}
                                    </View>
                                )
                            })

                            }
                            </BookBackground2_1>
                        </Padding15>
                    </BookBackground>
                    }







                </AddBookScroll>

                <Line color={colors.lightGrayLine}/>
                <Space height={30}/>

            </BottomSelectAnimated>
        </ModalBackground>
    )
}

  