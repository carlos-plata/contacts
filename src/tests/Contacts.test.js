/**
 * Contacts.test.js
 * 
 * Comprehensive test suite for the Contacts component
 * 
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Contacts from "../components/Contacts";

const contacts = [
	{
		id: "karen",
		name: "Karen Isgrigg",
		handle: "karen_isgrigg",
		avatarURL: "http://localhost:5001/karen.jpg",
	},
	{
		id: "richard",
		name: "Richard Kalehoff",
		handle: "richardkalehoff",
		avatarURL: "http://localhost:5001/richard.jpg",
	},
	{
		id: "tyler",
		name: "Tyler McGinnis",
		handle: "tylermcginnis",
		avatarURL: "http://localhost:5001/tyler.jpg",
	},
];

describe('Contacts component', () => {
	// Test: renders a list of contacts with correct details
	it('renders a list of contacts with correct details', () => {
		render(<Contacts contacts={contacts} />);

		contacts.forEach((contact) => {
			const nameElement = screen.getByText(contact.name);
			const handleElement = screen.getByText(contact.handle);
			const avatarElement = screen.getByTestId(`avatar-${contact.id}`);

			expect(nameElement).toBeInTheDocument();
			expect(handleElement).toBeInTheDocument();
			expect(avatarElement).toBeInTheDocument();
			expect(avatarElement).toHaveStyle(`background-image: url(${contact.avatarURL})`);
		});
	});

	// Test: calls onDeleteContact when "Remove" button is clicked
	it('calls onDeleteContact when "Remove" button is clicked', () => {
		const mockDeleteFunction = jest.fn();
		render(<Contacts contacts={contacts} onDeleteContact={mockDeleteFunction} />);

		contacts.forEach((contact) => {
			const removeButton = screen.getByText('Remove', { selector: `button[data-testid="remove-${contact.id}"]` });
			fireEvent.click(removeButton);

			expect(mockDeleteFunction).toHaveBeenCalledWith(contact);
		});
	});

	// Test: updates the search query on input change
	it('updates the search query on input change', () => {
		render(<Contacts contacts={contacts} onDeleteContact={jest.fn()} />);

		const searchInput = screen.getByPlaceholderText('Search Contacts');
		fireEvent.change(searchInput, { target: { value: 'Richard' } });

		expect(searchInput.value).toBe('Richard');
	});

	// Test: clears the search query on "Show All" button click
	it('clears the search query on "Show All" button click', () => {
		render(<Contacts contacts={contacts} onDeleteContact={jest.fn()} />);

		const searchInput = screen.getByPlaceholderText('Search Contacts');
		fireEvent.change(searchInput, { target: { value: 'Karen' } });

		const showAllButton = screen.getByText('Show All');
		fireEvent.click(showAllButton);

		expect(searchInput.value).toBe('');
	});

	// Test: displays correct count of shown contacts
	it('displays correct count of shown contacts', () => {
		render(<Contacts contacts={contacts} onDeleteContact={jest.fn()} />);

		const searchInput = screen.getByPlaceholderText('Search Contacts');
		fireEvent.change(searchInput, { target: { value: 'Richard' } });

		const showingContactsMessage = screen.getByText('Now showing 1 of 3.');
		expect(showingContactsMessage).toBeInTheDocument();
	});

	// Test: shows all contacts when query is cleared
	it('shows all contacts when query is cleared', () => {
		render(<Contacts contacts={contacts} onDeleteContact={jest.fn()} />);

		const searchInput = screen.getByPlaceholderText('Search Contacts');
		fireEvent.change(searchInput, { target: { value: 'Richard' } });

		const showAllButton = screen.getByText('Show All');
		fireEvent.click(showAllButton);

		const nameElements = screen.getAllByText(/Karen|Richard|Tyler/);
		expect(nameElements.length).toBe(3);
	});

});

export { contacts };
