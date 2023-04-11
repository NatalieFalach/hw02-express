const fs = require('fs/promises');
const { nanoid } = require('nanoid');
const path = require('path')

const contactsPath = path.join(__dirname, "contacts.json");

const readContacts = async () => {
  console.log('read = ', contactsPath)
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);

  return contacts;
}

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts), 'utf-8');
}

const listContacts = async () => {
  const contacts = await readContacts();
  console.log(contacts);
  return contacts;
}

const getContactById = async (contactId) => {
  const contacts = await readContacts();

  return contacts.find((contact) => contact.id === contactId);
}

const removeContact = async (contactId) => {
  const contacts = await readContacts();
  const idx = contacts.findIndex(
    contact => contact.id === contactId
  );

  if (idx !== -1) {
    contacts.splice(idx, 1);
    await updateContacts(contacts);

    return true;
  } else {
    return false;
  }
}

const addContact = async ({ name, email, phone }) => {
  const contacts = await readContacts();
  const newContact = { id: nanoid(8), name, email, phone };

  contacts.push(newContact);
  await updateContacts(contacts);

  return newContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await readContacts();
  const idx = contacts.findIndex(contact => contact.id === contactId);

  if (idx !== -1) {
    const contact = contacts[idx];
    contacts[idx] = { ...contact, ...body };
    await updateContacts(contacts);

    return contacts[idx];
  }

  return false
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
