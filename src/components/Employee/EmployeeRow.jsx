import React from "react";
// employee information that will be displayed in a row on the table
const EmployeeRow = (props) => {
  return (
    <tr>
      <th scope="row">
        <img alt="Employee Headshot" src={props.picture.thumbnail}/>
      </th>
      <td>{props.name.first}  {props.name.last}</td>
      <td>{props.phone}</td>
      <td>{props.email}</td>
    </tr>
  );
};

export default EmployeeRow;
