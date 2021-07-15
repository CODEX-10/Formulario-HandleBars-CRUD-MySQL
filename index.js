// APLICAÇÃO DE POSTAGEM
//CRUD: Create-Read-Upgrade-Delete

const express=require('express');
const app = express();
const porta = 8080;
const handlebars = require('express-handlebars');
const Post = require('./models/Post');

//CONFIG. HANDLEBARS
app.engine('handlebars',handlebars({defaultLayout:'main'}));
app.set('view engine','handlebars');

//CONFIG. BODY-PARSER
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// READ - LISTAR POSTAGENS:
app.get('/', function(req,res){
    Post.findAll({order:[['id','DESC']]}).then((posts)=>{
        res.render('home',{posts:posts})
    }).catch((erro)=>{
        console.log("Erro ao listar posts " + erro)
    })
});
// UPDATE - EDITAR E ATUALIZAR:
app.get('/editar/:id',(req,res)=>{
    Post.findAll({where:{id:req.params.id}}).then((postagem)=>{
        res.render('editpost',{postagem:postagem});
    }).catch((erro)=>{
        console.log("Erro ao editar " + erro);
        res.redirect('/');
    })
})

// ATUALIZAR POSTAGENS
app.post('/atualizar', (req,res)=>{
    var newNome = req.body.nome;
    var newData_nascimento = req.body.data_nascimento;
    var newEmail = req.body.email;
    var newTelefone = req.body.telefone;
    var newCep = req.body.cep;

    Post.update(
        {nome: newNome, data_nascimento: newData_nascimento, email: newEmail, telefone: newTelefone, cep: newCep},
        {where: {id:req.body.id}}
    ).then(()=>{
        console.log("Atualizado com sucesso!")
        res.redirect('/')
    }).catch((erro)=>{
        console.log("Erro ao atualizar " + erro)
        res.redirect('/')
    })
})

// DELETAR: DELETAR POSTS DA BASE DE DADOS
app.get('/deletar/:id', (req,res)=>{
    Post.destroy({where: {id:req.params.id}}).then(()=>{
        console.log("Postagem deletada com sucesso!");
        res.redirect('/');
    }).catch((erro)=>{
        res.send("<h1>Erro ao deletar postagem</h1>");
    })
})

// ENTREGA DO FORMULARIO AO CLIENTE:
app.get('/postagem', (req,res)=>{
    res.render('formulario');
})

// ADICIONAR POSTS NO BANCO DE DADOS:
app.post('/add', (req,res)=>{
    Post.create({
        nome: req.body.nome,
        data_nascimento: req.body.data_nascimento,
        email: req.body.email,
        telefone: req.body.telefone,
        cep: req.body.cep
    }).then(()=>{
        res.redirect('/');
    }).catch((erro)=>{            
        console.log(erro);
    });
})

app.listen(porta,()=>{
    console.log("Servidor conctado na porta " + porta)
})