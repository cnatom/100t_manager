import {Card, Flex} from "antd";
import ValueChangeCard from "../../ui/ValueChangeCard";
import {useContext} from "react";
import {SocketDataContext} from "../../service/SocketProvider";

function RealPage(){
    const {data} = useContext(SocketDataContext);

    return ( <Flex vertical style={{padding:'12px'}}>
        <Flex>
            <ContentCard style={{width:'40%',marginRight:'16px'}} title={"输出电流电压"}>
                <ValueChangeCard title={"输出电压"} value={data['scdy']} unit={'V'}/>
                <ValueChangeCard title={"输出电流"} value={data['scdl']} unit={'A'}/>
            </ContentCard>
            <ContentCard style={{width:'60%'}} title={"水流变化"}>
                <ValueChangeCard title={"上励磁水流"} value={data['slcsl']} unit={'L/min'}/>
                <ValueChangeCard title={"动圈水流"} value={data['dqsl']} unit={'L/min'}/>
                <ValueChangeCard title={"下励磁水流"} value={data['xlcsl']} unit={'L/min'}/>
            </ContentCard>
        </Flex>

        <ContentCard title={"温度"}>
            <ValueChangeCard title={"动圈温度"} value={data['dqwd']} unit={'℃'}/>
            <ValueChangeCard title={"上励磁温度"} value={data['slcwd']} unit={'℃'}/>
            <ValueChangeCard title={"下励磁温度"} value={data['xlcwd']} unit={'℃'}/>
            <ValueChangeCard title={"水箱温度"} value={data['sxwd']} unit={'℃'}/>
        </ContentCard>

        <ContentCard title={"边柜电流"}>
            <ValueChangeCard title={"边柜电流1"} value={data['bgdl1']} unit={'A'}/>
            <ValueChangeCard title={"边柜电流2"} value={data['bgdl2']} unit={'A'}/>
            <ValueChangeCard title={"边柜电流3"} value={data['bgdl3']} unit={'A'}/>
        </ContentCard>
        <Flex>
            <ContentCard style={{width:'50%',marginRight:'16px'}} title={"励磁电流电压"}>
                <ValueChangeCard title={"励磁电流"} value={data['lcdl']} unit={'A'}/>
                <ValueChangeCard title={"励磁电压"} value={data['lcdy']} unit={'V'}/>
            </ContentCard>
            <ContentCard style={{width:'50%'}} title={"报警/使能"}>
                <ValueChangeCard title={"故障报警"} value={data['gzbj']}/>
                <ValueChangeCard title={"使能"} value={data['sn']}/>
            </ContentCard>
        </Flex>
    </Flex>)
}

function ContentCard({title,children,style}){
    return <Card title={title} style={{marginBottom:'16px',width:'100%',...style}}>
        <Flex>
            {children}
        </Flex>
    </Card>
}

export default RealPage;