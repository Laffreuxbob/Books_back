const express = require('express'); // NodeJS Server Framework
const conf = require('./conf/server_config'); // x.x.x.x:XYZ
const moment = require('moment')
const mongo = require('./database/database') // BDD mongo

const server = express();

const bodyPost = require('body-parser'); // Necessaire a la lecture des data dans le body de la requete (post)
server.use(bodyPost.json()); // support json encoded bodies
server.use(bodyPost.urlencoded({ extended: false })); // support encoded bodies


server.use((req, res, next) => {
    res.header('Content-Type', 'application/json');
    next();
})

// Facon presque propre d'eviter le probleme de header CORS
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
server.use(allowCrossDomain);


server.get('/book', (req, res) => {
    console.log('GET ALL');
    mongo.db.collection('book').find({}).toArray()
        .then(books => {
            if (!books) {
                res.status(200)
                return res.send([]) // return empty array
            }
            res.status(200)
            console.log(books)
            res.send(books || [])
        })
        .catch(err => console.log('An error occurred getting mongo todo list', err))
})

server.get('/book/:id', (req, res) => {
    console.log("GET ONE")
    const search_id = req.params.id;
    console.log(search_id)
    mongo.db.collection('book').find({}).toArray()
        .then(books => {
            let book = books.find(element => {
                console.log(mongo.ObjectId(search_id))
                return((parseInt(element._id)).equals(mongo.ObjectId(search_id)));
            });
            res.status(200);
            console.log('Resultat de la cherche avec l\'id : ' + search_id)
            console.log(todoToDisplay_ById || 'Aucun resultat pour cette recherche');
            console.log('------------------------')
            res.send(book); // pas besoin de end() avec send() et stringify transforme ton json en string
        })
        .catch(err => console.log('An error occured searching todo with id', err));
});

// Methode GET pour recuperer un element par recherche de mot cle
// curl http://127.0.0.1:8080/todosSearch/Linux
server.get('/book/:author', (req, res) => {
    const NAME_todoToSearch = req.params.name; /* on recupere l'id' de recherche*/
    mongo.db.collection('book').find({}).toArray()
        .then(books => {
            let todoToDisplay_ByName = books.find(element => {
                return(element.name === NAME_todoToSearch);
            });
            res.status(200);
            console.log('Resultat de la cherche avec le mot : ' + NAME_todoToSearch)
            console.log(todoToDisplay_ByName || 'Aucun resultat pour cette recherche');
            console.log('------------------------')
            res.send(todoToDisplay_ByName); // pas besoin de end() avec send()
        })
        .catch(err => console.log('An error occurred searching todo with name', err));
});

// Methode DELETE pour supprimer un element de la liste avec une id
// curl -X DELETE  http://127.0.0.1:8080/delete/2
server.delete('/book', (req, res) => {
    console.log("DELETE")

    const test_id = req.body;
    mongo.db.collection('book').findOne({ _id: mongo.ObjectId(test_id.id_to_delete) })
        .then( book => {
                console.log('------------------')
                console.log(book);
                console.log('------------------')
            }
        )


    const item_to_delete = (req.body.id_to_delete);
    console.log(item_to_delete)
    mongo.db.collection('book').findOne({ _id: mongo.ObjectId(item_to_delete) })
        .then(book => {
            console.log('------------------')
            console.log(book);
            console.log('------------------')
            if (!book) {
                console.log("Warning, nothing to delete!");
                res.status(403).end();
                return book;
            }
            let itemToDelete = book;
            mongo.db.collection('book').deleteOne(itemToDelete);
            console.log('Todo successfully deleted from mongo database.');
            res.status(200);
            return res.end();
        })
});


// Methode d'edition et de mise a jour d'une tache (on utilise le // pour garder la valeur actuelle)
// curl -X PUT -H "Content-Type: application/json" -d '{"name":"editedName","date":"editedDate"}' "http://localhost:8080/todos/2"
// curl -X PUT -H "Content-Type: application/json" -d '{"done":"true"}' "http://localhost:8080/todos/1"

server.put('/book/:id', (req, res) => {
    let idTodoToEdit = mongo.ObjectId(req.params.id);
    return mongo.db.collection('todos').findOne({_id: idTodoToEdit})
        .then(result => {
            if (!result) {
                console.log("Warning, task to edit not found !");
                res.status(403).end();
                return result;
            }
            let datas = req.body;
            /* attribution des nouvelles key_value editees */
            let editedName = datas.name || result.name;
            let editedDate = datas.date || result.date;
            let editedDescription = datas.description || result.description;
            let editedDone = (datas.done || datas.done === false) ? datas.done : result.done;

            console.log(editedName, editedDone)

            return mongo.db.collection('book').updateOne(

                {_id: idTodoToEdit},
                {
                    $set: {"name": editedName, "date": editedDate, "description": editedDescription, "done": editedDone}
                }
            )
        })
        .then(() => { return  mongo.db.collection('todos').findOne({_id: idTodoToEdit} ) })
        .then( updated => { console.log(" UP :", updated) ; res.send(updated)})

        .catch(err => {
            console.log('An error occured editing todo in mongo.', err)
        })
});




// curl -X POST -H "Content-Type: application/json" -d '{"name":"NouveauProjet", "date":"25-09-2019", "description":"Projet test delai"}' http://localhost:1398/book

server.post('/book',  (req, res) => {
    console.log('POST')
    const data = req.body    // recuperation des donnees dans le body de la requete
    // attribution des nouvelles key_value
    // let newName = data.name || "default_name";
    // let newDate = data.date || "11-09-2020";
    // let newDescription = data.description || "default_description";
    // let newPriority = data.priority || "default_priority";
    console.log(data)
    // creation du nouvel objet tache
    // let newItem = {
    //     "name":newName,
    //     "date":newDate,
    //     "ajout": moment().format('DD-MM-YYYY'),
    //     "description":newDescription,
    //     "priority": newPriority,
    //     "done": false
    // };
    mongo.db.collection('book').findOne({name: 'newItem.name'})
        .then(result => {
            if (result) {
                console.log("Warning,", 'newItem.name', " already exists!");
                res.status(403).end();
                return result;
            }
            mongo.db.collection('book').insertOne(data);
            console.log('Todo successfully added to mongo database.');
            res.status(200);
            return res.send(JSON.stringify(data));
        })
        .catch(err => {
            console.log('An error occured inserting todo in mongo.', err)
        })
});





mongo.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to mongodb, we can now use mongo.db object.')
        server.listen(conf.port, conf.hostname, (err) => {
            if(err){
                return console.log("Error:", err)
            }
            console.log('Server running at http://' + conf.hostname + ':' + conf.port + '/');
            console.log('today : ' + moment().format('DD-MM-YYYY hh:mm'))
        })

    })