const baseURL = "http://server-nodejs.cit.byui.edu:3000/";

function convertToJson(res) {
  let jsonRes = res.json();
  if (res.ok) {
    return jsonRes;
  } else {
    throw {name: "servicesError", message: jsonRes};
  }
}

export default class ExternalServices {
  constructor() {
    // this.category = category;
    // this.path = `../json/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    const URL = "https://wdd330-backend.onrender.com:3000/checkout/";
    return await fetch(URL, options).then(convertToJson);
  }
}
