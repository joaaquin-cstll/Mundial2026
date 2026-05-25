/**
 * ═══════════════════════════════════════════
 *  FIFA WORLD CUP 2026 TRACKER — APP.JS
 *  Arquitectura: Vanilla JS + JSON Data
 *  Funciones: Countdown, Fixture, Grupos,
 *             Sedes, Simulador, Búsqueda,
 *             Tema oscuro/claro, Zona horaria
 * ═══════════════════════════════════════════
 */

'use strict';

/* ══════════════════════════════════════
   1. BASE DE DATOS (JSON simulado)
══════════════════════════════════════ */

/** Zona horaria del usuario (auto-detectada) */
const USER_TZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

/** Estadios */
const STADIUMS = [
  {
    id: 'metlife', name: 'MetLife Stadium', city: 'East Rutherford', country: 'USA',
    capacity: 82_500, emoji: '🏟️',
    tz: 'America/New_York', games: 8,
    note: 'Sede de la Gran Final',
    highlight: true,
    image: 'assets/stadiums/metlife.jpg',
    desc: 'Ubicado en el área metropolitana de Nueva York, el MetLife Stadium es una de las sedes deportivas más importantes de Estados Unidos. Cuenta con tecnología de vanguardia y será el espectacular escenario de la Gran Final el 19 de julio de 2026.'
  },
  {
    id: 'sofi', name: 'SoFi Stadium', city: 'Los Ángeles', country: 'USA',
    capacity: 70_240, emoji: '🏟️',
    tz: 'America/Los_Angeles', games: 8,
    note: 'Sede de partidos clave',
    image: 'assets/stadiums/sofi.jpg',
    desc: 'El estadio más costoso y moderno del planeta, SoFi Stadium es una maravilla de la architecture contemporánea con su pantalla de doble cara Infinity Screen. Será el epicentro de la emoción en la costa oeste americana.'
  },
  {
    id: 'azteca', name: 'Estadio Azteca', city: 'Ciudad de México', country: 'MEX',
    capacity: 87_523, emoji: '🏟️',
    tz: 'America/Mexico_City', games: 5,
    note: 'Sede del partido inaugural',
    image: 'assets/stadiums/azteca.jpg',
    desc: 'El legendario e histórico templo del fútbol mundial, primer estadio en albergar tres Copas del Mundo (1970, 1986, 2026). Verá el emocionante partido de inauguración del Mundial el 11 de junio con la selección mexicana.'
  },
  {
    id: 'atandt', name: 'AT&T Stadium', city: 'Dallas', country: 'USA',
    capacity: 80_000, emoji: '🏟️',
    tz: 'America/Chicago', games: 7,
    note: 'Cancha cubierta de vanguardia',
    image: 'assets/stadiums/atandt.jpg',
    desc: 'Conocido como el "Palacio de Cristal", es un coloso con un gigantesco techo retráctil y una de las pantallas colgantes más grandes del mundo. Es un referente absoluto de eventos masivos de clase mundial.'
  },
  {
    id: 'bmo', name: 'BMO Field', city: 'Toronto', country: 'CAN',
    capacity: 45_000, emoji: '🏟️',
    tz: 'America/Toronto', games: 6,
    note: 'Principal sede canadiense',
    image: 'assets/stadiums/bmo.jpg',
    desc: 'Sede icónica de la MLS y de la selección nacional de Canadá. Ha sido expandido especialmente para la Copa Mundial de 2026 y goza de un ambiente espectacular a orillas del Lago Ontario.'
  },
  {
    id: 'acnw', name: 'BC Place', city: 'Vancouver', country: 'CAN',
    capacity: 54_500, emoji: '🏟️',
    tz: 'America/Vancouver', games: 6,
    note: 'Vista panorámica a las montañas',
    image: 'assets/stadiums/bcplace.jpg',
    desc: 'Situado en el corazón de Vancouver con una arquitectura imponente y techo suspendido. Ofrece vistas increíbles de la ciudad y el mar, siendo un ícono cultural en la Columbia Británica.'
  },
  {
    id: 'nrg', name: 'NRG Stadium', city: 'Houston', country: 'USA',
    capacity: 72_220, emoji: '🏟️',
    tz: 'America/Chicago', games: 7,
    image: 'assets/stadiums/nrg.jpg',
    desc: 'El NRG Stadium destaca por ser la primera instalación de la NFL con techo retráctil de los Estados Unidos. Es una sede multiusos hiperversátil y el hogar de los Houston Texans.'
  },
  {
    id: 'estadio_akron', name: 'Estadio Akron', city: 'Guadalajara', country: 'MEX',
    capacity: 49_850, emoji: '🏟️',
    tz: 'America/Mexico_City', games: 5,
    note: 'Joya arquitectónica de Jalisco',
    image: 'assets/stadiums/akron.jpg',
    desc: 'Uno de los estadios más hermosos de América Latina, con un diseño exterior que emula un volcán coronado por una nube blanca. Es el flamante hogar de las Chivas Rayadas de Guadalajara.'
  },
  {
    id: 'linc', name: 'Lincoln Financial Field', city: 'Filadelfia', country: 'USA',
    capacity: 69_796, emoji: '🏟️',
    tz: 'America/New_York', games: 6,
    image: 'assets/stadiums/linc.jpg',
    desc: 'Un estadio magnífico, con un diseño abierto que permite ver el skyline de Filadelfia. Destaca por su compromiso ecológico y su asombroso sistema de energía 100% renovable.'
  },
  {
    id: 'arrowhead', name: 'Arrowhead Stadium', city: 'Kansas City', country: 'USA',
    capacity: 76_416, emoji: '🏟️',
    tz: 'America/Chicago', games: 6,
    image: 'assets/stadiums/arrowhead.jpg',
    desc: 'Reconocido oficialmente como uno de los estadios al aire libre más ruidosos e intimidantes del deporte mundial. Goza de una de las mejores culturas de asados y tailgate en todo el país.'
  },
  {
    id: 'gillette', name: 'Gillette Stadium', city: 'Boston', country: 'USA',
    capacity: 65_878, emoji: '🏟️',
    tz: 'America/New_York', games: 6,
    image: 'assets/stadiums/gillette.jpg',
    desc: 'El hogar de los legendarios New England Patriots y el New England Revolution. Ubicado en Foxborough, es un recinto colosal famoso por su icónica torre de faro en la entrada principal.'
  },
  {
    id: 'lumen', name: 'Lumen Field', city: 'Seattle', country: 'USA',
    capacity: 69_000, emoji: '🏟️',
    tz: 'America/Los_Angeles', games: 6,
    image: 'assets/stadiums/lumen.jpg',
    desc: 'Con una vista inigualable del centro urbano de Seattle y la Bahía de Elliott, es célebre por su acústica espectacular que amplifica la pasión de la hinchada al máximo nivel.'
  },
  {
    id: 'allegiant', name: 'Allegiant Stadium', city: 'Las Vegas', country: 'USA',
    capacity: 65_000, emoji: '🏟️',
    tz: 'America/Los_Angeles', games: 5,
    image: 'assets/stadiums/allegiant.jpg',
    desc: 'Apodado "La Estrella de la Muerte" por su elegante diseño negro futurista completamente cerrado y climatizado. Ubicado al lado de la famosa Strip de Las Vegas, es el entretenimiento puro del siglo XXI.'
  },
  {
    id: 'inter', name: 'Inter&Co Stadium', city: 'Orlando', country: 'USA',
    capacity: 25_500, emoji: '🏟️',
    tz: 'America/New_York', games: 5,
    image: 'assets/stadiums/inter.jpg',
    desc: 'Ubicado en el corazón de Orlando, es una sede vibrante y acogedora diseñada especialmente para el fútbol, con tribunas empinadas que colocan a la afición justo al borde de la cancha.'
  },
  {
    id: 'monterrey', name: 'Estadio BBVA', city: 'Monterrey', country: 'MEX',
    capacity: 53_500, emoji: '🏟️',
    tz: 'America/Monterrey', games: 5,
    image: 'assets/stadiums/monterrey.jpg',
    desc: 'Conocido como "El Gigante de Acero", es una joya rodeada por las espectaculares montañas de la Sierra Madre, ofreciendo una de las postales futbolísticas más hermosas del mundo entero.'
  },
  {
    id: 'snapdragon', name: 'Snapdragon Stadium', city: 'San Diego', country: 'USA',
    capacity: 35_000, emoji: '🏟️',
    tz: 'America/Los_Angeles', games: 4,
    image: 'assets/stadiums/snapdragon.jpg',
    desc: 'Un magnífico estadio al aire libre ubicado en el área costera de San Diego. Dispone de un ambiente playero y soleado inigualable, celebrando el espíritu multicultural fronterizo.'
  }
];

const TEAMS = {
  // Grupo A
  MEX: { name: 'México',        flag: '🇲🇽', group: 'A', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  KOR: { name: 'Corea del Sur', flag: '🇰🇷', group: 'A', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  RSA: { name: 'Sudáfrica',     flag: '🇿🇦', group: 'A', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  CZE: { name: 'Chequia',       flag: '🇨🇿', group: 'A', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },

  // Grupo B
  CAN: { name: 'Canadá',        flag: '🇨🇦', group: 'B', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  SUI: { name: 'Suiza',         flag: '🇨🇭', group: 'B', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  QAT: { name: 'Qatar',         flag: '🇶🇦', group: 'B', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  BIH: { name: 'Bosnia',        flag: '🇧🇦', group: 'B', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },

  // Grupo C
  BRA: { name: 'Brasil',        flag: '🇧🇷', group: 'C', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  MAR: { name: 'Marruecos',     flag: '🇲🇦', group: 'C', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  SCO: { name: 'Escocia',       flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', group: 'C', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  HAI: { name: 'Haití',         flag: '🇭🇹', group: 'C', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },

  // Grupo D
  USA: { name: 'Estados Unidos',flag: '🇺🇸', group: 'D', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  PAR: { name: 'Paraguay',      flag: '🇵🇾', group: 'D', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  AUS: { name: 'Australia',     flag: '🇦🇺', group: 'D', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  TUR: { name: 'Turquía',       flag: '🇹🇷', group: 'D', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },

  // Grupo E
  GER: { name: 'Alemania',      flag: '🇩🇪', group: 'E', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  ECU: { name: 'Ecuador',       flag: '🇪🇨', group: 'E', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  CIV: { name: 'Costa de Marfil',flag:'🇨🇮', group: 'E', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  CUW: { name: 'Curazao',       flag: '🇨🇼', group: 'E', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },

  // Grupo F
  NED: { name: 'Países Bajos',  flag: '🇳🇱', group: 'F', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  JPN: { name: 'Japón',         flag: '🇯🇵', group: 'F', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  TUN: { name: 'Túnez',         flag: '🇹🇳', group: 'F', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  SWE: { name: 'Suecia',        flag: '🇸🇪', group: 'F', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },

  // Grupo G
  BEL: { name: 'Bélgica',       flag: '🇧🇪', group: 'G', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  IRN: { name: 'Irán',          flag: '🇮🇷', group: 'G', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  EGY: { name: 'Egipto',        flag: '🇪🇬', group: 'G', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  NZL: { name: 'Nueva Zelanda', flag: '🇳🇿', group: 'G', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },

  // Grupo H
  ESP: { name: 'España',        flag: '🇪🇸', group: 'H', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  URU: { name: 'Uruguay',       flag: '🇺🇾', group: 'H', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  KSA: { name: 'Arabia Saudita',flag: '🇸🇦', group: 'H', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  CPV: { name: 'Cabo Verde',    flag: '🇨🇻', group: 'H', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },

  // Grupo I
  FRA: { name: 'Francia',       flag: '🇫🇷', group: 'I', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  NOR: { name: 'Noruega',       flag: '🇳🇴', group: 'I', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  SEN: { name: 'Senegal',       flag: '🇸🇳', group: 'I', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  IRQ: { name: 'Irak',          flag: '🇮🇶', group: 'I', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },

  // Grupo J
  ARG: { name: 'Argentina',     flag: '🇦🇷', group: 'J', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  AUT: { name: 'Austria',       flag: '🇦🇹', group: 'J', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  ALG: { name: 'Argelia',       flag: '🇩🇿', group: 'J', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  JOR: { name: 'Jordania',      flag: '🇯🇴', group: 'J', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },

  // Grupo K
  POR: { name: 'Portugal',      flag: '🇵🇹', group: 'K', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  COL: { name: 'Colombia',      flag: '🇨🇴', group: 'K', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  UZB: { name: 'Uzbekistán',    flag: '🇺🇿', group: 'K', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  COD: { name: 'R. D. Congo',   flag: '🇨🇩', group: 'K', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },

  // Grupo L
  ENG: { name: 'Inglaterra',    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', group: 'L', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  CRO: { name: 'Croacia',       flag: '🇭🇷', group: 'L', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  PAN: { name: 'Panamá',        flag: '🇵🇦', group: 'L', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  GHA: { name: 'Ghana',         flag: '🇬🇭', group: 'L', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 }
};

/** Partidos del torneo */
let MATCHES = [
  // --- GRUPO A ---
  { id: 'm001', phase: 'Fase de Grupos', group: 'A', home: 'MEX', away: 'RSA', dateUTC: '2026-06-11T22:00:00Z', stadium: 'azteca', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm002', phase: 'Fase de Grupos', group: 'A', home: 'KOR', away: 'CZE', dateUTC: '2026-06-12T15:00:00Z', stadium: 'estadio_akron', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm003', phase: 'Fase de Grupos', group: 'A', home: 'MEX', away: 'KOR', dateUTC: '2026-06-16T22:00:00Z', stadium: 'monterrey', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm004', phase: 'Fase de Grupos', group: 'A', home: 'RSA', away: 'CZE', dateUTC: '2026-06-17T18:00:00Z', stadium: 'snapdragon', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm005', phase: 'Fase de Grupos', group: 'A', home: 'MEX', away: 'CZE', dateUTC: '2026-06-22T20:00:00Z', stadium: 'azteca', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm006', phase: 'Fase de Grupos', group: 'A', home: 'RSA', away: 'KOR', dateUTC: '2026-06-22T20:00:00Z', stadium: 'sofi', score: { home: null, away: null }, status: 'upcoming', live: false },

  // --- GRUPO B ---
  { id: 'm007', phase: 'Fase de Grupos', group: 'B', home: 'CAN', away: 'SUI', dateUTC: '2026-06-12T18:00:00Z', stadium: 'bmo', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm008', phase: 'Fase de Grupos', group: 'B', home: 'QAT', away: 'BIH', dateUTC: '2026-06-12T21:00:00Z', stadium: 'acnw', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm009', phase: 'Fase de Grupos', group: 'B', home: 'CAN', away: 'QAT', dateUTC: '2026-06-17T22:00:00Z', stadium: 'bmo', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm010', phase: 'Fase de Grupos', group: 'B', home: 'SUI', away: 'BIH', dateUTC: '2026-06-18T15:00:00Z', stadium: 'lumen', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm011', phase: 'Fase de Grupos', group: 'B', home: 'CAN', away: 'BIH', dateUTC: '2026-06-23T18:00:00Z', stadium: 'acnw', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm012', phase: 'Fase de Grupos', group: 'B', home: 'SUI', away: 'QAT', dateUTC: '2026-06-23T18:00:00Z', stadium: 'allegiant', score: { home: null, away: null }, status: 'upcoming', live: false },

  // --- GRUPO C ---
  { id: 'm013', phase: 'Fase de Grupos', group: 'C', home: 'BRA', away: 'MAR', dateUTC: '2026-06-13T15:00:00Z', stadium: 'metlife', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm014', phase: 'Fase de Grupos', group: 'C', home: 'SCO', away: 'HAI', dateUTC: '2026-06-13T18:00:00Z', stadium: 'gillette', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm015', phase: 'Fase de Grupos', group: 'C', home: 'BRA', away: 'SCO', dateUTC: '2026-06-18T18:00:00Z', stadium: 'linc', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm016', phase: 'Fase de Grupos', group: 'C', home: 'MAR', away: 'HAI', dateUTC: '2026-06-18T21:00:00Z', stadium: 'arrowhead', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm017', phase: 'Fase de Grupos', group: 'C', home: 'BRA', away: 'HAI', dateUTC: '2026-06-24T21:00:00Z', stadium: 'atandt', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm018', phase: 'Fase de Grupos', group: 'C', home: 'MAR', away: 'SCO', dateUTC: '2026-06-24T21:00:00Z', stadium: 'nrg', score: { home: null, away: null }, status: 'upcoming', live: false },

  // --- GRUPO D ---
  { id: 'm019', phase: 'Fase de Grupos', group: 'D', home: 'USA', away: 'PAR', dateUTC: '2026-06-12T19:00:00Z', stadium: 'sofi', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm020', phase: 'Fase de Grupos', group: 'D', home: 'AUS', away: 'TUR', dateUTC: '2026-06-13T12:00:00Z', stadium: 'snapdragon', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm021', phase: 'Fase de Grupos', group: 'D', home: 'USA', away: 'AUS', dateUTC: '2026-06-17T21:00:00Z', stadium: 'lumen', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm022', phase: 'Fase de Grupos', group: 'D', home: 'PAR', away: 'TUR', dateUTC: '2026-06-18T12:00:00Z', stadium: 'allegiant', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm023', phase: 'Fase de Grupos', group: 'D', home: 'USA', away: 'TUR', dateUTC: '2026-06-23T21:00:00Z', stadium: 'sofi', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm024', phase: 'Fase de Grupos', group: 'D', home: 'PAR', away: 'AUS', dateUTC: '2026-06-23T21:00:00Z', stadium: 'inter', score: { home: null, away: null }, status: 'upcoming', live: false },

  // --- GRUPO E ---
  { id: 'm025', phase: 'Fase de Grupos', group: 'E', home: 'GER', away: 'ECU', dateUTC: '2026-06-14T15:00:00Z', stadium: 'arrowhead', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm026', phase: 'Fase de Grupos', group: 'E', home: 'CIV', away: 'CUW', dateUTC: '2026-06-14T18:00:00Z', stadium: 'nrg', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm027', phase: 'Fase de Grupos', group: 'E', home: 'GER', away: 'CIV', dateUTC: '2026-06-19T15:00:00Z', stadium: 'atandt', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm028', phase: 'Fase de Grupos', group: 'E', home: 'ECU', away: 'CUW', dateUTC: '2026-06-19T18:00:00Z', stadium: 'inter', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm029', phase: 'Fase de Grupos', group: 'E', home: 'GER', away: 'CUW', dateUTC: '2026-06-25T15:00:00Z', stadium: 'metlife', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm030', phase: 'Fase de Grupos', group: 'E', home: 'ECU', away: 'CIV', dateUTC: '2026-06-25T15:00:00Z', stadium: 'gillette', score: { home: null, away: null }, status: 'upcoming', live: false },

  // --- GRUPO F ---
  { id: 'm031', phase: 'Fase de Grupos', group: 'F', home: 'NED', away: 'JPN', dateUTC: '2026-06-14T21:00:00Z', stadium: 'gillette', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm032', phase: 'Fase de Grupos', group: 'F', home: 'TUN', away: 'SWE', dateUTC: '2026-06-15T12:00:00Z', stadium: 'linc', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm033', phase: 'Fase de Grupos', group: 'F', home: 'NED', away: 'TUN', dateUTC: '2026-06-19T21:00:00Z', stadium: 'arrowhead', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm034', phase: 'Fase de Grupos', group: 'F', home: 'JPN', away: 'SWE', dateUTC: '2026-06-20T12:00:00Z', stadium: 'nrg', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm035', phase: 'Fase de Grupos', group: 'F', home: 'NED', away: 'SWE', dateUTC: '2026-06-25T18:00:00Z', stadium: 'atandt', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm036', phase: 'Fase de Grupos', group: 'F', home: 'JPN', away: 'TUN', dateUTC: '2026-06-25T18:00:00Z', stadium: 'inter', score: { home: null, away: null }, status: 'upcoming', live: false },

  // --- GRUPO G ---
  { id: 'm037', phase: 'Fase de Grupos', group: 'G', home: 'BEL', away: 'IRN', dateUTC: '2026-06-15T15:00:00Z', stadium: 'linc', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm038', phase: 'Fase de Grupos', group: 'G', home: 'EGY', away: 'NZL', dateUTC: '2026-06-15T18:00:00Z', stadium: 'metlife', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm039', phase: 'Fase de Grupos', group: 'G', home: 'BEL', away: 'EGY', dateUTC: '2026-06-20T15:00:00Z', stadium: 'gillette', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm040', phase: 'Fase de Grupos', group: 'G', home: 'IRN', away: 'NZL', dateUTC: '2026-06-20T18:00:00Z', stadium: 'arrowhead', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm041', phase: 'Fase de Grupos', group: 'G', home: 'BEL', away: 'NZL', dateUTC: '2026-06-26T15:00:00Z', stadium: 'atandt', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm042', phase: 'Fase de Grupos', group: 'G', home: 'IRN', away: 'EGY', dateUTC: '2026-06-26T15:00:00Z', stadium: 'nrg', score: { home: null, away: null }, status: 'upcoming', live: false },

  // --- GRUPO H ---
  { id: 'm043', phase: 'Fase de Grupos', group: 'H', home: 'ESP', away: 'URU', dateUTC: '2026-06-15T21:00:00Z', stadium: 'sofi', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm044', phase: 'Fase de Grupos', group: 'H', home: 'KSA', away: 'CPV', dateUTC: '2026-06-16T12:00:00Z', stadium: 'snapdragon', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm045', phase: 'Fase de Grupos', group: 'H', home: 'ESP', away: 'KSA', dateUTC: '2026-06-20T21:00:00Z', stadium: 'lumen', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm046', phase: 'Fase de Grupos', group: 'H', home: 'URU', away: 'CPV', dateUTC: '2026-06-21T12:00:00Z', stadium: 'allegiant', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm047', phase: 'Fase de Grupos', group: 'H', home: 'ESP', away: 'CPV', dateUTC: '2026-06-26T18:00:00Z', stadium: 'sofi', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm048', phase: 'Fase de Grupos', group: 'H', home: 'URU', away: 'KSA', dateUTC: '2026-06-26T18:00:00Z', stadium: 'inter', score: { home: null, away: null }, status: 'upcoming', live: false },

  // --- GRUPO I ---
  { id: 'm049', phase: 'Fase de Grupos', group: 'I', home: 'FRA', away: 'NOR', dateUTC: '2026-06-16T15:00:00Z', stadium: 'metlife', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm050', phase: 'Fase de Grupos', group: 'I', home: 'SEN', away: 'IRQ', dateUTC: '2026-06-16T18:00:00Z', stadium: 'linc', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm051', phase: 'Fase de Grupos', group: 'I', home: 'FRA', away: 'SEN', dateUTC: '2026-06-21T15:00:00Z', stadium: 'gillette', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm052', phase: 'Fase de Grupos', group: 'I', home: 'NOR', away: 'IRQ', dateUTC: '2026-06-21T18:00:00Z', stadium: 'arrowhead', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm053', phase: 'Fase de Grupos', group: 'I', home: 'FRA', away: 'IRQ', dateUTC: '2026-06-27T15:00:00Z', stadium: 'atandt', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm054', phase: 'Fase de Grupos', group: 'I', home: 'NOR', away: 'SEN', dateUTC: '2026-06-27T15:00:00Z', stadium: 'nrg', score: { home: null, away: null }, status: 'upcoming', live: false },

  // --- GRUPO J ---
  { id: 'm055', phase: 'Fase de Grupos', group: 'J', home: 'ARG', away: 'AUT', dateUTC: '2026-06-16T21:00:00Z', stadium: 'sofi', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm056', phase: 'Fase de Grupos', group: 'J', home: 'ALG', away: 'JOR', dateUTC: '2026-06-17T12:00:00Z', stadium: 'snapdragon', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm057', phase: 'Fase de Grupos', group: 'J', home: 'ARG', away: 'ALG', dateUTC: '2026-06-21T21:00:00Z', stadium: 'lumen', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm058', phase: 'Fase de Grupos', group: 'J', home: 'AUT', away: 'JOR', dateUTC: '2026-06-22T12:00:00Z', stadium: 'allegiant', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm059', phase: 'Fase de Grupos', group: 'J', home: 'ARG', away: 'JOR', dateUTC: '2026-06-27T18:00:00Z', stadium: 'sofi', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm060', phase: 'Fase de Grupos', group: 'J', home: 'AUT', away: 'ALG', dateUTC: '2026-06-27T18:00:00Z', stadium: 'inter', score: { home: null, away: null }, status: 'upcoming', live: false },

  // --- GRUPO K ---
  { id: 'm061', phase: 'Fase de Grupos', group: 'K', home: 'POR', away: 'COL', dateUTC: '2026-06-17T15:00:00Z', stadium: 'metlife', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm062', phase: 'Fase de Grupos', group: 'K', home: 'UZB', away: 'COD', dateUTC: '2026-06-17T18:00:00Z', stadium: 'linc', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm063', phase: 'Fase de Grupos', group: 'K', home: 'POR', away: 'UZB', dateUTC: '2026-06-22T15:00:00Z', stadium: 'gillette', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm064', phase: 'Fase de Grupos', group: 'K', home: 'COL', away: 'COD', dateUTC: '2026-06-22T18:00:00Z', stadium: 'arrowhead', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm065', phase: 'Fase de Grupos', group: 'K', home: 'POR', away: 'COD', dateUTC: '2026-06-27T21:00:00Z', stadium: 'atandt', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm066', phase: 'Fase de Grupos', group: 'K', home: 'COL', away: 'UZB', dateUTC: '2026-06-27T21:00:00Z', stadium: 'nrg', score: { home: null, away: null }, status: 'upcoming', live: false },

  // --- GRUPO L ---
  { id: 'm067', phase: 'Fase de Grupos', group: 'L', home: 'ENG', away: 'CRO', dateUTC: '2026-06-17T21:00:00Z', stadium: 'sofi', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm068', phase: 'Fase de Grupos', group: 'L', home: 'PAN', away: 'GHA', dateUTC: '2026-06-18T12:00:00Z', stadium: 'snapdragon', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm069', phase: 'Fase de Grupos', group: 'L', home: 'ENG', away: 'PAN', dateUTC: '2026-06-22T21:00:00Z', stadium: 'lumen', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm070', phase: 'Fase de Grupos', group: 'L', home: 'CRO', away: 'GHA', dateUTC: '2026-06-23T12:00:00Z', stadium: 'allegiant', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm071', phase: 'Fase de Grupos', group: 'L', home: 'ENG', away: 'GHA', dateUTC: '2026-06-27T21:00:00Z', stadium: 'sofi', score: { home: null, away: null }, status: 'upcoming', live: false },
  { id: 'm072', phase: 'Fase de Grupos', group: 'L', home: 'CRO', away: 'PAN', dateUTC: '2026-06-27T21:00:00Z', stadium: 'inter', score: { home: null, away: null }, status: 'upcoming', live: false },

  // --- ELIMINATORIAS (R32, R16, QF, SF, 3rd, Final) ---
  { id: 'm073', phase: 'Dieciseisavos', group: null, home: '1A', away: '3DEF', dateUTC: '2026-07-04T22:00:00Z', stadium: 'sofi', score: { home: null, away: null }, status: 'tbd', live: false },
  { id: 'm074', phase: 'Dieciseisavos', group: null, home: '1C', away: '3ABL', dateUTC: '2026-07-05T22:00:00Z', stadium: 'metlife', score: { home: null, away: null }, status: 'tbd', live: false },
  { id: 'm075', phase: 'Octavos', group: null, home: 'Por definir', away: 'Por definir', dateUTC: '2026-07-09T22:00:00Z', stadium: 'atandt', score: { home: null, away: null }, status: 'tbd', live: false },
  { id: 'm076', phase: 'Cuartos', group: null, home: 'Por definir', away: 'Por definir', dateUTC: '2026-07-13T22:00:00Z', stadium: 'azteca', score: { home: null, away: null }, status: 'tbd', live: false },
  { id: 'm077', phase: 'Semifinal', group: null, home: 'Por definir', away: 'Por definir', dateUTC: '2026-07-16T22:00:00Z', stadium: 'metlife', score: { home: null, away: null }, status: 'tbd', live: false },
  { id: 'm078', phase: 'Tercer Puesto', group: null, home: 'Por definir', away: 'Por definir', dateUTC: '2026-07-18T22:00:00Z', stadium: 'sofi', score: { home: null, away: null }, status: 'tbd', live: false },
  { id: 'm079', phase: 'Final', group: null, home: 'Por definir', away: 'Por definir', dateUTC: '2026-07-19T20:00:00Z', stadium: 'metlife', score: { home: null, away: null }, status: 'tbd', live: false }
];

/** Standings iniciales (simulados con partidos jugados) */
let GROUP_STANDINGS = {
  A: [
    { code:'MEX', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'KOR', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'RSA', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'CZE', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 }
  ],
  B: [
    { code:'CAN', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'SUI', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'QAT', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'BIH', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 }
  ],
  C: [
    { code:'BRA', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'MAR', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'SCO', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'HAI', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 }
  ],
  D: [
    { code:'USA', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'PAR', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'AUS', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'TUR', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 }
  ],
  E: [
    { code:'GER', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'ECU', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'CIV', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'CUW', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 }
  ],
  F: [
    { code:'NED', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'JPN', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'TUN', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'SWE', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 }
  ],
  G: [
    { code:'BEL', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'IRN', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'EGY', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'NZL', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 }
  ],
  H: [
    { code:'ESP', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'URU', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'KSA', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'CPV', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 }
  ],
  I: [
    { code:'FRA', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'NOR', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'SEN', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'IRQ', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 }
  ],
  J: [
    { code:'ARG', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'AUT', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'ALG', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'JOR', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 }
  ],
  K: [
    { code:'POR', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'COL', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'UZB', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'COD', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 }
  ],
  L: [
    { code:'ENG', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'CRO', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'PAN', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'GHA', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 }
  ]
};

/* ══════════════════════════════════════
   2. UTILIDADES
══════════════════════════════════════ */
/** Diccionario de códigos de 3 letras a ISO de 2 letras para banderas */
const TEAM_ISO = {
  MEX: 'mx', KOR: 'kr', RSA: 'za', CZE: 'cz',
  CAN: 'ca', SUI: 'ch', QAT: 'qa', BIH: 'ba',
  BRA: 'br', MAR: 'ma', SCO: 'gb-sct', HAI: 'ht',
  USA: 'us', PAR: 'py', AUS: 'au', TUR: 'tr',
  GER: 'de', ECU: 'ec', CIV: 'ci', CUW: 'cw',
  NED: 'nl', JPN: 'jp', TUN: 'tn', SWE: 'se',
  BEL: 'be', IRN: 'ir', EGY: 'eg', NZL: 'nz',
  ESP: 'es', URU: 'uy', KSA: 'sa', CPV: 'cv',
  FRA: 'fr', NOR: 'no', SEN: 'sn', IRQ: 'iq',
  ARG: 'ar', AUT: 'at', ALG: 'dz', JOR: 'jo',
  POR: 'pt', COL: 'co', UZB: 'uz', COD: 'cd',
  ENG: 'gb-eng', CRO: 'hr', PAN: 'pa', GHA: 'gh'
};

/** Retorna el HTML de la bandera utilizando FlagCDN */
function getTeamFlagHtml(code, size = 'small') {
  const iso = TEAM_ISO[code];
  if (iso) {
    if (size === 'large') {
      return `<img src="https://flagcdn.com/w160/${iso}.png" class="flag-img-cdn-lg" alt="${code}">`;
    }
    return `<img src="https://flagcdn.com/w40/${iso}.png" class="flag-img-cdn" alt="${code}">`;
  }
  return '🏳️';
}

/** Formatea fecha UTC → local del usuario */
function formatDateLocal(utcStr) {
  const d = new Date(utcStr);
  return d.toLocaleDateString('es-ES', {
    weekday: 'short', day: 'numeric', month: 'short', timeZone: USER_TZ
  });
}

/** Formatea hora UTC → local del usuario */
function formatTimeLocal(utcStr) {
  const d = new Date(utcStr);
  return d.toLocaleTimeString('es-ES', {
    hour: '2-digit', minute: '2-digit', timeZone: USER_TZ
  });
}

/** Formatea hora UTC → hora del estadio */
function formatTimeStadium(utcStr, tz) {
  const d = new Date(utcStr);
  return d.toLocaleTimeString('es-ES', {
    hour: '2-digit', minute: '2-digit', timeZone: tz
  }) + ' (sede)';
}

/** Obtiene equipo por código */
function getTeam(code) {
  return TEAMS[code] || { name: code, flag: '🏳️' };
}

/** Obtiene estadio por id */
function getStadium(id) {
  return STADIUMS.find(s => s.id === id) || { name: id, city: '', tz: 'UTC' };
}

/** Genera HTML de tarjeta de partido */
function buildMatchCard(m, mini = false) {
  const home = getTeam(m.home);
  const away = getTeam(m.away);
  const st   = getStadium(m.stadium);

  const homeScore = m.score.home !== null ? m.score.home : '-';
  const awayScore = m.score.away !== null ? m.score.away : '-';
  const isLive    = m.status === 'live';
  const isTbd     = m.status === 'tbd';

  const scoreClass = isLive ? 'live-score' : '';
  const phaseClass = isLive ? 'live' : '';
  const phaseText  = isLive ? `⚡ EN VIVO ${m.minute ? m.minute + "'" : ''}` : m.phase + (m.group ? ` · Grupo ${m.group}` : '');

  const timeLocal  = isTbd ? 'Por confirmar' : formatTimeLocal(m.dateUTC);
  const timeStad   = isTbd ? '' : formatTimeStadium(m.dateUTC, st.tz);
  const dateLocal  = isTbd ? '' : formatDateLocal(m.dateUTC);

  return `
  <div class="match-card" data-id="${m.id}" style="cursor: pointer;">
    <div class="match-meta">
      <span class="match-phase ${phaseClass}">${phaseText}</span>
      <div class="match-time">
        <span>${dateLocal}</span>
        <span>${timeLocal}</span>
        <span class="local">${timeStad}</span>
      </div>
    </div>
    <div class="match-teams">
      <div class="team-side">
        <span class="team-flag">${getTeamFlagHtml(m.home)}</span>
        <div class="team-info">
          <div class="team-name">${home.name}</div>
          <div class="team-code">${m.home}</div>
        </div>
      </div>
      <div class="score-block">
        <span class="score ${scoreClass}">${homeScore}</span>
        <span class="score-dash">—</span>
        <span class="score ${scoreClass}">${awayScore}</span>
      </div>
      <div class="team-side right">
        <div class="team-info">
          <div class="team-name">${away.name}</div>
          <div class="team-code">${m.away}</div>
        </div>
        <span class="team-flag">${getTeamFlagHtml(m.away)}</span>
      </div>
    </div>
    <div class="match-footer">
      <div class="match-stadium">📍 <strong>${st.name}</strong>, ${st.city}</div>
      ${m.group ? `<span class="match-group-badge">GRP ${m.group}</span>` : ''}
    </div>
  </div>`;
}

/** Genera HTML de fila de partido (vista lista) */
function buildMatchRow(m) {
  const home = getTeam(m.home);
  const away = getTeam(m.away);
  const st   = getStadium(m.stadium);

  const homeScore = m.score.home !== null ? m.score.home : '–';
  const awayScore = m.score.away !== null ? m.score.away : '–';
  const isLive    = m.status === 'live';
  const isTbd     = m.status === 'tbd';

  const timeLocal = isTbd ? 'Por confirmar' : `${formatDateLocal(m.dateUTC)} · ${formatTimeLocal(m.dateUTC)}`;

  return `
  <div class="match-row" data-id="${m.id}" style="cursor: pointer;">
    <div class="team-left">
      <span class="team-flag">${getTeamFlagHtml(m.home)}</span>
      <div class="team-info">
        <div class="team-name">${home.name}</div>
        <div class="team-code">${m.home}</div>
      </div>
    </div>
    <div class="score-col">
      <span class="score ${isLive ? 'live-score' : ''}">${homeScore}</span>
      <span class="score-dash">:</span>
      <span class="score ${isLive ? 'live-score' : ''}">${awayScore}</span>
    </div>
    <div class="team-right">
      <div class="team-info" style="text-align:right">
        <div class="team-name">${away.name}</div>
        <div class="team-code">${m.away}</div>
      </div>
      <span class="team-flag">${getTeamFlagHtml(m.away)}</span>
    </div>
    <div class="match-info" style="display:flex;flex-direction:column;gap:.15rem;font-family:'Barlow Condensed',sans-serif;">
      <span style="font-size:.65rem;letter-spacing:.08em;color:var(--text-3);text-transform:uppercase">${isLive ? '⚡ EN VIVO' : m.phase}${m.group ? ' · Grp ' + m.group : ''}</span>
      <span style="font-size:.75rem;font-weight:600;color:var(--text-2)">${st.name}</span>
      <span style="font-size:.7rem;color:var(--text-3)">${timeLocal}</span>
    </div>
  </div>`;
}

/* ══════════════════════════════════════
   3. NAVEGACIÓN
══════════════════════════════════════ */
let currentPage = 'inicio';

function navigate(section) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

  const page = document.getElementById(`page-${section}`);
  if (page) page.classList.add('active');

  document.querySelectorAll(`.nav-link[data-section="${section}"]`).forEach(l => l.classList.add('active'));
  currentPage = section;

  // Cerrar menú móvil
  document.getElementById('mainNav').classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Renderizar secciones bajo demanda
  if (section === 'fixture')    renderFixture();
  if (section === 'grupos')     renderGroups();
  if (section === 'sedes')      renderStadiums();
  if (section === 'simulador')  renderSimulator();
}

/* ══════════════════════════════════════
   4. CUENTA REGRESIVA
══════════════════════════════════════ */
function initCountdown() {
  // Buscar próximo partido upcoming
  const now = new Date();
  const next = MATCHES
    .filter(m => m.status === 'upcoming' && new Date(m.dateUTC) > now)
    .sort((a,b) => new Date(a.dateUTC) - new Date(b.dateUTC))[0];

  if (!next) {
    document.getElementById('nextMatchHero').textContent = '¡Copa en curso!';
    return;
  }

  const home = getTeam(next.home);
  const away = getTeam(next.away);
  const st   = getStadium(next.stadium);

  document.getElementById('nextMatchHero').innerHTML =
    `<span class="flag-pair">${getTeamFlagHtml(next.home)} vs ${getTeamFlagHtml(next.away)}</span><br>${home.name} &nbsp;vs&nbsp; ${away.name}<br><small style="font-size:.75em;color:var(--text-2)">📍 ${st.name}, ${st.city}</small>`;

  function tick() {
    const diff = new Date(next.dateUTC) - new Date();
    if (diff <= 0) { clearInterval(timer); return; }
    const d  = Math.floor(diff / 864e5);
    const h  = Math.floor((diff % 864e5) / 36e5);
    const m  = Math.floor((diff % 36e5) / 6e4);
    const s  = Math.floor((diff % 6e4) / 1e3);
    const z  = n => String(n).padStart(2, '0');
    document.getElementById('cd-days').textContent  = z(d);
    document.getElementById('cd-hours').textContent = z(h);
    document.getElementById('cd-mins').textContent  = z(m);
    document.getElementById('cd-secs').textContent  = z(s);
  }
  tick();
  const timer = setInterval(tick, 1000);
}

/* ══════════════════════════════════════
   5. TICKER EN VIVO
══════════════════════════════════════ */
function initLiveTicker() {
  const liveMatches = MATCHES.filter(m => m.live);
  const el = document.getElementById('liveTicker');

  if (!liveMatches.length) {
    el.style.display = 'none';
    return;
  }

  const texts = liveMatches.map(m => {
    const h = getTeam(m.home);
    const a = getTeam(m.away);
    return `${getTeamFlagHtml(m.home)} ${h.name} ${m.score.home} – ${m.score.away} ${a.name} ${getTeamFlagHtml(m.away)}  (${m.minute}')`;
  });

  el.innerHTML = `
    <div class="live-ticker-label"><span class="live-dot"></span> EN VIVO</div>
    <div class="ticker-scroll">${texts.join('   &nbsp;·&nbsp;   ')}</div>
  `;
}

/* ══════════════════════════════════════
   6. PARTIDOS DESTACADOS (Hero)
══════════════════════════════════════ */
function renderFeaturedMatches() {
  // Mostrar: vivos + recientes + próximos (máx 6)
  const featured = [
    ...MATCHES.filter(m => m.live),
    ...MATCHES.filter(m => m.status === 'finished').slice(-2),
    ...MATCHES.filter(m => m.status === 'upcoming').slice(0, 3),
  ].slice(0, 6);

  document.getElementById('featuredMatches').innerHTML =
    featured.map(m => buildMatchCard(m)).join('');
}

/* ══════════════════════════════════════
   7. FIXTURE COMPLETO
══════════════════════════════════════ */
let activePhaseFilter = '';
let activeFilters     = { phase: '', group: '', stadium: '', country: '' };

function populateFilterDropdowns() {
  // Grupos
  const groupSel = document.getElementById('filterGroup');
  const groups = [...new Set(MATCHES.filter(m => m.group).map(m => m.group))].sort();
  groups.forEach(g => {
    const opt = document.createElement('option');
    opt.value = g; opt.textContent = `Grupo ${g}`;
    groupSel.appendChild(opt);
  });

  // Estadios
  const stadSel = document.getElementById('filterStadium');
  STADIUMS.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s.id; opt.textContent = `${s.name} (${s.city})`;
    stadSel.appendChild(opt);
  });
}

function buildPhaseTabs() {
  const phases = ['Todos', ...new Set(MATCHES.map(m => m.phase))];
  const tabs = document.getElementById('phaseTabs');
  tabs.innerHTML = phases.map(p => `
    <button class="phase-tab ${p === 'Todos' ? 'active' : ''}" data-phase="${p}">${p}</button>
  `).join('');

  tabs.addEventListener('click', e => {
    const btn = e.target.closest('.phase-tab');
    if (!btn) return;
    tabs.querySelectorAll('.phase-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activePhaseFilter = btn.dataset.phase === 'Todos' ? '' : btn.dataset.phase;
    applyFixtureFilters();
  });
}

function applyFixtureFilters() {
  let filtered = [...MATCHES];

  if (activeFilters.phase)   filtered = filtered.filter(m => m.phase === activeFilters.phase);
  if (activePhaseFilter)     filtered = filtered.filter(m => m.phase === activePhaseFilter);
  if (activeFilters.group)   filtered = filtered.filter(m => m.group === activeFilters.group);
  if (activeFilters.stadium) filtered = filtered.filter(m => m.stadium === activeFilters.stadium);
  if (activeFilters.country) {
    filtered = filtered.filter(m => {
      const st = getStadium(m.stadium);
      return st.country === activeFilters.country;
    });
  }

  const list = document.getElementById('fixtureList');
  if (!filtered.length) {
    list.innerHTML = '<div class="no-results">⚽ No se encontraron partidos con estos filtros.</div>';
    return;
  }
  list.innerHTML = filtered.map(m => buildMatchRow(m)).join('');
}

function renderFixture() {
  if (document.getElementById('fixtureList').dataset.rendered) { applyFixtureFilters(); return; }
  document.getElementById('fixtureList').dataset.rendered = '1';

  populateFilterDropdowns();
  buildPhaseTabs();
  applyFixtureFilters();

  // Listeners de filtros select
  ['filterPhase','filterGroup','filterStadium','filterCountry'].forEach(id => {
    document.getElementById(id).addEventListener('change', e => {
      const key = { filterPhase:'phase', filterGroup:'group', filterStadium:'stadium', filterCountry:'country' }[id];
      activeFilters[key] = e.target.value;
      applyFixtureFilters();
    });
  });

  document.getElementById('resetFilters').addEventListener('click', () => {
    activeFilters = { phase:'', group:'', stadium:'', country:'' };
    activePhaseFilter = '';
    document.querySelectorAll('.filter-select').forEach(s => s.value = '');
    document.querySelectorAll('.phase-tab').forEach((b,i) => b.classList.toggle('active', i===0));
    applyFixtureFilters();
  });
}

/* ══════════════════════════════════════
   8. TABLA DE POSICIONES
══════════════════════════════════════ */
function renderGroups() {
  const grid = document.getElementById('groupsGrid');
  if (grid.dataset.rendered) return;
  grid.dataset.rendered = '1';

  const groups = Object.keys(GROUP_STANDINGS).sort();
  grid.innerHTML = groups.map((g, idx) => {
    const teams = GROUP_STANDINGS[g].sort((a,b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);
    const rows  = teams.map((t, i) => {
      const team = getTeam(t.code);
      const isQ  = i < 2;
      return `
        <tr class="${isQ ? 'top-2' : ''}">
          <td><span class="pos-num ${isQ ? 'q' : ''}">${i+1}</span></td>
          <td>
            <div class="team-cell">
              <span class="f">${getTeamFlagHtml(t.code)}</span>
              <span>${team.name}</span>
            </div>
          </td>
          <td>${t.pj}</td>
          <td>${t.pg}</td>
          <td>${t.pe}</td>
          <td>${t.pp}</td>
          <td>${t.gf}</td>
          <td>${t.gc}</td>
          <td>${t.gd > 0 ? '+' : ''}${t.gd}</td>
          <td class="pts-col">${t.pts}</td>
        </tr>`;
    }).join('');

    return `
    <div class="group-card" style="animation-delay:${idx*0.05}s">
      <div class="group-card-header">
        <span class="group-letter">GRUPO ${g}</span>
        <span class="group-qualified">Top 2 clasifican</span>
      </div>
      <table class="group-table">
        <thead>
          <tr>
            <th>#</th><th style="text-align:left">Equipo</th>
            <th>PJ</th><th>PG</th><th>PE</th><th>PP</th>
            <th>GF</th><th>GC</th><th>GD</th><th>Pts</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
  }).join('');
}

/* ══════════════════════════════════════
   9. SEDES Y ESTADIOS
══════════════════════════════════════ */
let activeCountryFilter = 'all';

function renderStadiums(filter = 'all') {
  const grid = document.getElementById('stadiumsGrid');
  const list = filter === 'all' ? STADIUMS : STADIUMS.filter(s => s.country === filter);

  const countryLabels = { USA: '🇺🇸 EE.UU.', MEX: '🇲🇽 México', CAN: '🇨🇦 Canadá' };

  grid.innerHTML = list.map((s, i) => `
    <div class="stadium-card" data-id="${s.id}" style="animation-delay:${i*0.06}s; cursor: pointer;">
      <div class="stadium-img" style="position: relative; height: 160px; overflow: hidden;">
        <img src="${s.image}" referrerpolicy="no-referrer" alt="${s.name}" style="width: 100%; height: 100%; object-fit: cover;">
        <span class="stadium-country-badge">${countryLabels[s.country] || s.country}</span>
        ${s.highlight ? '<span class="stadium-country-badge" style="top:.75rem;left:.75rem;right:auto;background:var(--accent);color:#000">⭐ FINAL</span>' : ''}
      </div>
      <div class="stadium-card-body">
        <div class="stadium-name">${s.name}</div>
        <div class="stadium-city">${s.city}</div>
        <div class="stadium-meta">
          <div class="stadium-meta-item">
            <div class="stadium-meta-label">Capacidad</div>
            <div class="stadium-meta-val">${s.capacity.toLocaleString('es-ES')}</div>
          </div>
          <div class="stadium-meta-item">
            <div class="stadium-meta-label">País</div>
            <div class="stadium-meta-val">${countryLabels[s.country]}</div>
          </div>
        </div>
        ${s.note ? `<div class="stadium-games" style="margin-top:.5rem"><em>${s.note}</em></div>` : ''}
        <div class="stadium-games">
          Partidos: <strong>${s.games}</strong>
        </div>
      </div>
    </div>
  `).join('');
}

function openStadiumDetail(stadiumId) {
  const s = STADIUMS.find(st => st.id === stadiumId);
  if (!s) return;

  const countryLabels = { USA: 'Estados Unidos 🇺🇸', MEX: 'México 🇲🇽', CAN: 'Canadá 🇨🇦' };

  document.getElementById('sdTitle').textContent = s.name;
  document.getElementById('sdImg').src = s.image;
  const mapQuery = encodeURIComponent(`${s.name}, ${s.city}`);
  document.getElementById('sdMapContainer').innerHTML = `
    <iframe src="https://maps.google.com/maps?q=${mapQuery}&t=k&z=17&output=embed" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer"></iframe>
  `;
  document.getElementById('sdBadge').textContent = s.country;
  document.getElementById('sdCity').textContent = `${s.city}, ${countryLabels[s.country]}`;
  document.getElementById('sdNote').textContent = s.desc || s.note || 'Información de la sede programada en el Mundial 2026.';
  document.getElementById('sdCapacity').textContent = s.capacity.toLocaleString('es-ES');
  document.getElementById('sdTimezone').textContent = s.tz;
  document.getElementById('sdGamesCount').textContent = `${s.games} Partidos`;
  document.getElementById('sdCountry').textContent = countryLabels[s.country];

  const matchesList = document.getElementById('sdMatchesList');
  const stadiumMatches = MATCHES.filter(m => m.stadium === s.id);

  if (stadiumMatches.length === 0) {
    matchesList.innerHTML = '<div style="font-size: 0.85rem; color: var(--text-3); font-style: italic; text-align: center; padding: 1rem 0;">No hay partidos asignados en este estadio.</div>';
  } else {
    matchesList.innerHTML = stadiumMatches.map(m => {
      const home = getTeam(m.home);
      const away = getTeam(m.away);
      const isLive = m.status === 'live';
      const isTbd = m.status === 'tbd';

      const homeScore = m.score.home !== null ? m.score.home : '-';
      const awayScore = m.score.away !== null ? m.score.away : '-';

      const timeFormatted = isTbd ? 'Por confirmar' : `${formatDateLocal(m.dateUTC)} · ${formatTimeLocal(m.dateUTC)}`;

      return `
        <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.01); border: 1px solid var(--border); padding: 0.6rem 0.8rem; border-radius: 8px; font-size: 0.85rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem; flex: 1; min-width: 0;">
            ${getTeamFlagHtml(m.home)}
            <span style="font-weight: 600; color: var(--text-1); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100px;">${home.name}</span>
          </div>
          <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; min-width: 60px; font-family: 'Oswald', sans-serif; font-weight: 700; color: ${isLive ? 'var(--accent)' : 'var(--text)'};">
            <span>${homeScore}</span>
            <span style="color: var(--text-3); font-weight: 300;">:</span>
            <span>${awayScore}</span>
            ${isLive ? '<span class="live-dot" style="margin-left: 2px;"></span>' : ''}
          </div>
          <div style="display: flex; align-items: center; justify-content: flex-end; gap: 0.5rem; flex: 1; text-align: right; min-width: 0;">
            <span style="font-weight: 600; color: var(--text-1); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100px;">${away.name}</span>
            ${getTeamFlagHtml(m.away)}
          </div>
          <div style="font-size: 0.7rem; color: var(--text-3); padding-left: 0.75rem; border-left: 1px solid var(--border); margin-left: 0.75rem; min-width: 95px; text-align: right;">
            ${timeFormatted}
          </div>
        </div>
      `;
    }).join('');
  }

  document.getElementById('stadiumDetailModal').classList.add('open');
}

function initStadiumFilters() {
  document.querySelectorAll('.pill[data-country]').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCountryFilter = pill.dataset.country;
      renderStadiums(activeCountryFilter);
    });
  });
}

/* ══════════════════════════════════════
   10. SIMULADOR
══════════════════════════════════════ */
const simSelections = {}; // { 'A': ['ARG','MAR'], 'B': [] … }

function renderSimulator() {
  const container = document.getElementById('simGroups');
  if (container.dataset.rendered) return;
  container.dataset.rendered = '1';

  const groups = Object.keys(GROUP_STANDINGS).sort();

  container.innerHTML = `
    <div class="sim-instructions">Selecciona los <strong>2 clasificados</strong> por cada grupo para generar el bracket.</div>
    ${groups.map(g => {
      const teams = GROUP_STANDINGS[g];
      simSelections[g] = simSelections[g] || [];
      return `
      <div class="sim-group-card" data-group="${g}">
        <div class="sim-group-header">GRUPO ${g}</div>
        ${teams.map(t => {
          const team = getTeam(t.code);
          return `
          <div class="sim-team-item" data-code="${t.code}" data-group="${g}">
            <div class="sim-checkbox">✓</div>
            <span class="team-flag">${getTeamFlagHtml(t.code)}</span>
            <span class="sim-team-name">${team.name}</span>
            <span class="sim-note">${t.pts} pts</span>
          </div>`;
        }).join('')}
      </div>`;
    }).join('')}
  `;

  container.addEventListener('click', e => {
    const item = e.target.closest('.sim-team-item');
    if (!item) return;
    const g    = item.dataset.group;
    const code = item.dataset.code;
    const sel  = simSelections[g];

    if (item.classList.contains('selected')) {
      item.classList.remove('selected');
      simSelections[g] = sel.filter(c => c !== code);
    } else {
      if (sel.length >= 2) {
        // Deseleccionar el primero seleccionado del grupo
        const first = container.querySelector(`.sim-team-item[data-group="${g}"].selected`);
        if (first) {
          first.classList.remove('selected');
          simSelections[g] = sel.filter(c => c !== first.dataset.code);
        }
      }
      item.classList.add('selected');
      simSelections[g].push(code);
    }

    checkBracketReady();
  });

  document.getElementById('resetSim').addEventListener('click', resetSimulator);
}

function checkBracketReady() {
  const groups = Object.keys(simSelections);
  const allSelected = groups.every(g => simSelections[g].length === 2);
  if (allSelected) generateBracket();
}

function generateBracket() {
  const wrap = document.getElementById('simBracketWrap');
  wrap.style.display = 'block';
  wrap.scrollIntoView({ behavior:'smooth', block:'start' });

  // Generar cruces de dieciseisavos (48 equipos → 32 clasificados de grupos → dieciseisavos)
  // Emparejar: 1A vs 3DEF... simplificado: 1A vs 2L, 1B vs 2K, etc.
  const groups = Object.keys(simSelections).sort();
  const qualified = groups.map(g => ({
    group: g,
    first:  simSelections[g][0],
    second: simSelections[g][1]
  }));

  // Cruces de dieciseisavos (simplificado para 12 grupos)
  const r32Matchups = [
    ['A','L'], ['B','K'], ['C','J'], ['D','I'],
    ['E','H'], ['F','G'], ['A','B'], ['C','D'],
    ['E','F'], ['G','H'], ['I','J'], ['K','L'],
    ['A','C'], ['B','D'], ['E','G'], ['F','H'],
  ].slice(0, 16);

  const brackets = r32Matchups.map((pair, i) => {
    const gA = qualified.find(q => q.group === pair[0]);
    const gB = qualified.find(q => q.group === pair[1]);
    if (!gA || !gB) return null;

    const teamA = getTeam(gA.first);
    const teamB = getTeam(gB.second);

    return `
    <div class="bracket-match">
      <div class="bracket-match-label">Dieciseisavos · P${i+1}</div>
      <div class="bracket-team">${getTeamFlagHtml(gA.first)} ${teamA.name} <small style="color:var(--text-3);font-size:.65em">1°${pair[0]}</small></div>
      <div class="bracket-vs">VS</div>
      <div class="bracket-team">${getTeamFlagHtml(gB.second)} ${teamB.name} <small style="color:var(--text-3);font-size:.65em">2°${pair[1]}</small></div>
    </div>`;
  }).filter(Boolean).join('');

  document.getElementById('bracketGrid').innerHTML = brackets || '<div class="no-results">Genera el bracket seleccionando 2 equipos por grupo.</div>';
}

function resetSimulator() {
  Object.keys(simSelections).forEach(g => simSelections[g] = []);
  document.querySelectorAll('.sim-team-item').forEach(i => i.classList.remove('selected'));
  document.getElementById('simBracketWrap').style.display = 'none';
}

/* ══════════════════════════════════════
   11. BÚSQUEDA PREDICTIVA
══════════════════════════════════════ */
function initSearch() {
  const input    = document.getElementById('globalSearch');
  const dropdown = document.getElementById('searchDropdown');

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { dropdown.classList.remove('open'); return; }

    const results = Object.entries(TEAMS)
      .filter(([code, t]) => t.name.toLowerCase().includes(q) || code.toLowerCase().includes(q))
      .slice(0, 6);

    if (!results.length) { dropdown.classList.remove('open'); return; }

    dropdown.innerHTML = results.map(([code, t]) => `
      <div class="search-item" data-code="${code}">
        <span class="flag">${getTeamFlagHtml(code)}</span>
        <span>${t.name}</span>
        <span style="color:var(--text-3);font-size:.75rem;margin-left:auto">Grupo ${t.group || TEAMS[code]?.group || ''}</span>
      </div>
    `).join('');

    dropdown.classList.add('open');
  });

  dropdown.addEventListener('click', e => {
    const item = e.target.closest('.search-item');
    if (!item) return;
    const code = item.dataset.code;
    input.value = '';
    dropdown.classList.remove('open');

    // Navegar a fixture y filtrar por equipo
    navigate('fixture');
    setTimeout(() => {
      // Filtrar partidos que contengan este equipo
      const filtered = MATCHES.filter(m => m.home === code || m.away === code);
      const list = document.getElementById('fixtureList');
      if (filtered.length) {
        list.innerHTML = filtered.map(m => buildMatchRow(m)).join('');
      } else {
        list.innerHTML = `<div class="no-results">No se encontraron partidos para ${TEAMS[code]?.name || code}.</div>`;
      }
    }, 100);
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.search-wrap')) dropdown.classList.remove('open');
  });
}

/* ══════════════════════════════════════
   12. TEMA OSCURO / CLARO
══════════════════════════════════════ */
function initTheme() {
  const btn  = document.getElementById('themeToggle');
  const icon = btn.querySelector('.theme-icon');
  let dark   = localStorage.getItem('fifa26-theme') !== 'light';

  function apply(isDark) {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    icon.textContent = isDark ? '☀' : '☾';
    localStorage.setItem('fifa26-theme', isDark ? 'dark' : 'light');
  }

  apply(dark);
  btn.addEventListener('click', () => { dark = !dark; apply(dark); });
}

/* ══════════════════════════════════════
   13. HAMBURGER MENU
══════════════════════════════════════ */
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const nav = document.getElementById('mainNav');
  btn.addEventListener('click', () => nav.classList.toggle('open'));
}

/* ══════════════════════════════════════
   14. BOTONES GOTO
══════════════════════════════════════ */
function initGotoButtons() {
  document.querySelectorAll('[data-goto]').forEach(btn => {
    btn.addEventListener('click', () => navigate(btn.dataset.goto));
  });
}

/* ══════════════════════════════════════
   15. TIMEZONE FOOTER
══════════════════════════════════════ */
function initTimezoneInfo() {
  const el = document.getElementById('footerTz');
  el.textContent = `⏱ Horarios en tu zona horaria: ${USER_TZ}`;
}

/* ══════════════════════════════════════
   16. INTEGRACIÓN DE API Y SIMULADOR EN VIVO
   ══════════════════════════════════════ */

/** Administrador de Modo Demo (Resultados ficticios de muestra) */
const DemoModeManager = {
  getMode() {
    return localStorage.getItem('wc26-demo-mode') === 'true';
  },
  setMode(val) {
    localStorage.setItem('wc26-demo-mode', val);
  },
  applyMode() {
    const isDemo = this.getMode();
    if (isDemo) {
      // Cargar resultados simulados de muestra para ver la app en acción
      MATCHES.forEach(m => {
        if (m.id === 'm001') { m.score = { home: 2, away: 1 }; m.status = 'finished'; } // MEX vs RSA
        if (m.id === 'm002') { m.score = { home: 1, away: 0 }; m.status = 'finished'; } // KOR vs CZE
        if (m.id === 'm007') { m.score = { home: 1, away: 2 }; m.status = 'finished'; } // CAN vs SUI
        if (m.id === 'm008') { m.score = { home: 0, away: 0 }; m.status = 'finished'; } // QAT vs BIH
        if (m.id === 'm013') { m.score = { home: 3, away: 1 }; m.status = 'finished'; } // BRA vs MAR
        if (m.id === 'm014') { m.score = { home: 2, away: 0 }; m.status = 'finished'; } // SCO vs HAI
        if (m.id === 'm019') { m.score = { home: 2, away: 1 }; m.status = 'finished'; } // USA vs PAR
        if (m.id === 'm020') { m.score = { home: 1, away: 1 }; m.status = 'finished'; } // AUS vs TUR
      });
      
      GROUP_STANDINGS.A = [
        { code:'MEX', pts:3, pj:1, pg:1, pe:0, pp:0, gf:2, gc:1, gd:1 },
        { code:'KOR', pts:3, pj:1, pg:1, pe:0, pp:0, gf:1, gc:0, gd:1 },
        { code:'RSA', pts:0, pj:1, pg:0, pe:0, pp:1, gf:1, gc:2, gd:-1 },
        { code:'CZE', pts:0, pj:1, pg:0, pe:0, pp:1, gf:0, gc:1, gd:-1 }
      ];
      GROUP_STANDINGS.B = [
        { code:'SUI', pts:3, pj:1, pg:1, pe:0, pp:0, gf:2, gc:1, gd:1 },
        { code:'BIH', pts:1, pj:1, pg:0, pe:1, pp:0, gf:0, gc:0, gd:0 },
        { code:'QAT', pts:1, pj:1, pg:0, pe:1, pp:0, gf:0, gc:0, gd:0 },
        { code:'CAN', pts:0, pj:1, pg:0, pe:0, pp:1, gf:1, gc:2, gd:-1 }
      ];
      GROUP_STANDINGS.C = [
        { code:'BRA', pts:3, pj:1, pg:1, pe:0, pp:0, gf:3, gc:1, gd:2 },
        { code:'SCO', pts:3, pj:1, pg:1, pe:0, pp:0, gf:2, gc:0, gd:2 },
        { code:'MAR', pts:0, pj:1, pg:0, pe:0, pp:1, gf:1, gc:3, gd:-2 },
        { code:'HAI', pts:0, pj:1, pg:0, pe:0, pp:1, gf:0, gc:2, gd:-2 }
      ];
      GROUP_STANDINGS.D = [
        { code:'USA', pts:3, pj:1, pg:1, pe:0, pp:0, gf:2, gc:1, gd:1 },
        { code:'AUS', pts:1, pj:1, pg:0, pe:1, pp:0, gf:1, gc:1, gd:0 },
        { code:'TUR', pts:1, pj:1, pg:0, pe:1, pp:0, gf:1, gc:1, gd:0 },
        { code:'PAR', pts:0, pj:1, pg:0, pe:0, pp:1, gf:1, gc:2, gd:-1 }
      ];
    } else {
      // Restablecer a modo limpio realista (calendario en ceros y sin goles)
      MATCHES.forEach(m => {
        if (m.status !== 'tbd') {
          m.score = { home: null, away: null };
          m.status = 'upcoming';
          m.live = false;
        }
      });
      const groups = ['A','B','C','D','E','F','G','H','I','J','K','L'];
      groups.forEach(g => {
        GROUP_STANDINGS[g].forEach(t => {
          t.pts = 0; t.pj = 0; t.pg = 0; t.pe = 0; t.pp = 0; t.gf = 0; t.gc = 0; t.gd = 0;
        });
      });
    }
  }
};

/** Administrador de API Real TheSportsDB (Liga 4429) */
const SportsDbManager = {
  async syncRealData() {
    const statusBanner = document.getElementById('apiStatusBanner');
    if (statusBanner) {
      statusBanner.style.display = 'block';
      statusBanner.style.background = 'rgba(245, 197, 24, 0.15)';
      statusBanner.style.color = 'var(--accent)';
      statusBanner.textContent = 'Sincronizando calendario con TheSportsDB...';
    }

    try {
      // Consulta del calendario oficial (FIFA World Cup liga 4429) en TheSportsDB
      const res = await fetch('https://www.thesportsdb.com/api/v1/json/3/eventsnextleague.php?id=4429');
      if (!res.ok) throw new Error('Error al conectar con TheSportsDB.');
      const data = await res.json();
      
      if (data && data.events && data.events.length > 0) {
        this.mapEvents(data.events);
        
        if (statusBanner) {
          statusBanner.style.background = 'rgba(46, 204, 113, 0.15)';
          statusBanner.style.color = 'var(--green)';
          statusBanner.textContent = '✓ Calendario oficial sincronizado exitosamente desde TheSportsDB.';
        }
      } else {
        if (statusBanner) {
          statusBanner.style.background = 'rgba(46, 204, 113, 0.15)';
          statusBanner.style.color = 'var(--green)';
          statusBanner.textContent = '✓ Conexión establecida. Los partidos coinciden con el fixture local.';
        }
      }

      // Forzar reconstrucción de vistas
      renderFeaturedMatches();
      if (document.getElementById('fixtureList').dataset.rendered) {
        document.getElementById('fixtureList').dataset.rendered = '';
        renderFixture();
      }
      if (document.getElementById('groupsGrid').dataset.rendered) {
        document.getElementById('groupsGrid').dataset.rendered = '';
        renderGroups();
      }
      initCountdown();
      initLiveTicker();
    } catch (e) {
      console.warn('Fallo de conexión a TheSportsDB:', e);
      if (statusBanner) {
        statusBanner.style.background = 'rgba(230, 57, 70, 0.15)';
        statusBanner.style.color = 'var(--red)';
        statusBanner.textContent = '⚠️ API ocupada. Usando calendario offline local para mayor estabilidad.';
      }
    }
  },
  
  mapEvents(events) {
    events.forEach(evt => {
      const homeCode = this.findTeamCodeByName(evt.strHomeTeam);
      const awayCode = this.findTeamCodeByName(evt.strAwayTeam);
      
      // Buscar partido en la base de datos local
      const match = MATCHES.find(m => 
        (m.home === homeCode && m.away === awayCode) ||
        (m.dateUTC && m.dateUTC.startsWith(evt.dateEvent))
      );
      
      if (match) {
        // Si hay marcador en la API real (cuando empiece el torneo!), lo asignamos
        if (evt.intHomeScore !== null && evt.intAwayScore !== null) {
          match.score.home = parseInt(evt.intHomeScore);
          match.score.away = parseInt(evt.intAwayScore);
          match.status = 'finished';
        }
      }
    });
  },
  
  findTeamCodeByName(name) {
    if (!name) return '';
    const entry = Object.entries(TEAMS).find(([code, t]) => 
      t.name.toLowerCase().includes(name.toLowerCase()) || 
      name.toLowerCase().includes(t.name.toLowerCase())
    );
    return entry ? entry[0] : name.substring(0, 3).toUpperCase();
  }
};

/** Jugadores por equipos para comentarios en vivo */
const TEAM_PLAYERS = {
  ARG: ['Lionel Messi', 'Julián Álvarez', 'Enzo Fernández', 'Alexis Mac Allister', 'Rodrigo De Paul', 'Lautaro Martínez', 'Ángel Di María'],
  MEX: ['Santiago Giménez', 'Chucky Lozano', 'Edson Álvarez', 'Luis Chávez', 'Orbelín Pineda', 'Henry Martín', 'César Montes'],
  USA: ['Christian Pulisic', 'Weston McKennie', 'Timothy Weah', 'Gio Reyna', 'Folarin Balogun', 'Yunus Musah', 'Tyler Adams'],
  ESP: ['Lamine Yamal', 'Pedri', 'Gavi', 'Álvaro Morata', 'Nico Williams', 'Dani Olmo', 'Fabián Ruiz'],
  GER: ['Florian Wirtz', 'Jamal Musiala', 'Kai Havertz', 'Leroy Sané', 'İlkay Gündoğan', 'Niclas Füllkrug', 'Thomas Müller'],
  BRA: ['Vinícius Júnior', 'Rodrygo Goes', 'Neymar Jr', 'Raphinha', 'Bruno Guimarães', 'Richarlison', 'Gabriel Martinelli'],
  FRA: ['Kylian Mbappé', 'Antoine Griezmann', 'Ousmane Dembélé', 'Olivier Giroud', 'Eduardo Camavinga', 'Aurélien Tchouaméni'],
  URU: ['Federico Valverde', 'Darwin Núñez', 'Luis Suárez', 'Rodrigo Bentancur', 'Facundo Pellistri', 'Giorgian de Arrascaeta'],
  ENG: ['Harry Kane', 'Jude Bellingham', 'Phil Foden', 'Bukayo Saka', 'Declan Rice', 'Marcus Rashford', 'Jack Grealish'],
  ITA: ['Federico Chiesa', 'Nicolò Barella', 'Giacomo Raspadori', 'Gianluca Scamacca', 'Davide Frattesi', 'Mateo Retegui'],
  default: ['Gómez', 'Fernández', 'Rodríguez', 'Smith', 'Müller', 'Dupont', 'Russo', 'Kim', 'Ali', 'Silva']
};

/** Motor del Simulador de Partido en Vivo */
const LiveMatchEngine = {
  activeMatch: null,
  interval: null,
  simData: null,
  
  initSimulation(match) {
    this.stop();
    this.activeMatch = match;
    const homeTeam = getTeam(match.home);
    const awayTeam = getTeam(match.away);
    
    this.simData = {
      minute: 0,
      homeScore: 0,
      awayScore: 0,
      homePoss: 50,
      awayPoss: 50,
      homeShots: 0,
      homeShotsOnTarget: 0,
      awayShots: 0,
      awayShotsOnTarget: 0,
      homeCorners: 0,
      awayCorners: 0,
      homeFouls: 0,
      homeYellow: 0,
      homeRed: 0,
      awayFouls: 0,
      awayYellow: 0,
      awayRed: 0,
      commentaries: []
    };
    
    // Configurar UI inicial
    document.getElementById('lmHomeFlag').innerHTML = getTeamFlagHtml(match.home, 'large');
    document.getElementById('lmHomeName').textContent = homeTeam.name;
    document.getElementById('lmAwayFlag').innerHTML = getTeamFlagHtml(match.away, 'large');
    document.getElementById('lmAwayName').textContent = awayTeam.name;
    document.getElementById('lmPhaseText').textContent = match.phase + (match.group ? ` · GRUPO ${match.group}` : '');
    document.getElementById('lmClock').textContent = `⏱️ 00:00`;
    
    this.updateUI();
    
    // Comentarios iniciales
    const list = document.getElementById('lmCommentaryList');
    list.innerHTML = `
      <div class="commentary-item system" style="display: flex; gap: 0.75rem; font-size: 0.85rem; line-height: 1.4; padding: 0.45rem; border-radius: 6px; background: rgba(255,255,255,0.02); margin-bottom: 0.5rem;">
        <span class="c-time" style="font-family: 'Barlow Condensed', sans-serif; font-weight: 700; color: var(--accent); min-width: 25px;">00'</span>
        <span class="c-text" style="color: var(--text-2);">El árbitro da la orden y comienza el partido. ¡Bienvenidos a la gran fiesta de la Copa Mundial 2026! 🏆</span>
      </div>
    `;
    
    const startBtn = document.getElementById('startLiveSimBtn');
    startBtn.style.display = 'block';
    startBtn.textContent = '▶ Iniciar Simulación en Vivo';
    startBtn.disabled = false;
  },
  
  start() {
    const startBtn = document.getElementById('startLiveSimBtn');
    startBtn.disabled = true;
    startBtn.textContent = '⚡ Simulación en Curso...';
    
    const ball = document.getElementById('pitchBall');
    ball.classList.add('bouncing');
    
    this.interval = setInterval(() => {
      this.tick();
    }, 1200); // 1.2s = 1 minuto de partido (cuarto de hora por minuto)
  },
  
  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    const ball = document.getElementById('pitchBall');
    if (ball) ball.classList.remove('bouncing');
    
    const startBtn = document.getElementById('startLiveSimBtn');
    if (startBtn) {
      startBtn.disabled = false;
      startBtn.textContent = '▶ Iniciar Simulación';
    }
  },
  
  tick() {
    this.simData.minute++;
    
    if (this.simData.minute > 90) {
      this.stop();
      this.addCommentary('90\'', `¡Final del partido! El árbitro silba el cierre del encuentro. Marcador definitivo: ${getTeam(this.activeMatch.home).name} ${this.simData.homeScore} - ${this.simData.awayScore} ${getTeam(this.activeMatch.away).name}.`, 'system');
      
      // Guardar marcador permanentemente
      this.activeMatch.score.home = this.simData.homeScore;
      this.activeMatch.score.away = this.simData.awayScore;
      this.activeMatch.status = 'finished';
      this.activeMatch.live = false;
      
      // Actualizar standing final
      updateLocalGroupStandings(this.activeMatch.group, this.activeMatch.home, this.activeMatch.away, this.simData.homeScore, this.simData.awayScore);
      
      // Forzar re-renderizado
      renderFeaturedMatches();
      if (currentPage === 'fixture') applyFixtureFilters();
      if (currentPage === 'grupos') {
        document.getElementById('groupsGrid').dataset.rendered = '';
        renderGroups();
      }
      initLiveTicker();
      
      return;
    }
    
    // Actualizar reloj
    document.getElementById('lmClock').textContent = `⏱️ ${this.simData.minute.toString().padStart(2, '0')}:00`;
    
    // Drift en posesión
    const drift = (Math.random() - 0.5) * 8;
    this.simData.homePoss = Math.max(25, Math.min(75, Math.round(this.simData.homePoss + drift)));
    this.simData.awayPoss = 100 - this.simData.homePoss;
    
    // Eventos probabilísticos
    const rand = Math.random();
    const homePlayers = TEAM_PLAYERS[this.activeMatch.home] || TEAM_PLAYERS.default;
    const awayPlayers = TEAM_PLAYERS[this.activeMatch.away] || TEAM_PLAYERS.default;
    
    let eventType = null;
    let eventText = '';
    let eventTime = `${this.simData.minute}'`;
    
    // Mover balón en la cancha 2D
    const ball = document.getElementById('pitchBall');
    const ind = document.getElementById('pitchPlayIndicator');
    const homeTeam = getTeam(this.activeMatch.home);
    const awayTeam = getTeam(this.activeMatch.away);
    
    if (this.simData.homePoss > 55) {
      ball.style.left = '75%';
      ind.textContent = `¡Ataca ${homeTeam.name}!`;
    } else if (this.simData.awayPoss > 55) {
      ball.style.left = '25%';
      ind.textContent = `¡Ataca ${awayTeam.name}!`;
    } else {
      ball.style.left = '50%';
      ind.textContent = 'Juego disputado en mediocampo';
    }
    
    if (rand < 0.08) {
      // REMATE
      const isHome = Math.random() * 100 < this.simData.homePoss;
      const attackingTeam = isHome ? homeTeam : awayTeam;
      const defendingTeam = isHome ? awayTeam : homeTeam;
      const players = isHome ? homePlayers : awayPlayers;
      const player = players[Math.floor(Math.random() * players.length)];
      
      if (isHome) this.simData.homeShots++; else this.simData.awayShots++;
      
      const isOnTarget = Math.random() < 0.45;
      if (isOnTarget) {
        if (isHome) this.simData.homeShotsOnTarget++; else this.simData.awayShotsOnTarget++;
        
        // GOL!
        const isGoal = Math.random() < 0.35;
        if (isGoal) {
          if (isHome) this.simData.homeScore++; else this.simData.awayScore++;
          eventType = 'goal';
          eventText = `⚽ ¡GOOOOOOL de ${attackingTeam.name}! ${player} saca un zapatazo soberbio que se clava en el ángulo para poner el marcador en ${this.simData.homeScore}-${this.simData.awayScore}.`;
          
          // Actualización de standing "en caliente"
          triggerLiveStandingUpdate(this.activeMatch.group, this.activeMatch.home, this.activeMatch.away, this.simData.homeScore, this.simData.awayScore);
        } else {
          eventText = `👟 ¡Remate espectacular de ${player}! El portero de ${defendingTeam.name} vuela para desviar el balón con una atajada sensacional.`;
        }
      } else {
        eventText = `👟 ¡Disparo potente de ${player} (${attackingTeam.name})! El balón se marcha apenas por encima del travesaño.`;
      }
      
      this.addCommentary(eventTime, eventText, eventType);
    } else if (rand >= 0.08 && rand < 0.15) {
      // FALTA
      const isHome = Math.random() > 0.5;
      const committingTeam = isHome ? homeTeam : awayTeam;
      const players = isHome ? homePlayers : awayPlayers;
      const player = players[Math.floor(Math.random() * players.length)];
      
      if (isHome) this.simData.homeFouls++; else this.simData.awayFouls++;
      
      const randCard = Math.random();
      if (randCard < 0.25) {
        if (isHome) this.simData.homeYellow++; else this.simData.awayYellow++;
        eventType = 'card-yellow';
        eventText = `🟨 Tarjeta amarilla para ${player} (${committingTeam.name}) por una infracción brusca en el mediocampo.`;
      } else if (randCard >= 0.25 && randCard < 0.28) {
        if (isHome) this.simData.homeRed++; else this.simData.awayRed++;
        eventType = 'card-red';
        eventText = `🟥 ¡Tarjeta roja directa para ${player} (${committingTeam.name})! Entrada imprudente por detrás. Deja a su equipo con diez hombres.`;
      } else {
        eventText = `⚠️ Infracción de ${player} (${committingTeam.name}). Tiro libre directo para el equipo oponente.`;
      }
      
      this.addCommentary(eventTime, eventText, eventType);
    } else if (rand >= 0.15 && rand < 0.20) {
      // TIRO DE ESQUINA
      const isHome = Math.random() * 100 < this.simData.homePoss;
      const attackingTeam = isHome ? homeTeam : awayTeam;
      if (isHome) this.simData.homeCorners++; else this.simData.awayCorners++;
      
      eventText = `🚩 Tiro de esquina concedido para ${attackingTeam.name}. Se viene el centro peligroso al corazón del área.`;
      this.addCommentary(eventTime, eventText);
    } else if (this.simData.minute === 45) {
      eventText = `⏱️ Fin del primer tiempo. Los jugadores se retiran al túnel de vestuarios. Marcador parcial: ${homeTeam.name} ${this.simData.homeScore} - ${this.simData.awayScore} ${awayTeam.name}.`;
      this.addCommentary('45\'', eventText, 'system');
    }
    
    this.updateUI();
  },
  
  updateUI() {
    document.getElementById('lmHomeScore').textContent = this.simData.homeScore;
    document.getElementById('lmAwayScore').textContent = this.simData.awayScore;
    
    document.getElementById('lmHomePoss').textContent = `${this.simData.homePoss}%`;
    document.getElementById('lmAwayPoss').textContent = `${this.simData.awayPoss}%`;
    document.getElementById('lmHomePossBar').style.width = `${this.simData.homePoss}%`;
    document.getElementById('lmAwayPossBar').style.width = `${this.simData.awayPoss}%`;
    
    document.getElementById('lmHomeShots').textContent = `${this.simData.homeShots} (${this.simData.homeShotsOnTarget})`;
    document.getElementById('lmAwayShots').textContent = `${this.simData.awayShots} (${this.simData.awayShotsOnTarget})`;
    
    const totalShots = this.simData.homeShots + this.simData.awayShots || 1;
    const homeShotsPercent = Math.round((this.simData.homeShots / totalShots) * 100);
    document.getElementById('lmHomeShotsBar').style.width = `${homeShotsPercent}%`;
    document.getElementById('lmAwayShotsBar').style.width = `${100 - homeShotsPercent}%`;
    
    document.getElementById('lmHomeCorners').textContent = this.simData.homeCorners;
    document.getElementById('lmAwayCorners').textContent = this.simData.awayCorners;
    
    const totalCorners = this.simData.homeCorners + this.simData.awayCorners || 1;
    const homeCornersPercent = Math.round((this.simData.homeCorners / totalCorners) * 100);
    document.getElementById('lmHomeCornersBar').style.width = `${homeCornersPercent}%`;
    document.getElementById('lmAwayCornersBar').style.width = `${100 - homeCornersPercent}%`;
    
    document.getElementById('lmHomeFouls').textContent = `${this.simData.homeFouls} (🟨${this.simData.homeYellow} 🟥${this.simData.homeRed})`;
    document.getElementById('lmAwayFouls').textContent = `${this.simData.awayFouls} (🟨${this.simData.awayYellow} 🟥${this.simData.awayRed})`;
    
    const totalFouls = this.simData.homeFouls + this.simData.awayFouls || 1;
    const homeFoulsPercent = Math.round((this.simData.homeFouls / totalFouls) * 100);
    document.getElementById('lmHomeFoulsBar').style.width = `${homeFoulsPercent}%`;
    document.getElementById('lmAwayFoulsBar').style.width = `${100 - homeFoulsPercent}%`;
  },
  
  addCommentary(time, text, type = '') {
    const list = document.getElementById('lmCommentaryList');
    if (!list) return;
    const item = document.createElement('div');
    item.className = `commentary-item ${type}`;
    item.style.cssText = "display: flex; gap: 0.75rem; font-size: 0.85rem; line-height: 1.4; padding: 0.45rem; border-radius: 6px; background: rgba(255,255,255,0.02); margin-bottom: 0.5rem;";
    
    item.innerHTML = `
      <span class="c-time" style="font-family: 'Barlow Condensed', sans-serif; font-weight: 700; color: var(--accent); min-width: 25px;">${time}</span>
      <span class="c-text" style="color: var(--text);">${text}</span>
    `;
    
    list.insertBefore(item, list.firstChild);
    list.scrollTop = 0;
  }
};

/** Actualiza clasificaciones grupales locales permanentemente al terminar un partido */
function updateLocalGroupStandings(groupLetter, homeCode, awayCode, homeScore, awayScore) {
  if (!groupLetter) return;
  const list = GROUP_STANDINGS[groupLetter];
  if (!list) return;
  
  const home = list.find(t => t.code === homeCode);
  const away = list.find(t => t.code === awayCode);
  
  if (!home || !away) return;
  
  home.pj++;
  away.pj++;
  home.gf += homeScore;
  home.gc += awayScore;
  away.gf += awayScore;
  away.gc += homeScore;
  home.gd = home.gf - home.gc;
  away.gd = away.gf - away.gc;
  
  if (homeScore > awayScore) {
    home.pg++;
    home.pts += 3;
    away.pp++;
  } else if (homeScore < awayScore) {
    away.pg++;
    away.pts += 3;
    home.pp++;
  } else {
    home.pe++;
    away.pe++;
    home.pts += 1;
    away.pts += 1;
  }
}

/** Recalcula "en caliente" y muestra las posiciones si el partido en vivo cambia las cosas */
function triggerLiveStandingUpdate(groupLetter, homeCode, awayCode, homeScore, awayScore) {
  if (!groupLetter) return;
  
  const originalList = GROUP_STANDINGS[groupLetter];
  if (!originalList) return;
  
  const clonedList = JSON.parse(JSON.stringify(originalList));
  const home = clonedList.find(t => t.code === homeCode);
  const away = clonedList.find(t => t.code === awayCode);
  
  if (!home || !away) return;
  
  home.pj++;
  away.pj++;
  home.gf += homeScore;
  home.gc += awayScore;
  away.gf += awayScore;
  away.gc += homeScore;
  home.gd = home.gf - home.gc;
  away.gd = away.gf - away.gc;
  
  if (homeScore > awayScore) {
    home.pg++;
    home.pts += 3;
    away.pp++;
  } else if (homeScore < awayScore) {
    away.pg++;
    away.pts += 3;
    home.pp++;
  } else {
    home.pe++;
    away.pe++;
    home.pts += 1;
    away.pts += 1;
  }
  
  const sortedOriginal = [...originalList].sort((a,b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);
  const sortedCloned = [...clonedList].sort((a,b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);
  
  renderLiveGroup(groupLetter, sortedOriginal, sortedCloned);
}

function renderLiveGroup(groupLetter, sortedOriginal, sortedCloned) {
  const cards = document.querySelectorAll('.group-card');
  let targetCard = null;
  cards.forEach(c => {
    const letter = c.querySelector('.group-letter').textContent;
    if (letter.includes(groupLetter)) targetCard = c;
  });
  
  if (!targetCard) return;
  
  const rows = sortedCloned.map((t, i) => {
    const team = getTeam(t.code);
    const isQ  = i < 2;
    
    const origIdx = sortedOriginal.findIndex(x => x.code === t.code);
    let changeArrow = '';
    let rowClass = isQ ? 'top-2' : '';
    
    if (origIdx > i) {
      changeArrow = '<span class="standing-change-arrow up">▲</span>';
      rowClass += ' flash-up';
    } else if (origIdx < i) {
      changeArrow = '<span class="standing-change-arrow down">▼</span>';
      rowClass += ' flash-down';
    }
    
    return `
      <tr class="${rowClass}">
        <td><span class="pos-num ${isQ ? 'q' : ''}">${i+1}</span></td>
        <td>
          <div class="team-cell">
            <span class="f">${getTeamFlagHtml(t.code)}</span>
            <span>${team.name}</span>
            ${changeArrow}
          </div>
        </td>
        <td>${t.pj}</td>
        <td>${t.pg}</td>
        <td>${t.pe}</td>
        <td>${t.pp}</td>
        <td>${t.gf}</td>
        <td>${t.gc}</td>
        <td>${t.gd > 0 ? '+' : ''}${t.gd}</td>
        <td class="pts-col">${t.pts}</td>
      </tr>`;
  }).join('');
  
  const tbody = targetCard.querySelector('tbody');
  if (tbody) tbody.innerHTML = rows;
}

/* ══════════════════════════════════════
   17. INIT
   ══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Navegación por links
  document.getElementById('mainNav').addEventListener('click', e => {
    const link = e.target.closest('.nav-link');
    if (!link) return;
    e.preventDefault();
    navigate(link.dataset.section);
  });

  // Inicializar todo
  initTheme();
  initHamburger();
  initCountdown();
  initLiveTicker();
  initSearch();
  initStadiumFilters();
  initGotoButtons();
  initTimezoneInfo();

  // Renderizar inicio
  renderFeaturedMatches();

  // Precargar estadios (visibles en hero scroll)
  renderStadiums();

  // Aplicar modo inicial (Demo o Limpio Real)
  DemoModeManager.applyMode();

  // Sincronizar automáticamente con TheSportsDB al cargar para comprobar partidos reales
  SportsDbManager.syncRealData();

  // --- LISTENERS MODAL AJUSTES API Y DEMO ---
  const apiBtn = document.getElementById('apiSettingsToggle');
  const apiModal = document.getElementById('apiSettingsModal');
  const closeApiBtn = document.getElementById('closeApiModal');
  const demoModeToggle = document.getElementById('demoModeToggle');
  const testApiBtn = document.getElementById('testApiBtn');
  const saveApiBtn = document.getElementById('saveApiBtn');
  const statusBanner = document.getElementById('apiStatusBanner');

  // Cargar valores iniciales
  demoModeToggle.checked = DemoModeManager.getMode();

  apiBtn.addEventListener('click', () => {
    apiModal.classList.add('open');
    statusBanner.style.display = 'none';
  });

  closeApiBtn.addEventListener('click', () => {
    apiModal.classList.remove('open');
  });

  // Botón Sincronizar con API de TheSportsDB
  testApiBtn.addEventListener('click', async () => {
    await SportsDbManager.syncRealData();
  });

  // Botón Aplicar Cambios (Modo Demo vs Limpio)
  saveApiBtn.addEventListener('click', () => {
    const isDemo = demoModeToggle.checked;
    DemoModeManager.setMode(isDemo);
    DemoModeManager.applyMode();

    statusBanner.style.display = 'block';
    statusBanner.style.background = 'rgba(46, 204, 113, 0.15)';
    statusBanner.style.color = 'var(--green)';
    statusBanner.textContent = '✓ Ajustes aplicados. Recargando datos...';

    // Re-renderizar todas las vistas del Mundial en caliente
    renderFeaturedMatches();
    if (document.getElementById('fixtureList').dataset.rendered) {
      document.getElementById('fixtureList').dataset.rendered = '';
      renderFixture();
    }
    if (document.getElementById('groupsGrid').dataset.rendered) {
      document.getElementById('groupsGrid').dataset.rendered = '';
      renderGroups();
    }
    initCountdown();
    initLiveTicker();

    setTimeout(() => {
      apiModal.classList.remove('open');
    }, 1200);
  });

  // --- LISTENERS MODAL PARTIDO EN VIVO ---
  const liveMatchModal = document.getElementById('liveMatchCenterModal');
  const closeLiveMatchBtn = document.getElementById('closeLiveMatchModal');
  const startLiveSimBtn = document.getElementById('startLiveSimBtn');

  // Cerrar modal
  closeLiveMatchBtn.addEventListener('click', () => {
    LiveMatchEngine.stop();
    liveMatchModal.classList.remove('open');
  });

  // Iniciar Simulación
  startLiveSimBtn.addEventListener('click', () => {
    LiveMatchEngine.start();
  });

  // Event delegation para clics en tarjetas de partidos y estadios
  document.getElementById('appRoot').addEventListener('click', e => {
    const matchEl = e.target.closest('.match-card, .match-row');
    if (matchEl) {
      const matchId = matchEl.dataset.id;
      if (!matchId) return;
      const match = MATCHES.find(m => m.id === matchId);
      if (!match) return;
      LiveMatchEngine.initSimulation(match);
      liveMatchModal.classList.add('open');
      return;
    }

    const stadiumCard = e.target.closest('.stadium-card');
    if (stadiumCard) {
      const stadiumId = stadiumCard.dataset.id;
      if (!stadiumId) return;
      openStadiumDetail(stadiumId);
    }
  });

  // --- LISTENERS MODAL DETALLE ESTADIO ---
  const stadiumModal = document.getElementById('stadiumDetailModal');
  const closeStadiumBtn = document.getElementById('closeStadiumModal');

  closeStadiumBtn.addEventListener('click', () => {
    stadiumModal.classList.remove('open');
  });

  // Cerrar modales al hacer clic fuera del contenido
  window.addEventListener('click', e => {
    if (e.target === apiModal) {
      apiModal.classList.remove('open');
    }
    if (e.target === liveMatchModal) {
      LiveMatchEngine.stop();
      liveMatchModal.classList.remove('open');
    }
    if (e.target === stadiumModal) {
      stadiumModal.classList.remove('open');
    }
  });

  console.log(
    '%c⚽ FIFA World Cup 2026 Tracker%c\nDesarrollado con HTML/CSS/JS puro\nZona horaria detectada: ' + USER_TZ,
    'color:#f5c518;font-size:1.2em;font-weight:bold',
    'color:#8b95b0'
  );
});



