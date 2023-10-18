
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('@models/User');

const userExists = require('@utils/userExists');

const SECRET_KEY = process.env.SECRET_KEY;

//Endpoint de Registro
/* Talvez seja desnecessário já que serão apenas os admins */
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Preencha todos os campos"
            });
        }

        const checkExists = await userExists(username, email);
        if (checkExists.exists) {
            return res.status(400).json({
                message: checkExists.message
            });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = await User.create({
            username,
            email,
            password: passwordHash,
        });

        res.status(201).json({
            message: "Sua conta foi criada", user
        });
    } catch (error) {
        console.error("ERRO AO REGISTRAR USUÁRIO:", error);
        res.status(400).json({
            message: "Erro ao registrar usuário"
        });
    }
};

//Endpoint de Login
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({
            username: username
        });

        console.log("Usuário encontrado:", user);

        if (!user) {
            return res.status(400).json({
                message: "E-mail ou senha incorretos"
            });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                message: "E-mail ou senha incorretos"
            });
        }

        const token = jwt.sign({
            uuid: user.uuid,
            username: user.username
        }, SECRET_KEY, {
            expiresIn: '5h'
        });

        res.json({ 
            message: "Você está autenticado", 
            token 
        });
    } catch (error) {
        console.error("ERRO AO LOGAR ", error);
        res.status(400).json({
            message: "Erro ao realizar login"
        });
    }
};
