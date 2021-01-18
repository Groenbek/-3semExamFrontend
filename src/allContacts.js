import facade from "./apiFacade";
import React, { useState, useEffect } from "react";

export default function AllContacts() {
  const [data, setData] = useState(null);
  //const { strategy } = useParams();

  useEffect(() => {
    setData(null);
    facade
      .allContacts()
      .then((res) => setData(res))
      .catch((err) => {
        if (err.status) {
          console.log(err.message);
        }
      });
  }, []);

  const toShow = data ? (
    <div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Company</th>
            <th scope="col">Job Title</th>
            <th scope="col">Phone</th>
          </tr>
        </thead>
        <tr>
          {data.map((x) => (
            <tbody key={x.id}>
              <td>{x.id}</td>
              <td>{x.name}</td>
              <td>{x.email}</td>
              <td>{x.company}</td>
              <td>{x.jobtitle}</td>
              <td>{x.phone}</td>
            </tbody>
          ))}
        </tr>
      </table>
    </div>
  ) : (
    "Loading..."
  );

  return (
    <div>
      <h2>Data from server</h2>
      {toShow}
    </div>
  );
}
