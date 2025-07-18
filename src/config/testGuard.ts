if (process.env.NODE_ENV === "production") {
  console.error("No podés correr tests en producción.");
  process.exit(1); //  Mata el proceso para evitar cualquier test
}
