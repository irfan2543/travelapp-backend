// localhost:3002/cities

// Read Data Cities
app.get("/cities", async (req, res) => {
  const results = await knex("cities").select();
  res.json(results);
});

// Post Data Cities
app.post("/cities", async (req, res) => {
  const data = req.body;

  const results = await knex("cities").insert({
    airport_city: data.airport_city,
    alias_city: data.alias_city,
  });

  res.json(results);
});

// Delete Data Cities
app.delete("/cities/:id", async (req, res) => {
  const primaryKey = req.params.id;

  const results = await knex("cities").where("id", primaryKey).del();
  res.json(results);
});

// Update Data Cities
app.put("/cities/:id", async (req, res) => {
  const primaryKey = req.params.id;
  const data = req.body;

  const results = await knex("cities").where("id", primaryKey).update({
    airport_city: data.airport_city,
    alias_city: data.alias_city,
  });
  res.json(results);
});
