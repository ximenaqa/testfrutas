// importar express bodyparser
const express = require('express');
const bodyParser = require('body-parser');
//inicializa
const app =express();

app.use(bodyParser.json());

//ruta de ejemplo
// app.get('/', (req, res) =>{
//     res.send("hola con nodejs");
// });
let items = ['manzana','papaya','limon', 'melon', 'uva', 'chirimoya', 'durazno'];
app.get('/', (req, res) =>{
    res.send("hola con nodejs");
});
//endpoint 1 / rutas GET
app.get('/items', (req, res) =>{
    res.status(200).json(items);
});
//endpoint 2 / rutas POST
app.post('/items', (req, res) =>{
    const fruta = req.body; 
    // console.log("fruta", fruta)
    if (fruta) {
        items.push(fruta.item);
        // res.status(200).send(`Se agrego la fruta: ${fruta.item}`);
        res.status(200).send(`Se agrego la fruta: ${fruta.item} \n Lista: ${JSON.stringify(items)}`);
    } else {
        res.status(400).send("este item es invalido");
    }
});
//endpoint 3 / rutas PUT
app.put('/items/:index', (req, res) =>{
    const index = req.params['index'];
    const fruta = req.body; 
    if (fruta) {
        const item = items[index];
        const itemPut = item;
        items[index] = fruta.item;
        res.status(200).send(`Se actualizo la fruta: ${itemPut}, item [${index}] por ${fruta.item}
        \n Lista: ${JSON.stringify(items)}`);
    } else {
        res.status(400).send("este item es invalido");
    }
});
//endpoint 4 / rutas DELETE
app.delete('/items/:index', (req, res) =>{
    // console.log(req.params['index']);
    const index = req.params['index'];
    const name = items[index];
    if (name) {
        items.splice(index, 1);
        res.status(200).send(`Se eliminó la fruta: ${name} \n Lista: ${JSON.stringify(items)}`);
    } else {
        res.send('Elemento no encontrado');
    }
});
//escuchar en el puerto 30000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Servidor en funcionando en puerto: ${PORT}`) });