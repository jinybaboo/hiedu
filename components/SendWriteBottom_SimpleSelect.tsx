import colors from "../common/commonColors";
import { BottomSelTxt1, BottomSelTxt2, BottomSelectAnimated, BottomSelectHeader, BottomTxtPress, ClosePress, Line, ModalBackground, Space } from "../common/commonStyled";
import { Ionicons, AntDesign } from '@expo/vector-icons'; 




export const SendWriteBottom_SimpleSelect = ({aniBoxPositionY, closeSimpleReveiceModal, setSimplePickerData}:any)=>{
    return (
        <ModalBackground>
            <BottomSelectAnimated
                style={[{ transform: [{ translateY: aniBoxPositionY }] }]}
            >
                <BottomSelectHeader>
                    <BottomSelTxt1>수신자 선택</BottomSelTxt1>
                    <ClosePress onPress={closeSimpleReveiceModal}>
                        <Ionicons name="close" size={24} color="black" />
                    </ClosePress>
                </BottomSelectHeader>

                <BottomTxtPress onPress={()=>{setSimplePickerData('student')}}>
                    <BottomSelTxt2>학생번호 간편추가</BottomSelTxt2>
                    <AntDesign name="right" size={16} color="#9F9FA1" />
                </BottomTxtPress>
                <BottomTxtPress onPress={()=>{setSimplePickerData('parent1')}}>
                    <BottomSelTxt2>학부모번호1 간편추가</BottomSelTxt2>
                    <AntDesign name="right" size={16} color="#9F9FA1" />
                </BottomTxtPress>
                <BottomTxtPress onPress={()=>{setSimplePickerData('parent2')}}>
                    <BottomSelTxt2>학부모번호2 간편추가</BottomSelTxt2>
                    <AntDesign name="right" size={16} color="#9F9FA1" />
                </BottomTxtPress>
                <BottomTxtPress onPress={()=>{setSimplePickerData('teacher')}}>
                    <BottomSelTxt2>교직원주소록 간편추가</BottomSelTxt2>
                    <AntDesign name="right" size={16} color="#9F9FA1" />
                </BottomTxtPress>
                <BottomTxtPress onPress={()=>{setSimplePickerData('group')}}>
                    <BottomSelTxt2>그룹주소록 간편추가</BottomSelTxt2>
                    <AntDesign name="right" size={16} color="#9F9FA1" />
                </BottomTxtPress>

                <Line color={colors.lightGrayLine}/>
                <Space height={30}/>

            </BottomSelectAnimated>
        </ModalBackground>
    )
}

  