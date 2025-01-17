app.post('/history', async (req, res) => {
    const { email } = req.body;
  
    try {
      // Ambil riwayat berdasarkan email
      const history = await knex('flight_bookings')
        .select('id', 'flight_id', 'full_name', 'email', 'baggage', 'is_cabin', 'status', 'total_price', 'created_at', 'update_at')
        .where({ email })
        
  
      // Jika tidak ada data history untuk email tersebut
      if (history.length === 0) {
        return res.status(404).json({ message: 'Tidak ada riwayat untuk email ini.' });
      }
  
      // Kirim data history ke frontend
      return res.status(200).json({ history });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
  });