let chai = require("chai")
let chaiHttp = require('chai-http')
const db = require("../models")
const app = require("../server")

let should = chai.should()

chai.use(chaiHttp)

describe("Image", () => {
    beforeEach((done) => {
        db.Image.destroy({
            where:{},
            truncate: true
        }).then(res => {
            done()
        }).catch(err => {
            console.log(err)
        })
    })
})


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
        chai.request(app).post("/api/singlepost").send(image).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property('id');
            done()
        })
        
    })
})

