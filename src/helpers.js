'use strict';

exports.sendError = sendError;

function sendError(res, err) {
  return res.send({
    success: false,
    message: err
  });
}
