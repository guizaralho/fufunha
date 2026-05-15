import 'dotenv/config';
import { Injectable } from "@nestjs/common";
import {ExtractJwt, Strategy} from 'passport-jwt' ;
import { PassportStrategy } from '@nestjs/passport';



//aqui
type JwtPayload = {
    sub : string;
    email: string;
};

@Injectable()
export class JwtStrategy extends  PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        })
    }

    validate(payload: JwtPayload) {
        return{
            id: payload.sub,
            email: payload.email,
        };
    }
}