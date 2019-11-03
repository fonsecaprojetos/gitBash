const express = require('express');
const app = express();
const jsonsch = require('jsonschema').Validator;
const validacao = new jsonsch();


app.use('/auth', createUserEmail);


exports.helloWorld = app;

function createUserEmail(req, res) {
    app.disable('X-Powered-By');
    var dataRequest = req.body;
    if (Object.keys(req.body).length && req.method == 'POST') {
        //res.status(200).send({ status: "success", data: { reqMethod: mensagem } });
        //console.log(funcaomethod());

        var errorsString = '';
        const schema = {
            "id": "/jsonvalidation", "type": "object", "properties": {
                "name": { "type": "string", "minLength": 3, "maxLength": 50 },
                "email": { "type": "string", "type": "email" },
                "password": { "type": "string", "minLength": 8 }
            },
            required: ["name", "password"]
        };
        //
        validacao.addSchema(schema, '/jsonvalidation');
        var validate = require('jsonschema').validate;
        var result = validate(req.body, schema);
        console.log('Schema Validado? => ' + result.valid + ', ' + Date());

        if (result.valid == true) {
            res.status(200).send({status: 'sucess', data:{dataRequest}, executionDate: Date()});
        }
        else {
            for (var i = 0; i < result.errors.length; i++) {
                errorsString += result.errors[i];
            }
            res.status(400).send(errorsString);
        }
    } else {
        res.status(400).send({
            status: 'fail', data: {
                message: 'No request body was found or incorrect Request Method.',
                dataRequest: 'No data',     
            },
            executionDate: Date()
        });
    }

};
