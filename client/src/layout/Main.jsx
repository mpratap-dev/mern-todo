import React from "react";
import { Layout } from "antd";
import { Routes, Route } from "react-router-dom";
import TodoList from "../components/TodoList";
const { Content } = Layout;

const Main = () => {
  return (
    <Layout theme="dark" style={{ padding: "0 24px 24px" }}>
      <Content
        className="site-layout-background"
        style={{
          padding: '24px 0',
          margin: 0,
          minHeight: 280,
        }}
      >
        <Routes>
          <Route path="/:id" element={<TodoList />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default Main;
