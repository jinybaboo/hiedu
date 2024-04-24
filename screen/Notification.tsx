import react, { useEffect, useState } from "react";
import styled from "styled-components/native";



const ViewBox = styled.View`
    flex:1; justify-content: center; align-items: center; background-color: aqua;
`

const TextBox = styled.Text`
    

`



export const Notification = () =>{
    

    return (
        <ViewBox>
            <TextBox>Notification</TextBox>
        </ViewBox>
    )

}