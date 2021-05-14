export default {
    "development":
    {
        "port": 4020,
        "seguridad": {
            "host": "192.168.20.137",
            "port": 4000,
            "method": "POST",
            "headers": {
                "Content-Type": "multipart/form-data"
            },
            "protocolo": "http"
        },
        "aplicacionId": 10,
        "sendGrid": {
            "token": "Bearer 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"
        },
        "responderEncuestaUrl": 'http://localhost:4400'
    },
    "production": {
       
    },
    "qa": {
      
    },
    "training": {
       
    }
};
