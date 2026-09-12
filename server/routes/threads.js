import express from "express";
import prisma from "../prisma/client.js";

const router = express.Router();
// GET all threads
router.get("/", async (req, res, next) => {
  try {
    const threads = await prisma.thread.findMany();
    res.json(threads);
  } catch (error) {
    next(error);
  }
});

// POST a new thread
router.post("/", async (req, res, next) => {
  try {
    const thread = await prisma.thread.create({
      data: {
        title: req.body.title,
        body: req.body.body,
      },
    });

    res.status(201).json(thread);
  } catch (error) {
    next(error);
  }
});

// PUT/update a thread
router.put("/:id", async (req, res, next) => {
  try {
    const thread = await prisma.thread.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: req.body,
    });

    res.json(thread);
  } catch (error) {
    next(error);
  }
});

// DELETE a thread
router.delete("/:id", async (req, res, next) => {
  try {
    const thread = await prisma.thread.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.status(200).json(thread);
  } catch (error) {
    next(error);
  }
});

export default router;