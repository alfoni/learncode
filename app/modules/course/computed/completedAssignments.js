export default function computedCompletedAssignments(get) {
  const courseId = get(['course', 'id']);
  const sceneIndex = get(['course', 'currentSceneIndex']);
  const completedAssignments = get(['user', 'completedAssignments']);

  // Return assignments completed for specific scene
  if (completedAssignments[courseId]) {
    return completedAssignments[courseId][sceneIndex] || [];
  }

  // Or if not existing, drop it
  return [];
}
