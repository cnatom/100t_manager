import {Alert, Button, Card, Divider, Flex, InputNumber, message, Space, Tooltip} from "antd";
import ContentContainer from "../template/ContentContainer";
import {useRequest} from "ahooks";
import getAlarmRules from "../../service/getAlarmRules";
import {useEffect, useState} from "react";
import updateAlarmRules from "../../service/updateAlarmRules";
import {keyMap} from "../../utils/keyMap";

function WarnPage(){
    const [rules, setRules] = useState({});
    const {run:runGetRules} = useRequest(getAlarmRules, {
        manual: true,
        onSuccess: (result) => {
            setRules(result);
        }
    });
    const {run:runUpdateRules} = useRequest(updateAlarmRules,{
        manual:true,
        onSuccess:(result) => {
            if(result.status===200){
                message.success(result.message);
            }else{
                message.warning(result.message);
            }
        }
    })

    useEffect(() => {
        runGetRules();
    }, [runGetRules]);

    const handleSave = (key, min, max) => {
        console.log(`Saving ${key}: min = ${min}, max = ${max}`);
        runUpdateRules(key,min,max);
        console.log("hello");
    }

    return (
        <ContentContainer>
            <Flex vertical>
                <Alert
                    message="输入 -1 即为“无限制”"
                    type="info"
                    showIcon
                />
                <Divider/>
                <Flex wrap="wrap" justify="start">
                    {Object.entries(rules).map(([key, [min, max]]) => {
                        if(key==="sn"||key==="gzbj") return null;
                        return (<Card title={keyMap[key]} key={key} style={{width: '33%', marginBottom: '20px'}}>
                            <Space>
                                <Space>
                                    <div>最小值</div>
                                    <InputNumber
                                        placeholder={min === -1 ? '无限制' : null}
                                        value={min === -1 ? null : min}
                                        onChange={value => {
                                            if (value === undefined) {
                                                min = -1;
                                            } else {
                                                min = value;
                                            }
                                        }}
                                    />
                                </Space>
                                <Space>
                                    最大值
                                    <InputNumber
                                        placeholder={max === -1 ? '无限制' : null}
                                        value={max === -1 ? null : max}
                                        onChange={value => {
                                            if (value === undefined) {
                                                max = -1;
                                            } else {
                                                max = value;
                                            }
                                        }}
                                    />
                                </Space>
                                <Button type="primary" onClick={() => handleSave(key, min, max)}>保存</Button>
                            </Space>
                        </Card>);
                    })}
                </Flex>
            </Flex>
        </ContentContainer>
    )
}

export default WarnPage;