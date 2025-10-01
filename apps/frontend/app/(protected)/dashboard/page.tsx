import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";
import Test from "@/components/test";
const Dash = () => {
  return (
    <div>
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
  );
};

export default Dash;
