import styled from "styled-components/native";


const MenuBtn = styled.Pressable`
    width: 25%; height: 45px; background-color:#007aff; justify-content: center; align-items: center;
`
const MenuBtnInactive = styled(MenuBtn)`
    background-color: #FFF; border-width: 1px; border-color: #ececec; 
`
const MentTxt = styled.Text`
    font-family:'noto500'; font-size: 12px; color:#FFF; text-align: center;
`
const MentTxtInavtive = styled(MentTxt)`
    color:#333;
`


export default function InfoMenu({menu, setMenu, idx, title}:any){
    
    return(
        <>
            {menu===idx ? 
            <MenuBtn onPress={()=>{setMenu(idx)}}>
                <MentTxt>{title}</MentTxt>
            </MenuBtn>
            :
            <MenuBtnInactive onPress={()=>{setMenu(idx)}}>
                <MentTxtInavtive>{title}</MentTxtInavtive>
            </MenuBtnInactive>
            }
        </>
    )
}


