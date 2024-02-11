import React, { Suspense } from 'react';
import {
  UploadOutlined,
  UserOutlined,
  PlusSquareOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { FloatButton, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import Loader from './Loader';

const { Header, Content, Footer, Sider } = Layout;

const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  UserOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const createNewNote = () => {
    navigate('/notes/new');
  };

  return (
    <Layout>
      <Sider
        theme="light"
        breakpoint="lg"
        collapsedWidth="0"
        // collapsible={true}
        width={300}
        style={{
          minHeight: '100vh',
        }}
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        {/* <div className="demo-logo-vertical" /> */}
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['4']}
          items={items}
        />
      </Sider>
      <Layout>
        {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
        <Content style={{ margin: '8px' }}>
          <div
            style={{
              padding: 24,
              minHeight: 'calc(100vh - 16px)',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Suspense fallback={<Loader />}>
              <FloatButton
                tooltip={<div>New iNote</div>}
                shape="circle"
                type="primary"
                style={{ right: 50 }}
                onClick={createNewNote}
                icon={<PlusSquareOutlined />}
              />
              <Outlet />
            </Suspense>
          </div>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
};

export default AppLayout;
