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

} from 'routing-controllers';
import { AmarreCajaRepository } from '../repository/amarreCaja.repository';

@JsonController('/caja')
export class AmarreCajaController {
    private repository: AmarreCajaRepository;

    constructor(repository: AmarreCajaRepository) {
        this.repository = repository;
    }

    // ************ Servicios GET ************

    /**
   * @description Obtiene el historial de amarre de caja
   * @author Uriel Hernandez
   * SP: [caja].[SEL_AMARRECAJA_SP] 
   * Url: http://{server}:{port}/GetHistorialCaja
   * Wiki: 
   */
    @Get('/GetHistorialCaja')
    GetHistorialCaja(@Req() req: Request) {
        return this.repository.GetHistorialCaja(req.query);
    }

    // ************ END Servicios GET ************

    // ************ Servicios POST ************


    // ************ END Servicios POST ************

    // ************ Servicios PUT ************
    // ************ END Servicios POST ************

    // ************ Servicios DELETE ************
    // ************ END Servicios DELETE ************
}