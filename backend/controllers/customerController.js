import { validationResult } from 'express-validator';
import Customer from '../models/Customer.js';

export async function listCustomers(req, res, next) {
  try {
    const customers = await Customer.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.json(customers);
  } catch (err) { next(err); }
}

export async function getCustomer(req, res, next) {
  try {
    const c = await Customer.findOne({ _id: req.params.id, owner: req.user.id });
    if (!c) return res.status(404).json({ message: 'Customer not found' });
    res.json(c);
  } catch (err) { next(err); }
}

export async function createCustomer(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const payload = { ...req.body, owner: req.user.id };
    const created = await Customer.create(payload);
    res.status(201).json(created);
  } catch (err) { next(err); }
}

export async function updateCustomer(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const updated = await Customer.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Customer not found' });
    res.json(updated);
  } catch (err) { next(err); }
}

export async function deleteCustomer(req, res, next) {
  try {
    const deleted = await Customer.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
    if (!deleted) return res.status(404).json({ message: 'Customer not found' });
    res.json({ message: 'Customer deleted' });
  } catch (err) { next(err); }
}