import {pool} from "../db.js";
/**
 * Handler para obtener empleados.
 * @param {import('express').Request} req Objeto de solicitud HTTP
 * @param {import('express').Response} res Objeto de respuesta HTTP
 * @param {import('express').NextFunction} next Función para pasar al siguiente middleware
 */
export const Employees = async (req, res, next) => {
    let result = [];
    switch (req.method) {
        case 'GET':
            if (req.params.id) {
                const id = req.params.id;
                [result] = await pool.query('SELECT * FROM employees WHERE id = ?', [id]);
                if (result.length === 0) {
                    return res.status(404).json({ message: 'Employee not found' });
                }
                return res.json(result[0]);
            } else {
                [result] = await pool.query('SELECT * FROM employees');
                return res.json(result);
            }
        case 'POST':
            console.log(req.body);
            const {name, salary} = req.body;
            [result] = await pool.query('INSERT INTO employees (name, salary) VALUES (?, ?)', [name, salary]);
            res.json(result);
            break;
        case 'PUT':
            if(req.params.id) {
                const {name, salary} = req.body;
                [result] = await pool.query('UPDATE employees SET name = ?, salary = ? WHERE id = ?', [name, salary, req.params.id]);
                if(result.affectedRows > 0) {
                    return res.json({ message: 'Employee updated' });
                } else {
                    result.message = 'Employee not found';
                    return res.json(result);
                }
            }
            break;
        case 'DELETE':
            if(req.params.id) {
                [result] = await pool.query('DELETE FROM employees WHERE id = ?', [req.params.id]);
                if( result.affectedRows > 0) {
                    return res.json({ message: 'Employee deleted' });
                } else {
                    result.message = 'Employee not found';
                    return res.json(result);
                }
            } else {
                return res.status(400).json({ message: 'Bad request' });
            }
    }
    next();
}