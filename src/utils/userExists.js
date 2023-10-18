
const User = require('@models/User');

async function userExists(username, email) {
    try {
        const userByUsername = await User.findOne({ where: { username } });
        if (userByUsername) {
            return {
                exists: true,
                message: 'O username ou e-mail já está em uso'
            };
        }

        const userByEmail = await User.findOne({ where: { email } });
        if (userByEmail) {
            return {
                exists: true,
                message: 'O username ou e-mail já está em uso'
            };
        }

        return { exists: false, message: null };
    } catch (error) {
        console.error("ERRO AO VERIFICAR USUÁRIO: ", error);
        return {
            exists: false,
            message: 'Erro ao verificar se username ou e-mail já existem'
        };
    }
};

module.exports = userExists;
