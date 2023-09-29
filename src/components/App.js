import React, { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter/Filter';
import { GlobalStyles } from './GlobalStyles';

export function App() {
    const [contacts, setContacts] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const savedContacts = localStorage.getItem('contacts');
        if (savedContacts) {
            setContacts(JSON.parse(savedContacts));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    });

    const addContact = (newContact) => {
        setContacts((prevContacts) => [...prevContacts, newContact]);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const deleteContact = (contactId) => {
        setContacts((prevContacts) => (
        prevContacts.filter((contact) => contact.id !== contactId)
        ));
    };

    return (
        <div>
            <h1>Phonebook</h1>

            <ContactForm addContact={addContact} contacts={contacts} />

            <h2>Contacts</h2>

            <Filter filter={filter} onFilterChange={handleFilterChange} />

            <ContactList contacts={contacts} filter={filter} onDeleteContact={deleteContact} />

            <GlobalStyles></GlobalStyles>
        </div>
    );
};