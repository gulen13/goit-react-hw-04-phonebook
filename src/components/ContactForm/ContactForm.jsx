import PropTypes from 'prop-types';
import { Form, Label, Button, Input } from './ContactForm.styled';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const validationSchema = yup
  .object({
    name: yup.string().min(3).required(),
    number: yup.number().positive().integer().required(),
  })
  .required();

const ContactForm = ({ formSubmit }) => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = ({ name, number }) => {
    formSubmit(name, number);
    resetField('name');
    resetField('number');
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Label>
        Name
        <Input placeholder="Jacob Mercer" {...register('name')} />
        <p>
          {errors.name?.message &&
            Notify.failure(
              'Name may contain only letters, apostrophe, dash and spaces.',
              {
                timeout: 4000,
                width: '400px',
              }
            )}
        </p>
      </Label>
      <Label>
        Number
        <Input placeholder="+380675006070" {...register('number')} />
        <p>
          {errors.number?.message &&
            Notify.failure(
              'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +',
              {
                timeout: 4000,
                width: '400px',
              }
            )}
        </p>
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
