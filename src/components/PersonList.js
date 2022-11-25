import React from "react";
import PersonDetail from "./PersonDetail";

const PersonList = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.map((p) => (
        <PersonDetail key={p.id} person={p} deletePerson={deletePerson} />
      ))}
    </div>
  );
};

export default PersonList;
