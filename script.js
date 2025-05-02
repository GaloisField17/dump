fetch("C:\Users\Calvin\Desktop\SVtest\abc\en-US")
  .then((res) => res.text())
  .then((text) => {
    var lines = text.split('\n').filter((line) => line.startsWith("hero_name_"));
    console.log(lines);
  })
  .catch((e) => console.error(e));