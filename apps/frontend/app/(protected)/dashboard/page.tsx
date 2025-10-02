import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";
import Test from "@/components/test";
import Container from "@/app/pages/dashboard/components/container";
import Header from "@/app/pages/dashboard/components/header";

const Dash = () => {
  return (
   <Container>
    <Header />
     <div className="hidden">
      Hello Ji
      <Button
        variant="destructive"
        onClick={async () => {
          "use server";
          await signOut();
        }}
      >SignOut </Button>
      <Test />
    </div>
   </Container>
  );
};

export default Dash;
