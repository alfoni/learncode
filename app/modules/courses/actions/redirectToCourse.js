function redirectToCourse(input, state, output, services) {
  services.router.redirect(`/courses/${input.id}/scenes/0`)();
}

export default redirectToCourse;
