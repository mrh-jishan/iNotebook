import React, { Suspense, useEffect, useState } from 'react';
import { PlusSquareOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  FloatButton,
  Layout,
  Menu,
  Row,
  theme,
  Image,
  Skeleton,
  Divider,
  List,
  Avatar,
  Dropdown,
  MenuProps,
} from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  InfoCircleOutlined,
  MenuOutlined,
  DeleteOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import Loader from './Loader';
import InfiniteScroll from 'react-infinite-scroll-component';

const { Header, Content, Footer, Sider } = Layout;

type AppLayoutProps = {
  // menuItems: any[];
};

type DataType = {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
};

const AppLayout: React.FC<AppLayoutProps> = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      'https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo',
    )
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  const items: MenuProps['items'] = [
    {
      label: '1st menu item',
      key: '1',
      icon: <UserOutlined />,
    },
    {
      label: '2nd menu item',
      key: '2',
      icon: <UserOutlined />,
    },
    {
      label: '3rd menu item',
      key: '3',
      icon: <UserOutlined />,
      danger: true,
    },
    {
      label: '4rd menu item',
      key: '4',
      icon: <UserOutlined />,
      danger: true,
      disabled: true,
    },
  ];

  const createNewNote = () => {
    navigate('/notes/new');
  };

  return (
    <Layout>
      <Sider
        theme="light"
        breakpoint="lg"
        collapsedWidth="0"
        collapsible
        collapsed={collapsed}
        trigger={null}
        width={300}
        style={{
          margin: '8px 4px 4px 8px',
          // minHeight: 'calc(100vh - 16px)',
          background: '#f5f5f5',
          // background: colorBgContainer,
          // borderRadius: borderRadiusLG,
        }}
        // onBreakpoint={(broken) => {
        //   console.log(broken);
        // }}
        // onCollapse={(collapsed, type) => {
        //   console.log(collapsed, type);
        // }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            lineHeight: '50px',
            height: '50px',
            // borderRadius: borderRadiusLG,
            marginBottom: '4px',
            // margin: '8px 0px 4px 4px',
          }}
        >
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              marginLeft: '20px',
            }}
          >
            <img
              width={32}
              style={{
                marginInlineEnd: '12px',
                verticalAlign: 'middle',
              }}
              src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            />
            <span
              style={{
                letterSpacing: '-.15px',
              }}
            >
              iNotepad
            </span>
          </Link>
        </Header>

        <div
          id="scrollableNoteList"
          style={{
            // height: 'calc(100vh - 16px)',
            overflow: 'auto',
            marginTop: '4px',
            background: colorBgContainer,
            // borderRadius: borderRadiusLG,
          }}
        >
          <InfiniteScroll
            dataLength={data.length}
            next={loadMoreData}
            hasMore={data.length < 50}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget="scrollableNoteList"
          >
            <List
              dataSource={data}
              renderItem={(item) => (
                <Link to={`/notes/${item.email}`}>
                  <List.Item key={item.email} className="list-item">
                    <List.Item.Meta
                      style={{
                        padding: '0 5px',
                      }}
                      avatar={<Avatar src={item.picture.medium} />}
                      title={item.name.last}
                      description={item.email}
                    />
                  </List.Item>
                </Link>
              )}
            />
          </InfiniteScroll>
        </div>
      </Sider>
      <Layout
        style={
          {
            // height: '100vh',
            // overflowX: 'scroll',
          }
        }
      >
        <Header
          style={{
            padding: 0,
            height: '25px',
            lineHeight: '25px',
            position: 'sticky',
            background: colorBgContainer,
            // borderRadius: borderRadiusLG,
            margin: '8px 8px 0px 4px',
          }}
        >
          <Row justify="space-between">
            <Col lg={1} md={4}>
              <Button
                type="link"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  marginLeft: '10px',
                }}
                size="small"
              />
            </Col>
            <Col lg={11} md={8}>
              <Row justify="end">
                <Col lg={2} md={4}>
                  <Button
                    type="link"
                    icon={<InfoCircleOutlined />}
                    size="small"
                  />
                </Col>
                <Col lg={2} md={4}>
                  <Button
                    type="link"
                    danger
                    icon={<DeleteOutlined />}
                    size="small"
                  />
                </Col>
                <Col lg={2} md={4}>
                  <Dropdown menu={{ items }} trigger={['click']}>
                    <Button type="link" icon={<MenuOutlined />} size="small" />
                  </Dropdown>
                </Col>
              </Row>
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            margin: '4px 8px 8px 4px',
            padding: 8,
            // minHeight: '90vh',
            // height: '90vh',
            // overflow: 'scroll',
            background: colorBgContainer,
            // borderRadius: borderRadiusLG,
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
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
