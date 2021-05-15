/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/
const baseUrl = "https://platzi-avo.vercel.app";
const app = document.querySelector("#app");

const formatPrice = (price) =>
  new Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: "USD",
  }).format(price);

(async function () {
    const response = await fetch(`${baseUrl}/api/avo`);
    // 💡 More about Spread: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    const { data: allAvos } = await response.json();
    console.log(allAvos);
    // Create the HTML Nodes for each avocado we receive from the API
    // 💡 More about Array.map: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    const nodeArray = allAvos.map((avocado) => {
      // Create image node
      //<img class="w-48 h-48 rounded-full mx-auto -mb-24" src="https://platzi-avo.vercel.app/images/fuerte.jpg" alt="Avatar Jacky"/>
      const image = document.createElement("img");
      image.className = "w-48 h-48 rounded-full mx-auto -mb-24";
      image.src = `${baseUrl}${avocado.image}`;
  
      // Create heading
      // <h2 class="font-title text-gray-800 text-xl mb-3">
      const title = document.createElement("h2");
      title.className = "font-title text-gray-800 text-xl mb-3";
      title.textContent = avocado.name;//.substring(0,10);
  
      //desription
      //<p class="font-body">
      const description = document.createElement("p");
      description.className = "font-body";
      description.textContent = avocado.attributes.taste.substring(0,10);

      // Create Price
      // <div class="text-gray-600">(555) 765-4321</div>
      const price = document.createElement("p");
      price.className = "text-indigo-500 text-xl font-medium mt-2";
      price.textContent = formatPrice(avocado.price);

      // Wrap price & title
      // <div class="bg-white shadow-lg rounded-lg px-8 pt-32 pb-10 text-gray-400">
      const content = document.createElement("div");
      content.className = "bg-white shadow-lg rounded-lg px-8 pt-32 pb-10 text-gray-400";
      content.appendChild(title);
      content.appendChild(description);
      content.appendChild(price);
  
      // Wrap Img and content
      // <div class="md:flex bg-white rounded-lg p-6">
      const card = document.createElement("div");
      card.className = "text-center m-10 w-1/4";
      card.appendChild(image);
      card.appendChild(content);
  
      return card;
    });
  
    // Trick: Apply an array as a list of arguments
    app.append(...nodeArray);
  })();