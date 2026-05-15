import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { CreateUserRepository, FindUserByEmailRepository } from "../repository";
import { RegisterDto } from "../dto/register.dto";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';

//aqui
@Injectable()
export class RegisterUseCase{
    constructor(
        private readonly findUserByEmailRepository: FindUserByEmailRepository,
        private readonly createUserRepository : CreateUserRepository,
        private readonly jwtService: JwtService,
        private readonly logger : Logger,
    ) {}
    async execute (data: RegisterDto) {
        this.logger.log('Register user ...');

        const existingUser = await this.findUserByEmailRepository.findByEmail(data.email);
        if(existingUser) {
            throw new BadRequestException('Email exists');
        }
        const passawordHash = await bcrypt.hash(data.password, 10);

        const user = await this.createUserRepository.create({
            name: data.name,
            email: data.email,
            passawordHash
        });

      const payload = { sub: user.id, email: user.email}
      const acessToken = this.jwtService.sign(payload)

      this.logger.log('User registered successfully!');

      return {acessToken, user}
    }
}