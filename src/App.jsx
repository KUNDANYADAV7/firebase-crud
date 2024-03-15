import React, { useState } from "react";
import {
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
} from "@firebase/firestore";
import { useEffect } from "react";
import { firestore } from "./firebase";
import DeleteIcon from "@mui/icons-material/Delete";
import SecurityUpdateIcon from "@mui/icons-material/SecurityUpdate";

const App = () => {
  // useEffect(() => {
  //   addDoc(collection(firestore, "emp"), { empno: 101, name: "ajay" });
  // }, []);
  const [student, updateStudent] = useState({
    id: "",
    rollno: "",
    name: "",
    branch: "",
    semester: "",
    year: "",
  });
  let [data, updateData] = useState([]);

  function change(e) {
    updateStudent({ ...student, [e.target.name]: e.target.value });
  }
  useEffect(() => {
    const q = query(collection(firestore, "student"), orderBy("rollno", "asc"));
    onSnapshot(q, (querySnapshot) => {
      let d = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      updateData(d);
      // console.log(d);
    });
  }, [data]);
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Firebase Crud Operation</h1>
      <div>
        <div
          style={{
            border: "1px solid black",
            width: "400px",
            height: "350px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "570px",
            marginTop: "10px",
            borderRadius: "10px",
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // addDoc(collection(firestore, "emp"), emp);
              // alert("added successfully");
              // updateStudent({ empno: "", ename: "" });
              if (student.id === "") {
                addDoc(collection(firestore, "student"), student);
                alert("added successfully");
                updateStudent({
                  id: "",
                  rollno: "",
                  name: "",
                  branch: "",
                  semester: "",
                  year: "",
                });
              } else {
                updateDoc(doc(firestore, "student", student.id), student);
                alert("updated successfully");
                updateStudent({
                  id: "",
                  rollno: "",
                  name: "",
                  branch: "",
                  semester: "",
                  year: "",
                });
              }
            }}
          >
            <input
              type="number"
              name="rollno"
              value={student.rollno}
              onChange={change}
              placeholder="enter rollno"
              style={{ width: "199px", height: "35px" }}
              required
            />
            <br />
            <br />
            <input
              type="text"
              name="name"
              value={student.name}
              onChange={change}
              placeholder="enter ename"
              style={{ width: "199px", height: "35px" }}
              required
            />
            <br />
            <br />
            <select
              name="branch"
              value={student.branch}
              onChange={change}
              style={{ width: "200px", height: "35px" }}
              required
            >
              <option value="">Select Branch</option>
              <option value="CSE">CSE</option>
              <option value="Chemical">Chemical</option>
              <option value="Fire Safety">Fire Safety</option>
              <option value="Machanical">Machanical</option>
              <option value="EC">EC</option>
            </select>

            <br />
            <br />
            <select
              name="semester"
              value={student.semester}
              onChange={change}
              style={{ width: "200px", height: "35px" }}
              required
            >
              <option value="">Select Semester</option>
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
              <option value="4th">4th</option>
              <option value="5th">5th</option>
              <option value="6th">6th</option>
              <option value="7th">7th</option>
              <option value="8th">8th</option>
            </select>
            <br />
            <br />
            <select
              name="year"
              value={student.year}
              onChange={change}
              style={{ width: "200px", height: "35px" }}
              required
            >
              <option value="">Select Year</option>
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
            <br />
            <br />
            <center>
              {student.id === "" ? (
                <button
                  className="btn btn-primary"
                  style={{
                    width: "100px auto",
                    height: "40px",
                    border: "1px solid black",
                    borderRadius: "5px",
                    backgroundColor: "#1589FF",
                  }}
                >
                  Add Student
                </button>
              ) : (
                <button
                  style={{
                    width: "100px auto",
                    height: "40px",
                    border: "1px solid black",
                    borderRadius: "5px",
                    backgroundColor: "#00CED1",
                  }}
                >
                  Update Student
                </button>
              )}
            </center>
          </form>
        </div>
        <br />

        <div style={{ marginBottom: "50px" }}>
          <table
            align="center"
            border="1px"
            className="table table-striped"
            style={{ width: "1000px" }}
          >
            <thead>
              <tr>
                <th scope="row">Sr. No.</th>
                <th scope="col">Id</th>
                <th scope="col">Rollno</th>
                <th scope="col">Name</th>
                <th scope="col">Branch</th>
                <th scope="col">Semester</th>
                <th scope="col">Year</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((v, i) => {
                return (
                  <tr
                    key={i}
                    style={{ backgroundColor: i % 2 === 0 ? "white" : "cream" }}
                  >
                    <th scope="row">{i + 1}</th>
                    <td>{v.id}</td>
                    <td>{v.rollno}</td>
                    <td>{v.name}</td>
                    <td>{v.branch}</td>
                    <td>{v.semester}</td>
                    <td>{v.year}</td>
                    <td>
                      {/* <button
                        onClick={() => {
                          deleteDoc(
                            doc(collection(firestore, "student"), v.id)
                          );
                          alert("student successfully deleted");
                        }}
                      > */}
                      <DeleteIcon
                        onClick={() => {
                          deleteDoc(
                            doc(collection(firestore, "student"), v.id)
                          );
                          alert("student successfully deleted");
                        }}
                      />
                      {/* </button> */}
                    </td>
                    <td>
                      {/* <button
                        onClick={() => {
                          updateStudent(v);
                        }}
                      > */}
                      <SecurityUpdateIcon
                        onClick={() => {
                          updateStudent(v);
                        }}
                      />
                      {/* </button> */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* </div>
      <div style={{ marginLeft: "600px", marginTop: "0px" }}> */}
      </div>
      {/* <button
        onClick={() => {
          addDoc(collection(firestore, "emp"), { empno: 102, name: "Vijay" });
          async function show() {
            let res = await addDoc(collection(firestore, "emp"), {
              empno: 102,
              name: "Vijay",
            });
            console.log(res);
          }
          show();
        }}
      >
        Add Data
      </button> */}
    </>
  );
};

export default App;
