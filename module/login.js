const crypto = require('crypto');
const { app } = global; 

app.post('/login', async (req, res) => {
    const { email, hashed_password } = req.body;

    if (!email || !hashed_password) {
        return res.status(400).json({ message: 'Email dan password harus diisi' });
    }

    try {
        const user = await knex('users').where({ email }).first();

        if (!user) {
            return res.status(401).json({ message: 'Email' });
        }

        const hashedPassword = crypto.createHash('md5').update(hashed_password).digest('hex');

        if (user.hashed_password !== hashedPassword) {
            return res.status(401).json({ message: 'password salah' });
        }

        // Jika berhasil login, kembalikan userId dan first_name (opsional, diatur pada register.js)
        res.status(200).json({ message: 'Login berhasil', userId: user.user_id, firstName: user.first_name, lastname: user.last_name, email:user.email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan saat login' });
    }
});