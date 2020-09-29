import {
  Body,
  Controller,
  Get,
  Post,
  Query, Req,
  Res,
  Session
} from '@nestjs/common';
import { AppService } from './app.service';
import {UsuarioCreateDto} from "./usuario/dto/usuario.create-dto";
import {validate} from "class-validator";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('login')
  vistaLogin(
      @Res() res,
      @Query() parametrosDeConsulta
  ){
    res.render(
        'login',
        {
          parametrosConsulta: parametrosDeConsulta
        }
    )
  }

  @Post('login')
  async loginPost(
      @Body() parametrosCuerpo,
      @Query() parametrosConsulta,
      @Res() response,
      @Session() session
  ){

    //validamos los datos (aqui no esta hecho)
    const usuarioValido = new UsuarioCreateDto()
    usuarioValido.usuario = parametrosCuerpo.usuario;
    usuarioValido.contrasenia = parametrosCuerpo.password;

    try {
      const errores = await validate(usuarioValido)
      if(errores.length > 0){
        console.error('Errores: ', errores);
        response.redirect('login?mensaje=Error validando los campos, verifique que la informacion tenga el formato correcto')
      }else{
        const usuario =  parametrosCuerpo.usuario
        const password = parametrosCuerpo.password
        if(usuario == 'Adrian' && password == '1234'){
          session.usuario = usuario
          response.redirect('paciente/principal')
        }else{
          response.redirect('/login')
        }
      }
    }catch (e) {
      console.error(e);
      response.redirect('login?mensaje=Error validando los campos, verifique que la informacion tenga el formato correcto')
    }
  }

  @Get('logout')
  logout(
      @Res() response,
      @Session() session,
      @Req() request
  ) {
    session.username = undefined;
    session.roles = undefined;
    request.session.destroy();
    return response.redirect('login')
  }


}
