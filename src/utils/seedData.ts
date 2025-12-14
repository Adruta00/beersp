// src/utils/seedData.ts
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();

// Usuarios de ejemplo con IDs únicos
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
  },
  {
    userId: 'sample-user-pablo-011',
    username: 'pabloUPM',
    email: 'pablo@ejemploUPM.com',
    birthdate: '2003-07-16',
    fullName: 'Pablo Lopez',
    location: 'Madrid, España',
    bio: 'Coleccionista de cervezas nacionales 🍻',
    tastingsCount: 95,
    venuesAdded: 10,
    lastSevenDaysTastings: 4,
    lastSevenDaysVenues: 2
  },
  {
    userId: 'sample-user-adri-012',
    username: 'adriUPM',
    email: 'adri@ejemploUPM.com',
    birthdate: '2003-09-13',
    fullName: 'Adrian Fernandez De la Rosa',
    location: 'Madrid, España',
    bio: 'Coleccionista de cervezas asturianas 🍻',
    tastingsCount: 95,
    venuesAdded: 10,
    lastSevenDaysTastings: 4,
     lastSevenDaysVenues: 2
  },
  {
     userId: 'sample-user-farid-013',
    username: 'faridUPM',
    email: 'farid@ejemploUPM.com',
    birthdate: '2003-10-23',
    fullName: 'Farid Gonzalez',
    location: 'Madrid, España',
    bio: 'Coleccionista de cervezas de pontevedra 🍻',
    tastingsCount: 95,
    venuesAdded: 10,
    lastSevenDaysTastings: 4,
  },
  {
     userId: 'sample-user-fernan-014',
    username: 'fernanUPM',
    email: 'fernan@ejemploUPM.com',
    birthdate: '2003-02-07',
    fullName: 'Fernan Alvarez',
    location: 'Madrid, España',
    bio: 'Coleccionista de cervezas turisticas 🍻',
    tastingsCount: 95,
    venuesAdded: 10,
    lastSevenDaysTastings: 4,
  },
];

// Datos de ejemplo de cervezas
const SAMPLE_BEERS = [
  {
    name: "Estrella Galicia",
    style: "LAGER",
    country: "ES",
    description: "Cerveza rubia tipo Pilsen de gran calidad y sabor equilibrado",
    alcoholPercentage: 5.5,
    ibu: 25,
    color: "GOLDEN_YELLOW"
  },
  {
    name: "Alhambra Reserva 1925",
    style: "LAGER",
    country: "ES",
    description: "Cerveza especial con carácter y personalidad única",
    alcoholPercentage: 6.4,
    ibu: 30,
    color: "LIGHT_AMBER"
  },
  {
    name: "Voll-Damm",
    style: "LAGER",
    country: "ES",
    description: "Cerveza doble malta de gran cuerpo y sabor intenso",
    alcoholPercentage: 7.2,
    ibu: 28,
    color: "DARK_BROWN"
  },
  {
    name: "La Virgen IPA",
    style: "IPA",
    country: "ES",
    description: "IPA artesanal madrileña con intenso aroma a lúpulo",
    alcoholPercentage: 6.5,
    ibu: 65,
    color: "LIGHT_AMBER"
  },
  {
    name: "Guinness Draught",
    style: "STOUT",
    country: "GB",
    description: "Stout irlandesa icónica con notas de café y chocolate",
    alcoholPercentage: 4.2,
    ibu: 45,
    color: "OPAQUE_BLACK"
  },
  {
    name: "Paulaner Weissbier",
    style: "WEISSBIER",
    country: "DE",
    description: "Cerveza de trigo alemana tradicional con carácter afrutado",
    alcoholPercentage: 5.5,
    ibu: 15,
    color: "GOLDEN_YELLOW"
  },
  {
    name: "Chimay Blue",
    style: "PORTER",
    country: "BE",
    description: "Cerveza trapense belga oscura y compleja",
    alcoholPercentage: 9.0,
    ibu: 35,
    color: "DARK_BROWN"
  },
  {
    name: "Brewdog Punk IPA",
    style: "IPA",
    country: "GB",
    description: "IPA británica moderna con carácter rebelde",
    alcoholPercentage: 5.6,
    ibu: 60,
    color: "LIGHT_AMBER"
  },
  {
    name: "Cruzcampo",
    style: "LAGER",
    country: "ES",
    description: "Cerveza andaluza refrescante y ligera",
    alcoholPercentage: 4.8,
    ibu: 20,
    color: "LIGHT_GOLD"
  },
  {
    name: "Mahou 5 Estrellas",
    style: "LAGER",
    country: "ES",
    description: "Lager madrileña clásica de sabor equilibrado",
    alcoholPercentage: 5.5,
    ibu: 22,
    color: "GOLDEN_YELLOW"
  }
];

// Datos de ejemplo de locales
const SAMPLE_VENUES = [
  {
    name: "La Cervecería del Barrio",
    address: "Calle Mayor, 15",
    city: "Madrid",
    country: "ES"
  },
  {
    name: "Brew House Barcelona",
    address: "Carrer de la Diputació, 234",
    city: "Barcelona",
    country: "ES"
  },
  {
    name: "El Rincón de la Birra",
    address: "Calle San Vicente, 8",
    city: "Sevilla",
    country: "ES"
  },
  {
    name: "Craft Beer Corner",
    address: "Avenida de la Constitución, 45",
    city: "Valencia",
    country: "ES"
  },
  {
    name: "The Beer Garden",
    address: "Plaza del Sol, 3",
    city: "Madrid",
    country: "ES"
  }
];

// Datos de ejemplo de galardones
const SAMPLE_BADGES = [
  {
    name: "Explorador Cervecero",
    description: "Prueba diferentes cervezas",
    category: "TASTINGS",
    levels: JSON.stringify([
      { level: 1, threshold: 5, name: "Novato" },
      { level: 2, threshold: 10, name: "Entusiasta" },
      { level: 3, threshold: 25, name: "Aficionado" },
      { level: 4, threshold: 50, name: "Experto" },
      { level: 5, threshold: 100, name: "Maestro" }
    ])
  },
  {
    name: "Viajero del Mundo",
    description: "Prueba cervezas de diferentes países",
    category: "COUNTRIES",
    levels: JSON.stringify([
      { level: 1, threshold: 3, name: "Turista" },
      { level: 2, threshold: 5, name: "Trotamundos" },
      { level: 3, threshold: 10, name: "Aventurero" },
      { level: 4, threshold: 15, name: "Cosmopolita" },
      { level: 5, threshold: 20, name: "Ciudadano del Mundo" }
    ])
  },
  {
    name: "Conocedor de Estilos",
    description: "Prueba diferentes estilos de cerveza",
    category: "STYLES",
    levels: JSON.stringify([
      { level: 1, threshold: 3, name: "Curioso" },
      { level: 2, threshold: 5, name: "Explorador" },
      { level: 3, threshold: 8, name: "Conocedor" },
      { level: 4, threshold: 10, name: "Especialista" },
      { level: 5, threshold: 11, name: "Sommelier" }
    ])
  },
  {
    name: "Descubridor de Locales",
    description: "Visita diferentes cervecerías",
    category: "VENUES",
    levels: JSON.stringify([
      { level: 1, threshold: 3, name: "Visitante" },
      { level: 2, threshold: 5, name: "Regular" },
      { level: 3, threshold: 10, name: "Local" },
      { level: 4, threshold: 20, name: "VIP" },
      { level: 5, threshold: 50, name: "Leyenda" }
    ])
  },
  {
    name: "Comunicador Social",
    description: "Comenta las degustaciones de tus amigos",
    category: "COMMENTS",
    levels: JSON.stringify([
      { level: 1, threshold: 5, name: "Tímido" },
      { level: 2, threshold: 10, name: "Conversador" },
      { level: 3, threshold: 25, name: "Sociable" },
      { level: 4, threshold: 50, name: "Influencer" },
      { level: 5, threshold: 100, name: "Community Manager" }
    ])
  }
];

// Función principal para crear datos de ejemplo
export const seedDatabase = async (currentUserId: string) => {
  try {
    console.log('🌱 Iniciando creación de datos de ejemplo...');

    const createdData = {
      beers: 0,
      venues: 0,
      badges: 0,
      users: 0
    };

    // 1. Crear usuarios de ejemplo PRIMERO
    console.log('👥 Creando usuarios de ejemplo...');
    for (const user of SAMPLE_USERS) {
      try {
        // Verificar si el usuario ya existe
        const existing = await client.models.UserProfile.list({
          filter: { userId: { eq: user.userId } },
          limit: 1
        });

        if (!existing.data || existing.data.length === 0) {
          const response = await client.models.UserProfile.create(user);
          if (response.data) {
            createdData.users++;
            console.log(`✅ Usuario creado: ${user.username}`);
          }
        } else {
          console.log(`ℹ️ Usuario ya existe: ${user.username}`);
        }
      } catch (error: any) {
        console.log(`⚠️ Usuario ${user.username}:`, error.message);
      }
    }

    // 2. Crear cervezas de ejemplo
    console.log('🍺 Creando cervezas...');
    const createdBeers = [];
    for (const beer of SAMPLE_BEERS) {
      try {
        const response = await client.models.Beer.create({
          ...beer,
          addedById: currentUserId,
          averageRating: Math.random() * 2 + 3,
          ratingsCount: Math.floor(Math.random() * 50) + 5
        });
        if (response.data) {
          createdBeers.push(response.data);
          createdData.beers++;
        }
      } catch (error: any) {
        console.log(`⚠️ Cerveza ${beer.name}:`, error.message);
      }
    }

    // 3. Crear locales de ejemplo
    console.log('🏪 Creando locales...');
    const createdVenues = [];
    for (const venue of SAMPLE_VENUES) {
      try {
        const response = await client.models.Venue.create({
          ...venue,
          addedById: currentUserId,
          likes: Math.floor(Math.random() * 30) + 5
        });
        if (response.data) {
          createdVenues.push(response.data);
          createdData.venues++;
        }
      } catch (error: any) {
        console.log(`⚠️ Local ${venue.name}:`, error.message);
      }
    }

    // 4. Crear galardones de ejemplo
    console.log('🏆 Creando galardones...');
    for (const badge of SAMPLE_BADGES) {
      try {
        const response = await client.models.Badge.create({
          ...badge,
          createdBy: 'system'
        });
        if (response.data) {
          createdData.badges++;
        }
      } catch (error: any) {
        console.log(`⚠️ Galardón ${badge.name}:`, error.message);
      }
    }

    console.log('✨ Datos de ejemplo creados exitosamente!');
    return {
      success: true,
      data: createdData
    };
  } catch (error) {
    console.error('❌ Error creando datos de ejemplo:', error);
    return { success: false, error };
  }
};

// Función para verificar si ya existen datos
export const checkIfDataExists = async () => {
  try {
    const beersResponse = await client.models.Beer.list({ limit: 1 });
    const badgesResponse = await client.models.Badge.list({ limit: 1 });
    const usersResponse = await client.models.UserProfile.list({ limit: 3 });
    
    return {
      hasBeers: (beersResponse.data?.length || 0) > 0,
      hasBadges: (badgesResponse.data?.length || 0) > 0,
      hasUsers: (usersResponse.data?.length || 0) > 2 // Al menos 2 usuarios además del actual
    };
  } catch (error) {
    console.error('Error verificando datos:', error);
    return { hasBeers: false, hasBadges: false, hasUsers: false };
  }
};

// Función para crear solo usuarios (útil si ya tienes cervezas)
export const createSampleUsersOnly = async () => {
  console.log('👥 Creando solo usuarios de ejemplo...');
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