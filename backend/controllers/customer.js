const customerRoute = require("express").Router();
const Customer = require("../models/customer");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// GET /api/customers
customerRoute.get("/", async (req, res, next) => {
  try {
    const customers = await Customer.find({}).populate("user", { username: 1 });
    res.json(customers);
  } catch (error) {
    next(error);
  }
});

// GET /api/customers/:id
customerRoute.get("/:id", async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        error: "Customer not found",
      });
    }

    res.json(customer);
  } catch (error) {
    next(error);
  }
});

// POST /api/customers
customerRoute.post("/", async (req, res, next) => {
  const { name, gender, role, number } = req.body;

  try {
    // userId comes from the userExtractor middleware passed to the customerRouter
    if (!req.userId) {
      return res.status(401).json({ error: "token missing or invalid" });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const customer = new Customer({
      name,
      gender,
      role,
      number,
      user: user._id,
    });

    await customer.save();

    // add new customer to current user customers array
    user.customers.push(customer._id);

    // save changes to user
    await user.save();

    res.status(201).json(customer);
  } catch (error) {
    next(error);
  }
});

// PUT /api/customers/:id
customerRoute.put("/:id", async (req, res, next) => {
  try {
    const currentCustomer = await Customer.findById(req.params.id);

    if (currentCustomer.user.toString() !== req.userId.toString()) {
      return res
        .status(401)
        .json({ error: "only owner can update this customer" });
    }

    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // return updated document instead of original
      runValidators: true, // run validators on this update
      context: "query",
    });

    res.json(customer);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/customers/:id
customerRoute.delete("/:id", async (req, res, next) => {
  try {
    const currentCustomer = await Customer.findById(req.params.id);

    if (currentCustomer.user.toString() !== req.userId.toString()) {
      return res
        .status(401)
        .json({ error: "only owner can delete this customer" });
    }
    await Customer.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = customerRoute;
