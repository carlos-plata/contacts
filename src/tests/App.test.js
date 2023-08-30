/**
 * App.test.js
 * 
 * Comprehensive test suite for the App component
 * 
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import App from "../components/App";
import { contacts } from './Contacts.test';

describe('App component', () => {
	it('renders the App component correctly', () => {
		render(<App />);

		// Check for the presence of the Contacts component
		const contactsComponent = screen.getByTestId('contacts-component');
		expect(contactsComponent).toBeInTheDocument();

		// Check if at least one contact is rendered
		const contactListItems = screen.queryAllByTestId(/^avatar-.*/);
		expect(contactListItems.length).toBeGreaterThanOrEqual(1);
	});

	it('removes a contact when "Remove" button is clicked', () => {
		render(<App />);

		// Check the initial number of contacts
		const initialContactCount = screen.queryAllByTestId(/^avatar-.*/).length;

		// Find the "Remove" button for the first contact
		const contact = contacts[0]; // Get the first contact for testing purposes
		const removeButton = screen.getByText('Remove', { selector: `button[data-testid="remove-${contact.id}"]` });
		fireEvent.click(removeButton);

		// Check if the contact count has decreased
		const updatedContactCount = screen.queryAllByTestId(/^avatar-.*/).length;
		expect(updatedContactCount).toBe(initialContactCount - 1);
	});
});