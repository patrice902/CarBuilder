const config = {
  env: process.env.NODE_ENV,
  localEnv: Boolean(process.env.REACT_APP_LOCAL_ENV),
  configCatKey: process.env.REACT_APP_CONFIGCAT_KEY,
  assetsURL:
    process.env.REACT_APP_ASSET_URL ||
    (process.env.NODE_ENV !== "development"
      ? "/assets"
      : "http://localhost:3000/assets"),
  legacyAssetURL: "https://paintbuilder-assets.tradingpaints.gg/legacy",
  parentAppURL: process.env.REACT_APP_PARENT_APP_URL,
  backendURL:
    process.env.NODE_ENV !== "development" ? "/" : "http://localhost:3000",
  apiURL:
    process.env.NODE_ENV !== "development"
      ? "/api"
      : "http://localhost:3000/api",
  cryptoKey: process.env.REACT_APP_CRYPTO_HASHING_KEY || "SECRET_KEY",
};

export default config;
