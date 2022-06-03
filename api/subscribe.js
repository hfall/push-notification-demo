export default function handler(request, response) {
  const subscription = request.body;
  response.status(200).json(JSON.stringify(subscription));
}
