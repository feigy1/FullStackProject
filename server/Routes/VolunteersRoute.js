const express = require("express");
const VolunteerService = require("../BL/VolunteerService");
const dataError = require("../BL/Errors/dataError");
const idError = require("../BL/Errors/idError");

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        let result = await VolunteerService.get(req.query)
        if (result.length > 0)
            res.send(result)
        else
            res.status(204).send();
    }
    catch {
        next();
    }
});
router.get('/:id', async (req, res, next) => {
    try {
        let result = await VolunteerService.getById(req.params.id)
        if (result != undefined)
            res.json(result || []);
        else
            res.status(204).send();
    }
    catch (err) {
        if (err instanceof idError)
            res.status(400).send(err.message);
        next(err);
    }
});
// router.post('/', async(req, res,next)=>{
//     console.log("dd");
// try{
//     let result = await VolunteerService.insert(req.body);
//     if(result.id !=null)
//         res.json(result)
//     else
//         res.status(204).send();
// }
// catch(err){
//     if (err instanceof idError||err instanceof dataError||err instanceof Error)
//         res.status(400).send(err.message);
//     next(err);
// }});
router.post('/', async (req, res, next) => {
    console.log("dd");
    try {
        let result = await VolunteerService.insert(req.body);
        if (result.id != null) {
            return res.json(result); // ✅ מוסיף return כדי למנוע קוד נוסף
        } else {
            return res.status(204).send(); // ✅ מוסיף return
        }
    } catch (err) {
        if (err instanceof idError || err instanceof dataError || err instanceof Error) {
            return res.status(400).send(err.message); // ✅ מוסיף return
        }
        next(err); // יעבור ל- middleware של השגיאות רק אם לא נשלחה תגובה
    }
});


router.put('/:id', async (req, res, next) => {
    try {
        let result = await VolunteerService.update(req.params.id, req.body);
        if (result != undefined)
            res.send(result)
        else
            res.status(204).send();
    }
    catch (err) {
        if (err instanceof idError || err instanceof dataError)
            res.status(400).send(err.message);
        next(err);
    }
});
router.delete('/:id', async (req, res, next) => {
    try {
        console.log(req.params);
        let result = await VolunteerService.delete(req.params.id);
        if (result != undefined)
            res.send(result)
        else
            res.status(204).send();
    }
    catch (err) {
        if (err instanceof idError)
            res.status(400).send(err.message);
        next(err);
    }
});
module.exports = router;