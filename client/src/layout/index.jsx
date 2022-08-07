
import { Layout } from "antd";
import React from "react";
import Main from "./Main";
import Sidebar from "./Sidebar";

const { Header } = Layout;

const Dashboard = () => (
  <Layout>
    <Header className="header">
      <h2 style={{ color: "#fff"}}>Tasks</h2>
    </Header>
    <Layout style={{ height: 'calc(100vh - 64px)' }}>
      <Sidebar />
      <Main />
    </Layout>
  </Layout>
);

export default Dashboard;
