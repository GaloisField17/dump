const fetchFiles = async () => {
  try {
    const res = await fetch("");
    const text = await res.text();
    const files = [];
    text.split('\n')
      .filter((line) => line.endsWith(".skel"))
      .forEach((line) => {
        const fileName = line.replace('.skel', '');
        files.push({
          fileName: fileName,
          atlas: fileName + ".atlas",
          png: fileName + ".png",
          skel: fileName + ".skel"
        });
      });
    return heroes;
  } catch (e) {
    console.error(e);
    return [];
  }
};

const fetchHeroes = async () => {
  try {
    const res = await fetch("https://raw.githubusercontent.com/GaloisField17/dump/refs/heads/main/en-US");
    const text = await res.text();
    const heroes = [];
    text.replace(/"|;/g, '')
      .split('\n')
      .filter((line) => line.startsWith("hero_name_"))
      .forEach((line) => {
        const [key, val] = line.replace('hero_name_', '').split('=');
        heroes.push({ id: key, heroName: val });
      });
    return heroes;
  } catch (e) {
    console.error(e);
    return [];
  }
};

(async () => {
  const heroes = await fetchHeroes();
  console.log(heroes);
})();