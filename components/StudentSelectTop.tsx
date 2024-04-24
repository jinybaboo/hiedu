import styled from "styled-components/native";
import colors from "../common/commonColors";
import { Space } from "../common/commonStyled";
import { Entypo } from '@expo/vector-icons';

const TopSelectPress = styled.Pressable`
    flex-direction: row; align-items: center; height:40px;
`
const TopSelectTxt = styled.Text`
     font-family: 'noto400'; font-size: 15px; line-height: 20px; color:${colors.textBlack}; letter-spacing: -0.8px; margin-right:4px;
`

export const StudentSelectTop = ({openBottomModal, selectedStudent, selectedSchool, from}:any)=>{
    let showName = true;
    if(from==='lunchList'){
        showName = false;

        if(selectedStudent==='전체'){
            selectedSchool = '전체';
        }
    }

   

    return (
        <>
            <Space height={15}/>
            <TopSelectPress onPress={openBottomModal}>
                <TopSelectTxt>{selectedSchool} {showName && selectedStudent}</TopSelectTxt>
                <Entypo name="chevron-small-down" size={24} color="black" />
            </TopSelectPress>
        </>
    )
}

  