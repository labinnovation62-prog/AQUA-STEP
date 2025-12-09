import { SensorData, SystemStatus } from '../types';
import { SIMULATION_RANGES, STATUS_SEQUENCE } from '../constants';

const randomInRange = (min: number, max: number, decimals: number = 2): number => {
  const val = Math.random() * (max - min) + min;
  return Number(val.toFixed(decimals));
};

let lastStatusIndex = 0;

export const generateSensorData = (): SensorData => {
  // Cycle through statuses
  lastStatusIndex = (lastStatusIndex + 1) % STATUS_SEQUENCE.length;
  const currentStatus = STATUS_SEQUENCE[lastStatusIndex] as SystemStatus;

  return {
    id: crypto.randomUUID(),
    timestamp: new Date(),
    ph: randomInRange(SIMULATION_RANGES.PH.min, SIMULATION_RANGES.PH.max, 1),
    tds: Math.floor(randomInRange(SIMULATION_RANGES.TDS.min, SIMULATION_RANGES.TDS.max, 0)),
    voltage: randomInRange(SIMULATION_RANGES.VOLTAGE.min, SIMULATION_RANGES.VOLTAGE.max, 2),
    flowRate: randomInRange(SIMULATION_RANGES.FLOW.min, SIMULATION_RANGES.FLOW.max, 2),
    turbineRpm: Math.floor(randomInRange(SIMULATION_RANGES.RPM.min, SIMULATION_RANGES.RPM.max, 0)),
    status: currentStatus,
  };
};
