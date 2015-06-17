let updateSeekPosition = function(cerebral, currentDuration) { 
  cerebral.set(['recorder', 'currentDuration'], currentDuration);
};

export default updateSeekPosition;