import { global } from 'core-js';


// ********** Middleware Para conectar al servicio de seguridad

import { Middleware, ExpressMiddlewareInterface } from "routing-controllers";
import * as requestPost from 'request';
import { default as config } from '../config';

@Middleware({ type: "before" })
export class SeguridadMiddleware implements ExpressMiddlewareInterface {
    private conf: any;
    constructor() {
        const env: string = process.env.NODE_ENV || 'development';
        this.conf = (config as any)[env];
    }

    use(request: any, response: any, next: any): void {
        if (request.headers != undefined && request.headers != null && request.headers.authorization != undefined && request.headers.authorization != null) {

            let ruta = this.conf.seguridad.protocolo + "://" + this.conf.seguridad.host + ':' + this.conf.seguridad.port + '/seguridad/TokenValidation';
            requestPost.post({
                url: ruta,
                headers: {
                    'Authorization': request.headers.authorization
                },
                json: {
                    'aplicacionId': this.conf.aplicacionId
                }
            }, function (err: any, httpResponse: any, body: any) {
                var respuesta = body;
                if (!err && respuesta.code == 200) {
                    global.UserId = respuesta.data.idUser;
                    next(false);
                } else {
                    response.status(401).send({ error: 'El usuario no se encuentra autorizado', recordsets: [] })
                    // next(false);
                }
            });

        } else {
            const urlSpint = request.url.split('?');
            if (request.url.indexOf('?') > -1 && urlSpint[0] === '/encuesta/responderEncuesta' 
            || request.url.indexOf('?') > -1 && urlSpint[0] === '/encuesta/getPreguntasEncuesta'
            || request.url === '/encuesta/guardarRespuesta'
            || request.url === '/encuesta/postCambiarEstatusNotificaciones'
            || urlSpint[0] === '/encuesta/getRespuestaPorPregunta'
            || urlSpint[0] === '/aviso/getCampania'
            || urlSpint[0] === '/aviso/postRecibirAviso'
            || urlSpint[0] === '/encuesta/getNotificacionEncuesta') {

                next(false);
            } else {
                response.status(401).send({ error: 'El usuario no se encuentra autorizado', recordsets: [] })
            }
        }
    }
}