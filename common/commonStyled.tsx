import styled from "styled-components/native";
import { Animated, Platform, View } from "react-native";
import colors from "./commonColors";
import { SafeAreaView } from 'react-native-safe-area-context';
import { getWindowWidth } from "./commonFunc";

const os = Platform.OS;
const windowWidth = getWindowWidth();


//베이직은 셋중 하나 선택
export const SafeBasicView = styled.SafeAreaView`flex:1; background-color: ${colors.backgroundWhite};`

export const BasicView = styled.View`flex:1; background-color: ${colors.backgroundWhite};`
export const BasicScrollView = styled.ScrollView`flex:1; height:100%; background-color:${colors.backgroundWhite};`

export const BasicInnerView = styled.View`flex:1; padding:0 20px;`

export const MainFlatList = styled.FlatList`flex:1; height:100%; background-color: ${colors.backgroundWhite};`

export const BasicKeyboardAvoidingView = styled.KeyboardAvoidingView`flex:1;`
export const PaddingView = styled.View`padding:0 20px; `
export const NoPaddingView = styled.View`padding:0px; `

/////////안드로이드 헤더 스페이스 
export const HeaderSpaceForAndroid = styled.View`width:100%; height: ${os=='ios'?0:40}px;`



////// 라인 및 공간 관리
export const Space = styled.View` width:100%; height:${(props:any) => props.height}px;`
export const Line = styled.View` width:100%; height:1px; background-color:${(props:any) => props.color};`


// 인풋용 공통
export const GrayInputBox = styled.View`
    flex-direction: row; width:100%; height:60px; border-width:1px; border-color: #f1f1f1; border-style: solid; border-radius: 5px; align-items: center; justify-content: space-between;
    padding:0 24px 0 18px;
`

// 모달용 컴포넌트 => SafeBasicView 바깥에 위치해야 함!!!!
export const ModalBackground = styled.View`
   width:${windowWidth}px; height:100%; background-color: rgba(0,0,0,0.6); position: absolute; left:0; top:0;
`
export const BottomSelectAnimated = styled(Animated.createAnimatedComponent(View))`
    position: absolute; bottom:0px; width:100%; background-color: #FFFFFF;border-top-left-radius: 20px; border-top-right-radius:20px ;
`
export const BottomSelectHeader = styled.View`
    flex-direction:row; justify-content:space-between; align-items:center; width:100%; height:70px; border-bottom-width:1px; 
    border-color: ${colors.lightGrayLine}; padding:0 20px;
`
export const BottomSelTxt1 = styled.Text`
    font-family: 'noto400'; font-size: 18px; line-height: 21px; letter-spacing: -0.2px; color:${colors.mainBlue};  padding-top: 4px;
`
export const BottomSelTxt1_1 = styled.Text`
    font-family: 'noto400'; font-size: 13px; line-height: 16px; color:${colors.placeholder}; letter-spacing: -0.2px; padding-top: 3px;
`
export const BottomTxtPress = styled.TouchableOpacity`
    width:100%; height:55px; padding:0 20px; align-items:center; flex-direction: row; justify-content: space-between;
`
export const BottomTxtView = styled.View`
    width:100%; height:55px; padding:0 20px; align-items:center; flex-direction: row; justify-content: space-between;
`
export const BottomSelTxt2 = styled.Text`
    font-family: 'noto400'; font-size: 15px; line-height: 18px; color:${colors.textBlack}; letter-spacing: -0.2px;
`
export const ClosePress = styled.Pressable`
    padding:15px 0 15px 30px;
`
