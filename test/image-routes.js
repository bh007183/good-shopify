let chai = require("chai")
let chaiHttp = require('chai-http')
const db = require("../models")
const app = require("../server")

let should = chai.should()

chai.use(chaiHttp)

// Handles all test routes. // After run through, the test database resets.//


describe("/GET Public Image", () => {
    it("it should get all public images", (done) => {
        chai.request(app).get("/api/getpublic").end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            res.body.length.should.be.eql(0);
            done()
        })
    })
})

describe("/POST User", () => {
    it("it should POST a user account", (done) => {
        let User = {
           
            email: "test@test.com",
            password: "test",
        }
        chai.request(app).post("/api/createAccount").send(User).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property('id');
            done()
        })
        
    })
})

let holder = []

describe("/POST User Login", () => {
    it("it should POST a user login", (done) => {
        let User = {
            email: "test@test.com",
            password: "test",
        }
        chai.request(app).post("/login").send(User).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property('id');
            res.body.should.have.property("token")
            done()
            holder.unshift(res.body.token)
        })
        
    })
})

describe("/POST Image", () => {
    it("it should POST an image", (done) => {
        
        let image = {
          
            url: "https://i.pinimg.com/originals/af/8d/63/af8d63a477078732b79ff9d9fc60873f.jpg",
            title: "Lamp",
            category: "background",
            public: true,
            UserId: 1
        }
        chai.request(app).post("/api/singlepost").set({"Authorization": "Bearer: " + holder[0]}).send(image).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property('title');
            res.body.should.have.property('url');
            res.body.should.have.property('category');
            res.body.should.have.property('UserId');
            res.body.should.have.property('public');
            done()
        })
        
    })
})

describe("/GET/:id Image", () => {
    it("it should GET an image", (done) => {
        
    
        chai.request(app).get("/api/edit/1").set({"Authorization": "Bearer: " + holder[0]}).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            done()
        })
        
    })
})

describe("/PUT Image", () => {
    it("it should PUT an image", (done) => {
        let image = {
            id: 1,
            url: "https://i.pinimg.com/originals/af/8d/63/af8d63a477078732b79ff9d9fc60873f.jpg",
            title: "Changed Title",
            category: "background",
            public: true,
            UserId: 1
        }
        chai.request(app).put("/api/updateImage").set({"Authorization": "Bearer: " + holder[0]}).send(image).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            res.body.should.have.deep.members([1])
            done()
        })
        
    })
})

describe("/DELETE/:id Image", () => {
    it("it should DELETE an image", (done) => {
        
    
        chai.request(app).delete("/api/delete/1").set({"Authorization": "Bearer: " + holder[0]}).end((err, res) => {
            res.should.have.status(200);
            res.body.should.equal(1);
            done()
        })
        
    })
})

describe("/DELETE/:id User", () => {
    it("it should DELETE a User", (done) => {
        
    
        chai.request(app).delete("/api/delete/user/1").set({"Authorization": "Bearer: " + holder[0]}).end((err, res) => {
            res.should.have.status(200);
            res.body.should.equal(1);
            db.sequelize.sync({ force: true}).then(res => db.sequelize.sync({ force: false}))
            done()
        })
        
    })
})

