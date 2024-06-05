import WebView from "react-native-webview";
import styled from "styled-components/native";


const InfoView = styled.View`
    padding: 40px 20px 0; 
`
const MapOuter = styled.View`
    width: 100%; height: 90%;
`


export default function Info04(){
    
    return(
        <InfoView>
            <MapOuter>
                <WebView 
                    style={{width:'100%', height:'100%'}}
                    source={{uri:'https://www.hiedu.kr/design.do?page=08_provision/win_appMap'}}
                />
            </MapOuter>
        </InfoView>
    )
}



