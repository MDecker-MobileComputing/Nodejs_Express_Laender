
export const istNichtProduktiv = (process.env.NODE_ENV !== "production");

export const modusName = istNichtProduktiv ? "Entwicklung/Test" : "Produktiv";

