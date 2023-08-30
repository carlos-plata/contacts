/**
 * Contacts.js
 * 
 * Renders a list of contacts
 */

const Contacts = ({ contacts, onDeleteContact }) => {
	return <ol className="contact-list">
		{contacts.map((contact) => (
			<li key={contact.id} className="contact-list-item">
				<div className="contact-avatar" style={{ backgroundImage: `url(${contact.avatarURL})` }} data-testid={`avatar-${contact.id}`}></div>
				<div className="contact-details">
					<p>{contact.name}</p>
					<p>{contact.handle}</p>
				</div>
				<button className="contact-remove" onClick={() => onDeleteContact(contact)} data-testid={`remove-${contact.id}`}>Remove</button>
			</li>
		))}
	</ol>;
}

export default Contacts;