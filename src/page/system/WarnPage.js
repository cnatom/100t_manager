import {Button, Card, Flex, InputNumber, message, Space} from "antd";
import ContentContainer from "../template/ContentContainer";
import {useRequest} from "ahooks";
import getAlarmRules from "../../service/getAlarmRules";
import {useEffect, useState} from "react";
import updateAlarmRules from "../../service/updateAlarmRules";

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
            <Flex wrap="wrap" justify="space-between">
                {Object.entries(rules).map(([key, [min, max]]) => (
                    <Card title={key} key={key} style={{width: '33.33%', marginBottom: '20px'}}>
                        <Space>
                            <Space>
                                <div>最小值</div>
                                <InputNumber
                                    placeholder={min === -1 ? '无限制' : null}
                                    defaultValue={min === -1 ? null : min}
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
                                    defaultValue={max === -1 ? null : max}
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
                    </Card>
                ))}
            </Flex>
        </ContentContainer>
    )
}

export default WarnPage;