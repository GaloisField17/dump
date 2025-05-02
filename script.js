fetch("https://raw.githubusercontent.com/GaloisField17/dump/refs/heads/main/en-US")
  .then((res) => res.text())
  .then((text) => {
    const lines = text.replace(/"|;/g, '')
      .split('\n')
      .filter((line) => line.startsWith("hero_name_"))
      .map((line) => {
        const [key, val] = line.replace(/hero_name_/g, '').split('=')
        return { id: key, name: val }
      });
  })
  .catch((e) => console.error(e));

