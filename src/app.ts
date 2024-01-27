import express, { Request, Response } from "express";
import { pool } from "./db";
import { QueryConfig } from "pg";
export const app = express();

interface User {
	id: number;
	name: string;
	email?: string; 
}

interface Product {
	product_id: number;
	user_id: number;
	name: string;
	product: string;
}

interface RequestBodyProps {
    user_id: string;
	name: string;
	product: string;
}

app.use(express.json())

app.get("/products", async (req: Request, res: Response) => {
	const response = await pool.query<Product[]>(`SELECT * FROM products;`);
	const projects = response.rows;
	res.json(projects);
});

app.get("/products/:id", async (req: Request<{ id: string }>, res: Response) => {
	const { id } = req.params;

	const query: QueryConfig = {
		text: `SELECT * FROM products WHERE product_id = $1;`,
		values: [id],
	};
	const response = await pool.query<Product>(query);
	const projects = response.rows;
	res.json(projects[0]);
});

app.post(
	"/products/:user_id/products",
	async (req: Request<{ user_id: string }, {}, RequestBodyProps>, res: Response<Product>) => {

		const { user_id } = req.params;
		const { name, product } = req.body;

		const response = await pool.query<Product>(
			`
    INSERT INTO products (user_id, name, product)
    VALUES
    ($1, $2, $3)
    RETURNING *;
    `,
			[user_id, name, product],
		);

		res.json(response.rows[0]);
	},
);
