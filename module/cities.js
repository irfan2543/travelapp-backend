// localhost:3002/cities
app.get("/cities", async (req, res) => {
    const results = await knex("cities").select();
    res.json(results);
  });