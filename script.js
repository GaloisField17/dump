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
        heroes.push({ id: key.trim(), name: val.trim() });
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