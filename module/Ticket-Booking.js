// Read Data Booking
app.get("/flight_booking", async (req, res) => {
  const results = await knex("flight_booking").select();
  res.json(results);
});

// Post Data Booking
app.post("/flight_booking", async (req, res) => {
  const data = req.body;

  const results = await knex("flight_booking").insert({
    id : data.id,
    user_id: data.user_id,
    full_name: data.full_name,
    email: data.email,
    price: data.price,
    flight_id: data.flight_id,
    seat_id: data.seat_id,
    booking_status: data.booking_status
  });

  res.json(results);
});

// Delete Data Booking
app.delete("/flight_booking/:id", async (req, res) => {
  const primaryKey = req.params.id;

  const results = await knex("flight_booking").where("id", primaryKey).del();
  res.json(results);
});

// Update Data Booking
app.put("/flight_booking/:id", async (req, res) => {
  const primaryKey = req.params.id;
  const data = req.body;

  const results = await knex("flight_booking").where("id", primaryKey).update({
    id : data.id,
    user_id: data.user_id,
    full_name: data.full_name,
    email: data.email,
    price: data.price,
    flight_id: data.flight_id,
    seat_id: data.seat_id,
    booking_status: data.booking_status
  });
  res.json(results);
});
