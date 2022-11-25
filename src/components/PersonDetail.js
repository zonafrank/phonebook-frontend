import React from "react";

const PersonDetail = ({ person, deletePerson }) => {
  const handleDelete = () => {
    const confirmDelete = window.confirm(`Delete ${person.name}?`);
    if (confirmDelete) {
      deletePerson(person.id);
    }
  };
  return (
    <div key={person.id}>
      {person.name} {person.number}{" "}
      <button onClick={handleDelete}>delete</button>
    </div>
  );
};

export default PersonDetail;
