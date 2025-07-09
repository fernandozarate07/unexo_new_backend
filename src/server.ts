import app from "./app";
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server Unexo is running on port ${PORT}`);
});
