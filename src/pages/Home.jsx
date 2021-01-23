import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeRow from "../components/Employee/EmployeeRow";
import SearchBar from "../components/SearchBar/SearchBar";


const Home = () => {
  // setting state
  const [employees, setEmployees] = useState([]);
//   setting state for when the user sorts names
  const [sortOrder, setSortOrder] = useState("");
//   setting state for when the user filters in search bar
  const [viewEmployees, setViewEmployees] = useState([]);

  //   Initial employee render
  useEffect(() => {
    axios
      .get(
        "https://randomuser.me/api/?results=20&inc=login,name,phone,email,picture,dob&nat=us"
      )
      .then((response) => {
        console.log(response.data);
        setEmployees(response.data.results);
        setViewEmployees(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // sort name in table
  const sortBy = () => {
    let sortedEmployees = [];

    if (!sortOrder || sortOrder === "ascending") {
      sortedEmployees = [...employees].sort((a, b) =>
        a.name.first < b.name.first ? -1 : 1
      );
      setSortOrder("descending");
    } else {
      sortedEmployees = [...employees].sort((a, b) =>
        a.name.first > b.name.first ? -1 : 1
      );
      setSortOrder("ascending");
    }
    console.log(sortedEmployees);
    setViewEmployees([...sortedEmployees]);
  };

//   filter employees on name, phone, dob and email
  const filterResults = (e) => {
    const value = e.target.value;

    if (value === "") {
      setViewEmployees(employees);
      return;
    }

    const results = [...employees].filter((employee) => {
      return (
        employee.name.first.toLowerCase().includes(value.toLowerCase()) ||
        employee.name.last.toLowerCase().includes(value.toLowerCase()) ||
        employee.phone.includes(value) ||
        employee.dob.date.includes(value) ||
        employee.email.includes(value.toLowerCase())
      );
    });

    setViewEmployees(results);
  };

  //   return a table with employees information
  return (
    <div className="container">
      <div className="row">
        <div style={{backgroundColor: "#176a83", color: "rgba(255,255,255,0.822"}} className="col">
          <h1 className="text-center">Employee Directory</h1>
          <h5 className="text-center">Use the search box to narrow your results or click name to sort alphabetically</h5>
        
        </div>
      </div>
      <div className="row">
        <div className="col-sm-4">
          <SearchBar onChange={filterResults} />
        </div>
      </div>
      <div className="row">
        <table className="table sortable table-striped">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col" onClick={sortBy}>
                Name
              </th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
              <th scope="col">DOB</th>
            </tr>
          </thead>
          <tbody>
            {viewEmployees.map((employee) => (
              <EmployeeRow
                name={employee.name}
                phone={employee.phone}
                email={employee.email}
                picture={employee.picture}
                dob={employee.dob}
                key={employee.login.uuid}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
