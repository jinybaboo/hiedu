import styled from "styled-components/native";

const InfoScrollView = styled.ScrollView`
    padding: 0 20px; 
`
const FontTxt = styled.Text`
    font-family:'noto500';
`
const PaddingView = styled.View`
    padding: 30px 0px;border-bottom:dashed;border-bottom-width:1px;border-color:#e2e2e2;
`
const RowView = styled.View`
    flex-direction: row;
`
const BasisView = styled.View`
    flex-basis: 50%;
`
const LeftView = styled(BasisView)`
    padding-right: 5px;
`
const RightView = styled(BasisView)`
    padding-left: 5px;
`
const YearTxt = styled(FontTxt)`
    color: #e2eaf7;font-size:40px; font-family:'noto900'; line-height: 48px; padding-bottom: 15px;
`
const DetailRowView = styled(RowView)`
    margin-bottom: 10px; 
`
const DetailTxt1 = styled(FontTxt)`
    font-family:'noto700'; padding-right: 20px;font-size:12px; margin-left:5px;  line-height: 18px;
`
const DetailTxt2 = styled(FontTxt)`
    flex:1; font-size:12px;  line-height: 18px;
`
const Space30 = styled.View`
    height: 30px;
`

export default function Info03({subMenu}:any){
    
    return(
        <InfoScrollView>

            {subMenu===0&&
            <>
                <PaddingView>
                    <RowView>
                        <LeftView>
                            <YearTxt>2024</YearTxt>
                            <DetailRowView>
                                <DetailTxt1>01</DetailTxt1>
                                <DetailTxt2>학교기업 현장실습생 해외문화탐방{'(일본 오사카)'}</DetailTxt2>
                            </DetailRowView>
                        </LeftView>
                        <RightView>
                            <YearTxt>2023</YearTxt>
                            <DetailRowView>
                                <DetailTxt1>07</DetailTxt1>
                                <DetailTxt2>하이에듀 사이트 고도화</DetailTxt2>
                            </DetailRowView>
                            <DetailRowView>
                                <DetailTxt1>03</DetailTxt1>
                                <DetailTxt2>제12대 엄현수 교장 취임</DetailTxt2>
                            </DetailRowView>
                            <DetailRowView>
                                <DetailTxt1>01</DetailTxt1>
                                <DetailTxt2>학교기업 현장실습생 해외문화탐방{'(일본 오사카)'}</DetailTxt2>
                            </DetailRowView>
                        </RightView>
                    </RowView>
                </PaddingView>
                <PaddingView>
                    <RowView>
                        <LeftView>
                            <YearTxt>2020</YearTxt>
                            <DetailRowView>
                                <DetailTxt1>03</DetailTxt1>
                                <DetailTxt2>제11대 옥윤경 교장 취임</DetailTxt2>
                            </DetailRowView>
                            <DetailRowView>
                                <DetailTxt1>03</DetailTxt1>
                                <DetailTxt2>학교기업 현장실습생 해외문화탐방{'(대만 타이페이)'}</DetailTxt2>
                            </DetailRowView>
                        </LeftView>
                        <RightView>
                            <YearTxt>2019</YearTxt>
                            <DetailRowView>
                                <DetailTxt1>01</DetailTxt1>
                                <DetailTxt2>학교기업 현장실습생 해외문화탐방{'(일본 큐슈)'}</DetailTxt2>
                            </DetailRowView>
                        </RightView>
                    </RowView>
                </PaddingView>
                <PaddingView>
                    <RowView>
                        <LeftView>
                            <YearTxt>2018</YearTxt>
                            <DetailRowView>
                                <DetailTxt1>03</DetailTxt1>
                                <DetailTxt2>제10대 김정술 교장 취임</DetailTxt2>
                            </DetailRowView>
                            <DetailRowView>
                                <DetailTxt1>03</DetailTxt1>
                                <DetailTxt2>학교기업 현장실습생 해외문화탐방{'(일본 규슈)'}</DetailTxt2>
                            </DetailRowView>
                        </LeftView>
                        <RightView>
                            <YearTxt>2017</YearTxt>
                            <DetailRowView>
                                <DetailTxt1>01</DetailTxt1>
                                <DetailTxt2>학교기업 현장실습생 해외문화탐방{'(일본 큐슈)'}</DetailTxt2>
                            </DetailRowView>
                        </RightView>
                    </RowView>
                </PaddingView>
            </>
            }


        {subMenu=== 1 &&
            <>
            <PaddingView>
                <RowView>
                    <LeftView>
                        <YearTxt>2016</YearTxt>
                        <DetailRowView>
                            <DetailTxt1>08</DetailTxt1>
                            <DetailTxt2>학교기업 현장실습생 체험학습{'(중국 상해)'}</DetailTxt2>
                        </DetailRowView>
                        <DetailRowView>
                            <DetailTxt1>07</DetailTxt1>
                            <DetailTxt2>학교기업 현장실습생 체험학습{'(베트남 하노이)'}</DetailTxt2>
                        </DetailRowView>
                        <DetailRowView>
                            <DetailTxt1>03</DetailTxt1>
                            <DetailTxt2>제9대 고봉섭 교장 취임</DetailTxt2>
                        </DetailRowView>
                    </LeftView>
                    <RightView>
                        <YearTxt>2015</YearTxt>
                        <DetailRowView>
                            <DetailTxt1>12</DetailTxt1>
                            <DetailTxt2>청소년 창업 실무 교육</DetailTxt2>
                        </DetailRowView>
                        <DetailRowView>
                            <DetailTxt1>12</DetailTxt1>
                            <DetailTxt2>학교기업 현장실습생 체험학습</DetailTxt2>
                        </DetailRowView>
                    </RightView>
                </RowView>
            </PaddingView><PaddingView>
                    <RowView>
                        <LeftView>
                            <YearTxt>2014</YearTxt>
                            <DetailRowView>
                                <DetailTxt1>11</DetailTxt1>
                                <DetailTxt2>청소년 창업 실무 교육</DetailTxt2>
                            </DetailRowView>
                            <DetailRowView>
                                <DetailTxt1>10</DetailTxt1>
                                <DetailTxt2>청소년 창업 특강</DetailTxt2>
                            </DetailRowView>
                            <DetailRowView>
                                <DetailTxt1>07</DetailTxt1>
                                <DetailTxt2>학교기업 현장실습생 체험학습</DetailTxt2>
                            </DetailRowView>
                            <DetailRowView>
                                <DetailTxt1>03</DetailTxt1>
                                <DetailTxt2>제8대 김현수 교장 취임</DetailTxt2>
                            </DetailRowView>
                        </LeftView>
                        <RightView>
                            <YearTxt>2013</YearTxt>
                            <DetailRowView>
                                <DetailTxt1>10</DetailTxt1>
                                <DetailTxt2>2013 산학연협력 EXPO 학교기업 우수성과 전시 및 우수 사례 시상식 {'\n'}제품 마케팅 및 브랜드화 분야{'(최우수상), 신제품·신기술 개발 분야(우수상)'}</DetailTxt2>
                            </DetailRowView>
                            <DetailRowView>
                                <DetailTxt1>07</DetailTxt1>
                                <DetailTxt2>학교기업 현장실습생 체험학습</DetailTxt2>
                            </DetailRowView>
                            <DetailRowView>
                                <DetailTxt1>01</DetailTxt1>
                                <DetailTxt2>학교기업 현장실습생 해외 기업 탐방{'(베트남)'}</DetailTxt2>
                            </DetailRowView>
                        </RightView>
                    </RowView>
                </PaddingView><PaddingView>
                    <RowView>
                        <LeftView>
                            <YearTxt>2012</YearTxt>
                            <DetailRowView>
                                <DetailTxt1>10</DetailTxt1>
                                <DetailTxt2>2012 산학연협력 EXPO 학교기업 우수성과 전시</DetailTxt2>
                            </DetailRowView>
                            <DetailRowView>
                                <DetailTxt1>10</DetailTxt1>
                                <DetailTxt2>특성화고 직업교육 박람회 {' / 부산 발명·'}신기술 창업 박람회</DetailTxt2>
                            </DetailRowView>
                            <DetailRowView>
                                <DetailTxt1>08</DetailTxt1>
                                <DetailTxt2>학교기업 현장실습생 해외 선진기업 탐방{'(일본북큐슈)'}</DetailTxt2>
                            </DetailRowView>
                            <DetailRowView>
                                <DetailTxt1>07</DetailTxt1>
                                <DetailTxt2>학교기업 현장실습생 체험학습</DetailTxt2>
                            </DetailRowView>
                            <DetailRowView>
                                <DetailTxt1>03</DetailTxt1>
                                <DetailTxt2>보건 특성화계열 부산보건고등학교로 교명 변경</DetailTxt2>
                            </DetailRowView>
                        </LeftView>
                        <RightView>
                            <YearTxt>2011</YearTxt>
                            <DetailRowView>
                                <DetailTxt1>11</DetailTxt1>
                                <DetailTxt2>2011 산학연협력 EXPO 학교기업 우수성과 전시</DetailTxt2>
                            </DetailRowView>
                            <DetailRowView>
                                <DetailTxt1>07</DetailTxt1>
                                <DetailTxt2>학교기업 현장실습생 체험학습</DetailTxt2>
                            </DetailRowView>
                            <DetailRowView>
                                <DetailTxt1>01</DetailTxt1>
                                <DetailTxt2>서울 코엑스 2011 교육박람회</DetailTxt2>
                            </DetailRowView>
                            <DetailRowView>
                                <DetailTxt1>01</DetailTxt1>
                                <DetailTxt2>학교기업 현장실습생 체험학습</DetailTxt2>
                            </DetailRowView>
                        </RightView>
                    </RowView>
                </PaddingView>
            </>
            }
            {subMenu===2&&
            <>
            <PaddingView>
                <RowView>
                    <LeftView>
                        <YearTxt>2010</YearTxt>
                        <DetailRowView>
                            <DetailTxt1>11</DetailTxt1>
                            <DetailTxt2>특성화고 직업교육박람회 {'/ 부산 발명·'}신기술 창업 박람회</DetailTxt2>
                        </DetailRowView>
                        <DetailRowView>
                            <DetailTxt1>10</DetailTxt1>
                            <DetailTxt2>학교기업 현장실습생 체험학습</DetailTxt2>
                        </DetailRowView>
                        <DetailRowView>
                            <DetailTxt1>02</DetailTxt1>
                            <DetailTxt2>2009년도 교육과학기술부 평가 최우수 학교기업 선정</DetailTxt2>
                        </DetailRowView>
                    </LeftView>
                    <RightView>
                        <YearTxt>2009</YearTxt>
                        <DetailRowView>
                            <DetailTxt1>05</DetailTxt1>
                            <DetailTxt2>그린마일리지{'(학생생활평점관리)'} 프로그램 개발</DetailTxt2>
                        </DetailRowView>
                        <DetailRowView>
                            <DetailTxt1>04</DetailTxt1>
                            <DetailTxt2>학교기업 현장실습생 체험학습</DetailTxt2>
                        </DetailRowView>
                        <DetailRowView>
                            <DetailTxt1>01</DetailTxt1>
                            <DetailTxt2>대한사립중고등학교 교장회와 모바일스쿨 확대 보급을 위한 협약식{'(MOU)'} 체결</DetailTxt2>
                        </DetailRowView>
                    </RightView>
                </RowView>
            </PaddingView><PaddingView>
                    <RowView>
                        <LeftView>
                            <YearTxt>2008</YearTxt>
                            <DetailRowView>
                                <DetailTxt1>09</DetailTxt1>
                                <DetailTxt2>양질의 모바일스쿨 발송을 위해 {'(주)'}KT의 전송망 이용</DetailTxt2>
                            </DetailRowView>
                            <DetailRowView>
                                <DetailTxt1>04</DetailTxt1>
                                <DetailTxt2>{'RFID/USN'}을 이용한 양호실 관리 및 급식소 관리 2개 부문 특허출원중</DetailTxt2>
                            </DetailRowView>
                            <DetailRowView>
                                <DetailTxt1>03</DetailTxt1>
                                <DetailTxt2>{'(재)'}부산테크노파크와 고령친화용품산업화지원센터와
                                    RFID관련 신기술 개발을 위한 업무 협약식 체결</DetailTxt2>
                            </DetailRowView>
                        </LeftView>
                        <RightView>
                            <YearTxt>2007</YearTxt>
                            <DetailRowView>
                                <DetailTxt1>11</DetailTxt1>
                                <DetailTxt2>{'(주)'}KT와 전국 학교 및 학원에 모바일스쿨 확대 구축·보급을 위한 협약식{'(MOU)'} 체결</DetailTxt2>
                            </DetailRowView>
                            <DetailRowView>
                                <DetailTxt1>10</DetailTxt1>
                                <DetailTxt2>대구광역시 대구소방본부 모바일 전송 프로그램 제작</DetailTxt2>
                            </DetailRowView>
                            <DetailRowView>
                                <DetailTxt1>09</DetailTxt1>
                                <DetailTxt2>{'RFID/USN'}을 이용한 실습실 및 기자재 관리 특허권 취득 {'-'} 등록일
                                    등록번호 제 {'10-0760381'}호 외 RFID관련 4개 부문 특허 출원</DetailTxt2>
                            </DetailRowView>
                        </RightView>
                    </RowView>
                </PaddingView><PaddingView>
                    <RowView>
                        <LeftView>
                            <YearTxt>2006</YearTxt>
                            <DetailRowView>
                                <DetailTxt1>11</DetailTxt1>
                                <DetailTxt2>전국 최초 영도구 지역 혁신 모바일 스쿨존 구축 협의회
                                    {'(영도구청, 서부교육청, 14개 영도구 초등학교장) -'} 영도구 전 학교 실시</DetailTxt2>
                            </DetailRowView>
                            <DetailRowView>
                                <DetailTxt1>10</DetailTxt1>
                                <DetailTxt2>대구 영진전문대학 학교기업 영진모빌스와 자매결연 및 기술제휴</DetailTxt2>
                            </DetailRowView>
                            <DetailRowView>
                                <DetailTxt1>05</DetailTxt1>
                                <DetailTxt2>{'(주)'}컴스타 및 모든정보시스템과 산학협동 협약식 체결</DetailTxt2>
                            </DetailRowView>
                            <DetailRowView>
                                <DetailTxt1>03</DetailTxt1>
                                <DetailTxt2>{'(주)'}코리아 컴퓨터 및 {'(주)'}KT와 산학협동 협약식 체결</DetailTxt2>
                            </DetailRowView>
                            <DetailRowView>
                                <DetailTxt1>02</DetailTxt1>
                                <DetailTxt2>모바일스쿨 제4차 협력학교 협약식
                                    {'(서부교육청 관내 초,중학교 학교장 및 행정과장)'}</DetailTxt2>
                            </DetailRowView>
                        </LeftView>
                        <RightView>
                            <YearTxt>2005</YearTxt>
                            <DetailRowView>
                                <DetailTxt1>12</DetailTxt1>
                                <DetailTxt2>사장되자 창업대회{'(유해 게임 차단 프로그램 대상 수상) -'} 3학년 김은석</DetailTxt2>
                            </DetailRowView>
                            <DetailRowView>
                                <DetailTxt1>11</DetailTxt1>
                                <DetailTxt2>부산광역시교육청 주최 {'[제2회 실업계고교 창업경진대회] -'} 종합우수학교선정</DetailTxt2>
                            </DetailRowView>
                            <DetailRowView>
                                <DetailTxt1>10</DetailTxt1>
                                <DetailTxt2>모바일스쿨 제2차{','}3차 협력학교 협약식</DetailTxt2>
                            </DetailRowView>
                            <DetailRowView>
                                <DetailTxt1>09</DetailTxt1>
                                <DetailTxt2>부산 벤처플라자 소프트웨어&컴퓨터 전시회 참가</DetailTxt2>
                            </DetailRowView>
                            <DetailRowView>
                                <DetailTxt1>08</DetailTxt1>
                                <DetailTxt2>모바일스쿨 제1차 협력학교 협약식{'(서부교육청 교육장 외 9개 중학교장)'}</DetailTxt2>
                            </DetailRowView>
                        </RightView>
                    </RowView>
                </PaddingView>
                <PaddingView>
                    <RowView>
                        <LeftView>
                            <YearTxt>2004</YearTxt>
                            <DetailRowView>
                                <DetailTxt1>10</DetailTxt1>
                                <DetailTxt2>부산광역시교육청 주최 {'[제1회 실업계고교 창업경진대회] -'} 종합우수학교선정</DetailTxt2>
                            </DetailRowView>
                            <DetailRowView>
                                <DetailTxt1>09</DetailTxt1>
                                <DetailTxt2>부산 벤처플라자 소프트웨어&컴퓨터 전시회 참가</DetailTxt2>
                            </DetailRowView>
                            <DetailRowView>
                                <DetailTxt1>07</DetailTxt1>
                                <DetailTxt2>학교기업 지원사업 발표 참가</DetailTxt2>
                            </DetailRowView>
                            <DetailRowView>
                                <DetailTxt1>06</DetailTxt1>
                                <DetailTxt2>사업자등록{'(중부산세무서, 등록번호 602-82-06413)'}</DetailTxt2>
                            </DetailRowView>
                            <DetailRowView>
                                <DetailTxt1>05</DetailTxt1>
                                <DetailTxt2>학칭개정</DetailTxt2>
                            </DetailRowView>
                            <DetailRowView>
                                <DetailTxt1>03</DetailTxt1>
                                <DetailTxt2>학교기업운영부 조직</DetailTxt2>
                            </DetailRowView>
                        </LeftView>
                    </RowView>
                </PaddingView>
            </>
            }

            <Space30/>
        </InfoScrollView>
    )
}



