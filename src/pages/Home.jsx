import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeRow from "../components/Employee/EmployeeRow";
import SearchBar from "../components/SearchBar/SearchBar";

const Home = () => {
  // setting state
  const [employees, setEmployees] = useState([]);
  const [sortOrder, setSortOrder] = useState('');

  //   Initial employee render
  useEffect(() => {
    axios
      .get(
        "https://randomuser.me/api/?results=10&inc=login,name,phone,email,picture&nat=us"
      )
      .then((response) => {
        console.log(response.data);
        setEmployees(response.data.results);
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
    setEmployees(sortedEmployees);
  };

  //   return a table with employees information
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="text-center">Employee Directory</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-3">
          <SearchBar />
        </div>
      </div>
      <div className="row">
        <table className="table sortable table-striped">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col" onClick={sortBy}>Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <EmployeeRow
                name={employee.name}
                phone={employee.phone}
                email={employee.email}
                picture={employee.picture}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
