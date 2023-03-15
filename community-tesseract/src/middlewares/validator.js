export function validator(request, response, next) {
  if (!request.body.title || !request.body.description) {
    return response.status(400).send({
      message: "Missing Information",
    });
  }

  next();
}
