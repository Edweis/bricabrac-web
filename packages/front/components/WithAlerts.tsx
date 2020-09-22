import React, { FunctionComponent } from 'react';

type BootstrapLevels =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark';
type AlertProps = { level: BootstrapLevels; children: React.ReactNode };
const Alert: FunctionComponent<AlertProps> = (props) => {
  const classes = `alert alert-dismissible fade show alert-${props.level}`;
  return (
    <div className={classes} role="alert">
      {props.children}
    </div>
  );
};
const AlertContainer: FunctionComponent = (props) => (
  <div className="fixed-top mt-4 mr-4">
    <div className="w-25 float-right">{props?.children}</div>
  </div>
);

const WithAlerts: FunctionComponent = (props) => {
  return (
    <>
      <AlertContainer>
        <Alert level="danger">A simple danger alert—check it out!</Alert>
        <Alert level="info">A simple info alert—check it out!</Alert>
      </AlertContainer>
      {props?.children}
    </>
  );
};

export default WithAlerts;
