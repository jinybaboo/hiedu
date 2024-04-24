import react, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { BasicScrollView, SafeBasicView } from "../common/commonStyled";
import { HeaderCustom } from "../components/HeaderCustom";
import { getAgreementInfo } from "../common/commonData";



const TextBox = styled.Text`
    font-family: 'noto500'; font-size: 14px; line-height: 17px; padding:0 20px;
`



export const Agreement = () =>{
    const [data, setData] = useState<any>([]);


    async function getData(){
        const data = await getAgreementInfo();
        setData(data);
    }

    useEffect(()=>{
        getData();

    },[]);
    

    return (
        <SafeBasicView>
            <HeaderCustom title={'이용약관'}/>
            <BasicScrollView>
                <TextBox>{data.agreement}</TextBox>                
            </BasicScrollView>
        </SafeBasicView>
    )

}

