import PropTypes from 'prop-types';
// import { useState } from 'react';
import { Form, Label, Button, Input } from './ContactForm.styled';
import { useForm } from 'react-hook-form';

const ContactForm = ({ formSubmit }) => {
  // const [name, setname] = useState('');
  // const [number, setnumber] = useState('');

  // const handleContactSave = e => {
  //   e.preventDefault();
  //   formSubmit(name, number);
  //   setname('');
  //   setnumber('');
  // };

  // const handleChange = event => {
  //   const { name, value } = event.target;
  //   switch (name) {
  //     case 'name':
  //       setname(value);
  //       break;
  //     case 'number':
  //       setnumber(value);
  //       break;
  //     default:
  //       return;
  //   }
  // };

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isDirty },
  } = useForm();

  const onSubmit = ({ name, number }) => {
    formSubmit(name, number);
    resetField('name');
    resetField('number');
  };

  // console.log(watch('example'));

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Label>
        Name
        <Input
          // type="text"
          // name="name"
          // value={name}
          // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          // required
          // onChange={handleChange}
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          placeholder="Jacob Mercer"
          {...register('name', { required: true })}
        />
        {errors.name && <span>This field is required</span>}
      </Label>
      <Label>
        Number
        <Input
          // type="tel"
          // name="number"
          // value={number}
          // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          // required
          // onChange={handleChange}
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          placeholder="+380675006070"
          {...register('number', { required: true })}
        />
        {errors.number && <span>This field is required</span>}
      </Label>
      <Button type="submit" disabled={!isDirty}>
        Add Contact
      </Button>
    </Form>
  );
};

ContactForm.propTypes = {
  formSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
