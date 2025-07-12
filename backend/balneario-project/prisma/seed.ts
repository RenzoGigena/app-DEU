import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const balnearios = [
  {
    id: '1',
    nombre: 'Costanera y Balneario Quilmes',
    localidad: 'Quilmes',
    descripcion: 'Playas amplias, actividades y más.',
    imagen: '/images/balnearios/quilmes1.jpg',
    imagenAlt: 'Balneario La Costa en Mar del Plata',
    telefono: '011-4444-1111',
    url: 'https://quilmes.gob.ar/turismo',
    servicios: [
      { nombreServicio: 'WiFi', tiene: false },
      { nombreServicio: 'Estacionamiento', tiene: true },
      { nombreServicio: 'Entrada accesible', tiene: true },
      { nombreServicio: 'Pileta', tiene: false },
      { nombreServicio: 'Buffet', tiene: false },
      { nombreServicio: 'Kiosco', tiene: false },
      { nombreServicio: 'Baños', tiene: false },
      { nombreServicio: 'Alquiler de reposeras', tiene: false },
      { nombreServicio: 'Guardavidas', tiene: false },
      { nombreServicio: 'Permite mascotas', tiene: true },
    ],
    latitud: -34.711041,
    longitud: -58.221209,
    contaminacionAgua: 26,
    contaminacionArena: 88,
  },
  {
    id: '2',
    nombre: 'Camping Recreo Berazategui',
    localidad: 'Berazategui',
    descripcion:
      'Un espacio ideal para acampar y disfrutar de la naturaleza, con instalaciones básicas para toda la familia.',
    imagen: '/images/balnearios/berazategui1.jpg',
    imagenAlt: 'Camping Recreo Berazategui',
    telefono: '011-4444-2222',
    url: 'https://berazategui.gob.ar/recreo',
    servicios: [
      { nombreServicio: 'Zona de acampe', tiene: true },
      { nombreServicio: 'Parrillas', tiene: true },
      { nombreServicio: 'Baños', tiene: true },
      { nombreServicio: 'Duchas', tiene: true },
      { nombreServicio: 'Kiosco', tiene: true },
      { nombreServicio: 'Electricidad', tiene: false },
      { nombreServicio: 'Pileta', tiene: false },
      { nombreServicio: 'Guardavidas', tiene: false },
      { nombreServicio: 'Permite mascotas', tiene: true },
    ],
    latitud: -34.745558,
    longitud: -58.175301,
    contaminacionAgua: 12,
    contaminacionArena: 26,
  },
  {
    id: '3',
    nombre: 'Playa del Sol',
    localidad: 'San Bernardo',
    descripcion: 'Arena fina y aguas tranquilas, ideal para toda la familia.',
    imagen: '/images/balnearios/sanbernardo1.jpg',
    imagenAlt: 'Playa del Sol en San Bernardo',
    telefono: '02257-432345',
    url: 'https://sanbernardo.gov.ar/playa-del-sol',
    servicios: [
      { nombreServicio: 'Parrillas', tiene: true },
      { nombreServicio: 'WiFi', tiene: true },
      { nombreServicio: 'Baños', tiene: true },
      { nombreServicio: 'Guardavidas', tiene: true },
      { nombreServicio: 'Permite mascotas', tiene: false },
    ],
    latitud: -36.6968,
    longitud: -56.6773,
    contaminacionAgua: 15,
    contaminacionArena: 20,
  },
  {
    id: '4',
    nombre: 'Balneario El Paraíso',
    localidad: 'Villa Gesell',
    descripcion: 'Balneario exclusivo con servicios premium y gastronomía.',
    imagen: '/images/balnearios/vgesell1.jpg',
    imagenAlt: 'Balneario El Paraíso en Villa Gesell',
    telefono: '02255-478900',
    url: 'https://villagesell.gov.ar/el-paraiso',
    servicios: [
      { nombreServicio: 'Buffet', tiene: true },
      { nombreServicio: 'Pileta', tiene: true },
      { nombreServicio: 'Estacionamiento', tiene: true },
      { nombreServicio: 'WiFi', tiene: true },
      { nombreServicio: 'Acceso a la playa', tiene: true },
    ],
    latitud: -37.2653,
    longitud: -56.9737,
    contaminacionAgua: 10,
    contaminacionArena: 12,
  },
  {
    id: '5',
    nombre: 'Playa Serena',
    localidad: 'Mar del Plata',
    descripcion:
      'Una playa tranquila al sur de Mar del Plata, ideal para el descanso.',
    imagen: '/images/balnearios/mdq-serena.jpg',
    imagenAlt: 'Vista de Playa Serena en Mar del Plata',
    telefono: '0223-4956789',
    url: 'https://mardelplata.gob.ar/playa-serena',
    servicios: [
      { nombreServicio: 'Alquiler de sombrillas', tiene: true },
      { nombreServicio: 'Baños públicos', tiene: true },
      { nombreServicio: 'Guardavidas', tiene: true },
      { nombreServicio: 'Parrillas', tiene: false },
      { nombreServicio: 'Kiosco', tiene: true },
    ],
    latitud: -38.1104,
    longitud: -57.5529,
    contaminacionAgua: 9,
    contaminacionArena: 15,
  },
];

async function main() {
  for (const balneario of balnearios) {
    const { servicios, ...balnearioData } = balneario;

    await prisma.balneario.create({
      data: {
        ...balnearioData,
        servicios: {
          create: servicios,
        },
      },
    });
  }

  console.log('✅ Seed completado');
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
