let resetAddFileInput = function (cerebral) {
    cerebral.set(['course', 'showAddFileInput'], false);
    cerebral.set(['course', 'newFileName'], '');
};

export default resetAddFileInput;