function UserDetailPage(props) {
  return <h1>{props.id}</h1>;
}

export async function getServerSideProps(context) {
  const { params, req, res } = context;

  const userId = params.uid;

  return {
    props: {
      id: "userId- " + userId,
    },
  };
}

export default UserDetailPage;
