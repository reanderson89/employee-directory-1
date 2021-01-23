import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeRow from "../components/Employee/EmployeeRow";
import SearchBar from "../components/SearchBar/SearchBar";

const Home = () => {
  // setting state
  const [employees, setEmployees] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
  const [viewEmployees, setViewEmployees] = useState([]);

  //   Initial employee render
  useEffect(() => {
    axios
      .get(
        "https://randomuser.me/api/?results=10&inc=login,name,phone,email,picture,dob&nat=us"
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

  const filterResults = (e) => {
    const value = e.target.value;

    if (value==="") {
        setViewEmployees(employees);
        return;
    }

    const results = [...employees].filter((employee)=>{
        return (employee.name.first.includes(value) || employee.name.last.includes(value) || employee.phone.includes(value));
    })

    setViewEmployees(results);
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
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
