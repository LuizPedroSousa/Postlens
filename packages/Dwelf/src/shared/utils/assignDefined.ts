function assignDefined(...sources: any) {
  const result: any = {};
  for (const source of sources) {
    if (source) {
      for (const key of Object.keys(source)) {
        const val = source[key];
        if (val) {
          result[key] = val;
        }
      }
    }
  }

  return result;
}

export { assignDefined };
