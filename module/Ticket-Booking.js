// Read All Bookings
app.get('/booking', async (req, res) => {
  try {
    const results = await knex('booking').select();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create Booking
app.post("/booking", async (req, res) => {
  try {
    const data = req.body;

    const [id] = await knex('booking').insert({
      nama: data.nama,
      kota_asal: data.kota_asal,
      kota_akhir: data.kota_akhir,
      kursi: data.kursi,
    });

    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Booking
app.delete("/booking/:id", async (req, res) => {
  try {
    const primaryKey = req.params.id;

    const deleted = await knex("booking").where("id", primaryKey).del();
    if (!deleted) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Booking
app.put("/booking/:id", async (req, res) => {
  try {
    const primaryKey = req.params.id;
    const data = req.body;

    const updated = await knex("booking").where("id", primaryKey).update({
      nama: data.nama,
      kota_asal: data.kota_asal,
      kota_akhir: data.kota_akhir,
      kursi: data.kursi,
    });

    if (!updated) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json({ message: "Booking updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
