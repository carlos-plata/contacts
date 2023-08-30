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

	it('calls onDeleteContact when "Remove" button is clicked', () => {
		const mockDeleteFunction = jest.fn();
		render(<Contacts contacts={contacts} onDeleteContact={mockDeleteFunction} />);

		contacts.forEach((contact) => {
			const removeButton = screen.getByText('Remove', { selector: `button[data-testid="remove-${contact.id}"]` });
			fireEvent.click(removeButton);

			expect(mockDeleteFunction).toHaveBeenCalledWith(contact);
		});
	});
});

export { contacts };
