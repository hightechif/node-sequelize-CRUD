const {Article, sequelize} = require('./models/')

let articleBaru;

Article.create({
  title:'Mary Riana',
  body:'Mary Riana menulis buku',
  approved:true
}).then((article) => {
  console.log(article)
  // return {articleBaru = article};
})

console.log(articleBaru);

// Update Cara 1
Article.update({
  title:"Tukang Tahu",
  body:"Tukang Tahu toel toel"
},{
  where:{
    id:2
  }
}).then(() => {
  console.log("Article berhasil diupdate")
  return null;
}).catch(err => {
  console.error(`Error mengupdate article - ${err.message}`)
})

// Update cara 2
sequelize.query(`UPDATE "Articles" SET approved=false where id = 2`)
  .then(() => console.log('sukses'))

// Find All
Article.findAll({
  attributes:['title','body'],
  // where:{
  //   id:3
  // },
  // limit: 2,
  // offset: 3,
  order:[
    ['title', 'desc']
  ]
}).then((articles) => {
  // console.log(articles);
  articles.map(article => {
    const data = {
      id: article.id,
      title: article.title,
      body: article.body,
      approved: article.approved
    }
    console.log(data)
  })
})

// Find One
Article.findOne({
  where:{
    approved:false
  }
}).then((article) => {
  const data = {
    id: article.id,
    title: article.title,
    body: article.body,
    approved: article.approved
  }
  console.log("=======================================")
  console.log(data)
})

// Find by Primary Key
Article.findByPk(3).then((article) => {
  const data = {
    id: article.id,
    title: article.title,
    body: article.body,
    approved: article.approved
  }
  console.log("***************************************")
  console.log(data)
})

// Find and Count All
Article.findAndCountAll().then((articles) => {
  console.log('.......................................')
  console.log(articles)
  articles.rows.map(article => {
    const data = {
      id: article.id,
      title: article.title,
      body: article.body,
      approved: article.approved
    }
    console.log(data)
  })
})

// Delete
Article.destroy({
  where:{
    id:3
  }
}).then(() => console.log("Artikel dihapus"))
