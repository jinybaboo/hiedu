import { View } from "react-native";
import styled from "styled-components/native";


const InfoScrollView = styled.ScrollView`
    padding: 40px 20px 0; 
`

const TextGreen = styled.Text`
    font-family:'noto500';color:#25b56c;
`
const InfoTxt = styled.Text`
    font-family:'noto500';font-size:11px; line-height: 18px; flex:1;
`
const SubInfoTxt = styled.Text`
    font-family:'noto500';font-size:11px;line-height:18px;
`
const Img = styled.Image`
    width: 50px; object-fit: contain; margin-right:10px;
`
const ImgView = styled.View`
    flex-direction: row; align-items: center; padding-bottom: 30px;
`
const SubImg = styled.Image`
    width: 13px; height:13px; object-fit: contain; margin-right: 10px;
`
const BackgroundView = styled.View`
    background-color: #f6f8fa; margin-bottom: 30px;
`
const PaddingView = styled.View`
    padding-left: 70px;
`
const TitleView = styled.View`
    flex-direction: row; align-items: center;
`
const SubView = styled.View`
    padding-left: 40px;
`



export default function Info02(){

    
    
    return(
        <InfoScrollView>
            <ImgView>
                <Img source={require('../assets/images/logo.png')} />
                <InfoTxt style={{flexWrap: "wrap"}}>
                    안녕하세요.{'\n'}
                    학교기업 홈페이지를 방문해 주셔서 감사합니다.{'\n'}
                    짧은 기간 동안 우리 학교는 많은 분야에서 놀랄만한 실적을 이루었으나 무엇보다도 제가 자신있게 내세우는 것은 본교가
                    산학협력업체와 협력하여 개발한 <TextGreen>문자서비스</TextGreen>와 <TextGreen>학생생활평점관리 그린마일리지</TextGreen> 입니다
                </InfoTxt>
            </ImgView>
            <BackgroundView>
                <PaddingView>
                    <View>
                        <TitleView>
                            <SubImg source={require('../assets/images/bullet.png')} />
                            <InfoTxt>문자서비스</InfoTxt>
                        </TitleView>
                        <SubView>
                            <SubInfoTxt>{'-'} 가정통신문 전송</SubInfoTxt>
                            <SubInfoTxt>{'-'} 단문, 장문, 사진, 팩스 전송</SubInfoTxt>
                            <SubInfoTxt>{'-'} 학생, 학부모, 그룹 등 문자 전송</SubInfoTxt>
                            <SubInfoTxt>{'-'} 에듀파인 연동 미납자 문자 전송</SubInfoTxt>
                            <SubInfoTxt>{'-'} 서로 다른 문자 전송</SubInfoTxt>
                            <SubInfoTxt>{'-'} 홈페이지 방식</SubInfoTxt>
                        </SubView>
                    </View>
                    <View>
                        <TitleView>
                            <SubImg source={require('../assets/images/bullet.png')} />
                            <InfoTxt>그린마일리지</InfoTxt>
                        </TitleView>
                        <SubView>
                            <SubInfoTxt>{'-'} 상{'(칭찬) & 벌(지도)'}점 발급</SubInfoTxt>
                            <SubInfoTxt>{'-'} 학생생활지도관리</SubInfoTxt>
                            <SubInfoTxt>{'-'} 누계 및 통계 자료조회</SubInfoTxt>
                            <SubInfoTxt>{'-'} 문자전송 {'(문자서비스이용시)'}</SubInfoTxt>
                            <SubInfoTxt>{'-'} 홈페이지 방식</SubInfoTxt>
                        </SubView>
                    </View>
                </PaddingView>
            </BackgroundView>
            <View>
                <View>
                    <InfoTxt>
                        본교 학교기업의 협력학교가 되십시오.
                        협력학교란 같은 교육기관으로서 학교간의 정보공유와 편익제공을 목적으로 하며, 정보에 대해 상호 신뢰와 보안을 지키고
                        서로 협력하겠다는 약속의 의미입니다.
                        {'\n\n'}
                        본교 학교기업은 협력학교를 대상으로 새로운 기술 개발과 정보 등을 홈페이지를 통해 신속하고 정확하게 제공해 드릴 것을 약속드립니다.
                        앞으로도 학교기업으로서의 역할을 잘 수행할수 있도록 변함없는 관심과 성원, 그리고 아낌없는 조언 부탁합니다.
                    </InfoTxt>
                </View>
            </View>
        </InfoScrollView>
    )
}



