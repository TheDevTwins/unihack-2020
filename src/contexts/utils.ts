export const sortedByTimestamp = <T>(arr: T[] | undefined): T[] => {
  if (!arr) return [];

  return arr.sort((a: any, b: any) => b?.createdAt?.seconds - a?.createdAt?.seconds);
};
