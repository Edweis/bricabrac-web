import { Transition } from 'react-transition-group';
import React, { FunctionComponent } from 'react';

type Style = any;
export const fadeDuration = 300;

const defaultStyle: Style = {
  transition: `opacity ${fadeDuration}ms ease-in-out, max-height ${fadeDuration}ms`,
  opacity: 0,
  maxHeight: 0,
};

const transitionStyles: Style = {
  entering: { opacity: 1, maxHeight: '100px' },
  entered: { opacity: 1, maxHeight: '100px' },
  exiting: { opacity: 0, maxHeight: 0 },
  exited: { opacity: 0, maxHeight: 0 },
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
