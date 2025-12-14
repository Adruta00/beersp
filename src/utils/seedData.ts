// src/utils/seedData.ts - INTEGRADO COMPLETO
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();

// Usuarios de ejemplo
const SAMPLE_USERS = [
  {
    userId: 'sample-user-maria-001',
    username: 'maria_cervecera',
    email: 'maria@ejemplo.com',
    birthdate: '1990-05-15',
    fullName: 'María García',
    location: 'Madrid, España',
    bio: 'Amante de las cervezas artesanales y los viajes 🍺✈️',
    tastingsCount: 45,
    venuesAdded: 8,
    lastSevenDaysTastings: 3,
    lastSevenDaysVenues: 1
  },
  {
    userId: 'sample-user-carlos-002',
    username: 'carlos_beer',
    email: 'carlos@ejemplo.com',
    birthdate: '1988-08-22',
    fullName: 'Carlos Rodríguez',
    location: 'Barcelona, España',
    bio: 'Explorador de cervezas del mundo 🌍',
    tastingsCount: 78,
    venuesAdded: 12,
    lastSevenDaysTastings: 5,
    lastSevenDaysVenues: 2
  },
  {
    userId: 'sample-user-ana-003',
    username: 'ana_craftbeer',
    email: 'ana@ejemplo.com',
    birthdate: '1992-03-10',
    fullName: 'Ana Martínez',
    location: 'Valencia, España',
    bio: 'Sommelier de cerveza certificada 🏆',
    tastingsCount: 120,
    venuesAdded: 15,
    lastSevenDaysTastings: 7,
    lastSevenDaysVenues: 3
  },
  {
    userId: 'sample-user-javi-004',
    username: 'javi_beerlover',
    email: 'javi@ejemplo.com',
    birthdate: '1985-11-30',
    fullName: 'Javier López',
    location: 'Sevilla, España',
    bio: 'Coleccionista de cervezas internacionales 🍻',
    tastingsCount: 95,
    venuesAdded: 10,
    lastSevenDaysTastings: 4,
    lastSevenDaysVenues: 2
  },
  {
    userId: 'sample-user-laura-005',
    username: 'laura_hops',
    email: 'laura@ejemplo.com',
    birthdate: '1994-07-18',
    fullName: 'Laura Fernández',
    location: 'Bilbao, España',
    bio: 'IPA enthusiast 🍺',
    tastingsCount: 62,
    venuesAdded: 7,
    lastSevenDaysTastings: 2,
    lastSevenDaysVenues: 1
  },
  {
    userId: 'sample-user-pablo-006',
    username: 'pablo_stout',
    email: 'pablo.s@ejemplo.com',
    birthdate: '1991-02-14',
    fullName: 'Pablo Sánchez',
    location: 'Zaragoza, España',
    bio: 'Fan de las cervezas oscuras y robustas',
    tastingsCount: 55,
    venuesAdded: 6,
    lastSevenDaysTastings: 3,
    lastSevenDaysVenues: 1
  },
  {
    userId: 'sample-user-sofia-007',
    username: 'sofia_lager',
    email: 'sofia@ejemplo.com',
    birthdate: '1993-09-25',
    fullName: 'Sofía Ruiz',
    location: 'Málaga, España',
    bio: 'Cervecera casera 🏠🍺',
    tastingsCount: 40,
    venuesAdded: 5,
    lastSevenDaysTastings: 2,
    lastSevenDaysVenues: 1
  },
  {
    userId: 'sample-user-diego-008',
    username: 'diego_brewmaster',
    email: 'diego@ejemplo.com',
    birthdate: '1987-12-03',
    fullName: 'Diego Morales',
    location: 'Granada, España',
    bio: 'Maestro cervecero en formación',
    tastingsCount: 110,
    venuesAdded: 14,
    lastSevenDaysTastings: 6,
    lastSevenDaysVenues: 2
  },
  {
    userId: 'sample-user-elena-009',
    username: 'elena_pilsen',
    email: 'elena@ejemplo.com',
    birthdate: '1995-06-17',
    fullName: 'Elena Torres',
    location: 'Alicante, España',
    bio: 'Catadora profesional de cerveza',
    tastingsCount: 85,
    venuesAdded: 9,
    lastSevenDaysTastings: 4,
    lastSevenDaysVenues: 2
  },
  {
    userId: 'sample-user-miguel-010',
    username: 'miguel_ale',
    email: 'miguel@ejemplo.com',
    birthdate: '1989-04-20',
    fullName: 'Miguel Ángel Vega',
    location: 'Santander, España',
    bio: 'Viajero cervecero internacional 🌎',
    tastingsCount: 130,
    venuesAdded: 18,
    lastSevenDaysTastings: 8,
    lastSevenDaysVenues: 3
  }
];

// IMPORTAR CERVEZAS Y LOCALES DEL services/seedData.ts
// Estas son TODAS las cervezas que deben aparecer en la web
const INITIAL_BEERS = [
  // --- ESPAÑA ---
  { name: "Alhambra Reserva 1925", style: "LAGER", country: "ES", color: "GOLDEN_YELLOW", alcoholPercentage: 6.4, ibu: 25, description: "Iconica lager premium de Granada, intensa y con cuerpo." },
  { name: "Mahou 5 Estrellas", style: "LAGER", country: "ES", color: "GOLDEN_YELLOW", alcoholPercentage: 5.5, ibu: 27, description: "El sabor clásico de Madrid, equilibrada y refrescante." },
  { name: "Estrella Galicia Especial", style: "LAGER", country: "ES", color: "LIGHT_GOLD", alcoholPercentage: 5.5, ibu: 25, description: "Cerveza gallega de sabor lupulado y refrescante." },
  { name: "Estrella Damm", style: "LAGER", country: "ES", color: "LIGHT_GOLD", alcoholPercentage: 5.4, ibu: 21, description: "La cerveza del mediterráneo, elaborada con arroz." },
  { name: "Cruzcampo Gran Reserva", style: "LAGER", country: "ES", color: "LIGHT_AMBER", alcoholPercentage: 6.4, ibu: 25, description: "Lager tostada de larga maduración." },
  { name: "San Miguel Especial", style: "LAGER", country: "ES", color: "LIGHT_GOLD", alcoholPercentage: 5.4, ibu: 28, description: "Cerveza internacional española con notas de cereal." },
  { name: "Voll-Damm Doble Malta", style: "AMBER_ALE", country: "ES", color: "LIGHT_AMBER", alcoholPercentage: 7.2, ibu: 35, description: "Märzenbier de cuerpo intenso y sabor tostado." },
  { name: "Ambar Export", style: "LAGER", country: "ES", color: "LIGHT_AMBER", alcoholPercentage: 7.0, ibu: 28, description: "Cerveza con tres maltas, robusta y sabrosa." },
  { name: "1906 Reserva Especial", style: "LAGER", country: "ES", color: "LIGHT_AMBER", alcoholPercentage: 6.5, ibu: 30, description: "La milnueve, tostada con notas de caramelo y café." },
  { name: "1906 Red Vintage", style: "AMBER_ALE", country: "ES", color: "LIGHT_AMBER", alcoholPercentage: 8.0, ibu: 28, description: "La colorada, intensa y equilibrada." },
  { name: "1906 Black Coupage", style: "PORTER", country: "ES", color: "OPAQUE_BLACK", alcoholPercentage: 7.2, ibu: 35, description: "Cerveza negra con aromas de café y chocolate." },
  { name: "Moritz 7", style: "LAGER", country: "ES", color: "LIGHT_GOLD", alcoholPercentage: 5.5, ibu: 25, description: "Premium lager de Barcelona 100% malta." },
  { name: "La Virgen Madrid Lager", style: "LAGER", country: "ES", color: "LIGHT_GOLD", alcoholPercentage: 5.2, ibu: 22, description: "Lager artesana madrileña, fresca y sin filtrar." },
  { name: "La Virgen Jamonera", style: "AMBER_ALE", country: "ES", color: "LIGHT_AMBER", alcoholPercentage: 5.5, ibu: 20, description: "Amber Ale tostada ideal para acompañar embutidos." },
  { name: "La Virgen 360", style: "APA", country: "ES", color: "LIGHT_GOLD", alcoholPercentage: 5.0, ibu: 35, description: "Pale Ale muy aromática y lupulada." },
  { name: "Arriaca IPA", style: "IPA", country: "ES", color: "LIGHT_AMBER", alcoholPercentage: 6.9, ibu: 60, description: "IPA artesana de Guadalajara potente y cítrica." },
  { name: "Dougall's IPA 4", style: "IPA", country: "ES", color: "LIGHT_GOLD", alcoholPercentage: 6.0, ibu: 55, description: "IPA cántabra de referencia, muy bebible." },
  { name: "Basqueland Imparable", style: "IPA", country: "ES", color: "GOLDEN_YELLOW", alcoholPercentage: 6.8, ibu: 62, description: "West Coast IPA vasca muy premiada." },

  // --- ALEMANIA ---
  { name: "Paulaner Hefe-Weissbier", style: "WEISSBIER", country: "DE", color: "GOLDEN_YELLOW", alcoholPercentage: 5.5, ibu: 12, description: "La cerveza de trigo número 1 en Alemania." },
  { name: "Paulaner Salvator", style: "LAGER", country: "DE", color: "DARK_BROWN", alcoholPercentage: 7.9, ibu: 28, description: "Doppelbock fuerte y maltosa." },
  { name: "Erdinger Weissbier", style: "WEISSBIER", country: "DE", color: "GOLDEN_YELLOW", alcoholPercentage: 5.3, ibu: 13, description: "Clásica de trigo bávara." },
  { name: "Erdinger Dunkel", style: "WEISSBIER", country: "DE", color: "DARK_BROWN", alcoholPercentage: 5.3, ibu: 14, description: "Trigo oscura con notas tostadas." },
  { name: "Franziskaner Weissbier", style: "WEISSBIER", country: "DE", color: "GOLDEN_YELLOW", alcoholPercentage: 5.0, ibu: 12, description: "Suave, con notas de plátano y clavo." },
  { name: "Weihenstephaner Hefe Weissbier", style: "WEISSBIER", country: "DE", color: "GOLDEN_YELLOW", alcoholPercentage: 5.4, ibu: 14, description: "De la cervecería más antigua del mundo." },
  { name: "Augustiner Helles", style: "LAGER", country: "DE", color: "LIGHT_GOLD", alcoholPercentage: 5.2, ibu: 18, description: "La lager favorita de Múnich." },
  { name: "Beck's", style: "PILSNER", country: "DE", color: "LIGHT_GOLD", alcoholPercentage: 5.0, ibu: 33, description: "Pilsner del norte, seca y amarga." },
  { name: "Bitburger Premium Pils", style: "PILSNER", country: "DE", color: "LIGHT_GOLD", alcoholPercentage: 4.8, ibu: 32, description: "La pilsner de grifo más famosa." },
  { name: "Krombacher Pils", style: "PILSNER", country: "DE", color: "LIGHT_GOLD", alcoholPercentage: 4.8, ibu: 24, description: "Pilsner con agua de manantial de roca." },

  // --- BÉLGICA ---
  { name: "Chimay Azul", style: "AMBER_ALE", country: "BE", color: "DARK_BROWN", alcoholPercentage: 9.0, ibu: 35, description: "Trapense oscura, compleja y afrutada." },
  { name: "Chimay Roja", style: "AMBER_ALE", country: "BE", color: "LIGHT_AMBER", alcoholPercentage: 7.0, ibu: 19, description: "Dubbel trapense con notas de albaricoque." },
  { name: "Chimay Triple", style: "AMBER_ALE", country: "BE", color: "GOLDEN_YELLOW", alcoholPercentage: 8.0, ibu: 38, description: "Tripel seca y lupulada." },
  { name: "Duvel", style: "AMBER_ALE", country: "BE", color: "GOLDEN_YELLOW", alcoholPercentage: 8.5, ibu: 32, description: "Strong Ale de referencia, burbujeante." },
  { name: "Westmalle Tripel", style: "AMBER_ALE", country: "BE", color: "GOLDEN_YELLOW", alcoholPercentage: 9.5, ibu: 36, description: "La madre de todas las Tripels." },
  { name: "Westmalle Dubbel", style: "AMBER_ALE", country: "BE", color: "DARK_BROWN", alcoholPercentage: 7.0, ibu: 24, description: "Dubbel oscura y maltosa." },
  { name: "Orval", style: "SAISON", country: "BE", color: "LIGHT_AMBER", alcoholPercentage: 6.2, ibu: 32, description: "Trapense única con levadura Brettanomyces." },
  { name: "Rochefort 10", style: "AMBER_ALE", country: "BE", color: "DARK_BROWN", alcoholPercentage: 11.3, ibu: 27, description: "Quadrupel muy fuerte y compleja." },
  { name: "Leffe Blonde", style: "AMBER_ALE", country: "BE", color: "GOLDEN_YELLOW", alcoholPercentage: 6.6, ibu: 20, description: "De abadía, dulce y especiada." },
  { name: "Hoegaarden", style: "WEISSBIER", country: "BE", color: "LIGHT_GOLD", alcoholPercentage: 4.9, ibu: 15, description: "Witbier original con cilantro y naranja." },
  { name: "Stella Artois", style: "PILSNER", country: "BE", color: "LIGHT_GOLD", alcoholPercentage: 5.0, ibu: 24, description: "Lager premium belga internacional." },
  { name: "Delirium Tremens", style: "AMBER_ALE", country: "BE", color: "GOLDEN_YELLOW", alcoholPercentage: 8.5, ibu: 24, description: "Famosa por el elefante rosa y su fuerza." },

  // --- REINO UNIDO E IRLANDA ---
  { name: "Guinness Draught", style: "STOUT", country: "IE", color: "OPAQUE_BLACK", alcoholPercentage: 4.2, ibu: 45, description: "La stout más icónica, cremosa y tostada." },
  { name: "Guinness Extra Stout", style: "STOUT", country: "IE", color: "OPAQUE_BLACK", alcoholPercentage: 5.6, ibu: 40, description: "Versión más carbonatada y fuerte." },
  { name: "Fuller's London Pride", style: "AMBER_ALE", country: "GB", color: "LIGHT_AMBER", alcoholPercentage: 4.7, ibu: 30, description: "La bitter inglesa por excelencia." },
  { name: "BrewDog Punk IPA", style: "IPA", country: "GB", color: "LIGHT_GOLD", alcoholPercentage: 5.4, ibu: 35, description: "IPA moderna escocesa, explosión tropical." },
  { name: "BrewDog Elvis Juice", style: "IPA", country: "GB", color: "LIGHT_AMBER", alcoholPercentage: 6.5, ibu: 40, description: "IPA infusionada con pomelo." },

  // --- ESTADOS UNIDOS ---
  { name: "Sierra Nevada Pale Ale", style: "APA", country: "US", color: "LIGHT_AMBER", alcoholPercentage: 5.6, ibu: 38, description: "La APA que inició la revolución artesanal." },
  { name: "Lagunitas IPA", style: "IPA", country: "US", color: "LIGHT_GOLD", alcoholPercentage: 6.2, ibu: 51, description: "IPA de California icónica y balanceada." },
  { name: "Stone IPA", style: "IPA", country: "US", color: "LIGHT_AMBER", alcoholPercentage: 6.9, ibu: 71, description: "West Coast IPA clásica y amarga." },
  { name: "Samuel Adams Boston Lager", style: "LAGER", country: "US", color: "LIGHT_AMBER", alcoholPercentage: 5.0, ibu: 30, description: "Vienna lager americana compleja." },
  { name: "Brooklyn Lager", style: "LAGER", country: "US", color: "LIGHT_AMBER", alcoholPercentage: 5.2, ibu: 33, description: "Amber Lager estilo pre-prohibición." },
  { name: "Goose Island IPA", style: "IPA", country: "US", color: "LIGHT_AMBER", alcoholPercentage: 5.9, ibu: 55, description: "IPA de Chicago, floral y cítrica." },
  { name: "Budweiser", style: "LAGER", country: "US", color: "LIGHT_GOLD", alcoholPercentage: 5.0, ibu: 12, description: "La King of Beers, lager adjunta." },
  { name: "Blue Moon Belgian White", style: "WEISSBIER", country: "US", color: "LIGHT_GOLD", alcoholPercentage: 5.4, ibu: 9, description: "Trigo estilo belga con naranja." },

  // --- REPÚBLICA CHECA ---
  { name: "Pilsner Urquell", style: "PILSNER", country: "CZ", color: "LIGHT_GOLD", alcoholPercentage: 4.4, ibu: 40, description: "La primera pilsner dorada del mundo (1842)." },
  { name: "Budweiser Budvar", style: "LAGER", country: "CZ", color: "LIGHT_GOLD", alcoholPercentage: 5.0, ibu: 22, description: "La auténtica lager de České Budějovice." },
  { name: "Staropramen", style: "LAGER", country: "CZ", color: "LIGHT_GOLD", alcoholPercentage: 5.0, ibu: 27, description: "La cerveza de Praga." },

  // --- MÉXICO ---
  { name: "Corona Extra", style: "LAGER", country: "MX", color: "LIGHT_GOLD", alcoholPercentage: 4.5, ibu: 18, description: "La cerveza mexicana más famosa del mundo." },
  { name: "Modelo Especial", style: "PILSNER", country: "MX", color: "LIGHT_GOLD", alcoholPercentage: 4.4, ibu: 18, description: "Pilsner rica y completa." },
  { name: "Negra Modelo", style: "LAGER", country: "MX", color: "DARK_BROWN", alcoholPercentage: 5.3, ibu: 19, description: "Munich Dunkel estilo vienes." },
  { name: "Dos Equis Lager", style: "LAGER", country: "MX", color: "LIGHT_GOLD", alcoholPercentage: 4.2, ibu: 10, description: "Suave, maltosa y ligera." },
  { name: "Tecate", style: "LAGER", country: "MX", color: "LIGHT_GOLD", alcoholPercentage: 4.5, ibu: 14, description: "Cerveza del norte de México." },

  // --- PAÍSES BAJOS ---
  { name: "Heineken", style: "LAGER", country: "NL", color: "LIGHT_GOLD", alcoholPercentage: 5.0, ibu: 19, description: "La botella verde más reconocible del mundo." },
  { name: "Amstel", style: "LAGER", country: "NL", color: "LIGHT_GOLD", alcoholPercentage: 5.0, ibu: 18, description: "Lager holandesa de tradición." },
  { name: "Grolsch Premium Pilsner", style: "PILSNER", country: "NL", color: "LIGHT_GOLD", alcoholPercentage: 5.0, ibu: 28, description: "Con su icónico tapón 'swing-top'." },

  // --- ITALIA ---
  { name: "Peroni Nastro Azzurro", style: "LAGER", country: "IT", color: "LIGHT_GOLD", alcoholPercentage: 5.1, ibu: 24, description: "Lager italiana de estilo y frescura." },
  { name: "Birra Moretti", style: "LAGER", country: "IT", color: "LIGHT_GOLD", alcoholPercentage: 4.6, ibu: 18, description: "La cerveza del hombre del bigote." },

  // --- FRANCIA ---
  { name: "Kronenbourg 1664", style: "LAGER", country: "FR", color: "LIGHT_GOLD", alcoholPercentage: 5.0, ibu: 20, description: "La lager premium de Francia." },
  { name: "1664 Blanc", style: "WEISSBIER", country: "FR", color: "LIGHT_GOLD", alcoholPercentage: 5.0, ibu: 15, description: "Trigo con cítricos, muy afrutada." },

  // --- ASIA ---
  { name: "Asahi Super Dry", style: "LAGER", country: "JP", color: "LIGHT_GOLD", alcoholPercentage: 5.0, ibu: 16, description: "Karakuchi: sabor seco y crujiente." },
  { name: "Sapporo Premium", style: "LAGER", country: "JP", color: "LIGHT_GOLD", alcoholPercentage: 4.9, ibu: 18, description: "La cerveza más antigua de Japón." },
  { name: "Kirin Ichiban", style: "LAGER", country: "JP", color: "LIGHT_GOLD", alcoholPercentage: 5.0, ibu: 19, description: "Solo primera prensa del mosto." },
  { name: "Tsingtao", style: "LAGER", country: "CN", color: "LIGHT_GOLD", alcoholPercentage: 4.7, ibu: 15, description: "La cerveza más famosa de China." },
  { name: "Singha", style: "LAGER", country: "TH", color: "LIGHT_GOLD", alcoholPercentage: 5.0, ibu: 25, description: "Lager tailandesa original con carácter." },
  { name: "Tiger Beer", style: "LAGER", country: "SG", color: "LIGHT_GOLD", alcoholPercentage: 5.0, ibu: 18, description: "Lager tropical nacida en Singapur." },
  { name: "Kingfisher Premium", style: "LAGER", country: "IN", color: "LIGHT_GOLD", alcoholPercentage: 4.8, ibu: 18, description: "La cerveza número 1 de la India." },

  // --- LATINOAMÉRICA ---
  { name: "Quilmes Cristal", style: "LAGER", country: "AR", color: "LIGHT_GOLD", alcoholPercentage: 4.9, ibu: 15, description: "El sabor del encuentro argentino." },
  { name: "Brahma Chopp", style: "LAGER", country: "BR", color: "LIGHT_GOLD", alcoholPercentage: 4.8, ibu: 10, description: "Lager brasileña muy ligera." },
  { name: "Cusqueña Dorada", style: "LAGER", country: "PE", color: "LIGHT_GOLD", alcoholPercentage: 5.0, ibu: 20, description: "Lager premium de Perú 100% cebada." },
  { name: "Club Colombia Dorada", style: "LAGER", country: "CO", color: "LIGHT_GOLD", alcoholPercentage: 4.7, ibu: 18, description: "Lager colombiana con orgullo." },
  { name: "Cristal", style: "LAGER", country: "CL", color: "LIGHT_GOLD", alcoholPercentage: 4.6, ibu: 15, description: "La cerveza de Chile." },

  // --- OCEANIA ---
  { name: "Foster's", style: "LAGER", country: "AU", color: "LIGHT_GOLD", alcoholPercentage: 4.0, ibu: 12, description: "Famosa internacionalmente como australiana." },
  { name: "Coopers Pale Ale", style: "APA", country: "AU", color: "LIGHT_GOLD", alcoholPercentage: 4.5, ibu: 22, description: "Sparkling Ale fermentada en botella." },

  // --- OTROS EUROPA ---
  { name: "Carlsberg Pilsner", style: "PILSNER", country: "DK", color: "LIGHT_GOLD", alcoholPercentage: 5.0, ibu: 25, description: "Probablemente la mejor cerveza del mundo." },
  { name: "Super Bock", style: "LAGER", country: "PT", color: "LIGHT_GOLD", alcoholPercentage: 5.2, ibu: 22, description: "La cerveza más vendida de Portugal." },
  { name: "Sagres", style: "LAGER", country: "PT", color: "LIGHT_GOLD", alcoholPercentage: 5.0, ibu: 20, description: "Lager portuguesa seca y ligera." }
];

// TODOS LOS LOCALES
const INITIAL_VENUES = [
  // --- MADRID ---
  { name: "La Tape", address: "Calle de San Bernardo, 88", city: "Madrid", country: "ES" },
  { name: "Fábrica Maravillas", address: "Calle de Valverde, 29", city: "Madrid", country: "ES" },
  { name: "The Beer Lab", address: "Calle de Manuela Malasaña, 9", city: "Madrid", country: "ES" },
  { name: "Oldenburg", address: "Calle de Campoamor, 13", city: "Madrid", country: "ES" },
  { name: "Irreale", address: "Calle de Manuela Malasaña, 20", city: "Madrid", country: "ES" },
  { name: "Fogg Bar Birras & Cheese", address: "Calle de Moratín, 5", city: "Madrid", country: "ES" },
  { name: "Chinaski Lavapiés", address: "Calle de la Fe, 19", city: "Madrid", country: "ES" },
  { name: "Bee Beer", address: "Calle de Augusto Figueroa, 30", city: "Madrid", country: "ES" },
  { name: "El Pedal", address: "Calle de Argumosa, 33", city: "Madrid", country: "ES" },
  { name: "Mad Brewing", address: "Calle de Julián Camarillo, 19", city: "Madrid", country: "ES" },
  { name: "Taproom Madrid", address: "Calle de Andrés Mellado, 43", city: "Madrid", country: "ES" },
  { name: "Pez Tortilla", address: "Calle del Pez, 36", city: "Madrid", country: "ES" },
  { name: "Kloster", address: "Calle del Cardenal Cisneros, 25", city: "Madrid", country: "ES" },

  // --- BARCELONA ---
  { name: "BierCaB", address: "Carrer de la Muntaner, 55", city: "Barcelona", country: "ES" },
  { name: "Garage Beer Co", address: "Carrer del Consell de Cent, 261", city: "Barcelona", country: "ES" },
  { name: "Cervecería Catalana", address: "Carrer de Mallorca, 236", city: "Barcelona", country: "ES" },
  { name: "BlackLab Brewhouse", address: "Carrer de la Diputació, 251", city: "Barcelona", country: "ES" },
  { name: "La Cervesera Artesana", address: "Carrer de Sant Joaquim, 35", city: "Barcelona", country: "ES" },
  { name: "Ale&Hop", address: "Carrer de les Basses de Sant Pere, 10", city: "Barcelona", country: "ES" },
  { name: "Abirradero", address: "Carrer de Vila i Vilà, 77", city: "Barcelona", country: "ES" },
  { name: "CocoVail Beer Hall", address: "Carrer d'Aragó, 284", city: "Barcelona", country: "ES" },
  { name: "Mikkeller Bar Barcelona", address: "Carrer de València, 202", city: "Barcelona", country: "ES" },
  { name: "Kaelderkold", address: "Carrer del Cardenal Casañas, 7", city: "Barcelona", country: "ES" },

  // --- VALENCIA ---
  { name: "Tyris on Tap", address: "Carrer de la Pau, 27", city: "Valencia", country: "ES" },
  { name: "Birra & Blues", address: "Carrer de Sant Vicent Màrtir, 23", city: "Valencia", country: "ES" },
  { name: "Olhöps Craft Beer House", address: "Carrer de Sueca, 21", city: "Valencia", country: "ES" },
  { name: "Ruzanuvol", address: "Carrer de Lluís de Santàngel, 3", city: "Valencia", country: "ES" },
  { name: "Las Cervezas del Mercado", address: "Mercado de Colón", city: "Valencia", country: "ES" },

  // --- PAÍS VASCO ---
  { name: "La Viña del Ensanche", address: "Calle de la Diputación, 10", city: "Bilbao", country: "ES" },
  { name: "Mojigatos", address: "Calle de Elcano, 21", city: "Bilbao", country: "ES" },
  { name: "Penguin Bar", address: "Gregorio de la Revilla, 8", city: "Bilbao", country: "ES" },
  { name: "Bihotz Café", address: "Arechaga Kalea, 6", city: "Bilbao", country: "ES" },
  { name: "Mala Gissona Beer House", address: "Zabaleta Kalea, 53", city: "San Sebastián", country: "ES" },
  { name: "Drunkat", address: "Virgen del Carmen, 33", city: "San Sebastián", country: "ES" },

  // --- INTERNACIONAL ---
  { name: "Hofbräuhaus München", address: "Platzl 9", city: "Munich", country: "DE" },
  { name: "Augustiner-Keller", address: "Arnulfstraße 52", city: "Munich", country: "DE" },
  { name: "Delirium Café", address: "Impasse de la Fidélité 4A", city: "Brussels", country: "BE" },
  { name: "The Temple Bar", address: "47 Temple Bar", city: "Dublin", country: "IE" },
  { name: "BrewDog Soho", address: "21 Poland St", city: "London", country: "GB" },
  { name: "Russian River Brewing", address: "725 4th St", city: "Santa Rosa", country: "US" }
];

// Función para crear TODAS las cervezas
export const createAllBeers = async (currentUserId?: string) => {
  console.log('🍺 Creando TODAS las cervezas del catálogo...');
  const createdBeers = [];
  let skipped = 0;
  
  for (const beer of INITIAL_BEERS) {
    try {
      // Verificar si ya existe
      const existing = await client.models.Beer.list({
        filter: { name: { eq: beer.name } },
        limit: 1
      });
      
      if (!existing.data || existing.data.length === 0) {
        const response = await client.models.Beer.create({
          ...beer,
          averageRating: Math.random() * 2 + 3, // 3.0 - 5.0
          ratingsCount: Math.floor(Math.random() * 100) + 10, // 10-110
          addedById: currentUserId
        } as any);
        
        if (response.data) {
          createdBeers.push(response.data);
          console.log(`✓ Creada: ${beer.name}`);
        }
      } else {
        skipped++;
      }
    } catch (error) {
      console.error(`✗ Error creando ${beer.name}:`, error);
    }
  }
  
  console.log(`✅ ${createdBeers.length} cervezas creadas, ${skipped} ya existían`);
  return { created: createdBeers, skipped };
};

// Función para crear TODOS los locales
export const createAllVenues = async (currentUserId?: string) => {
  console.log('🏪 Creando TODOS los locales del catálogo...');
  const createdVenues = [];
  let skipped = 0;
  
  for (const venue of INITIAL_VENUES) {
    try {
      const existing = await client.models.Venue.list({
        filter: { name: { eq: venue.name } },
        limit: 1
      });
      
      if (!existing.data || existing.data.length === 0) {
        const response = await client.models.Venue.create({
          ...venue,
          likes: Math.floor(Math.random() * 50) + 5, // 5-55
          addedById: currentUserId
        });
        
        if (response.data) {
          createdVenues.push(response.data);
          console.log(`✓ Creado: ${venue.name}`);
        }
      } else {
        skipped++;
      }
    } catch (error) {
      console.error(`✗ Error creando ${venue.name}:`, error);
    }
  }
  
  console.log(`✅ ${createdVenues.length} locales creados, ${skipped} ya existían`);
  return { created: createdVenues, skipped };
};

// Función para crear usuarios de ejemplo
export const createSampleUsersOnly = async () => {
  console.log('👥 Creando usuarios de ejemplo...');
  let created = 0;
  
  for (const user of SAMPLE_USERS) {
    try {
      const existing = await client.models.UserProfile.list({
        filter: { userId: { eq: user.userId } },
        limit: 1
      });

      if (!existing.data || existing.data.length === 0) {
        await client.models.UserProfile.create(user);
        created++;
        console.log(`✅ Usuario creado: ${user.username}`);
      }
    } catch (error) {
      console.log(`⚠️ Error con usuario ${user.username}`);
    }
  }
  
  return { success: true, created };
};

// FUNCIÓN PRINCIPAL - Inicializar TODO
export const initializeAllData = async (currentUserId: string) => {
  console.log('🚀 ===============================================');
  console.log('🚀 INICIALIZANDO TODOS LOS DATOS DE BEERSP');
  console.log('🚀 ===============================================');
  
  try {
    // 1. Crear usuarios de ejemplo
    console.log('\n📍 Paso 1: Usuarios de ejemplo');
    const usersResult = await createSampleUsersOnly();
    
    // 2. Crear TODAS las cervezas
    console.log('\n📍 Paso 2: Catálogo de cervezas');
    const beersResult = await createAllBeers(currentUserId);
    
    // 3. Crear TODOS los locales
    console.log('\n📍 Paso 3: Catálogo de locales');
    const venuesResult = await createAllVenues(currentUserId);
    
    console.log('\n🎉 ===============================================');
    console.log('🎉 INICIALIZACIÓN COMPLETADA');
    console.log(`✅ Usuarios: ${usersResult.created}`);
    console.log(`✅ Cervezas: ${beersResult.created.length} nuevas (${beersResult.skipped} ya existían)`);
    console.log(`✅ Locales: ${venuesResult.created.length} nuevos (${venuesResult.skipped} ya existían)`);
    console.log('🎉 ===============================================\n');
    
    return {
      success: true,
      users: usersResult.created,
      beers: beersResult.created.length,
      venues: venuesResult.created.length
    };
  } catch (error) {
    console.error('❌ Error en la inicialización:', error);
    return { success: false, error };
  }
};

// Verificar si ya existen datos
export const checkIfDataExists = async () => {
  try {
    const beersResponse = await client.models.Beer.list({ limit: 1 });
    const badgesResponse = await client.models.Badge.list({ limit: 1 });
    const usersResponse = await client.models.UserProfile.list({ limit: 3 });
    
    return {
      hasBeers: (beersResponse.data?.length || 0) > 0,
      hasBadges: (badgesResponse.data?.length || 0) > 0,
      hasUsers: (usersResponse.data?.length || 0) > 2
    };
  } catch (error) {
    console.error('Error verificando datos:', error);
    return { hasBeers: false, hasBadges: false, hasUsers: false };
  }
};