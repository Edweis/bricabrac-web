import React, { FunctionComponent, useState } from 'react';
import { useObservable, AlertManager } from '../lib/state';
import { BootstrapLevels } from '../types';
import Fade, { fadeDuration } from './transitions/Fade';

type ButtonClick = React.MouseEvent<HTMLButtonElement>;
type AlertProps = {
  level: BootstrapLevels;
  children: React.ReactNode;
  onClick: (event: ButtonClick) => void;
};
const Alert: FunctionComponent<AlertProps> = (props) => {
  // See bootstrap.esm.min.js
  const classes = `alert alert-dismissible  show alert-${props.level}`;
  const [fade, setFade] = useState(false);
  const onClick = (event: ButtonClick) => {
    setFade(true);
    setTimeout(() => props.onClick(event), fadeDuration);
  };
  return (
    <Fade in={!fade}>
      <div className={classes} role="alert">
        {props.children}
        <button
          type="button"
          className="btn-close"
          data-dismiss="alert"
          aria-label="Close"
          onClick={onClick}
        />
      </div>
    </Fade>
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
