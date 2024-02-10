import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import { BsTrash, BsPencil } from "react-icons/bs";

function App() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [interests, setInterests] = useState("");
  const [Users, setUsers] = useState([]);
  const genderOptions = ["ชาย", "หญิง"]; // Updated gender options

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    Axios.get("http://localhost:8000/users").then((res) => {
      setUsers(res.data);
    });
  };

  const addUser = () => {
    Axios.post("http://localhost:8000/users", {
      firstname: firstname,
      lastname: lastname,
      age: age,
      gender: gender,
      interests: interests,
    }).then(() => {
      getUsers();
      setFirstname("");
      setLastname("");
      setAge("");
      setGender("");
      setInterests("");
    });
  };

  const updateUser = (id) => {
    Axios.put(`http://localhost:8000/users/${id}`, {
      firstname: firstname || Users.find((user) => user.id === id).firstname,
      lastname: lastname || Users.find((user) => user.id === id).lastname,
      age: age || Users.find((user) => user.id === id).age,
      gender: gender || Users.find((user) => user.id === id).gender,
      interests: interests || Users.find((user) => user.id === id).interests,
    }).then(() => {
      getUsers();
    });
  };

  const deleteUser = (id) => {
    Axios.delete(`http://localhost:8000/users/${id}`).then((res) => {
      setUsers(Users.filter((val) => val.id !== id));
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">User Information</h1>
      <div className="row">
        <form className="user-form">
          <div className="mb-3">
            <label htmlFor="firstname" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="Enter firstname"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastname" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Enter lastname"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Age
            </label>
            <input
              type="number"
              className="form-control"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter age"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <select
              className="form-control"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              {genderOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="interests" className="form-label">
              Interests
            </label>
            <input
              type="text"
              className="form-control"
              id="interests"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="Enter interests"
            />
          </div>
          <button
            type="button"
            className="btn btn-success btn-block"
            onClick={addUser}
          >
            Add User
          </button>
        </form>
      </div>
      <hr />
      <div className="user">
        {Users.map((val) => (
          <div className="card user-card mb-3" key={val.id}>
            <div className="card-body">
              <p className="card-text">First Name: {val.firstname}</p>
              <p className="card-text">Last Name: {val.lastname}</p>
              <p className="card-text">Age: {val.age}</p>
              <p className="card-text">Gender: {val.gender}</p>
              <p className="card-text">Interests: {val.interests}</p>
              {/* Update Input Fields */}
              <div className="update-fields">
                <input
                  type="text"
                  className="form-control mb-2"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  placeholder="Update First Name"
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  placeholder="Update Last Name"
                />
                <input
                  type="number"
                  className="form-control mb-2"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Update Age"
                />
                <select
                  className="form-control mb-2"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Update Gender</option>
                  {genderOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  className="form-control mb-2"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  placeholder="Update Interests"
                />
                <div className="d-flex justify-content-end">
                  <div className="action-icons">
                    <BsPencil
                      className="edit-icon icon-lg"
                      style={{ fontSize: "40px", cursor: "pointer" }}
                      onClick={() => updateUser(val.id)}
                    />
                    <BsTrash
                      className="delete-icon icon-lg"
                      style={{ fontSize: "40px", cursor: "pointer" }}
                      onClick={() => deleteUser(val.id)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
