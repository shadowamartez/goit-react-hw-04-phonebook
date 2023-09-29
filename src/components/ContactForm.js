import React from 'react';
import { Formik, Field, Form } from 'formik';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export function ContactForm({addContact, contacts}) {
    const handleAddContact = (values, { resetForm }) => {
    const { name, number } = values;

    if (contacts.some((contact) => contact.name === name)) {
        alert(`${name} is already in contacts!`);
        return;
    }


    const newContact = {
        id: nanoid(),
        name,
        number,
    };

    addContact(newContact);

    resetForm();
    };

    return (
        <Formik
            initialValues={{ name: '', number: '' }}
            onSubmit={handleAddContact}
        >
            <Form>
            <label htmlFor="name">Name</label>
            <Field
                type="text"
                id="name"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
            />
            <label htmlFor="number">Number</label>
            <Field
                type="tel"
                id="number"
                name="number"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
            />
            <button type="submit">Add contact</button>
            </Form>
        </Formik>
        );
};

ContactForm.propTypes = {
    addContact: PropTypes.func.isRequired, 
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        })
    ).isRequired,
};

