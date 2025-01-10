const crypto = require('crypto'); 
const { app } = global; 

app.post('/register', async (req, res) => {
    const { email, password, first_name, last_name } = req.body;

    if (!email || !password || !first_name || !last_name) {
        return res.status(400).json({ message: 'Semua field harus diisi' });
    }

    try {
        const hashedPassword = crypto.createHash('md5').update(password).digest('hex');

        const results = await knex('users').insert({
            email,
            hashed_password: hashedPassword,
            first_name,
            last_name,
            roles: 'user', 
            created_at: new Date(),
        });

        const userId = results[0]; 


        res.status(201).json({ message: 'Pengguna berhasil terdaftar', userId: userId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan saat mendaftar pengguna' });
    }
});

// // Rute untuk mendapatkan data pengguna
// app.get('/user/:userId', async (req, res) => {
//     const userId = req.params.userId; 

//     if (!userId) {
//         return res.status(401).json({ message: 'User  not authenticated' });
//     }

//     try {
//         const user = await knex('users').where({ user_id: userId }).first();
//         if (!user) {
//             return res.status(404).json({ message: 'User  not found' });
//         }
//         res.json({ user });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error loading user data' });
//     }
// });

