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

const { Header, Content, Footer, Sider } = Layout;

type AppLayoutProps = {
  // menuItems: any[];
};

type DataType = {
  title: string;
  markdown: string;
  path: string;
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
    // if (loading) {
    //   return;
    // }
    // setLoading(true);
    // fetch(
    //   'https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo',
    // )
    //   .then((res) => res.json())
    //   .then((body) => {
    //     setData([...data, ...body.results]);
    //     setLoading(false);
    //   })
    //   .catch(() => {
    //     setLoading(false);
    //   });
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
    // setData([
    //   {
    //     email: 'test' + data.length,
    //     gender: 'gem' + data.length,
    //     name: {
    //       first: 'first' + data.length,
    //       last: 'last' + data.length,
    //       title: 'title' + data.length,
    //     },
    //     picture: {
    //       large: 'df' + data.length,
    //       medium: 'dre' + data.length,
    //       thumbnail: 'dfer' + data.length,
    //     },
    //     nat: 'e4' + data.length,
    //   },
    //   ...data,
    // ]);

    console.log('create new note---123', window.electron);

    window.electron.ipcRenderer.sendMessage('add-note', 'data-234');
    navigate(`/notes/${data.length}`);
  };

  window.electron.ipcRenderer.once('add-note-receivd', (arg) => {
    // eslint-disable-next-line no-console
    console.log('add-note here-agai---: ', arg);

    setData([arg, ...data]);
  });

  // window.electron.ipcRenderer.once('add-note', (arg) => {
  //   // eslint-disable-next-line no-console
  //   console.log('add-note', arg);
  // });

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
          minHeight: 'calc(100vh - 16px)',
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
          // id="scrollableNoteList"
          style={{
            height: 'calc(100vh - 66px)',
            overflow: 'auto',
            marginTop: '4px',
            background: colorBgContainer,
            // borderRadius: borderRadiusLG,
          }}
        >
          <List
            dataSource={data}
            locale={{
              emptyText: 'No iNotes',
            }}
            renderItem={(item) => (
              <Link to={`/notes/${item.path}`}>
                <List.Item key={item.path} className="list-item">
                  <List.Item.Meta
                    style={{
                      padding: '0 5px',
                    }}
                    avatar={
                      <Avatar
                        src={
                          'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'
                        }
                      />
                    }
                    title={item.title}
                    description={item.markdown}
                  />
                </List.Item>
              </Link>
            )}
          />
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
              tooltip="New iNote"
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
