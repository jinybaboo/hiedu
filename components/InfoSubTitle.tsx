import styled from "styled-components/native";




export default function InfoSubTitle(props:any){
    
    const SubTitleView = styled.View`
        flex-direction: row; align-items: center; margin-top: 8px; padding: 0 20px;
    `
    const SubTitleTxt1 = styled.Text`
        font-family:'tit300'; font-size: 24px; color:#333; 
    `
    const SubTitleTxt2 = styled.Text`
        font-family:'tit300'; font-size: 16px; line-height:19px; color:#a3a9a9; padding-left: 8px; padding-top: 8px;
    `
    return(
        <SubTitleView>
            <SubTitleTxt1>{props.subTitle[props.idx].txt1}</SubTitleTxt1>
            <SubTitleTxt2>{props.subTitle[props.idx].txt2}</SubTitleTxt2>
        </SubTitleView>
    )
}



