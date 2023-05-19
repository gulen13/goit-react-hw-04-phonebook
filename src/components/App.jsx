import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleSubmit = ({ name, number }) => {
    const { contacts } = this.state;

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
      number
    };
    this.setState(prevState => {
      return { contacts: [newContact, ...prevState.contacts] };
    });
  };

  handleFilter = evt => {
    this.setState({ filter: evt.target.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  removeContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  componentDidMount() {
    const localStorageContacts = JSON.parse(localStorage.getItem('contacts'));
    if (localStorageContacts) {
      this.setState({ contacts: localStorageContacts})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const visibleContacts = this.getVisibleContacts();

    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm formSubmit={this.handleSubmit} />
        <h2>Contacts</h2>
        <Filter
          filterValue={this.state.filter}
          filterChange={this.handleFilter}
        />
        <ContactList data={visibleContacts} onDelete={this.removeContact} />
      </Container>
    );
  }
}
