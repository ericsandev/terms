import { Request } from 'express';
import {
    JsonController,
    UploadedFile,
    Body,
    Get,
    Post,
    Req,
    Put,
    Delete,
    Res
} from 'routing-controllers';
import { sendEmail, sendGridEMail } from '../helpers/mail.helper';
import { AvisoRepository } from '../repository/avisoPrivacidad.repository';
var jsonxml = require('jsontoxml');
import { Base64 } from 'js-base64';
import { default as config } from "../config";
const env: string = process.env.NODE_ENV || "development";
const conf = (config as any)[env];
import { global } from 'core-js';

@JsonController('/aviso')
export class AvisoController {
    private repository: AvisoRepository;

    constructor(repository: AvisoRepository) {
        this.repository = repository;
    }

    // ************ Servicios GET ************

    @Get('/getCampania')
    getCampania(@Req() req: Request) {
        return this.repository.getCampania(req.query);
    }

    @Get('/getUsuario')
    getUsuario(@Req() req: Request) {
        return this.repository.getUsuario(req.query);
    }
  
    @Post('/postRecibirAviso')
    async postRecibirAviso(@Body({ options: { limit: '500mb', extended: true, parameterLimit: 500000 } }) body: any,
                                        @Res() res: any) {
      return this.repository.postRecibirAviso(body);
    }

    @Post('/postInsUsuarioAcepta')
    async postInsUsuarioAcepta(@Body({ options: { limit: '500mb', extended: true, parameterLimit: 500000 } }) body: any,
                                        @Res() res: any) {
      return this.repository.postInsUsuarioAcepta(body);
    }
     // ************ END Servicios DELETE ************
}