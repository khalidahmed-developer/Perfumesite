export interface OlfactoryPyramid {
  top: string[];
  heart: string[];
  base: string[];
}

export interface NoteDetail {
  profile: string;
  origin: string;
  facet: string;
}

export interface Perfume {
  id: 'printemps' | 'ete' | 'automne' | 'hiver';
  seasonName: string;
  seasonEn: string;
  frenchTitle: string;
  tagline: string;
  headline: string;
  description: string;
  price100ml: number;
  price50ml: number;
  image: string;
  glowColor: string;
  accentBorder: string;
  ambientHex: string;
  scentFamily: string;
  intensity: number; // 1 to 5
  longevity: string;
  sillage: string;
  pyramid: OlfactoryPyramid;
  dominantNotes: string[];
  perfumerNotes: string;
  inspiration: string;
  provenance: string[];
  pairing: string;
  seasonMood: string;
  bottleDetails: string;
}

export const NOTE_PROFILES: Record<string, NoteDetail> = {
  // Automne
  'Roasted Spices': {
    profile: 'Cracked Ceylon cinnamon bark, toasted nutmeg, and clove infused slowly over copper distillers.',
    origin: 'Artisanal spice gardens of Kandy & Madagascar',
    facet: 'Warm · Resinous · Piquant',
  },
  'Crisp Bergamot': {
    profile: 'Cold-pressed early-harvest citrus peel releasing an invigorating bitter-sweet sparkle.',
    origin: 'Family-owned biodynamic groves in Reggio Calabria',
    facet: 'Luminous · Tart · Elegant',
  },
  'Dried Fig Skin': {
    profile: 'Sun-dried black Mission fig rinds with deep honeyed lactonic nuances and purple tannins.',
    origin: 'Solliès-Pont, Provence terroir',
    facet: 'Velvety · Fruity · Decadent',
  },
  'Fallen Leaves Accord': {
    profile: 'The golden petrichor of damp beech and chestnut foliage decomposing into sweet forest floor.',
    origin: 'Sologne ancient hunting forests, France',
    facet: 'Earth-born · Nostalgic · Golden',
  },
  'Wild Forest Mushroom Accord': {
    profile: 'Subtle earthy cèpe and chanterelle nuances capturing mossy morning woodland dampness.',
    origin: 'Foraged in the damp understory of Chambord',
    facet: 'Earthy · Umami · Enigmatic',
  },
  'Smoked Cinnamon Bark': {
    profile: 'Aged quills gently toasted over burning fruitwood coals, imparting dry warmth without sugar.',
    origin: 'Highland agroforestry reserves in Sri Lanka',
    facet: 'Smoky · Dry Spice · Comforting',
  },
  'Spiced Baltic Amber': {
    profile: 'A golden fossilized resin accord enriched with benzoin, labdanum, and bourbon vanilla.',
    origin: 'Fossilized pinus succinifera resins from the Baltic coast',
    facet: 'Balsamic · Enveloping · Aristocratic',
  },
  'Damp French Oakwood': {
    profile: 'Seasoned Quercus robur heartwood, macerated with cognac lees and ancient moss tannins.',
    origin: 'Tronçais forest, sustainably managed oak reserves',
    facet: 'Woody · Structured · Sacred',
  },
  'Opoponax Resin': {
    profile: 'Sweet holy myrrh tears delivering deep honeyed resinous smoke with balsamic undertones.',
    origin: 'Wild collectors on the arid plateaus of the Levant',
    facet: 'Incense · Honeyed · Eternal',
  },

  // Printemps
  'Dewy Cherry Blossom': {
    profile: 'Delicate pink sakura petals steam-distilled at dawn while still heavy with dew crystals.',
    origin: 'Luberon orchard valleys, Provence',
    facet: 'Floral · Dew-drenched · Ethereal',
  },
  'Calabrian Bergamot Mist': {
    profile: 'Airy, effervescent citrus vapor that clears the senses like morning rain.',
    origin: 'Artisanal seaside groves, Calabria',
    facet: 'Crisp · Vibrant · Sunny',
  },
  'Crushed Green Leaves': {
    profile: 'The raw, verdant snap of broken stems, young saplings, and chlorophyll.',
    origin: 'Royal Tuileries botanical conservatories, Paris',
    facet: 'Green · Crisp · Vital',
  },
  'Wild Forest Lily': {
    profile: 'Pure white woodland bells blooming hidden beneath ferns, radiating sweet clean nectar.',
    origin: 'Fontainebleau natural forest sanctuaries',
    facet: 'Pure Floral · Creamy · Serene',
  },
  'White Cyclamen': {
    profile: 'Silky alpine petals offering an airy, watery floral aura with faint peppery nuances.',
    origin: 'Sub-alpine slopes of the French Jura',
    facet: 'Water-floral · Refined · Pristine',
  },
  'Young Fern Fronds': {
    profile: 'Curled fiddleheads uncoiling in early April, exuding wet emerald mineral petrichor.',
    origin: 'Shaded ravines of the Massif Central',
    facet: 'Foliage · Mineral · Cool',
  },
  'Wet French Earth': {
    profile: 'The celebrated smell of soil awakened by spring rain; pure geomin and rich loam.',
    origin: 'Terroir of the Grasse foothills',
    facet: 'Petrichor · Loamy · Primal',
  },
  'Oakmoss Absolute': {
    profile: 'Lichens harvested from century-old oaks, bringing velvety forest depth and chypre nobility.',
    origin: 'Forest of Rambouillet, France',
    facet: 'Chypre · Velvety · Deep Green',
  },
  'Soft White Sandalwood': {
    profile: 'Creamy, buttery wood grains that soften the green wet earth into a lasting cashmere finish.',
    origin: 'Sustainable New Caledonian santalum album reserves',
    facet: 'Milky Wood · Radiant · Comforting',
  },

  // Été
  'Sun-Drenched Citrus': {
    profile: 'Warm golden citrons baked under the midday Mediterranean sun, brimming with essential oils.',
    origin: 'Menton terraced orchards, French Riviera',
    facet: 'Solar · Juicy · Radiant',
  },
  'Mandarin Zest': {
    profile: 'Sharp, tingling red mandarin oils bursting as the peel is snapped between fingers.',
    origin: 'Seaside groves of Cap Corse, Corsica',
    facet: 'Sparkling · Tangy · Uplifting',
  },
  'Mediterranean Sea Salt': {
    profile: 'Crystalline fleur de sel dried by maritime mistral winds on shoreline granite rocks.',
    origin: 'Camargue salt pans & Cap d’Antibes shore',
    facet: 'Saline · Mineral · Oceanic',
  },
  'Wild Coastal Blooms': {
    profile: 'Hardy sea lavender and yellow rock roses clinging to sun-scorched limestone cliffs.',
    origin: 'Calanques de Cassis cliffs, Provence',
    facet: 'Herbaceous Floral · Honeyed · Warm',
  },
  'Neroli Bigarade': {
    profile: 'Precious bitter orange flowers hydro-distilled to capture their sweet, heady white floral heart.',
    origin: 'Vallauris & Grasse heritage estates',
    facet: 'Luminescent · Royal · Seductive',
  },
  'Sea Buckthorn Berry': {
    profile: 'Bright orange coastal berries yielding a tart, golden-amber pulp loaded with antioxidants.',
    origin: 'Wild coastal dunes of the Atlantic littoral',
    facet: 'Golden Acidic · Wild · Vibrant',
  },
  'Sun-Bleached Driftwood': {
    profile: 'Weathered cedar and maritime pine smoothed by decades of saltwater and blazing sun.',
    origin: 'Beaches of Saint-Tropez & Porquerolles',
    facet: 'Dry Wood · Saline · Sun-warmed',
  },
  'Warm Ambergris Accord': {
    profile: 'An ethical cruelty-free ambergris harmony radiating animalic skin warmth and marine depth.',
    origin: 'Formulated in the Quatréa Paris Atelier',
    facet: 'Skin-scent · Sensual · Oceanic',
  },
  'Golden Immortelle': {
    profile: 'Everlasting wild yellow flowers that smell of warm curry leaf, dried maple, and warm sun.',
    origin: 'Corsican maquis wilderness',
    facet: 'Dry Hay · Honeyed · Solar',
  },

  // Hiver
  'Frosted Pine Needles': {
    profile: 'Silver fir and Siberian pine needles glazed with glacial ice crystals, snapped in cold air.',
    origin: 'High-altitude Chamonix Mont-Blanc forests',
    facet: 'Balsamic · Crystalline · Crisp',
  },
  'Icy Juniper Berry': {
    profile: 'Frozen blue-black berries releasing sharp aromatic gin-like freshness with glacial clarity.',
    origin: 'Wild alpine slopes of Haute-Savoie',
    facet: 'Aromatic · Pungent · Glacial',
  },
  'Glacial Aldehydes': {
    profile: 'Clean, sparkling air accords evoking sub-zero mountain breath and high-altitude starlight.',
    origin: 'Synthesized in Grasse using green chemistry',
    facet: 'Effervescent · Metallic-clean · Airy',
  },
  'Winter Spices': {
    profile: 'A whisper of crushed star anise, black pepper, and candied ginger warmed in copper.',
    origin: 'Spice vaults of the Old Port of Marseille',
    facet: 'Sparkling Heat · Complex · Enlivening',
  },
  'White Cardamom': {
    profile: 'Bleached pod kernels yielding an ethereal, cool-yet-warm spicy vapor of peerless elegance.',
    origin: 'Cloud-forest reserves of the Western Ghats',
    facet: 'Camphorous · Aristocratic · Spicy',
  },
  'Snow Orchid Petals': {
    profile: 'Rare winter-blooming botanical orchids offering a subtle, powdery floral veil.',
    origin: 'Alpine botanical conservatory in Grenoble',
    facet: 'Powdery · Velvet · Delicate',
  },
  'Warm Atlas Cedarwood': {
    profile: 'Dense, aromatic evergreen heartwood creating an impenetrable sanctuary of comforting warmth.',
    origin: 'High-altitude Atlas mountain forests',
    facet: 'Resinous Wood · Dry · Protective',
  },
  'Hojari Frankincense': {
    profile: 'Royal Green Hojari tears burning over white charcoal; crystalline citrus smoke and holy peace.',
    origin: 'Dhofar plateau desert cliffs, Oman',
    facet: 'Sacred Smoke · Meditative · Pure',
  },
  'Velvet Cashmere Musk': {
    profile: 'An enveloping skin accord mimicking the warmth of a heavy ivory cashmere throw by the fire.',
    origin: 'Formulated in the Quatréa Paris Atelier',
    facet: 'Intimate · Soft · Hypnotic',
  },
};

export const PERFUMES: Perfume[] = [
  {
    id: 'printemps',
    seasonName: 'Printemps',
    seasonEn: 'Spring',
    frenchTitle: 'Printemps — Eau de Parfum',
    tagline: 'Cherry Blossom, Wet Earth & Fresh Foliage',
    headline: 'The rebirth of nature, captured in a scent.',
    description:
      'A poetic dawn in the orchards of Grasse. Morning dew clings to early cherry blossoms while moss and loam awaken beneath the damp soil, breathing vitality into the crisp Parisian air.',
    price100ml: 240,
    price50ml: 155,
    image: '/assets/aistudio/Spring_Perfume_PrintTemps__e091740e.jpg',
    glowColor: 'rgba(243, 198, 207, 0.35)',
    accentBorder: 'rgba(243, 198, 207, 0.45)',
    ambientHex: '#F3C6CF',
    scentFamily: 'Floral Dew & Green Earth',
    intensity: 4,
    longevity: '9 — 11 Hours',
    sillage: 'Airy, Luminous Halo',
    pyramid: {
      top: ['Dewy Cherry Blossom', 'Calabrian Bergamot Mist', 'Crushed Green Leaves'],
      heart: ['Wild Forest Lily', 'White Cyclamen', 'Young Fern Fronds'],
      base: ['Wet French Earth', 'Oakmoss Absolute', 'Soft White Sandalwood'],
    },
    dominantNotes: ['Cherry Blossom', 'Wet Earth', 'Wild Lily', 'Bergamot Mist'],
    perfumerNotes:
      '“With Printemps, I wanted the bottle to open like a rain-drenched greenhouse in April. You smell the chill of wet cobblestones melting into warm, sweet floral petrichor.” — Éléonore Vasseur, Master Perfumer',
    inspiration:
      'The fleeting bloom of Japanese Sakura transplanted into the royal Tuileries gardens during the first warm morning mist of April.',
    provenance: [
      'Cherry blossom petals steam-distilled in Luberon',
      'Wild forest oakmoss sustainably foraged in Fontainebleau',
      'Cold-pressed bergamot oil from artisanal groves in Calabria',
    ],
    pairing: 'Ideal with crisp linen, morning strolls, and delicate cashmere layers.',
    seasonMood: 'Awakening · Luminous · Poetic',
    bottleDetails: 'Heavy-gauge lead-free crystal with hand-chiseled botanical relief and brushed champagne brass cap.',
  },
  {
    id: 'ete',
    seasonName: 'Été',
    seasonEn: 'Summer',
    frenchTitle: 'Été — Eau de Parfum',
    tagline: 'Sun-Drenched Citrus, Coastal Blooms & Sea Salt',
    headline: 'The warmth of the sun, captured in a scent.',
    description:
      'The golden radiance of the Côte d’Azur caught at twilight. Mediterranean citrus groves baking under the midday heat, softened by maritime breezes and crystalline sea-spray over wild shoreline flora.',
    price100ml: 240,
    price50ml: 155,
    image: '/assets/aistudio/Summer_Perfume_ETE__da8578e1.jpg',
    glowColor: 'rgba(230, 161, 69, 0.35)',
    accentBorder: 'rgba(230, 161, 69, 0.45)',
    ambientHex: '#E6A145',
    scentFamily: 'Solar Citrus & Maritime Amber',
    intensity: 4,
    longevity: '8 — 10 Hours',
    sillage: 'Vibrant, Radiant Trail',
    pyramid: {
      top: ['Sun-Drenched Citrus', 'Mandarin Zest', 'Mediterranean Sea Salt'],
      heart: ['Wild Coastal Blooms', 'Neroli Bigarade', 'Sea Buckthorn Berry'],
      base: ['Sun-Bleached Driftwood', 'Warm Ambergris Accord', 'Golden Immortelle'],
    },
    dominantNotes: ['Sun-Drenched Citrus', 'Neroli', 'Coastal Blooms', 'Sea Salt'],
    perfumerNotes:
      '“Été captures the sensation of heated salt crystals clinging to sun-warmed skin while sipping bitter mandarin nectar under pine shade.” — Éléonore Vasseur, Master Perfumer',
    inspiration:
      'The rocky coves of Saint-Jean-Cap-Ferrat, where wild neroli meets sea salt on limestone cliffs at 6 PM.',
    provenance: [
      'Grasse neroli blossom hydro-distillate',
      'Hand-harvested sea buckthorn berries from coastal dunes',
      'Aged driftwood essence macerated in organic wheat spirit',
    ],
    pairing: 'Pairs exquisitely with silk foulards, warm sunset ocean breezes, and golden-hour cocktails.',
    seasonMood: 'Solar · Exuberant · Mediterranean',
    bottleDetails: 'Warm amber liquid encased in faceted crystal reflecting late-afternoon golden rays.',
  },
  {
    id: 'automne',
    seasonName: 'Automne',
    seasonEn: 'Autumn',
    frenchTitle: 'Automne — Eau de Parfum',
    tagline: 'Spiced Amber, Damp Wood & Fallen Leaves',
    headline: 'The richness of the earth, captured in a scent.',
    description:
      'A tranquil afternoon in the Sologne forests. Golden leaves carpet the mossy undergrowth as warm spices, roasted chestnut bark, and smoldering resins swirl into an intoxicating cloak of comfort.',
    price100ml: 255,
    price50ml: 165,
    image: '/assets/aistudio/Autumn_Perfume_AUTOMNE_059b9ee9.jpg',
    glowColor: 'rgba(140, 74, 39, 0.35)',
    accentBorder: 'rgba(140, 74, 39, 0.45)',
    ambientHex: '#8C4A27',
    scentFamily: 'Spiced Wood & Deep Amber',
    intensity: 5,
    longevity: '12 — 14 Hours',
    sillage: 'Velvety, Enveloping Presence',
    pyramid: {
      top: ['Roasted Spices', 'Crisp Bergamot', 'Dried Fig Skin'],
      heart: ['Fallen Leaves Accord', 'Wild Forest Mushroom Accord', 'Smoked Cinnamon Bark'],
      base: ['Spiced Baltic Amber', 'Damp French Oakwood', 'Opoponax Resin'],
    },
    dominantNotes: ['Roasted Spices', 'Damp Oakwood', 'Fallen Leaves', 'Spiced Amber'],
    perfumerNotes:
      '“Automne is my homage to solitude and introspection. It smells like crackling firewood, ancient library leather, and damp woodland soil after a heavy October downpour.” — Éléonore Vasseur, Master Perfumer',
    inspiration:
      'The misty morning walks in the hunting woods of Chambord, surrounded by centuries-old oak and golden beech trees.',
    provenance: [
      'Smoked cinnamon and roasted tonka bean infusion',
      'Sustainably harvested damp oakwood chips from Burgundy barrels',
      'Artisanal opoponax resin harvested by wild collectors in the Levant',
    ],
    pairing: 'Complements structured wool overcoats, dark evenings, fireplace conversations, and vintage wines.',
    seasonMood: 'Introspective · Enveloping · Aristocratic',
    bottleDetails: 'Smoked amber-tinted crystal bottle with deep brass collar and antique wax-seal relief.',
  },
  {
    id: 'hiver',
    seasonName: 'Hiver',
    seasonEn: 'Winter',
    frenchTitle: 'Hiver — Eau de Parfum',
    tagline: 'Frosted Pine, Warm Cedarwood & Winter Spice',
    headline: 'The stillness of the cold, captured in a scent.',
    description:
      'The quiet majesty of a snow-covered alpine sanctuary. Frost glazes evergreen needles and silver fir boughs, gently warmed from within by rare white cardamom, frankincense smoke, and velvety cashmere musk.',
    price100ml: 260,
    price50ml: 170,
    image: '/assets/aistudio/Winter_Perfume_Hiver_9cf6407a.jpg',
    glowColor: 'rgba(208, 225, 232, 0.35)',
    accentBorder: 'rgba(208, 225, 232, 0.45)',
    ambientHex: '#D0E1E8',
    scentFamily: 'Frosted Conifer & Velvet Musk',
    intensity: 5,
    longevity: '12 — 16 Hours',
    sillage: 'Crisp, Majestic, Hypnotic',
    pyramid: {
      top: ['Frosted Pine Needles', 'Icy Juniper Berry', 'Glacial Aldehydes'],
      heart: ['Winter Spices', 'White Cardamom', 'Snow Orchid Petals'],
      base: ['Warm Atlas Cedarwood', 'Hojari Frankincense', 'Velvet Cashmere Musk'],
    },
    dominantNotes: ['Frosted Pine', 'White Cardamom', 'Atlas Cedarwood', 'Frankincense'],
    perfumerNotes:
      '“Hiver is the juxtaposition of extreme crystalline frost and profound sanctuary heat. It freezes in the air, then melts into skin like warm velvet cashmere.” — Éléonore Vasseur, Master Perfumer',
    inspiration:
      'The midnight silence in the pine forests above Chamonix during a pristine snowfall under a starry winter sky.',
    provenance: [
      'High-altitude Siberian fir needle oil steam-extracted on site',
      'Green cardamom pods from southern Indian cloud forests',
      'Royal Green Hojari frankincense resin from the Dhofar plateau',
    ],
    pairing: 'Ideal with heavy cashmere knits, winter gala attire, and crisp frost-lit evenings.',
    seasonMood: 'Majestic · Contemplative · Crystalline',
    bottleDetails: 'Frosted botanical relief glass, cool silver-brushed metal cap, and diamond-cut facets.',
  },
];

export const BRAND_INFO = {
  name: 'Quatréa',
  fullName: 'Quatréa — La Maison des Saisons',
  origin: 'Paris, France',
  founded: '1892',
  address: '28 Place Vendôme, 75001 Paris',
  phone: '+33 1 42 68 89 00',
  email: 'concierge@quatrea-parfums.fr',
  motto: 'L’Artisanat des Quatre Saisons dans l’Éternité du Flacon',
};
