import nextCourseStep from '../actions/nextCourseStep';
import playClicked from './playClicked';
import resetAssignment from '../actions/resetAssignment';
import techTreeToggled from '../../techTree/signals/toggled';

export default [
  nextCourseStep, {
    course: techTreeToggled,
    scene: [
      
    ],
    assignment: [
      resetAssignment,
      ...playClicked
    ]
  }
];
