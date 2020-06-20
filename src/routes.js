import { Router } from "express";
import SessionController from "./app/controllers/SessionController";
import RecipientsController from "./app/controllers/RecipientController";

import multer from "multer";
import multerConfig from "./config/multer";
import FileController from "./app/controllers/FileController";
import DeliverymanController from "./app/controllers/DeliverymanController";
import OrderController from "./app/controllers/OrderController";

import authMiddleware from "./app/middlewares/auth";
import DeliverymanAccessController from "./app/controllers/DeliverymanAccessController";
import OrderWithProblemController from "./app/controllers/OrderWithProblemController";

const routes = new Router();

const upload = multer(multerConfig);

routes.post("/sessions", SessionController.store);

routes.get("/problems/:id", OrderWithProblemController.index);
routes.post("/problems/:id", OrderWithProblemController.store);
routes.put("/problems/:id", OrderWithProblemController.cancel);

routes.put("/deliverymanstart/:id", DeliverymanAccessController.start);
routes.put("/deliverymanend/:id", DeliverymanAccessController.end);
routes.get(
  "/deliverymanaccess/:id/deliveries",
  DeliverymanAccessController.index
);

routes.use(authMiddleware);
routes.get("/recipients", RecipientsController.show);
routes.get("/recipients/:id", RecipientsController.showById);
routes.post("/recipients", RecipientsController.store);
routes.put("/recipients/:id", RecipientsController.update);
routes.delete("/recipients/:id", RecipientsController.delete);

routes.get("/deliveryman", DeliverymanController.show);
routes.post("/deliveryman", DeliverymanController.store);
routes.put("/deliveryman/:id", DeliverymanController.update);
routes.delete("/deliveryman/:id", DeliverymanController.delete);

routes.get("/order", OrderController.show);
routes.post("/order", OrderController.store);
routes.put("/order/:id", OrderController.update);
routes.delete("/order/:id", OrderController.delete);
routes.get("/order/:id/deliveries", OrderController.getpackge);

routes.post("/files", upload.single("file"), FileController.store);

routes.get("/", (req, res) => {
  return res.json({ message: "bombou" });
});
export default routes;
