import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();

// Datos de cervezas iniciales
const initialBeers = [
  // --- ESPAÑA ---
  { name: "Alhambra Reserva 1925", style: "Lager", country: "ES", color: "amarillo dorado", alcoholPercentage: 6.4, ibu: 25, description: "Iconica lager premium de Granada, intensa y con cuerpo." },
  { name: "Mahou 5 Estrellas", style: "Lager", country: "ES", color: "amarillo dorado", alcoholPercentage: 5.5, ibu: 27, description: "El sabor clásico de Madrid, equilibrada y refrescante." },
  { name: "Estrella Galicia Especial", style: "Lager", country: "ES", color: "dorado claro", alcoholPercentage: 5.5, ibu: 25, description: "Cerveza gallega de sabor lupulado y refrescante." },
  { name: "Estrella Damm", style: "Lager", country: "ES", color: "dorado claro", alcoholPercentage: 5.4, ibu: 21, description: "La cerveza del mediterráneo, elaborada con arroz." },
  { name: "Cruzcampo Gran Reserva", style: "Lager", country: "ES", color: "ámbar claro", alcoholPercentage: 6.4, ibu: 25, description: "Lager tostada de larga maduración." },
  { name: "San Miguel Especial", style: "Lager", country: "ES", color: "dorado claro", alcoholPercentage: 5.4, ibu: 28, description: "Cerveza internacional española con notas de cereal." },
  { name: "Voll-Damm Doble Malta", style: "Amber Ale", country: "ES", color: "ámbar claro", alcoholPercentage: 7.2, ibu: 35, description: "Märzenbier de cuerpo intenso y sabor tostado." },
  { name: "Ambar Export", style: "Lager", country: "ES", color: "ámbar claro", alcoholPercentage: 7.0, ibu: 28, description: "Cerveza con tres maltas, robusta y sabrosa." },
  { name: "1906 Reserva Especial", style: "Lager", country: "ES", color: "ámbar claro", alcoholPercentage: 6.5, ibu: 30, description: "La milnueve, tostada con notas de caramelo y café." },
  { name: "1906 Red Vintage", style: "Amber Ale", country: "ES", color: "ámbar claro", alcoholPercentage: 8.0, ibu: 28, description: "La colorada, intensa y equilibrada." },
  { name: "1906 Black Coupage", style: "Porter", country: "ES", color: "negro opaco", alcoholPercentage: 7.2, ibu: 35, description: "Cerveza negra con aromas de café y chocolate." },
  { name: "Moritz 7", style: "Lager", country: "ES", color: "dorado claro", alcoholPercentage: 5.5, ibu: 25, description: "Premium lager de Barcelona 100% malta." },
  { name: "La Virgen Madrid Lager", style: "Lager", country: "ES", color: "dorado claro", alcoholPercentage: 5.2, ibu: 22, description: "Lager artesana madrileña, fresca y sin filtrar." },
  { name: "La Virgen Jamonera", style: "Amber Ale", country: "ES", color: "ámbar claro", alcoholPercentage: 5.5, ibu: 20, description: "Amber Ale tostada ideal para acompañar embutidos." },
  { name: "La Virgen 360", style: "APA", country: "ES", color: "dorado claro", alcoholPercentage: 5.0, ibu: 35, description: "Pale Ale muy aromática y lupulada." },
  { name: "Arriaca IPA", style: "IPA", country: "ES", color: "ámbar claro", alcoholPercentage: 6.9, ibu: 60, description: "IPA artesana de Guadalajara potente y cítrica." },
  { name: "Arriaca Imperial Russian Stout", style: "Stout", country: "ES", color: "negro opaco", alcoholPercentage: 10.1, ibu: 50, description: "Negra, licorosa con notas de vainilla y café." },
  { name: "Dougall's IPA 4", style: "IPA", country: "ES", color: "dorado claro", alcoholPercentage: 6.0, ibu: 55, description: "IPA cántabra de referencia, muy bebible." },
  { name: "Dougall's 942", style: "APA", country: "ES", color: "dorado claro", alcoholPercentage: 4.2, ibu: 30, description: "APA ligera y aromática." },
  { name: "Cibeles Imperial IPA", style: "IPA", country: "ES", color: "ámbar claro", alcoholPercentage: 7.0, ibu: 70, description: "IPA madrileña con mucho cuerpo y amargor." },
  { name: "Rosa Blanca", style: "Lager", country: "ES", color: "dorado claro", alcoholPercentage: 4.8, ibu: 18, description: "Hoppy lager suave y aromática." },
  { name: "Turia Märzen", style: "Amber Ale", country: "ES", color: "ámbar claro", alcoholPercentage: 5.6, ibu: 24, description: "Tostada valenciana clásica." },
  { name: "El Águila Sin Filtrar", style: "Lager", country: "ES", color: "dorado claro", alcoholPercentage: 5.5, ibu: 20, description: "Lager turbia directa del tanque." },
  { name: "Victoria Málaga", style: "Lager", country: "ES", color: "dorado claro", alcoholPercentage: 4.8, ibu: 22, description: "Malagueña y exquisita, refrescante." },
  { name: "Naparbier ZZ+", style: "Amber Ale", country: "ES", color: "ámbar claro", alcoholPercentage: 5.5, ibu: 30, description: "Amber Ale navarra artesanal." },
  { name: "Soma Idol", style: "IPA", country: "ES", color: "amarillo dorado", alcoholPercentage: 6.5, ibu: 45, description: "IPA moderna y turbia de Girona." },
  { name: "Basqueland Imparable", style: "IPA", country: "ES", color: "amarillo dorado", alcoholPercentage: 6.8, ibu: 62, description: "West Coast IPA vasca muy premiada." },
  { name: "Caleya Goma 2", style: "IPA", country: "ES", color: "amarillo dorado", alcoholPercentage: 6.3, ibu: 55, description: "IPA asturiana con lúpulos explosivos." },
  { name: "Espiga Garage", style: "IPA", country: "ES", color: "amarillo dorado", alcoholPercentage: 6.0, ibu: 50, description: "IPA artesana catalana clásica." },
  { name: "Bidassoa Basque Brewery Mugalari", style: "APA", country: "ES", color: "dorado claro", alcoholPercentage: 5.6, ibu: 35, description: "Pale Ale vasca equilibrada." },
  { name: "Tyris Original", style: "Amber Ale", country: "ES", color: "dorado claro", alcoholPercentage: 5.0, ibu: 20, description: "Ale valenciana suave y maltosa." },
  { name: "Rosita Original", style: "Amber Ale", country: "ES", color: "ámbar claro", alcoholPercentage: 5.5, ibu: 18, description: "Cerveza artesana de Tarragona con miel." },
  { name: "Montseny Mala Vida", style: "Stout", country: "ES", color: "negro opaco", alcoholPercentage: 11.0, ibu: 60, description: "Imperial Stout potente y oscura." },
  { name: "Garage Beer Co Soup", style: "IPA", country: "ES", color: "amarillo dorado", alcoholPercentage: 6.0, ibu: 40, description: "New England IPA turbia y frutal." },
  { name: "Península Hop On", style: "APA", country: "ES", color: "dorado claro", alcoholPercentage: 5.5, ibu: 35, description: "APA madrileña muy aromática." },

  // --- ALEMANIA ---
  { name: "Paulaner Hefe-Weissbier", style: "Weissbier", country: "DE", color: "amarillo dorado", alcoholPercentage: 5.5, ibu: 12, description: "La cerveza de trigo número 1 en Alemania." },
  { name: "Paulaner Salvator", style: "Lager", country: "DE", color: "marrón oscuro", alcoholPercentage: 7.9, ibu: 28, description: "Doppelbock fuerte y maltosa." },
  { name: "Erdinger Weissbier", style: "Weissbier", country: "DE", color: "amarillo dorado", alcoholPercentage: 5.3, ibu: 13, description: "Clásica de trigo bávara." },
  { name: "Erdinger Dunkel", style: "Weissbier", country: "DE", color: "marrón oscuro", alcoholPercentage: 5.3, ibu: 14, description: "Trigo oscura con notas tostadas." },
  { name: "Franziskaner Weissbier", style: "Weissbier", country: "DE", color: "amarillo dorado", alcoholPercentage: 5.0, ibu: 12, description: "Suave, con notas de plátano y clavo." },
  { name: "Weihenstephaner Hefe Weissbier", style: "Weissbier", country: "DE", color: "amarillo dorado", alcoholPercentage: 5.4, ibu: 14, description: "De la cervecería más antigua del mundo." },
  { name: "Weihenstephaner Vitus", style: "Weissbier", country: "DE", color: "dorado claro", alcoholPercentage: 7.7, ibu: 17, description: "Weizenbock potente y especiada." },
  { name: "Augustiner Helles", style: "Lager", country: "DE", color: "dorado claro", alcoholPercentage: 5.2, ibu: 18, description: "La lager favorita de Múnich." },
  { name: "Augustiner Edelstoff", style: "Lager", country: "DE", color: "dorado claro", alcoholPercentage: 5.6, ibu: 20, description: "Export lager brillante y fresca." },
  { name: "Spaten Münchner Hell", style: "Lager", country: "DE", color: "dorado claro", alcoholPercentage: 5.2, ibu: 21, description: "La primera cerveza Hell de Múnich." },
  { name: "Hofbräu Original", style: "Lager", country: "DE", color: "dorado claro", alcoholPercentage: 5.1, ibu: 24, description: "La clásica de la Hofbräuhaus." },
  { name: "Beck's", style: "Pilsner", country: "DE", color: "dorado claro", alcoholPercentage: 5.0, ibu: 33, description: "Pilsner del norte, seca y amarga." },
  { name: "Warsteiner Premium Verum", style: "Pilsner", country: "DE", color: "dorado claro", alcoholPercentage: 4.8, ibu: 28, description: "Pilsner premium equilibrada." },
  { name: "Bitburger Premium Pils", style: "Pilsner", country: "DE", color: "dorado claro", alcoholPercentage: 4.8, ibu: 32, description: "La pilsner de grifo más famosa." },
  { name: "Krombacher Pils", style: "Pilsner", country: "DE", color: "dorado claro", alcoholPercentage: 4.8, ibu: 24, description: "Pilsner con agua de manantial de roca." },
  { name: "Veltins Pilsener", style: "Pilsner", country: "DE", color: "dorado claro", alcoholPercentage: 4.8, ibu: 28, description: "Fresca pilsner de Sauerland." },
  { name: "Radeberger Pilsner", style: "Pilsner", country: "DE", color: "dorado claro", alcoholPercentage: 4.8, ibu: 33, description: "La pilsner de la corte real sajona." },
  { name: "Jever Pilsener", style: "Pilsner", country: "DE", color: "dorado claro", alcoholPercentage: 4.9, ibu: 40, description: "Extremadamente seca y amarga (Frisia)." },
  { name: "Flensburger Pilsener", style: "Pilsner", country: "DE", color: "dorado claro", alcoholPercentage: 4.8, ibu: 38, description: "La del tapón mecánico, muy fresca." },
  { name: "Rothaus Tannenzäpfle", style: "Pilsner", country: "DE", color: "dorado claro", alcoholPercentage: 5.1, ibu: 31, description: "Pilsner de culto de la Selva Negra." },
  { name: "Ayinger Celebrator", style: "Lager", country: "DE", color: "negro opaco", alcoholPercentage: 6.7, ibu: 24, description: "Doppelbock mundialmente famosa." },
  { name: "Ayinger Bräuweisse", style: "Weissbier", country: "DE", color: "amarillo dorado", alcoholPercentage: 5.1, ibu: 13, description: "Trigo bávara aristocrática." },
  { name: "Schneider Weisse Tap 7", style: "Weissbier", country: "DE", color: "ámbar claro", alcoholPercentage: 5.4, ibu: 14, description: "La original de Schneider, color ámbar." },
  { name: "Schneider Weisse Tap 6 Aventinus", style: "Weissbier", country: "DE", color: "marrón oscuro", alcoholPercentage: 8.2, ibu: 16, description: "Weizenbock antigua y poderosa." },
  { name: "Köstritzer Schwarzbier", style: "Lager", country: "DE", color: "negro opaco", alcoholPercentage: 4.8, ibu: 22, description: "La cerveza negra más famosa de Alemania." },
  { name: "Schlenkerla Märzen", style: "Lager", country: "DE", color: "marrón oscuro", alcoholPercentage: 5.1, ibu: 30, description: "Cerveza ahumada de Bamberg clásica." },
  { name: "Fruh Kölsch", style: "Lager", country: "DE", color: "dorado claro", alcoholPercentage: 4.8, ibu: 20, description: "Ale híbrida de Colonia, bebible como lager." },
  { name: "Gaffel Kölsch", style: "Lager", country: "DE", color: "dorado claro", alcoholPercentage: 4.8, ibu: 25, description: "Kölsch seca y refrescante." },
  { name: "Diebels Alt", style: "Amber Ale", country: "DE", color: "marrón oscuro", alcoholPercentage: 4.9, ibu: 30, description: "Altbier clásica de Düsseldorf." },
  { name: "Berliner Kindl Weisse", style: "Sour Ale", country: "DE", color: "dorado claro", alcoholPercentage: 3.0, ibu: 6, description: "Ácida de Berlín, a veces con jarabe." },
  { name: "Andechs Doppelbock Dunkel", style: "Lager", country: "DE", color: "marrón oscuro", alcoholPercentage: 7.1, ibu: 25, description: "Famosa cerveza de monasterio bávara." },
  { name: "Tegernseer Spezial", style: "Lager", country: "DE", color: "dorado claro", alcoholPercentage: 5.6, ibu: 18, description: "Lager de culto en Baviera." },
  { name: "Störtebeker Atlantik-Ale", style: "APA", country: "DE", color: "dorado claro", alcoholPercentage: 5.1, ibu: 40, description: "Ale alemana moderna y cítrica." },
  { name: "Maisel's Weisse", style: "Weissbier", country: "DE", color: "ámbar claro", alcoholPercentage: 5.2, ibu: 12, description: "Trigo de Bayreuth muy aromática." },

  // --- BÉLGICA ---
  { name: "Chimay Azul", style: "Amber Ale", country: "BE", color: "marrón oscuro", alcoholPercentage: 9.0, ibu: 35, description: "Trapense oscura, compleja y afrutada." },
  { name: "Chimay Roja", style: "Amber Ale", country: "BE", color: "ámbar claro", alcoholPercentage: 7.0, ibu: 19, description: "Dubbel trapense con notas de albaricoque." },
  { name: "Chimay Triple", style: "Amber Ale", country: "BE", color: "amarillo dorado", alcoholPercentage: 8.0, ibu: 38, description: "Tripel seca y lupulada." },
  { name: "Duvel", style: "Amber Ale", country: "BE", color: "amarillo dorado", alcoholPercentage: 8.5, ibu: 32, description: "Strong Ale de referencia, burbujeante." },
  { name: "Westmalle Tripel", style: "Amber Ale", country: "BE", color: "amarillo dorado", alcoholPercentage: 9.5, ibu: 36, description: "La madre de todas las Tripels." },
  { name: "Westmalle Dubbel", style: "Amber Ale", country: "BE", color: "marrón oscuro", alcoholPercentage: 7.0, ibu: 24, description: "Dubbel oscura y maltosa." },
  { name: "Orval", style: "Saison", country: "BE", color: "ámbar claro", alcoholPercentage: 6.2, ibu: 32, description: "Trapense única con levadura Brettanomyces." },
  { name: "Rochefort 10", style: "Amber Ale", country: "BE", color: "marrón oscuro", alcoholPercentage: 11.3, ibu: 27, description: "Quadrupel muy fuerte y compleja." },
  { name: "Rochefort 8", style: "Amber Ale", country: "BE", color: "marrón oscuro", alcoholPercentage: 9.2, ibu: 22, description: "Equilibrada y rica en malta." },
  { name: "Leffe Blonde", style: "Amber Ale", country: "BE", color: "amarillo dorado", alcoholPercentage: 6.6, ibu: 20, description: "De abadía, dulce y especiada." },
  { name: "Leffe Brune", style: "Amber Ale", country: "BE", color: "marrón oscuro", alcoholPercentage: 6.5, ibu: 20, description: "Oscura con notas de caramelo tostado." },
  { name: "Hoegaarden", style: "Weissbier", country: "BE", color: "dorado claro", alcoholPercentage: 4.9, ibu: 15, description: "Witbier original con cilantro y naranja." },
  { name: "Stella Artois", style: "Pilsner", country: "BE", color: "dorado claro", alcoholPercentage: 5.0, ibu: 24, description: "Lager premium belga internacional." },
  { name: "Delirium Tremens", style: "Amber Ale", country: "BE", color: "amarillo dorado", alcoholPercentage: 8.5, ibu: 24, description: "Famosa por el elefante rosa y su fuerza." },
  { name: "Delirium Nocturnum", style: "Amber Ale", country: "BE", color: "marrón oscuro", alcoholPercentage: 8.5, ibu: 24, description: "Versión oscura y compleja de Delirium." },
  { name: "La Chouffe", style: "Amber Ale", country: "BE", color: "amarillo dorado", alcoholPercentage: 8.0, ibu: 20, description: "Blonde de las Ardenas con cilantro." },
  { name: "Kwak", style: "Amber Ale", country: "BE", color: "ámbar claro", alcoholPercentage: 8.4, ibu: 20, description: "Famosa por su vaso de cochero." },
  { name: "Tripel Karmeliet", style: "Amber Ale", country: "BE", color: "amarillo dorado", alcoholPercentage: 8.4, ibu: 16, description: "Elaborada con tres cereales, muy aromática." },
  { name: "St. Bernardus Abt 12", style: "Amber Ale", country: "BE", color: "marrón oscuro", alcoholPercentage: 10.0, ibu: 22, description: "Rival de la Westvleteren, excelente quadrupel." },
  { name: "Lindemans Kriek", style: "Lambic", country: "BE", color: "marrón oscuro", alcoholPercentage: 3.5, ibu: 10, description: "Lambic endulzada con cerezas." },
  { name: "Lindemans Framboise", style: "Lambic", country: "BE", color: "marrón oscuro", alcoholPercentage: 2.5, ibu: 10, description: "Lambic con intenso sabor a frambuesa." },
  { name: "Cantillon Gueuze", style: "Lambic", country: "BE", color: "amarillo dorado", alcoholPercentage: 5.0, ibu: 25, description: "Gueuze tradicional, ácida y seca." },
  { name: "3 Fonteinen Oude Geuze", style: "Lambic", country: "BE", color: "amarillo dorado", alcoholPercentage: 6.0, ibu: 25, description: "Mezcla de lambics añejas, compleja." },
  { name: "Rodenbach Classic", style: "Sour Ale", country: "BE", color: "marrón oscuro", alcoholPercentage: 5.2, ibu: 30, description: "Ale roja de Flandes, agridulce." },
  { name: "Rodenbach Grand Cru", style: "Sour Ale", country: "BE", color: "marrón oscuro", alcoholPercentage: 6.0, ibu: 35, description: "Más envejecida y vinosa." },
  { name: "Saison Dupont", style: "Saison", country: "BE", color: "amarillo dorado", alcoholPercentage: 6.5, ibu: 30, description: "El estándar mundial del estilo Saison." },
  { name: "Vedett Extra White", style: "Weissbier", country: "BE", color: "dorado claro", alcoholPercentage: 4.7, ibu: 15, description: "Trigo refrescante y moderna." },
  { name: "Liefmans Fruitesse", style: "Sour Ale", country: "BE", color: "marrón oscuro", alcoholPercentage: 3.8, ibu: 10, description: "Mezcla de cervezas con frutos rojos, dulce." },
  { name: "Gulden Draak", style: "Amber Ale", country: "BE", color: "marrón oscuro", alcoholPercentage: 10.5, ibu: 25, description: "Dark Strong Ale muy potente." },
  { name: "Jupiler", style: "Pilsner", country: "BE", color: "dorado claro", alcoholPercentage: 5.2, ibu: 19, description: "La pilsner más vendida en Bélgica." },
  { name: "Maes Pils", style: "Pilsner", country: "BE", color: "dorado claro", alcoholPercentage: 5.2, ibu: 20, description: "Lager belga popular." },
  { name: "Boon Oude Geuze", style: "Lambic", country: "BE", color: "amarillo dorado", alcoholPercentage: 7.0, ibu: 22, description: "Gueuze suave y accesible." },
  { name: "Achel Blonde", style: "Amber Ale", country: "BE", color: "amarillo dorado", alcoholPercentage: 8.0, ibu: 20, description: "Trapense rubia equilibrada." },
  { name: "Westvleteren 12", style: "Amber Ale", country: "BE", color: "marrón oscuro", alcoholPercentage: 10.2, ibu: 30, description: "Considerada por muchos la mejor del mundo." },
  { name: "Grimbergen Blonde", style: "Amber Ale", country: "BE", color: "amarillo dorado", alcoholPercentage: 6.7, ibu: 22, description: "De abadía, dulce y afrutada." },

  // --- REINO UNIDO e IRLANDA ---
  { name: "Guinness Draught", style: "Stout", country: "IE", color: "negro opaco", alcoholPercentage: 4.2, ibu: 45, description: "La stout más icónica, cremosa y tostada." },
  { name: "Guinness Extra Stout", style: "Stout", country: "IE", color: "negro opaco", alcoholPercentage: 5.6, ibu: 40, description: "Versión más carbonatada y fuerte." },
  { name: "Kilkenny", style: "Amber Ale", country: "IE", color: "ámbar claro", alcoholPercentage: 4.3, ibu: 29, description: "Cream ale irlandesa suave y rojiza." },
  { name: "Smithwick's Red Ale", style: "Amber Ale", country: "IE", color: "ámbar claro", alcoholPercentage: 3.8, ibu: 20, description: "Red ale tradicional irlandesa." },
  { name: "Murphy's Irish Stout", style: "Stout", country: "IE", color: "negro opaco", alcoholPercentage: 4.0, ibu: 34, description: "Stout de Cork, suave y sin amargor." },
  { name: "Fuller's London Pride", style: "Amber Ale", country: "GB", color: "ámbar claro", alcoholPercentage: 4.7, ibu: 30, description: "La bitter inglesa por excelencia." },
  { name: "Fuller's ESB", style: "Amber Ale", country: "GB", color: "ámbar claro", alcoholPercentage: 5.9, ibu: 35, description: "Extra Special Bitter, fuerte y rica." },
  { name: "Newcastle Brown Ale", style: "Porter", country: "GB", color: "marrón oscuro", alcoholPercentage: 4.7, ibu: 24, description: "Brown ale del norte, sabor a nuez." },
  { name: "Samuel Smith Oatmeal Stout", style: "Stout", country: "GB", color: "negro opaco", alcoholPercentage: 5.0, ibu: 32, description: "Stout sedosa elaborada con avena." },
  { name: "Samuel Smith Taddy Porter", style: "Porter", country: "GB", color: "negro opaco", alcoholPercentage: 5.0, ibu: 30, description: "Porter clásica muy equilibrada." },
  { name: "BrewDog Punk IPA", style: "IPA", country: "GB", color: "dorado claro", alcoholPercentage: 5.4, ibu: 35, description: "IPA moderna escocesa, explosión tropical." },
  { name: "BrewDog Elvis Juice", style: "IPA", country: "GB", color: "ámbar claro", alcoholPercentage: 6.5, ibu: 40, description: "IPA infusionada con pomelo." },
  { name: "BrewDog Hazy Jane", style: "IPA", country: "GB", color: "amarillo dorado", alcoholPercentage: 5.0, ibu: 25, description: "New England IPA suave y frutal." },
  { name: "Boddingtons Pub Ale", style: "Amber Ale", country: "GB", color: "amarillo dorado", alcoholPercentage: 4.6, ibu: 26, description: "Bitter cremosa de Manchester." },
  { name: "Old Speckled Hen", style: "Amber Ale", country: "GB", color: "ámbar claro", alcoholPercentage: 5.0, ibu: 25, description: "Ale inglesa fina y malteada." },
  { name: "Hobgoblin Ruby", style: "Amber Ale", country: "GB", color: "marrón oscuro", alcoholPercentage: 5.2, ibu: 32, description: "Legendaria Ruby Beer con sabor a toffee." },
  { name: "Spitfire Amber", style: "Amber Ale", country: "GB", color: "ámbar claro", alcoholPercentage: 4.5, ibu: 34, description: "Ale de Kent con carácter." },
  { name: "Bass Pale Ale", style: "Amber Ale", country: "GB", color: "ámbar claro", alcoholPercentage: 5.1, ibu: 32, description: "Una de las primeras pale ales del mundo." },
  { name: "Greene King IPA", style: "Amber Ale", country: "GB", color: "ámbar claro", alcoholPercentage: 3.6, ibu: 25, description: "IPA inglesa de sesión, muy ligera." },
  { name: "Timothy Taylor's Landlord", style: "Amber Ale", country: "GB", color: "ámbar claro", alcoholPercentage: 4.3, ibu: 45, description: "Pale Ale clásica ganadora de premios." },
  { name: "St. Peter's Cream Stout", style: "Stout", country: "GB", color: "negro opaco", alcoholPercentage: 6.5, ibu: 40, description: "Stout inglesa en botella ovalada." },
  { name: "Innis & Gunn Original", style: "Amber Ale", country: "GB", color: "ámbar claro", alcoholPercentage: 6.6, ibu: 18, description: "Ale escocesa envejecida en barrica." },
  { name: "Belhaven Scottish Stout", style: "Stout", country: "GB", color: "negro opaco", alcoholPercentage: 7.0, ibu: 30, description: "Stout escocesa profunda y oscura." },
  { name: "Thornbridge Jaime", style: "IPA", country: "GB", color: "dorado claro", alcoholPercentage: 5.9, ibu: 50, description: "IPA americana hecha en Inglaterra." },
  { name: "Beavertown Gamma Ray", style: "APA", country: "GB", color: "ámbar claro", alcoholPercentage: 5.4, ibu: 45, description: "APA jugosa y tropical de Londres." },
  { name: "Beavertown Neck Oil", style: "IPA", country: "GB", color: "dorado claro", alcoholPercentage: 4.3, ibu: 35, description: "Session IPA ligera y cítrica." },
  { name: "Tennent's Lager", style: "Lager", country: "GB", color: "dorado claro", alcoholPercentage: 4.0, ibu: 16, description: "La lager más popular de Escocia." },
  { name: "Carling", style: "Lager", country: "GB", color: "dorado claro", alcoholPercentage: 4.0, ibu: 15, description: "Lager británica estándar." },
  { name: "Harp Lager", style: "Lager", country: "IE", color: "dorado claro", alcoholPercentage: 4.5, ibu: 21, description: "Lager irlandesa de Belfast." },
  { name: "O'Hara's Irish Stout", style: "Stout", country: "IE", color: "negro opaco", alcoholPercentage: 4.3, ibu: 40, description: "Stout artesana tradicional y seca." },

  // --- ESTADOS UNIDOS ---
  { name: "Sierra Nevada Pale Ale", style: "APA", country: "US", color: "ámbar claro", alcoholPercentage: 5.6, ibu: 38, description: "La APA que inició la revolución artesanal." },
  { name: "Sierra Nevada Torpedo", style: "IPA", country: "US", color: "ámbar claro", alcoholPercentage: 7.2, ibu: 65, description: "Extra IPA intensa y resinosa." },
  { name: "Lagunitas IPA", style: "IPA", country: "US", color: "dorado claro", alcoholPercentage: 6.2, ibu: 51, description: "IPA de California icónica y balanceada." },
  { name: "Lagunitas Little Sumpin'", style: "IPA", country: "US", color: "dorado claro", alcoholPercentage: 7.5, ibu: 64, description: "Ale de trigo lupulada." },
  { name: "Stone IPA", style: "IPA", country: "US", color: "ámbar claro", alcoholPercentage: 6.9, ibu: 71, description: "West Coast IPA clásica y amarga." },
  { name: "Samuel Adams Boston Lager", style: "Lager", country: "US", color: "ámbar claro", alcoholPercentage: 5.0, ibu: 30, description: "Vienna lager americana compleja." },
  { name: "Brooklyn Lager", style: "Lager", country: "US", color: "ámbar claro", alcoholPercentage: 5.2, ibu: 33, description: "Amber Lager estilo pre-prohibición." },
  { name: "Goose Island IPA", style: "IPA", country: "US", color: "ámbar claro", alcoholPercentage: 5.9, ibu: 55, description: "IPA de Chicago, floral y cítrica." },
  { name: "Goose Island 312", style: "Weissbier", country: "US", color: "dorado claro", alcoholPercentage: 4.2, ibu: 18, description: "Urban Wheat Ale refrescante." },
  { name: "Founders All Day IPA", style: "IPA", country: "US", color: "dorado claro", alcoholPercentage: 4.7, ibu: 42, description: "Session IPA perfecta para todo el día." },
  { name: "Founders KBS", style: "Stout", country: "US", color: "negro opaco", alcoholPercentage: 12.0, ibu: 70, description: "Imperial Stout envejecida en bourbon." },
  { name: "Bell's Two Hearted Ale", style: "IPA", country: "US", color: "ámbar claro", alcoholPercentage: 7.0, ibu: 55, description: "IPA 100% lúpulo Centennial." },
  { name: "Dogfish Head 60 Minute", style: "IPA", country: "US", color: "ámbar claro", alcoholPercentage: 6.0, ibu: 60, description: "IPA continuamente lupulada." },
  { name: "Dogfish Head 90 Minute", style: "IPA", country: "US", color: "ámbar claro", alcoholPercentage: 9.0, ibu: 90, description: "Imperial IPA potente y maltosa." },
  { name: "New Belgium Fat Tire", style: "Amber Ale", country: "US", color: "ámbar claro", alcoholPercentage: 5.2, ibu: 22, description: "Amber Ale icónica de Colorado." },
  { name: "Anchor Steam Beer", style: "Lager", country: "US", color: "ámbar claro", alcoholPercentage: 4.9, ibu: 33, description: "California Common fermentada en caliente." },
  { name: "Firestone Walker Union Jack", style: "IPA", country: "US", color: "dorado claro", alcoholPercentage: 7.0, ibu: 60, description: "IPA ganadora de múltiples premios." },
  { name: "Budweiser", style: "Lager", country: "US", color: "dorado claro", alcoholPercentage: 5.0, ibu: 12, description: "La King of Beers, lager adjunta." },
  { name: "Bud Light", style: "Lager", country: "US", color: "dorado claro", alcoholPercentage: 4.2, ibu: 10, description: "Lager ligera más vendida de EEUU." },
  { name: "Coors Light", style: "Lager", country: "US", color: "dorado claro", alcoholPercentage: 4.2, ibu: 10, description: "Refrescante, servida muy fría." },
  { name: "Miller Genuine Draft", style: "Lager", country: "US", color: "dorado claro", alcoholPercentage: 4.7, ibu: 12, description: "Lager suave filtrada en frío." },
  { name: "Pabst Blue Ribbon", style: "Lager", country: "US", color: "dorado claro", alcoholPercentage: 4.7, ibu: 10, description: "Clásica lager hipster americana." },
  { name: "Blue Moon Belgian White", style: "Weissbier", country: "US", color: "dorado claro", alcoholPercentage: 5.4, ibu: 9, description: "Trigo estilo belga con naranja." },
  { name: "Cigar City Jai Alai", style: "IPA", country: "US", color: "ámbar claro", alcoholPercentage: 7.5, ibu: 70, description: "IPA de Florida con notas tropicales." },
  { name: "Ballast Point Sculpin", style: "IPA", country: "US", color: "ámbar claro", alcoholPercentage: 7.0, ibu: 70, description: "IPA con notas de albaricoque y mango." },
  { name: "Deschutes Fresh Squeezed", style: "IPA", country: "US", color: "ámbar claro", alcoholPercentage: 6.4, ibu: 60, description: "IPA jugosa con lúpulos Citra." },
  { name: "Rogue Dead Guy Ale", style: "Amber Ale", country: "US", color: "ámbar claro", alcoholPercentage: 6.8, ibu: 40, description: "Maibock estilo alemana hecha ale." },
  { name: "Oskar Blues Dale's Pale Ale", style: "APA", country: "US", color: "ámbar claro", alcoholPercentage: 6.5, ibu: 65, description: "La primera craft beer en lata." },
  { name: "Left Hand Milk Stout Nitro", style: "Stout", country: "US", color: "negro opaco", alcoholPercentage: 6.0, ibu: 25, description: "Stout dulce con lactosa y nitrógeno." },
  { name: "Yuengling Traditional Lager", style: "Lager", country: "US", color: "ámbar claro", alcoholPercentage: 4.5, ibu: 16, description: "La cervecería más antigua de EEUU." },
  { name: "Michelob Ultra", style: "Lager", country: "US", color: "dorado claro", alcoholPercentage: 4.2, ibu: 10, description: "Baja en calorías y carbohidratos." },
  { name: "Kona Big Wave", style: "Amber Ale", country: "US", color: "dorado claro", alcoholPercentage: 4.4, ibu: 21, description: "Golden Ale hawaiana suave." },
  { name: "Allagash White", style: "Weissbier", country: "US", color: "dorado claro", alcoholPercentage: 5.2, ibu: 13, description: "Witbier de culto en EEUU." },
  { name: "North Coast Old Rasputin", style: "Stout", country: "US", color: "negro opaco", alcoholPercentage: 9.0, ibu: 75, description: "Imperial Stout rusa legendaria." },
  { name: "Toppling Goliath King Sue", style: "IPA", country: "US", color: "amarillo dorado", alcoholPercentage: 7.8, ibu: 100, description: "Double IPA turbia y famosa." },
  { name: "Tree House Julius", style: "IPA", country: "US", color: "naranja", alcoholPercentage: 6.8, ibu: 0, description: "El rey de las NEIPA, zumo puro." },
  { name: "The Alchemist Heady Topper", style: "IPA", country: "US", color: "dorado claro", alcoholPercentage: 8.0, ibu: 100, description: "La cerveza que creó el hype de las DIPA." },
  { name: "Russian River Pliny the Elder", style: "IPA", country: "US", color: "dorado claro", alcoholPercentage: 8.0, ibu: 100, description: "La Double IPA de referencia mundial." },

  // --- REPÚBLICA CHECA ---
  { name: "Pilsner Urquell", style: "Pilsner", country: "CZ", color: "dorado claro", alcoholPercentage: 4.4, ibu: 40, description: "La primera pilsner dorada del mundo (1842)." },
  { name: "Budweiser Budvar", style: "Lager", country: "CZ", color: "dorado claro", alcoholPercentage: 5.0, ibu: 22, description: "La auténtica lager de České Budějovice." },
  { name: "Staropramen", style: "Lager", country: "CZ", color: "dorado claro", alcoholPercentage: 5.0, ibu: 27, description: "La cerveza de Praga." },
  { name: "Kozel Premium", style: "Lager", country: "CZ", color: "dorado claro", alcoholPercentage: 4.6, ibu: 20, description: "Lager checa suave y popular." },
  { name: "Kozel Dark", style: "Lager", country: "CZ", color: "marrón oscuro", alcoholPercentage: 3.8, ibu: 18, description: "Dunkel checa dulce y ligera." },
  { name: "Bernard Celebration", style: "Lager", country: "CZ", color: "dorado claro", alcoholPercentage: 5.0, ibu: 30, description: "Lager no pasteurizada con carácter." },
  { name: "Gambrinus Original", style: "Lager", country: "CZ", color: "dorado claro", alcoholPercentage: 4.3, ibu: 25, description: "Muy popular en la República Checa." },
  { name: "Radegast Birell", style: "Lager", country: "CZ", color: "dorado claro", alcoholPercentage: 0.5, ibu: 20, description: "Lager sin alcohol de calidad." },
  { name: "Svijany Máz", style: "Lager", country: "CZ", color: "dorado claro", alcoholPercentage: 4.8, ibu: 28, description: "Lager regional muy apreciada." },

  // --- MÉXICO ---
  { name: "Corona Extra", style: "Lager", country: "MX", color: "dorado claro", alcoholPercentage: 4.5, ibu: 18, description: "La cerveza mexicana más famosa del mundo." },
  { name: "Modelo Especial", style: "Pilsner", country: "MX", color: "dorado claro", alcoholPercentage: 4.4, ibu: 18, description: "Pilsner rica y completa." },
  { name: "Negra Modelo", style: "Lager", country: "MX", color: "marrón oscuro", alcoholPercentage: 5.3, ibu: 19, description: "Munich Dunkel estilo vienes." },
  { name: "Dos Equis Lager", style: "Lager", country: "MX", color: "dorado claro", alcoholPercentage: 4.2, ibu: 10, description: "Suave, maltosa y ligera." },
  { name: "Dos Equis Ambar", style: "Lager", country: "MX", color: "ámbar claro", alcoholPercentage: 4.7, ibu: 20, description: "Vienna lager tradicional." },
  { name: "Tecate", style: "Lager", country: "MX", color: "dorado claro", alcoholPercentage: 4.5, ibu: 14, description: "Cerveza del norte de México." },
  { name: "Pacífico Clara", style: "Pilsner", country: "MX", color: "dorado claro", alcoholPercentage: 4.5, ibu: 15, description: "Pilsner refrescante de Mazatlán." },
  { name: "Sol", style: "Lager", country: "MX", color: "dorado claro", alcoholPercentage: 4.5, ibu: 18, description: "Lager ligera para el sol." },
  { name: "Bohemia Pilsner", style: "Pilsner", country: "MX", color: "dorado claro", alcoholPercentage: 4.9, ibu: 25, description: "Pilsner mexicana premium con lúpulo Styrian." },
  { name: "Indio", style: "Lager", country: "MX", color: "marrón oscuro", alcoholPercentage: 4.1, ibu: 18, description: "Cerveza oscura maltosa y caramelo." },
  { name: "Minerva IPA", style: "IPA", country: "MX", color: "ámbar claro", alcoholPercentage: 6.5, ibu: 60, description: "Artesanal mexicana, pionera en el país." },
  { name: "Minerva Pale Ale", style: "APA", country: "MX", color: "dorado claro", alcoholPercentage: 6.0, ibu: 35, description: "English Mild Ale mexicana." },

  // --- PAÍSES BAJOS ---
  { name: "Heineken", style: "Lager", country: "NL", color: "dorado claro", alcoholPercentage: 5.0, ibu: 19, description: "La botella verde más reconocible del mundo." },
  { name: "Amstel", style: "Lager", country: "NL", color: "dorado claro", alcoholPercentage: 5.0, ibu: 18, description: "Lager holandesa de tradición." },
  { name: "Grolsch Premium Pilsner", style: "Pilsner", country: "NL", color: "dorado claro", alcoholPercentage: 5.0, ibu: 28, description: "Con su icónico tapón 'swing-top'." },
  { name: "Bavaria Pilsener", style: "Pilsner", country: "NL", color: "dorado claro", alcoholPercentage: 5.0, ibu: 20, description: "Pilsner familiar independiente." },
  { name: "Hertog Jan Pilsener", style: "Pilsner", country: "NL", color: "dorado claro", alcoholPercentage: 5.1, ibu: 25, description: "Lager premium de Limburgo." },
  { name: "La Trappe Quadrupel", style: "Amber Ale", country: "NL", color: "marrón oscuro", alcoholPercentage: 10.0, ibu: 22, description: "Trapense holandesa muy potente." },
  { name: "La Trappe Tripel", style: "Amber Ale", country: "NL", color: "amarillo dorado", alcoholPercentage: 8.0, ibu: 25, description: "Trapense dorada y afrutada." },
  { name: "La Trappe Blond", style: "Amber Ale", country: "NL", color: "amarillo dorado", alcoholPercentage: 6.5, ibu: 20, description: "Trapense rubia accesible." },
  { name: "Brouwerij 't IJ Zatte", style: "Amber Ale", country: "NL", color: "amarillo dorado", alcoholPercentage: 8.0, ibu: 25, description: "Tripel orgánica de Ámsterdam." },
  { name: "Jopen Mooie Nel", style: "IPA", country: "NL", color: "ámbar claro", alcoholPercentage: 6.5, ibu: 70, description: "IPA holandesa premiada." },

  // --- ITALIA ---
  { name: "Peroni Nastro Azzurro", style: "Lager", country: "IT", color: "dorado claro", alcoholPercentage: 5.1, ibu: 24, description: "Lager italiana de estilo y frescura." },
  { name: "Birra Moretti", style: "Lager", country: "IT", color: "dorado claro", alcoholPercentage: 4.6, ibu: 18, description: "La cerveza del hombre del bigote." },
  { name: "Ichnusa Non Filtrata", style: "Lager", country: "IT", color: "dorado claro", alcoholPercentage: 5.0, ibu: 20, description: "Cerveza sarda turbia y salvaje." },
  { name: "Poretti 4 Luppoli", style: "Lager", country: "IT", color: "dorado claro", alcoholPercentage: 5.5, ibu: 24, description: "Lager equilibrada con 4 lúpulos." },
  { name: "Menabrea Bionda", style: "Lager", country: "IT", color: "dorado claro", alcoholPercentage: 4.8, ibu: 22, description: "Lager premium del Piamonte." },
  { name: "Baladin Isaac", style: "Weissbier", country: "IT", color: "dorado claro", alcoholPercentage: 5.0, ibu: 10, description: "Witbier artesanal con especias italianas." },
  { name: "Birra del Borgo ReAle", style: "APA", country: "IT", color: "ámbar claro", alcoholPercentage: 6.4, ibu: 40, description: "APA inspirada en las americanas." },

  // --- FRANCIA ---
  { name: "Kronenbourg 1664", style: "Lager", country: "FR", color: "dorado claro", alcoholPercentage: 5.0, ibu: 20, description: "La lager premium de Francia." },
  { name: "1664 Blanc", style: "Weissbier", country: "FR", color: "dorado claro", alcoholPercentage: 5.0, ibu: 15, description: "Trigo con cítricos, muy afrutada." },
  { name: "Pelforth Brune", style: "Amber Ale", country: "FR", color: "marrón oscuro", alcoholPercentage: 6.5, ibu: 20, description: "Ale oscura dulce francesa." },
  { name: "Jenlain Ambrée", style: "Amber Ale", country: "FR", color: "ámbar claro", alcoholPercentage: 7.5, ibu: 25, description: "Bière de Garde tradicional." },
  { name: "3 Monts", style: "Amber Ale", country: "FR", color: "amarillo dorado", alcoholPercentage: 8.5, ibu: 20, description: "Cerveza fuerte del norte de Francia." },
  { name: "La Goudale", style: "Amber Ale", country: "FR", color: "amarillo dorado", alcoholPercentage: 7.2, ibu: 28, description: "Bière de Garde histórica." },

  // --- ASIA (Japón, China, Tailandia, India, Singapur) ---
  { name: "Asahi Super Dry", style: "Lager", country: "JP", color: "dorado claro", alcoholPercentage: 5.0, ibu: 16, description: "Karakuchi: sabor seco y crujiente." },
  { name: "Sapporo Premium", style: "Lager", country: "JP", color: "dorado claro", alcoholPercentage: 4.9, ibu: 18, description: "La cerveza más antigua de Japón." },
  { name: "Kirin Ichiban", style: "Lager", country: "JP", color: "dorado claro", alcoholPercentage: 5.0, ibu: 19, description: "Solo primera prensa del mosto." },
  { name: "Suntory The Premium Malt's", style: "Pilsner", country: "JP", color: "dorado claro", alcoholPercentage: 5.5, ibu: 24, description: "Pilsner japonesa de alta calidad." },
  { name: "Hitachino Nest White Ale", style: "Weissbier", country: "JP", color: "dorado claro", alcoholPercentage: 5.5, ibu: 13, description: "Witbier japonesa con yuzu y nuez moscada." },
  { name: "Tsingtao", style: "Lager", country: "CN", color: "dorado claro", alcoholPercentage: 4.7, ibu: 15, description: "La cerveza más famosa de China." },
  { name: "Singha", style: "Lager", country: "TH", color: "dorado claro", alcoholPercentage: 5.0, ibu: 25, description: "Lager tailandesa original con carácter." },
  { name: "Chang", style: "Lager", country: "TH", color: "dorado claro", alcoholPercentage: 5.0, ibu: 10, description: "Cerveza tailandesa refrescante." },
  { name: "Tiger Beer", style: "Lager", country: "SG", color: "dorado claro", alcoholPercentage: 5.0, ibu: 18, description: "Lager tropical nacida en Singapur." },
  { name: "Kingfisher Premium", style: "Lager", country: "IN", color: "dorado claro", alcoholPercentage: 4.8, ibu: 18, description: "La cerveza número 1 de la India." },
  { name: "Bintang", style: "Pilsner", country: "ID", color: "dorado claro", alcoholPercentage: 4.7, ibu: 18, description: "Pilsner de Indonesia." },
  { name: "Saigon Special", style: "Lager", country: "VN", color: "dorado claro", alcoholPercentage: 4.9, ibu: 15, description: "Lager vietnamita 100% malta." },
  { name: "San Miguel Pale Pilsen", style: "Pilsner", country: "PH", color: "dorado claro", alcoholPercentage: 5.0, ibu: 20, description: "La original filipina, no la española." },

  // --- LATINOAMÉRICA (Resto) ---
  { name: "Quilmes Cristal", style: "Lager", country: "AR", color: "dorado claro", alcoholPercentage: 4.9, ibu: 15, description: "El sabor del encuentro argentino." },
  { name: "Brahma Chopp", style: "Lager", country: "BR", color: "dorado claro", alcoholPercentage: 4.8, ibu: 10, description: "Lager brasileña muy ligera." },
  { name: "Skol", style: "Lager", country: "BR", color: "dorado claro", alcoholPercentage: 4.7, ibu: 8, description: "La cerveza más popular de Brasil." },
  { name: "Antarctica", style: "Lager", country: "BR", color: "dorado claro", alcoholPercentage: 4.9, ibu: 12, description: "Clásica de Río de Janeiro." },
  { name: "Cusqueña Dorada", style: "Lager", country: "PE", color: "dorado claro", alcoholPercentage: 5.0, ibu: 20, description: "Lager premium de Perú 100% cebada." },
  { name: "Cusqueña Trigo", style: "Weissbier", country: "PE", color: "dorado claro", alcoholPercentage: 5.0, ibu: 15, description: "Edición trigo peruana." },
  { name: "Club Colombia Dorada", style: "Lager", country: "CO", color: "dorado claro", alcoholPercentage: 4.7, ibu: 18, description: "Lager colombiana con orgullo." },
  { name: "Club Colombia Roja", style: "Lager", country: "CO", color: "ámbar claro", alcoholPercentage: 4.7, ibu: 20, description: "Lager tostada suave." },
  { name: "Águila", style: "Lager", country: "CO", color: "dorado claro", alcoholPercentage: 4.0, ibu: 15, description: "La cerveza de Colombia." },
  { name: "Presidente", style: "Pilsner", country: "DO", color: "dorado claro", alcoholPercentage: 5.0, ibu: 18, description: "El orgullo dominicano, servir casi congelada." },
  { name: "Imperial", style: "Lager", country: "CR", color: "dorado claro", alcoholPercentage: 4.6, ibu: 16, description: "La cerveza de Costa Rica." },
  { name: "Toña", style: "Lager", country: "NI", color: "dorado claro", alcoholPercentage: 4.6, ibu: 15, description: "Lager nicaragüense suave." },
  { name: "Polar Pilsen", style: "Pilsner", country: "VE", color: "dorado claro", alcoholPercentage: 4.5, ibu: 15, description: "La Polarcita de Venezuela." },
  { name: "Cristal", style: "Lager", country: "CL", color: "dorado claro", alcoholPercentage: 4.6, ibu: 15, description: "La cerveza de Chile." },
  { name: "Kunstmann Torobayo", style: "Amber Ale", country: "CL", color: "ámbar claro", alcoholPercentage: 5.0, ibu: 19, description: "Pale Ale chilena de Valdivia." },

  // --- OCEANIA ---
  { name: "Foster's", style: "Lager", country: "AU", color: "dorado claro", alcoholPercentage: 4.0, ibu: 12, description: "Famosa internacionalmente como australiana." },
  { name: "Victoria Bitter (VB)", style: "Lager", country: "AU", color: "dorado claro", alcoholPercentage: 4.9, ibu: 25, description: "Lager australiana para sed intensa." },
  { name: "Coopers Pale Ale", style: "APA", country: "AU", color: "dorado claro", alcoholPercentage: 4.5, ibu: 22, description: "Sparkling Ale fermentada en botella." },
  { name: "Little Creatures Pale Ale", style: "APA", country: "AU", color: "ámbar claro", alcoholPercentage: 5.2, ibu: 35, description: "APA australiana muy aromática." },
  { name: "Steinlager Classic", style: "Lager", country: "NZ", color: "dorado claro", alcoholPercentage: 5.0, ibu: 30, description: "Lager neozelandesa premiada." },
  { name: "Speight's Gold Medal", style: "Amber Ale", country: "NZ", color: "ámbar claro", alcoholPercentage: 4.0, ibu: 20, description: "La cerveza del sur de Nueva Zelanda." },

  // --- OTROS PAÍSES EUROPA ---
  { name: "Carlsberg Pilsner", style: "Pilsner", country: "DK", color: "dorado claro", alcoholPercentage: 5.0, ibu: 25, description: "Probablemente la mejor cerveza del mundo." },
  { name: "Tuborg Green", style: "Pilsner", country: "DK", color: "dorado claro", alcoholPercentage: 4.6, ibu: 20, description: "Pilsner danesa refrescante." },
  { name: "Mikkeller Beer Geek Breakfast", style: "Stout", country: "DK", color: "negro opaco", alcoholPercentage: 7.5, ibu: 65, description: "Stout con café de culto." },
  { name: "Super Bock", style: "Lager", country: "PT", color: "dorado claro", alcoholPercentage: 5.2, ibu: 22, description: "La cerveza más vendida de Portugal." },
  { name: "Sagres", style: "Lager", country: "PT", color: "dorado claro", alcoholPercentage: 5.0, ibu: 20, description: "Lager portuguesa seca y ligera." },
  { name: "Gösser Märzen", style: "Lager", country: "AT", color: "dorado claro", alcoholPercentage: 5.2, ibu: 22, description: "La cerveza más popular de Austria." },
  { name: "Stiegl Goldbräu", style: "Lager", country: "AT", color: "dorado claro", alcoholPercentage: 5.0, ibu: 24, description: "Lager de Salzburgo." },
  { name: "Samichlaus Classic", style: "Lager", country: "AT", color: "marrón oscuro", alcoholPercentage: 14.0, ibu: 30, description: "Una de las lagers más fuertes del mundo." },
  { name: "Zywiec", style: "Lager", country: "PL", color: "dorado claro", alcoholPercentage: 5.6, ibu: 24, description: "Lager polaca premium." },
  { name: "Tyskie Gronie", style: "Lager", country: "PL", color: "dorado claro", alcoholPercentage: 5.2, ibu: 20, description: "Pilsner polaca muy popular." },
  { name: "Baltika 7 Export", style: "Lager", country: "RU", color: "dorado claro", alcoholPercentage: 5.4, ibu: 18, description: "Lager rusa exportada mundialmente." },
  { name: "Baltika 9 Strong", style: "Lager", country: "RU", color: "dorado claro", alcoholPercentage: 8.0, ibu: 20, description: "Lager extra fuerte." },
  { name: "Ursus Premium", style: "Pilsner", country: "RO", color: "dorado claro", alcoholPercentage: 5.0, ibu: 20, description: "El rey de la cerveza en Rumanía." },
  { name: "Mythos", style: "Lager", country: "GR", color: "dorado claro", alcoholPercentage: 4.7, ibu: 17, description: "La cerveza del verano griego." },
  { name: "Efes Pilsen", style: "Pilsner", country: "TR", color: "dorado claro", alcoholPercentage: 5.0, ibu: 22, description: "Pilsner turca mediterránea." },
  { name: "Estrella Damm Inedit", style: "Weissbier", country: "ES", color: "dorado claro", alcoholPercentage: 4.8, ibu: 15, description: "Creada por Ferran Adrià, mezcla de trigo y cebada." },
  { name: "Lech Premium", style: "Lager", country: "PL", color: "dorado claro", alcoholPercentage: 5.0, ibu: 18, description: "Lager polaca refrescante." },
  { name: "Karlovacko", style: "Lager", country: "HR", color: "dorado claro", alcoholPercentage: 5.0, ibu: 20, description: "Lager nacional de Croacia." },
  { name: "Ozujsko", style: "Lager", country: "HR", color: "dorado claro", alcoholPercentage: 5.0, ibu: 22, description: "La favorita de Zagreb." },
  { name: "Jelen", style: "Lager", country: "RS", color: "dorado claro", alcoholPercentage: 4.6, ibu: 20, description: "Cerveza serbia tradicional." },
  { name: "Lasko Zlatorog", style: "Lager", country: "SI", color: "dorado claro", alcoholPercentage: 4.9, ibu: 22, description: "El orgullo de Eslovenia." },
  { name: "Lapin Kulta", style: "Lager", country: "FI", color: "dorado claro", alcoholPercentage: 5.2, ibu: 18, description: "El oro de Laponia." },
  { name: "Koff", style: "Lager", country: "FI", color: "dorado claro", alcoholPercentage: 4.5, ibu: 15, description: "Lager finlandesa estándar." },
  { name: "Ringnes", style: "Pilsner", country: "NO", color: "dorado claro", alcoholPercentage: 4.6, ibu: 20, description: "La cerveza de Noruega." },
  { name: "Nøgne Ø Porter", style: "Porter", country: "NO", color: "negro opaco", alcoholPercentage: 7.0, ibu: 30, description: "Porter artesana noruega de clase mundial." },
  { name: "Omnipollo Nebuchadnezzar", style: "IPA", country: "SE", color: "ámbar claro", alcoholPercentage: 8.5, ibu: 100, description: "DIPA sueca premiada." },
  { name: "Eriku Õlu", style: "Lager", country: "EE", color: "dorado claro", alcoholPercentage: 4.7, ibu: 18, description: "Cerveza estonia popular." },

  // --- MÁS CRAFT / VARIOS ---
  { name: "Founders Porter", style: "Porter", country: "US", color: "negro opaco", alcoholPercentage: 6.5, ibu: 45, description: "Porter americana robusta y chocolatera." },
  { name: "Anchor Porter", style: "Porter", country: "US", color: "negro opaco", alcoholPercentage: 5.6, ibu: 40, description: "La primera porter americana moderna." },
  { name: "Brooklyn Black Chocolate Stout", style: "Stout", country: "US", color: "negro opaco", alcoholPercentage: 10.0, ibu: 51, description: "Imperial Stout de temporada invierno." },
  { name: "Schofferhofer Grapefruit", style: "Weissbier", country: "DE", color: "naranja", alcoholPercentage: 2.5, ibu: 5, description: "Mezcla de trigo y pomelo, muy dulce." },
  { name: "St. Bernardus Wit", style: "Weissbier", country: "BE", color: "dorado claro", alcoholPercentage: 5.5, ibu: 15, description: "Witbier creada por Pierre Celis." },
  { name: "Blanche de Namur", style: "Weissbier", country: "BE", color: "dorado claro", alcoholPercentage: 4.5, ibu: 12, description: "Mejor Witbier del mundo varios años." },
  { name: "Petrus Aged Pale", style: "Sour Ale", country: "BE", color: "dorado claro", alcoholPercentage: 7.3, ibu: 20, description: "Sour ale envejecida en foeder." },
  { name: "Duchesse de Bourgogne", style: "Sour Ale", country: "BE", color: "marrón oscuro", alcoholPercentage: 6.2, ibu: 11, description: "Roja de Flandes con notas balsámicas." },
  { name: "Timmermans Pêche", style: "Lambic", country: "BE", color: "dorado claro", alcoholPercentage: 4.0, ibu: 10, description: "Lambic de melocotón dulce." },
  { name: "Mort Subite Kriek", style: "Lambic", country: "BE", color: "marrón oscuro", alcoholPercentage: 4.0, ibu: 10, description: "Cerveza de cereza bruselense." },
  { name: "Piraat", style: "Amber Ale", country: "BE", color: "ámbar claro", alcoholPercentage: 10.5, ibu: 23, description: "Strong ale belga picante." },
  { name: "Karmeliet Tripel", style: "Amber Ale", country: "BE", color: "dorado claro", alcoholPercentage: 8.4, ibu: 16, description: "Receta de 1679 con tres granos." },
  { name: "Maredsous 10 Triple", style: "Amber Ale", country: "BE", color: "dorado claro", alcoholPercentage: 10.0, ibu: 20, description: "Cerveza de abadía benedictina." },
  { name: "Affligem Blonde", style: "Amber Ale", country: "BE", color: "dorado claro", alcoholPercentage: 6.8, ibu: 24, description: "Abadía clásica y equilibrada." },
  { name: "Palm", style: "Amber Ale", country: "BE", color: "ámbar claro", alcoholPercentage: 5.2, ibu: 18, description: "Special Belge, fácil de beber." },
  { name: "BrewDog Nanny State", style: "APA", country: "GB", color: "ámbar claro", alcoholPercentage: 0.5, ibu: 45, description: "Sin alcohol pero con mucho lúpulo." },
  { name: "Adnams Ghost Ship", style: "APA", country: "GB", color: "ámbar claro", alcoholPercentage: 4.5, ibu: 40, description: "Pale ale cítrica inspirada en Halloween." },
  { name: "Camden Hells", style: "Lager", country: "GB", color: "dorado claro", alcoholPercentage: 4.6, ibu: 24, description: "Híbrido entre Helles y Pilsner en Londres." },
  { name: "Meantime London Lager", style: "Lager", country: "GB", color: "dorado claro", alcoholPercentage: 4.5, ibu: 20, description: "Lager craft de Londres." },
  { name: "Harviestoun Old Engine Oil", style: "Porter", country: "GB", color: "negro opaco", alcoholPercentage: 6.0, ibu: 40, description: "Porter negra y viscosa." },
  { name: "Red Stripe", style: "Lager", country: "JM", color: "dorado claro", alcoholPercentage: 4.7, ibu: 17, description: "El orgullo de Jamaica." },
  { name: "Carib", style: "Lager", country: "TT", color: "dorado claro", alcoholPercentage: 5.0, ibu: 15, description: "Cerveza de Trinidad y Tobago." },
  { name: "Banks", style: "Lager", country: "BB", color: "dorado claro", alcoholPercentage: 4.7, ibu: 16, description: "La cerveza de Barbados." },
  { name: "Tusker", style: "Lager", country: "KE", color: "dorado claro", alcoholPercentage: 4.2, ibu: 15, description: "Cerveza famosa de Kenia." },
  { name: "Windhoek Lager", style: "Lager", country: "NA", color: "dorado claro", alcoholPercentage: 4.0, ibu: 20, description: "Lager de Namibia bajo la ley de pureza." },
  { name: "Casa Bruja Fula", style: "Amber Ale", country: "PA", color: "dorado claro", alcoholPercentage: 4.7, ibu: 25, description: "Blonde Ale panameña." },
  { name: "Cerveza Panama", style: "Lager", country: "PA", color: "dorado claro", alcoholPercentage: 4.8, ibu: 15, description: "Lager tradicional de Panamá." },
  { name: "Salva-Vida", style: "Lager", country: "HN", color: "dorado claro", alcoholPercentage: 4.8, ibu: 15, description: "Cerveza hondureña." },
  { name: "Gallo", style: "Lager", country: "GT", color: "dorado claro", alcoholPercentage: 5.0, ibu: 16, description: "Ícono nacional de Guatemala." },
  { name: "Pilsener Ecuador", style: "Lager", country: "EC", color: "dorado claro", alcoholPercentage: 4.0, ibu: 15, description: "Cerveza nacional de Ecuador." },
  { name: "Zulia", style: "Lager", country: "VE", color: "dorado claro", alcoholPercentage: 4.5, ibu: 18, description: "Lager original de Maracaibo." },
  { name: "Hite", style: "Lager", country: "KR", color: "dorado claro", alcoholPercentage: 4.3, ibu: 12, description: "Lager coreana ligera." },
  { name: "Cass Fresh", style: "Lager", country: "KR", color: "dorado claro", alcoholPercentage: 4.5, ibu: 10, description: "La cerveza joven de Corea del Sur." },
  { name: "Klinskoye", style: "Lager", country: "RU", color: "dorado claro", alcoholPercentage: 4.5, ibu: 15, description: "Lager rusa popular." },
  { name: "Obolon", style: "Lager", country: "UA", color: "dorado claro", alcoholPercentage: 5.0, ibu: 18, description: "Cerveza ucraniana." },
  { name: "Lvivske 1715", style: "Lager", country: "UA", color: "dorado claro", alcoholPercentage: 4.5, ibu: 16, description: "La cerveza más antigua de Ucrania." },
  { name: "Alhambra Roja", style: "Lager", country: "ES", color: "ámbar claro", alcoholPercentage: 7.2, ibu: 25, description: "Bock española intensa." },
  { name: "San Miguel Magna", style: "Lager", country: "ES", color: "dorado claro", alcoholPercentage: 5.7, ibu: 24, description: "Golden Lager contemporánea." },
  { name: "Estrella de Levante", style: "Lager", country: "ES", color: "dorado claro", alcoholPercentage: 4.8, ibu: 20, description: "La cerveza de Murcia." },
  { name: "Cruzcampo Especial", style: "Lager", country: "ES", color: "dorado claro", alcoholPercentage: 5.6, ibu: 26, description: "Cerveza andaluza con cuerpo." },
  { name: "Ambar Especial", style: "Lager", country: "ES", color: "ámbar claro", alcoholPercentage: 5.2, ibu: 25, description: "Lager de Zaragoza." },
  { name: "Keler", style: "Lager", country: "ES", color: "dorado claro", alcoholPercentage: 6.0, ibu: 25, description: "La cerveza de Donostia, receta intensa." },
  { name: "Oro de Bilbao", style: "Lager", country: "ES", color: "dorado claro", alcoholPercentage: 6.0, ibu: 24, description: "Cerveza de Bilbao." },
  { name: "La Salve Original", style: "Lager", country: "ES", color: "dorado claro", alcoholPercentage: 5.9, ibu: 25, description: "Auténtica de Bilbao renacida." }
];

// Datos de locales/bares iniciales
const initialVenues = [
  // --- MADRID (España) ---
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

  // --- BARCELONA (España) ---
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

  // --- VALENCIA (España) ---
  { name: "Tyris on Tap", address: "Carrer de la Pau, 27", city: "Valencia", country: "ES" },
  { name: "Birra & Blues", address: "Carrer de Sant Vicent Màrtir, 23", city: "Valencia", country: "ES" },
  { name: "Olhöps Craft Beer House", address: "Carrer de Sueca, 21", city: "Valencia", country: "ES" },
  { name: "Ruzanuvol", address: "Carrer de Lluís de Santàngel, 3", city: "Valencia", country: "ES" },
  { name: "Las Cervezas del Mercado", address: "Mercado de Colón", city: "Valencia", country: "ES" },

  // --- PAÍS VASCO (España) ---
  { name: "La Viña del Ensanche", address: "Calle de la Diputación, 10", city: "Bilbao", country: "ES" },
  { name: "Mojigatos", address: "Calle de Elcano, 21", city: "Bilbao", country: "ES" },
  { name: "Penguin Bar", address: "Gregorio de la Revilla, 8", city: "Bilbao", country: "ES" },
  { name: "Bihotz Café", address: "Arechaga Kalea, 6", city: "Bilbao", country: "ES" },
  { name: "Mala Gissona Beer House", address: "Zabaleta Kalea, 53", city: "San Sebastián", country: "ES" },
  { name: "Drunkat", address: "Virgen del Carmen, 33", city: "San Sebastián", country: "ES" },

  // --- ANDALUCÍA (España) ---
  { name: "La Raza", address: "Calle Castilla, 26", city: "Sevilla", country: "ES" },
  { name: "Maquila Bar", address: "Calle Delgado, 4", city: "Sevilla", country: "ES" },
  { name: "Hops & Dreams", address: "Calle Jesús del Gran Poder, 83", city: "Sevilla", country: "ES" },
  { name: "La Madriguera", address: "Calle Carretería, 53", city: "Málaga", country: "ES" },
  { name: "Central Beers", address: "Calle Cárcer, 6", city: "Málaga", country: "ES" },
  { name: "Colagallo Craft Beer", address: "Calle Molinos, 28", city: "Granada", country: "ES" },

  // --- OTRAS CIUDADES ESPAÑA ---
  { name: "La Burbuja que Ríe", address: "Calle Boggiero, 28", city: "Zaragoza", country: "ES" },
  { name: "Hoppy", address: "Calle Casto Méndez Núñez, 36", city: "Zaragoza", country: "ES" },
  { name: "Cervecería Vor", address: "Calle Instituto, 23", city: "Gijón", country: "ES" },
  { name: "La Caminera", address: "Calle Cortines, 2", city: "Gijón", country: "ES" },
  { name: "Malte", address: "Rúa Galera, 47", city: "A Coruña", country: "ES" },
  { name: "O Bandullo do Lambon", address: "Rúa da Estrella, 12", city: "Santiago de Compostela", country: "ES" },

  // --- ALEMANIA (Iconos mundiales) ---
  { name: "Hofbräuhaus München", address: "Platzl 9", city: "Munich", country: "DE" },
  { name: "Augustiner-Keller", address: "Arnulfstraße 52", city: "Munich", country: "DE" },
  { name: "Schneider Bräuhaus", address: "Tal 7", city: "Munich", country: "DE" },
  { name: "Schlenkerla", address: "Dominikanerstraße 6", city: "Bamberg", country: "DE" },
  { name: "Früh am Dom", address: "Am Hof 12", city: "Cologne", country: "DE" },
  { name: "Uerige Obergärige Hausbrauerei", address: "Berger Str. 1", city: "Düsseldorf", country: "DE" },
  { name: "Prater Garten", address: "Kastanienallee 7-9", city: "Berlin", country: "DE" },
  { name: "Kaschk", address: "Linienstraße 40", city: "Berlin", country: "DE" },
  
  // --- BÉLGICA (Templos de la cerveza) ---
  { name: "Delirium Café", address: "Impasse de la Fidélité 4A", city: "Brussels", country: "BE" },
  { name: "Moeder Lambic Fontainas", address: "Place Fontainas 8", city: "Brussels", country: "BE" },
  { name: "Cantillon Brewery", address: "Rue Gheude 56", city: "Brussels", country: "BE" },
  { name: "À la Mort Subite", address: "Rue Montagne aux Herbes Potagères 7", city: "Brussels", country: "BE" },
  { name: "De Garre", address: "De Garre 1", city: "Bruges", country: "BE" },
  { name: "Kulminator", address: "Vleminckveld 32", city: "Antwerp", country: "BE" },

  // --- REINO UNIDO E IRLANDA ---
  { name: "The Temple Bar", address: "47 Temple Bar", city: "Dublin", country: "IE" },
  { name: "The Porterhouse", address: "16-18 Parliament St", city: "Dublin", country: "IE" },
  { name: "Guinness Storehouse Gravity Bar", address: "St James's Gate", city: "Dublin", country: "IE" },
  { name: "BrewDog Soho", address: "21 Poland St", city: "London", country: "GB" },
  { name: "The Craft Beer Co.", address: "128 Clerkenwell Rd", city: "London", country: "GB" },
  { name: "Ye Olde Cheshire Cheese", address: "145 Fleet St", city: "London", country: "GB" },
  { name: "Beavertown Taproom", address: "Mill Mead Rd", city: "London", country: "GB" },
  { name: "The Hanging Bat", address: "133 Lothian Rd", city: "Edinburgh", country: "GB" },

  // --- ESTADOS UNIDOS ---
  { name: "McSorley's Old Ale House", address: "15 E 7th St", city: "New York", country: "US" },
  { name: "Tørst", address: "615 Manhattan Ave", city: "New York", country: "US" },
  { name: "Brooklyn Brewery", address: "79 N 11th St", city: "New York", country: "US" },
  { name: "Russian River Brewing", address: "725 4th St", city: "Santa Rosa", country: "US" },
  { name: "Monk's Kettle", address: "3141 16th St", city: "San Francisco", country: "US" },
  { name: "Stone Brewing World Bistro", address: "1999 Citracado Pkwy", city: "Escondido", country: "US" },
  
  // --- REPÚBLICA CHECA ---
  { name: "U Fleků", address: "Křemencova 11", city: "Prague", country: "CZ" },
  { name: "U Zlatého tygra", address: "Husova 17", city: "Prague", country: "CZ" },
  { name: "Lokál Dlouhááá", address: "Dlouhá 33", city: "Prague", country: "CZ" },
  
  // --- RESTO DE EUROPA ---
  { name: "Proeflokaal Arendsnest", address: "Herengracht 90", city: "Amsterdam", country: "NL" },
  { name: "Brouwerij 't IJ", address: "Funenkade 7", city: "Amsterdam", country: "NL" },
  { name: "Mikkeller Bar", address: "Viktoriagade 8", city: "Copenhagen", country: "DK" },
  { name: "Akkurat", address: "Hornsgatan 18", city: "Stockholm", country: "SE" },
  { name: "Open Baladin", address: "Via degli Specchi 6", city: "Rome", country: "IT" },
  { name: "Ma Che Siete Venuti A Fà", address: "Via Benedetta 25", city: "Rome", country: "IT" }
];

export const seedInitialData = {
  async createBeers() {
    console.log('🍺 Creando cervezas iniciales...');
    const createdBeers = [];
    
    for (const beer of initialBeers) {
      try {
        // Verificar si ya existe
        const existing = await client.models.Beer.list({
          filter: { name: { eq: beer.name } }
        });
        
        if (!existing.data || existing.data.length === 0) {
          const response = await client.models.Beer.create({
            ...beer,
            averageRating: Math.random() * 2 + 3, // 3.0 - 5.0
            ratingsCount: Math.floor(Math.random() * 100) + 10, // 10-110 valoraciones
          } as any);
          
          if (response.data) {
            createdBeers.push(response.data);
            console.log(`✓ Creada: ${beer.name}`);
          }
        } else {
          console.log(`→ Ya existe: ${beer.name}`);
          createdBeers.push(existing.data[0]);
        }
      } catch (error) {
        console.error(`✗ Error creando ${beer.name}:`, error);
      }
    }
    
    console.log(`✅ ${createdBeers.length} cervezas disponibles`);
    return createdBeers;
  },

  async createVenues() {
    console.log('🏪 Creando locales iniciales...');
    const createdVenues = [];
    
    for (const venue of initialVenues) {
      try {
        const existing = await client.models.Venue.list({
          filter: { name: { eq: venue.name } }
        });
        
        if (!existing.data || existing.data.length === 0) {
          const response = await client.models.Venue.create({
            ...venue,
            likes: Math.floor(Math.random() * 50) + 5, // 5-55 likes
          });
          
          if (response.data) {
            createdVenues.push(response.data);
            console.log(`✓ Creado: ${venue.name}`);
          }
        } else {
          console.log(`→ Ya existe: ${venue.name}`);
          createdVenues.push(existing.data[0]);
        }
      } catch (error) {
        console.error(`✗ Error creando ${venue.name}:`, error);
      }
    }
    
    console.log(`✅ ${createdVenues.length} locales disponibles`);
    return createdVenues;
  },

  async initializeAll() {
    console.log('🚀 Inicializando datos de BeerSp...');
    
    const beers = await this.createBeers();
    const venues = await this.createVenues();
    
    console.log(`
✅ Inicialización completa:
   - ${beers.length} cervezas
   - ${venues.length} locales
   
🎉 ¡BeerSp está listo para usar!
    `);
    
    return { beers, venues };
  }
};