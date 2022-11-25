import React, { useState } from "react";

const PersonForm = ({ submitForm }) => {
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleNameInputChange = (ev) => {
    setNewName(ev.target.value);
  };

  const handlePhoneNumberChange = (ev) => {
    setPhoneNumber(ev.target.value);
  };

  const isPhoneNumberValid = () => {
    let isValid = true;
    if (phoneNumber.trim().length === 0) {
      isValid = false;
    }
    return isValid;
  };

  const isNameValid = () => {
    let isValid = true;
    if (newName.trim() === 0) {
      isValid = false;
    }
    return isValid;
  };

  const handleFormSubmit = (ev) => {
    ev.preventDefault();

    if (!isNameValid()) {
      alert(`${newName} is not a valid name`);
      return;
    }

    if (!isPhoneNumberValid()) {
      alert(`${phoneNumber} is not a valid phone number`);
      return;
    }

    submitForm({
      newName,
      phoneNumber,
      id: Math.floor(Math.random() * 1000000),
    });
    setNewName("");
    setPhoneNumber("");
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        name:{" "}
        <input type="text" value={newName} onChange={handleNameInputChange} />
        <br />
        number:{" "}
        <input
          type="text"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
