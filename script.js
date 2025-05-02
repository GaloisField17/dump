//Get-ChildItem -Path . -File | Select-Object -ExpandProperty Name
const fetchFiles = async () => {
  try {
    const res = await fetch("https://raw.githubusercontent.com/GaloisField17/dump/refs/heads/main/fileNames.txt");
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
    return files;
  } catch (e) {
    console.error(e);
    return [];
  }
};

const fetchHeroes = async () => {
  try {
    const res = await fetch("https://raw.githubusercontent.com/GaloisField17/dump/refs/heads/main/en-US");
    const text = await res.text();
    const heroes = {};
    text.replace(/"|;/g, '')
      .split('\n')
      .filter((line) => line.startsWith("hero_name_"))
      .forEach((line) => {
        const [key, val] = line.replace('hero_name_', '').split('=');
        heroes[key] = val;
      });
    return heroes;
  } catch (e) {
    console.error(e);
    return [];
  }
};


const models = [];
(async () => {
  const heroes = await fetchHeroes();
  const files = await fetchFiles();
  files.forEach((file) => {
    if (file.fileName.startsWith("spine_hero_")) {
      const modelID = file.fileName.slice(11, 17);
      console.log(modelID);
      file.modelName = heroes[modelID];
    } else {
      file.modelName = heroes[fileName];
    }
  })
  console.log(files);
})();