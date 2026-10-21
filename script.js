
 // DATA EDITING GUIDE:
 // To add another vehicle, copy the record object inside VEHICLE_RECORDS,
 // paste it after the existing object (add a comma between objects), and edit its values.
 // Keep the property names the same. The date field is optional; use YYYY-MM-DD if known.
 // This list is the only place you need to edit to add or update vehicle records.

const T = {
  en: {
    title: "Certification System",
    m1: "Home",
    m2: "Search records",
    m3: "Help",
    h: "Unique Number Card for Truck & Trailer Barriers",
    org: "Standards Authority",
    orgsub: "Vehicle record information",
    pick: "Choose a vehicle record",
    s1: "Vehicle records",
    s1d: "View vehicle record information in one place.",
    s2: "Record details",
    s2d: "Each vehicle has its own details.",
    s3: "Easy record lookup",
    s3d: "Choose a vehicle from the list below.",
    made: "Barrier manufacture date",
    factory: "Towing Trailers Factory",
    f1: "Barrier unique number",
    f2: "Vehicle type",
    f3: "Vehicle chassis number",
    f4: "Vehicle make",
    f5: "Vehicle model name",
    f6: "Vehicle model year",
    foot: "جميع الحقوق محفوظة © الهيئة السعودية للمواصفات والمقاييس والجودة 2026",
    links: "سياسة الخصوصية | الأسئلة الشائعة",
    bot: "Hi, I'm the assistant. Ask me:",
    q1: "What is this page?",
    a1: "This page displays vehicle record information. Select a vehicle from the dropdown to view its details.",
    q2: "Is it official?",
    a2: "Yes",
    truck: "Truck",
    trailer: "Trailer",
    bus: "Bus",
    tanker: "Tanker"
  },

  ar: {
    title: "نظام منح الشهادات",
    m1: "الرئيسية",
    m2: "بحث في السجلات",
    m3: "مساعدة",
    h: "بطاقة الرقم المميز لحواجز الشاحنات والمقطورات",
    org: "هيئة المعايير",
    orgsub: "معلومات سجل المركبة",
    pick: "اختر سجل مركبة",
    s1: "سجلات المركبات",
    s1d: "اعرض معلومات سجل المركبة في مكان واحد.",
    s2: "تفاصيل السجل",
    s2d: "لكل مركبة بياناتها الخاصة.",
    s3: "بحث سهل في السجلات",
    s3d: "اختر مركبة من القائمة أدناه.",
    made: "تاريخ تصنيع الحاجز",
    factory: "مصنع مقطورات السحب",
    f1: "الرقم الفريد للحاجز",
    f2: "نوع المركبة",
    f3: "رقم هيكل المركبة",
    f4: "الشركة المصنّعة",
    f5: "اسم طراز المركبة",
    f6: "سنة طراز المركبة",
    foot: "جميع الحقوق محفوظة © الهيئة السعودية للمواصفات والمقاييس والجودة 2026",
    links: "سياسة الخصوصية | الأسئلة الشائعة",
    bot: "مرحباً، أنا المساعد. اسألني:",
    q1: "ما هذه الصفحة؟",
    a1: "تعرض هذه الصفحة معلومات سجل المركبة. اختر مركبة من القائمة لعرض تفاصيلها.",
    q2: "هل هي رسمية؟",
    a2:"نعم",
    truck: "شاحنة",
    trailer: "مقطورة",
    bus: "حافلة",
    tanker: "ناقلة"
  }
};


// Arabic is always the default when the page opens.
let lang = "ar";
let cur = 0;
let sl = 0;

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

const t = key => T[lang][key] ?? key;

function fmt(date) {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}


function renderRec() {
  const record = VEHICLE_RECORDS[cur];

  // Green factory heading translates with the selected language.
  $("#fac").textContent = t("factory");

  // Manufacture date label translates; the date stays the same.
  const made = $("#made");

  if (record.date) {
    made.textContent = `${t("made")} ${fmt(record.date)}`;
    made.hidden = false;
  } else {
    made.textContent = "";
    made.hidden = true;
  }

  // Vehicle details.
  $("#o1").textContent = record.id;
  $("#o2").textContent = t(record.type);
  $("#o3").textContent = record.vin;
  $("#o4").textContent = record.brand;

  // Translate the model name when a translation exists.
  $("#o5").textContent = t(record.model.toLowerCase());

  $("#o6").textContent = record.year;
}


function chips() {
  $("#chips").innerHTML = ["1", "2"]
    .map(n => `<button data-a="${n}">${t("q" + n)}</button>`)
    .join("");

  $("#ans").textContent = "";
}

function applyLang() {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  $$("[data-t]").forEach(element => {
    element.textContent = t(element.dataset.t);
  });

  renderRec();
  chips();
}

// Switch between Arabic and English.
$("#lang").onclick = () => {
  lang = lang === "ar" ? "en" : "ar";
  applyLang();
};

// Burger menu.
$("#burger").onclick = () => {
  const isOpen = $("#menu").classList.toggle("open");
  $("#burger").setAttribute("aria-expanded", isOpen);
};

// Slider transition.
function go(nextIndex) {
  const slides = $$(".slide");
  const dots = $$(".dots i");

  if (!slides.length) return;

  const oldIndex = sl;
  const newIndex = (nextIndex + slides.length) % slides.length;

  if (newIndex === oldIndex) return;

  const forward =
    (newIndex - oldIndex + slides.length) % slides.length === 1;

  const oldSlide = slides[oldIndex];
  const newSlide = slides[newIndex];

  newSlide.style.transition = "none";
  newSlide.style.transform = `translateX(${forward ? "100%" : "-100%"})`;
  newSlide.classList.add("on");

  // Force the browser to apply the starting position.
  newSlide.offsetWidth;

  newSlide.style.transition = "transform 0.2s ease-out";
  oldSlide.style.transition = "transform 0.2s ease-out";

  newSlide.style.transform = "translateX(0)";
  oldSlide.style.transform = `translateX(${forward ? "-100%" : "100%"})`;

  if (dots[oldIndex]) dots[oldIndex].classList.remove("on");
  if (dots[newIndex]) dots[newIndex].classList.add("on");

  sl = newIndex;

  setTimeout(() => {
    oldSlide.classList.remove("on");
    oldSlide.style.transition = "";
    oldSlide.style.transform = "";
  }, 220);
}

$("#prev").onclick = () => go(sl - 1);
$("#next").onclick = () => go(sl + 1);

// Assistant panel.
const toggleBot = () => $("#bot").classList.toggle("open");

$("#avatar").onclick = toggleBot;
$("#fab").onclick = toggleBot;

$("#chips").onclick = event => {
  const button = event.target.closest("button[data-a]");

  if (button) {
    $("#ans").textContent = t("a" + button.dataset.a);
  }
};

// Apply Arabic immediately when the page loads.
applyLang();
