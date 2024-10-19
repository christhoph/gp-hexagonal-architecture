import { ForMonitoring } from "../../ports/drivens";

export class MonitoringStubAdapter implements ForMonitoring {
  log(event: string, message: string) {
    console.log(`[${event}]: ${message}`);
  }
}
