import { BootstrapLevels } from '../../types';
import { StateManager } from './StateManager';

type Alert = {
  id: number;
  level: BootstrapLevels;
  message: string;
  href?: string;
};
type State = { alerts: Alert[] };
const initState: State = {
  alerts: [],
};

class AlertManager extends StateManager<State> {
  private sequence = 0;

  private nextId = () => {
    this.sequence += 1;
    return this.sequence;
  };

  push = (alert: Omit<Alert, 'id'>) =>
    this.setState((state) => ({
      alerts: state.alerts.concat({ ...alert, id: this.nextId() }),
    }));

  catch = (error: Error) => {
    this.push({ level: 'danger', message: error.message });
  };

  close = (alertId: number) =>
    this.setState((state) => ({
      alerts: state.alerts.filter((alert) => alert.id !== alertId),
    }));
}
export default new AlertManager(initState);
