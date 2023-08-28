import Header from "../header/Header"
import Main from "../main/Main"

export default function ProtectedPage({userEmail, ...props}) {
  return(
    <>
      <Header dataUser={userEmail} />
      <Main name='main' {...props} />
    </>
  )
}