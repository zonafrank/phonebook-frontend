import { useState, useEffect } from "react";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import PersonList from "./components/PersonList";
import SearchFilter from "./components/SearchFilter";
import phonebookService from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterVal, setFilterVal] = useState("");
  const [message, setMessage] = useState(null);

  const notificationTimer = 3000;

  const showNotification = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => {
      setMessage(null);
    }, notificationTimer);
  };

  const addNewPerson = ({ newName, phoneNumber }) => {
    const foundPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (foundPerson) {
      const confirmUpdate = window.confirm(
        `${foundPerson.name} is already in the phonebook. Do you want to update the number?`
      );
      if (confirmUpdate) {
        phonebookService
          .update({ ...foundPerson, number: phoneNumber })
          .then((data) => {
            const updatedPersons = persons.map((person) =>
              person.id === foundPerson.id ? data : person
            );
            setPersons(updatedPersons);
            showNotification("success", `Updated ${foundPerson.name}`);
          })
          .catch((error) => {
            showNotification("error", error.message);
          });
      }
    } else {
      phonebookService
        .create({ name: newName, number: phoneNumber })
        .then((data) => {
          setPersons([...persons, data]);
          showNotification("success", `Added ${data.name}`);
        })
        .catch((error) => {
          showNotification("error", error.message);
        });
    }
  };

  const deletePerson = (id) => {
    let person = persons.find((person) => person.id === id);
    phonebookService
      .remove(id)
      .then((response) => {
        console.log(response);
        if (response.status === 204) {
          const updatedPersons = persons.filter((person) => person.id !== id);
          setPersons(updatedPersons);
          showNotification("success", `Successfully deleted ${person.name}`);
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          const updatedPersons = persons.filter((p) => p.id !== person.id);
          setPersons(updatedPersons);
          showNotification(
            "error",
            `${person.name} has already been removed from the database`
          );
        } else {
          showNotification("error", error.message);
        }
      });
  };

  const handleFilterValChange = (ev) => {
    setFilterVal(ev.target.value);
  };

  let personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filterVal.toLowerCase())
  );

  useEffect(() => {
    phonebookService
      .getAll()
      .then((data) => {
        setPersons(data);
      })
      .catch((error) => {
        showNotification("error", error.message);
      });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <SearchFilter
        filterValue={filterVal}
        setFilterValue={handleFilterValChange}
      />
      <h2>Add new number</h2>
      <PersonForm submitForm={addNewPerson} persons={persons} />
      <h2>Numbers</h2>
      {personsToShow && (
        <PersonList persons={personsToShow} deletePerson={deletePerson} />
      )}
    </div>
  );
};

export default App;
