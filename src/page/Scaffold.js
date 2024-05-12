import {Layout, Menu, theme} from "antd";
import {Content, Header} from 'antd/lib/layout/layout';
import Sider from "antd/es/layout/Sider";
import {Outlet, useNavigate} from "react-router-dom";
import {useState} from "react";
import {DashboardOutlined, HistoryOutlined, HomeOutlined, PieChartOutlined, SettingOutlined} from "@ant-design/icons";


function genItem(label, key, icon = null, children = null) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    genItem('大屏预览', '/admin/home', <PieChartOutlined />),
    genItem('历史数据', '/admin/history', <HistoryOutlined/>, [
        genItem('输出电流电压', '/admin/history/scdldy'),
        genItem('温度', '/admin/history/wd'),
        genItem('水流变化', '/admin/history/slbh'),
        genItem('边柜电流', '/admin/history/bgdl'),
        genItem('励磁电流电压', '/admin/history/lcdldy'),
        genItem('故障报警', '/admin/history/gzbj'),
        genItem('使能', '/admin/history/sn'),
    ]),
    genItem('实时数据', '/admin/realtime', <DashboardOutlined/>),
    genItem("系统管理", '/admin/system', <SettingOutlined/>, [
        genItem('修改密码', '/admin/system/password'),
        genItem('报警规则', '/admin/system/warn'),
    ])
];

function Scaffold() {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    // const items = useMemo(() => genItems(routesJson), [routesJson]);

    return (
        <Layout>
            <Layout>
                <Sider
                    // collapsible
                    // collapsed={collapsed}
                    // onCollapse={setCollapsed}
                    style={{minHeight: '100vh'}}

                >
                    <div
                        style={{maxHeight:'10vh',color: 'white', fontSize: '14px', textAlign: 'center', padding: '16px'}}>大型电动振动台管理系统
                    </div>
                    <Menu theme={'dark'}
                          style={{minHeight: '90vh'}}
                          defaultOpenKeys={['/admin/system','/admin/history']}
                          mode="inline"
                          defaultSelectedKeys={['/admin/home']}
                          items={items}
                          onClick={({key}) => {
                              navigate(key);
                          }}
                    >

                    </Menu>
                </Sider>
                <Content>
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    );
}

export default Scaffold;