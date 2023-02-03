package com.coursemania.api.Token;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

public class TokenHandler {

    public TokenHandler()
    {

    }
    public DecodedJWT decodeToken (String tokenString)
    {
        Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(tokenString);
        //To Get Username: decodeToken.getSubject();
        return decodedJWT;
    }
}
