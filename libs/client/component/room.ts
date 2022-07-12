export const preventUnload = (e: BeforeUnloadEvent) => {
  e.preventDefault();
  e.returnValue = '';
};
