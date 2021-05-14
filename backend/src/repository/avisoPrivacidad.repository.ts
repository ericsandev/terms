import { Service } from 'typedi';
import { default as config } from '../config';
import { Query } from '../data/queryAviso';

@Service()
export class AvisoRepository {
    private conf: any; // variabel para guardar la configuración
    query: any;

    constructor() {
        const env: string = process.env.NODE_ENV || 'development';
        this.conf = (config as any)[env]; // ejemplo de llamada al confg.js
        this.query = new Query();
    }

    // ************ SERVICIOS GET ************
    
    getCampania(query: any): PromiseLike<{}> {
        return this.query.spExecute(query, "[dbo].[SEL_CAMPANIA_SP]")
    }
    getUsuario(query: any): PromiseLike<{}> {
        return this.query.spExecute(query, "[dbo].[SEL_USUARIO_SP]")
    }
    postRecibirAviso(body: any): PromiseLike<{}> {
        return this.query.spExecute(body, "[dbo].[INS_RECIBIR_AVISO_SP]")
    }

    postInsUsuarioAcepta(body: any): PromiseLike<{}> {
        return this.query.spExecute(body, "[dbo].[INS_USUARIO_ACEPTA_SP]")
    }
}