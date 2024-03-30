export const config = {
  HOST: "monorail.proxy.rlwy.net",
  USER: "root",
  PASSWORD: "DmNMTNIRiLwQlnHwtNoWcazxXnTdlKTL",
  DB: "fut-control-dev",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

export const dialect = "mysql";
