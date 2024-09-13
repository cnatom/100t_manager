import {useRequest} from "ahooks";
import getConfig from "../../service/getConfig";
import {useEffect, useState} from "react";
import SettingForm from "./setting/SettingForm";
import {Card} from "antd";

function SettingPage() {
    const [config, setConfig] = useState({});
    const [loading, setLoading] = useState(true);
    const [activeTabKey, setActiveTabKey] = useState(null);
    const {run: runGetConfig} = useRequest(getConfig, {
        manual: true,
        onSuccess: (result) => {
            setConfig(result);
            setLoading(false);
            setActiveTabKey(Object.keys(result.charts)[0])
        },
    });

    function onFinish(values) {
        console.log(values);
    }

    const onTabChange = (key) => {
        console.log(key);
        setActiveTabKey(key);
    };
    function onRecover() {

    }

    useEffect(() => {
        runGetConfig();
    }, []);

    if (loading || !config.charts || !activeTabKey) {
        return (<div>loading……</div>);
    } else {
        const charts = config.charts;
        const templates = config.templates;
        const template = templates.filter(item => item.id === charts[activeTabKey]['type'])[0];
        const tabList = Object.entries(config.charts).map(([key,value]) => {
            return {key: key, tab: value.title}
        });
        return (
            <Card
                tabList={tabList}
                activeTabKey={activeTabKey}
                onTabChange={onTabChange}
                tabBarExtraContent={<a onClick={onRecover}>恢复默认设置</a>}
            >
                <SettingForm initialChartData={charts[activeTabKey]} onSave={onFinish} template={template}/>
            </Card>
        );
    }
}

export default SettingPage;