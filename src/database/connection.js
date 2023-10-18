
const mongoose = require('mongoose');

const connectInDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONFIG, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MONGODB CONECTADO COM SUCESSO");
    } catch (error) {
        console.error("ERRO DE CONEXÃO COM O MONGODB", error);
        process.exit(1);
    }
};

module.exports = connectInDatabase;
