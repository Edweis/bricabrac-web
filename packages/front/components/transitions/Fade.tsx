import { Transition } from 'react-transition-group';
import React, { FunctionComponent } from 'react';

type Style = any;
export const fadeDuration = 300;

const defaultStyle: Style = {
  transition: `opacity ${fadeDuration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles: Style = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

const Fade: FunctionComponent<{ in: boolean }> = (props) => {
  return (
    <Transition in={props.in} timeout={fadeDuration}>
      {(state) => (
        <div
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          {props.children}
        </div>
      )}
    </Transition>
  );
};

export default Fade;
