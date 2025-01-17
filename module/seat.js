app.put('/seat', async (req ,res) => {
    const {id, flight_id, is_booked} = req.body

    try{
        const response = await knex('flight_seats').where({flight_id, id}).select().first()

        const seatIsBooked = response.is_booked === 1 ? 0 : 1

        if(seatIsBooked === 1 && is_booked === 1){
            return res.status(400).json({message : "Kursi Telah Dipesan"})
        }

        const takeSeat = await knex('flight_seats').where({flight_id, id}).update({is_booked : seatIsBooked})

        res.status(200).json({  message: seatIsBooked === 0 ? "Kursi Berhasil Dipesan" : "Kursi Dibatalkan", is_booked: seatIsBooked})
    }catch(err){
        console.error(err)
    }
})

app.post('/seat', async (req,res) => {

    const {id, flight_id, is_booked} = req.body

    try{
        const seats = await knex('flight_seats')
        .where({flight_id})
        .andWhere('is_booked', is_booked)

        if(seats.length === 0){
            res.status(400).json({message : "Tidak Ada Kursi"})
        }
        res.status(200).json(seats)
    }catch(err){
        console.error(err)
    }

})

app.get('/seat', async (req,res) => {
    const {flight_id, is_booked, id} = req.query

    try{
        const seats = await knex('flight_seats')
        .where({flight_id})
        .select()

        if(!seats){
            return res.status(404).json({message : "Kursi Tidak Ditemukan"})
        }

        res.status(200).json({message: "Kursi", seats})
    }catch(err){
        console.error(err)
        res.status(500).json({message : "Terjadi Kesalahan"})
    }
})

app.get('/check-seats/:flight_id', async (req, res) => {
    let { flight_id } = req.params;

    try {
        // Query untuk mencari jumlah kursi yang sudah dibooking
        let bookedSeats = await knex('flight_seats')
            .where({ flight_id })
            .andWhere({ is_booked: 0 })
            .count('id as booked_seats')
            .first();
        // Query untuk mengambil jumlah total kursi yang tersedia pada penerbangan
        const bookedCount = bookedSeats ? bookedSeats.booked_seats : 0;
        const  totalSeats = 60;

        if (bookedCount === totalSeats) {
            return res.status(200).json({ message : "Penuh", fully_booked:true, bookedCount});
        } else {
            return res.status(201).json({ message : "Masih Sisa", fully_booked:false, bookedCount });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
