import styled from "styled-components/native";
import { Dimensions, ScrollView, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';


const windowWidth = Dimensions.get('window').width;
const boxWidth = (windowWidth - 40)/2 - 5;


const InfoScrollView = styled.ScrollView`
    padding: 40px 20px 0; 
`

const TextGreen = styled.Text`
    font-family:'noto500';color:#25b56c;
`
const InfoTxt = styled.Text`
    font-family:'noto500'; font-size:11px; line-height: 18px; flex:1;
`
const InfoView1 = styled.View`
    padding-bottom: 50px;
`
const InfoView2 = styled.View`
    padding: 60px 0;
    border-top-width: 1px;
    border-color: #e2e2e2;
`
const GradientView = styled(LinearGradient).attrs({
    colors: ['#0570de', '#25b46d'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
})`
    border-radius:8px;
    width:80px;
    height:55px;
    align-items:center;
    text-align:center;
    justify-content: center;
    margin-right: 5px;
`
const RowView = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
    gap: 10px;
`
const RowViewInner = styled.View`
    flex-direction: row; align-items: center; width:${boxWidth}px;
`
const RowViewInner2 = styled(RowViewInner)`
    width: 100%;
`

const GradientTxt = styled.Text`
    color:#fff;font-family:'noto500';font-size:10px;
`

const BackgroundImage = styled.ImageBackground`
    width: 100%; 
`

export default function Info01(){
    
    return(
        <InfoScrollView>
            <BackgroundImage
                source={require('../assets/images/infoBackground.png')}
            >
                <InfoView1>
                    <InfoTxt>
                        부산보건고등학교 하이테크노 학교기업은 학생의 현장 실습을 통한 우수 인재양성과 교원의 연구능력을 향상시키고 산업체 및 대학과의 기술이전 등을 촉진하기 위한 교육부지정으로 운영하고 있습니다.{'\n'}
                        학교기업 활동을 통해 발생한 수익금은 학생 장학금 및 교육 · 연구 목적을 위해 사용하는 등 학교 재정 건실화에도 기여하고 있습니다.{'\n'}
                        학교기업은 실무 중심의 교육과정을 익히고 학생이 관련 산업분야에 종사함으로써 학생의 직업탐색 및 진로 결정에 기여합니다.
                        {'\n'}{'\n'}
                        하이테크노 학교기업의 사업종목은 <TextGreen>모바일스쿨{'('}문자서비스{')'}</TextGreen>와 <TextGreen>그린마일리지{'('}학생생활평점관리{')'}</TextGreen>로 전국 초 · 중 · 고등학교에 개발 · 보급하고 있습니다.{'\n'}
                        각 학교와 가정간의 커뮤니 케이션을 강화시키며 교육발전에 이바지할 것입니다.
                    </InfoTxt>
                </InfoView1>
                <InfoView2>
                    <RowView>
                        <RowViewInner>
                            <GradientView><GradientTxt>학교기업명</GradientTxt></GradientView>
                            <InfoTxt>하이테크노 학교기업</InfoTxt>
                        </RowViewInner>
                        <RowViewInner>
                            <GradientView><GradientTxt>학교 개정일</GradientTxt></GradientView>
                            <InfoTxt>2024년 05월 08일</InfoTxt>
                        </RowViewInner>
                    </RowView>
                    <RowView>
                        <RowViewInner>
                            <GradientView><GradientTxt>사업자 등록일</GradientTxt></GradientView>
                            <InfoTxt>2004년 06월 16일</InfoTxt>
                        </RowViewInner>
                        <RowViewInner>
                            <GradientView><GradientTxt>사업자 등록번호</GradientTxt></GradientView>
                            <InfoTxt>602-82-06413</InfoTxt>
                        </RowViewInner>
                    </RowView>
                    <RowView>
                        <RowViewInner2>
                            <GradientView><GradientTxt>사업종목</GradientTxt></GradientView>
                            <InfoTxt>소프트웨어 개발, 보급{'('}모바일컨텐츠 개발, 구축 {')'}</InfoTxt>
                        </RowViewInner2>
                    </RowView>
                </InfoView2>
            </BackgroundImage>

        </InfoScrollView>
    )
}



