import styled from "styled-components/native"
import { SafeBasicView } from "../common/commonStyled"
import { HeaderCustom } from "../components/HeaderCustom"
import { useState } from "react"
import InfoMenu from "../components/InfoMenu"
import Info01 from "../components/Info01"
import Info02 from "../components/Info02"
import Info03 from "../components/Info03"
import Info04 from "../components/Info04"
import InfoSubTitle from "../components/InfoSubTitle"



const MenuView = styled.View`
    flex-direction: row;
`

const SubMenuView = styled.View`
    flex-direction: row; padding:30px 20px 0;
`

const MenuBtn = styled.Pressable`
    width:25%; height:40px; background-color: #fff; justify-content: center; align-items: center;border-width: 1px; border-color: #ececec; border-bottom-width: 0px;
`
const MenuBtnInactive = styled(MenuBtn)`
    background-color: #f6f8fa; border-width: 1px; border-color: #ececec; border-bottom-width: 1px;
`
const MentTxt = styled.Text`
    font-family:'noto500'; font-size: 12px; color:#046de3; text-align: center;
`
const MentTxtInavtive = styled(MentTxt)`
    color:#333;
`


export const CompanyInfo = () =>{

    const [menu, setMenu] = useState(0);
    const [subMenu, setSubMenu] = useState(0);

    const subTitle = [
        {txt1:'학교기업 소개', txt2:'HIGH TECHNO'},
        {txt1:'학교장 인사말', txt2:'PRESIDENT\'S GREETINGS'},
        {txt1:'학교기업 연혁', txt2:'COMPANY HISTORY'},
        {txt1:'찾아오시는길', txt2:'DIRECTIONS'},
    ];

    const menuTxtArray = ['학교기업 소개', '학교장 인사말', '학교기업 연혁', '찾아오시는길'];


    return (
        <SafeBasicView>
            <HeaderCustom 
                title='학교기업 소개'
                hideBack = {false}
            />
            
            <MenuView>
                {
                menuTxtArray.map((title, idx)=>{
                    return(
                        <InfoMenu 
                            key={'InfoMenu_'+idx}
                            idx = {idx}
                            title = {title}
                            setMenu = {setMenu}
                            menu = {menu}
                        />
                    )
                })
                }
            </MenuView>

            <InfoSubTitle 
                subTitle={subTitle}
                idx={menu}
            />

            {menu===2 && 
            <SubMenuView>
               {subMenu === 0 ?
                <MenuBtn onPress={() => { setSubMenu(0) }}>
                    <MentTxt>2017 ~ </MentTxt>
                </MenuBtn>
                :
                <MenuBtnInactive onPress={() => { setSubMenu(0) }}>
                    <MentTxtInavtive>2017 ~</MentTxtInavtive>
                </MenuBtnInactive>
                }

                {subMenu === 1 ?
                <MenuBtn onPress={() => { setSubMenu(1) }}>
                    <MentTxt>2016 ~ 2011</MentTxt>
                </MenuBtn>
                :
                <MenuBtnInactive onPress={() => { setSubMenu(1) }}>
                    <MentTxtInavtive>2016 ~ 2011</MentTxtInavtive>
                </MenuBtnInactive>
                }

                {subMenu === 2 ?
                <MenuBtn onPress={() => { setSubMenu(2) }}>
                    <MentTxt>2010 ~ 2004</MentTxt>
                </MenuBtn>
                :
                <MenuBtnInactive onPress={() => { setSubMenu(2) }}>
                    <MentTxtInavtive>2010 ~ 2004</MentTxtInavtive>
                </MenuBtnInactive>
                }
            </SubMenuView>
            }
            
            {menu===0 && <Info01 />}
            {menu===1 && <Info02 />}
            {menu===2 && <Info03 subMenu={subMenu} />}
            {menu===3 && <Info04 />}



        </SafeBasicView>
    )
}