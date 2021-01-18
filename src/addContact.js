import facade from "./apiFacade";
import React, { useState } from "react";

export default function AddContact() {
  const [data, setData] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [jobtitle, setJobtitle] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleNameChange(event) {
    const value = event.target.value;
    setName(value);
  }

  function handleEmailChange(event) {
    const value = event.target.value;
    setEmail(value);
  }

  function handleCompanyChange(event) {
    const value = event.target.value;
    setCompany(value);
  }

  function handleJobtitleChange(event) {
    const value = event.target.value;
    setJobtitle(value);
  }
  function handlePhoneChange(event) {
    const value = event.target.value;
    setPhone(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setData(null);
    facade
      .addContact(
        localStorage.getItem("username"),
        name,
        email,
        company,
        jobtitle,
        phone
      )
      .then((res) => setData(res))
      .then()
      .catch((err) => {
        if (err.status) {
          console.log(err.message);
          setErrorMessage(err.message);
        }
      });
  }

  const toShow = data ? <div>{data.msg}</div> : "";

  const errorMsg = errorMessage ? <div>{errorMessage}</div> : "";

  return (
    <div>
      <h1>
        Welcome to your <b>NOT</b> so personalized profile page
      </h1>
      <h3>Here you can add a contact to the database</h3>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div>
        <form>
          <h2>Add Contact</h2>
          <input
            placeholder="Contact name"
            id="name"
            onChange={handleNameChange}
          />
          <input
            placeholder="Contact email"
            id="email"
            onChange={handleEmailChange}
          />
          <input
            placeholder="Contact company"
            id="company"
            onChange={handleCompanyChange}
          />
          <input
            placeholder="Contact jobtitle"
            id="jobtitle"
            onChange={handleJobtitleChange}
          />
          <input
            placeholder="Contact phone"
            id="phone"
            onChange={handlePhoneChange}
          />
          <button onClick={handleSubmit}>Add Contact</button>
        </form>
      </div>
      <div>
        {toShow}
        {errorMsg}
      </div>
    </div>
  );
}
