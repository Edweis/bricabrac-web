import React, { FunctionComponent } from 'react';
import { useObservable, AlertManager } from '../lib/state';
import { BootstrapLevels } from '../types';

type AlertProps = {
  level: BootstrapLevels;
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
const Alert: FunctionComponent<AlertProps> = (props) => {
  // See bootstrap.esm.min.js
  const classes = `alert alert-dismissible fade show alert-${props.level}`;
  return (
    <div className={classes} role="alert">
      {props.children}
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={props.onClick}
      >
        <span aria-hidden="true">&times;+</span>
      </button>
    </div>
  );
};
const AlertContainer: FunctionComponent = (props) => (
  <div className="fixed-top mt-4 mr-4">
    <div className="w-25 float-right">{props?.children}</div>
  </div>
);

const WithAlerts: FunctionComponent = (props) => {
  const { alerts } = useObservable(AlertManager);

  return (
    <>
      <AlertContainer>
        {alerts.map((alert) => (
          <Alert
            level={alert.level}
            key={alert.id}
            onClick={() => AlertManager.close(alert.id)}
          >
            {alert.message}
          </Alert>
        ))}
      </AlertContainer>
      {props?.children}
    </>
  );
};

export default WithAlerts;
