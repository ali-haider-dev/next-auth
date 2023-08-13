import Form from "@/components/auth/form";
import { getSession, signIn } from "next-auth/react";
export default function SignIn() {
  const onSubmit = async(email, password) => {
  const data = await  signIn("credentials",{redirect:false,email, password});
  console.log(data)
  };
  return <Form signin={true} onFormSubmit={onSubmit} />;
}

export async function getServerSideProps({ req }) {
    const session = await getSession({ req });
    if (session) {
      return {
        redirect: {
          destination: "../profile",
          permanent: false,
        },
      };
    }
    return {
      props: {
       
      }
    };
  }