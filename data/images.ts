/**
 * Image credits
 * All photos are from Pexels (https://www.pexels.com), free to use under the Pexels License.
 * Photographers are credited on each Pexels photo page: https://www.pexels.com/photo/{id}/
 * Every URL below was checked to return HTTP 200 and was reviewed visually.
 * When an image fails to load, SafeImage falls back to an indigo-to-linen gradient with the weave mark.
 */

const px = (id: number, w = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

type Alt = { en: string; id: string };
export interface ImageAsset {
  src: string;
  alt: Alt;
}

const make = (id: number, en: string, idn: string): ImageAsset => ({
  src: px(id),
  alt: { en, id: idn },
});

export const IMAGES = {
  cotton: make(28762830, "Folded teal cotton fabric, close up", "Kain katun teal terlipat, jarak dekat"),
  cottonWhite: make(7640927, "White cotton cloth, close up", "Kain katun putih, jarak dekat"),
  linen: make(7794365, "Natural linen weave, macro", "Anyaman linen alami, makro"),
  linenSoft: make(8774406, "Soft draped linen fabric", "Kain linen lembut yang jatuh"),
  denimLight: make(4049757, "Light blue denim texture", "Tekstur denim biru muda"),
  denimIndigo: make(235525, "Dark indigo denim texture", "Tekstur denim indigo gelap"),
  denimMid: make(173207, "Mid blue denim twill", "Twill denim biru sedang"),
  twill: make(10912871, "Teal twill weave, close up", "Anyaman twill teal, jarak dekat"),
  knitWhite: make(6843269, "White knit fabric, close up", "Kain rajut putih, jarak dekat"),
  knitBeige: make(6843263, "Beige textured knit fabric", "Kain rajut bertekstur warna beige"),
  mesh: make(4597808, "Grey mesh knit with open holes", "Rajut mesh abu-abu dengan lubang terbuka"),
  fleece: make(3614132, "Brown brushed knit fabric", "Kain rajut brushed warna cokelat"),
  technical: make(459473, "Dark technical fabric texture", "Tekstur kain teknis gelap"),
  rayon: make(19203177, "Smooth light blue draped fabric", "Kain biru muda halus yang jatuh"),
  crumpled: make(5908326, "Crumpled natural fabric", "Kain alami yang kusut"),
  bedding: make(4108807, "White cotton bedding", "Sprei katun putih"),
  beddingWhite: make(212269, "White bed linen", "Linen tempat tidur putih"),
  green: make(6276062, "Green woven textile, close up", "Tekstil tenun hijau, jarak dekat"),
  yarnCones: make(2973400, "Industrial yarn cones on a spinning machine", "Cone benang industri di mesin pemintalan"),
  yarnColor: make(6358804, "Colorful thread cones beside fabric swatches", "Cone benang warna-warni di samping swatch kain"),
  spools: make(19644395, "Thread spools on a textile machine", "Gulungan benang di mesin tekstil"),
  spoolsMany: make(20578931, "Rows of colorful thread spools", "Deretan gulungan benang warna-warni"),
  loom: make(2892373, "Weaving loom in a textile workshop", "Alat tenun di bengkel tekstil"),
  weaving: make(6634341, "Weaving on a loom, close up", "Menenun di alat tenun, jarak dekat"),
  rolls: make(236748, "Fabric rolls stacked on warehouse racks", "Gulungan kain tersusun di rak gudang"),
  whiteRolls: make(12008080, "White fabric rolls on shelves", "Gulungan kain putih di rak"),
  swatchBook: make(259756, "Fabric color swatch books", "Buku swatch warna kain"),
  swatchFabrics: make(7147840, "Hands holding printed fabric samples", "Tangan memegang sampel kain bermotif"),
  designer: make(7256872, "Textile samples on a designer desk", "Sampel tekstil di meja desainer"),
  solar: make(29923348, "Solar panels on an industrial roof", "Panel surya di atap industri"),
  water: make(5712211, "Wastewater treatment basins from above", "Kolam pengolahan air limbah dari atas"),
  port: make(31382902, "Container terminal with cranes", "Terminal peti kemas dengan crane"),
  truck: make(14005602, "Cargo truck on a highway", "Truk kargo di jalan tol"),
  car: make(17078798, "Fabric car seats and interior", "Jok kain dan interior mobil"),
  garment: make(31112215, "Garment factory sewing line", "Lini jahit pabrik garmen"),
  uniform: make(32399719, "Textile workers in blue uniforms handling fabric", "Pekerja tekstil berseragam biru menangani kain"),
} satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof IMAGES;
