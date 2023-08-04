import passport from "passport";
// import local from "passport-local";
import GitHubStrategy from "passport-github2";
import userManager from "../DAOs/mongo/manager/manager.user.mongo.js";
import { createHash, isValidPassword } from "../utils/utils.js";
import bcrypt from "bcrypt";



// const localStrategy = local.Strategy;

const initializePassport = () => {
    passport.use(
        "github",
        new GitHubStrategy(
            {
                clientID: "83e88f45d0a71271ba29",
                clientSecret: "36e4eff26ed7f06fcb5fda47231e62060a8134ae",
                callbackURL: "http://localhost:8080/mongouser/githubcallback",
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const user = await userManager.getUserByEmail(profile._json.email);
                    console.log(profile)
                    if (user) { console.log(user) } else { console.log("no hay usuario") }
                    if (!user) {
                        const newUser = {
                            first_name:profile._json.login,
                            last_name:profile._json.login,
                            email:profile._json.email?profile._json.email:"asd@asd.com",
                            password: bcrypt.hashSync("zH2kjobi", bcrypt.genSaltSync(10)),
                        };
                        const result = await userManager.createUser(newUser);
                        return done(null, result);
                    } else {
                        return done(null, user);
                    }
                } catch (error) {
                    return done("Error al obtener el usuario" + error);
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userManager.getUserById(id);
        done(null, user);
    });
};

export default initializePassport;
