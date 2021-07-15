const db = require('./db'); // ./ significa que estão na mesma pasta

// DEFINIÇÃO DO MODEL
const Post = db.sequelize.define('postagens',{
    nome:{
        type: db.Sequelize.STRING
    },
    data_nascimento:{
        type: db.Sequelize.DATE
    },
    email:{
        type: db.Sequelize.STRING
    },
    telefone:{
        type: db.Sequelize.INTEGER
    },
    cep:{
        type: db.Sequelize.INTEGER
    }
    
});

//Post.sync({force:true}); // COMENTAR APÓS EXECUTAR PELA PRIMEIRA VEZ
// EXECUTAR APENAS UMA VEZ 

// EXPORTAR MODELS PARA OUTROS ARQUIVOS USAREM
module.exports = Post;
