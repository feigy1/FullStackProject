const express = require("express");
const HelpRequestService = require("../BL/HelpRequestService");
const dataError = require("../BL/Errors/dataError");
const idError = require("../BL/Errors/idError");

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        let result = await HelpRequestService.get(req.query)
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
        let result = await HelpRequestService.getById(req.params.id)
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
router.post('/', async (req, res, next) => {
    try {
        let result = await HelpRequestService.insert(req.body);
        if (result.id != null)
            res.json(result)
        else
            res.status(204).send();
    }
    catch (err) {
        if (err instanceof idError || err instanceof dataError)
            res.status(400).send(err.message);
        next(err);
    }
});
router.put('/:id', async (req, res, next) => {
    try {
        let result = await HelpRequestService.update(req.params.id, req.body);
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
        let result = await HelpRequestService.delete(req.params.id);
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