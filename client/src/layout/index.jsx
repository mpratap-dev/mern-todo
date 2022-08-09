
import { Layout } from "antd";
import React from "react";
import Main from "./Main";
import Sidebar from "./Sidebar";
import Logo from "../img/logo.png";

const { Header } = Layout;

const Dashboard = () => (
  <Layout>
    <Header className="header">
      <h3 style={{ color: "#fff", fontWeight: 300 }}>
        <img style={{ width: 35, height: 35, marginRight: 15 }} src={Logo} alt="Tasks" />
        To Do
      </h3>
    </Header>
    <Layout style={{ height: 'calc(100vh - 110px)' }}>
      <Sidebar />
      <Main />
    </Layout>
  </Layout>
);

export default Dashboard;
