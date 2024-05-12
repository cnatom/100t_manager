import {Breadcrumb} from "antd";
import {Link} from "react-router-dom";

export default function BreadcrumbView({ pathname }) {
    console.log(pathname);
    if(pathname==null){
        return (
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to="/">页面1</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to="/">页面2</Link>
                </Breadcrumb.Item>
            </Breadcrumb>
        )
    }
    const pathnames = pathname.split('/').filter((x) => x);

    // 查找路由标题
    function findRouteTitle(path, routes, parentPath = '') {
        for (const route of routes) {
            const fullPath = parentPath + route.path;
            if (fullPath === path) {
                return route.title;
            }
            if (route.elements) {
                const title = findRouteTitle(path, route.elements, fullPath);
                if (title) {
                    return title;
                }
            }
        }
        return null;
    }
    return (
        <Breadcrumb>
            {pathnames.map((value, index) => {
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                const title = findRouteTitle(to);
                const isLast = index === pathnames.length - 1;

                return (
                    <Breadcrumb.Item key={to}>
                        <Link to={to} style={{color:isLast?'black':null }}>{title}</Link>
                    </Breadcrumb.Item>
                );
            })}
        </Breadcrumb>
    );
}