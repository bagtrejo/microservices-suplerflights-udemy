import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';
import { UserMSG } from 'src/common/constants';
import { ClientProxySuperflights } from 'src/common/proxy/client-proxy';
import { UserDTO } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly clientProxy: ClientProxySuperflights,
        private readonly jwtService: JwtService
    ){}

    private _clienteProxyUser = this.clientProxy.clientProxyUsers();

    async validateUser(username: string, password: string): Promise<any>{

        const user = await firstValueFrom(this._clienteProxyUser.send(UserMSG.VALID_USER, { username, password}));

        if (user  && user) return user;

        return null;
    }


    async signIn(user: any){
        
        const payload = {
            username: user.username,
            sub: user._id
        }

        return {
            access_token: this.jwtService.sign(payload, {
                expiresIn: '365d'  // Establece la duración a 1 año
            })
        }
    }

    async signUp(userDTO: UserDTO){
        return await firstValueFrom(this._clienteProxyUser.send(UserMSG.CREATE, userDTO));
    }
}
