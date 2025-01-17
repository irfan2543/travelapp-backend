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

app.put('/schedule/:id', async (req, res) => {
  const primaryKey = req.params.id; // Ambil ID dari parameter URL
  const data = req.body; // Ambil data dari body request

  try {
      const updt = await knex('flights')
          .where("id", primaryKey) // Cari berdasarkan primary key
          .update({
              id_maskapai: data.id_maskapai,
              date_departure: data.date_departure,
              date_arrival: data.date_arrival,
              city_departure: data.city_departure,
              city_arrival: data.city_arrival,
              price: data.price,
              baggage: data.baggage,
              is_cabin: data.is_cabin
          });

      if (updt) {
          res.status(200).json({ message: "Jadwal berhasil diperbarui", affectedRows: updt });
      } else {
          res.status(404).json({ message: "Jadwal tidak ditemukan" });
      }
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
});


// Post
app.post('/schedule', async (req, res) => {
  let {date_departure, city_departure, city_arrival} = req.body

  if (!date_departure) {
    return res.status(400).json({ message: "Tanggal keberangkatan tidak boleh kosong!" });
  }
  const results = await knex('flights').select()
  .where({city_departure, city_arrival})
  .whereRaw('DATE(date_departure) = ?', [date_departure])

  if (results.length > 0){  
    res.status(201).json(results)
  }else{
    res.status(400).json({ message: "Tidak Ada Tanggal!" });
  }
})


// app.delete('/schedule', async (req, res) => {
//   const { id } = req.body;
//   console.log('ID yang diterima:', id);
//   try{
    
//     let deleteSeats = await knex('flight_seats')
//     .where({flight_id : id}).del()

//     let deleteFlight = await knex('flights')
//     .where({id}).del()

//     if(deleteFlight){
//       res.status(200).json({message : "Penerbangan Berhasil Di Hapus!"})
//     }else{
//       res.status(404).json({message : "Penerbangan Tidak Ditemukan"})
//     }

//   }catch(err){
//     console.error(err)
//     res.status(500).json({message : "Data Error!"})
//   }
// })

