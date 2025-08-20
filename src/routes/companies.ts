import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { body, validationResult } from "express-validator";
import { CreateCompanyDTO } from "../dto/company.dto";

const prisma = new PrismaClient();
const router = Router();

// POST /companies -> create a company
router.post(
  "/",
  [
    body("name").isString().notEmpty().withMessage("name is required"),
    body("registrationNumber").isString().notEmpty().withMessage("registrationNumber is required"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const data = req.body as CreateCompanyDTO;
    const company = await prisma.company.create({ data });
    return res.status(201).json(company);
  }
);

// GET /companies -> list all companies with services
router.get("/", async (_req: Request, res: Response) => {
  const companies = await prisma.company.findMany({ include: { services: true } });
  res.json(companies);
});

export default router;
