fetch("catalogue.json")
  .then(r => r.json())
  .then(data => {

    const list = document.getElementById("liste");
    const input = document.querySelector("input");
    const btn = document.querySelector("button");

    // tri déjà OK chez toi
    function render(filter = "") {
      list.innerHTML = "";

      let lastLetter = "";

      data
        .filter(x =>
          (x.artist + " " + x.title)
            .toLowerCase()
            .includes(filter.toLowerCase())
        )
        .forEach(item => {

          const letter = item.artist.charAt(0).toUpperCase();

          if (letter !== lastLetter) {
            const anchor = document.createElement("div");
            anchor.id = letter;
            anchor.style.paddingTop = "10px";
            list.appendChild(anchor);
            lastLetter = letter;
          }

          const line = document.createElement("div");
          line.textContent = item.artist + " - " + item.title;
          list.appendChild(line);
        });
    }

    render();

    input.addEventListener("input", () => render(input.value));

    btn.addEventListener("click", () => {
      input.value = "";
      render();
    });
  });

// navigation A-Z
function go(letter) {
  const el = document.getElementById(letter);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}