import opened from './signals/opened';
import newCourseClicked from './signals/newCourseClicked';
import appClicked from './signals/appClicked';
import newCourseSubmitted from './signals/newCourseSubmitted';
import newCourseUpdated from './signals/newCourseUpdated';
import showDescriptionsClicked from './signals/showDescriptionsClicked';
import onSaveDescriptionSubmit from './signals/onSaveDescriptionSubmit';
import descriptionUpdated from './signals/descriptionUpdated';
import tagNameClicked from './signals/tagNameClicked';
import newDescriptionUpdated from './signals/newDescriptionUpdated';
import deleteDescriptionClicked from './signals/deleteDescriptionClicked';
import radioButtonClicked from './signals/radioButtonClicked';

export default () => {
  return (module) => {
    module.state({
      showNewCourse: false,
      showDescriptions: false,
      isSavingNewCourse: false,
      isSavingDescription: false,
      selectedDescription: null,
      descriptions: [],
      newDescription: {
        tagName: '',
        description: '',
        exampleType: 'HTML',
        example: ''
      },
      updatedDescription: {
        tagName: '',
        description: '',
        exampleType: 'HTML',
        example: ''
      },
      newCourse: {
        courseName: '',
        sceneName: ''
      },
      courses: []
    });

    module.signals({
      opened,
      newCourseClicked,
      appClicked,
      newCourseSubmitted,
      newCourseUpdated,
      showDescriptionsClicked,
      onSaveDescriptionSubmit,
      descriptionUpdated,
      tagNameClicked,
      newDescriptionUpdated,
      deleteDescriptionClicked,
      radioButtonClicked
    });
  };
};
