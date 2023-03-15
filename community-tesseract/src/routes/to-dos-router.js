import express from "express";
import { getDB } from "../db/index.js";
import { validator } from "../middlewares/validators.js";

export const TodosRouter = express.Router();


//CRUD
TodosRouter.get("/to-dos", async function(request, response) {
    try {
        const db = await getDB();

        const todos = await db.all("SELECT * FROM todos");

        response.send({ todos });

        await db.close();

    } catch (error) {
        response.status(500).send({
            message: "Something went wrong tryng to get to dos", 
            error,
        })
    }
});


TodosRouter.post("/to-do", validator, async function(request, response) {
    try {
        const { title, description } = request.body;
        
        const db = await getDB();

        const queryInfo = await db.run(`
            INSERT INTO todos (title, description)
            VALUES (
                '${title}',
                '${description}'
            )
        `);
                await db.close()

                response.send({ newTodo : {title, description}, queryInfo})
    } catch (error) {
        response.status(500).send({
            message: "Something went wrong tryng to create a to do", 
            error,
        })
    }
});


TodosRouter.delete("/to-do/:id", async function(request, response) {
    try {
        const id = request.params.id;

        const db = await getDB();

        const todoExists = await db.get(`
            SELECT * FROM todos WHERE id = ?`, 
            id
        );

        if (!todoExists) {
            return response
            .status(404)
            .send({ message: "To Do not found "});
        }

        const deletionInfo = await db.run(`
            DELETE FROM todos WHERE id = ?`, 
            id
        )

        await db.close();

        response.send({ deletionInfo })

    } catch (error) {
        response.status(500).send({
            message: "Something went wrong tryng to delete a to do", 
            error,
        })
    }
});


TodosRouter.patch("/to-do/:id", async function(request, response) {
    try {
        // const id = request.params.id; -- Normal way
        //Desestructurado:
        const { id } = request.params;
        const db = await getDB();

        const todoExists = await db.get(`
            SELECT * FROM todos WHERE id = ?`, 
            id
        );

        if (!todoExists) {
            return response
            .status(404)
            .send({ message: "To Do not found "});
        }

        const {title, description, isDone: is_done} = request.body;

        await db.run(`UPDATE todos 
            SET TITLE = ?,  description = ?, is_done = ?
            WHERE id = ?`
            , 
            title || todoExists.title, 
            description || todoExists.description, 
            is_done !== undefined ? is_done : todoExists.is_done, 
            id
        );

        await db.close();

        response.send({ message: "To Do an update" })

    } catch (error) {
        response.status(500).send({
            message: "Something went wrong trying to update a to do", 
            error,
        })
    }
});

