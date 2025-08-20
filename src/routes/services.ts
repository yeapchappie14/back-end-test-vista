import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { body, param, validationResult } from "express-validator";
import { CreateServiceDTO } from "../dto/service.dto";

const prisma = new PrismaClient();
const router = Router();

// POST /services -> create a service under a company
router.post(
  "/",
  [
    body("name").isString().notEmpty().withMessage("name is required"),
    body("description").isString().notEmpty().withMessage("description is required"),
    body("price").isNumeric().withMessage("price must be a number"),
    body("companyId").isInt({ min: 1 }).withMessage("companyId must be an integer"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, description, price, companyId } = req.body as unknown as CreateServiceDTO;
    const service = await prisma.service.create({
      data: { name, description, price: Number(price), companyId: Number(companyId) },
    });
    return res.status(201).json(service);
  }
);

// GET /services/:id -> get service by id
router.get("/:id", [param("id").isInt({ min: 1 })], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const id = Number(req.params.id);
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) return res.status(404).json({ message: "Service not found" });
  res.json(service);
});

export default router;
