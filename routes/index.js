var express = require('express');
var router = express.Router();
var fs = require("fs");
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/productMarket", {native_parser:true});
var ObjectID = mongo.ObjectID;

var Deferred = require('Deferred');

var labels = {
    en : {
        signup : "Sign Up",
        signin : "Sign In",
        forgotpassword : "Forgot Password?",
        username : "Username",
        password : "Password",
        donthaveaccount : "Don't have an account?",
        signuphere : "Sign Up Here",
        firstname : "First Name",
        lastname : "Last Name",
        email : "E-mail",
        search : "Search",
        buy : "Buy",
        description : "Description",
        productinfo : "Product Info",
        reviews : "Reviews",
        instock : "In Stock",
        product  : "Product",
        price : "Price",
        quantity : "Quantity",
        subtotal : "Subtotal",
        checkout : "Checkout",
        continueshopping : "Continue Shopping",
        emptycart : "Your shopping cart is empty",
        newsletter : "NEWSLETTER",
        close : "Close",
        view : "Quick View"
    },
    bg : {
        signup : "Регистрация",
        signin : "Вход",
        forgotpassword : "Забравена парола?",
        username : "Потребителско име",
        password : "Парола",
        donthaveaccount : "Нямате регистрация?",
        signuphere : "Регистрирай се тук",
        firstname : "Име",
        lastname : "Фамилия",
        email : "E-mail",
        search : "Търсене",
        buy : "Купи",
        description : "Описание",
        productinfo : "Информация за продукта",
        reviews : "Преглеждания",
        instock : "В наличност",
        product : "Продукт",
        price : "Цена",
        quantity : "Количество",
        subtotal : "Обща цена",
        checkout : "Поръчай",
        continueshopping : "Продължи с пазаруването",
        emptycart : "Вашата количка е празна",
        newsletter : "БЮЛЕТИН",
        close : "Затвори",
        view : "Преглед"
    }
}


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
  db.collection('products').find().limit(300).toArray(function(err,products){
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

function saveOrder(order) {
    var def = Deferred();
    db.collection('orders').insert(order, function(err,result){
       if(err) throw err;
       def.resolve("Thank you very much.Your order has been saved successfully.");
    });
    return def.promise();
};

function autoComplete(term) {
    var def = Deferred();

    db.collection('products').find({ name : new RegExp(term, 'i')}).limit(5).toArray(function(err, products){
       if(err) throw err;
       def.resolve(products);
    });

    return def.promise();
};

function authenticate(userData) {
  var def = Deferred();

  db.collection('users').findOne({ username : userData.username, password : userData.password }, function(err, user){
    if(err) throw err;
    def.resolve(user);
  });

  return def.promise();
};

function register(user) {
    var def = Deferred();

    db.collection('users').insert(user, function(err, result){
       if(err) throw err;
       def.resolve(result[0]);
    });

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

router.get('/labels', function(req,res){
   res.send(labels);
});
router.get('/autocomplete', function(req,res){

    autoComplete(req.param('term')).done(function(products){
        var items = [];
        products.forEach(function(product, index){
            res.render('smallProduct.ejs',{product : product }, function(err,html){
                //items.push(html);
                items.push({
                    label : html,
                    value : req.param("term"),
                    url : "#/product/" + product._id
                })
            });
        });
        res.send(items);
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

router.get('/login', function(req,res){
   res.render("login.ejs");
});

router.post('/login', function(req,res){
    var userData = req.body;
    authenticate(userData).done(function(user){
       if(user != undefined) {
           delete userData.password;
           req.session.loggedIn = user;
           req.session.save();
           res.send(user);
       } else {
           res.status(400).send("Invalid credetials !");
       }
    });
});

router.post('/logout', function(req,res){
   delete req.session.loggedIn;
   req.session.save();
   res.send("loggedout");
});

router.get('/register', function(req,res){
   res.render('register.ejs');
});

router.post('/register', function(req,res){
   var user = req.body;
   register(user).done(function(user){
      delete user.password;
      req.session.loggedIn = user;
      req.session.save();
      res.send(user);
   });
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

router.post('/updateCart', function(req,res){
   var newCart = req.body;
   req.session.shoppingcart = newCart;
   req.session.save();
   res.send(req.session.shoppingcart);
});

router.get('/isAnonymous', function(req,res){
   res.send(req.session.loggedIn == undefined);
});

router.get('/profile/details', function(req, res) {
    if(req.session.loggedIn != undefined) {
        res.send(req.session.loggedIn);
    } else {
        res.status(400).send(undefined);
    }
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

router.get('/checkout', function(req,res){

    if(req.session.shoppingcart != undefined){
        res.render("checkout.ejs");
    } else {
        res.render("shoppingcart.ejs");
    }
});

router.post('/checkout', function(req,res){
    if(req.session.loggedIn != undefined) {
        var order = {};
        order.shoppingcart = req.session.shoppingcart;
        order.user = req.session.loggedIn;
        saveOrder(order).done(function(data){
            delete req.session.shoppingcart;
            req.session.save();
            res.send(data);
        });
    } else {
        var userData = req.body;
        var order = {};
        order.shoppingcart = req.session.shoppingcart;
        order.user = userData;
        saveOrder(order).done(function(data){
           delete req.session.shoppingcart;
           req.session.save();
           res.send(data);
        });
    }

});

router.get('/profile', function(req,res){
   res.render("profile.ejs");
});

router.get('/quickViewProduct', function(req, res){
    res.render('quickViewProduct.ejs')
})
module.exports = router;
