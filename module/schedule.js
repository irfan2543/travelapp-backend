app.get("/schedule", async (req, res) => {
  const results = await knex("flights").select();
  res.json(results);
  // console.log(results);
});

// Post
app.post("/schedule", async (req, res) => {
  const data = req.body

  const results = await knex('flights').insert({
    name: data.name,
    description: data.description,
    price: data.price,
    stock: data.stock,
  })

  res.json(results)
});

