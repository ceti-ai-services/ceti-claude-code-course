// Owala theme system — 4 palettes × 2 modes.
// Matches the brand guide: light = fills carry color, dark = luminous
// borders carry color, fills are near-bg shadows.

const PALETTES = {
  boardwalk: {
    name: 'Retro Boardwalk', emoji: '🎡',
    light: {
      bg: '#F5EDD6', surface: '#EDE0C4',
      primary: '#C4AEE2', primaryText: '#3E2870',
      secondary: '#9DD0BA', secondaryText: '#1A5A44',
      accent: '#E8A898', accentText: '#6A2018',
      support: '#8AABCC', supportText: '#1A3A5A',
      ink: '#2A2018', dim: '#6A5A48', line: 'rgba(62,40,112,.13)',
      primaryBorder: null, secondaryBorder: null, accentBorder: null, supportBorder: null,
    },
    dark: {
      bg: '#1C1720', surface: '#26213A',
      primary: '#2C2548', primaryText: '#CAB8F8',
      secondary: '#1E302A', secondaryText: '#86DAC0',
      accent: '#3D241E', accentText: '#E87258',
      support: '#1E2A3A', supportText: '#7AA0D0',
      ink: '#F2EBE0', dim: '#9888A8', line: 'rgba(202,184,248,.15)',
      primaryBorder: '#CAB8F8', secondaryBorder: '#86DAC0',
      accentBorder: '#E87258', supportBorder: '#7AA0D0',
    },
  },
  coastal: {
    name: 'Coastal Mist', emoji: '🌊',
    light: {
      bg: '#EDE8D8', surface: '#E2DBC8',
      primary: '#9DCFC0', primaryText: '#1A5A4A',
      secondary: '#F0C4B4', secondaryText: '#6A3020',
      accent: '#A8CCE0', accentText: '#0E3A58',
      support: '#CCA0A0', supportText: '#5A2828',
      ink: '#201E18', dim: '#706050', line: 'rgba(26,90,74,.12)',
      primaryBorder: null, secondaryBorder: null, accentBorder: null, supportBorder: null,
    },
    dark: {
      bg: '#151C1E', surface: '#1C2830',
      primary: '#162824', primaryText: '#7ADEC8',
      secondary: '#2A1A18', secondaryText: '#F2B090',
      accent: '#142838', accentText: '#5AAAD8',
      support: '#2A2020', supportText: '#E8B8B8',
      ink: '#EDF4F2', dim: '#7A9490', line: 'rgba(122,222,200,.14)',
      primaryBorder: '#7ADEC8', secondaryBorder: '#F2B090',
      accentBorder: '#5AAAD8', supportBorder: '#E8B8B8',
    },
  },
  greenhouse: {
    name: 'Greenhouse', emoji: '🌿',
    light: {
      bg: '#EDE6D8', surface: '#E0D8C8',
      primary: '#8BA06A', primaryText: '#1E3008',
      secondary: '#C4856A', secondaryText: '#3A1808',
      accent: '#7A9E88', accentText: '#102818',
      support: '#B8ACA0', supportText: '#3C3028',
      ink: '#1C1808', dim: '#6A5A48', line: 'rgba(30,48,8,.12)',
      primaryBorder: null, secondaryBorder: null, accentBorder: null, supportBorder: null,
    },
    dark: {
      bg: '#141510', surface: '#1E2218',
      primary: '#1C2814', primaryText: '#AADA78',
      secondary: '#281C14', secondaryText: '#EEA878',
      accent: '#142818', accentText: '#68B888',
      support: '#282018', supportText: '#C8C0A8',
      ink: '#EEE4D0', dim: '#8A8068', line: 'rgba(170,218,120,.15)',
      primaryBorder: '#AADA78', secondaryBorder: '#EEA878',
      accentBorder: '#68B888', supportBorder: '#C8C0A8',
    },
  },
  neosage: {
    name: 'Neo Sage', emoji: '⚡',
    light: {
      bg: '#F2F0E8', surface: '#E8E6DC',
      primary: '#9E88C0', primaryText: '#2A1860',
      secondary: '#B4C84A', secondaryText: '#303800',
      accent: '#E8B86A', accentText: '#503800',
      support: '#A8A098', supportText: '#303028',
      ink: '#201818', dim: '#706860', line: 'rgba(42,24,96,.12)',
      primaryBorder: null, secondaryBorder: null, accentBorder: null, supportBorder: null,
    },
    dark: {
      bg: '#131218', surface: '#1E1C28',
      primary: '#1C1838', primaryText: '#C0AAF8',
      secondary: '#181E08', secondaryText: '#C8E850',
      accent: '#2A2010', accentText: '#E8A83A',
      support: '#201C20', supportText: '#B8B0C0',
      ink: '#F2F0E8', dim: '#888090', line: 'rgba(192,170,248,.18)',
      primaryBorder: '#C0AAF8', secondaryBorder: '#C8E850',
      accentBorder: '#E8A83A', supportBorder: '#B8B0C0',
    },
  },
};

// Theme context — every diagram reads from this. Defaults = boardwalk/light
// so the components work standalone if someone drops them in without a wrapper.
const ThemeCtx = React.createContext({ mode: 'light', palette: 'boardwalk' });

function useTheme() {
  const { mode, palette } = React.useContext(ThemeCtx);
  const t = PALETTES[palette][mode];
  return { ...t, mode, palette, isDark: mode === 'dark' };
}

// Returns {fill, border, text} for a given role — the single source of truth
// for how a "colored node" is styled in each mode.
function roleStyle(theme, role /* primary | secondary | accent | support */) {
  const fill = theme[role];
  const text = theme[role + 'Text'];
  const border = theme[role + 'Border']; // null in light, hex in dark
  return {
    background: fill,
    color: text,
    border: border ? `1.5px solid ${border}` : 'none',
    // Export the "luminous edge" color so callers that need just the glow
    // (animations, arrows, single-color elements) can reach for it.
    edgeColor: border || fill,
  };
}

Object.assign(window, { PALETTES, ThemeCtx, useTheme, roleStyle });
