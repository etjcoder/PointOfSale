//These will include the routes I think to implement the API calls

var db = require("../models");

module.exports = function (app) {

    app.get("/menu", function (req, res) {

        db.Fooditem.findAll({}
            ).then(function (data) {
            var itemArray = [];
            for(i = 0; i < data.length; i++){
                (itemArray).push(data[i].dataValues);
            }
            
            //Made Changes to this code, before it was burgers: data and then the keywords in the html had dataValues.burger_name and such
            var hbsObject = {
                items: itemArray
            };
            res.render("index", hbsObject);
        })
    })


    app.get("/api/menu", function (req, res) {

        db.Fooditem.findAll({
        }).then(function (dbMenu) {
            res.json(dbMenu);
        })
    })

    app.get("/api/menu/order/:id", function(req, res){
        console.log("Searching database for food item...")
        db.Fooditem.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(response){
            res.json(response.dataValues);
            // console.log(response.dataValues);
        })
    })


    app.post("/api/menu", function (req, res) {

        db.Fooditem.create(req.body).then(function (dbMenu) {
            res.json(dbMenu);
        })

    })


    app.put("/api/menu/order/:id", function (req, res) {
        
        
        db.Fooditem.update(
            req.body,
            { where: 
                { id: req.params.id }
            }).then(function (dbMenu) {
                res.json(dbMenu);
            });

    });



}