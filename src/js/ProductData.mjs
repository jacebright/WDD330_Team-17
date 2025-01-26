const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    
  }
  async getData(category) {
    try {
      if (!category) throw new Error ("Category is required");
      const response = await fetch(baseURL + `products/search/${category}`);
      if (!response.ok) throw new Error("API Error here");
      const data = await convertToJson(response);
      return data.Result; 
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
      
   
  }
  async findProductById(id) {
    const response = await fetch(baseURL + `product/${id}`);
    const data = convertToJson(response);
    return data.Result;
  }
}
