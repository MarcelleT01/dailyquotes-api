const express=require('express');
require ('express')
const app=express();
const port=3000;

app.use(express.json());

let quotes=[
    {id:1, text:"La vie est belle."},
    {id:2, text:"Crois en toi. "},
    {id:3, text:"Sois optimiste."}
];
//GET toutes les citations
app.get('/quotes',(req,res)=>{
    res.json(quotes);
});

//POST ajouter une nouvelle citation
app.post('/quotes',(req,res)=>{
    const{text}=req.body;
    if(!text)
        return res.status(400).json({error:"Le texte de la citation est requis."});
    const newQuote={id:quotes.length+1,text};
    quotes.push(newQuote);
    res.status(201).json(newQuote);
});

app.listen(port,()=>{
    console.log(`API DailyQuotes en ecoute sur http://localhost: ${port}`);

});