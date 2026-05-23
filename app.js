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
    highlight: true
  },
  {
    id: 'sofi', name: 'SoFi Stadium', city: 'Los Ángeles', country: 'USA',
    capacity: 70_240, emoji: '🏟️',
    tz: 'America/Los_Angeles', games: 8,
    note: 'Sede de la inauguración'
  },
  {
    id: 'azteca', name: 'Estadio Azteca', city: 'Ciudad de México', country: 'MEX',
    capacity: 87_523, emoji: '🏟️',
    tz: 'America/Mexico_City', games: 5,
    note: 'El estadio más grande de la Copa'
  },
  {
    id: 'atandt', name: 'AT&T Stadium', city: 'Dallas', country: 'USA',
    capacity: 80_000, emoji: '🏟️',
    tz: 'America/Chicago', games: 7,
    note: 'Cancha cubierta de vanguardia'
  },
  {
    id: 'bmo', name: 'BMO Field', city: 'Toronto', country: 'CAN',
    capacity: 45_000, emoji: '🏟️',
    tz: 'America/Toronto', games: 6,
    note: 'Principal sede canadiense'
  },
  {
    id: 'acnw', name: 'BC Place', city: 'Vancouver', country: 'CAN',
    capacity: 54_500, emoji: '🏟️',
    tz: 'America/Vancouver', games: 6,
    note: 'Vista panorámica a las montañas'
  },
  {
    id: 'nrg', name: 'NRG Stadium', city: 'Houston', country: 'USA',
    capacity: 72_220, emoji: '🏟️',
    tz: 'America/Chicago', games: 7
  },
  {
    id: 'estadio_akron', name: 'Estadio Akron', city: 'Guadalajara', country: 'MEX',
    capacity: 49_850, emoji: '🏟️',
    tz: 'America/Mexico_City', games: 5,
    note: 'Joya arquitectónica de Jalisco'
  },
  {
    id: 'linc', name: 'Lincoln Financial Field', city: 'Filadelfia', country: 'USA',
    capacity: 69_796, emoji: '🏟️',
    tz: 'America/New_York', games: 6
  },
  {
    id: 'arrowhead', name: 'Arrowhead Stadium', city: 'Kansas City', country: 'USA',
    capacity: 76_416, emoji: '🏟️',
    tz: 'America/Chicago', games: 6
  },
  {
    id: 'gillette', name: 'Gillette Stadium', city: 'Boston', country: 'USA',
    capacity: 65_878, emoji: '🏟️',
    tz: 'America/New_York', games: 6
  },
  {
    id: 'lumen', name: 'Lumen Field', city: 'Seattle', country: 'USA',
    capacity: 69_000, emoji: '🏟️',
    tz: 'America/Los_Angeles', games: 6
  },
  {
    id: 'allegiant', name: 'Allegiant Stadium', city: 'Las Vegas', country: 'USA',
    capacity: 65_000, emoji: '🏟️',
    tz: 'America/Los_Angeles', games: 5
  },
  {
    id: 'inter', name: 'Inter&Co Stadium', city: 'Orlando', country: 'USA',
    capacity: 25_500, emoji: '🏟️',
    tz: 'America/New_York', games: 5
  },
  {
    id: 'monterrey', name: 'Estadio BBVA', city: 'Monterrey', country: 'MEX',
    capacity: 53_500, emoji: '🏟️',
    tz: 'America/Monterrey', games: 5
  },
  {
    id: 'snapdragon', name: 'Snapdragon Stadium', city: 'San Diego', country: 'USA',
    capacity: 35_000, emoji: '🏟️',
    tz: 'America/Los_Angeles', games: 4
  }
];

/** Equipos — nombre, bandera emoji, código ISO */
const TEAMS = {
  ARG: { name: 'Argentina',     flag: '🇦🇷', group: 'A', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  MEX: { name: 'México',        flag: '🇲🇽', group: 'A', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  MAR: { name: 'Marruecos',     flag: '🇲🇦', group: 'A', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  NZL: { name: 'Nueva Zelanda', flag: '🇳🇿', group: 'A', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },

  BRA: { name: 'Brasil',        flag: '🇧🇷', group: 'B', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  GER: { name: 'Alemania',      flag: '🇩🇪', group: 'B', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  JPN: { name: 'Japón',         flag: '🇯🇵', group: 'B', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  SAU: { name: 'Arabia Saudita',flag: '🇸🇦', group: 'B', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },

  FRA: { name: 'Francia',       flag: '🇫🇷', group: 'C', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  AUS: { name: 'Australia',     flag: '🇦🇺', group: 'C', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  PER: { name: 'Perú',          flag: '🇵🇪', group: 'C', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  GUA: { name: 'Guatemala',     flag: '🇬🇹', group: 'C', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },

  ESP: { name: 'España',        flag: '🇪🇸', group: 'D', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  URU: { name: 'Uruguay',       flag: '🇺🇾', group: 'D', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  CIV: { name: "Costa de Marfil",flag:'🇨🇮', group: 'D', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  CZE: { name: 'Chequia',       flag: '🇨🇿', group: 'D', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },

  POR: { name: 'Portugal',      flag: '🇵🇹', group: 'E', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  USA: { name: 'Estados Unidos',flag: '🇺🇸', group: 'E', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  PAK: { name: 'Ecuador',       flag: '🇪🇨', group: 'E', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  UKR: { name: 'Ucrania',       flag: '🇺🇦', group: 'E', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },

  ENG: { name: 'Inglaterra',    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', group: 'F', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  NED: { name: 'Países Bajos',  flag: '🇳🇱', group: 'F', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  SEN: { name: 'Senegal',       flag: '🇸🇳', group: 'F', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  IRN: { name: 'Irán',          flag: '🇮🇷', group: 'F', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },

  BEL: { name: 'Bélgica',       flag: '🇧🇪', group: 'G', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  COL: { name: 'Colombia',      flag: '🇨🇴', group: 'G', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  EGY: { name: 'Egipto',        flag: '🇪🇬', group: 'G', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  TUN: { name: 'Túnez',         flag: '🇹🇳', group: 'G', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },

  CRO: { name: 'Croacia',       flag: '🇭🇷', group: 'H', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  CHI: { name: 'Chile',         flag: '🇨🇱', group: 'H', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  ALG: { name: 'Argelia',       flag: '🇩🇿', group: 'H', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  NOR: { name: 'Noruega',       flag: '🇳🇴', group: 'H', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },

  ITA: { name: 'Italia',        flag: '🇮🇹', group: 'I', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  TUR: { name: 'Turquía',       flag: '🇹🇷', group: 'I', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  NGR: { name: 'Nigeria',       flag: '🇳🇬', group: 'I', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  ALB: { name: 'Albania',       flag: '🇦🇱', group: 'I', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },

  POL: { name: 'Polonia',       flag: '🇵🇱', group: 'J', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  MOR: { name: 'Camerún',       flag: '🇨🇲', group: 'J', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  ROM: { name: 'Rumania',       flag: '🇷🇴', group: 'J', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  IRL: { name: 'Irlanda',       flag: '🇮🇪', group: 'J', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },

  KOR: { name: 'Corea del Sur', flag: '🇰🇷', group: 'K', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  MEX2:{ name: 'Ghana',         flag: '🇬🇭', group: 'K', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  PAR: { name: 'Paraguay',      flag: '🇵🇾', group: 'K', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  QAT: { name: 'Qatar',         flag: '🇶🇦', group: 'K', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },

  DEN: { name: 'Dinamarca',     flag: '🇩🇰', group: 'L', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  MEX3:{ name: 'Suiza',         flag: '🇨🇭', group: 'L', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  CAM: { name: 'Canadá',        flag: '🇨🇦', group: 'L', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
  MOR2:{ name: 'Marruecos B',   flag: '🇲🇦', group: 'L', pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0,gd:0 },
};

/** Partidos del torneo */
const MATCHES = [
  /* ── Partido inaugural ── */
  {
    id: 'm001', phase: 'Fase de Grupos', group: 'E',
    home: 'MEX', away: 'USA',
    dateUTC: '2026-06-11T22:00:00Z',
    stadium: 'sofi',
    score: { home: null, away: null }, status: 'upcoming', live: false
  },
  /* ── Grupo A ── */
  {
    id: 'm002', phase: 'Fase de Grupos', group: 'A',
    home: 'ARG', away: 'MEX',
    dateUTC: '2026-06-13T18:00:00Z',
    stadium: 'metlife',
    score: { home: 2, away: 0 }, status: 'finished', live: false
  },
  {
    id: 'm003', phase: 'Fase de Grupos', group: 'A',
    home: 'MAR', away: 'NZL',
    dateUTC: '2026-06-13T21:00:00Z',
    stadium: 'atandt',
    score: { home: 1, away: 1 }, status: 'finished', live: false
  },
  {
    id: 'm004', phase: 'Fase de Grupos', group: 'A',
    home: 'ARG', away: 'MAR',
    dateUTC: '2026-06-18T01:00:00Z',
    stadium: 'nrg',
    score: { home: null, away: null }, status: 'upcoming', live: false
  },
  {
    id: 'm005', phase: 'Fase de Grupos', group: 'A',
    home: 'MEX', away: 'NZL',
    dateUTC: '2026-06-18T18:00:00Z',
    stadium: 'azteca',
    score: { home: null, away: null }, status: 'upcoming', live: false
  },
  /* ── Grupo B ── */
  {
    id: 'm006', phase: 'Fase de Grupos', group: 'B',
    home: 'BRA', away: 'GER',
    dateUTC: '2026-06-14T21:00:00Z',
    stadium: 'metlife',
    score: { home: 1, away: 2 }, status: 'finished', live: false
  },
  {
    id: 'm007', phase: 'Fase de Grupos', group: 'B',
    home: 'JPN', away: 'SAU',
    dateUTC: '2026-06-15T00:00:00Z',
    stadium: 'sofi',
    score: { home: 2, away: 1 }, status: 'finished', live: false
  },
  /* ── Grupo C ── */
  {
    id: 'm008', phase: 'Fase de Grupos', group: 'C',
    home: 'FRA', away: 'AUS',
    dateUTC: '2026-06-15T21:00:00Z',
    stadium: 'gillette',
    score: { home: 3, away: 0 }, status: 'finished', live: false
  },
  /* ── Grupo D ── */
  {
    id: 'm009', phase: 'Fase de Grupos', group: 'D',
    home: 'ESP', away: 'URU',
    dateUTC: '2026-06-17T00:00:00Z',
    stadium: 'linc',
    score: { home: 1, away: 0 }, status: 'finished', live: false
  },
  /* ── Partido EN VIVO simulado ── */
  {
    id: 'm010', phase: 'Fase de Grupos', group: 'B',
    home: 'GER', away: 'SAU',
    dateUTC: '2026-06-19T18:00:00Z',
    stadium: 'sofi',
    score: { home: 2, away: 1 }, status: 'live', live: true, minute: 67
  },
  /* ── Fase de Grupos restantes (upcomings) ── */
  {
    id: 'm011', phase: 'Fase de Grupos', group: 'E',
    home: 'POR', away: 'UKR',
    dateUTC: '2026-06-21T00:00:00Z',
    stadium: 'bmo',
    score: { home: null, away: null }, status: 'upcoming', live: false
  },
  {
    id: 'm012', phase: 'Fase de Grupos', group: 'F',
    home: 'ENG', away: 'SEN',
    dateUTC: '2026-06-22T18:00:00Z',
    stadium: 'allegiant',
    score: { home: null, away: null }, status: 'upcoming', live: false
  },
  {
    id: 'm013', phase: 'Fase de Grupos', group: 'G',
    home: 'BEL', away: 'COL',
    dateUTC: '2026-06-23T21:00:00Z',
    stadium: 'arrowhead',
    score: { home: null, away: null }, status: 'upcoming', live: false
  },
  {
    id: 'm014', phase: 'Fase de Grupos', group: 'H',
    home: 'CRO', away: 'NOR',
    dateUTC: '2026-06-25T00:00:00Z',
    stadium: 'acnw',
    score: { home: null, away: null }, status: 'upcoming', live: false
  },
  {
    id: 'm015', phase: 'Fase de Grupos', group: 'I',
    home: 'ITA', away: 'TUR',
    dateUTC: '2026-06-26T18:00:00Z',
    stadium: 'lumen',
    score: { home: null, away: null }, status: 'upcoming', live: false
  },
  {
    id: 'm016', phase: 'Fase de Grupos', group: 'J',
    home: 'POL', away: 'ROM',
    dateUTC: '2026-06-27T21:00:00Z',
    stadium: 'inter',
    score: { home: null, away: null }, status: 'upcoming', live: false
  },
  {
    id: 'm017', phase: 'Fase de Grupos', group: 'K',
    home: 'KOR', away: 'PAR',
    dateUTC: '2026-06-29T00:00:00Z',
    stadium: 'estadio_akron',
    score: { home: null, away: null }, status: 'upcoming', live: false
  },
  {
    id: 'm018', phase: 'Fase de Grupos', group: 'L',
    home: 'DEN', away: 'CAM',
    dateUTC: '2026-06-30T18:00:00Z',
    stadium: 'monterrey',
    score: { home: null, away: null }, status: 'upcoming', live: false
  },
  /* ── DIECISEISAVOS ── */
  {
    id: 'm019', phase: 'Dieciseisavos', group: null,
    home: '1A', away: '3DEF',
    dateUTC: '2026-07-04T22:00:00Z',
    stadium: 'sofi',
    score: { home: null, away: null }, status: 'tbd', live: false
  },
  {
    id: 'm020', phase: 'Dieciseisavos', group: null,
    home: '1C', away: '3ABL',
    dateUTC: '2026-07-05T22:00:00Z',
    stadium: 'metlife',
    score: { home: null, away: null }, status: 'tbd', live: false
  },
  /* ── OCTAVOS ── */
  {
    id: 'm021', phase: 'Octavos', group: null,
    home: 'Por definir', away: 'Por definir',
    dateUTC: '2026-07-09T22:00:00Z',
    stadium: 'atandt',
    score: { home: null, away: null }, status: 'tbd', live: false
  },
  /* ── CUARTOS ── */
  {
    id: 'm022', phase: 'Cuartos', group: null,
    home: 'Por definir', away: 'Por definir',
    dateUTC: '2026-07-13T22:00:00Z',
    stadium: 'azteca',
    score: { home: null, away: null }, status: 'tbd', live: false
  },
  /* ── SEMIFINAL ── */
  {
    id: 'm023', phase: 'Semifinal', group: null,
    home: 'Por definir', away: 'Por definir',
    dateUTC: '2026-07-16T22:00:00Z',
    stadium: 'metlife',
    score: { home: null, away: null }, status: 'tbd', live: false
  },
  /* ── 3ER PUESTO ── */
  {
    id: 'm024', phase: 'Tercer Puesto', group: null,
    home: 'Por definir', away: 'Por definir',
    dateUTC: '2026-07-18T22:00:00Z',
    stadium: 'sofi',
    score: { home: null, away: null }, status: 'tbd', live: false
  },
  /* ── FINAL ── */
  {
    id: 'm025', phase: 'Final', group: null,
    home: 'Por definir', away: 'Por definir',
    dateUTC: '2026-07-19T20:00:00Z',
    stadium: 'metlife',
    score: { home: null, away: null }, status: 'tbd', live: false
  }
];

/** Standings iniciales (simulados con partidos jugados) */
const GROUP_STANDINGS = {
  A: [
    { code:'ARG', pts:3, pj:1, pg:1, pe:0, pp:0, gf:2, gc:0, gd:2 },
    { code:'MAR', pts:1, pj:1, pg:0, pe:1, pp:0, gf:1, gc:1, gd:0 },
    { code:'NZL', pts:1, pj:1, pg:0, pe:1, pp:0, gf:1, gc:1, gd:0 },
    { code:'MEX', pts:0, pj:1, pg:0, pe:0, pp:1, gf:0, gc:2, gd:-2 },
  ],
  B: [
    { code:'GER', pts:3, pj:1, pg:1, pe:0, pp:0, gf:2, gc:1, gd:1 },
    { code:'JPN', pts:3, pj:1, pg:1, pe:0, pp:0, gf:2, gc:1, gd:1 },
    { code:'BRA', pts:0, pj:1, pg:0, pe:0, pp:1, gf:1, gc:2, gd:-1 },
    { code:'SAU', pts:0, pj:1, pg:0, pe:0, pp:1, gf:1, gc:2, gd:-1 },
  ],
  C: [
    { code:'FRA', pts:3, pj:1, pg:1, pe:0, pp:0, gf:3, gc:0, gd:3 },
    { code:'AUS', pts:0, pj:1, pg:0, pe:0, pp:1, gf:0, gc:3, gd:-3 },
    { code:'PER', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'GUA', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
  ],
  D: [
    { code:'ESP', pts:3, pj:1, pg:1, pe:0, pp:0, gf:1, gc:0, gd:1 },
    { code:'CIV', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'CZE', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'URU', pts:0, pj:1, pg:0, pe:0, pp:1, gf:0, gc:1, gd:-1 },
  ],
  E: [
    { code:'MEX', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'USA', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'PAK', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'UKR', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
  ],
  F: [
    { code:'ENG', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'NED', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'SEN', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'IRN', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
  ],
  G: [
    { code:'BEL', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'COL', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'EGY', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'TUN', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
  ],
  H: [
    { code:'CRO', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'CHI', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'ALG', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'NOR', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
  ],
  I: [
    { code:'ITA', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'TUR', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'NGR', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'ALB', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
  ],
  J: [
    { code:'POL', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'MOR', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'ROM', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'IRL', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
  ],
  K: [
    { code:'KOR', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'MEX2',pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'PAR', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'QAT', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
  ],
  L: [
    { code:'DEN', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'MEX3',pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'CAM', pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
    { code:'MOR2',pts:0, pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, gd:0 },
  ],
};

/* ══════════════════════════════════════
   2. UTILIDADES
══════════════════════════════════════ */

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
  <div class="match-card">
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
        <span class="team-flag">${home.flag}</span>
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
        <span class="team-flag">${away.flag}</span>
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
  <div class="match-row" data-id="${m.id}">
    <div class="team-left">
      <span class="team-flag">${home.flag}</span>
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
      <span class="team-flag">${away.flag}</span>
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
    `<span class="flag-pair">${home.flag} vs ${away.flag}</span><br>${home.name} &nbsp;vs&nbsp; ${away.name}<br><small style="font-size:.75em;color:var(--text-2)">📍 ${st.name}, ${st.city}</small>`;

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
    return `${h.flag} ${h.name} ${m.score.home} – ${m.score.away} ${a.name} ${a.flag}  (${m.minute}')`;
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
              <span class="f">${team.flag}</span>
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
    <div class="stadium-card" style="animation-delay:${i*0.06}s">
      <div class="stadium-img">
        <div class="stadium-emoji">🏟️</div>
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
            <span class="team-flag">${team.flag}</span>
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
      <div class="bracket-team">${teamA.flag} ${teamA.name} <small style="color:var(--text-3);font-size:.65em">1°${pair[0]}</small></div>
      <div class="bracket-vs">VS</div>
      <div class="bracket-team">${teamB.flag} ${teamB.name} <small style="color:var(--text-3);font-size:.65em">2°${pair[1]}</small></div>
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
        <span class="flag">${t.flag}</span>
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
   16. INIT
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

  console.log(
    '%c⚽ FIFA World Cup 2026 Tracker%c\nDesarrollado con HTML/CSS/JS puro\nZona horaria detectada: ' + USER_TZ,
    'color:#f5c518;font-size:1.2em;font-weight:bold',
    'color:#8b95b0'
  );
});
