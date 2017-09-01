import Reflux from 'reflux';

export const Actions = Reflux.createActions(['addWorkout', 'removeWorkout', 'updateWorkout']);

export default class StatusStore extends Reflux.Store {
  constructor() {
      super();
      this.listenables = Actions;
  }

  onFirstAction() {
      // calls on Actions.firstAction();
  }

	onSecondAction() {
		// calls on Actions.secondAction();
	}
}