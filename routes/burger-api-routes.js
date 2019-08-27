//These will include the routes I think to implement the API calls

var db = require("../models");

module.exports = function (app) {

    app.get("/burgers", function (req, res) {

        db.Burger2.findAll({}
            ).then(function (data) {
            var burgerArray = [];
            for(i = 0; i < data.length; i++){
                (burgerArray).push(data[i].dataValues);
            }
            
            //Made Changes to this code, before it was burgers: data and then the keywords in the html had dataValues.burger_name and such
            var hbsObject = {
                burgers: burgerArray
            };
            res.render("index", hbsObject);
        })
    })


    app.get("/api/burgers", function (req, res) {

        db.Burger2.findAll({
        }).then(function (dbBurger) {
            res.json(dbBurger);
        })
    })




    app.post("/api/burgers", function (req, res) {

        db.Burger2.create(req.body).then(function (dbBurger) {
            res.json(dbBurger);
        })

    })


    app.put("/api/burgers/:id", function (req, res) {
        
        db.Burger2.update(
            req.body,
            { where: 
                { id: req.params.id }
            }).then(function (dbBurger) {
                res.json(dbBurger);
            });

    });



}