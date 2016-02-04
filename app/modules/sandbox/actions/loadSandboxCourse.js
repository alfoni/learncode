function loadSandboxCourse({services, output, input}) {
  services.ajax.get(`/API/sandbox/${input.tierId}`)
    .then((sandboxCourse) => {
      output.success({
        sandboxCourse: sandboxCourse
      });
    }).catch(() => {
      output.error({
        courseError: 'Kunne ikke hente sandbox-kurs'
      });
    });
}

export default loadSandboxCourse;
