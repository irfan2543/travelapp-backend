
app.post('/flights', async(req, res) => {

    const data = req.body
    res.json(data)
        const results = await knex('flights').insert({
            id_maskapai : data.id_maskapai,
            date_departure : data.date_departure,
            date_arrival : data.date_arrival,
            city_departure :data.city_departure,
            city_arrival : data.city_arrival,
            price : data.price,
            baggage : data.baggage,
            is_cabin : data.is_cabin
        })

        const seats = []
        const rowSeats = 'ABCDEFGHIJ'
        const columnSeats = 6;

        for(let i =0; i < rowSeats.length; i++){
            for(let j =0; j < columnSeats; j++){
                const seatNumber = `${rowSeats[i]}${j}`
                seats.push({
                    flight_id : data.id_maskapai,
                    number_seat : seatNumber,
                    is_booked : 1
                })
            }
        }
        await knex('flight_seats').insert(seats)
})

app.get('/flights', async (req, res) => {
    const results = await knex('flights').select()

    res.json(results)
})