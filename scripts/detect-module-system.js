function detectModuleSystem() {
  const isESM = typeof import.meta !== "undefined" && !!import.meta.url
  const isCJS = typeof require !== "undefined"

  return {
    moduleSystem: isESM ? "ESM" : "CJS",
    esm: isESM,
    cjs: isCJS,
    file: isESM ? import.meta.url : __filename,
    dirname: isESM ? new URL(".", import.meta.url).pathname : __dirname,
  }
}

console.log(detectModuleSystem())
