const express = require('express')
const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../../models/contacts')
const Joi = require('joi');
const router = express.Router();

const createSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required()
});

const updateChema = Joi.object({
   name: Joi.string(),
   email: Joi.string(),
   phone: Joi.string()
}).or('name', 'email', 'phone');

router.get('/', async (req, res, next) => {
  const data = await listContacts();
  res.json(data);
})

router.get('/:contactId', async (req, res, next) => {
  const result = await getContactById(req.params.contactId)
  if (!result) {
    return res.status(404).json({ message: 'Not found' })
  }

  res.json(result);
})

router.post('/', async (req, res, next) => {
  const { error } = createSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message});
  }

  const data = await addContact(req.body);
  res.status(201).json(data)
})

router.delete('/:contactId', async (req, res, next) => {
  const result = await removeContact(req.params.contactId);
  if (!result) {
    return res.status(404).json({ message: 'Not found' }); 
  } 

  res.json({ message: "Contact deleted" });
})

router.put('/:contactId', async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: 'missing fields'});
  }
  
  const { error } = updateChema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message});
  }

  const result = await updateContact(req.params.contactId, req.body);
  if (!result) {
    return res.status(404).json({ message: 'Not found' });
  }

  res.json(result);   
})

module.exports = router
