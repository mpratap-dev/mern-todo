import React, { useEffect, useState } from "react";
import { UnorderedListOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { Dropdown, Input, Layout, Menu, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SideMenu from "../components/SideMenu";

const { Sider } = Layout;
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Sidebar = () => {
  const [lists, setList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [activeListItem, setActiveListItem] = useState([]);
  const navigate = useNavigate();

  const FormateData = ({ name: label, _id: key }) => ({ 
    label: <SideMenu label={label} id={key} getLists={getLists} />, 
    key, 
    icon: <UnorderedListOutlined />
  })

  const getLists = async () => {
    try {
      const { data: { data } } = await axios.get(`${BASE_URL}lists`);
      if(data.length) {
        const [firstItem] = data;
        navigate(`/${firstItem._id}`);
        setActiveListItem([firstItem._id]);
        const formattedList = data.map(FormateData);
        setList(formattedList);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData(event.target);
      const name = formData.get("name");
      const {
        data: { status, message: msg },
      } = await axios.post(`${BASE_URL}lists`, { name });

      if (status) {
        getLists();
        setInputValue('');
        message.success(msg);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleMenuClick = ({ key }) => {
    navigate(`/${key}`);
    setActiveListItem([key]);
  }

  useEffect(() => {
    getLists();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <Sider width={250}>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Input.Group>
          <Input
            name="name"
            size="large"
            value={inputValue}
            placeholder="New list"
            style={{ border: 0, padding: '10px 25px' }}
            prefix={<PlusOutlined />}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <button style={{visibility: 'hidden', height: 0, width: 0, position: 'absolute' }} type="submit"></button>
        </Input.Group>
      </form>
      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={activeListItem}
        onClick={handleMenuClick}
        style={{
          height: "100%",
          borderRight: 0,
        }}
        items={lists}
      />
    </Sider>
  );
};

export default Sidebar;
