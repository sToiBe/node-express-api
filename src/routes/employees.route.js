import { Router } from 'express';
const router = Router();
import {Employees} from '../controllers/employees.controllers.js';

router.all('/employees/:id?', Employees);

export default router;