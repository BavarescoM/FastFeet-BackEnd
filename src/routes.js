import { Router } from "express";
import SessionController from "./app/controllers/SessionController";
import RecipientsController from "./app/controllers/RecipientController";

import multer from "multer";
import multerConfig from "./config/multer";
import FileController from "./app/controllers/FileController";
import DeliverymanController from "./app/controllers/DeliverymanController";

import authMiddleware from "./app/middlewares/auth";

const routes = new Router();

const upload = multer(multerConfig);

routes.post("/sessions", SessionController.store);

routes.use(authMiddleware);
routes.get("/recipients", RecipientsController.show);
routes.post("/recipients", RecipientsController.store);
routes.put("/recipients/:id", RecipientsController.update);
routes.delete("/recipients/:id", RecipientsController.delete);

routes.get("/deliveryman", DeliverymanController.show);
routes.post("/deliveryman", DeliverymanController.store);
routes.put("/deliveryman/:id", DeliverymanController.update);
routes.delete("/deliveryman/:id", DeliverymanController.delete);

routes.post("/files", upload.single("file"), FileController.store);

routes.get("/", (req, res) => {
  return res.json({ message: "bombou" });
});
export default routes;
