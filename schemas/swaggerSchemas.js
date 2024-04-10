/**
 * @swagger
 * components:
 *   schemas:
 *     UserRegister:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name
 *         email:
 *          type: string
 *          description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 */
