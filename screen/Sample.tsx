import { SafeBasicView } from "../common/commonStyled"
import { HeaderCustom } from "../components/HeaderCustom"


export const Sample = () =>{
    return (
        <SafeBasicView>
            <HeaderCustom 
                title='샘플페이지'
                hideBack = {false}
            />
            

        </SafeBasicView>
    )
}