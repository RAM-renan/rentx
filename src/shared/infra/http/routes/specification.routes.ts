import { Router } from "express";
import { ensureAuthenticated } from "@shared/infra/http/middleware/ensureAuthenticated";
import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ensureAdmin } from "../middleware/ensureAdmin";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRoutes.use(ensureAuthenticated);
specificationRoutes.post("/",
    ensureAuthenticated,
    ensureAdmin,
     createSpecificationController.handle);

export {specificationRoutes};