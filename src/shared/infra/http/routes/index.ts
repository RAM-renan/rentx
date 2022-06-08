import { Router } from "express";
import { categoriesRoutes } from "./categoties.routes";
import { specificationRoutes } from "./specification.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { userRoutes } from "./users.routes";
import { carsRoutes } from "./cars.routes";
import { rentalRoutes } from "./rental.routes";
import { passwordRoutes } from "./password.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationRoutes);
router.use("/users", userRoutes);
router.use("/cars", carsRoutes);
router.use("/rentals", rentalRoutes);
router.use("/password", passwordRoutes);
router.use(authenticateRoutes)

export { router };