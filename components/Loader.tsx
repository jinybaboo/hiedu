import styled from "styled-components/native";
import colors from "../common/commonColors";



export const Loader = ()=>{

    const LoaderView = styled.View`
        flex:1; justify-content: center; align-items: center; background-color: #FFFFFF;
    `
    const LoadImage = styled.Image`
        width:30px; height:30px;
    `
    return (
       <LoaderView>
            <LoadImage source={require('../assets/icons/spinner.gif')}/>
       </LoaderView>
    )
}

