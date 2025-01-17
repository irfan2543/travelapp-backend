// Read Data Booking
app.get("/Ticket", async (req, res) => {
  const results = await knex("flight_bookings").select();
  res.json(results);
});

// Post Data Booking
app.post("/Ticket", async (req, res) => {
  const data = req.body;
    
    let dateID = new Date()
    let ticketID = dateID.getTime()

    const results = await knex("flight_bookings").insert({
      id : ticketID,
      flight_id : data.flight_id,
      full_name: data.full_name,
      email: data.email,
      baggage : data.baggage,
      is_cabin : data.is_cabin,
      status: "Process",
    });
    
    res.status(201).json({message : ticketID})
});

cron.schedule("* * * * *", async () => {
  try{
    const results = await knex('flight_bookings')
    .where('status', 'Process')
    .whereRaw("created_at < NOW() - INTERVAL 10 MINUTE")
    .update({
      status : "Cancelled"
    })

    if(results){
      const cancelBooked = await knex('flight_bookings').where('status', 'Cancelled').whereRaw("created_at < NOW() - INTERVAL 10 MINUTE")

      for(const cancel of cancelBooked){
        const seatBook = await knex('booking_seats').where('date_flight_id', cancel.id)
        for(const updateIsBooked of seatBook){
          const update = await knex('flight_seats').where('id', updateIsBooked.seat_id).update({is_booked : 1})
        }
         await knex("booking_seats").where("date_flight_id", cancel.id).del();
      }
    }
  }catch(err){
    console.error(err)
  }
})

// Update Data Booking
app.put('/Ticket/:id', async (req, res) => {
  const { id } = req.params;
  const { flight_id, full_name, email, baggage, is_cabin, total_price, status } = req.body;
  const data = req.body
  const numberSeatID = data.flight_seats
  const booking = await knex('flight_bookings').where('id', id).first()

  if(booking.status === 'Cancelled'){
    return res.status(400).json({message : "Sudah Ke Cancelled"})
  }else if(booking.status === 'Process'){
    const response = await knex('flight_bookings').where('id', id).update({

      flight_id,
      full_name,
      email,
      baggage,
      is_cabin,
      status,
      total_price,
      status : status,
    })
      const bookSeat = await knex('booking_seats').insert(
        numberSeatID.map((seat) => ({
            date_flight_id : id,
            flight_id :seat.flight_id,
            seat_id : seat.id
        })))

        for (const seat of numberSeatID) {
          await knex('flight_seats')
            .where('id', seat.id)  // Cari berdasarkan id seat
            .update({ is_booked: 0 });  // Update is_booked menjadi 0
        }
    

    res.status(200).json({message : "Update Berhasil Dilakukan"});
  }
});

