import { Controller, Get, UseGuards, Req, Res, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';

interface GoogleUser {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  accessToken: string;
}

interface RequestWithUser extends Request {
  user: GoogleUser;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Iniciar autenticação com Google' })
  async googleAuth() {
    // O guard redirecionará para a página de login do Google
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Callback da autenticação com Google' })
  @ApiResponse({ status: 200, description: 'Usuário autenticado com sucesso' })
  async googleAuthCallback(
    @Req() req: RequestWithUser,
    @Res() res: Response,
  ) {
    const user = await this.authService.validateGoogleUser(req.user);
    const result = await this.authService.login(user);
    
    // Redirecionando para uma rota que existe no seu backend
    res.redirect(`/auth/success?token=${result.access_token}`);
  }

  @Get('success')
  @ApiOperation({ summary: 'Página de sucesso após autenticação' })
  @ApiResponse({ status: 200, description: 'Token de autenticação recebido' })
  authSuccess(@Query('token') token: string, @Res() res: Response) {
    // Retornar uma página HTML simples apenas com a mensagem de sucesso
    res.send(`
      <html>
        <head><title>Autenticação Bem-Sucedida</title></head>
        <body>
          <h1>Login bem sucedido</h1>
          <script>
            // Armazenar o token no localStorage
            localStorage.setItem('auth_token', '${token}');
            // Você pode redirecionar para outra página ou fechar a janela
            // window.close();
          </script>
        </body>
      </html>
    `);
  }
  
  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Obter perfil do usuário autenticado' })
  @ApiResponse({ status: 200, description: 'Perfil do usuário retornado com sucesso' })
  getProfile(@Req() req: RequestWithUser) {
    return req.user;
  }
}