export const fetchApi = async (url: string) => {
  const request = await fetch(url);
  return await request.json();
};
