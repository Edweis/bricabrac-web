import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import isEqual from 'lodash.isequal';
import { BehaviorSubject } from 'rxjs';

type SetState<S> = Dispatch<SetStateAction<S>>;
export abstract class StateManager<S> {
  initState: S;

  private subject: BehaviorSubject<S>;

  get state() {
    return this.subject.value;
  }

  setState = (fn: (oldState: S) => Partial<S>) => {
    const prevState = this.state;
    const nextState = { ...prevState, ...fn(prevState) };
    if (isEqual(prevState, nextState)) {
      console.warn('State did not change. Not emmitted', prevState);
    } else {
      this.subject.next(nextState);
    }
  };

  subscribe = (setState: SetState<S>) => this.subject.subscribe(setState);

  constructor(_initState: S) {
    this.initState = _initState;
    this.subject = new BehaviorSubject<S>(_initState);
  }
}

export function useObservable<T extends StateManager<S>, S>(
  manager: T & StateManager<S>,
): S {
  const [value, setValue] = useState(manager.initState);

  useEffect(() => {
    const subscription = manager.subscribe(setValue);
    return () => {
      console.debug('about to unsubscribe...', subscription);
      subscription.unsubscribe();
    };
  }, [manager]);

  return value;
}
