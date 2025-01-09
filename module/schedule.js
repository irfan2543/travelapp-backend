app.get("/schedule", async (req, res) => {
  const results = await knex("flights").select();
  res.json(results);
  // console.log(results);
});

