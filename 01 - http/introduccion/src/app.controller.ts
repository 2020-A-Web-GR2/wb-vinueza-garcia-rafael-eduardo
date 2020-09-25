import {Body, Controller, Get, Post, Req, Res, Session} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('login')
  login(
      @Res() response
  ){
    return response.render('login/login')
  }

  @Post('login')
  loginPost(
      @Body() parametrosConsulta,
      @Res() response,
      @Session() session
  ){

    //validamos los datos (aqui no esta hecho)

    const usuario =  parametrosConsulta.usuario
    const password = parametrosConsulta.password
    if(usuario == 'rafael' && password == '4321'){
      session.usuario = usuario
      session.roles = ['Administrador']
      response.redirect('protegido')
    }else{
      if(usuario == 'eduardo' && password == '4321'){
        session.usuario = usuario
        session.roles = ['Supervisor']
        response.redirect('protegido')
      }else{
        response.redirect('/login')
      }
    }
  }

  @Get('protegido')
  protegido(
      @Res() response,
      @Session() session,
  ) {
    const estaLogeado = session.usuario;
    if (estaLogeado) {
      return response.render(
          'login/protegido',
          {
            usuario: session.usuario,
            roles: session.roles
          }
      )
    } else {
      return response.redirect('/login')
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


