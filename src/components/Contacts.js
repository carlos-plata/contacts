import PropTypes from 'prop-types'
import { useState } from 'react'

/**
 * Contacts.js
 * 
 * Renders a list of contacts
 */

const Contacts = ({ contacts, onDeleteContact }) => {
	const [query, setQuery] = useState('');
	const updateQuery = (query) => {
		setQuery(query.trim());
	};
	const clearQuery = () => {
		updateQuery("");
	}
	const showContacts = query === ""
		? contacts
		: contacts.filter((contact) =>
			contact.name.toLowerCase().includes(query.toLowerCase())
		);
	return (
		<div className="list-contacts">
			<div className="list-contacts-top">
				<input
					className="search-contacts"
					type="text"
					placeholder="Search Contacts"
					value={query}
					onChange={(event) => updateQuery(event.target.value)}
				/>
			</div>
			{
				showContacts.length !== contacts.length && (
					<div className='showing-contacts'>
						<span>Now showing {showContacts.length} of {contacts.length}.</span>
						<button onClick={clearQuery}>Show All</button>
					</div>
				)
			}
			<ol className="contact-list">
				{showContacts.map((contact) => (
					<li key={contact.id} className="contact-list-item">
						<div className="contact-avatar" style={{ backgroundImage: `url(${contact.avatarURL})` }} data-testid={`avatar-${contact.id}`}></div>
						<div className="contact-details">
							<p>{contact.name}</p>
							<p>{contact.handle}</p>
						</div>
						<button className="contact-remove" onClick={() => onDeleteContact(contact)} data-testid={`remove-${contact.id}`}>Remove</button>
					</li>
				))}
			</ol>
		</div>
	);
};

Contacts.propTypes = {
	contacts: PropTypes.array.isRequired,
	onDeleteContact: PropTypes.func.isRequired
};

export default Contacts;