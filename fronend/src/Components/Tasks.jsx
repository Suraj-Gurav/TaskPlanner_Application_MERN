import React, { useState, useEffect } from "react";
import './Tasks.css'
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { url } from "../ApiPath/API";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import ReactLoader from "./ReactLoader";
import DeleteModal from "./DeleteModal";
Modal.setAppElement("#root");

const Task = () => {

  const [formData, setFormData] = useState({ title: "", description: "", status: "" });
  const [dataList, setDataList] = useState([]);
  const [search, setSearch] = useState({ title: "", status: "" });
  const [editId, setEditId] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoader, setIsLoader] = useState(false)
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setIsLoader(true);
    fetch(url?.getAllUserTask, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Authorization": "Bearer " + sessionStorage.getItem("token"),
      },
    }).then((response) => response.json())
      .then((res) => {
        setIsLoader(false)
        if (res.SUCCESS) {

          setDataList(res.DATA);
        }
      })
      .catch((error) => {
        setIsLoader(false);
        toast.error("Failed to fetch data");
      })
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("formData", formData)
    const { title, description, status } = formData;
    if (!title.trim()) return toast.warn("Title is required");
    if (!description.trim()) return toast.warn("Description is required");
    if (!status) return toast.warn("Please select a status");
    if (editId) {
      fetch(url?.updateTask.replace('{taskId}', editId), {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          "Authorization": "Bearer " + sessionStorage.getItem("token"),
        },
        body: JSON.stringify(formData),
      }).then((response) => response.json())
        .then((res) => {
          console.log('API resp', res)
          if (res.SUCCESS) {
            toast(res.MESSAGE);
            fetchData();
            setFormData({ title: "", description: "", status: "" });
            setEditId(null);
          } else {
            toast.error(res.MESSAGE);
          }
        })
        .catch((error) => {
          toast.error("Failed to fetch data");
        })
    } else {
      fetch(url?.addTask, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          "Authorization": "Bearer " + sessionStorage.getItem("token"),
        },
        body: JSON.stringify(formData),
      }).then((response) => response.json())
        .then((res) => {
          console.log('API resp', res)
          if (res.SUCCESS) {
            toast(res.MESSAGE);
            fetchData();
            setFormData({ title: "", description: "", status: "" });
            setEditId(null);
          } else {
            toast.error(res.MESSAGE);
          }
        })
        .catch((error) => {
          toast.error("Failed to fetch data");
        })
    }

  };

  const handleEdit = (item) => {
    setFormData({ title: item.title, description: item.description, status: item.status });
    setEditId(item._id);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    fetch(url?.deleteTask.replace('{taskId}', deleteId), {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Authorization": "Bearer " + sessionStorage.getItem("token"),
      },
    }).then((response) => response.json())
      .then((res) => {
        if (res.SUCCESS) {
          setIsModalOpen(false)
          toast.success(res.MESSAGE);
          fetchData();
        }
      })
      .catch((error) => {
        toast.error("Failed to fetch data");
      })
  };

  const filteredData = dataList?.filter((item) =>
    item?.title?.toLowerCase()?.includes(search.title?.toLowerCase()) &&
    (search?.status === "" || item?.status === search?.status)
  );

  return ( 
    <div className="taskMainWrapper">
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Form */}
      <div className="formMainContainer">
        <h2 className="tableHeader">{editId ? "Edit Task" : "Add Task"}</h2>
        <div style={{ margin: '5px 0px' }}>
          <label>Title:</label><br />
          <input
            type="text"
            name="title"
            className="titleField"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div style={{ margin: '5px 0px' }}>
          <label>Description:</label><br />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="2"
            className="testAreaField"
          />
        </div>
        <div style={{ margin: '5px 0px' }}>
          <label>Status:</label><br />
          <select
            name="status"
            className="selectBoxField"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="">-- Select Status --</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button onClick={() => handleSubmit()} className="addTaskButton">
          {editId ? "Update Task" : "Add Task"}
        </button>
      </div>

      {/* Table and Search */}
      <div style={{ flex: 2 }}>
        <h2 className="tableHeader">Task List</h2>
        <div style={{ marginBottom: "10px", display: "flex", gap: "10px", justifyContent: 'space-between' }}>
          <input
            type="text"
            placeholder="Search by Title"
            value={search.title}
            onChange={(e) => setSearch({ ...search, title: e.target.value })}
            className="searchInputField"
          />
          <select
            value={search.status}
            className="selectBoxField"
            onChange={(e) => setSearch({ ...search, status: e.target.value })}
            style={{ width: '25%' }}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div
          style={{
            maxHeight: "447px",
            overflowY: "auto",
            border: "1px solid #ccc"
          }}
        >
          <table border="1" width="100%" cellPadding="8">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData?.length > 0 ? (
                filteredData?.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>{item.status}</td>
                    <td>
                      <FaRegEdit color="#4242ae" onClick={() => handleEdit(item)} className="actionItemIcon" />{" "}
                      <RiDeleteBin5Line color="red" onClick={() => confirmDelete(item._id)} className="actionItemIcon" />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>No data found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ReactLoader showLoader={isLoader} />
      <DeleteModal
        isOpenModal={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleDelete={handleDelete}

      />

    </div>
  );
}

export default Task;
