"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from bcrypt import gensalt
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
import json


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/user', methods=['POST'])
def handle_user():

    data = request.json
    email = data.get("email")
    password = data.get("password")
    name = data.get("name")
    surname = data.get("surname")
    terms = data.get("terms")


    # verificar que la data este completa
    data_check = [email, password, name, surname, terms]
    if None in data_check:
        return jsonify({
            "msg": "Faltan datos, por favor verifica tu solicitud"
        }), 400

    #verificar que el correo es unico
    usuario = User.query.filter_by(email=email).one_or_none()
    if usuario:
        return jsonify({
            "msg": "Ya existe un usuario asociado a este correo"
        }), 400
    
    #generar el salt y el hashed_password
    salt = str(gensalt(), encoding="utf-8")
    hashed_password = str(generate_password_hash(password + salt), encoding="utf-8")


    #crear el usuario y mandarlo a la base de datos
    nuevo_usuario = User(
        email = email,
        password = hashed_password,
        salt = salt,
        name = name,
        surname = surname,
        terms = terms,
        
    )
    print(data)

    #guardar en la base de datos 
    try:
        db.session.add(nuevo_usuario)
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        return jsonify({
            "msg": "Ha ocurrido un error con la base de datos"
        }), 500
    
    return jsonify({"msg":"Usuario creado con exito"}), 201

@api.route("/private", methods=["GET"])
@jwt_required()
def obtener_usuario():
    email = get_jwt_identity()
    usuario = User.query.filter_by(email=email).first()

    if usuario is None:
        return jsonify({
            "msg": "El correo no existe en la base de datos"
        }), 404
    return jsonify(usuario.serialize()), 200


@api.route("/login", methods=["POST"]) 
def handle_login():
    #obtener data de la solicitud
    data = request.json
    email = data.get("email")
    password = data.get("password")
    
    #verificar que la data esta completa
    data_check = [email, password]
    if None in data_check:
        return jsonify({
            "msg": "datos no completos"
        }), 400
    
    #verificar que es usuario ya existe
    usuario = User.query.filter_by(email=email).first()

    if usuario is None:
        return jsonify({
            "msg": "El correo no existe en la base de datos"
        }), 404
    
    #verificar el password
    password_es_correcta = check_password_hash(
        usuario.password,
        password + usuario.salt
    )
    if not password_es_correcta:
        return jsonify({
            "msg": "Clave incorrecta"
        }), 400
    
    access_token = create_access_token(identity=email)
    return jsonify({"user": usuario.serialize(), "access_token": access_token}), 200

    