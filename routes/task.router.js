import { Router } from "express";
 import {getTareas,
getTarea,
createTareas,
updateTareas,
deleteTareas,updateDoneTareas} from '../controllers/task.controller.js'

const router=Router()

router.get('/task' ,getTarea)

router.get('/task/:id' ,getTareas)

router.put('/task/:id' ,updateTareas)
router.put('/taskdone/:id' ,updateDoneTareas)

router.post('/task' ,createTareas)

router.delete('/task/:id' ,deleteTareas)


export default router