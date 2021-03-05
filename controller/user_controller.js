const { userModell }= require("../modells/user-modell");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')



//USER GET *************************************
const userGetController = (req, res, next) => {
    res.status(200).render('anmelden')
};

//USER POST ***************************************
const userPostController = async(req, res, next) => {

    try {
        const neueDaten = req.body
        // const errors = validationResult(req)
        // if (!errors.isEmpty()) {
        //     return res.status(422).json({
        //         fehlerBeiValidierung: errors.array()
        //     })
        // }
        
        let schonVorhandenUser = await userModell.find({ email: neueDaten.email })
		if (schonVorhandenUser.length >= 1) {
			return res.status(409).send('Es gib schon einen Nutzer mit dieser Email')
		}

		let passwortGehashed = await bcrypt.hash(neueDaten.password, 10)
        let erstelleNutzer = await userModell.create({ ...neueDaten, password: passwortGehashed })
		res.status(201).render('angemeldet',erstelleNutzer);

    } catch (fehler) {
        // next(fehler)
        res.render('fehler',fehler)
    }
};

//USER GET LOGIIN ******************************
const userGet_Einloggen = (req, res, next) => {
    res.status(200).render('login')
};
// *****************************************


//USER POST LOGIIN ******************************
const userPost_Eingeloggt = async(req, res, next) => {
    let nutzer=req.body
    let emailKlein=nutzer.email.toLowerCase()
    try{
        let userVonDatenbank=await userModell.findOne({email:emailKlein})
        if(userVonDatenbank === null){
            return res.status(400).render('nicht_angemeldet')
        }
        let vergleichVonPasswort=await bcrypt.compare(nutzer.password,userVonDatenbank.password)
        if (vergleichVonPasswort) {
            let token = jwt.sign({
                email: userVonDatenbank.email,
                userId: userVonDatenbank._id,
            }, process.env.JWT || 'ein geheimniss', { expiresIn: '24h' })

            let eintag = (1000 * 60 * 60 * 24)
            res.cookie('nutzerCookie', token, {
                maxAge: eintag,
                httpOnly: true
            }).render('eingeloggt')
        }else{
            res.status(401).send('password ist invalid')
        }

    }catch(error){
        res.status(401).send('Du konntest nicht eingeloggt werden.error von catch'+error)
    }
    
};
// *****************************************

module.exports={userGetController,userPostController,userGet_Einloggen,userPost_Eingeloggt }
