app.get("/schedule", async (req, res) => {
  const results = await knex("flights as f")
  .join('cities as c1 ', 'f.city_departure', '=', 'c1.id') //City Departure
  .join('cities as c2 ', 'f.city_arrival', '=', 'c2.id') //City Arrival
  .join('maskapai as m', 'f.id_maskapai', '=', 'm.id') //Name Airline
  .select(
    "f.id",
    'f.id_maskapai',
    'm.nama_maskapai',
    'f.date_departure',
    'f.date_arrival',
    'c1.alias_city as city_from',
    'c2.alias_city as city_to',
    'f.city_departure',
    'f.city_arrival',
    'f.price',
    'f.baggage',
    'f.is_cabin'
  );
  res.json(results);
  // console.log(results);
});



// Post
app.post('/schedule', async (req, res) => {
  let {date_departure, city_departure, city_arrival} = req.body

  const results = await knex('flights').select()
  .where({city_departure, city_arrival})
  .whereRaw('DATE(date_departure) = ?', [date_departure])

  if (results.length > 0){
    res.status(201).json(results)
  }
})


