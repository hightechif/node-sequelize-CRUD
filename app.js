const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const app = express();
const {Article} = require('./models');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.status(300).redirect('/articles');
})

// Halaman form Create Article
app.get('/articles/create', (req, res) => {
  res.render('create');
})

// Get all Articles
app.get('/articles', (req, res) => {
  Article.findAll()
  .then(articles => {
    res.status(200).render('index', {articles});
    // res.status(200).json(articles)
  })
  .catch(err => {
    res.status(400).json({
      message: err.message
    })
  })
})

// Create
app.post('/articles', (req, res) => {
  console.log(req.body);
  const {title, body, approved} = req.body;
  Article.create({
    title,
    body,
    approved
  }).then((article) => {
    console.log(article)
    // res.status(201).json(article);
    res.redirect('/articles')
  }).catch(err => {
    res.status(400).json("Can't create article")
  })
})

// Get Aricle by Id
app.get('/articles/:id', (req, res) => {
  Article.findByPk(req.params.id)
  .then(article => {
    if(article) {
      // res.status(204).json(article)
      res.status(200).render('show', {
        title:article.title,
        body: article.body
      });
    } else {
      res.status(400).json({
        message: "ID Article is Not Found"
      })  
    }
  })
  .catch(err => {
    res.status(400).json({
      message: err.message
    })
  })
})

app.get('/articles/update/:id', (req, res) => {
  Article.findByPk(req.params.id)
  .then(article => {
    if(article) {
      // res.status(204).json(article)
      res.status(200).render('update', {article});
    } else {
      res.status(400).json({
        message: "ID Article is Not Found"
      })  
    }
  })
  .catch(err => {
    res.status(400).json({
      message: err.message
    })
  })
})

// Update
app.put('/articles/:id', (req, res) => {
  const {title, body, approved} = req.body;
  Article.update(req.body, {
    where:{
      id:req.params.id
    }
  }).then((article) => {
    // res.status(201).json(article);
    res.redirect('/articles')
  }).catch(err => {
    res.status(400).json(`Can't update article - ${err.message}`)
  })
})

// Update
app.put('/articles/update/:id', (req, res) => {
  const {title, body, approved} = req.body;
  Article.update(req.body, {
    where:{
      id:req.params.id
    }
  }).then((article) => {
    // res.status(201).json(article);
    res.redirect('/articles')
  }).catch(err => {
    res.status(400).json(`Can't update article - ${err.message}`)
  })
})

// Delete
app.delete('/articles/:id', (req, res) => {
  index = req.params.id;
  console.log(index);
  console.log('Hello Wolrd')
  Article.destroy({
    where:{
      id:req.params.id
    }
  }).then((Article) => {  
    // res.status(201).json(article);
    res.redirect('/articles')
  }).catch(err => {
    res.status(400).json(`Can't delete article - ${err.message}`)
  })
})

module.exports = app;
