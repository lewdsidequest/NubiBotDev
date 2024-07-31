import Booru from "booru";

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

export async function getRandomR34Post(tagString, limit) {
  let chosenUrl = "Error al obtener resultados";
  try {
    let posts = await Booru.search("api.rule34.xxx", [tagString], {
      limit: limit,
    });
  } catch (err) {
    console.log("Error al conectar con la API de r34\n" + err.message);
    return chosenUrl;
  }
  // for (let post of posts) console.log(post.fileUrl);

  // console.dir(posts, { depth: 3 });

  try {
    const maxPosts = posts.length - 1;
    const chosenPost = posts[getRandomInt(0, maxPosts)];
    if (chosenPost) {
      if (
        chosenPost.tags.includes("animated") &&
        !chosenPost.sampleUrl.includes(".gif")
      ) {
        //imprime post animado con file url
        chosenUrl = chosenPost.fileUrl;
      }
      //si el post no esta shadow baneado imprime el sample url
      else if (chosenPost.fileUrl) {
        //imprime post no animado o GIF con sample url
        chosenUrl = chosenPost.sampleUrl;
      } else {
        chosenUrl = "El resultado aleatorio contiene sample url no valido";
        return chosenUrl;
      }
    }
    return chosenUrl;
  } catch {
    console.log("Ocurrio un error al obtener resultados");
    return chosenUrl;
  }
}
