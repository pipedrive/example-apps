export default (token = null) => {
  const params = new URLSearchParams(window.location.search);

  const url = `/todo/${params.get('userId')}/${params.get('companyId')}/${params.get('selectedIds')}`;

  if (token) {
    return `${url}?token=${token}`;
  }

  return url;
}
