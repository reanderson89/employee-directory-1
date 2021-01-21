import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeRow from "../components/Employee/EmployeeRow";

const Home = () => {
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    axios
      .get("https://randomuser.me/api/?results=5000")
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="text-center">Employee Directory</h1>
        </div>
      </div>
      <div className="row">
        {/* This is where the employee directory table will go! */}
        <table className="table table-striped">
        <EmployeeRow />
        </table>
      </div>
    </div>
  );
};

export default Home;
