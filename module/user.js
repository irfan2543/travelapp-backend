app.post('/checkUser', async (req,res) => {
    const {user_id, email} = req.body

    try{
        const userId = await knex('users').where({user_id}).first()

        if(!userId){
            res.status(401).json({message : "Id Salah"})
        }

        if(userId.email !== email){
            res.status(401).json({message : "Email Tidak Cocok Dengan ID"})
        }

        res.status(200).json({message : "Berhasil"})
    }catch(err) {
        console.error(err)
    }
})