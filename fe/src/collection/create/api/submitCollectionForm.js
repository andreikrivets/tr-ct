const submitCollectionForm = async ({ values, additionalTags, imageUrl }) => {
  const url = "/api/collection";
  const headers = {};
  headers["Content-Type"] = "application/json";
  const method = "POST";
  const data = JSON.stringify({ ...values, ...additionalTags, imageUrl });
  const res = await fetch(url, { method, headers, body: data });
  const json = await res.json();
  return json;
};

export default submitCollectionForm;
