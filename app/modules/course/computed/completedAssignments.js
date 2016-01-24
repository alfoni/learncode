export default function completedAssignments(get) {
  const courseId = get(['course', 'id']);

  return get(['user', 'assignmentsSolved', courseId]) || [];
}
