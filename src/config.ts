import { isMobileDevice } from './mobile';

export class Config {
    autofire = isMobileDevice();
    tracer = false;
    fast = false;
}

export const config = new Config();