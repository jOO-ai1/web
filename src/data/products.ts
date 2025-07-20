export const collections = [
  {
    id: "luxury",
    name: { ar: "الفخامة", en: "Luxury" },
    desc: { ar: "أناقة لا مثيل لها.", en: "Unmatched elegance." },
    image: "https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "sport",
    name: { ar: "رياضية", en: "Sport" },
    desc: { ar: "للأداء العالي.", en: "For high performance." },
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "casual",
    name: { ar: "كاجوال", en: "Casual" },
    desc: { ar: "راحة وأناقة يومية.", en: "Everyday comfort & style." },
    image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
];

export const products = [
  {
    id: 1,
    name: { ar: "Soleva Zenith", en: "Soleva Zenith" },
    price: 3900,
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600",
    desc: {
      ar: "حذاء رياضي فخم بخامات عالية وفينيش ذهبي.",
      en: "Luxury athletic shoe with premium materials and gold finish."
    },
    specs: {
      ar: [["الخامة", "جلد طبيعي"], ["النعل", "مطاط فاخر"], ["اللون", "أسود/ذهبي"]],
      en: [["Material", "Genuine Leather"], ["Sole", "Premium Rubber"], ["Color", "Black/Gold"]]
    },
    collection: "luxury",
    colors: [
      { name: { ar: "أسود/ذهبي", en: "Black/Gold" }, code: "#191919" },
      { name: { ar: "أبيض/ذهبي", en: "White/Gold" }, code: "#f3f3f3" }
    ],
    sizes: [40, 41, 42, 43, 44]
  },
  {
    id: 2,
    name: { ar: "Soleva Aero", en: "Soleva Aero" },
    price: 2600,
    image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=600",
    desc: {
      ar: "خفيف الوزن، مثالي للجري.",
      en: "Lightweight, perfect for running."
    },
    specs: {
      ar: [["الخامة", "شبك مقاوم"], ["النعل", "مطاط مرن"], ["اللون", "أبيض/بيج"]],
      en: [["Material", "Resistant Mesh"], ["Sole", "Flexible Rubber"], ["Color", "White/Beige"]]
    },
    collection: "sport",
    colors: [
      { name: { ar: "أبيض", en: "White" }, code: "#f9f9f9" },
      { name: { ar: "بيج", en: "Beige" }, code: "#e7d8c6" }
    ],
    sizes: [39, 40, 41, 42, 43]
  },
  {
    id: 3,
    name: { ar: "Soleva Urban", en: "Soleva Urban" },
    price: 2100,
    image: "https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=600",
    desc: {
      ar: "كاجوال أنيق لكل يوم.",
      en: "Elegant casual for every day."
    },
    specs: {
      ar: [["الخامة", "قماش فاخر"], ["النعل", "مطاط"], ["اللون", "بيج"]],
      en: [["Material", "Premium Canvas"], ["Sole", "Rubber"], ["Color", "Beige"]]
    },
    collection: "casual",
    colors: [
      { name: { ar: "بيج", en: "Beige" }, code: "#e7d8c6" },
      { name: { ar: "رمادي", en: "Gray" }, code: "#bdbdbd" }
    ],
    sizes: [40, 41, 42, 43]
  },
];