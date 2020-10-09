import React, { FunctionComponent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useObservable, AlertManager } from '../lib/state';
import { BootstrapLevels } from '../types';
import Fade, { fadeDuration } from './transitions/Fade';

type AlertProps = {
  level: BootstrapLevels;
  onClick: () => void;
  message: string;
  href?: string;
};
const ALERT_TIMEOUT_MS = 3000;
const Alert = (props: AlertProps) => {
  // See bootstrap.esm.min.js
  const classes = `alert alert-dismissible  show alert-${props.level}`;
  const [fade, setFade] = useState(false);
  const onClick = () => {
    setFade(true);
    setTimeout(() => props.onClick(), fadeDuration);
  };
  useEffect(() => {
    setTimeout(() => onClick(), ALERT_TIMEOUT_MS);
  }, []);
  let text = <span>{props.message}</span>;
  if (props.href != null)
    text = (
      <Link href={props.href}>
        <a>{props.message}</a>
      </Link>
    );
  return (
    <Fade in={!fade}>
      <div className={classes} role="alert">
        {text}
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
            message={alert.message}
            href={alert.href}
          />
        ))}
      </AlertContainer>
      {props?.children}
    </>
  );
};

export default WithAlerts;
