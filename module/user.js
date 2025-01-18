app.post('/check-user', async(req,res) => {
    const {user_id, email, roles} = req.body
    if (!user_id || !email || !roles) {
        console.log(user_id, email, roles)
        return res.status(400).json({ message: "Data tidak lengkap!" });
    }

    try{
        const userId = await knex('users').where({user_id : user_id}).first()

        if(!userId){
            return  res.status(401).json({message : "Id Salah"})
        }else if(userId.email !== email){
            return  res.status(401).json({message : "Email Tidak Cocok Dengan ID"})
        }else if(userId.roles !== roles){
            return  res.status(403).json({message : "Kamu Bukan User !"})
        }else{
            console.log(user_id, email, roles)
            res.status(200).json({message : "Berhasil", userId: user.user_id, email:user.email, roles:user.roles})
        }
    }catch(err) {
        console.error(err)
        res.status(500).json({message : "Terjadi Kesalahan Server"})
    } 
})

app.post('/check-admin', async(req,res) => {
    const {user_id, email, roles} = req.body
    if (!user_id || !email || !roles) {
        console.log(user_id, email, roles)
        return res.status(400).json({ message: "Data tidak lengkap!" });
    }

    try{
        const userId = await knex('users').where({user_id : user_id}).first()

        if(!userId){
            return  res.status(401).json({message : "Id Salah"})
        }else if(userId.email !== email){
            return  res.status(401).json({message : "Email Tidak Cocok Dengan ID"})
        }else if(userId.roles !== roles){
            return  res.status(403).json({message : "Kamu Bukan Admin !"})
        }else{
            console.log(user_id, email, roles)
            res.status(200).json({message : "Berhasil", userId: user.user_id, email:user.email, roles:user.roles})
        }
    }catch(err) {
        console.error(err)
        res.status(500).json({message : "Terjadi Kesalahan Server"})
    } 
})