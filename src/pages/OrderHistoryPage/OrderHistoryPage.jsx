import * as userServices from "../../utilities/users-service"

export default function OrderHistoryPage() {

  async function handleCheckToken() {
    const expDate = await userServices.checkToken();
    console.log(expDate);
  }

  return (
    <>
      <h1>OrderHistoryPage</h1>
      <button onClick={handleCheckToken}> Check when my Login Expires </button>
    </>
  );
}