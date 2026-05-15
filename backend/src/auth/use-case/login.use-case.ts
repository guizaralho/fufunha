import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { FindUserByEmailRepository } from "../repository";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "../dto/login.dto";
import * as bcrypt from 'bcrypt';


//aqui
@Injectable()
export class LoginUseCase {
    constructor(
        private readonly findUserByEmailRepository: FindUserByEmailRepository,
        private readonly jwtService: JwtService,
        private readonly logger: Logger,
    ) {}

    async execute (data: LoginDto) {
        this.logger.log('Loggin in user ...');

        const user = await this.findUserByEmailRepository.findByEmail(data.email);
        if(!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isValid = await bcrypt.compare(data.password, user.passawordHash);
          if(!isValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        
      const payload = { sub: user.id, email: user.email};
      const acessToken = this.jwtService.sign(payload);

        this.logger.log('User logged sucessfully');

        return {
            acessToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        }

    }
}


