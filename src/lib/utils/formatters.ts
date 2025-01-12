export const formatDisplayLevel = (level: string): string => {
  return level.replace(/_/g, ' ');
};

export const formatDatabaseLevel = (level: string): string => {
  return level.replace(/ /g, '_');
};
