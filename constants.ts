export const SIMULATION_RANGES = {
  PH: { min: 6.0, max: 8.5 },
  TDS: { min: 50, max: 300 },
  VOLTAGE: { min: 0.5, max: 5.0 },
  FLOW: { min: 0.1, max: 1.5 },
  RPM: { min: 100, max: 600 }
};

export const REFRESH_RATE_MS = 5000;

export const STATUS_SEQUENCE = [
  'Filtering',
  'Turbine Running',
  'Testing Water'
];
