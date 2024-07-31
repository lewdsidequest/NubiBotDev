import fetch from "node-fetch";

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

export async function getRandomR34Post(tagString, limit) {
  let chosenUrl = "Error al obtener resultados";
  const newStr = encodeURIComponent(tagString);
  const finalTagString = newStr
    .replace(/%20/g, "+")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29");
  //   console.log("finalTagString: " + finalTagString);
  try {
    const testResponse = await fetch(
      `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&tags=${finalTagString}&limit=${limit}&json=1`,
      {
        method: "GET",
        redirect: "follow",
        userAgent: "LSQTests/2.0",
        contentType: "application/json",
        connection: "keep-alive",
      }
    );
    console.dir(await testResponse.json(), { depth: 3 });
    // const posts = JSON.parse(await testResponse.text());
    // const posts = await testResponse.json();
    // console.dir(posts, { depth: 3 });
    return;
    const maxPosts = posts.length - 1;
    const chosenPost = posts[getRandomInt(0, maxPosts)];
    if (chosenPost) {
      if (
        chosenPost.tags.includes("animated") &&
        !chosenPost.sample_url.includes(".gif")
      ) {
        //imprime post animado con file url
        chosenUrl = chosenPost.file_url;
      }
      //si el post no esta shadow baneado imprime el sample url
      else if (chosenPost.file_url) {
        //imprime post no animado o GIF con sample url
        chosenUrl = chosenPost.sample_url;
      } else {
        chosenUrl = "El resultado aleatorio contiene sample url no valido";
        return chosenUrl;
      }
    }
    return chosenUrl;
  } catch (err) {
    console.log("Error al conectar con la API de r34\n" + err.message + "\n");
    return chosenUrl;
  }
}

console.log(await getRandomR34Post("animated female", 2));
