export interface SensorData {
  id: string;
  timestamp: Date;
  ph: number;
  tds: number;
  voltage: number;
  flowRate: number;
  turbineRpm: number;
  status: SystemStatus;
}

export enum SystemStatus {
  FILTERING = 'Filtering',
  TURBINE_RUNNING = 'Turbine Running',
  TESTING_WATER = 'Testing Water',
  IDLE = 'Idle'
}

export type ViewState = 'HOME' | 'DASHBOARD' | 'HISTORY' | 'ABOUT';
