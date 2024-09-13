import {useRequest} from "ahooks";
import getConfig from "../../service/getConfig";
import {useEffect, useState} from "react";
import SettingForm from "./setting/SettingForm";
import {Card, message} from "antd";
import recoverConfig from "../../service/recoverConfig";
import updateConfig from "../../service/updateConfig";

function SettingPage() {
    const [config, setConfig] = useState({});
    const [loading, setLoading] = useState(true);
    const [activeTabKey, setActiveTabKey] = useState(null);
    const {run: runRecoverConfig} = useRequest(recoverConfig, {
        manual: true,
        onSuccess: (result) => {
            message.success("恢复成功");
            setConfig(result);
            console.log(config);
        },
        onError: (_) => {
            message.error("恢复失败");
        }
    });

    const {run: runGetConfig} = useRequest(getConfig, {
        manual: true,
        onSuccess: (result) => {
            setConfig(result);
            setLoading(false);
            setActiveTabKey(Object.keys(result.charts)[0]);
        },
    });

    const {run: runUpdateConfig} = useRequest(updateConfig, {
        manual: true,
        onSuccess: (_) => {
            message.success("保存成功");
        },
        onError: (_) => {
            message.error("保存失败");
        }
    });

    function onFinish(values) {
        const newConfig = {...config};
        newConfig.charts[activeTabKey] = values;
        setConfig(newConfig);
        runUpdateConfig(newConfig);
        console.log(config);
    }

    const onTabChange = (key) => {
        setActiveTabKey(key);
    };

    function onRecover() {
        runRecoverConfig();
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
        const tabList = Object.entries(config.charts).map(([key, value]) => {
            return {key: key, tab: (value.title===null || value.title==='')?key.toUpperCase():value.title};
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