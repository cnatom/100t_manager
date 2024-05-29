import Scaffold from "./page/Scaffold";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {ConfigProvider} from "antd";
import zhCN from 'antd/lib/locale/zh_CN';
import LoginPage from "./page/login/LoginPage";
import ScdldyPage from "./page/history/ScdldyPage";
import WdPage from "./page/history/WdPage";
import SlbhPage from "./page/history/SlbhPage";
import BgdlPage from "./page/history/BgdlPage";
import LcdldyPage from "./page/history/LcdldyPage";
import GzbjPage from "./page/history/GzbjPage";
import SnPage from "./page/history/SnPage";
import HomePage from "./page/HomePage";
import PassPage from "./page/system/PassPage";
import RealPage from "./page/realtime/RealPage";
import {SocketProvider} from "./service/SocketProvider";
import WarnPage from "./page/system/WarnPage";

function genRoute(path, element,children) {
    return {
        path: path,
        element: element,
        children: children,
    }
}
export const myRoutes = [
    genRoute("/login",<LoginPage/>,[
        genRoute("/login/",<LoginPage/>),
    ]),
    genRoute("/admin",<Scaffold/>,[
        genRoute("/admin",<HomePage/>),
        genRoute("/admin/home",<HomePage/>),
        // 历史数据
        genRoute("/admin/history/scdldy",<ScdldyPage/>),
        genRoute("/admin/history/wd",<WdPage/>),
        genRoute("/admin/history/slbh",<SlbhPage/>),
        genRoute("/admin/history/bgdl",<BgdlPage/>),
        genRoute("/admin/history/lcdldy",<LcdldyPage/>),
        genRoute("/admin/history/gzbj",<GzbjPage/>),
        genRoute("/admin/history/sn",<SnPage/>),
        // 实时数据
        genRoute("/admin/realtime",<SocketProvider><RealPage/></SocketProvider>),
        // 系统管理
        genRoute("/admin/system/password",<PassPage/>),
        genRoute("/admin/system/warn",<WarnPage/>),


    ]),
    genRoute("/",<Navigate to="/login"/>),
];

const router = createBrowserRouter(myRoutes);

function App() {
    return (
        <ConfigProvider locale={zhCN}>
            <RouterProvider router={router}/>
        </ConfigProvider>

    );
}

export default App;
