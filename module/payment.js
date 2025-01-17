app.put('/payment/:id', async (req, res) => {
    const { id } = req.params;
    const { flight_id, full_name, email, baggage, is_cabin, total_price, status, payment } = req.body;
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
        payment,
      })
      
  res.status(200).json({message : "Update Berhasil Dilakukan"});
}
});