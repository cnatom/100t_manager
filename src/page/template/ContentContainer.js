import {Button, Form, Input, Layout, theme} from "antd";
import {Content} from "antd/lib/layout/layout";

function ContentContainer({ children }) {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
  return (
      <Content style={{margin: '12px'}}>
          <Layout style={{
              padding: 12,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
          }}>
              {children}
          </Layout>
      </Content>
  )
}

export default ContentContainer;