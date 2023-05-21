import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { Container } from './App.styled';

const App = () => {
  const [contacts, setcontacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) || []
  );
  const [filter, setfilter] = useState('');

  const handleSubmit = (name, number) => {
    const existingName = contacts.some(item => item.name === name);
    const existingNumber = contacts.find(item => item.number === number);

    if (existingName) {
      return alert(`Contact "${name}" is already in contacts list`);
    } else if (existingNumber) {
      return alert(`Number "${number}" is already in contacts list`);
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    setcontacts(prevContacts => [...prevContacts, newContact]);
  };

  const handleFilter = evt => {
    setfilter(evt.target.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const removeContact = id => {
    setcontacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const visibleContacts = getVisibleContacts();

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm formSubmit={handleSubmit} />
      <h2>Contacts</h2>
      <Filter filterValue={filter} filterChange={handleFilter} />
      <ContactList data={visibleContacts} onDelete={removeContact} />
    </Container>
  );
};

export default App;
