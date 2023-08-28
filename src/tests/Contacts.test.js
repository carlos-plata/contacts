/**
 * Contacts.test.js
 * 
 * Test implementation of Contacts.js component
 * 
 */
import React from "react";
import { render, screen } from "@testing-library/react";
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
	it('renders a list of contacts', () => {
		const { container } = render(<Contacts contacts={contacts} />);
		const contactList = container.querySelector('.contact-list');

		expect(contactList).toBeInTheDocument();

	});

	it('renders contact details correctly', () => {
		const { getByText, getByTestId } = render(<Contacts contacts={contacts} />);

		contacts.forEach((contact) => {
			const nameElement = getByText(contact.name);
			const handleElement = getByText(contact.handle);
			const avatarElement = getByTestId(`avatar-${contact.id}`);

			expect(nameElement).toBeInTheDocument();
			expect(handleElement).toBeInTheDocument();
			expect(avatarElement).toBeInTheDocument();
			expect(avatarElement).toHaveStyle(`background-image: url(${contact.avatarURL})`);
		});
	});
});
