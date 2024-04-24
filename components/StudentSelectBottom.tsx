import styled from "styled-components/native";
import colors from "../common/commonColors";
import { Line, ModalBackground, Space } from "../common/commonStyled";
import { Ionicons } from '@expo/vector-icons'; 
import { Animated, View } from "react-native";


const BottomSelectAnimated = styled(Animated.createAnimatedComponent(View))`
    position: absolute; bottom:0px; width:100%; background-color: #FFFFFF;border-top-left-radius: 20px; border-top-right-radius:20px ;
`
const BottomSelectHeader = styled.View`
    flex-direction:row; justify-content:space-between; align-items:center; width:100%; height:70px; border-bottom-width:1px; 
    border-color: ${colors.lightGrayLine}; padding:0 20px;
`
const BottomSelTxt1 = styled.Text`
    font-family: 'noto400'; font-size: 18px; line-height: 21px; color:${colors.textBlack}; letter-spacing: -0.2px;
`
const BottomTxtPress = styled.Pressable`
    width:100%; height:55px; padding:0 20px; align-items:center; flex-direction: row; justify-content: space-between;
`
const BottomSelTxt2 = styled.Text`
    font-family: 'noto400'; font-size: 15px; line-height: 18px; color:${colors.textBlack}; letter-spacing: -0.2px;
`
const ClosePress = styled.Pressable`
    padding:15px 0 15px 30px;
`

export const StudentSelectBottom = ({aniBoxPositionY, closeBottomModal, selectStudent, selectedStudent, studentList, from}:any)=>{
    
    return (
        <ModalBackground>
                <BottomSelectAnimated
                    style={[{ transform: [{ translateY: aniBoxPositionY }] }]}
                >
                    <BottomSelectHeader>
                        <BottomSelTxt1>수신자 선택</BottomSelTxt1>
                        <ClosePress onPress={closeBottomModal}>
                            <Ionicons name="close" size={24} color="black" />
                        </ClosePress>
                    </BottomSelectHeader>
                    {
                    studentList.map((item:any, idx:any)=>{
                        const {id, name, school_name, category1, category2} = item;
                        let showName = true;
                        if(from==='lunchList'){
                            showName = false;
                        }
                        if(name==='전체'){
                            showName = true;
                        }

                        return(
                            <BottomTxtPress key={idx+""} onPress={()=>{selectStudent(name, school_name, category1, category2)}} style={selectedStudent== name && {backgroundColor:"#F7F9FB"}}>
                                <BottomSelTxt2 style={selectedStudent== name && {fontFamily:"noto700"}}>{school_name} {showName && name}</BottomSelTxt2>
                                {selectedStudent== name && <Ionicons name="checkmark" size={24} color={colors.mainBlue} />}
                            </BottomTxtPress>
                        )
                       
                    })
                    }

                    <Line color={colors.lightGrayLine}/>
                    <Space height={30}/>
                </BottomSelectAnimated>
           </ModalBackground>
    )
}

  