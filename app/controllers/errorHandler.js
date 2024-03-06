module.exports = (err, req, res, next) => {
  const errorStatusCode = res?.errorStatusCode ?? 500;
  console.error(`Error : ${(err?.cause ?? err?.message ?? err?.stack) || err}`);
  res
    .status(errorStatusCode) // 500 Internal Server Error
    .send({
      error: true,
      code: errorStatusCode,
      message: err?.message,
      stack: err?.stack,
      cause: err?.cause,
    });
};
