const gallery = document.getElementById("gallery");
const sidebar = document.getElementById("favSidebar");
const overlay = document.querySelector(".overlay");
const favContainer = document.getElementById("favItems");
console.log("js")
let currentTab = "modern";

const data = {
  modern: [
    {
      id: 1,
      name: "الدفء الأزلي",
      size: "60x90",
      price: "80$",
      img: "imgs/dfaa-azle.webp"
    },
    {
      id: 2,
      name: "أمنية 11:11",
      size: "40x50",
      price: "35$",
      img: "imgs/11.11.webp"
    },
    {
      id: 3,
      name: "سماء مطرزة بالأمل",
      size: "60x90",
      price: "80$",
      img: "imgs/sma-mtaraza.webp"
    },
    {
      id: 4,
      name: "الصمت الناطق",
      size: "70x50",
      price: "30$",
      img: "imgs/samt-natik.webp"
    },
    {
      id: 5,
      name: "زاوية السكينة",
      size: "50x40",
      price: "40$",
      img: "imgs/skana-corner.webp"
    },
    {
      id: 6,
      name: "قِبلة الأحرار",
      size: "50x70",
      price: "40$",
      img: "imgs/qbla.webp"
    },
     {
      id: 9,
      name: "فوضى البداية",
      size: "40x60",
      price: "40$",
      img: "imgs/fauda.webp"
    },
     {
      id: 10,
      name: "هدوء الطبيعية",
      size: "60x40",
      price: "40$",
      img: "imgs/calm.webp"
    },
    {
      id: 11,
      name: "ثبات الروح",
      size: "60x40",
      price: "70$",
      img: "imgs/thbat-alroh.webp"
    }
  ],
  classic: [
    {
      id: 7,
      name: "آية",
      size: "20x20",
      price: "10$",
      img: "imgs/khat1.webp"
    },
    {
      id: 8,
      name: "آية",
      size: "20x20",
      price: "10$",
      img: "imgs/khat2.webp"
    }
  ]
};

// تحميل المفضلة
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function render() {
  gallery.innerHTML = "";

  data[currentTab].forEach(item => {
    const isFav = favorites.find(f => f.id === item.id);

    gallery.innerHTML += 
     ` <div class="card">
        <img src="${item.img}" />
        <div class="card-info">
        <div>
        <h3>${item.name}</h3>
        <p>المقاس: ${item.size}</p>
        </div>
        <div>
        <h3>${item.price}</h3>
        <button class="fav-btn ${isFav ? "active" : ""}" 
        onclick="toggleFav(${item.id})">
          <i class="fa-heart fa-solid "></i>
        </button>
        </div>
        </div>
      </div>  `
    ;
  });

  renderFavorites();
}

function toggleFav(id) {
  const item = [...data.modern, ...data.classic].find(i => i.id === id);

  const index = favorites.findIndex(f => f.id === id);

  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(item);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  render();
}

function renderFavorites() {
  favContainer.innerHTML = "";

  favorites.forEach(item => {
    favContainer.innerHTML += `
      <div class="card">
        <img src="${item.img}" />
        <h3>${item.name}</h3>
      </div> `
    ;
  });
}

function clearFavorites() {
  favorites = [];
  localStorage.removeItem("favorites");
  render();
}

function switchTab(tab, el) {
  currentTab = tab;

  document.querySelectorAll(".tab").forEach(btn =>
    btn.classList.remove("active")
  );

  el.classList.add("active");

  render();
}

function openSidebar() {
  sidebar.classList.add("active");
  overlay.classList.add("active");
}

function closeSidebar() {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
}

// تشغيل أولي
render();
