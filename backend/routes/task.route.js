import { Router } from "express";
import isAuthenticated from "../middleware/auth.middleware.js";
import { createTask, deleteTask, getTaskById, getTasksForUser, updateTask, updateTaskStatus } from "../controller/task.controller.js";

const taskRouter = Router();

taskRouter.route('/').post(isAuthenticated,createTask)
              .get(isAuthenticated,getTasksForUser);

taskRouter.route('/:id').get(isAuthenticated,getTaskById)
                .put(isAuthenticated,updateTask)
                .delete(isAuthenticated,deleteTask);

taskRouter.route('/status/:id').post(updateTaskStatus);

export default taskRouter;
