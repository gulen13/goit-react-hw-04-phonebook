import PropTypes from 'prop-types';
import { useState } from 'react';
import { Form, Label, Button, Input } from './ContactForm.styled';

const ContactForm = ({ formSubmit }) => {
  const [name, setname] = useState('');
  const [number, setnumber] = useState('');

  const handleContactSave = e => {
    e.preventDefault();
    formSubmit(name, number);
    setname('');
    setnumber('');
  };

  const handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setname(value);
        break;
      case 'number':
        setnumber(value);
        break;
      default:
        return;
    }
  };

  return (
    <Form autoComplete="off" onSubmit={handleContactSave}>
      <Label>
        Name
        <Input
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          placeholder="Jacob Mercer"
          required
          onChange={handleChange}
        />
      </Label>
      <Label>
        Number
        <Input
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          placeholder="+380675006070"
          required
          onChange={handleChange}
        />
      </Label>
      <Button type="submit" disabled={!name || !number}>
        Add Contact
      </Button>
    </Form>
  );
};

ContactForm.propTypes = {
  formSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
