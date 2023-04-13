// ERROR MIDDLEWARE --> (err, req, res, next) => {}

import { ErrorRequestHandler } from "express";

// ERROR IF BODY REQUEST IS EMPTY OR UNDEFINED
export const notFoundMiddleware:ErrorRequestHandler = (err, req, res, next) => {
  console.log(err.status)
    if (err.status === 404) {
      res.status(404).send({ successful: false, message: err.message });
    } else {
      next(err);
    }
  };

  // ERROR IF BODY REQUEST IS EMPTY OR UNDEFINED
export const unauthorizedMiddleware:ErrorRequestHandler = (err, req, res, next) => {
  if (err.status === 401) {
    res.status(401).send({ successful: false, message: err.message });
  } else {
    next(err);
  }
};

export const unauthorizedResourceMiddleware:ErrorRequestHandler = (err, req, res, next) => {
  if (err.status === 403) {
    res.status(403).send({ successful: false, message: err.message });
  } else {
    next(err);
  }
};

export const badRequestMiddleware:ErrorRequestHandler = (err, req, res, next) => {
  if (err.status === 400) {
    res.status(403).send({ successful: false, message: err.message });
  } else {
    next(err);
  }
};
  
  //  ERROR FOR WHEN THE REQUEST BODY DOES NOT PASS THE VALIDATION CHECKS AND RETURNS A VALIDATION ERROR
  export const entryForbiddenMiddleware:ErrorRequestHandler = (err, req, res, next) => {
    if (err.status === 400 ) {
      res.status(400).send(err.errorsList);
      // ERRORS LIST FOUND IN INDEX POST REQUEST
    } else {
      next(err);
    }
  };
  
  //  ALL OTHER ERRORS END HERE
  export const catchAllErrorHandler:ErrorRequestHandler = (err, req, res, next) => {
    console.log(err);
    res.status(500).send("Generic Server Error");
  };

export const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) return error.message
    return String(error)
  }