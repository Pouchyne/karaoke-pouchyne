let data=[];

fetch("catalogue.json")
.then(r=>r.json())
.then(d=>{
  data=d;
  render();
});

const list=document.getElementById("list");
const search=document.getElementById("search");
const clear=document.getElementById("clear");

search.addEventListener("input",render);
clear.addEventListener("click",()=>{
  search.value="";
  render();
});

function render(){
  const f=search.value.toLowerCase();
  list.innerHTML="";

  const grouped={};
  data.forEach(x=>{
    if(!grouped[x.artist]) grouped[x.artist]=[];
    grouped[x.artist].push(x.title);
  });

  Object.keys(grouped).sort().forEach(artist=>{
    const match = artist.toLowerCase().includes(f) || grouped[artist].some(t=>t.toLowerCase().includes(f));
    if(!match) return;

    const a=document.createElement("div");
    a.className="artist";
    a.textContent=artist;
    list.appendChild(a);

    grouped[artist].forEach(title=>{
      const s=document.createElement("div");
      s.className="song";
      s.textContent="• "+title;
      list.appendChild(s);
    });
  });
}
