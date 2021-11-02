const checkOrigin = (
  origin: string | undefined,
  callback: (err: Error | null, origin?: undefined | any) => void
) => {
  if (!origin) return callback(null, true);

  return callback(null, true);
};

export { checkOrigin };
