import nextCourseStep from '../actions/nextCourseStep';
import playClicked from './playClicked';
import resetAssignment from '../actions/resetAssignment';
import techTreeToggled from '../../techTree/signals/toggled';
import redirectToScene from '../actions/redirectToScene';

export default [
  nextCourseStep, {
    course: techTreeToggled,
    scene: [
      resetAssignment,
      redirectToScene
    ],
    assignment: [
      resetAssignment,
      ...playClicked
    ]
  }
];
