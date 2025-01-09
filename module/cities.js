app.get("/cities", async (req, res) => {
    const results = await knex("cities").select();
    res.json(results);
  });