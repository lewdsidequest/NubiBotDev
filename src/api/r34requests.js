import "dotenv/config.js";
import Booru from "booru";

//ON DEPLOY USE THIS
const username = process.env.R34UN;
const pass = process.env.R34PASS;

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

export async function getRandomR34Post(tagString, limit) {
  let chosenUrl = "Error al obtener resultados";
  try {
    const myBooru = Booru.forSite("xbooru.com");

    let posts = await myBooru.search(tagString, { limit: limit });
    // console.dir(posts, { depth: 3 });
    const maxPosts = posts.length - 1;
    const chosenPost = posts[getRandomInt(0, maxPosts)];
    chosenUrl = chosenPost.fileUrl;
    return chosenUrl;
  } catch (err) {
    console.log("Error al conectar con la API de r34\n" + err.message);
    return chosenUrl;
  }
}
console.log(await getRandomR34Post("female animated", 10));
