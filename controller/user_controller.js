const { userModell }= require("../modells/user-modell");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('express-validator');



//USER GET *************************************
const userGetController = (req, res, next) => {
    res.status(200).render('anmelden',{csrfTocken:req.csrfToken()})
};

//USER POST ***************************************
const userPostController = async(req, res, next) => {

    // try {
    //     const neueDaten = req.body     
    //     let schonVorhandenUser = await userModell.find({ email: neueDaten.email })
	// 	if (schonVorhandenUser.length >= 1) {
	// 		return res.status(409).send('Es gib schon einen Nutzer mit dieser Email')
	// 	}

	// 	let passwortGehashed = await bcrypt.hash(neueDaten.password, 10)
    //     let erstelleNutzer = await userModell.create({ ...neueDaten, bild: req.file.filename, password: passwortGehashed })
	// 	res.status(201).render('angemeldet',{name: erstelleNutzer.name, email: erstelleNutzer.email,bild: "/" + erstelleNutzer.bild});

    // } catch (fehler) {
    //     // next(fehler)
    //     res.render('fehler',fehler)
    // }
//----------------------------------------------------------------------
//     try {
//         const neueDaten = {
//             vorname: req.body.vorname,
//             password: req.body.password,
//             email: req.body.email,
//         };
//         const fehler = validator.validationResult(req);
//         if (!fehler.isEmpty()) {
//             console.log(fehler.array());
//             const meldungen = fehler.array().map((einPrüfergebnis) => {
//                 return einPrüfergebnis.msg;
//             })
//             console.log('meldungen',meldungen);
//             neueDaten.fehler = meldungen;
//             console.log('meldungen',meldungen);
//             res.render('anmeldenserverout',{csrfTocken:req.csrfToken()},neueDaten);
//         }
       
//         let schonVorhandenUser = await userModell.find({ email: neueDaten.email })
//         if (schonVorhandenUser.length >= 1) {
//             return res.status(409).send('Es gib schon einen Nutzer mit dieser Email')
//         }
//         let passwortGehashed = await bcrypt.hash(neueDaten.password, 10)
//         let erstelleNutzer = await userModell.create({ ...neueDaten, bild: req.file.filename, password: passwortGehashed })
//         res.status(201).render('angemeldet', { vorname: erstelleNutzer.vorname, email: erstelleNutzer.email, bild: "/" + erstelleNutzer.bild });
//     } catch (fehler) {
//         console.log("fehler=", fehler)
//         res.render('fehler', fehler)
//     }
// }
//------------------------------------------------------------------

    try {
      const neueDaten = {
        vorname: req.body.vorname,
        password: req.body.password,
        email: req.body.email,
        
      };
      const fehler = validator.validationResult(req);
      if (!fehler.isEmpty()) {
        console.log(fehler.array());
        const meldungen = fehler.array().map((einPrüfergebnis) => {
          return einPrüfergebnis.msg;
        })
        neueDaten.fehler = meldungen;
        res.render('anmeldenserverout',neueDaten );
      }
      
      let schonVorhandenUser = await userModell.find({ email: neueDaten.email })
      if (schonVorhandenUser.length >= 1) {
        return res.status(409).send('Es gib schon einen Nutzer mit dieser Email')
      }
      let passwortGehashed = await bcrypt.hash(neueDaten.password, 10)
      let erstelleNutzer = await userModell.create({ ...neueDaten,bild: req.file.filename, password: passwortGehashed })
      res.status(201).render('angemeldet', { vorname: erstelleNutzer.vorname, email: erstelleNutzer.email, bild: "/" + erstelleNutzer.bild });
    } catch (fehler) {
  console.log("fehler=",fehler)
      res.render('fehler', fehler)
    }
  }


//USER GET LOGIIN ******************************
const userGet_Einloggen = (req, res, next) => {
    res.status(200).render('login',{csrfTocken:req.csrfToken()})
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
