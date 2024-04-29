const router = require('express').Router();
const userroutes=require('./user_route');

router.get('/test', (req, res) => { 
    let data = "hiran"
    console.log(process.env.DB_PASS, "process.env.DB_PASS")
    res.json({ message: 'Test endpoint working!', data: data }); 
});

router.use('/',userroutes);

// Delete staff
router.delete('/staff', async (req, res) => {
    const staff_id = req.body?.staff_id;
    const staff_n = req.body?.staff_n;

    console.log("staff id", staff_id);

    const result = await new Promise((resolve, reject) => {
        db.query("DELETE FROM staff WHERE staff_id=? AND staff_name=?",
            [staff_id, staff_n],
            (error, result, field) => {
                error ? reject(error) : resolve(result)
            })
    });

    if (!result?.affectedRows) return res.json({ "success": false, "message": "Error while deleting staff entry." });

    return res.json({ success: true, message: "Staff entry deleted successfully." });
})

module.exports = router;