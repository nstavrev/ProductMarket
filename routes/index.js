var express = require('express');
var router = express.Router();
var fs = require("fs");
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/productMarket", {native_parser:true});
var ObjectID = mongo.ObjectID;

var Deferred = require('Deferred');

var randomString = function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

var longRandomString = function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 100; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

function insertCategories() {
    var def = Deferred();
    var categories = [];

    for(var i=0; i<10; i++){

        var category = {
            name : "Category " + (i+1)
        }
        var subCategories = [];
        for(var j=0; j<10; j++){

            subCategories.push({
                name : "SUB "+ randomString()
            });
        }
        categories.push({
            name : "Category " + (i+1),
            subCategories : subCategories
        });

    }

    db.collection('categories').insert(categories, function(err,result){
        def.resolve(result);
    });

    return def.promise();
};

function insertProducts(categories){
    var def = Deferred();

    var products = [];
    for (var i = 0; i < 10000; i++) {
        var parentCategoryIndex = parseInt(Math.random() * 9 + 1);
        var categoryIndex = parseInt(Math.random() * 9 + 1);
        var product = {
            name: randomString(),
            category : {
                name : categories[parentCategoryIndex].subCategories[categoryIndex].name,
                parentCategory : categories[parentCategoryIndex].name
            },
            price: parseInt(Math.random() * 100 + 700),
            description: randomString(),
            longDescription : {
                title : longRandomString(),
                features : ['r' + randomString() , 'r' + randomString(), 'r' + randomString(), 'r' + randomString()]
            },
            info : randomString() + randomString() + randomString(),
            image: [
                {
                    url: "http://placehold.it/270x300"
                },
                {
                    url: "http://placehold.it/270x300"
                },
                {
                    url: "http://placehold.it/270x300"
                },
                {
                    url: "http://placehold.it/270x300"
                }
            ],
            reviews: 13,
            stars: [1, 2, 3]
        };
        if(i == 1003 || i==2033 || i == 5555 || i==9981) {
            product.top = true;
        }
        products.push(product);
    }
    db.collection('products').insert(products, function(err, result){
        console.log(err);
        def.resolve(result);
    });
    return def.promise();
};

/*
insertCategories().done(function(categories){
    console.log("Inserted categories " + categories.length);
    insertProducts(categories).done(function(result){
        console.log("inserted products " + result.length);
    });
});
*/

function findProducts(category, subCategory) {
    /*db.collection('categories').aggregate([
        {
            "$match" : {
                "subCategories" : {
                    "$elemMatch" : {
                        "name" : "SUB cGu0l"
                    }
                }
            }
        }
    ], function(err, result) {
        console.log(result);
    });*/
    var def = Deferred();
    var query = {
        "category.parentCategory" : category
    }
    if(subCategory) {
        query['category.name'] = subCategory
    }
    db.collection('products').find(query).toArray(function(err,products){
        db.collection('categories').find({ name : category }).toArray(function(err, category){
            def.resolve({ products : products, subCategories : category[0].subCategories });
        });
    });
    return def.promise();
};

function findHomeProducts(){
  var def = Deferred();
  db.collection('products').find().toArray(function(err,products){
     def.resolve(products);
  });
  return def.promise();
};

function findMainCategories() {
	var def = Deferred();
	db.collection('categories').find().toArray(function(err,categories){
	console.log(categories);
		def.resolve(categories);
	});
	return def.promise();
};

function findProductById(id) {
    var def = Deferred();
    try {
        var id = new ObjectID(id);
        db.collection('products').findOne({ _id : new ObjectID(id) }, function(err,product){
            def.resolve(product);
        });
    }catch(e){
        console.log("error");
        def.resolve(undefined);
    }
    return def.promise();
};

/*GET error 404 page */
router.get('/404', function(req,res){
   res.render("404.ejs");
});

/* GET home page. */
router.get('/', function(req, res) {
    findMainCategories().done(function(categories){
		res.render('index.ejs', {categories : categories});
	});
});

router.get('/home', function(req,res){
   res.render('home.ejs');
});

router.get('/home/products', function(req, res){
    var category = req.param('category');
    var subCategory = req.param('subCategory');

    console.log(category);
    if(category){
        findProducts(category,subCategory).done(function(result){
            res.send({shoppingcart : req.session.shoppingcart, products : result.products, categories: result.subCategories});
        });
    } else {
        findHomeProducts().done(function(products){
            res.send({shoppingcart : req.session.shoppingcart, products : products})
        });
    }
});

router.get('/top', function(req,res){
   db.collection('products').find({top : true}).toArray(function(err,products){
       var slides = [];
       products.forEach(function(product,index){
           slides.push({
               image: '/images/watch-sample.jpg',
               text: [product.name][slides.length % 1],
               title : "Only today for 15 $"
           });
       });

       res.send(slides);

   });
});

router.get('/latestProducts', function(req,res){
	db.collection('products').find().limit(30).toArray(function(err,products){
		var slides = [];
        var remainder = products.length%5;

        for(var i=0; i < products.length - remainder; i+= 5) {
            var productSlide = [];
            for(var j=i; j < i + 5; j++){
                productSlide.push(products[j])
            }
            slides.push(productSlide);
        }

        if(remainder != 0){
            var start = products.length - remainder;
            var lastSlide = [];
            for(var k=start; k < products.length; k++){
                lastSlide.push(products[k]);
            }

            slides.push(lastSlide);
        }

        res.send(slides);
	});
});

router.get('/sign', function(req,res){
   res.render("login.ejs");
});

router.get('/shoppingcart',function(req,res){
    res.render("shoppingcart.ejs");
});

router.get('/get/shoppingcart', function(req,res){
   res.send(req.session.shoppingcart);
});

router.post('/buy', function(req,res){
    var product = req.body;
    if(!req.session.shoppingcart){
        req.session.shoppingcart = {};
        req.session.shoppingcart.items = {};
    }

    if(!req.session.shoppingcart.items[product._id]){
        product.qty = 1;
        req.session.shoppingcart.items[product._id] = product;
    } else {
        req.session.shoppingcart.items[product._id].qty++;
    }

    res.send(req.session.shoppingcart);
});

router.post('/deleteProduct', function(req,res){
    if(req.session.shoppingcart) {
        var productId = req.body.id;
        delete req.session.shoppingcart.items[productId];
        if(Object.keys(req.session.shoppingcart.items).length == 0){
            delete req.session.shoppingcart;
        }
        req.session.save();
    }
    res.send(req.session.shoppingcart);
});

router.get('/product', function(req,res){
   res.render("product.ejs");
});

router.get('/get/product/:id', function(req,res){
    findProductById(req.param('id')).done(function(product){
       res.send(product);
    });
});


module.exports = router;
