
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (!bearerHeader) {
        return res.status(403).json({
            message: "O token não foi fornecido"
        });
    }

    const token = bearerHeader.split(' ')[1];

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            console.error("ERRO DE AUTENTICAÇÃO: " + err);
            return res.status(500).json({
                message: "Falha ao autenticar token"
            });
        }

        req.user = decoded;
        next();
    });
};
