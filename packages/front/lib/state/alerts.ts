import { BootstrapLevels } from '../../types';
import { StateManager } from './StateManager';

type Alert = { id: number; level: BootstrapLevels; message: string };
type State = { alerts: Alert[] };
const initState: State = {
  alerts: [
    { id: 100, level: 'danger', message: 'Oh no !' },
    { id: 200, level: 'info', message: 'hello' },
  ],
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

  close = (alertId: number) =>
    this.setState((state) => ({
      alerts: state.alerts.filter((alert) => alert.id !== alertId),
    }));
}
export default new AlertManager(initState);
