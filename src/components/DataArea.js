import React, { useState, useEffect } from "react";
import DataTable from "./DataTable";
import Nav from "./Nav";
import API from "../utils/API";
import "../styles/DataArea.css";
import DataAreaContext from "../utils/DataAreaContext";

const DataArea = () => {
  const [developerState, setDeveloperState] = useState({

    users: [],
    order: "ascend",
    filteredUsers: [],
    headings: [
      { name: "Image", width: "10%" },
      { name: "Name", width: "10%" },
      { name: "Phone", width: "20%" },
      { name: "Email", width: "20%" },
      { name: "DOB", width: "10%" }
    ]
  });


  const handleSort = heading => {
    if (developerState.order === "descend") {
      setDeveloperState({
        order: "ascend"
      })
    } else {
      setDeveloperState({
        order: "descend"
      })
    }

    const compareFnc = (a, b) => {
      if (developerState.order === "ascend") {
        // account for missing values
        if (a[heading] === undefined) {
          return 1;
        } else if (b[heading] === undefined) {
          return -1;
        }
        // numerically
        else if (heading === "name") {
          return a[heading].first.localeCompare(b[heading].first);
        } else {
          return a[heading] - b[heading];
        }
      } else {
        // account for missing values
        if (a[heading] === undefined) {
          return 1;
        } else if (b[heading] === undefined) {
          return -1;
        }
        // numerically
        else if (heading === "name") {
          return b[heading].first.localeCompare(a[heading].first);
        } else {
          return b[heading] - a[heading];
        }
      }

    }
    const sortedUsers = developerState.filteredUsers.sort(compareFnc);
    setDeveloperState({ ...developerState, filteredUsers: sortedUsers });
  }

  const handleSearchChange = event => {
    console.log(event.target.value);
    const filter = event.target.value;
    const filteredList = developerState.users.filter(item => {
      // merge data together, then see if user input is anywhere inside
      let values = Object.values(item)
        .join("")
        .toLowerCase();
      return values.indexOf(filter.toLowerCase()) !== -1;
    });

    setDeveloperState({ ...developerState, filteredUsers: filteredList });
  }

  useEffect(() => {
    API.getUsers().then(results => {
      setDeveloperState({
        ...developerState,
        users: results.data.results,
        filteredUsers: results.data.results
      });
    });
  }, []);

  return (
    <DataAreaContext.Provider
      value={{ developerState, handleSearchChange, handleSort }}
    >
      <Nav />
      <div className="data-area">
        {developerState.filteredUsers.length > 0
          ? <DataTable />
          : <div></div>
        }
      </div>
    </DataAreaContext.Provider>
  );
}

export default DataArea;
