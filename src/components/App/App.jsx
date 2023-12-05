import React, { useState } from 'react';
import ContactForm from '../ContactFrom/ContactForm';
import ContactList from '../ContactList/ContactList';
import './App.css';

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInputChange = e => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (name.trim() === '' || number.trim() === '') {
      alert('Please enter a valid name and number.');
      return;
    }

    const isContactExist = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isContactExist) {
      alert(`Contact with the name "${name}" already exists.`);
      return;
    }

    const newContact = {
      id: `id-${contacts.length + 1}`,
      name: name.trim(),
      number: number.trim(),
    };

    setContacts(prevContacts => [...prevContacts, newContact]);
    setName('');
    setNumber('');
  };

  const handleFilterChange = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const handleDeleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const filteredContacts = contacts.filter(
    contact =>
      contact.name && contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="wrapper">
      <h1>Contact Book App</h1>
      <ContactForm
        name={name}
        number={number}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      <label className="filter">
        Filter by name:
        <input
          type="text"
          name="filter"
          value={filter}
          onChange={handleFilterChange}
        />
      </label>
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

export default App;
