const Product = require('../models/product.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.create = function (req, res) {
    let response = {};
    let product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );

    product.save(function (err) {
        if (err) {
        response.status="404";
        response.message="Failure";           
        response.error=err;
        return res.json(response);
        }
        response.status="200";
        response.message="Success";           
        response.data=product;
        return res.json(response);
    })
};

exports.details = function (req, res) {
    let response = {};
    Product.findById(req.params.id, function (err, product) {
        if (err) { response.status="404";
        response.message="Failure";           
        response.error=err;
        return res.json(response);
    }

    response.status="200";
    response.message="Success";           
    response.data=product;
    return res.json(response);
    })
};

exports.allProducts = function (req, res) {
    let response = {};
    Product.find({},function (err, products) {
        if (err) { response.status="404";
        response.message="Failure";           
        response.error=err;
        return res.json(response);
    }
        response.status="200";
        response.message="Success";           
        response.data=products;
        return res.json(response);
    })
};

exports.update = function (req, res) {
    let response = {};
    Product.findByIdAndUpdate(req.params.id, {$set: req.body},
        { upsert: true, new: true, setDefaultsOnInsert: true }, function (err, product) {
        if (err) { response.status="404";
        response.message="Failure";           
        response.error=err;
        return res.json(response);
    }
        
        response.status="200";
        response.message="Success";           
        response.data=product;
        return res.json(response);
    });
};

exports.delete = function (req, res) {
    let response = {};
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) { response.status="404";
        response.message="Failure";           
        response.error=err;
        return res.json(response);
    }
        response.status="200";
        response.message="Successfully Deleted";           
        return res.json(response);
    })
};