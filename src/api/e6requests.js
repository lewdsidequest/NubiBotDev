import "dotenv/config.js";
import E621 from "e621";

//ON DEPLOY USE THIS
const username = process.env.E6UN;
const apiKey = process.env.E6KEY;

const e621 = new E621({
  authUser: username,
  authKey: apiKey,
});

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

export async function getRandomE6Post(tagString, limit) {
  let chosenUrl = "Error al obtener resultados";
  const posts = await e621.posts.search({ tags: tagString, limit });
  try {
    const maxPosts = posts.length - 1;
    const chosenPost = posts[getRandomInt(0, maxPosts)];
    if (chosenPost) {
      if (
        chosenPost.tags.meta.includes("animated") &&
        !chosenPost.sample.url.includes("gif")
      ) {
        //imprime post animado con file url
        chosenUrl = chosenPost.file.url;
      } else if (chosenPost.file.url) {
        //imprime post no animado o GIF con sample url
        chosenUrl = chosenPost.sample.url;
      } else {
        //si el post existe pero el url no
        chosenUrl = "El resultado aleatorio contiene uno o mas tags baneados";
        return chosenUrl;
      }
    }
    return chosenUrl;
  } catch {
    console.log("Ocurrio un error al obtener resultados");
    return chosenUrl;
  }
}
