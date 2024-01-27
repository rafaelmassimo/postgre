import { Client, ClientConfig, Pool, PoolConfig } from "pg";

const poolConfig: PoolConfig = {
	host: "localhost",
	database: "products",
	port: 5432,
	user: "rafael_massimo",
};
export const pool = new Pool(poolConfig);

const clientConfig: ClientConfig = {
	host: "localhost",
	port: 5432,
	database: "products",
	user: "rafael_massimo",
};

export const client = new Client(clientConfig);

client
	.connect()
	.then(() => {
		console.log("Connected with db successfully");
	})
	.catch(() => {
		console.log("Something went wrong while connecting database with pg client");
	});