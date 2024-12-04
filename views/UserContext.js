import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);  // Lưu thông tin người dùng đăng nhập
  const [users, setUsers] = useState([]);  // Lưu danh sách người dùng
  const API_URL = 'https://6458c8bc4eb3f674df7d3ce6.mockapi.io/ch/v1/category';

  // Tải danh sách người dùng từ API
  const fetchUsers = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setUsers(data);  // Cập nhật danh sách người dùng
        console.log("Danh sách người dùng đã được tải từ API:", data);
      } else {
        console.error("Lỗi khi tải danh sách người dùng:", response.statusText);
      }
    } catch (error) {
      console.error("Lỗi kết nối API:", error);
    }
  };

  // Đăng nhập người dùng (cập nhật currentUser)
  const loginUser = (userData) => {
    setCurrentUser(userData);  // Lưu thông tin người dùng vào state
    console.log("Người dùng đã đăng nhập:", userData);
  };

  // Thêm người dùng mới vào danh sách thông qua API
  const addUser = async (newUser) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const createdUser = await response.json();
        setUsers((prevUsers) => [...prevUsers, createdUser]);  // Thêm người dùng mới vào danh sách
        console.log("Người dùng mới đã được thêm:", createdUser);
      } else {
        console.error("Lỗi khi thêm người dùng:", response.statusText);
      }
    } catch (error) {
      console.error("Lỗi kết nối API khi thêm người dùng:", error);
    }
  };

  // Xóa người dùng từ danh sách thông qua API
  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));  // Xóa người dùng khỏi danh sách
        console.log(`Người dùng với ID ${userId} đã được xóa.`);
      } else {
        console.error("Lỗi khi xóa người dùng:", response.statusText);
      }
    } catch (error) {
      console.error("Lỗi kết nối API khi xóa người dùng:", error);
    }
  };

  // Khi component được mount, tải danh sách người dùng từ API
  useEffect(() => {
    fetchUsers();
  }, []);  // Chỉ gọi khi component được mount lần đầu

  return (
    <UserContext.Provider value={{ currentUser, users, addUser, loginUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};
