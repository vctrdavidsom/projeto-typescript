"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleStrategy = void 0;
const dotenv = __importStar(require("dotenv"));
const path_1 = require("path");
// Carrega o arquivo .env explicitamente
dotenv.config({ path: (0, path_1.join)(__dirname, '..', '.env') });
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const config_1 = require("@nestjs/config");
let GoogleStrategy = class GoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, 'google') {
    constructor(configService) {
        // Tenta obter valores do ConfigService
        let clientID = configService.get('GOOGLE_CLIENT_ID');
        let clientSecret = configService.get('GOOGLE_CLIENT_SECRET');
        let callbackURL = configService.get('GOOGLE_CALLBACK_URL');
        // Tenta obter diretamente do process.env se não encontrado no ConfigService
        clientID = clientID || process.env.GOOGLE_CLIENT_ID;
        clientSecret = clientSecret || process.env.GOOGLE_CLIENT_SECRET;
        callbackURL = callbackURL || process.env.GOOGLE_CALLBACK_URL;
        // Fornece mensagens de erro detalhadas sobre qual variável está faltando
        if (!clientID)
            console.error('Erro: GOOGLE_CLIENT_ID não encontrado');
        if (!clientSecret)
            console.error('Erro: GOOGLE_CLIENT_SECRET não encontrado');
        if (!callbackURL)
            console.error('Erro: GOOGLE_CALLBACK_URL não encontrado');
        if (!clientID || !clientSecret || !callbackURL) {
            throw new Error('Google OAuth credentials are not properly configured');
        }
        super({
            clientID,
            clientSecret,
            callbackURL,
            scope: ['email', 'profile'],
            passReqToCallback: false,
        });
        this.configService = configService;
    }
    async validate(accessToken, refreshToken, profile, done) {
        const { name, emails, photos } = profile;
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken,
        };
        done(null, user);
    }
};
GoogleStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], GoogleStrategy);
exports.GoogleStrategy = GoogleStrategy;
