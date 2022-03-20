export default () => {
  const params = new URLSearchParams(window.location.search);

  return `/todo/${params.get('userId')}/${params.get('companyId')}/${params.get('selectedIds')}`;
}
